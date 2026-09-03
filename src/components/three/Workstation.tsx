"use client";

import { useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ScenePalette } from "./palette";


/** Desk, chair and a monitor whose screen is the scene's main light source. */
export function Workstation({
  progress,
  palette,
}: {
  progress: RefObject<number>;
  palette: ScenePalette;
}) {
  const chair = useRef<THREE.Group>(null);
  const screen = useRef<THREE.MeshBasicMaterial>(null);
  const glow = useRef<THREE.PointLight>(null);

  // Deterministic "code" on the screen: stable across renders, no flicker of
  // layout, and cheap enough to be plain meshes.
  const codeLines = useMemo(
    () =>
      Array.from({ length: 11 }, (_, i) => ({
        width: 0.12 + ((i * 37) % 53) / 53 * 0.6,
        accent: i % 4 === 1,
        opacity: 0.35 + ((i * 17) % 11) / 11 * 0.45,
      })),
    [],
  );

  const materials = useMemo(
    () => ({
      frame: new THREE.MeshLambertMaterial({
        color: palette.deskFrame,
      }),
      surface: new THREE.MeshLambertMaterial({
        color: palette.deskSurface,
      }),
    }),
    [palette.deskFrame, palette.deskSurface],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = THREE.MathUtils.smoothstep(
      THREE.MathUtils.clamp(progress.current / 0.75, 0, 1),
      0,
      1,
    );

    // The chair rolls back as she stands, then stays put.
    if (chair.current) {
      chair.current.position.z = 0.42 + p * 0.5;
      chair.current.rotation.y = p * 0.35;
    }

    // Screen flickers faintly, like text scrolling past.
    if (screen.current) screen.current.opacity = 0.9;
    if (glow.current) glow.current.intensity = (9 + Math.sin(t * 3.1) * 0.8) * (1 - p * 0.3);
  });

  return (
    <group>
      {/* ---- desk ---- */}
      <mesh position={[0, 0.74, -0.62]} material={materials.surface} receiveShadow>
        <boxGeometry args={[1.9, 0.05, 0.85]} />
      </mesh>
      {[-0.86, 0.86].map((x) => (
        <mesh key={x} position={[x, 0.36, -0.62]} material={materials.frame}>
          <boxGeometry args={[0.05, 0.72, 0.78]} />
        </mesh>
      ))}

      {/* ---- monitor ---- */}
      <group position={[0, 0.77, -0.86]}>
        <mesh position={[0, 0.05, 0]} material={materials.frame}>
          <cylinderGeometry args={[0.11, 0.13, 0.02, 16]} />
        </mesh>
        <mesh position={[0, 0.2, 0]} material={materials.frame}>
          <boxGeometry args={[0.04, 0.28, 0.04]} />
        </mesh>
        <mesh position={[0, 0.55, 0]} material={materials.frame}>
          <boxGeometry args={[0.92, 0.55, 0.03]} />
        </mesh>
        {/* Screen: a dark panel with code-like lines rather than a lit slab.
            We sit behind her shoulder, so this is read over her back. */}
        <mesh position={[0, 0.55, 0.019]}>
          <planeGeometry args={[0.86, 0.49]} />
          <meshBasicMaterial ref={screen} color={palette.screen} transparent opacity={0.9} />
        </mesh>
        {codeLines.map((line, i) => (
          <mesh
            key={i}
            position={[-0.39 + line.width / 2, 0.74 - i * 0.036, 0.021]}
          >
            <planeGeometry args={[line.width, 0.014]} />
            <meshBasicMaterial
              color={line.accent ? "#a78bfa" : "#22d3ee"}
              transparent
              opacity={line.opacity}
            />
          </mesh>
        ))}
        <pointLight
          ref={glow}
          position={[0, 0.55, 0.5]}
          color="#22d3ee"
          intensity={9}
          decay={2}
        />
      </group>

      {/* ---- keyboard ---- */}
      <mesh position={[0, 0.775, -0.36]} rotation={[-0.06, 0, 0]} material={materials.frame}>
        <boxGeometry args={[0.62, 0.02, 0.2]} />
      </mesh>

      {/* ---- chair ---- */}
      <group ref={chair} position={[0, 0, 0.42]}>
        <mesh position={[0, 0.6, 0]} material={materials.surface}>
          <boxGeometry args={[0.46, 0.06, 0.44]} />
        </mesh>
        <mesh position={[0, 0.78, 0.2]} rotation={[0.14, 0, 0]} material={materials.surface}>
          <boxGeometry args={[0.4, 0.34, 0.05]} />
        </mesh>
        <mesh position={[0, 0.32, 0]} material={materials.frame}>
          <cylinderGeometry args={[0.04, 0.04, 0.5, 12]} />
        </mesh>
        <mesh position={[0, 0.06, 0]} material={materials.frame}>
          <cylinderGeometry args={[0.26, 0.28, 0.04, 5]} />
        </mesh>
      </group>

      {/* ---- floor catch: a faint disc so she is not floating in the void ---- */}
      <mesh position={[0, 0.002, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.7, 48]} />
        <meshBasicMaterial
          color={palette.node}
          transparent
          opacity={palette.floorOpacity}
        />
      </mesh>
    </group>
  );
}
