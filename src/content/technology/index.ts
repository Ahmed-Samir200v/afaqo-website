export interface TechPillar {
  number: string;
  title: string;
  description: string;
  specCode: string;
}

export const technologyContent = {
  eyebrow: "05 / TECHNOLOGY & ARCHITECTURE",
  headlineLead: "The right technology",
  headlineSub: "serves the",
  headlineHighlight: "experience.",
  body: "We select platforms, runtimes and pipelines based on what the experience must achieve. Every technical choice balances fidelity, stability and practical delivery.",
  pillars: [
    {
      number: "01",
      title: "REAL-TIME 3D & SPATIAL COMPUTING",
      specCode: "SYS.01 // SPATIAL-RUNTIME",
      description:
        "Interactive experiences built for the intended device, environment, and operational use case.",
    },
    {
      number: "02",
      title: "SELECTIVE AI INTEGRATION",
      specCode: "SYS.02 // ADAPTIVE-LOGIC",
      description:
        "Targeted AI workflows that improve production velocity and provide contextual assistance where they add clear value.",
    },
    {
      number: "03",
      title: "OPTIMIZATION & DEPLOYMENT",
      specCode: "SYS.03 // EDGE-DELIVERY",
      description:
        "Performance-aware production, testing, and integration for dependable delivery across target platforms.",
    },
  ] as TechPillar[],
};
