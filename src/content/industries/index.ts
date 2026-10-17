export interface IndustryItem {
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
  href: string;
}

export const industriesContent = {
  eyebrow: "03 / INDUSTRIES",
  headlineStart: "Built around real-world",
  headlineAccent: "challenges.",
  supportingCopy:
    "Every industry has different systems, audiences, and goals. We shape immersive experiences around the context in which they will be used.",
  industries: [
    {
      number: "01",
      title: "Industry & Manufacturing",
      category: "MANUFACTURING",
      description:
        "Interactive systems, operational understanding, simulation, and training.",
      image: "/images/industries/manufacturing.webp",
      href: "#work",
    },
    {
      number: "02",
      title: "Oil & Gas",
      category: "ENERGY",
      description:
        "Immersive training, facility visualization, process understanding, and digital twin applications.",
      image: "/images/industries/oil-gas.webp",
      href: "#work",
    },
    {
      number: "03",
      title: "Education",
      category: "EDUCATION",
      description:
        "Immersive learning environments, interactive lessons, and experiential education.",
      image: "/images/industries/education.webp",
      href: "#work",
    },
    {
      number: "04",
      title: "Culture & Heritage",
      category: "HERITAGE",
      description:
        "Virtual exploration, cultural storytelling, and interactive heritage experiences.",
      image: "/images/industries/culture-heritage.webp",
      href: "#work",
    },
  ] as IndustryItem[],
};
