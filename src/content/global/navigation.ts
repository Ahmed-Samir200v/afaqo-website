export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface NavigationContent {
  primaryNavigation: NavItem[];
  utilityNavigation: NavItem[];
  primaryCTA: NavItem;
  metaUtility: string;
}

export const navigationContent: NavigationContent = {
  primaryNavigation: [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Industries", href: "#industries" },
    { label: "Technology & AI", href: "#technology-ai" },
    { label: "About", href: "#about" },
  ],
  utilityNavigation: [
    { label: "SIMULXR", href: "#simulxr" },
  ],
  primaryCTA: {
    label: "Start a Project",
    href: "#contact",
  },
  metaUtility: "CAIRO — WORKING GLOBALLY",
};
