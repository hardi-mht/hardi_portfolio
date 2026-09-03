"use client";

import { useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import type { ScenePalette } from "./palette";

const vertexShader = /* glsl */ `
  attribute vec3 aColor;
  attribute float aScale;
  varying vec3 vColor;
  void main() {
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aScale * 90.0 / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  void main() {
    // Soft round sprite; discard the corners so points read as dots.
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.15, d);
    gl_FragColor = vec4(vColor, alpha * uOpacity);
  }
`;

/**
 * A field of nodes that starts scattered and resolves into an ordered lattice
 * as the hero scrolls away — the visual argument of the whole site, which is
 * that the work is about turning loose pieces into a system.
 */
export function NodeField({
  count,
  progress,
  palette,
}: {
  count: number;
  progress: RefObject<number>;
  palette: ScenePalette;
}) {
  const points = useRef<THREE.Points>(null);
  const lines = useRef<THREE.LineSegments>(null);
  const uniforms = useMemo(
    () => ({ uOpacity: { value: palette.pointOpacity } }),
    [palette.pointOpacity],
  );

  const data = useMemo(() => {
    const nodeColor = new THREE.Color(palette.node);
    const nodeAltColor = new THREE.Color(palette.nodeAlt);
    const scatter = new Float32Array(count * 3);
    const lattice = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const phase = new Float32Array(count);

    // Lattice dimensions closest to a cube for the given count.
    const side = Math.ceil(Math.cbrt(count));
    const spacing = 0.62;
    const offset = ((side - 1) * spacing) / 2;
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      scatter[i * 3] = (Math.random() - 0.5) * 12;
      scatter[i * 3 + 1] = (Math.random() - 0.5) * 10;
      scatter[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;

      const x = i % side;
      const y = Math.floor(i / side) % side;
      const z = Math.floor(i / (side * side));
      lattice[i * 3] = x * spacing - offset;
      lattice[i * 3 + 1] = y * spacing - offset;
      lattice[i * 3 + 2] = z * spacing - offset - 2;

      color.copy(nodeColor).lerp(nodeAltColor, Math.random());
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      scales[i] = 0.5 + Math.random() * 1.1;
      phase[i] = Math.random() * Math.PI * 2;
    }

    // Neighbour pairs computed once from the scattered layout. Per frame we
    // only copy positions into the line buffer, never re-search for pairs.
    const pairs: number[] = [];
    const maxPairs = Math.min(380, count);
    const threshold = 1.7;
    for (let i = 0; i < count && pairs.length < maxPairs * 2; i++) {
      for (let j = i + 1; j < count && pairs.length < maxPairs * 2; j++) {
        const dx = scatter[i * 3] - scatter[j * 3];
        const dy = scatter[i * 3 + 1] - scatter[j * 3 + 1];
        const dz = scatter[i * 3 + 2] - scatter[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < threshold * threshold) {
          pairs.push(i, j);
        }
      }
    }

    return {
      scatter,
      lattice,
      colors,
      scales,
      phase,
      pairs: Uint16Array.from(pairs),
      live: new Float32Array(count * 3),
      linePositions: new Float32Array((pairs.length / 2) * 6),
    };
  }, [count, palette.node, palette.nodeAlt]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Ease the morph so it settles rather than snapping at the extremes.
    const p = THREE.MathUtils.smoothstep(progress.current, 0, 1);

    const { scatter, lattice, live, phase, pairs, linePositions } = data;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const drift = Math.sin(t * 0.35 + phase[i]) * 0.22 * (1 - p);
      live[i3] = THREE.MathUtils.lerp(scatter[i3] + drift, lattice[i3], p);
      live[i3 + 1] = THREE.MathUtils.lerp(
        scatter[i3 + 1] + Math.cos(t * 0.3 + phase[i]) * 0.22 * (1 - p),
        lattice[i3 + 1],
        p,
      );
      live[i3 + 2] = THREE.MathUtils.lerp(scatter[i3 + 2], lattice[i3 + 2], p);
    }

    const pointGeo = points.current?.geometry;
    if (pointGeo) {
      const attr = pointGeo.getAttribute("position") as THREE.BufferAttribute;
      attr.array.set(live);
      attr.needsUpdate = true;
    }

    for (let k = 0; k < pairs.length; k += 2) {
      const a = pairs[k] * 3;
      const b = pairs[k + 1] * 3;
      const o = (k / 2) * 6;
      linePositions[o] = live[a];
      linePositions[o + 1] = live[a + 1];
      linePositions[o + 2] = live[a + 2];
      linePositions[o + 3] = live[b];
      linePositions[o + 4] = live[b + 1];
      linePositions[o + 5] = live[b + 2];
    }

    const lineGeo = lines.current?.geometry;
    if (lineGeo) {
      const attr = lineGeo.getAttribute("position") as THREE.BufferAttribute;
      attr.needsUpdate = true;
    }
    const lineMat = lines.current?.material as THREE.LineBasicMaterial | undefined;
    if (lineMat) lineMat.opacity = palette.lineOpacity * (1 - p) + 0.025;
    uniforms.uOpacity.value = palette.pointOpacity * (1 - p * 0.65);
  });

  return (
    // Biased left so the field sits behind the headline rather than across
    // the right-hand lane where the workstation lives.
    <group position={[-2.6, 0, -1.5]}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[data.scatter.slice(), 3]}
          />
          <bufferAttribute attach="attributes-aColor" args={[data.colors, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[data.scales, 1]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={
            palette.additive ? THREE.AdditiveBlending : THREE.NormalBlending
          }
        />
      </points>

      <lineSegments ref={lines}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[data.linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={palette.line}
          transparent
          opacity={palette.lineOpacity}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
