"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import * as THREE from "three";
import { NodeField } from "./NodeField";
import { CubeCluster } from "./CubeCluster";
import { useScrollProgress } from "./useScrollProgress";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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
      9 - progress.current * 2.2,
      damp,
    );
    camera.lookAt(0, 0, -2);
  });

  return null;
}

/**
 * Fixed WebGL backdrop. It is decorative, so it is skipped entirely for
 * reduced-motion users and for devices unlikely to hold a frame rate — the
 * page is designed to look finished without it.
 */
export default function Scene() {
  const progress = useScrollProgress();
  const reduced = useReducedMotion();
  const [capable, setCapable] = useState<boolean | null>(null);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 4;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setCapable(cores > 4 && !(coarse && cores <= 6));
  }, []);

  if (reduced || capable !== true) return null;

  const count = window.innerWidth < 768 ? 260 : 520;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-70"
    >
      {/* Scrim: keeps the headline and body copy legible over the field. */}
      <div className="absolute inset-0 z-10 bg-linear-to-r from-bg via-bg/75 to-transparent to-75%" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-40 bg-linear-to-t from-bg to-transparent" />
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 9], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <CameraRig progress={progress} />
        <NodeField count={count} progress={progress} />
        <CubeCluster progress={progress} />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}
