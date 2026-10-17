export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  href: string;
}

export const servicesContent = {
  eyebrow: "02 / OUR SERVICES",
  headline: "What we create.",
  intro: "We don't just create digital experiences. We make ideas tangible.",
  supportingCopy:
    "From immersive worlds to interactive systems, we combine creativity, design, and technology to build experiences that connect with the real world.",
  services: [
    {
      number: "01",
      title: "Immersive Experiences",
      description:
        "We design and build augmented, virtual, and mixed reality experiences that connect people with new ways to learn, explore, and interact.",
      tags: ["AR", "VR", "MR", "SPATIAL EXPERIENCES"],
      image: "/images/hero/afaqo-hero-desktop.jpg",
      href: "#services",
    },
    {
      number: "02",
      title: "Interactive Digital Solutions",
      description:
        "We transform products, spaces, and complex systems into interactive applications, digital twins, and real-time experiences.",
      tags: ["DIGITAL TWINS", "SIMULATIONS", "INTERACTIVE APPS"],
      image: "/images/projects/taf35-robot/taf35-robot.png",
      href: "#services",
    },
    {
      number: "03",
      title: "3D Content & Visualization",
      description:
        "We create high-quality digital environments, products, and animations that bring ideas to life with precision and visual impact.",
      tags: ["3D ENVIRONMENTS", "VISUALIZATION", "ANIMATION"],
      image: "/images/projects/remal-park/remal-park.jpg",
      href: "#services",
    },
    {
      number: "04",
      title: "Experience Design & Development",
      description:
        "We shape ideas into intuitive, engaging experiences through creative direction, user-centered design, and technology.",
      tags: ["CREATIVE DIRECTION", "UX", "DEVELOPMENT"],
      image: "/images/projects/industrial-training/industrial-training.png",
      href: "#services",
    },
  ] as ServiceItem[],
};
