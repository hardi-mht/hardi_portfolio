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
