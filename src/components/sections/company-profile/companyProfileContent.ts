/**
 * AFAQO Company Profile — Structured Content & Source Traceability Model
 * 
 * Maps all 29 source pages from `public/company-profile/{1..29}.png` and `AFAQO-company-profile.pdf`
 * into 8 coherent web chapters while preserving original sequence, exact meaning, and claim safety bounds.
 */

export interface SourceMapping {
  sourcePages: number[];
  chapterId: string;
  chapterNumber: string;
  title: string;
}

export const PDF_DOWNLOAD_SPEC = {
  url: "/company-profile/AFAQO-company-profile.pdf",
  filename: "AFAQO-company-profile.pdf",
  sizeLabel: "86.1 MB",
  accessibleLabel: "Download AFAQO Company Profile (PDF, 86.1 MB)",
  sha256: "fb6e0c135d4b221daa531d74436aaa6849df978e817f44e6d405f9813ac25d6b",
};

export const CHAPTER_INDEX: SourceMapping[] = [
  { sourcePages: [1, 2], chapterId: "cp01", chapterNumber: "01", title: "Horizon / Arrival" },
  { sourcePages: [3, 4, 5], chapterId: "cp02", chapterNumber: "02", title: "Identity & Purpose" },
  { sourcePages: [6, 7, 8], chapterId: "cp03", chapterNumber: "03", title: "Capability System" },
  { sourcePages: [9, 10], chapterId: "cp04", chapterNumber: "04", title: "Brand Architecture" },
  { sourcePages: [11, 12, 13, 14], chapterId: "cp05", chapterNumber: "05", title: "Digital Reality" },
  { sourcePages: [15, 16, 17, 18, 19, 20], chapterId: "cp06", chapterNumber: "06", title: "Robot Simulation" },
  { sourcePages: [21, 22, 23, 24, 25, 26, 27, 28], chapterId: "cp07", chapterNumber: "07", title: "Systems & Delivery" },
  { sourcePages: [29], chapterId: "cp08", chapterNumber: "08", title: "Closing Horizon" },
];

