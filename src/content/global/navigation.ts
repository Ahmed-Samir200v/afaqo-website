export const APP_ROUTES = {
  home: "/", work: "/work", services: "/services", industries: "/industries",
  technologyAI: "/technology-ai", about: "/about", simulxr: "/simulxr", contact: "/contact",
} as const;

export type AppRoute = (typeof APP_ROUTES)[keyof typeof APP_ROUTES] | string;
export interface NavChildItem { label: string; href: AppRoute; }
export interface NavGroup { index?: string; label: string; href: AppRoute; description?: string; children?: NavChildItem[]; }
export interface MegaMenuContent { eyebrow: string; description: string; overviewLabel: string; groups: NavGroup[]; }
export interface NavItem { label: string; href: AppRoute; isExternal?: boolean; megaMenu?: MegaMenuContent; }
export interface NavigationContent {
  primaryNavigation: NavItem[]; utilityNavigation: NavItem[]; footerNavigation: NavItem[];
  primaryCTA: NavItem; metaUtility: string;
}

export function isRouteActive(currentPath: string, targetHref: string): boolean {
  if (!currentPath || !targetHref) return false;
  const targetPath = targetHref.split("#")[0];
  if (targetPath === "/") return currentPath === "/";
  return currentPath === targetPath || currentPath.startsWith(targetPath + "/");
}

const workMenu: MegaMenuContent = {
  eyebrow: "Selected work",
  description: "Explore shipped experiences across industrial simulation, interactive 3D and visual production.",
  overviewLabel: "View all work",
  groups: [
    { label: "Industrial Digital Twin & Interactive Training", href: "/work/industrial-training-experience", description: "Real-time industrial environment and interactive simulation." },
    { label: "TAF35 Robot Simulation", href: "/work/taf35-robot-simulation", description: "Interactive technical product explorer." },
    { label: "Remal Park", href: "/work/remal-park", description: "Cultural visitor environment and visual 3D content." },
  ],
};

const servicesMenu: MegaMenuContent = {
  eyebrow: "Services",
  description: "A direct map of AFAQO’s four connected creative-technology capabilities.",
  overviewLabel: "Explore all services",
  groups: [
    { index: "01", label: "Extended Reality (XR)", href: "/services/extended-reality", children: [
      { label: "Overview", href: "/services/extended-reality" },
      { label: "VR environments", href: "/services/extended-reality#vr-environments" },
      { label: "AR spatial applications", href: "/services/extended-reality#ar-spatial-applications" },
      { label: "Mixed-reality interfaces", href: "/services/extended-reality#mixed-reality-interfaces" },
      { label: "Cross-platform interactions", href: "/services/extended-reality#cross-platform-interactions" },
    ] },
    { index: "02", label: "Interactive 3D & Digital Environments", href: "/services/interactive-3d", children: [
      { label: "Overview", href: "/services/interactive-3d" },
      { label: "Facility and equipment explorers", href: "/services/interactive-3d#facility-and-equipment-explorers" },
      { label: "Digital replicas", href: "/services/interactive-3d#digital-replicas" },
      { label: "Component inspection", href: "/services/interactive-3d#component-inspection" },
      { label: "WebGL and native applications", href: "/services/interactive-3d#webgl-and-native-applications" },
    ] },
    { index: "03", label: "Real-Time 3D Production", href: "/services/real-time-3d-production", children: [
      { label: "Overview", href: "/services/real-time-3d-production" },
      { label: "Environment modeling", href: "/services/real-time-3d-production#environment-modeling" },
      { label: "Materials & lighting", href: "/services/real-time-3d-production#materials-and-lighting" },
      { label: "Real-time optimization", href: "/services/real-time-3d-production#real-time-optimization" },
      { label: "Cinematic sequences", href: "/services/real-time-3d-production#cinematic-sequences" },
    ] },
    { index: "04", label: "Simulation & Immersive Training", href: "/services/simulation-immersive-training", children: [
      { label: "Overview", href: "/services/simulation-immersive-training" },
      { label: "Scenario-based training", href: "/services/simulation-immersive-training#scenario-based-training" },
      { label: "Interactive walkthroughs", href: "/services/simulation-immersive-training#interactive-walkthroughs" },
      { label: "Guided learning flows", href: "/services/simulation-immersive-training#guided-learning-flows" },
      { label: "Multi-platform delivery", href: "/services/simulation-immersive-training#multi-platform-delivery" },
    ] },
  ],
};

const technologyMenu: MegaMenuContent = {
  eyebrow: "Technology & AI",
  description: "The engines, spatial systems and production workflows behind AFAQO experiences.",
  overviewLabel: "Technology overview",
  groups: [
    { label: "Technology areas", href: "/technology-ai#technology-areas", children: [
      { label: "Real-Time Engines", href: "/technology-ai#real-time-engines" },
      { label: "Spatial Computing", href: "/technology-ai#spatial-computing" },
      { label: "3D Asset Pipeline", href: "/technology-ai#3d-asset-pipeline" },
      { label: "Selective AI Integration", href: "/technology-ai#selective-ai-integration" },
    ] },
    { label: "Production & delivery", href: "/technology-ai#production-pipeline", children: [
      { label: "3D production pipeline", href: "/technology-ai#production-pipeline" },
      { label: "Spatial computing modalities", href: "/technology-ai#spatial-modalities" },
      { label: "AI in practice", href: "/technology-ai#ai-in-practice" },
    ] },
  ],
};

export const navigationContent: NavigationContent = {
  primaryNavigation: [
    { label: "Work", href: APP_ROUTES.work, megaMenu: workMenu },
    { label: "Services", href: APP_ROUTES.services, megaMenu: servicesMenu },
    { label: "Industries", href: APP_ROUTES.industries },
    { label: "Technology & AI", href: APP_ROUTES.technologyAI, megaMenu: technologyMenu },
    { label: "About", href: APP_ROUTES.about },
  ],
  utilityNavigation: [{ label: "SIMULXR", href: APP_ROUTES.simulxr }],
  footerNavigation: [
    { label: "Work", href: APP_ROUTES.work }, { label: "Services", href: APP_ROUTES.services },
    { label: "Industries", href: APP_ROUTES.industries }, { label: "Technology & AI", href: APP_ROUTES.technologyAI },
    { label: "About", href: APP_ROUTES.about }, { label: "SIMULXR", href: APP_ROUTES.simulxr },
    { label: "Contact", href: APP_ROUTES.contact },
  ],
  primaryCTA: { label: "Start a Project", href: APP_ROUTES.contact },
  metaUtility: "CAIRO — WORKING GLOBALLY",
};
