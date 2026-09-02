import type { MetadataRoute } from "next";

// Emitted as a file at build time, not served from a route handler.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://hardimehta.dev/sitemap.xml",
  };
}
