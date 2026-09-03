"use client";

import { useCallback, useSyncExternalStore } from "react";

export type ThemePref = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

export const THEME_KEY = "hm-theme";

/**
 * One module-level store, not per-hook state.
 *
 * The theme is read by the DOM chrome *and* by the WebGL scene. With plain
 * useState each caller kept its own copy, so toggling repainted the page while
 * the 3D palette stayed on the previous theme. useSyncExternalStore keeps every
 * consumer on the same value.
 */
let pref: ThemePref = "system";
let resolved: ResolvedTheme = "dark";
let ready = false;
let started = false;

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function systemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function start() {
  if (started) return;
  started = true;

  try {
    const raw = window.localStorage.getItem(THEME_KEY);
    if (raw === "light" || raw === "dark") pref = raw;
  } catch {
    // Storage blocked: system it is.
  }

  resolved = pref === "system" ? systemTheme() : pref;
  ready = true;

  // Follow the OS for as long as the preference is "system".
  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", () => {
      if (pref !== "system") return;
      resolved = systemTheme();
      emit();
    });

  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  start();
  return () => listeners.delete(listener);
}

function setPref(next: ThemePref) {
  pref = next;
  resolved = next === "system" ? systemTheme() : next;

  const root = document.documentElement;
  if (next === "system") delete root.dataset.theme;
  else root.dataset.theme = next;

  try {
    if (next === "system") window.localStorage.removeItem(THEME_KEY);
    else window.localStorage.setItem(THEME_KEY, next);
  } catch {
    // Preference won't persist; the page still switches.
  }

  emit();
}

export function useTheme() {
  const currentPref = useSyncExternalStore(
    subscribe,
    () => pref,
    () => "system" as ThemePref,
  );
  const currentResolved = useSyncExternalStore(
    subscribe,
    () => resolved,
    () => "dark" as ResolvedTheme,
  );
  const isReady = useSyncExternalStore(
    subscribe,
    () => ready,
    () => false,
  );

  const choose = useCallback((next: ThemePref) => setPref(next), []);

  /** system → light → dark → system */
  const cycle = useCallback(() => {
    setPref(
      pref === "system" ? "light" : pref === "light" ? "dark" : "system",
    );
  }, []);

  return {
    pref: currentPref,
    resolved: currentResolved,
    ready: isReady,
    choose,
    cycle,
  };
}
