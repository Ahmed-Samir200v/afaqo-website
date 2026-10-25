import type { SVGProps } from "react";

export type SumedIconName = "arrow" | "building" | "pin" | "industry" | "cube" | "layers" | "document" | "process" | "spatial" | "facility" | "settings" | "route" | "structure" | "controls" | "equipment" | "data" | "tank" | "headset" | "package" | "desktop" | "mobile" | "expand" | "check" | "training";

export function SumedIcon({ name, size = 24, ...props }: SVGProps<SVGSVGElement> & { name: SumedIconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {name === "arrow" && <><path d="M5 12h14M14 7l5 5-5 5" /></>}
      {name === "building" && <><path d="M4 21V6l8-3v18M12 9h8v12M2 21h20" /><path d="M7 8h2m-2 4h2m-2 4h2m8-3h1m-1 4h1" /></>}
      {name === "pin" && <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>}
      {name === "industry" && <><path d="M3 21V10l6 3V8l6 3V4h4v17M3 21h18" /><path d="M7 17h1m4 0h1m4 0h1" /></>}
      {name === "cube" && <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9zM12 12v9m8-13.5L12 12 4 7.5" /></>}
      {name === "layers" && <><path d="m12 3 9 5-9 5-9-5zM5 12l7 4 7-4M5 16l7 4 7-4" /></>}
      {name === "document" && <><path d="M6 2h8l4 4v16H6zM14 2v5h5M9 12h6m-6 4h6" /></>}
      {name === "process" && <><circle cx="5" cy="12" r="2" /><circle cx="19" cy="6" r="2" /><circle cx="19" cy="18" r="2" /><path d="m7 11 10-4M7 13l10 4" /></>}
      {name === "spatial" && <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9zM12 3v9m8-4.5-8 4.5m-8-4.5 8 4.5" /><path d="M8 14v3h3" /></>}
      {name === "facility" && <><path d="M3 21V10l7-4v15M10 12l5-3v12M15 13l6-3v11M2 21h20" /></>}
      {name === "settings" && <><circle cx="12" cy="12" r="3" /><path d="M19 13.5v-3l-2-.7-.7-1.7.9-2-2.2-2.2-2 .9-1.7-.7-.7-2h-3l-.7 2-1.7.7-2-.9L1 6.1l.9 2-.7 1.7-2 .7v3l2 .7.7 1.7-.9 2L3.2 20l2-.9 1.7.7.7 2h3l.7-2 1.7-.7 2 .9 2.2-2.2-.9-2 .7-1.7z" transform="scale(.82) translate(2.6 2.6)" /></>}
      {name === "route" && <><circle cx="5" cy="18" r="2" /><circle cx="19" cy="6" r="2" /><path d="M7 18h4a3 3 0 0 0 3-3V9a3 3 0 0 1 3-3" /><path d="m4 8 3-3 3 3" /></>}
      {name === "structure" && <><path d="M4 21V5h16v16M4 9h16M8 5v16m8-16v16M2 21h20" /></>}
      {name === "controls" && <><path d="M4 6h16M4 12h16M4 18h16" /><circle cx="9" cy="6" r="2" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="2" fill="currentColor" stroke="none"/><circle cx="11" cy="18" r="2" fill="currentColor" stroke="none"/></>}
      {name === "equipment" && <><path d="M4 17V9h4l2-4h5l2 4h3v8M2 17h20v4H2z" /><circle cx="8" cy="13" r="2" /><path d="M12 11h5v4h-5" /></>}
      {name === "data" && <><path d="M4 20V10m5 10V4m6 16v-7m5 7V7" /></>}
      {name === "tank" && <><ellipse cx="12" cy="5" rx="6" ry="3" /><path d="M6 5v14c0 1.7 12 1.7 12 0V5M9 10h6m-6 4h6" /></>}
      {name === "headset" && <><path d="M3 13c0-5 2-8 9-8s9 3 9 8v3a2 2 0 0 1-2 2h-3l-2-3h-4l-2 3H5a2 2 0 0 1-2-2z" /><circle cx="8" cy="11" r="1"/><circle cx="16" cy="11" r="1"/></>}
      {name === "package" && <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9" /><path d="m8 5 8 4.5" /></>}
      {name === "desktop" && <><rect x="3" y="4" width="18" height="12" rx="1" /><path d="M8 21h8m-4-5v5" /></>}
      {name === "mobile" && <><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M10 5h4m-3 14h2" /></>}
      {name === "expand" && <><path d="M8 3H3v5m18 0V3h-5M3 16v5h5m8 0h5v-5" /></>}
      {name === "check" && <><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></>}
      {name === "training" && <><path d="m3 10 9-5 9 5-9 5zM7 13v4c3 2 7 2 10 0v-4M21 10v6" /></>}
    </svg>
  );
}

export function ProjectIcon({ name, size = "medium" }: { name: SumedIconName; size?: "small" | "medium" | "feature" }) {
  const px = size === "small" ? 18 : size === "feature" ? 30 : 23;
  return <span className={`sumed-project-icon sumed-project-icon--${size}`}><SumedIcon name={name} size={px} /></span>;
}
