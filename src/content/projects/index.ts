export type WorkFilter = "All Work" | "Immersive XR" | "Training & Simulation" | "Interactive 3D" | "Visualization";

export interface Project {
  number: string;
  slug: string;
  title: string;
  location: string;
  category: string;
  theme: string;
  description: string;
  role: string;
  tags: string[];
  filterCategory: WorkFilter;
  image: string;
  imageAlt: string;
  href: string;
  featured?: boolean;
}

export const workProjects: Project[] = [
    {
      number: "01",
      slug: "simulxr-owt",
      title: "OILY WATER TREATMENT",
      location: "EGYPT",
      category: "INDUSTRIAL XR TRAINING",
      theme: "Interactive Digital Facility",
      description:
        "An engineering-reference-based digital facility developed for immersive plant familiarization and scenario-based industrial training.",
      role: "Industrial 3D Production / VR Development / Scenario Development / Integration",
      tags: ["Industrial XR", "VR Training", "Oil & Gas"],
      filterCategory: "Training & Simulation",
      image: "/images/projects/SIMULXR OWT/01-owt-hero-facility.png",
      imageAlt: "Oily Water Treatment facility visualization",
      href: "/work/simulxr-owt",
      featured: true,
    },
    {
      number: "02",
      slug: "taf35-robot-simulation",
      title: "TAF35 ROBOT TRAINING",
      location: "SAUDI ARABIA",
      category: "TECHNICAL TRAINING SIMULATION",
      theme: "Confidential Procedural Training",
      description:
        "An immersive technical training system translating complex equipment documentation into interactive procedural learning.",
      role: "Technical 3D Reconstruction / Interaction Design / Procedural Simulation",
      tags: ["Training", "Simulation", "Interactive 3D"],
      filterCategory: "Training & Simulation",
      image: "/images/projects/taf35-robot/taf35-equipment-outdoor.webp",
      imageAlt: "TAF35 technical equipment training simulation",
      href: "/work/taf35-robot-simulation",
    },
    {
      number: "03",
      slug: "nakhal-fort",
      title: "NAKHAL FORT",
      location: "OMAN",
      category: "IMMERSIVE HERITAGE EXPERIENCE",
      theme: "Virtual Heritage Tour",
      description:
        "A VR experience transforming Nakhal Fort into an explorable digital heritage environment for spatial discovery and historical learning.",
      role: "Heritage Digitization / 3D Production / VR Experience Development",
      tags: ["VR", "Heritage", "Interactive 3D"],
      filterCategory: "Immersive XR",
      image: "",
      imageAlt: "",
      href: "/work/nakhal-fort",
    },
    {
      number: "04",
      slug: "remal-park",
      title: "REMAL PARK",
      location: "SAUDI ARABIA",
      category: "VR & ARCHITECTURAL EXPERIENCE",
      theme: "Destination Visualization & Exploration",
      description: "A destination transformed from architectural CAD into cinematic visualization and an interactive VR and desktop experience.",
      role: "CAD Interpretation / 3D Production / Visualization / Interactive Development",
      tags: ["VR", "Visualization", "Real-Time 3D"],
      filterCategory: "Visualization",
      image: "/images/projects/remal-park/remal-park.jpg",
      imageAlt: "Remal Park architectural visualization and interactive environment",
      href: "/work/remal-park",
    },
];

export const projectsContent = {
  eyebrow: "SELECTED WORK",
  headline: "Complex challenges. Tangible experiences.",
  body: "From cultural landmarks and future destinations to technical systems and industrial facilities, our work turns complex physical environments and information into interactive digital experiences.",
  cta: { label: "View All Work", href: "/work" },
  projects: workProjects.slice(0, 3),
};
