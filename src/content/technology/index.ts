export interface TechPillar {
  number: string;
  title: string;
  description: string;
  specCode: string;
}

export const technologyContent = {
  eyebrow: "05 / TECHNOLOGY & AI",
  headlineLead: "The technology",
  headlineSub: "behind the",
  headlineHighlight: "experience.",
  body: "We bring together real-time development, spatial computing, optimized 3D content, and AI-enabled interaction to create experiences designed for their intended platforms and users.",
  pillars: [
    {
      number: "01",
      title: "REAL-TIME 3D & SPATIAL COMPUTING",
      specCode: "SYS.01 // SPATIAL-RUNTIME",
      description:
        "Interactive experiences built for the intended device, environment, and use case.",
    },
    {
      number: "02",
      title: "AI-ENABLED INTERACTION",
      specCode: "SYS.02 // ADAPTIVE-LOGIC",
      description:
        "Context-aware assistance, natural-language interaction, adaptive guidance, and multilingual support where they provide value.",
    },
    {
      number: "03",
      title: "OPTIMIZATION & DEPLOYMENT",
      specCode: "SYS.03 // EDGE-DELIVERY",
      description:
        "Performance-aware production, testing, and integration for practical delivery.",
    },
  ] as TechPillar[],
};
