"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import {
  SITTING,
  STANDING,
  SIT_BONES,
  STAND_BONES,
  BONE_NAMES,
} from "./poses";

export const AVATAR_URL = "/models/avatar.glb";

type Joint = {
  bone: THREE.Bone;
  rest: THREE.Quaternion;
  sit: THREE.Quaternion;
  stand: THREE.Quaternion;
};

const euler = new THREE.Euler();
const scratch = new THREE.Quaternion();

/**
 * A rigged GLTF avatar posed entirely in code — no animation clips needed.
 *
 * Ready Player Me exports a Mixamo-named skeleton with no animations, so we
 * drive it directly: each bone gets a rest-relative offset for the seated and
 * standing poses, and scroll progress slerps between them.
 */
export function AvatarFigure({ progress }: { progress: RefObject<number> }) {
  const root = useRef<THREE.Group>(null);
  const hips = useRef<THREE.Bone | null>(null);
  const hipsRestY = useRef(0);
  const joints = useRef<Joint[]>([]);

  const { scene } = useGLTF(AVATAR_URL);

  // The GLTF is used once, so mutating it directly is safe and avoids a clone.
  const model = useMemo(() => {
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.frustumCulled = false;
      }
    });
    return scene;
  }, [scene]);

  useEffect(() => {
    const found: Joint[] = [];

    model.traverse((o) => {
      const bone = o as THREE.Bone;
      if (!bone.isBone) return;

      // RPM ships bare Mixamo names; other exporters prefix "mixamorig".
      const name = bone.name.replace(/^mixamorig[:_]?/i, "");

      if (name === "Hips") {
        hips.current = bone;
        hipsRestY.current = bone.position.y;
        return;
      }
      if (!BONE_NAMES.includes(name)) return;

      const rest = bone.quaternion.clone();
      const make = (offset: [number, number, number]) =>
        rest
          .clone()
          .multiply(new THREE.Quaternion().setFromEuler(euler.set(...offset)));

      found.push({
        bone,
        rest,
        sit: make(SIT_BONES[name]),
        stand: make(STAND_BONES[name]),
      });
    });

    joints.current = found;

    if (process.env.NODE_ENV === "development" && found.length === 0) {
      console.warn(
        "[AvatarFigure] No known bones found — check the rig's naming.",
      );
    }
  }, [model]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = THREE.MathUtils.smoothstep(
      THREE.MathUtils.clamp(progress.current / 0.75, 0, 1),
      0,
      1,
    );

    for (const joint of joints.current) {
      joint.bone.quaternion.slerpQuaternions(joint.sit, joint.stand, p);
    }

    // Typing while seated, a slow breath once standing.
    const typing = (1 - p) * Math.sin(t * 7) * 0.07;
    const forearms = joints.current.filter((j) =>
      j.bone.name.includes("ForeArm"),
    );
    forearms.forEach((j, i) => {
      scratch.setFromEuler(euler.set(i === 0 ? typing : -typing, 0, 0));
      j.bone.quaternion.multiply(scratch);
    });

    if (hips.current) {
      const seatedDrop = THREE.MathUtils.lerp(-0.34, 0, p);
      hips.current.position.y =
        hipsRestY.current + seatedDrop + Math.sin(t * 1.2) * 0.006;
    }

    if (root.current) {
      root.current.rotation.y = THREE.MathUtils.lerp(
        SITTING.rootY,
        STANDING.rootY,
        p,
      );
    }
  });

  return (
    <group ref={root}>
      <primitive object={model} />
    </group>
  );
}