export const companyProfileData = {
  // CP01: Pages 1-2
  cp01: {
    chapterNumber: "01",
    chapterId: "cp01",
    sourcePages: [1, 2],
    eyebrow: "01 / AFAQO COMPANY PROFILE",
    h1: "Transforming Ideas Into Experiences",
    subtitle: "Creative Technology Built Around Experience",
    positioning:
      "AFAQO combines creative thinking, 3D production, experience design, and real-time technology to create immersive environments that people can see, explore, and interact with.",
    taxonomy: [
      "CREATIVE TECHNOLOGY",
      "REAL-TIME 3D",
      "SPATIAL SYSTEMS",
      "CAIRO — WORKING GLOBALLY",
    ],
    coverArtwork: "/company-profile/1.png",
    positioningArtwork: "/company-profile/2.png",
  },

  // CP02: Pages 3-5
  cp02: {
    chapterNumber: "02",
    chapterId: "cp02",
    sourcePages: [3, 4, 5],
    eyebrow: "02 / IDENTITY & PURPOSE",
    title: "Creative Thinking. Technical Execution.",
    disciplines: [
      {
        tag: "DISCIPLINE 01",
        label: "Creative Thinking",
        description: "Conceptualization, user journey design, spatial narratives, and purposeful storytelling.",
      },
      {
        tag: "DISCIPLINE 02",
        label: "3D Production",
        description: "High-precision CAD reconstruction, hard-surface modeling, procedural texturing, and photoreal rendering.",
      },
      {
        tag: "DISCIPLINE 03",
        label: "Experience Design",
        description: "Ergonomic human-computer interfaces, spatial interaction schemas, and immersive navigation.",
      },
      {
        tag: "DISCIPLINE 04",
        label: "Real-Time Technology",
        description: "Real-time game engine architecture, deterministic simulation logic, and cross-platform deployment.",
      },
    ],
    visionMission: {
      headline: "Designing How People Experience the Digital World",
      vision: {
        label: "OUR VISION",
        statement:
          "To become a trusted partner in creating digital experiences that connect the physical world with virtual possibilities.",
      },
      mission: {
        label: "OUR MISSION",
        statement:
          "To combine creative thinking and technical execution around real user and business needs, turning complex systems into intuitive interactions.",
      },
    },
    purpose: {
      headline: "Beyond Seeing. Toward Experiencing.",
      lead: "Turning complex ideas, environments, and information into experiences that are easier to understand, explore, and master.",
      body: "We believe true immersion is more than visual spectacle. It is the clarity that comes when a user can manipulate a hazardous industrial valve without danger, step into unbuilt architecture at human scale, or navigate an intricate process intuitively.",
    },
    artwork: {
      whoWeAre: "/company-profile/3.png",
      direction: "/company-profile/4.png",
      purpose: "/company-profile/5.png",
    },
  },

  // CP03: Pages 6-8
  cp03: {
    chapterNumber: "03",
    chapterId: "cp03",
    sourcePages: [6, 7, 8],
    eyebrow: "03 / CAPABILITY SYSTEM",
    title: "Technology That Adapts to the Experience",
    subtitle: "A connected framework spanning strategic industries, specialized capabilities, and structured delivery.",
    industries: [
      {
        id: "industrial",
        number: "01",
        name: "Industrial & Enterprise",
        scope: "Digital twins, procedural training skids, hazardous operation drills, and equipment familiarization.",
        focus: "Operational safety, procedure compliance, and zero-downtime training.",
      },
      {
        id: "education",
        number: "02",
        name: "Education & Training",
        scope: "Interactive spatial learning labs, STEM simulations, and procedural skill-transfer modules.",
        focus: "Active learning, retention acceleration, and intuitive spatial discovery.",
      },
      {
        id: "architecture",
        number: "03",
        name: "Architecture & Real Estate",
        scope: "Interactive spatial walkthroughs, digital masterplans, daylight simulation, and unbuilt spatial verification.",
        focus: "Design validation, stakeholder buy-in, and immersive pre-visualization.",
      },
      {
        id: "culture",
        number: "04",
        name: "Culture & Heritage",
        scope: "High-fidelity digital preservation, historic reconstructions, and interactive museum exhibits.",
        focus: "Cultural preservation, emotional resonance, and global public accessibility.",
      },
      {
        id: "technology",
        number: "05",
        name: "Technology & Innovation",
        scope: "Robotics pre-simulation, autonomous vehicle testing grounds, and emerging spatial computing concepts.",
        focus: "Technical prototyping, human-robot interaction, and edge innovation.",
      },
    ],
    capabilities: [
      {
        number: "01",
        name: "Immersive Experiences",
        tagline: "Presence and spatial interaction",
        services: ["Spatial UX Design", "Virtual Reality (VR)", "Augmented Reality (AR)", "Multi-User Environments"],
      },
      {
        number: "02",
        name: "Real-Time 3D",
        tagline: "High-performance interactive execution",
        services: ["Game Engine Architecture", "Cross-Platform Optimization", "Interactive Physics Logic", "Custom Shaders & Lighting"],
      },
      {
        number: "03",
        name: "3D Visualization",
        tagline: "Photorealistic fidelity and precision",
        services: ["CAD & Engineering Data Prep", "Hard-Surface Mechanical Modeling", "PBR Material Craft", "Cinematic Environment Renders"],
      },
      {
        number: "04",
        name: "Simulation & Learning",
        tagline: "Procedural rigor and telemetry",
        services: ["Step-by-Step Training Logic", "Emergency Response Drills", "In-World HUD Interfaces", "Scenario Assessment Metrics"],
      },
    ],
    deliveryPipeline: [
      { step: "01", phase: "Strategy", detail: "Problem framing, operational requirements, user needs, and hardware scoping." },
      { step: "02", phase: "XR & Immersive Systems", detail: "Interaction design, ergonomic testing, spatial layout, and user journey mapping." },
      { step: "03", phase: "3D & Digital Content", detail: "Asset modeling, engineering geometry optimization, texturing, and scene composition." },
      { step: "04", phase: "Interactive Engineering", detail: "Logic scripting, system mechanics, physics calibration, and telemetry integration." },
      { step: "05", phase: "Deployment & Integration", detail: "Target hardware packaging (Desktop/Standalone XR), installation, and runtime tuning." },
      { step: "06", phase: "QA & Verification", detail: "Performance profiling (FPS/frame pacing), boundary stress testing, and usability checks." },
      { step: "07", phase: "Post-Launch Support", detail: "Lifecycle maintenance, procedural content updates, and operational support." },
    ],
    artwork: {
      industries: "/company-profile/6.png",
      capabilities: "/company-profile/7.png",
      delivery: "/company-profile/8.png",
    },
  },

  // CP04: Pages 9-10
  cp04: {
    chapterNumber: "04",
    chapterId: "cp04",
    sourcePages: [9, 10],
    eyebrow: "04 / BRAND ROLES & TRANSITION",
    title: "Complementary Focus. Clear Brand Roles.",
    subtitle: "Structured initiatives tailored to distinct client realities.",
    roles: [
      {
        brand: "AFAQO",
        eyebrow: "CREATIVE TECHNOLOGY & IMMERSIVE EXPERIENCES",
        lead: "Broader Creative Technology & Spatial Solutions",
        description:
          "Focusing on immersive brand destinations, interactive real-time 3D, architecture pre-visualization, cultural heritage, and custom experiential installations.",
        deliverables: [
          "Interactive Web & Desktop 3D",
          "Spatial Architectural Pre-Vis",
          "Cultural & Museum Installations",
          "High-Impact Brand Experiences",
        ],
      },
      {
        brand: "SIMULXR",
        eyebrow: "SPECIALIZED INITIATIVE BY AFAQO",
        lead: "Industrial Simulation & Procedural XR Training",
        description:
          "Dedicated specifically to high-consequence operational simulation, hazardous procedure training, machinery disassembly, and technical STEM education.",
        deliverables: [
          "Virtual Reality Procedural Trainers",
          "Hazardous Environment Drills",
          "Interactive Mechanical Skids",
          "Educational VR Curricula",
        ],
      },
    ],
    clarificationNote: {
      label: "SOURCE DISCLOSURE & TRACEABILITY",
      text: "Page 9 of the supplied company profile names 'EIDOSIA' in text while visually displaying the AFAQO brand identity mark on the left card. In accordance with strict brand governance, this page is represented under the confirmed AFAQO identity without inferring unverified corporate relationships.",
    },
    transition: {
      headline: "One Team. From Problem to Experience.",
      lead: "Bridging the gap between engineering complexity and intuitive human experience.",
      actionPrompt: "Now, see it in practice.",
      artwork: "/company-profile/10.png",
    },
    artwork: {
      roles: "/company-profile/9.png",
      transition: "/company-profile/10.png",
    },
  },

  // CP05: Pages 11-14
  cp05: {
    chapterNumber: "05",
    chapterId: "cp05",
    sourcePages: [11, 12, 13, 14],
    eyebrow: "05 / CASE STUDY: INDUSTRIAL DIGITAL TWIN",
    title: "Engineering References to Digital Reality",
    subtitle: "A digital-twin and procedural training production journey turning complex CAD into real-time environments.",
    stages: [
      {
        step: "01",
        title: "Engineering References",
        desc: "Ingestion and contextual translation of P&ID drawings, piping manifests, structural sketches, and site photography.",
      },
      {
        step: "02",
        title: "3D Equipment Reconstruction",
        desc: "High-precision hard-surface modeling of pumps, manifolds, pressure vessels, and control valves with millimetric scale.",
      },
      {
        step: "03",
        title: "Facility Scene Assembly",
        desc: "Spatial layout integration assembling pipe networks, platforms, safety barriers, and environmental structural steelwork.",
      },
      {
        step: "04",
        title: "Real-Time Environment",
        desc: "Shader authoring, physical material calibration, real-time lighting setup, and performance budget optimization.",
      },
    ],
    trainingOutcomes: [
      {
        id: "interaction",
        number: "01",
        label: "Interactive Equipment",
        detail: "Direct manipulation of mechanical valves, emergency switches, and digital gauge readouts.",
      },
      {
        id: "process",
        number: "02",
        label: "Process Flow Visualization",
        detail: "Visualizing fluid flow vectors, pressure differentials, and internal pipe trajectories.",
      },
      {
        id: "simulation",
        number: "03",
        label: "Operational Scenarios",
        detail: "Standard operating procedures and sequential start-up/shut-down checklists.",
      },
      {
        id: "safety",
        number: "04",
        label: "Hazard Simulation",
        detail: "Safe exposure to emergency leaks, pressure anomalies, and isolation protocol verification.",
      },
    ],
    productionCraft: {
      headline: "Engineered with Precision. Built for Real Time.",
      dccLabel: "DCC Viewport & Topology",
      dccDesc: "Clean quad-dominant edge-flow optimized for real-time vertex shaders without visual fidelity loss.",
      realtimeLabel: "Real-Time Render Quality",
      realtimeDesc: "Physically based materials capturing metal roughness, weather-worn paint, and realistic ambient occlusion.",
    },
    artwork: {
      opener: "/company-profile/11.png",
      process: "/company-profile/12.png",
      training: "/company-profile/13.png",
      production: "/company-profile/14.png",
    },
  },

  // CP06: Pages 15-20
  cp06: {
    chapterNumber: "06",
    chapterId: "cp06",
    sourcePages: [15, 16, 17, 18, 19, 20],
    eyebrow: "06 / ROBOT SIMULATION CASE STUDY",
    provenanceBadge: "FOUNDING TEAM EXPERIENCE — PRIOR ENGAGEMENT",
    provenanceNotice:
      "This project represents prior professional experience completed before the founding of AFAQO by the founding team during a previous engagement with a multidisciplinary team. It is presented to illustrate core technical execution capabilities in robotics 3D reconstruction and VR simulation.",
    title: "TAF35 Firefighting Robot VR Training",
    subtitle: "A machine-to-training journey transforming heavy industrial robotics into an interactive emergency response simulator.",
    orthographicViews: [
      { id: "front", label: "Front Aspect", desc: "Nozzle array, forward thermal optics, and heavy steel tracks." },
      { id: "side", label: "Profile & Engine", desc: "Drive sprocket, hydraulic armatures, and intake louvers." },
      { id: "top", label: "Top-Down Deck", desc: "Ventilation geometry, hose couplings, and lifting lugs." },
      { id: "perspective", label: "3D Perspective", desc: "Fully articulated mechanical assembly ready for real-time rigging." },
    ],
    steps: [
      {
        number: "01",
        title: "Robot Asset Build",
        desc: "Four-phase asset pipeline: reference analysis, mechanical modeling, kinematics rigging, and texture preparation.",
        pageRef: 16,
      },
      {
        number: "02",
        title: "Industrial Environment",
        desc: "Constructing an expansive manufacturing ground with contextual machinery, overhead cranes, and hazards.",
        pageRef: 17,
      },
      {
        number: "03",
        title: "Interactive VR Interface",
        desc: "In-world dual-hand controller mechanics, virtual joystick control, and bilingual operational HUD displays.",
        pageRef: 18,
      },
      {
        number: "04",
        title: "Scenario Emergency Response",
        desc: "Dynamic fire suppression drills, combustible gas cloud containment, and situational awareness drills.",
        pageRef: 19,
      },
    ],
    multidisciplinaryTeam: {
      headline: "One Connected Training Experience",
      lead: "Delivered through a synchronized multidisciplinary workflow across 6 specialized functional roles.",
      roles: [
        { role: "3D Lead & Asset Modeler", contribution: "Mechanical reconstruction, CAD topology optimization, and texturing." },
        { role: "Rigging & Kinematics Specialist", contribution: "Hydraulic piston constraints, track treads, and nozzle articulation." },
        { role: "Environment Artist", contribution: "Factory interior lighting, spatial scale, and industrial props." },
        { role: "VR UI/UX Designer", contribution: "Ergonomic controller schema, bilingual HUD, and menu usability." },
        { role: "Simulation Engineer", contribution: "Water projectile trajectory physics, fire suppression logic, and states." },
        { role: "Technical Project Lead", contribution: "Milestone architecture, hardware profiling, and procedure sign-off." },
      ],
    },
    artwork: {
      opener: "/company-profile/15.png",
      build: "/company-profile/16.png",
      environment: "/company-profile/17.png",
      vrInterface: "/company-profile/18.png",
      emergency: "/company-profile/19.png",
      outcome: "/company-profile/20.png",
    },
  },

  // CP07: Pages 21-28
  cp07: {
    chapterNumber: "07",
    chapterId: "cp07",
    sourcePages: [21, 22, 23, 24, 25, 26, 27, 28],
    eyebrow: "07 / SYSTEMS IN DEVELOPMENT & DELIVERY",
    // Subchapter 7A: SIMULXR Demo (In Development)
    simulxrDemo: {
      statusBadge: "STATUS: XR TRAINING DEMO — IN DEVELOPMENT",
      statusNote: "Engineering validation, procedural scoring modules, and field testing are actively planned.",
      title: "Industrial Training Reimagined",
      subtitle: "SIMULXR Oily-Water Treatment Plant XR Simulation",
      challengeHeadline: "Complex Processes. Clearer Understanding.",
      challenges: [
        {
          num: "01",
          title: "Process Complexity",
          desc: "Industrial separation involves chemical dosing, dissolved air flotation, and skimming skids that are difficult to visualize externally.",
        },
        {
          num: "02",
          title: "Operational Awareness",
          desc: "Field operators must understand multi-vessel routing and pressure dependencies before interacting with live hazardous skids.",
        },
        {
          num: "03",
          title: "Safe Practice",
          desc: "Providing unconstrained trial-and-error repetition for valve sequencing without chemical spills or facility downtime.",
        },
      ],
      processSequence: [
        { step: "01", name: "Inlet & Equalization", detail: "Raw effluent balancing and coarse particulate screening." },
        { step: "02", name: "Chemical Coagulation", detail: "Automated polymer injection and flocculation agitation." },
        { step: "03", name: "Dissolved Air Flotation (DAF)", detail: "Micro-bubble aerated separation of emulsified oils." },
        { step: "04", name: "Sludge Skimming", detail: "Mechanical surface wiper collection into waste hoppers." },
        { step: "05", name: "Multi-Media Filtration", detail: "Pressurized sand/anthracite polishing beds." },
        { step: "06", name: "Treated Effluent Discharge", detail: "Continuous pH and turbidity sensor verification." },
      ],
      developmentRoadmap: [
        { stage: "01", title: "CAD Optimization", desc: "Completed 1:1 mechanical asset retopology." },
        { stage: "02", title: "Environment Assembly", desc: "Assembled facility spatial skid and pipework." },
        { stage: "03", title: "Core Flow Logic", desc: "Engineered real-time fluid direction vectors." },
        { stage: "04", title: "Interactive UI Prototype", desc: "In-progress spatial tablet and valve controls." },
        { stage: "05", title: "Engineering Validation", desc: "Planned SME procedural review and telemetry checks." },
        { stage: "06", title: "User Evaluation", desc: "Planned pilot training testing on target XR headsets." },
      ],
      artwork: {
        opener: "/company-profile/21.png",
        challenge: "/company-profile/22.png",
        process: "/company-profile/23.png",
        development: "/company-profile/24.png",
      },
    },

    // Subchapter 7B: Immersive Park Delivery
    immersivePark: {
      statusBadge: "DELIVERED PORTFOLIO PROJECT",
      title: "An Immersive Park Experience",
      subtitle: "Transforming Architectural CAD into an Explorable Virtual Destination",
      lead: "From masterplan blueprints to an interactive real-time world, enabling stakeholders to experience a premier entertainment park before ground was broken.",
      destinations: [
        {
          id: "cinema",
          num: "01",
          name: "Virtual Cinema & Amphitheater",
          desc: "Dynamic sightline evaluation, acoustic shell acoustics, and architectural evening illumination.",
        },
        {
          id: "riding",
          num: "02",
          name: "Virtual Horse Riding Trail",
          desc: "Topographic trail simulation with terrain collision, equestrian fences, and scenic vistas.",
        },
        {
          id: "market",
          num: "03",
          name: "Cultural Market & Heritage Pavilion",
          desc: "Pedestrian circulation paths, artisan stall layouts, and historic architectural motifs.",
        },
      ],
      pipeline: [
        { step: "01", name: "Client CAD Data", detail: "BIM/CAD architectural site plans and landscape contour data." },
        { step: "02", name: "Real-Time Optimization", detail: "LOD generation, instanced foliage, and memory budget control." },
        { step: "03", name: "Interactive Wayfinding", detail: "Freewalk mode, camera bookmarks, and spatial mini-maps." },
        { step: "04", name: "Multi-Platform Build", detail: "Packaged for standalone XR immersion and desktop presentation." },
      ],
      deliverySpecs: [
        { label: "Target Platforms", value: "Meta Quest 3 & Windows Desktop", note: "Supplied profile target" },
        { label: "Deliverable Formats", value: "Standalone APK & Windows Executable (.exe)", note: "Self-contained installers" },
        { label: "Repository Structure", value: "Git Version Controlled Project", note: "Clean code & asset branches" },
        { label: "Reported Performance", value: "65–70 FPS Target", note: "Source-reported framerate" },
        { label: "Quality Assurance", value: "Structured Multi-Stage QA", note: "Functional & performance testing" },
        { label: "Lifecycle Support", value: "3-Month Post-Delivery Warranty", note: "Bug-fix and maintenance window" },
      ],
      artwork: {
        opener: "/company-profile/25.png",
        destinations: "/company-profile/26.png",
        pipeline: "/company-profile/27.png",
        delivery: "/company-profile/28.png",
      },
    },
  },

  // CP08: Page 29
  cp08: {
    chapterNumber: "08",
    chapterId: "cp08",
    sourcePages: [29],
    eyebrow: "08 / CLOSING HORIZON",
    headline: "Together toward a smarter, stronger industry.",
    statement:
      "Turning complex ideas, environments, and information into immersive experiences that drive understanding and human progress.",
    contactLead: "Ready to explore what real-time 3D, digital twins, or spatial computing can unlock for your organization?",
    contactCTA: {
      label: "Start a Conversation",
      href: "/contact",
    },
    closingArtwork: "/company-profile/29.png",
  },
};
