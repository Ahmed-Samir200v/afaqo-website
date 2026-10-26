export interface ProblemItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tag: string;
}

export interface TransformationStep {
  step: string;
  title: string;
  desc: string;
  tag: string;
}

export interface WorkflowItem {
  number: string;
  title: string;
  summary: string;
  inputs?: string[];
  description: string;
  phase: string;
}

export interface ReadinessSystem {
  id: string;
  number: string;
  title: string;
  headline: string;
  description: string;
  applications: string[];
  image: string;
  alt: string;
  badge: string;
}

export interface ScaleTier {
  id: string;
  level: string;
  title: string;
  subtitle: string;
  examples: string[];
  description: string;
  image: string;
}

export interface PilotPhase {
  number: string;
  title: string;
  description: string;
  detail: string;
}

export const SIMULXR_ASSETS = {
  hero: "/images/SIMULXR/Simulxr-Hero.png",
  heroFallback: "/images/projects/industrial-training/oil and gas/industrial-training.png",
  owtMain: "/images/projects/industrial-training/oil and gas/industrial-training.png",
  owtOverviewVideo: "/images/projects/industrial-training/oil and gas/Creating_industrial_showcase_video_1080p_20261018000805.mp4",
  owtTrainingVideo: "/images/projects/industrial-training/oil and gas/Create_interactive_plant_sequence_1080p_20261018000344.mp4",
  owtVideoPoster: "/images/projects/industrial-training/oil and gas/Image Sequence_001_0000.jpg",
  owtTrainingPoster: "/images/projects/industrial-training/oil and gas/691669b8-34da-4ef1-9349-1b0c6ba4b234.png",
  sourcePid: "/images/projects/industrial-training/oil and gas/95ae18b8-9180-4c82-b6f0-458551ddd4b5.png",
  experienceSpatial: "/images/projects/industrial-training/oil and gas/fc3f5f13-4e7f-4d91-85b7-110f8d37f1f9.png",
  explodedAssembly: "/images/projects/industrial-training/oil and gas/30a2d880-c678-4853-95a7-c734bd0934d6.png",
  pumpSkidDetail: "/images/projects/industrial-training/oil and gas/42c031f4-e7d3-495f-8e4d-5b7b397c2d82.png",
  facilityWide: "/images/projects/industrial-training/oil and gas/de83fd7a-6c84-434f-9cb3-f29c64f9ae2b.png",
  pipingRouting: "/images/projects/industrial-training/oil and gas/8a47c34f-a8b4-49c4-9d2a-37954110d509.png",
  tankInternals: "/images/projects/industrial-training/oil and gas/efb53474-9b4b-4db3-a3eb-18053181c2ca.png",
  controlSystems: "/images/projects/industrial-training/oil and gas/8c9e6730-aec3-4309-857d-47dc96db0384.png",
  quest3: "/images/projects/industrial-training/oil and gas/Quest 3.png",
  pico4: "/images/projects/industrial-training/oil and gas/Pico 4.png",
};

export const simulxrHeroData = {
  eyebrow: "SIMULXR / AN AFAQO INDUSTRIAL SOLUTION",
  headline: "BEFORE IT HAPPENS.",
  subheadline: "Industrial Simulation & Immersive Workforce Training",
  body: "Transform real facilities, equipment, and operational procedures into interactive training environments where teams can learn, practice and prepare before entering the real operation.",
  primaryCTA: { label: "Explore SIMULXR", href: "#solution" },
  secondaryCTA: { label: "Discuss a Pilot", href: "#pilot" },
  supportingTags: [
    "Facility Training",
    "Equipment Simulation",
    "Safety Readiness",
    "Operational Training",
  ],
  metaCoordinates: "SYS.CLASS // INDUSTRIAL WORKFORCE READINESS",
  metaStandard: "ENGINEERING-BACKED / DOMAIN-VALIDATED",
};

export const simulxrProblemData = {
  headline: "SOME SITUATIONS ARE TOO CRITICAL TO PRACTICE FOR THE FIRST TIME IN REALITY.",
  introParagraphs: [
    "Industrial teams are expected to operate complex equipment, follow critical procedures, and respond correctly when something goes wrong.",
    "Traditional training cannot always reproduce these conditions safely or realistically.",
  ],
  problems: [
    {
      id: "high-risk",
      number: "01",
      title: "HIGH-RISK SCENARIOS",
      description: "Critical situations are difficult or unsafe to recreate in physical operations.",
      tag: "RISK EXPOSURE",
    },
    {
      id: "downtime",
      number: "02",
      title: "OPERATIONAL DOWNTIME",
      description: "Training on live equipment can interrupt production schedules and active plant runs.",
      tag: "PRODUCTION IMPACT",
    },
    {
      id: "limited-exposure",
      number: "03",
      title: "LIMITED EXPOSURE",
      description: "New personnel and technicians have constrained physical access to complex facilities.",
      tag: "SPATIAL ACCESS",
    },
    {
      id: "theory-vs-action",
      number: "04",
      title: "THEORY VS. ACTION",
      description: "Knowing a procedure on paper is entirely different from performing it under pressure.",
      tag: "MUSCLE MEMORY GAP",
    },
    {
      id: "generic-training",
      number: "05",
      title: "GENERIC TRAINING",
      description: "Standard off-the-shelf training does not match the actual facility layout, equipment, or workflow.",
      tag: "DISCONNECTED CONTEXT",
    },
  ] as ProblemItem[],
};

