export interface BuildStage {
  stage: string;
  title: string;
  description: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  location: string;
  category: string;
  theme: string;
  summary: string;
  role: string;
  tags: string[];
  industry: string;
  deliverables: string;
  platform: string;
  challenge: string;
  approach: {
    step: string;
    title: string;
    desc: string;
  }[];
  tech: {
    engine: string;
    platform: string;
    output: string;
    status: string;
  };
  gallery: {
    image: string;
    caption: string;
  }[];
  buildProcess: BuildStage[];
  outcomes: {
    summary: string;
    deliverablesList: string[];
  };
  image: string;
  imageAlt: string;
  nextSlug: string;
}

export const caseStudies: Record<string, CaseStudy> = {
  "remal-park": {
    slug: "remal-park",
    title: "REMAL PARK",
    location: "SAUDI ARABIA",
    category: "VISUAL & 3D CONTENT",
    theme: "Cultural Visitor Experience",
    summary:
      "High-fidelity 3D environments and visual content for an immersive visitor experience.",
    role: "3D Modeling & Visualization / Lighting / Environments",
    tags: ["Interactive 3D", "Visualization", "Cultural Heritage"],
    industry: "Culture & Tourism",
    deliverables:
      "Architectural 3D models, environmental lighting setups, visual lookbook, 4K render sequences",
    platform: "Real-Time 3D & Digital Media",
    challenge:
      "Capturing the nuanced desert topography, architectural scale, and authentic lighting of Saudi heritage within an immersive visitor visual system.",
    approach: [
      {
        step: "01",
        title: "Site Analysis & Strategy",
        desc: "Studied cultural landscape references, architectural blueprints, and solar lighting parameters.",
      },
      {
        step: "02",
        title: "3D Environmental Modeling",
        desc: "Constructed modular terrain and structural assets optimized for visual fidelity and realism.",
      },
      {
        step: "03",
        title: "Lighting & Atmospherics",
        desc: "Engineered authentic daylight simulation and materials reflecting local desert sand properties.",
      },
      {
        step: "04",
        title: "Delivery & Master Media",
        desc: "Delivered finalized visual assets and high-resolution media outputs for exhibition integration.",
      },
    ],
    gallery: [
      {
        image: "/images/projects/remal-park/remal-park.jpg",
        caption: "Master environmental daylight simulation and architectural terrain reconstruction.",
      },
    ],
    buildProcess: [
      {
        stage: "01",
        title: "Topography Blockout & Spatial Alignment",
        description: "Mapped elevation blueprints into modular 3D terrain volumes matching authentic geographical context.",
      },
      {
        stage: "02",
        title: "PBR Material Calibration",
        description: "Authored physically based shaders replicating local desert sand, stone, and weathered architectural finishes.",
      },
      {
        stage: "03",
        title: "Solar & Atmospheric Simulation",
        description: "Configured accurate directional sunlight, ambient sky bounce, and atmospheric haze.",
      },
      {
        stage: "04",
        title: "High-Resolution Render Delivery",
        description: "Optimized geometry and delivered 4K master visual sequences for multi-display installation.",
      },
    ],
    tech: {
      engine: "Real-Time 3D Pipeline",
      platform: "High-Resolution Exhibition Displays",
      output: "Interactive Media & 3D Environment",
      status: "Production visuals delivered for exhibition integration",
    },
    outcomes: {
      summary:
        "Delivered verified 3D digital environments and atmospheric lighting assets enabling stakeholders to visualize the cultural masterplan with photorealistic clarity.",
      deliverablesList: [
        "Architectural & environmental master 3D asset package",
        "Geographically calibrated daylight and atmospheric lighting configurations",
        "Master 4K media render sequences prepared for public exhibition",
      ],
    },
    image: "/images/projects/remal-park/remal-park.jpg",
    imageAlt: "Remal Park Cultural Visitor Experience 3D Visualization",
    nextSlug: "taf35-robot-simulation",
  },

  "taf35-robot-simulation": {
    slug: "taf35-robot-simulation",
    title: "TAF35 ROBOT SIMULATION",
    location: "OMAN",
    category: "INTERACTIVE APPLICATION",
    theme: "Technical Product Explorer",
    summary:
      "An interactive application for exploring complex products and systems in real time.",
    role: "UI Design & Implementation / Real-Time Integration",
    tags: ["Simulation", "Robotics", "Interactive 3D"],
    industry: "Industrial & Robotics",
    deliverables:
      "Interactive 3D application, real-time kinematics controls, technical HUD interface",
    platform: "Interactive Web & Desktop Application",
    challenge:
      "Transforming dense engineering specifications and multi-axis robotics kinematics into an intuitive, responsive real-time explorer accessible to clients and operators.",
    approach: [
      {
        step: "01",
        title: "Robotics Kinematics Mapping",
        desc: "Translated CAD specifications and movement axes into optimized real-time 3D assemblies.",
      },
      {
        step: "02",
        title: "Interactive UI & HUD",
        desc: "Engineered precision interface components allowing inspection of sub-systems and metrics.",
      },
      {
        step: "03",
        title: "Real-Time Shader Tuning",
        desc: "Balanced realistic metallic reflections and hardware performance across client devices.",
      },
      {
        step: "04",
        title: "Application Deployment",
        desc: "Validated seamless user control, inspection modes, and interactive documentation.",
      },
    ],
    gallery: [
      {
        image: "/images/projects/taf35-robot/taf35-robot.png",
        caption: "Interactive robotics inspection viewport with mechanical hierarchy and live axis manipulation.",
      },
    ],
    buildProcess: [
      {
        stage: "01",
        title: "CAD Mesh Decimation & Optimization",
        description: "Converted manufacturing solid CAD geometry into lightweight, watertight real-time meshes.",
      },
      {
        stage: "02",
        title: "Kinematic Hierarchy & Pivot Rigging",
        description: "Established parent-child joint hierarchies and rotational limits matching physical robotic specs.",
      },
      {
        stage: "03",
        title: "PBR Industrial Shading",
        description: "Applied realistic industrial paint, brushed steel, and optical sensor surface characteristics.",
      },
      {
        stage: "04",
        title: "Interactive HUD & Telemetry Wiring",
        description: "Engineered responsive UI overlay displaying subsystem data, exploded views, and inspection tags.",
      },
    ],
    tech: {
      engine: "Interactive WebGL / Real-Time 3D",
      platform: "Web & Enterprise Desktop Workstations",
      output: "Technical Explorer Application",
      status: "Interactive product explorer delivered",
    },
    outcomes: {
      summary:
        "Shipped an interactive 3D technical explorer enabling operators and clients to manipulate, inspect, and evaluate robotic subassemblies without physical hardware constraints.",
      deliverablesList: [
        "Real-time 3D product explorer with fluid orbit and inspection modes",
        "Exploded component hierarchy with interactive part identification",
        "Cross-platform responsive runtime running smoothly in modern browsers",
      ],
    },
    image: "/images/projects/taf35-robot/taf35-robot.png",
    imageAlt: "TAF35 Robot Interactive Application and Technical Explorer",
    nextSlug: "industrial-training-experience",
  },

  "industrial-training-experience": {
    slug: "industrial-training-experience",
    title: "INDUSTRIAL TRAINING EXPERIENCE",
    location: "EGYPT",
    category: "XR & IMMERSIVE SYSTEMS",
    theme: "Immersive Training Experience",
    summary:
      "A VR-based training experience for operational procedures and equipment familiarization.",
    role: "Interactive 3D / Training Design / Development / Evaluation Support",
    tags: ["Simulation", "VR Training", "Real-Time 3D"],
    industry: "Oil & Gas / Manufacturing",
    deliverables:
      "VR training application, step-by-step procedural simulation, hazard assessment modules",
    platform: "Standalone & PC VR Systems",
    challenge:
      "Providing field technicians and engineering staff with authentic procedural training for hazardous industrial facilities without downtime or safety risks.",
    approach: [
      {
        step: "01",
        title: "Procedural Workflow Audit",
        desc: "Collaborated with operational specialists to chart critical safety protocols and valve operations.",
      },
      {
        step: "02",
        title: "Facility Digital Reconstruction",
        desc: "Modeled realistic industrial equipment, pressure piping, and control interfaces with accurate scale.",
      },
      {
        step: "03",
        title: "Interactive VR Simulation",
        desc: "Implemented realistic physics, haptic feedback, and procedural validation checks.",
      },
      {
        step: "04",
        title: "Evaluation & Deployment",
        desc: "Integrated performance telemetry and deployed training units for repeatable field learning.",
      },
    ],
    gallery: [
      {
        image: "/images/projects/industrial-training/industrial-training.png",
        caption: "VR industrial training station: valve operation and safety protocol verification.",
      },
    ],
    buildProcess: [
      {
        stage: "01",
        title: "Field Procedure Mapping",
        description: "Charted standard operating procedures, valve numbering schemes, and lockout-tagout (LOTO) protocols.",
      },
      {
        stage: "02",
        title: "Facility Environmental Modeling",
        description: "Reconstructed facility piping, pressure manifolds, and emergency cutoff switches with 1:1 scale.",
      },
      {
        stage: "03",
        title: "6DOF VR Interaction Scripting",
        description: "Engineered natural two-handed grip mechanics for valve turning and inspection tool manipulation.",
      },
      {
        stage: "04",
        title: "Performance & Jitter Optimization",
        description: "Optimized draw calls and vertex counts to maintain continuous 90 FPS performance on target VR hardware.",
      },
    ],
    tech: {
      engine: "VR Real-Time Engine (OpenXR)",
      platform: "Standalone VR Headsets & Simulation Stations",
      output: "Operational Training System",
      status: "Specialized training application deployed for field evaluation",
    },
    outcomes: {
      summary:
        "Delivered a functional virtual training environment allowing technical teams to practice critical facility operations and valve sequences with zero safety hazard.",
      deliverablesList: [
        "Interactive VR procedural training simulation with guided and exam modes",
        "Realistic physical feedback mechanics for valve operations and tooling",
        "Repeatable procedural validation pipeline reducing on-site training liabilities",
      ],
    },
    image: "/images/projects/industrial-training/industrial-training.png",
    imageAlt: "Industrial Training Experience VR Procedure Simulation",
    nextSlug: "remal-park",
  },
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}

export function getAllCaseStudies(): CaseStudy[] {
  return Object.values(caseStudies);
}

export function getAllCaseStudySlugs(): string[] {
  return Object.keys(caseStudies);
}
