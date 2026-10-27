import { existsSync } from "node:fs";
import type { NextConfig } from "next";

// The ambient loop is optional. Detected at build time so the sound toggle
// never asks the server for a file that is not there — without this it
// logged a 404 on every use and buried real errors.
const hasAmbient = existsSync("./public/audio/ambient.mp3");

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_HAS_AMBIENT: hasAmbient ? "1" : "",
  },
};

export default nextConfig;
