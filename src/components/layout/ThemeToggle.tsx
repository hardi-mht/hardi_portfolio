"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const LABEL = {
  system: "Theme: follows your system. Switch to light.",
  light: "Theme: light. Switch to dark.",
  dark: "Theme: dark. Follow your system.",
} as const;

export function ThemeToggle() {
  const { pref, ready, cycle } = useTheme();

  // Rendering before the stored preference is read would show the wrong icon.
  if (!ready) return null;

  const Icon = pref === "system" ? Monitor : pref === "light" ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={LABEL[pref]}
      title={LABEL[pref]}
      className="grid size-11 place-items-center rounded-full border border-border bg-surface/80 text-muted backdrop-blur-xl transition-colors hover:border-accent/50 hover:text-accent"
    >
      <Icon aria-hidden className="size-4" />
      <span className="sr-only" role="status" aria-live="polite">
        {pref === "system" ? "System theme" : `${pref} theme`}
      </span>
    </button>
  );
}
