"use client";

import { useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SITTING, STANDING, POSE_KEYS, type Pose } from "./poses";
import type { ScenePalette } from "./palette";


/**
 * A stylised figure rigged in code: nested groups act as joints, and scroll
 * progress lerps every joint between the two poses in `poses.ts`. Lit mostly
 * by the monitor, so it reads as a silhouette at a desk rather than a portrait.
 */
export function Figure({
  progress,
  palette,
}: {
  progress: RefObject<number>;
  palette: ScenePalette;
}) {
  const root = useRef<THREE.Group>(null);
  const hips = useRef<THREE.Group>(null);
  const torso = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const foreL = useRef<THREE.Group>(null);
  const foreR = useRef<THREE.Group>(null);
  const thighL = useRef<THREE.Group>(null);
  const thighR = useRef<THREE.Group>(null);
  const shinL = useRef<THREE.Group>(null);
  const shinR = useRef<THREE.Group>(null);

  const pose = useMemo<Pose>(() => ({ ...SITTING }), []);

  const materials = useMemo(
    () => ({
      skin: new THREE.MeshLambertMaterial({
        color: palette.skin,
      }),
      hair: new THREE.MeshLambertMaterial({ color: palette.hair }),
      cloth: new THREE.MeshLambertMaterial({ color: palette.cloth }),
    }),
    [palette.skin, palette.hair, palette.cloth],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Stand up across the first two thirds of the hero scroll, then settle.
    const p = THREE.MathUtils.smoothstep(
      THREE.MathUtils.clamp(progress.current / 0.75, 0, 1),
      0,
      1,
    );

    for (const key of POSE_KEYS) {
      pose[key] = THREE.MathUtils.lerp(SITTING[key], STANDING[key], p);
    }

    // Typing while seated; a slow breathing bob once standing.
    const typing = (1 - p) * Math.sin(t * 7) * 0.06;
    const breathe = Math.sin(t * 1.2) * 0.012;

    if (root.current) root.current.rotation.y = pose.rootY;
    if (hips.current) hips.current.position.y = pose.hipsY + breathe;
    if (torso.current) torso.current.rotation.x = pose.torsoX;
    if (head.current) {
      head.current.rotation.x = pose.headX + Math.sin(t * 0.9) * 0.02;
      head.current.rotation.y = pose.headY + Math.sin(t * 0.6) * 0.05;
    }

    if (armL.current) {
      armL.current.rotation.x = pose.upperArmX;
      armL.current.rotation.z = pose.upperArmZ;
    }
    if (armR.current) {
      armR.current.rotation.x = pose.upperArmX;
      armR.current.rotation.z = -pose.upperArmZ;
    }
    if (foreL.current) foreL.current.rotation.x = pose.forearmX + typing;
    if (foreR.current) foreR.current.rotation.x = pose.forearmX - typing;

    if (thighL.current) thighL.current.rotation.x = pose.thighX;
    if (thighR.current) thighR.current.rotation.x = pose.thighX;
    if (shinL.current) shinL.current.rotation.x = pose.shinX;
    if (shinR.current) shinR.current.rotation.x = pose.shinX;
  });

  return (
    <group ref={root}>
      <group ref={hips}>
        {/* pelvis */}
        <mesh material={materials.cloth} castShadow>
          <capsuleGeometry args={[0.15, 0.1, 4, 12]} />
        </mesh>

        {/* ---- upper body ---- */}
        <group ref={torso} position={[0, 0.08, 0]}>
          <mesh position={[0, 0.24, 0]} material={materials.cloth} castShadow>
            <capsuleGeometry args={[0.155, 0.3, 4, 12]} />
          </mesh>

          {/* neck + head */}
          <group ref={head} position={[0, 0.52, 0]}>
            <mesh position={[0, 0.02, 0]} material={materials.skin}>
              <capsuleGeometry args={[0.045, 0.05, 4, 8]} />
            </mesh>
            <mesh position={[0, 0.16, 0]} material={materials.skin} castShadow>
              <sphereGeometry args={[0.115, 20, 16]} />
            </mesh>
            {/* shoulder-length hair: a cap plus a fall down the back */}
            <mesh position={[0, 0.185, -0.012]} material={materials.hair}>
              <sphereGeometry args={[0.125, 20, 16]} />
            </mesh>
            <mesh position={[0, 0.075, -0.07]} material={materials.hair}>
              <capsuleGeometry args={[0.085, 0.16, 4, 12]} />
            </mesh>
          </group>

          {/* ---- arms ---- */}
          <group ref={armL} position={[0.19, 0.4, 0]}>
            <mesh position={[0, -0.13, 0]} material={materials.cloth}>
              <capsuleGeometry args={[0.048, 0.19, 4, 10]} />
            </mesh>
            <group ref={foreL} position={[0, -0.28, 0]}>
              <mesh position={[0, -0.12, 0]} material={materials.skin}>
                <capsuleGeometry args={[0.042, 0.18, 4, 10]} />
              </mesh>
            </group>
          </group>

          <group ref={armR} position={[-0.19, 0.4, 0]}>
            <mesh position={[0, -0.13, 0]} material={materials.cloth}>
              <capsuleGeometry args={[0.048, 0.19, 4, 10]} />
            </mesh>
            <group ref={foreR} position={[0, -0.28, 0]}>
              <mesh position={[0, -0.12, 0]} material={materials.skin}>
                <capsuleGeometry args={[0.042, 0.18, 4, 10]} />
              </mesh>
            </group>
          </group>
        </group>

        {/* ---- legs ---- */}
        <group ref={thighL} position={[0.085, -0.1, 0]}>
          <mesh position={[0, -0.17, 0]} material={materials.cloth}>
            <capsuleGeometry args={[0.062, 0.24, 4, 10]} />
          </mesh>
          <group ref={shinL} position={[0, -0.36, 0]}>
            <mesh position={[0, -0.17, 0]} material={materials.cloth}>
              <capsuleGeometry args={[0.052, 0.26, 4, 10]} />
            </mesh>
            <mesh position={[0, -0.34, 0.05]} material={materials.hair}>
              <boxGeometry args={[0.09, 0.05, 0.17]} />
            </mesh>
          </group>
        </group>

        <group ref={thighR} position={[-0.085, -0.1, 0]}>
          <mesh position={[0, -0.17, 0]} material={materials.cloth}>
            <capsuleGeometry args={[0.062, 0.24, 4, 10]} />
          </mesh>
          <group ref={shinR} position={[0, -0.36, 0]}>
            <mesh position={[0, -0.17, 0]} material={materials.cloth}>
              <capsuleGeometry args={[0.052, 0.26, 4, 10]} />
            </mesh>
            <mesh position={[0, -0.34, 0.05]} material={materials.hair}>
              <boxGeometry args={[0.09, 0.05, 0.17]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}
