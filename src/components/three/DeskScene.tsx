"use client";

import { useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Character } from "./Character";
import { Workstation } from "./Workstation";
import type { ScenePalette } from "./palette";

/**
 * The workstation and the figure, parked in the right-hand lane of the
 * viewport. Sitting and working through the hero; standing and turned toward
 * the reader by the time the About copy arrives.
 */
export function DeskScene({
  progress,
  palette,
}: {
  progress: RefObject<number>;
  palette: ScenePalette;
}) {
  const group = useRef<THREE.Group>(null);
  const key = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();

  // Narrow viewports have no right-hand lane to spare, so she moves to centre
  // and sits further back rather than being cropped.
  const narrow = viewport.aspect < 1.15;
  const laneX = narrow ? 0 : viewport.width * 0.235;

  useFrame(() => {
    const p = THREE.MathUtils.smoothstep(
      THREE.MathUtils.clamp(progress.current / 0.75, 0, 1),
      0,
      1,
    );

    if (group.current) {
      group.current.position.x = laneX;
      // Drifts a little closer and turns slightly as she stands.
      group.current.position.z = 0.3 + p * 0.25;
      group.current.rotation.y = -0.22 + p * 0.1;
    }

    // Front key light comes up as she turns, so she is not a pure silhouette.
    if (key.current)
      key.current.intensity = (12 + p * 34) * palette.rimIntensity;
  });

  return (
    <group ref={group} position={[laneX, -2.15, 0]} scale={1.28}>
      <Character progress={progress} palette={palette} />
      <Workstation progress={progress} palette={palette} />

      {/* Two rims carve her silhouette out of the background; the monitor
          alone leaves her as a flat black shape from this camera angle.
          `distance={0}` on purpose: the group is scaled, so a finite cutoff
          measured in world units would fall short of the lights' own positions. */}
      <pointLight
        position={[-1.7, 2.2, -1.2]}
        color={palette.rimA}
        intensity={38 * palette.rimIntensity}
        decay={2}
      />
      <pointLight
        position={[1.7, 1.8, -1.0]}
        color={palette.rimB}
        intensity={30 * palette.rimIntensity}
        decay={2}
      />
      {/* Front key, ramped up as she turns to face the reader. */}
      <pointLight ref={key} position={[1.2, 1.7, 2.2]} color="#e8f6ff" intensity={12} decay={2} />
    </group>
  );
}
