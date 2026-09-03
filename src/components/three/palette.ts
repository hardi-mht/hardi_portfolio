import type { ResolvedTheme } from "@/hooks/useTheme";

/**
 * The scene's colours per theme. Dark mode leans on additive blending and
 * glow; light mode cannot — additive on a near-white ground is invisible — so
 * it switches to normal blending with darker, denser strokes and reads as a
 * blueprint rather than a starfield.
 */
export type ScenePalette = {
  additive: boolean;
  node: string;
  nodeAlt: string;
  line: string;
  lineOpacity: number;
  pointOpacity: number;
  cube: string;
  cubeOpacity: number;
  ambient: number;
  rimA: string;
  rimB: string;
  rimIntensity: number;
  screen: string;
  skin: string;
  hair: string;
  cloth: string;
  deskFrame: string;
  deskSurface: string;
  floorOpacity: number;
  canvasOpacity: number;
};

export const PALETTES: Record<ResolvedTheme, ScenePalette> = {
  dark: {
    additive: true,
    node: "#22d3ee",
    nodeAlt: "#a78bfa",
    line: "#22d3ee",
    lineOpacity: 0.13,
    pointOpacity: 0.85,
    cube: "#a78bfa",
    cubeOpacity: 0.22,
    ambient: 0.45,
    rimA: "#a78bfa",
    rimB: "#22d3ee",
    rimIntensity: 1,
    screen: "#0d2b33",
    skin: "#7d7490",
    hair: "#2a2436",
    cloth: "#4a4560",
    deskFrame: "#1a1a24",
    deskSurface: "#23232f",
    floorOpacity: 0.045,
    canvasOpacity: 0.7,
  },
  light: {
    additive: false,
    node: "#0e7490",
    nodeAlt: "#6d28d9",
    line: "#475569",
    lineOpacity: 0.2,
    pointOpacity: 0.75,
    cube: "#6d28d9",
    cubeOpacity: 0.3,
    ambient: 1.9,
    rimA: "#7c5cd6",
    rimB: "#0e7490",
    rimIntensity: 0.5,
    screen: "#10333d",
    skin: "#c9b8ad",
    hair: "#4b3f52",
    cloth: "#6f6a86",
    deskFrame: "#8b8b98",
    deskSurface: "#b9b9c4",
    floorOpacity: 0.08,
    canvasOpacity: 0.9,
  },
};
