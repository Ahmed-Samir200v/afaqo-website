import type { SVGProps } from "react";

export const AFAQO_ICON_VIEWBOX = "0 0 24 24";
export const AFAQO_ICON_STROKE = 1.5;

export interface AfaqoIconProps extends Omit<SVGProps<SVGSVGElement>, "width" | "height" | "color"> {
  size?: 16 | 20 | 24 | 32 | 40 | 48 | number;
  strokeWidth?: number;
  title?: string;
}

/** Shared 24px technical icon frame used by every reusable AFAQO icon. */
export function AfaqoIcon({
  size = 24,
  strokeWidth = AFAQO_ICON_STROKE,
  title,
  children,
  ...props
}: AfaqoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={AFAQO_ICON_VIEWBOX}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function AfaqoArrow({ direction = "forward", ...props }: AfaqoIconProps & { direction?: "forward" | "up" | "back" }) {
  const path = direction === "up" ? "M5 12h14M13 6l6 6-6 6" : direction === "back" ? "M19 12H5M11 6l-6 6 6 6" : "M5 12h14M13 6l6 6-6 6";
  return <AfaqoIcon {...props}><path d={path} /></AfaqoIcon>;
}

export function AfaqoChevron({ direction = "down", ...props }: AfaqoIconProps & { direction?: "up" | "down" | "left" | "right" }) {
  const paths = { up: "m18 15-6-6-6 6", down: "m6 9 6 6 6-6", left: "m15 18-6-6 6-6", right: "m9 6 6 6-6 6" };
  return <AfaqoIcon {...props}><path d={paths[direction]} /></AfaqoIcon>;
}
