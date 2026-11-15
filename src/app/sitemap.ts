import type { MetadataRoute } from "next";
import { site } from "@/config/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/menu",
    "/about",
    "/order",
    "/reservation",
    "/gallery",
    "/catering",
    "/contact",
  ].map((path) => ({
    url: `${site.url}${path}/`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
