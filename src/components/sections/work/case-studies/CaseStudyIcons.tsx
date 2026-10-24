import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

export function CaseStudyIcon({ kind, size = 24, ...props }: IconProps & { kind: "process" | "spatial" | "facility" | "inspect" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    {kind === "process" && <><circle cx="5" cy="12" r="2" /><circle cx="19" cy="6" r="2" /><circle cx="19" cy="18" r="2" /><path d="m7 11 10-4M7 13l10 4" /></>}
    {kind === "spatial" && <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9zM12 3v9m8-4.5-8 4.5m-8-4.5 8 4.5" /></>}
    {kind === "facility" && <><path d="M4 20V9l8-5 8 5v11M8 20v-6h8v6M4 20h16" /></>}
    {kind === "inspect" && <><path d="m10 14 4-4M13 15l2 2" /><circle cx="10" cy="10" r="5" /><path d="M15 15 20 20" /></>}
  </svg>;
}
