"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * A two-part cursor: a small dot that tracks the pointer exactly and a ring
 * that lags behind it. Only mounts for fine pointers, and never for anyone on
 * prefers-reduced-motion — the native cursor stays in both of those cases.
 */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    document.body.dataset.customCursor = "on";

    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const ringPos = { ...pos };
    let hovering = false;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;

      const interactive = (e.target as HTMLElement | null)?.closest?.(
        'a, button, [data-cursor="hover"]',
      );
      hovering = Boolean(interactive);
    };

    const tick = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;

      if (dot.current) {
        dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${hovering ? 1.8 : 1})`;
        ring.current.style.opacity = hovering ? "1" : "0.5";
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      delete document.body.dataset.customCursor;
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-100 hidden md:block">
      <div
        ref={ring}
        className="absolute top-0 left-0 size-8 rounded-full border border-accent transition-[opacity] duration-200"
      />
      <div ref={dot} className="absolute top-0 left-0 size-1.5 rounded-full bg-accent" />
    </div>
  );
}
