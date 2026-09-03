"use client";

import { useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ScenePalette } from "./palette";

const dummy = new THREE.Object3D();

/** Slow-drifting wireframe boxes; ambient depth, never the focal point. */
export function CubeCluster({
  count = 12,
  progress,
  palette,
}: {
  count?: number;
  progress: RefObject<number>;
  palette: ScenePalette;
}) {
  const mesh = useRef<THREE.InstancedMesh>(null);

  const seeds = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 11 - 2.5,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 7 - 5,
        ),
        rotation: new THREE.Vector3(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ),
        speed: 0.05 + Math.random() * 0.14,
        scale: 0.16 + Math.random() * 0.42,
      })),
    [count],
  );

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    // Cubes recede as the node field resolves, so they never fight the lattice.
    const p = progress.current;

    seeds.forEach((seed, i) => {
      dummy.position.copy(seed.position);
      dummy.position.y += Math.sin(t * seed.speed * 2 + i) * 0.3;
      dummy.rotation.set(
        seed.rotation.x + t * seed.speed,
        seed.rotation.y + t * seed.speed * 0.7,
        seed.rotation.z,
      );
      dummy.scale.setScalar(seed.scale * (1 - p * 0.5));
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;

    const material = mesh.current.material as THREE.MeshBasicMaterial;
    material.opacity = palette.cubeOpacity * (1 - p * 0.7);
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial
        color={palette.cube}
        wireframe
        transparent
        opacity={palette.cubeOpacity}
        depthWrite={false}
      />
    </instancedMesh>
  );
}
