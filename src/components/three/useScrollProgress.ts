"use client";

import { useEffect, useRef } from "react";

/**
 * Hero-scroll progress (0 → 1) in a ref, so the render loop can read it
 * without causing React to re-render on every scroll frame.
 */
export function useScrollProgress() {
  const progress = useRef(0);

  useEffect(() => {
    const update = () => {
      const span = window.innerHeight;
      progress.current = Math.min(1, Math.max(0, window.scrollY / span));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return progress;
}
