"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import * as THREE from "three";
import { NodeField } from "./NodeField";
import { CubeCluster } from "./CubeCluster";
import { DeskScene } from "./DeskScene";
import { useScrollProgress } from "./useScrollProgress";
import { useTheme } from "@/hooks/useTheme";
import { PALETTES } from "./palette";

/** Damped pointer parallax plus a small scroll dolly. */
function CameraRig({ progress }: { progress: React.RefObject<number> }) {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    const damp = 1 - Math.pow(0.001, delta);
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      target.current.x * 0.9,
      damp,
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      -target.current.y * 0.6,
      damp,
    );
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      9 - progress.current * 0.9,
      damp,
    );
    camera.lookAt(0, 0, -2);
  });

  return null;
}

/**
 * Fixed WebGL backdrop. Purely decorative: SceneMount decides whether this
 * chunk loads at all, and the page is designed to look finished without it.
 */
export default function Scene() {
  const progress = useScrollProgress();
  const { resolved, ready } = useTheme();
  const palette = PALETTES[resolved];

  // Waiting for `ready` avoids building the scene with the wrong palette and
  // then rebuilding every material a frame later.
  if (!ready) return null;

  const count = window.innerWidth < 768 ? 260 : 520;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ opacity: palette.canvasOpacity }}
    >
      {/* Scrim: keeps the headline and body copy legible over the field. */}
      <div className="absolute inset-0 z-10 bg-linear-to-r from-bg from-20% via-bg/55 to-transparent to-58%" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-40 bg-linear-to-t from-bg to-transparent" />
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 9], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <CameraRig progress={progress} />
        <ambientLight intensity={palette.ambient} />
        <NodeField count={count} progress={progress} palette={palette} />
        <DeskScene progress={progress} palette={palette} />
        <CubeCluster progress={progress} palette={palette} />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}
