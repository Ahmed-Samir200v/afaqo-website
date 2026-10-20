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
  filterCategory: "All Work" | "Immersive XR" | "Digital Twins" | "Interactive 3D" | "Visualization";
  image: string;
  imageAlt: string;
  href: string;
  featured?: boolean;
}

export const projectsContent = {
  eyebrow: "01 / SELECTED WORK",
  headline: "Ideas made tangible.",
  body: "A selection of projects and experiences spanning industrial visualization, interactive simulation and immersive environments.",
  cta: {
    label: "View All Work",
    href: "/work",
  },
  projects: [
    {
      number: "01",
      slug: "remal-park",
      title: "REMAL PARK",
      location: "SAUDI ARABIA",
      category: "VISUAL & 3D CONTENT",
      theme: "Cultural Visitor Experience",
      description:
        "High-fidelity 3D environments and visual content for an immersive visitor experience.",
      role: "3D Modeling & Visualization / Lighting / Environments",
      tags: ["Interactive 3D", "Visualization"],
      filterCategory: "Visualization",
      image: "/images/projects/remal-park/remal-park.jpg",
      imageAlt: "Remal Park Cultural Visitor Experience 3D Visualization",
      href: "/work/remal-park",
    },
    {
      number: "02",
      slug: "taf35-robot-simulation",
      title: "TAF35 ROBOT SIMULATION",
      location: "OMAN",
      category: "INTERACTIVE APPLICATION",
      theme: "Technical Product Explorer",
      description:
        "An interactive application for exploring complex products and systems in real time.",
      role: "UI Design & Implementation / Real-Time Integration",
      tags: ["Simulation", "Robotics"],
      filterCategory: "Interactive 3D",
      image: "/images/projects/taf35-robot/taf35-robot.png",
      imageAlt: "TAF35 Robot Interactive Application and Technical Explorer",
      href: "/work/taf35-robot-simulation",
    },
    {
      number: "03",
      slug: "industrial-training-experience",
      title: "INDUSTRIAL TRAINING EXPERIENCE",
      location: "EGYPT",
      category: "XR & IMMERSIVE SYSTEMS",
      theme: "Immersive Training Experience",
      description:
        "A VR-based training experience for operational procedures and equipment familiarization.",
      role: "Interactive 3D / Training Design / Development / Evaluation Support",
      tags: ["Simulation", "VR Training", "Real-Time 3D"],
      filterCategory: "Immersive XR",
      image: "/images/projects/industrial-training/industrial-training.png",
      imageAlt: "Industrial Training Experience VR Procedure Simulation",
      href: "/work/industrial-training-experience",
      featured: true,
    },
  ] as Project[],
};
