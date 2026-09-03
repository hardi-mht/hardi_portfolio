import { existsSync } from "node:fs";
import type { NextConfig } from "next";

// Detected at build time so the browser never requests a model that is not
// there — a runtime probe still logs a 404 in the console.
const hasAvatar = existsSync("./public/models/avatar.glb");

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  env: { NEXT_PUBLIC_HAS_AVATAR: hasAvatar ? "1" : "" },
};

export default nextConfig;
