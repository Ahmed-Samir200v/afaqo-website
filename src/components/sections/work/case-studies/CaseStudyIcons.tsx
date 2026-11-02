import type { SVGProps } from "react";

export type CaseStudyIconKind =
  | "process"
  | "spatial"
  | "facility"
  | "inspect"
  | "arrow-left"
  | "arrow-right"
  | "arrow-up-right"
  | "play"
  | "check"
  | "verified"
  | "industry"
  | "layers"
  | "compass"
  | "package"
  | "headset"
  | "pin"
  | "shield"
  | "document"
  | "cad"
  | "navisworks"
  | "pid"
  | "scenario"
  | "masterplan"
  | "equipment"
  | "pump"
  | "valve"
  | "integration"
  | "cpu"
  | "globe"
  | "gas-leak"
  | "hazardous-atmosphere"
  | "overview"
  | "glance"
  | "route"
  | "gallery"
  | "training"
  | "pause"
  | "expand"
  | "close";

const DIRECTIONAL_ICONS = new Set<CaseStudyIconKind>([
  "arrow-left",
  "arrow-right",
  "arrow-up-right",
]);

export interface CaseStudyIconProps extends SVGProps<SVGSVGElement> {
  kind: CaseStudyIconKind;
  size?: number;
  label?: string;
}

/**
 * Unified AFAQO Case Study Icon System
 * - Consistent 24x24 viewBox
 * - Consistent 1.75px stroke width
 * - Round caps and joins for technical precision
 * - RTL directional mirroring on navigation arrows only (per AFAQO Bilingual Design System Section 09)
 */
