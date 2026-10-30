export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  href: string;
}

export const servicesContent = {
  eyebrow: "02 / WHAT WE DO",
  headline: "Different capabilities. One connected experience.",
  intro:
    "From understanding a challenge to designing, producing and implementing an interactive experience, we connect creative thinking with technical delivery.",
  supportingCopy:
    "We bring together experience design, 3D craftsmanship and real-time development to create purposeful digital solutions built around practical operational needs.",
  services: [
    {
      number: "01",
      title: "Extended Reality",
      description:
        "We design and develop VR, AR and mixed-reality experiences that help people interact with spaces, products and information in direct, purposeful ways.",
      tags: ["VR", "AR", "MR", "SPATIAL EXPERIENCES"],
      image: "/images/hero/afaqo-hero-desktop.jpg",
      href: "/services",
    },
    {
      number: "02",
      title: "Interactive 3D",
      description:
        "We turn complex equipment, products, and operational environments into experiences users can navigate, inspect, and understand.",
      tags: ["EQUIPMENT EXPLORATION", "INTERACTIVE 3D", "TECHNICAL VISUALIZATION"],
      image: "/images/projects/taf35-robot/taf35-robot.png",
      href: "/services",
    },
    {
      number: "03",
      title: "Digital Environments",
      description:
        "We create detailed 3D representations of facilities and environments for visualization, orientation, and interactive exploration.",
      tags: ["FACILITY VISUALIZATION", "SPATIAL ORIENTATION", "DIGITAL REPLICAS"],
      image: "/images/projects/remal-park/remal-park.jpg",
      href: "/services",
    },
    {
      number: "04",
      title: "Simulation & Training",
      description:
        "We build scenario-driven experiences that let teams learn about equipment, processes, and operational workflows in a digital setting.",
      tags: ["SIMULATION", "SCENARIO LEARNING", "IMMERSIVE TRAINING"],
      image: "/images/projects/industrial-training/oil and gas/industrial-training.png",
      href: "/services",
    },
  ] as ServiceItem[],
};
