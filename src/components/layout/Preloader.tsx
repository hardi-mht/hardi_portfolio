"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Covers the page while fonts settle, then wipes away. Deliberately short and
 * self-limiting: it removes itself after a hard timeout even if something it
 * waits on never resolves, so it can never trap a visitor behind a splash.
 */
export function Preloader() {
  const [done, setDone] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }

    let cancelled = false;
    const finish = () => {
      if (cancelled) return;
      setLeaving(true);
      window.setTimeout(() => !cancelled && setDone(true), 700);
    };

    const fonts = document.fonts?.ready ?? Promise.resolve();
    const minimum = new Promise((r) => window.setTimeout(r, 650));
    const safety = new Promise((r) => window.setTimeout(r, 2500));

    void Promise.race([Promise.all([fonts, minimum]), safety]).then(finish);

    return () => {
      cancelled = true;
    };
  }, [reduced]);

  // Hold the page still until the wipe starts.
  useEffect(() => {
    if (reduced) return;
    document.documentElement.style.overflow = done ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [done, reduced]);

  if (done) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className={`fixed inset-0 z-200 grid place-items-center bg-bg transition-[clip-path,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        leaving ? "[clip-path:inset(0_0_100%_0)] opacity-90" : "[clip-path:inset(0_0_0_0)]"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <span className="font-mono text-3xl font-bold tracking-[0.3em] text-text">
          {profile.initials}
          <span className="text-accent">.</span>
        </span>
        <span className="h-px w-24 overflow-hidden bg-border">
          <span className="block h-full w-full origin-left animate-[preload_1.4s_ease-in-out_infinite] bg-accent" />
        </span>
      </div>
    </div>
  );
}
