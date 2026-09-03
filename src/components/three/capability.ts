"use client";

/**
 * Deliberately free of any three.js import: this decides whether the WebGL
 * chunk is worth fetching at all, so it has to run before that chunk loads.
 */

/** Rejects software rasterisers (SwiftShader, llvmpipe, Mesa fallbacks). */
function hasHardwareGpu() {
  try {
    const probe = document.createElement("canvas");
    const gl = (probe.getContext("webgl2") ??
      probe.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return false;

    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = info
      ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL))
      : "";

    gl.getExtension("WEBGL_lose_context")?.loseContext();

    // Some browsers mask the renderer string for privacy; assume capable.
    if (!renderer) return true;
    return !/swiftshader|llvmpipe|software|basic render|paravirtual/i.test(
      renderer,
    );
  } catch {
    return false;
  }
}

/**
 * The scene is decorative, so the bar is deliberately high: a phone or a
 * software renderer would pay seconds of main-thread time for it.
 */
export function canRenderScene() {
  if (typeof window === "undefined") return false;

  const cores = navigator.hardwareConcurrency ?? 4;
  const coarse = window.matchMedia("(pointer: coarse)").matches;

  if (cores <= 4) return false;
  if (coarse && cores <= 6) return false;
  return hasHardwareGpu();
}
