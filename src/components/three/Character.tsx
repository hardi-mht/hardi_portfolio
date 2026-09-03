"use client";

import { Component, Suspense, type ReactNode, type RefObject } from "react";
import { Figure } from "./Figure";
import { AvatarFigure } from "./AvatarFigure";
import type { ScenePalette } from "./palette";

/** Set by next.config.ts from whether public/models/avatar.glb exists. */
const HAS_AVATAR = Boolean(process.env.NEXT_PUBLIC_HAS_AVATAR);

class AvatarBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[Character] Falling back to the coded figure:", error);
    }
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/**
 * Uses the rigged avatar at /models/avatar.glb when it is present, and the
 * coded stand-in when it is not, so the scene is never empty.
 *
 * Presence is resolved at build time: a runtime probe would log a 404 on every
 * visit until a model was added. The boundary stays as a safety net for a file
 * that exists but fails to parse.
 *
 * Note: adding the model requires a dev-server restart to be picked up.
 */
export function Character({
  progress,
  palette,
}: {
  progress: RefObject<number>;
  palette: ScenePalette;
}) {
  const fallback = <Figure progress={progress} palette={palette} />;
  if (!HAS_AVATAR) return fallback;

  return (
    <AvatarBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <AvatarFigure progress={progress} />
      </Suspense>
    </AvatarBoundary>
  );
}