export const simulxrSolutionData = {
  eyebrow: "THE SIMULXR APPROACH",
  headline: "TRAIN THE REAL OPERATION BEFORE THE REAL OPERATION.",
  copy: "SIMULXR transforms industrial assets, engineering information and operational knowledge into interactive digital environments designed for training, familiarization and scenario-based practice.",
  supportingStatement: [
    "Your facility.",
    "Your equipment.",
    "Your procedures.",
    "Your training environment.",
  ],
  transformationSequence: [
    {
      step: "01",
      title: "REAL FACILITY",
      desc: "Physical assets, equipment configurations, and operational geometry.",
      tag: "INPUT TRUTH",
    },
    {
      step: "02",
      title: "DIGITAL ENVIRONMENT",
      desc: "Scale-accurate, optimized 3D digital model structured for real-time interaction.",
      tag: "ENGINEERED MESH",
    },
    {
      step: "03",
      title: "INTERACTIVE TRAINING",
      desc: "Scenario logic, valve operations, inspection workflows, and abnormal conditions.",
      tag: "ACTIVE PRACTICE",
    },
    {
      step: "04",
      title: "PREPARED WORKFORCE",
      desc: "Trained operators confident in spatial layouts, procedural execution, and safety response.",
      tag: "VERIFIED OUTCOME",
    },
  ] as TransformationStep[],
};

export const simulxrWorkflowData = {
  headline: "FROM YOUR FACILITY TO A TRAINING ENVIRONMENT.",
  lead: "One connected industrial transformation process, built directly from engineering truth to validated runtime.",
  steps: [
    {
      number: "01",
      title: "COLLECT",
      summary: "Understand the real operation.",
      description:
        "We gather and review primary operational references directly from your engineering, safety, and training teams.",
      inputs: [
        "CAD",
        "BIM",
        "Navisworks",
        "Drawings",
        "Photos",
        "Videos",
        "SOPs",
        "Equipment Documentation",
        "Domain Expert Knowledge",
      ],
      phase: "INGESTION & TRUTH",
    },
    {
      number: "02",
      title: "RECONSTRUCT",
      summary: "Build an optimized real-time digital environment.",
      description:
        "Converting dense engineering information into high-performance, scale-accurate 3D assets and navigable plant spaces.",
      phase: "SPATIAL ARCHITECTURE",
    },
    {
      number: "03",
      title: "SIMULATE",
      summary: "Transform procedures into interactive training logic.",
      description:
        "Wiring kinematic constraints, valve states, procedural checklists, and operational failure modes into interactive sequences.",
      phase: "PROCEDURAL LOGIC",
    },
    {
      number: "04",
      title: "TRAIN",
      summary: "Deploy training through supported platforms.",
      description:
        "Deliver accessible, reliable runtimes across immersive and field hardware: Standalone VR, Enterprise PC VR, and Web/Desktop.",
      phase: "DEPLOYMENT",
    },
    {
      number: "05",
      title: "ASSESS",
      summary: "Evaluate trainee actions against learning objectives.",
      description:
        "Where assessment is included, evaluate trainee execution, procedural accuracy, safety adherence, and completion milestones.",
      phase: "EVALUATION",
    },
    {
      number: "06",
      title: "SCALE",
      summary: "Expand across the organization.",
      description:
        "Progress from a focused pilot into additional equipment, new scenarios, new facility zones, and comprehensive curriculum modules.",
      phase: "EXPANSION",
    },
  ] as WorkflowItem[],
};

