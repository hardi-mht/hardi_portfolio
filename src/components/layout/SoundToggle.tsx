"use client";

import { useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/hooks/useSound";

export function SoundToggle() {
  const { enabled, ready, toggle, tick } = useSound();

  // Interactive elements get a quiet blip, but only while sound is on.
  useEffect(() => {
    if (!enabled) return;

    const onOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.(
        'a, button, [data-cursor="hover"]',
      );
      if (el) tick(880, 0.035, 0.025);
    };
    const onClick = () => tick(520, 0.06, 0.045);

    document.addEventListener("pointerover", onOver);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("click", onClick);
    };
  }, [enabled, tick]);

  if (!ready) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Turn sound off" : "Turn sound on"}
      className="grid size-11 place-items-center rounded-full border border-border bg-surface/80 text-muted backdrop-blur-xl transition-colors hover:border-accent/50 hover:text-accent"
    >
      {enabled ? (
        <Volume2 aria-hidden className="size-4" />
      ) : (
        <VolumeX aria-hidden className="size-4" />
      )}
    </button>
  );
}
