export interface IndustryItem {
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
  href: string;
}

export const industriesContent = {
  eyebrow: "03 / WHERE WE APPLY TECHNOLOGY",
  headlineStart: "Built around the challenge,",
  headlineAccent: "not the industry label.",
  supportingCopy:
    "Every environment has different users, constraints and outcomes. We shape experiences around the information people need to understand and the decisions they need to make.",
  industries: [
    {
      number: "01",
      title: "Industry & Manufacturing",
      category: "MANUFACTURING",
      description:
        "Interactive systems for operational walk-throughs, workflow training and machine comprehension.",
      image: "/images/industries/manufacturing.webp",
      href: "/industries",
    },
    {
      number: "02",
      title: "Oil & Gas",
      category: "ENERGY",
      description:
        "Immersive modules for facility visualization, procedural safety and plant orientation.",
      image: "/images/industries/oil-gas.webp",
      href: "/industries",
    },
    {
      number: "03",
      title: "Education",
      category: "EDUCATION",
      description:
        "Interactive 3D environments turning complex engineering and scientific concepts into explorable models.",
      image: "/images/industries/education.webp",
      href: "/industries",
    },
    {
      number: "04",
      title: "Culture & Heritage",
      category: "HERITAGE",
      description:
        "Digital environments and spatial storytelling making historical landmarks accessible anywhere.",
      image: "/images/industries/culture-heritage.webp",
      href: "/industries",
    },
  ] as IndustryItem[],
};
