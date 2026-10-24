import type { MetadataRoute } from "next";
import { getAllCaseStudies } from "@/content/projects/case-studies";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://afaqo.tech").replace(/\/$/, "");

  const staticRoutes = [
    "",
    "/work",
    "/services",
    "/services/extended-reality",
    "/services/interactive-3d",
    "/services/real-time-3d-production",
    "/services/simulation-immersive-training",
    "/industries",
    "/technology-ai",
    "/about",
    "/simulxr",
    "/contact",
  ];

  const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const caseStudies = getAllCaseStudies();
  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${siteUrl}/work/${cs.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...routes, ...caseStudyRoutes];
}
