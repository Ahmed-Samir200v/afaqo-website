export interface HeroContent {
  eyebrow: string[];
  initialHeadline: string[];
  scrolledHeadline: string[];
  headline: string[];
  body: string;
  primaryCTA: {
    label: string;
    href: string;
  };
  secondaryCTA: {
    label: string;
    href: string;
  };
  metadata: {
    location: string;
    scrollHint: string;
  };
}

export interface WhatWeDoStage {
  number: string;
  shortLabel: string;
  title: string;
  description: string;
}

export interface WhatWeDoContent {
  eyebrow: string;
  headline: string;
  body: string;
  stages: WhatWeDoStage[];
  bottomSignature: {
    line1: string;
    line2: string;
  };
}

export interface DeliveryStage {
  number: string;
  title: string;
  description: string;
}

export interface DeliveryContent {
  eyebrow: string;
  headline: string;
  body: string;
  stages: DeliveryStage[];
}

export interface SimulXRContent {
  eyebrow: string;
  headline: string;
  body: string;
  cta: {
    label: string;
    href: string;
  };
}

export interface FinalCTAContent {
  eyebrow: string;
  headline: string;
  body: string;
  primaryCTA: {
    label: string;
    href: string;
  };
  secondaryCTA: {
    label: string;
    href: string;
  };
  footerMetadata: {
    brand: string;
    location: string;
  };
  footerLinks: {
    label: string;
    href: string;
  }[];
}

export const homeContent = {
  hero: {
    eyebrow: ["CREATIVE TECHNOLOGY /", "IMMERSIVE EXPERIENCES"],
    initialHeadline: [
      "FROM A",
      "SINGLE POINT",
      "TO INFINITE",
      "HORIZONS.",
    ],
    scrolledHeadline: [
      "AFAQO DESIGN AND BUILD",
      "IMMERSIVE EXPERIENCES",
      "FOR THE REAL WORLD.",
    ],
    headline: [
      "AFAQO DESIGN AND BUILD",
      "IMMERSIVE EXPERIENCES",
      "FOR THE REAL WORLD.",
    ],
    body: "AFAQO transforms ideas, spaces, and complex challenges into immersive digital experiences where creativity, technology, and human experience connect.",
    primaryCTA: {
      label: "Explore Our Work",
      href: "#work",
    },
    secondaryCTA: {
      label: "Start a Project",
      href: "#contact",
    },
    metadata: {
      location: "CAIRO — WORKING GLOBALLY",
      scrollHint: "SCROLL TO EXPLORE",
    },
  } as HeroContent,

  whatWeDo: {
    eyebrow: "02 / WHAT WE DO",
    headline: "More than visualization.\nExperiences built to work.",
    body: "Every experience begins with a single point — an idea, a challenge, or an opportunity. AFAQO connects strategy, creative direction, experience design, 3D production, and technology to turn that starting point into purposeful digital solutions.",
    stages: [
      {
        number: "01",
        shortLabel: "DISCOVER",
        title: "Strategy & Discovery",
        description:
          "We begin by understanding the idea, challenge, users, objectives, and opportunities.",
      },
      {
        number: "02",
        shortLabel: "DESIGN",
        title: "Creative & Experience Design",
        description:
          "We define the creative direction, user journey, interactions, and visual experience.",
      },
      {
        number: "03",
        shortLabel: "CREATE",
        title: "3D & Digital Content Production",
        description:
          "We produce optimized 3D environments, digital assets, and visual content for immersive and interactive experiences.",
      },
      {
        number: "04",
        shortLabel: "DEVELOP",
        title: "Interactive Development",
        description:
          "We develop and integrate interactive experiences for their intended platforms and use cases.",
      },
      {
        number: "05",
        shortLabel: "DELIVER",
        title: "Integration & Delivery",
        description:
          "We test, optimize, deploy, and hand over the solution, with ongoing support where agreed.",
      },
    ],
    bottomSignature: {
      line1: "FROM A SINGLE POINT",
      line2: "TO INFINITE HORIZONS ↗",
    },
  } as WhatWeDoContent,

  delivery: {
    eyebrow: "04 / HOW WE WORK",
    headline: "From the first idea to the final experience.",
    body: "One coordinated process across strategy, design, production, technology, and delivery.",
    stages: [
      {
        number: "01",
        title: "Discover",
        description:
          "Understand the challenge, audience, objectives, and requirements.",
      },
      {
        number: "02",
        title: "Define",
        description:
          "Establish the experience concept, scope, journey, and technical direction.",
      },
      {
        number: "03",
        title: "Design",
        description:
          "Develop visual language, interfaces, interactions, and storyboards.",
      },
      {
        number: "04",
        title: "Build",
        description:
          "Produce 3D content, develop the application, and integrate systems.",
      },
      {
        number: "05",
        title: "Validate",
        description:
          "Test usability, performance, technical requirements, and experience quality.",
      },
      {
        number: "06",
        title: "Deploy & Support",
        description:
          "Prepare delivery, deployment, documentation, and agreed ongoing support.",
      },
    ],
  } as DeliveryContent,

  simulxr: {
    eyebrow: "INTRODUCING SIMULXR",
    headline: "Industrial systems.\nImmersive understanding.",
    body: "SIMULXR is AFAQO’s specialized industrial simulation and immersive training initiative, focused on helping teams understand equipment, processes, and operational systems through interactive digital environments.",
    cta: {
      label: "Explore SIMULXR",
      href: "#simulxr",
    },
  } as SimulXRContent,

  finalCTA: {
    eyebrow: "READY WHEN YOU ARE",
    headline: "Let’s turn what’s next into something real.",
    body: "Have a project, partnership, or idea worth exploring? Let’s start the conversation.",
    primaryCTA: {
      label: "Start a Project",
      href: "#contact",
    },
    secondaryCTA: {
      label: "Partnership Inquiry",
      href: "#contact",
    },
    footerMetadata: {
      brand: "AFAQO",
      location: "CAIRO — WORKING GLOBALLY",
    },
    footerLinks: [
      { label: "Work", href: "#work" },
      { label: "Services", href: "#services" },
      { label: "Industries", href: "#industries" },
      { label: "Technology & AI", href: "#technology-ai" },
      { label: "SIMULXR", href: "#simulxr" },
    ],
  } as FinalCTAContent,
};