export const simulxrReadinessData = {
  headline: "FOUR SYSTEMS. ONE GOAL: READINESS.",
  lead: "SIMULXR structures industrial learning into four dedicated readiness systems, each targeting a distinct operational capability.",
  systems: [
    {
      id: "facility-readiness",
      number: "01",
      title: "FACILITY READINESS",
      headline: "Prepare personnel to understand complex industrial environments.",
      description:
        "Navigate large-scale plants, processing bays, and structural elevations without interrupting live operations or exposing personnel to active hazards.",
      applications: [
        "Facility Familiarization",
        "Employee Onboarding",
        "Site Orientation",
        "Hazard Awareness",
        "Pre-Commissioning Training",
        "Existing Facility Training",
      ],
      image: SIMULXR_ASSETS.facilityWide,
      alt: "Facility layout overview showing multi-skid structures and piping manifolds",
      badge: "SPATIAL ORIENTATION",
    },
    {
      id: "equipment-readiness",
      number: "02",
      title: "EQUIPMENT READINESS",
      headline: "Practice equipment procedures before working on the physical asset.",
      description:
        "Explore pump skids, mechanical assemblies, and control cabinets with exploded views, cross-sections, and step-by-step mechanical interaction.",
      applications: [
        "Equipment Operation",
        "SOP Training",
        "Maintenance Procedures",
        "Inspection",
        "Troubleshooting",
        "Equipment Familiarization",
      ],
      image: SIMULXR_ASSETS.explodedAssembly,
      alt: "Exploded 3D view of an industrial pump skid showing component hierarchy",
      badge: "MECHANICAL DRILL-DOWN",
    },
    {
      id: "safety-readiness",
      number: "03",
      title: "SAFETY READINESS",
      headline: "Practice critical safety procedures in a controlled digital environment.",
      description:
        "Rehearse hazardous condition responses, lockout/tagout isolation, and emergency procedures repeatedly until response protocols become second nature.",
      applications: [
        "Emergency Response",
        "Gas Leak Scenarios",
        "Fire Response",
        "Evacuation",
        "LOTO",
        "Confined Space",
        "Permit-to-Work",
      ],
      image: SIMULXR_ASSETS.owtTrainingPoster,
      alt: "Interactive safety procedure verification in digital training environment",
      badge: "ZERO-HAZARD REHEARSAL",
    },
    {
      id: "operational-readiness",
      number: "04",
      title: "OPERATIONAL READINESS",
      headline: "Prepare personnel for operational procedures and decision-making.",
      description:
        "Walk operators through startup sequences, line line-ups, valve manifolds, and upset conditions so teams understand system interdependencies before operating.",
      applications: [
        "Startup",
        "Shutdown",
        "Emergency Shutdown",
        "Process Familiarization",
        "Operational Disturbances",
        "Operator Decision-Making",
      ],
      image: SIMULXR_ASSETS.tankInternals,
      alt: "Internal processing views and operational flow visualization",
      badge: "SYSTEM INTERDEPENDENCY",
    },
  ] as ReadinessSystem[],
};

export const simulxrInActionData = {
  eyebrow: "FLAGSHIP DEMONSTRATOR",
  headline: "SIMULXR IN ACTION.",
  project: "Oily Water Treatment Training Environment",
  copy: "A facility-based immersive demonstrator exploring how an industrial environment can be transformed into an interactive training experience for facility familiarization, equipment understanding, and procedure-based learning.",
  layers: [
    {
      title: "EXPLORE",
      description: "Understand the facility.",
      detail: "Freely navigate through pump skids, piping manifolds, and processing elevations to build mental spatial orientation.",
    },
    {
      title: "LEARN",
      description: "Understand systems and equipment.",
      detail: "Inspect components, view assembly breakdowns, and understand equipment tags and operating parameters.",
    },
    {
      title: "PRACTICE",
      description: "Follow procedures.",
      detail: "Step through standard operating protocols, valve line-ups, and isolation checks with guided feedback.",
    },
    {
      title: "RESPOND",
      description: "Experience abnormal situations where included.",
      detail: "Encounter process deviations and upset conditions in a safe, repeatable interactive environment.",
    },
    {
      title: "ASSESS",
      description: "Evaluate performance where supported.",
      detail: "Verify operator execution against agreed procedure checklists and learning objectives.",
    },
  ],
  ctaLabel: "Explore the Experience",
  videoTitle: "Oily Water Treatment Training Environment — Demonstrator",
};

export const simulxrOperationData = {
  headline: "NOT A GENERIC TRAINING WORLD.",
  copy: "SIMULXR can be developed around the facilities, equipment and procedures relevant to the organization.",
  inputsHeadline: "BUILT DIRECTLY FROM YOUR OPERATIONAL ASSETS:",
  inputs: [
    "CAD",
    "BIM",
    "Navisworks",
    "Engineering Drawings",
    "Site Photography",
    "Videos",
    "Equipment Documentation",
    "SOPs",
    "Subject Matter Expert Input",
  ],
  statement: [
    "YOUR ENVIRONMENT.",
    "YOUR PROCEDURES.",
    "YOUR TRAINING SCENARIOS.",
  ],
  slider: {
    sourceLabel: "SOURCE",
    sourceCaption: "Engineering / CAD / P&ID Reference",
    sourceImage: SIMULXR_ASSETS.sourcePid,
    sourceAlt: "P&ID engineering schematic used as the authentic source reference",
    experienceLabel: "EXPERIENCE",
    experienceCaption: "Optimized Real-Time SIMULXR Training Environment",
    experienceImage: SIMULXR_ASSETS.experienceSpatial,
    experienceAlt: "Reconstructed 3D spatial training environment derived from engineering references",
  },
};