export function CaseStudyIcon({
  kind,
  size = 20,
  label,
  className = "",
  ...props
}: CaseStudyIconProps) {
  const isDirectional = DIRECTIONAL_ICONS.has(kind);
  const a11yProps = label
    ? { role: "img" as const, "aria-label": label }
    : { "aria-hidden": true as const, focusable: "false" as const };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      data-rtl-mirror={isDirectional ? "true" : undefined}
      className={className}
      {...a11yProps}
      {...props}
    >
      {kind === "arrow-left" && (
        <>
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </>
      )}

      {kind === "arrow-right" && (
        <>
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </>
      )}

      {kind === "arrow-up-right" && (
        <>
          <path d="M7 17 17 7" />
          <path d="M7 7h10v10" />
        </>
      )}

      {kind === "play" && (
        <polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
      )}

      {kind === "pause" && (
        <>
          <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" />
          <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" />
        </>
      )}

      {kind === "expand" && (
        <>
          <path d="M15 3h6v6" />
          <path d="M9 21H3v-6" />
          <path d="m21 3-7 7" />
          <path d="m3 21 7-7" />
        </>
      )}

      {kind === "close" && (
        <>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </>
      )}

      {kind === "check" && (
        <>
          <path d="M20 6 9 17l-5-5" />
        </>
      )}

      {kind === "verified" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="m8.5 12 2.5 2.5 4.5-5" />
        </>
      )}

      {kind === "industry" && (
        <>
          <path d="M3 21V10l6 3V8l6 3V4h6v17" />
          <path d="M2 21h20" />
          <path d="M7 17h1m4 0h1m4 0h1" />
        </>
      )}

      {kind === "layers" && (
        <>
          <path d="m12 3 9 5-9 5-9-5 9-5Z" />
          <path d="m3 12 9 5 9-5" />
          <path d="m3 16.5 9 5 9-5" />
        </>
      )}

      {kind === "compass" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </>
      )}

      {kind === "package" && (
        <>
          <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
          <path d="m4 7.5 8 4.5 8-4.5" />
          <path d="M12 12v9" />
          <path d="m8 5.25 8 4.5" />
        </>
      )}

      {kind === "headset" && (
        <>
          <rect x="2" y="9" width="20" height="8" rx="3" />
          <path d="M6 9V7a6 6 0 0 1 12 0v2" />
          <path d="M9.5 17 11 14.5h2L14.5 17" />
          <circle cx="7.5" cy="13" r="1" />
          <circle cx="16.5" cy="13" r="1" />
        </>
      )}

      {kind === "pin" && (
        <>
          <path d="M20 10c0 5.25-8 11-8 11S4 15.25 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </>
      )}

      {kind === "shield" && (
        <>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
          <path d="m9 12 2 2 4-4" />
        </>
      )}

      {kind === "document" && (
        <>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
          <path d="M14 2v6h6" />
          <path d="M8 13h8" />
          <path d="M8 17h5" />
        </>
      )}

      {kind === "cad" && (
        <>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 9v12" />
          <path d="m13 13 4 4m0-4-4 4" />
        </>
      )}

      {kind === "navisworks" && (
        <>
          <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
          <path d="M12 3v9" />
          <path d="m20 7.5-8 4.5-8-4.5" />
          <circle cx="12" cy="12" r="2" />
        </>
      )}

      {kind === "pid" && (
        <>
          <circle cx="5" cy="7" r="2" />
          <circle cx="19" cy="7" r="2" />
          <circle cx="12" cy="17" r="2.5" />
          <path d="M7 7h10" />
          <path d="M12 7v7.5" />
          <path d="M5 9v5a3 3 0 0 0 3 3h1.5" />
          <path d="M19 9v5a3 3 0 0 1-3 3h-1.5" />
        </>
      )}

      {kind === "process" && (
        <>
          <circle cx="5" cy="12" r="2" />
          <circle cx="19" cy="6" r="2" />
          <circle cx="19" cy="18" r="2" />
          <path d="m7 11 10-4M7 13l10 4" />
        </>
      )}

      {kind === "spatial" && (
        <>
          <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9zM12 3v9m8-4.5-8 4.5m-8-4.5 8 4.5" />
        </>
      )}

      {kind === "facility" && (
        <>
          <path d="M3 20V9l7-4v15" />
          <path d="M10 11l6-3v12" />
          <path d="M16 12l5-2.5V20" />
          <path d="M2 20h20" />
          <path d="M6 12h1m-1 4h1m6-3h1m-1 3h1" />
        </>
      )}

      {kind === "inspect" && (
        <>
          <circle cx="10.5" cy="10.5" r="5.5" />
          <path d="M15 15 20 20" />
          <path d="M10.5 8v5M8 10.5h5" />
        </>
      )}

      {kind === "masterplan" && (
        <>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" />
        </>
      )}

      {kind === "equipment" && (
        <>
          <ellipse cx="12" cy="5.5" rx="6.5" ry="2.5" />
          <path d="M5.5 5.5v11c0 1.38 2.91 2.5 6.5 2.5s6.5-1.12 6.5-2.5v-11" />
          <path d="M5.5 11c0 1.38 2.91 2.5 6.5 2.5s6.5-1.12 6.5-2.5" />
          <path d="M8 19v2m8-2v2" />
        </>
      )}

      {kind === "pump" && (
        <>
          <circle cx="12" cy="13" r="6" />
          <circle cx="12" cy="13" r="2" />
          <path d="M12 7V3h5" />
          <path d="M6 13H3" />
          <path d="M18 13h3" />
          <path d="M8 20h8" />
        </>
      )}

      {kind === "valve" && (
        <>
          <path d="M6 8h12" />
          <path d="M12 8v4" />
          <polygon points="5 12 12 16 5 20 5 12" />
          <polygon points="19 12 12 16 19 20 19 12" />
          <circle cx="12" cy="5.5" r="2" />
        </>
      )}

      {kind === "integration" && (
        <>
          <rect x="3" y="4" width="7" height="6" rx="1.5" />
          <rect x="14" y="4" width="7" height="6" rx="1.5" />
          <rect x="8.5" y="14" width="7" height="6" rx="1.5" />
          <path d="M10 7h4" />
          <path d="M6.5 10v4a2 2 0 0 0 2 2" />
          <path d="M17.5 10v4a2 2 0 0 1-2 2" />
        </>
      )}

      {kind === "cpu" && (
        <>
          <rect x="6" y="6" width="12" height="12" rx="2" />
          <rect x="9.5" y="9.5" width="5" height="5" rx="0.5" />
          <path d="M9 3v3m6-3v3M9 18v3m6-3v3M3 9h3m-3 6h3m12-6h3m-3 6h3" />
        </>
      )}

      {kind === "globe" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M3.6 9h16.8M3.6 15h16.8" />
          <path d="M12 3a14.5 14.5 0 0 0 0 18 14.5 14.5 0 0 0 0-18Z" />
        </>
      )}

      {kind === "scenario" && (
        <>
          <path d="M12 3 2.5 19.5a1 1 0 0 0 .87 1.5h17.26a1 1 0 0 0 .87-1.5L12 3Z" />
          <path d="M12 9v5" />
          <circle cx="12" cy="17" r="0.75" fill="currentColor" />
        </>
      )}

      {kind === "gas-leak" && (
        <>
          <path d="M4 16h6" />
          <path d="M4 20h6" />
          <path d="M10 15v6" />
          <path d="M14 14c1.5-2 4-2 5.5 0s1.5 5 0 6.5c-1.2 1.2-3.2 1-4.5-.5" />
          <path d="M13 10c1-1.8 3.2-2.5 5-1.5" />
          <circle cx="16.5" cy="16.5" r="1" fill="currentColor" />
        </>
      )}

      {kind === "hazardous-atmosphere" && (
        <>
          <path d="M12 3 2.5 19.5a1 1 0 0 0 .87 1.5h17.26a1 1 0 0 0 .87-1.5L12 3Z" />
          <path d="M12 9.5v4.5" />
          <circle cx="12" cy="17" r="0.8" fill="currentColor" />
        </>
      )}

      {kind === "overview" && (
        <>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M7 8h10M7 12h10M7 16h6" />
        </>
      )}

      {kind === "glance" && (
        <>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </>
      )}

      {kind === "route" && (
        <>
          <circle cx="6" cy="18" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <path d="M8.5 18h5a3.5 3.5 0 0 0 0-7h-3a3.5 3.5 0 0 1 0-7h5" />
        </>
      )}

      {kind === "gallery" && (
        <>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="8.5" cy="9.5" r="1.5" />
          <path d="m21 15-4.5-4.5L7 20" />
        </>
      )}

      {kind === "training" && (
        <>
          <path d="m3 9 9-4.5L21 9l-9 4.5L3 9Z" />
          <path d="M6.5 11v5c3.2 2 7.8 2 11 0v-5" />
          <path d="M21 9v6" />
        </>
      )}
    </svg>
  );
}

