import type { MetadataRoute } from "next";
import { docs } from "@/lib/docs";

// Set NEXT_PUBLIC_SITE_URL to the real deployment origin before launch.
const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/docs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...docs.map((doc) => ({
      url: `${base}/docs/${doc.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