export const simulxrScaleData = {
  headline: "START WITH ONE ASSET. SCALE TO THE FACILITY.",
  supportingCopy: [
    "SIMULXR does not require an organization to digitize an entire site from day one.",
    "Projects can start around a focused operational need and expand over time.",
  ],
  tiers: [
    {
      id: "equipment",
      level: "01",
      title: "EQUIPMENT",
      subtitle: "Component & Unit Focus",
      examples: ["Pump", "Valve", "Machine"],
      description:
        "Begin with a single high-criticality asset: inspect internal assemblies, master SOPs, and understand maintenance steps.",
      image: SIMULXR_ASSETS.explodedAssembly,
    },
    {
      id: "system",
      level: "02",
      title: "SYSTEM",
      subtitle: "Interconnected Machinery",
      examples: ["Skid", "Processing Unit", "Equipment Group"],
      description:
        "Connect related equipment into a functional system: understand electrical drives, local controls, and interconnected fluids.",
      image: SIMULXR_ASSETS.pumpSkidDetail,
    },
    {
      id: "area",
      level: "03",
      title: "AREA",
      subtitle: "Operational Zone",
      examples: ["Production Area", "Treatment Area", "Maintenance Zone"],
      description:
        "Expand to an entire physical plant sector: rehearse spatial routing, valve manifold line-ups, and zoned safety drills.",
      image: SIMULXR_ASSETS.pipingRouting,
    },
    {
      id: "facility",
      level: "04",
      title: "FACILITY",
      subtitle: "Complete Plant Environment",
      examples: ["Plant", "Industrial Site", "Large Operational Environment"],
      description:
        "Consolidate multiple zones into a unified digital facility: site-wide orientation, pre-commissioning walkthroughs, and emergency egress.",
      image: SIMULXR_ASSETS.facilityWide,
    },
  ] as ScaleTier[],
};

export const simulxrPilotData = {
  eyebrow: "SIMULXR PILOT",
  headline: "START WITH ONE REAL PROBLEM.",
  copy: "Begin with a focused operational or training challenge instead of committing to a full-facility implementation.",
  phases: [
    {
      number: "01",
      title: "ONE AREA",
      description: "A clearly defined facility area or environment.",
      detail: "Select a high-priority physical space where orientation or access is currently challenging.",
    },
    {
      number: "02",
      title: "ONE SYSTEM",
      description: "A piece of equipment or operational system.",
      detail: "Focus on a representative asset — such as a pump skid, manifold, or critical unit — to establish fidelity.",
    },
    {
      number: "03",
      title: "ONE OR TWO SCENARIOS",
      description: "Focused training objectives.",
      detail: "Scope specific procedural drills: a routine startup sequence, an inspection round, or an isolation check.",
    },
    {
      number: "04",
      title: "DEPLOYMENT",
      description: "VR and/or desktop, depending on the use case.",
      detail: "Test on target hardware: standalone headsets (e.g. Meta Quest 3) or enterprise desktop workstations.",
    },
    {
      number: "05",
      title: "EVALUATION",
      description: "Review the pilot against agreed objectives.",
      detail: "Gather structured feedback from operations, trainees, and instructors to validate readiness impact before scaling.",
    },
  ] as PilotPhase[],
  primaryCTA: { label: "Discuss a Pilot", href: "/contact?service=simulxr-pilot" },
  secondaryCTA: { label: "Talk to AFAQO", href: "/contact" },
};

export const simulxrPoweredData = {
  eyebrow: "POWERED BY AFAQO",
  headline: "INDUSTRIAL THINKING MEETS IMMERSIVE TECHNOLOGY.",
  copy: "SIMULXR combines AFAQO's capabilities in real-time 3D, XR, simulation, interactive design and digital environments with industrial knowledge and domain-expert validation.",
  capabilities: [
    "Real-Time 3D",
    "XR",
    "Simulation",
    "Interactive Systems",
    "Digital Environments",
    "Experience Strategy",
  ],
  signature: [
    "AFAQO builds the technology.",
    "SIMULXR structures the solution.",
    "Domain experts validate the industrial reality.",
  ],
  finalCTA: {
    label: "SIMULXR / AN AFAQO INDUSTRIAL SOLUTION",
    headline: "PREPARE FOR IT BEFORE IT HAPPENS.",
    copy: "Turn your facility, equipment or operational procedure into an interactive training experience.",
    primary: { label: "Discuss Your Pilot", href: "/contact?service=simulxr-pilot" },
    secondary: { label: "Explore AFAQO", href: "/work" },
  },
};