/**
 * Resolves the appropriate semantic icon for an Approach step title or index.
 */
export function resolveStepIcon(title: string, index: number): CaseStudyIconKind {
  const lower = title.toLowerCase();
  if (lower.includes("understand") || lower.includes("document") || lower.includes("research") || lower.includes("review")) {
    return "document";
  }
  if (lower.includes("equipment")) {
    return "equipment";
  }
  if (lower.includes("reconstruct") || lower.includes("environment") || lower.includes("facility")) {
    return "facility";
  }
  if (lower.includes("interaction")) {
    return "headset";
  }
  if (lower.includes("optimize") || lower.includes("real-time") || lower.includes("cinematic")) {
    return "spatial";
  }
  if (lower.includes("training") || lower.includes("scenario") || lower.includes("experience")) {
    return "training";
  }
  if (lower.includes("integration") || lower.includes("hisense") || lower.includes("system")) {
    return "integration";
  }
  if (lower.includes("test") || lower.includes("deliver") || lower.includes("vr") || lower.includes("development")) {
    return "verified";
  }
  const fallback: CaseStudyIconKind[] = ["document", "facility", "spatial", "training", "integration", "verified"];
  return fallback[index % fallback.length];
}

/**
 * Resolves the appropriate semantic icon for a Behind-the-Build stage.
 */
export function resolveBuildStageIcon(title: string, index: number): CaseStudyIconKind {
  const lower = title.toLowerCase();
  if (lower.includes("cad") || lower.includes("assembly")) return "cad";
  if (lower.includes("navisworks") || lower.includes("spatial") || lower.includes("cinematic")) return "navisworks";
  if (lower.includes("maintenance")) return "equipment";
  if (lower.includes("p&id") || lower.includes("process") || lower.includes("operation")) return "pid";
  if (lower.includes("scenario") || lower.includes("emergency") || lower.includes("hazard")) return "scenario";
  if (lower.includes("interactive")) return "headset";
  const fallback: CaseStudyIconKind[] = ["cad", "navisworks", "pid", "scenario"];
  return fallback[index % fallback.length];
}

/**
 * Resolves the appropriate semantic icon for a Media Asset or Chapter.
 */
export function resolveMediaIcon(id: string, title = ""): CaseStudyIconKind {
  const key = `${id} ${title}`.toLowerCase();
  if (key.includes("gas-leak") || key.includes("gas leak")) return "gas-leak";
  if (key.includes("safety-uniform")) return "shield";
  if (key.includes("hazardous") || key.includes("suffocation") || key.includes("emergency") || key.includes("fire")) return "hazardous-atmosphere";
  if (key.includes("pid") || key.includes("p&id") || key.includes("engineering")) return "pid";
  if (key.includes("masterplan") || key.includes("top-view") || key.includes("layout")) return "masterplan";
  if (key.includes("motion") || key.includes("movement")) return "route";
  if (key.includes("training-team")) return "training";
  if (key.includes("maintenance") || key.includes("vertical-view") || key.includes("mechanical") || key.includes("detail")) return "inspect";
  if (key.includes("assembly")) return "layers";
  if (key.includes("valve") || key.includes("exploded") || key.includes("component")) return "valve";
  if (key.includes("pump") || key.includes("booster")) return "pump";
  if (key.includes("clarifier") || key.includes("skid") || key.includes("treatment") || key.includes("equipment") || key.includes("tank") || key.includes("device")) return "equipment";
  if (key.includes("vr") || key.includes("interaction") || key.includes("ui") || key.includes("interface")) return "headset";
  if (key.includes("video") || key.includes("walkthrough") || key.includes("cinematic")) return "play";
  if (key.includes("wide-view") || key.includes("wider view")) return "spatial";
  return "facility";
}

/**
 * Resolves the appropriate semantic icon for a Deliverable item.
 */
export function resolveDeliverableIcon(item: string): CaseStudyIconKind {
  const lower = item.toLowerCase();
  if (lower.includes("gas leak")) return "gas-leak";
  if (lower.includes("hazardous") || lower.includes("emergency") || lower.includes("firefighting")) return "hazardous-atmosphere";
  if (lower.includes("hisense") || lower.includes("integration")) return "integration";
  if (lower.includes("bilingual")) return "globe";
  if (lower.includes("assembly") || lower.includes("component")) return "layers";
  if (lower.includes("maintenance")) return "inspect";
  if (lower.includes("operational")) return "cpu";
  if (lower.includes("vr") || lower.includes("quest") || lower.includes("training") || lower.includes("familiarization")) return "headset";
  if (lower.includes("equipment") || lower.includes("model")) return "equipment";
  if (lower.includes("reconstruction") || lower.includes("environment") || lower.includes("facility")) return "facility";
  return "check";
}
