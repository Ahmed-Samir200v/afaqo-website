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
    title: "INDUSTRIAL DIGITAL TWIN & INTERACTIVE TRAINING",
    location: "CAIRO — WORKING GLOBALLY",
    category: "REAL-TIME 3D / INTERACTIVE SIMULATION",
    theme: "Spatial Industrial Simulation",
    summary:
      "A visual production journey connecting process references, detailed equipment and an explorable industrial environment.",
    role: "Real-Time 3D / Environmental Modeling / Interactive Systems",
    tags: ["Real-Time 3D", "Interactive Simulation", "Industrial Operations"],
    industry: "Industrial Operations",
    deliverables:
      "Industrial equipment and facility visualizations, exploded equipment presentation, interactive information states, route visualization",
    platform: "Interactive Web & Real-Time 3D",
    challenge:
      "Connecting multi-scale industrial systems—process logic, equipment assemblies, facility layout, and operator context—without reducing the work to a static render or an unreadable schematic.",
    approach: [
      {
        step: "01",
        title: "Read the System",
        desc: "Contextual translation of engineering diagrams and process references into spatial equipment relationships.",
      },
      {
        step: "02",
        title: "Resolve the Equipment",
        desc: "Isolated mechanical assemblies and exploded views establishing legible equipment hierarchy.",
      },
      {
        step: "03",
        title: "Assemble the Digital Facility",
        desc: "Navigable industrial scene combining pipe networks, structural frames, and process skids.",
      },
      {
        step: "04",
        title: "Add an Interaction Layer",
        desc: "Real-time contextual overlays, route highlighting, and camera movement for spatial orientation.",
      },
    ],
    gallery: [
      {
        image: "/images/projects/industrial-training/oil and gas/Image Sequence_001_0000.jpg",
        caption: "Modeled industrial processing facility with pump skids and structural pipework.",
      },
    ],
    buildProcess: [
      {
        stage: "01",
        title: "Engineering Reference Context",
        description: "Translating P&ID and layout documentation into spatial equipment relationships.",
      },
      {
        stage: "02",
        title: "Mechanical Component Decomposition",
        description: "Isolating pump-skid assemblies, valves, and structural elements for inspection.",
      },
      {
        stage: "03",
        title: "Spatial Environment Integration",
        description: "Composing modular equipment into an assembled facility with accurate relative scale.",
      },
      {
        stage: "04",
        title: "Interactive Real-Time Presentation",
        description: "Implementing route highlighting, contextual overlays, and camera navigation.",
      },
    ],
    tech: {
      engine: "Real-Time 3D & Web Graphics",
      platform: "Modern Workstations & Web Browsers",
      output: "Interactive 3D Facility & Simulation Sequence",
      status: "Visual production and interactive simulation sequences delivered",
    },
    outcomes: {
      summary:
        "Resolved complex industrial systems into a clear visual sequence—from engineering references and isolated equipment to an assembled, explorable real-time environment.",
      deliverablesList: [
        "Industrial equipment and facility visualizations",
        "Exploded equipment inspection presentation",
        "Contextual information overlays and process-route visualization",
        "High-resolution cinematic facility traversal sequences",
      ],
    },
    image: "/images/projects/industrial-training/oil and gas/Image Sequence_001_0000.jpg",
    imageAlt: "Modeled industrial processing facility with pump skids and structural pipework",
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
