"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { canRenderScene } from "./capability";

// three.js is a large chunk and purely decorative — keep it out of the
// critical path and off the server entirely.
const Scene = dynamic(() => import("./Scene"), { ssr: false });

/**
 * Gates the WebGL chunk on capability *before* importing it. Doing the check
 * inside Scene still cost every visitor the download and parse of three.js
 * before deciding not to render anything.
 */
export function SceneMount() {
  const reduced = useReducedMotion();
  const [capable, setCapable] = useState(false);

  useEffect(() => {
    setCapable(canRenderScene());
  }, []);

  if (reduced || !capable) return null;
  return <Scene />;
}
