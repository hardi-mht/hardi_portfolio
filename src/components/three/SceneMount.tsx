"use client";

import dynamic from "next/dynamic";

// three.js is a large chunk and purely decorative — keep it out of the
// critical path and off the server entirely.
const Scene = dynamic(() => import("./Scene"), { ssr: false });

export function SceneMount() {
  return <Scene />;
}
