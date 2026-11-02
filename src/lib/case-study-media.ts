import type {
  CaseStudyMediaAsset,
  CaseStudyMediaPlan,
} from "@/content/projects/case-studies";

export function shouldContainAsset(id: string): boolean {
  const lower = id.toLowerCase();
  return (
    lower.includes("pid") ||
    lower.includes("masterplan") ||
    lower.includes("interactive-ui") ||
    lower.includes("valve-interaction") ||
    lower.includes("gas-leak") ||
    lower.includes("hazardous") ||
    lower.includes("exploded") ||
    lower.includes("equipment-views") ||
    lower.includes("safety-uniform") ||
    lower.includes("vertical-view") ||
    lower.includes("gallery-view-01") ||
    lower.includes("gallery-view-02")
  );
}

export function isDiagramAsset(id: string): boolean {
  return id.toLowerCase().includes("pid");
}

export function isScenarioAsset(id: string, caption = ""): boolean {
  const key = `${id} ${caption}`.toLowerCase();
  return (
    key.includes("gas-leak") ||
    key.includes("gas leak") ||
    key.includes("hazardous") ||
    key.includes("suffocation") ||
    key.includes("fire-scenario") ||
    key.includes("emergency-scenario")
  );
}

export function isApprovedAsset(
  asset?: CaseStudyMediaAsset
): asset is CaseStudyMediaAsset & { src: string } {
  return Boolean(
    asset &&
      asset.src &&
      asset.status !== "awaiting-approved-media"
  );
}

/**
 * Collects all unique approved image assets belonging to the current project's mediaPlan.
 * Gallery images are ordered first so gallery indices align naturally, followed by
 * any additional approved project images (hero, overview, process, cinematic, experience).
 * Pure server-safe transformation that produces serializable CaseStudyMediaAsset[] data
 * and never mixes assets from other projects.
 */
export function collectApprovedProjectImages(
  mediaPlan?: CaseStudyMediaPlan,
  fallbackImage?: string,
  fallbackAlt?: string
): CaseStudyMediaAsset[] {
  const seen = new Set<string>();
  const list: CaseStudyMediaAsset[] = [];

  const pushIfApprovedImage = (asset?: CaseStudyMediaAsset) => {
    if (!asset || asset.type !== "image") return;
    if (!isApprovedAsset(asset)) return;
    if (seen.has(asset.src)) return;
    seen.add(asset.src);
    list.push(asset);
  };

  if (mediaPlan) {
    mediaPlan.gallery.forEach(pushIfApprovedImage);
    pushIfApprovedImage(mediaPlan.hero);
    mediaPlan.overview.forEach(pushIfApprovedImage);
    mediaPlan.process.forEach((chapter) => pushIfApprovedImage(chapter.media));
    pushIfApprovedImage(mediaPlan.cinematic);
    pushIfApprovedImage(mediaPlan.experience.primary);
    mediaPlan.experience.secondary.forEach(pushIfApprovedImage);
  }

  if (fallbackImage && !seen.has(fallbackImage)) {
    seen.add(fallbackImage);
    list.push({
      id: "project-fallback-image",
      type: "image",
      src: fallbackImage,
      alt: fallbackAlt || "Project view",
      caption: fallbackAlt || "Approved project view",
      aspectRatio: "16/9",
      status: "approved",
    });
  }

  return list;
}

