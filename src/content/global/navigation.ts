export const APP_ROUTES = {
  home: "/",
  work: "/work",
  services: "/services",
  industries: "/industries",
  technologyAI: "/technology-ai",
  about: "/about",
  companyProfile: "/company-profile",
  simulxr: "/simulxr",
  contact: "/contact",
} as const;

export type AppRoute = (typeof APP_ROUTES)[keyof typeof APP_ROUTES] | string;

export interface NavItem {
  label: string;
  href: AppRoute;
  isExternal?: boolean;
}

export interface NavigationContent {
  primaryNavigation: NavItem[];
  utilityNavigation: NavItem[];
  footerNavigation: NavItem[];
  primaryCTA: NavItem;
  metaUtility: string;
}

export function isRouteActive(currentPath: string, targetHref: string): boolean {
  if (!currentPath || !targetHref) return false;
  if (targetHref === "/") return currentPath === "/";
  if (targetHref.startsWith("#")) return currentPath === targetHref;
  return currentPath === targetHref || currentPath.startsWith(targetHref + "/");
}

export const navigationContent: NavigationContent = {
  primaryNavigation: [
    { label: "Work", href: APP_ROUTES.work },
    { label: "Services", href: APP_ROUTES.services },
    { label: "Industries", href: APP_ROUTES.industries },
    { label: "Technology & AI", href: APP_ROUTES.technologyAI },
    { label: "About", href: APP_ROUTES.about },
    { label: "Company Profile", href: APP_ROUTES.companyProfile },
  ],
  utilityNavigation: [
    { label: "SIMULXR", href: APP_ROUTES.simulxr },
  ],
  footerNavigation: [
    { label: "Work", href: APP_ROUTES.work },
    { label: "Services", href: APP_ROUTES.services },
    { label: "Industries", href: APP_ROUTES.industries },
    { label: "Technology & AI", href: APP_ROUTES.technologyAI },
    { label: "About", href: APP_ROUTES.about },
    { label: "Company Profile", href: APP_ROUTES.companyProfile },
    { label: "SIMULXR", href: APP_ROUTES.simulxr },
    { label: "Contact", href: APP_ROUTES.contact },
  ],
  primaryCTA: {
    label: "Start a Project",
    href: APP_ROUTES.contact,
  },
  metaUtility: "CAIRO — WORKING GLOBALLY",
};
