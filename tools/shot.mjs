/**
 * Screenshot helper for local review. Drives a headless Chrome over CDP so we
 * get true full-page or scrolled captures, which `--screenshot` cannot do.
 *
 *   node tools/shot.mjs <url> <outDir> [width] [height]
 *
 * Writes <outDir>/full.png plus one <outDir>/<section-id>.png per <section>.
 */
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [url, outDir, W = "1440", H = "900"] = process.argv.slice(2);
if (!url || !outDir) {
  console.error("usage: node tools/shot.mjs <url> <outDir> [w] [h]");
  process.exit(1);
}
const width = Number(W);
const height = Number(H);

const CHROME =
  process.env.CHROME_PATH ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

const profile = join(tmpdir(), `shot-profile-${Date.now()}`);
mkdirSync(outDir, { recursive: true });

const chrome = spawn(CHROME, [
  "--headless=new",
  // Real GPU, not SwiftShader: the scene's capability gate rejects software
  // rasterisers, so a software-rendered run would screenshot an empty scene.
  "--use-angle=default",
  "--enable-unsafe-swiftshader",
  "--hide-scrollbars",
  "--no-first-run",
  "--no-default-browser-check",
  "--remote-debugging-port=0",
  `--user-data-dir=${profile}`,
  `--window-size=${width},${height}`,
  "about:blank",
]);

const wsUrl = await new Promise((resolve, reject) => {
  let buf = "";
  const to = setTimeout(() => reject(new Error("chrome start timeout")), 20000);
  chrome.stderr.on("data", (d) => {
    buf += d.toString();
    const m = buf.match(/ws:\/\/[^\s]+/);
    if (m) {
      clearTimeout(to);
      resolve(m[0]);
    }
  });
  chrome.on("exit", (c) => reject(new Error(`chrome exited ${c}: ${buf}`)));
});

const ws = new WebSocket(wsUrl);
await new Promise((r) => (ws.onopen = r));

let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
  }
};
const send = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    const n = ++id;
    pending.set(n, { resolve, reject });
    ws.send(JSON.stringify({ id: n, method, params, sessionId }));
  });

const { targetId } = await send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
const call = (m, p) => send(m, p, sessionId);

await call("Page.enable");
await call("Runtime.enable");
await call("Emulation.setDeviceMetricsOverride", {
  width,
  height,
  deviceScaleFactor: 1,
  mobile: width < 768,
});

// THEME=light|dark emulates that OS colour-scheme preference.
if (process.env.THEME) {
  await call("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-color-scheme", value: process.env.THEME }],
  });
}

// REDUCED_MOTION=1 renders the page as a prefers-reduced-motion visitor sees it.
if (process.env.REDUCED_MOTION) {
  await call("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
}

await call("Page.navigate", { url });
await new Promise((r) => setTimeout(r, 4000));
// Settle web fonts and any lazy work before we start capturing.
await call("Runtime.evaluate", {
  expression: "document.fonts.ready.then(()=>true)",
  awaitPromise: true,
});
await new Promise((r) => setTimeout(r, 800));

async function shot(name, clip) {
  const { data } = await call("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: Boolean(clip),
    ...(clip ? { clip } : {}),
  });
  writeFileSync(join(outDir, `${name}.png`), Buffer.from(data, "base64"));
  console.log(name);
}

/** Scroll through Lenis when it is present so pinned sections settle. */
async function scrollTo(y) {
  await call("Runtime.evaluate", {
    expression: `(() => {
      const l = window.__lenis;
      if (l) l.scrollTo(${y}, { immediate: true, force: true });
      else window.scrollTo(0, ${y});
      return true;
    })()`,
    returnByValue: true,
  });
  await new Promise((r) => setTimeout(r, 700));
}

// Full page, then one capture per <section>.
const { result } = await call("Runtime.evaluate", {
  expression: `JSON.stringify({
    docH: document.documentElement.scrollHeight,
    docW: document.documentElement.scrollWidth,
    sections: [...document.querySelectorAll('section')].map(s => ({
      id: s.id,
      top: Math.round(s.getBoundingClientRect().top + scrollY),
      h: Math.round(s.getBoundingClientRect().height),
    })),
  })`,
  returnByValue: true,
});
const page = JSON.parse(result.value);

await shot("full", { x: 0, y: 0, width, height: Math.min(page.docH, 30000), scale: 1 });
for (const s of page.sections) {
  if (!s.id) continue;
  await shot(s.id, { x: 0, y: s.top, width, height: Math.min(s.h, 6000), scale: 1 });
}

// Optional viewport captures at real scroll offsets: SCROLL=0,1200,2400 ...
if (process.env.SCROLL) {
  for (const y of process.env.SCROLL.split(",").map(Number)) {
    await scrollTo(y);
    await shot(`at-${y}`);
  }
}

console.log(JSON.stringify({ docH: page.docH, docW: page.docW, overflowX: page.docW > width }));

ws.close();
chrome.kill();
try {
  rmSync(profile, { recursive: true, force: true });
} catch {}
