/**
 * Two keyframes for the figure, lerped by scroll progress. Angles are radians
 * on a rig built facing +Z, so `rootY: Math.PI` means "back to the camera".
 *
 * If a rigged GLTF replaces the coded figure later, this is the file that maps
 * onto its animation clips — the rest of the scene stays as it is.
 */
export type Pose = {
  rootY: number;
  hipsY: number;
  torsoX: number;
  headX: number;
  headY: number;
  upperArmX: number;
  upperArmZ: number;
  forearmX: number;
  thighX: number;
  shinX: number;
};

/** At the desk, working: back to the viewer, forearms out over the keyboard. */
export const SITTING: Pose = {
  rootY: Math.PI,
  hipsY: 0.66,
  torsoX: -0.12,
  headX: 0.14,
  headY: 0,
  upperArmX: -0.95,
  upperArmZ: 0.16,
  forearmX: -0.55,
  thighX: -1.45,
  shinX: 1.4,
};

/** Standing, turned toward the viewer to introduce herself. */
export const STANDING: Pose = {
  rootY: 0.38,
  hipsY: 0.98,
  torsoX: 0.02,
  headX: -0.04,
  headY: -0.16,
  upperArmX: 0.08,
  upperArmZ: 0.14,
  forearmX: -0.22,
  thighX: 0.02,
  shinX: 0.0,
};

export const POSE_KEYS = Object.keys(SITTING) as Array<keyof Pose>;

/* ---------------------------------------------------------------------------
   Bone poses for a rigged GLTF avatar (Ready Player Me / Mixamo naming).

   Values are Euler XYZ offsets in radians, applied on top of each bone's rest
   rotation — never absolute — so they survive whatever rest pose the model
   ships with. Bones missing from a given rig are skipped silently.

   These are a starting calibration; sign conventions differ between rigs, so
   expect to tune the leg and arm axes once a real model is in place.
   --------------------------------------------------------------------------- */

export type BonePose = Record<string, [number, number, number]>;

/** Seated at the desk, forearms out over the keyboard. */
export const SIT_BONES: BonePose = {
  Spine: [0.08, 0, 0],
  Spine1: [0.06, 0, 0],
  Spine2: [0.04, 0, 0],
  Neck: [-0.06, 0, 0],
  Head: [0.14, 0, 0],

  LeftShoulder: [0, 0, -0.08],
  RightShoulder: [0, 0, 0.08],
  LeftArm: [0.55, 0, 0.5],
  RightArm: [0.55, 0, -0.5],
  LeftForeArm: [0, -0.5, 0.55],
  RightForeArm: [0, 0.5, -0.55],

  LeftUpLeg: [1.5, 0, 0.07],
  RightUpLeg: [1.5, 0, -0.07],
  LeftLeg: [-1.5, 0, 0],
  RightLeg: [-1.5, 0, 0],
  LeftFoot: [0.2, 0, 0],
  RightFoot: [0.2, 0, 0],
};

/** Standing, arms relaxed, turned toward the reader. */
export const STAND_BONES: BonePose = {
  Spine: [0, 0, 0],
  Spine1: [0, 0, 0],
  Spine2: [0, 0, 0],
  Neck: [0, 0, 0],
  Head: [-0.03, -0.12, 0],

  LeftShoulder: [0, 0, 0],
  RightShoulder: [0, 0, 0],
  LeftArm: [0, 0, 0.1],
  RightArm: [0, 0, -0.1],
  LeftForeArm: [0, 0, 0.12],
  RightForeArm: [0, 0, -0.12],

  LeftUpLeg: [0, 0, 0.03],
  RightUpLeg: [0, 0, -0.03],
  LeftLeg: [0, 0, 0],
  RightLeg: [0, 0, 0],
  LeftFoot: [0, 0, 0],
  RightFoot: [0, 0, 0],
};

export const BONE_NAMES = Object.keys(SIT_BONES);
