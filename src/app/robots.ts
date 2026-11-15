import type { MetadataRoute } from "next";
export const dynamic = "force-static";
// Keep the sample restaurant details out of search results. Enable at launch.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
