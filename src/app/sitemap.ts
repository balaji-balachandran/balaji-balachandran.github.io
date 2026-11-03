import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

// Required for `output: "export"` -- the sitemap is written once at build time.
export const dynamic = "force-static";

/**
 * Emitted as sitemap.xml. /playground is deliberately absent: it carries
 * robots noindex, so listing it would contradict that.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl()}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
