export interface Project {
  number: string;
  title: string;
  location: string;
  category: string;
  theme: string;
  description: string;
  role: string;
  image: string;
  imageAlt: string;
  href: string;
}

export const projectsContent = {
  eyebrow: "01 / SELECTED WORK",
  headline: "Ideas made tangible.",
  body: "A selection of immersive environments, interactive applications, and real-time experiences developed for real-world use.",
  cta: {
    label: "Explore All Work",
    href: "#work",
  },
  projects: [
    {
      number: "01",
      title: "REMAL PARK",
      location: "SAUDI ARABIA",
      category: "VISUAL & 3D CONTENT",
      theme: "Cultural Visitor Experience",
      description:
        "High-fidelity 3D environments and visual content for an immersive visitor experience.",
      role: "3D Modeling & Visualization / Lighting / Environments",
      image: "/images/projects/remal-park/remal-park.jpg",
      imageAlt: "Remal Park Cultural Visitor Experience 3D Visualization",
      href: "#work",
    },
    {
      number: "02",
      title: "TAF35 ROBOT SIMULATION",
      location: "OMAN",
      category: "INTERACTIVE APPLICATION",
      theme: "Technical Product Explorer",
      description:
        "An interactive application for exploring complex products and systems in real time.",
      role: "UI Design & Implementation / Real-Time Integration",
      image: "/images/projects/taf35-robot/taf35-robot.png",
      imageAlt: "TAF35 Robot Interactive Application and Technical Explorer",
      href: "#work",
    },
    {
      number: "03",
      title: "INDUSTRIAL TRAINING EXPERIENCE",
      location: "EGYPT",
      category: "XR & IMMERSIVE SYSTEMS",
      theme: "Immersive Training Experience",
      description:
        "A VR-based training experience for operational procedures and equipment familiarization.",
      role: "Interactive 3D / Training Design / Development / Evaluation Support",
      image: "/images/projects/industrial-training/industrial-training.png",
      imageAlt: "Industrial Training Experience VR Procedure Simulation",
      href: "#work",
    },
  ] as Project[],
};
