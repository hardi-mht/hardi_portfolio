"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Howl } from "howler";

const STORAGE_KEY = "hm-sound";
const AMBIENT_SRC = "/audio/ambient.mp3";

/**
 * Sound is off until the visitor asks for it, and the choice persists.
 *
 * UI ticks are synthesised with the Web Audio API so they need no asset. The
 * ambient loop is an optional file: if `/audio/ambient.mp3` is absent the
 * toggle still works and simply has nothing to loop.
 */
export function useSound() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const ctx = useRef<AudioContext | null>(null);
  const ambient = useRef<Howl | null>(null);

  // Restore the stored preference. Never auto-play on first visit.
  useEffect(() => {
    try {
      setEnabled(window.localStorage.getItem(STORAGE_KEY) === "on");
    } catch {
      // Storage can be blocked; defaulting to off is the safe answer.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
    } catch {
      // Preference simply won't persist. Not worth surfacing.
    }

    if (!enabled) {
      ambient.current?.pause();
      return;
    }

    let cancelled = false;
    // Howler only loads once someone actually turns sound on.
    void (async () => {
      if (!ambient.current) {
        const { Howl: HowlCtor } = await import("howler");
        if (cancelled) return;
        ambient.current = new HowlCtor({
          src: [AMBIENT_SRC],
          loop: true,
          volume: 0.18,
          html5: true,
        });
      }
      // Howler queues playback until the file is decoded, and stays silent
      // if it never loads — which is the correct behaviour when absent.
      if (!cancelled) ambient.current.play();
    })();

    return () => {
      cancelled = true;
    };
  }, [enabled, ready]);

  useEffect(
    () => () => {
      ambient.current?.unload();
      ambient.current = null;
      void ctx.current?.close();
      ctx.current = null;
    },
    [],
  );

  /** Short synthesised blip — no audio file required. */
  const tick = useCallback(
    (frequency = 660, duration = 0.05, gainPeak = 0.05) => {
      if (!enabled) return;
      try {
        ctx.current ??= new AudioContext();
        const audio = ctx.current;
        if (audio.state === "suspended") void audio.resume();

        const osc = audio.createOscillator();
        const gain = audio.createGain();
        osc.type = "sine";
        osc.frequency.value = frequency;

        const now = audio.currentTime;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(gainPeak, now + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain).connect(audio.destination);
        osc.start(now);
        osc.stop(now + duration + 0.02);
      } catch {
        // Audio is a nicety; a failure here must never break the page.
      }
    },
    [enabled],
  );

  const toggle = useCallback(() => setEnabled((v) => !v), []);

  return { enabled, ready, toggle, tick };
}
