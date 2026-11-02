export interface BuildStage { stage: string; title: string; description: string }

export interface CaseStudyMediaAsset {
  id: string;
  type: "image" | "video" | "youtube";
  src?: string;
  poster?: string;
  alt?: string;
  caption?: string;
  aspectRatio?: "16/9" | "21/9" | "4/3";
  priority?: boolean;
  autoplay?: boolean;
  controls?: boolean;
  watchUrl?: string;
  status?: "approved" | "awaiting-approved-media";
}

export interface CaseStudyMediaChapter {
  id: string;
  title: string;
  copy: string;
  align?: "media-left" | "media-right";
  media: CaseStudyMediaAsset;
}

export interface CaseStudyMediaPlan {
  hero: CaseStudyMediaAsset;
  overview: CaseStudyMediaAsset[];
  process: CaseStudyMediaChapter[];
  cinematic: CaseStudyMediaAsset;
  scrollMedia?: CaseStudyMediaAsset;
  experience: {
    title: string;
    copy: string;
    primary: CaseStudyMediaAsset;
    secondary: CaseStudyMediaAsset[];
  };
  gallery: CaseStudyMediaAsset[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  location: string;
  category: string;
  theme: string;
  summary: string;
  overview: string[];
  confidentialityNote?: string;
  productReference?: string;
  role: string;
  tags: string[];
  industry: string;
  deliverables: string;
  platform: string;
  challenge: string;
  approach: { step: string; title: string; desc: string }[];
  tech: { engine: string; platform: string; output: string; status: string };
  gallery: { image: string; caption: string }[];
  buildProcess: BuildStage[];
  outcomes: { summary: string; deliverablesList: string[] };
  image: string;
  imageAlt: string;
  nextSlug: string;
  public?: boolean;
  mediaPlan?: CaseStudyMediaPlan;
}

const awaitingImage = (id: string, aspectRatio: CaseStudyMediaAsset["aspectRatio"] = "16/9"): CaseStudyMediaAsset => ({
  id,
  type: "image",
  aspectRatio,
  status: "awaiting-approved-media",
});

const awaitingVideo = (id: string, aspectRatio: CaseStudyMediaAsset["aspectRatio"] = "16/9"): CaseStudyMediaAsset => ({
  id,
  type: "video",
  aspectRatio,
  status: "awaiting-approved-media",
});

const approvedImage = (id: string, src: string, alt: string, caption?: string, aspectRatio: CaseStudyMediaAsset["aspectRatio"] = "16/9", priority = false): CaseStudyMediaAsset => ({
  id,
  type: "image",
  src,
  alt,
  caption,
  aspectRatio,
  priority,
  status: "approved",
});

export const caseStudies: Record<string, CaseStudy> = {
  "simulxr-owt": {
    slug: "simulxr-owt",
    title: "Oily Water Treatment — Industrial XR Training Experience",
    location: "EGYPT",
    category: "INDUSTRIAL XR TRAINING",
    theme: "Interactive Digital Facility",
    productReference: "Powered by SIMULXR",
    summary: "Transforming engineering documentation for an Oily Water Treatment facility into an interactive digital environment for immersive facility familiarization and scenario-based workforce training.",
    overview: [
      "The project involved creating a digital VR training environment for a complete Oily Water Treatment facility in Egypt.",
      "CAD files, Navisworks models, P&ID documentation, and engineering references formed the foundation for an engineering-reference-based interactive digital facility developed under the SIMULXR industrial training solution."
    ],
    role: "Engineering Reference Interpretation / Industrial 3D Production / VR Development / Systems Integration",
    tags: ["Industrial XR", "VR Training", "Oil & Gas", "Scenario-Based Training"],
    industry: "Oil & Gas / Industrial Operations",
    deliverables: "Interactive facility, VR training, familiarization, scenarios, bilingual delivery",
    platform: "Industrial XR Training Environment",
    challenge: "Industrial facilities combine interconnected equipment, piping, processes, procedures, and safety considerations. The goal was to connect engineering references with spatial exploration and scenario-based training in one interactive environment.",
    approach: [
      { step: "01", title: "Understand the Facility", desc: "Reviewed engineering documents, layouts, and process references before production began." },
      { step: "02", title: "Reconstruct the Digital Facility", desc: "Translated equipment, piping, structures, tanks, pumps, and supporting infrastructure into a real-time 3D environment." },
      { step: "03", title: "Optimize for XR", desc: "Transformed the engineering source into an experience suitable for interactive and immersive use." },
      { step: "04", title: "Build the Training Layer", desc: "Integrated interactive information, facility familiarization, and scenario-based training." },
      { step: "05", title: "System Integration", desc: "Implemented the required Hisense integration for the project." },
      { step: "06", title: "Test & Deliver", desc: "Tested, refined, deployed, and handed over the experience as a client training solution." }
    ],
    tech: { engine: "Real-Time XR Development", platform: "VR Training Environment", output: "Bilingual Interactive Digital Facility", status: "Client deployment and handover" },
    gallery: [],
    buildProcess: [
      { stage: "01", title: "CAD", description: "Physical geometry, layouts, and facility structures." },
      { stage: "02", title: "Navisworks", description: "Assembled engineering geometry and spatial relationships." },
      { stage: "03", title: "P&ID", description: "Process relationships, equipment connectivity, and plant flow." },
      { stage: "04", title: "Scenario Development", description: "Gas leakage and hazardous-atmosphere training scenarios." }
    ],
    outcomes: { summary: "Engineering information transformed into an environment teams can enter, explore, and train within — before stepping into the real facility.", deliverablesList: ["Digital reconstruction of the OWT facility", "Interactive real-time industrial environment", "VR training and facility familiarization", "Equipment and spatial exploration", "Gas leakage scenario", "Hazardous-atmosphere training scenario", "Hisense system integration", "Bilingual experience", "Testing, QA, deployment, handover, and three-month post-delivery support"] },
    image: "", imageAlt: "",
    mediaPlan: {
      hero: approvedImage("owt-facility-hero", "/images/projects/SIMULXR OWT/01-owt-hero-facility.png", "Oily Water Treatment facility hero visualization", "Interactive digital facility overview", "21/9", true),
      overview: [approvedImage("owt-facility-overview", "/images/projects/SIMULXR OWT/05-owt-facility-overview.png", "Oily Water Treatment facility overview", "Facility overview from the reconstructed digital environment"), approvedImage("owt-site-masterplan", "/images/projects/SIMULXR OWT/04-owt-site-masterplan-top-view.png", "Top view of the Oily Water Treatment site masterplan", "Site layout and spatial organization")],
      process: [
        { id: "owt-engineering-input", title: "Engineering reference", copy: "P&ID documentation used as a source for understanding process relationships and plant flow.", align: "media-left", media: approvedImage("owt-engineering-pid", "/images/projects/SIMULXR OWT/03-owt-engineering-pid-reference.png", "Oily Water Treatment and well injection plant P&ID reference", "Engineering reference and process logic") },
        { id: "owt-facility-reconstruction", title: "Facility reconstruction", copy: "Storage and process systems organized into one navigable digital environment.", align: "media-right", media: approvedImage("owt-storage-tanks", "/images/projects/SIMULXR OWT/06-owt-storage-and-process-tanks.png", "Oily Water Treatment storage and process tanks", "Facility reconstruction") },
        { id: "owt-treatment-equipment", title: "Treatment equipment", copy: "Treatment assemblies presented at a scale that supports equipment familiarization.", align: "media-left", media: approvedImage("owt-cpi-clarifier", "/images/projects/SIMULXR OWT/CPI Clarifier Shot.png", "CPI clarifier treatment equipment", "Treatment equipment visualization") },
        { id: "owt-pumps-process", title: "Pumps and process", copy: "Pump areas and connected process lines represented within their wider facility context.", align: "media-right", media: approvedImage("owt-pump-area", "/images/projects/SIMULXR OWT/09-owt-pump-area-overview.png", "Oily Water Treatment pump area overview", "Pumps and process context") },
      ],
      cinematic: { id: "owt-facility-visualization-video", type: "youtube", src: "https://www.youtube-nocookie.com/embed/oJ6pWgrI4iI", watchUrl: "https://youtu.be/oJ6pWgrI4iI", poster: "/images/projects/SIMULXR OWT/11-owt-process-line-and-pumps.png", alt: "Oily Water Treatment facility visualization video", caption: "Facility visualization walkthrough", aspectRatio: "21/9", status: "approved" },
      experience: {
        title: "VR interaction and scenario-based training",
        copy: "The training layer supports facility familiarization, equipment interaction, and approved hazardous-event scenarios within the interactive environment.",
        primary: { id: "owt-vr-interaction-video", type: "youtube", src: "https://www.youtube-nocookie.com/embed/IEmRf20QwI4", watchUrl: "https://youtu.be/IEmRf20QwI4", poster: "/images/projects/SIMULXR OWT/VR User Interaction Shot.png", alt: "Oily Water Treatment VR interaction video", caption: "VR interaction walkthrough", aspectRatio: "16/9", status: "approved" },
        secondary: [
          approvedImage("owt-interactive-ui", "/images/projects/SIMULXR OWT/02-owt-interactive-facility-ui.png", "Interactive Oily Water Treatment facility interface", "Interactive facility interface"),
          approvedImage("owt-valve-interaction", "/images/projects/SIMULXR OWT/12-owt-valve-interaction.png", "Valve interaction in the Oily Water Treatment environment", "Equipment interaction"),
          approvedImage("owt-gas-leak", "/images/projects/SIMULXR OWT/Gas Leak Training ScenarioW.png", "Gas leak training scenario visualization", "Gas leak training scenario"),
          approvedImage("owt-hazardous-atmosphere", "/images/projects/SIMULXR OWT/Hazardous Atmosphere  Suffocation Scenario.png", "Hazardous atmosphere training scenario visualization", "Hazardous atmosphere scenario"),
        ],
      },
      gallery: [
        approvedImage("owt-treatment-skid", "/images/projects/SIMULXR OWT/08-owt-treatment-skid.png", "Oily Water Treatment skid", "Treatment equipment"),
        approvedImage("owt-booster-pump", "/images/projects/SIMULXR OWT/10-owt-booster-pump-system.png", "Oily Water Treatment booster pump system", "Booster pump system"),
        approvedImage("owt-valve-exploded", "/images/projects/SIMULXR OWT/13-owt-valve-inspection-exploded.png", "Exploded valve inspection visualization", "Valve inspection and component context"),
      ],
    },
    nextSlug: "taf35-robot-simulation"
  },
  "taf35-robot-simulation": {
    slug: "taf35-robot-simulation",
    title: "TAF35 Robot Training Simulation",
    location: "SAUDI ARABIA",
    category: "CONFIDENTIAL TECHNICAL TRAINING PROJECT",
    theme: "Immersive Technical Training Simulation",
    confidentialityNote: "Selected project details have been intentionally limited due to the confidential nature of the engagement.",
    summary: "Transforming complex equipment documentation into an immersive training system for assembly, maintenance, and operational scenarios.",
    overview: ["This confidential Saudi training project involved the digital reconstruction and simulation of a specialized technical system used within an emergency-response context.", "Technical documentation and equipment manuals were studied to understand the system, its components, operation, assembly logic, maintenance requirements, and use cases before it was recreated as an interactive training experience."],
    role: "Technical Reference Study / 3D Equipment Reconstruction / Procedural Simulation",
    tags: ["Technical Training", "Procedural Simulation", "Interactive 3D", "Immersive Training"],
    industry: "Emergency Response / Technical Training",
    deliverables: "Equipment model, component structure, procedural and scenario-based training",
    platform: "Immersive Technical Training Simulation",
    challenge: "Complex equipment training can depend on access to physical hardware, experienced instructors, manuals, and controlled conditions. The objective was to create an environment where trainees could interact with the system and practice technical procedures digitally.",
    approach: [
      { step: "01", title: "Technical Documentation Study", desc: "Reviewed the equipment catalog and technical references to understand the system, its components, and operational logic." },
      { step: "02", title: "Digital Equipment Reconstruction", desc: "Modeled the device from the ground up with the detail required for procedural training." },
      { step: "03", title: "Interaction Design", desc: "Prepared the digital equipment for interactive inspection, component handling, and procedural actions." },
      { step: "04", title: "Training Scenario Development", desc: "Developed flows for assembly, disassembly, maintenance, operation, and relevant emergency scenarios." },
      { step: "05", title: "Application Development & Testing", desc: "Programmed, integrated, tested, refined, and prepared the experience for final delivery." }
    ],
    tech: { engine: "Interactive Training Development", platform: "Immersive Training Application", output: "Bilingual Training Experience", status: "QA and final delivery" },
    gallery: [{ image: "/images/projects/taf35-robot/taf35-equipment-outdoor.webp", caption: "Approved public view of the technical training experience." }],
    buildProcess: [
      { stage: "01", title: "Assembly & Disassembly", description: "Component relationships and correct assembly sequences." },
      { stage: "02", title: "Maintenance", description: "Interactive maintenance workflows and equipment access." },
      { stage: "03", title: "Equipment Operation", description: "Guided interaction with operational components." },
      { stage: "04", title: "Emergency Scenarios", description: "Relevant firefighting and emergency-response situations." }
    ],
    outcomes: { summary: "A confidential immersive training system built around approved procedural learning requirements.", deliverablesList: ["Detailed digital equipment model", "Interactive component structure", "Assembly and disassembly training", "Maintenance training", "Operational-use scenarios", "Emergency and firefighting scenarios", "Bilingual training experience", "QA, final delivery, and three-month post-delivery support"] },
    image: "/images/projects/taf35-robot/taf35-equipment-outdoor.webp",
    imageAlt: "TAF35 technical equipment training simulation",
    mediaPlan: {
      hero: approvedImage("taf35-safe-hero", "/images/projects/taf35-robot/taf35-equipment-outdoor.webp", "Approved public view of the TAF35 technical training simulation", undefined, "21/9", true),
      overview: [
        approvedImage("taf35-industrial-site", "/images/projects/taf35-robot/taf35-industrial-site.webp", "TAF35 industrial training site overview", "Facility context for the technical training experience"),
        approvedImage("taf35-equipment-bay", "/images/projects/taf35-robot/taf35-equipment-bay.webp", "TAF35 equipment bay", "Equipment positioned inside the training bay"),
      ],
      process: [
        { id: "taf35-component-view", title: "Component structure", copy: "The device is presented as a structured assembly so component relationships can be understood without exposing restricted technical information.", align: "media-left", media: approvedImage("taf35-equipment-views", "/images/projects/taf35-robot/taf35-equipment-views.webp", "TAF35 equipment reference views", "Public equipment views for component understanding", "4/3") },
        { id: "taf35-assembly-training", title: "Assembly and disassembly training", copy: "Procedural interaction is organised around approved assembly sequences and the way the equipment is handled in the training experience.", align: "media-right", media: approvedImage("taf35-vehicle-bay", "/images/projects/taf35-robot/taf35-vehicle-bay.webp", "TAF35 vehicle bay training scene", "Equipment and training context", "4/3") },
        { id: "taf35-maintenance", title: "Maintenance interaction", copy: "Maintenance workflows are represented through a controlled interactive experience while keeping confidential project detail out of the public page.", align: "media-left", media: approvedImage("taf35-floor-view", "/images/projects/taf35-robot/taf35-floor-view.webp", "TAF35 floor-level training environment", "Training environment and access context", "4/3") },
      ],
      cinematic: approvedImage("taf35-wide-view", "/images/projects/taf35-robot/taf35-wide-view-01.webp", "TAF35 training facility wide view", "A wider view of the environment around the device", "21/9"),
      scrollMedia: { id: "taf35-device-motion-scroll", type: "video", src: "/images/projects/taf35-robot/Videos/scroll%20animation.mp4", poster: "/images/projects/taf35-robot/taf35-equipment-views.webp", alt: "TAF35 device motion and mechanical animation", caption: "Scroll-controlled device movement", aspectRatio: "16/9", controls: false, status: "approved" },
      experience: {
        title: "Procedural training experience",
        copy: "The experience connects equipment understanding with guided procedural actions, device movement, and the approved fire-response scenario.",
        primary: { id: "taf35-training-video", type: "youtube", src: "https://www.youtube-nocookie.com/embed/4nIXgo66iuk", watchUrl: "https://youtu.be/4nIXgo66iuk", poster: "/images/projects/taf35-robot/taf35-bay-training-scene.webp", alt: "TAF35 fire-response training scenario", caption: "Training scenario walkthrough", aspectRatio: "16/9", status: "approved" },
        secondary: [
          { id: "taf35-device-motion-video", type: "youtube", src: "https://www.youtube-nocookie.com/embed/wO1K63lq-64", watchUrl: "https://youtu.be/wO1K63lq-64", poster: "/images/projects/taf35-robot/taf35-equipment-views.webp", alt: "TAF35 device animation and movement", caption: "Device animation and movement", aspectRatio: "16/9", status: "approved" },
          approvedImage("taf35-training-team", "/images/projects/taf35-robot/taf35-training-team.webp", "TAF35 training team in the device bay", "Training context", "4/3"),
          approvedImage("taf35-safety-uniform", "/images/projects/taf35-robot/taf35-safety-uniform.webp", "TAF35 safety equipment context", "Controlled emergency-response setting", "4/3"),
          approvedImage("taf35-fire-scenario", "/images/projects/taf35-robot/taf35-fire-scenario.webp", "TAF35 fire-response scenario", "Fire-response scenario visualization", "4/3"),
          approvedImage("taf35-vertical-view", "/images/projects/taf35-robot/taf35-vertical-view.webp", "TAF35 vertical equipment view", "Equipment orientation and access context", "4/3"),
        ],
      },
      gallery: [
        approvedImage("taf35-gallery-safe", "/images/projects/taf35-robot/taf35-equipment-outdoor.webp", "Approved public TAF35 project view", "TAF35 device in the industrial environment"),
        approvedImage("taf35-gallery-equipment-bay", "/images/projects/taf35-robot/taf35-equipment-bay.webp", "TAF35 equipment bay", "Training bay context"),
        approvedImage("taf35-gallery-view-01", "/images/projects/taf35-robot/taf35-view-01.webp", "TAF35 device front view", "Device presentation view"),
        approvedImage("taf35-gallery-view-02", "/images/projects/taf35-robot/taf35-view-02.webp", "TAF35 device alternate view", "Device presentation view"),
        approvedImage("taf35-gallery-view-03", "/images/projects/taf35-robot/taf35-view-03.webp", "TAF35 device side detail", "Mechanical detail"),
        approvedImage("taf35-gallery-view-04", "/images/projects/taf35-robot/taf35-view-04.webp", "TAF35 device rear detail", "Mechanical detail"),
        approvedImage("taf35-gallery-view-05", "/images/projects/taf35-robot/taf35-view-05.webp", "TAF35 device top detail", "Mechanical detail"),
        approvedImage("taf35-gallery-wide-02", "/images/projects/taf35-robot/taf35-wide-view-02.webp", "TAF35 facility wide view", "Industrial environment context", "21/9"),
        approvedImage("taf35-gallery-yard", "/images/projects/taf35-robot/taf35-equipment-yard.webp", "TAF35 equipment yard", "Outdoor equipment context", "4/3"),
        approvedImage("taf35-gallery-robot-bay", "/images/projects/taf35-robot/taf35-bay-training-scene.webp", "TAF35 training bay scene", "Device and user context", "4/3"),
      ],
    },
    nextSlug: "nakhal-fort"
  },
  "nakhal-fort": {
    slug: "nakhal-fort",
    title: "Nakhal Fort Virtual Tour",
    location: "OMAN",
    category: "IMMERSIVE HERITAGE EXPERIENCE",
    theme: "Virtual Heritage Tour",
    summary: "Transforming one of Oman’s historic landmarks into an immersive VR experience where visitors can explore the fort, move through its spaces, and discover its history through an interactive digital journey.",
    overview: ["Nakhal Fort is one of Oman’s historic landmarks. The objective was to create a complete virtual experience that allows visitors to explore the fort digitally while understanding its architecture, spaces, and historical context.", "The experience was developed from research and reference gathering through 3D production, interaction design, programming, testing, deployment, and final delivery for Meta Quest 3."],
    role: "Research / 3D Environment Production / Experience Design / VR Development",
    tags: ["VR Experience", "Heritage Digitization", "Interactive 3D", "Meta Quest 3"],
    industry: "Culture & Heritage",
    deliverables: "Real-time fort environment, VR exploration, historical experience layer",
    platform: "Meta Quest 3",
    challenge: "Historic sites carry more than geometry. The experience needed to preserve architecture, scale, atmosphere, spatial relationships, and historical context while giving users freedom to explore rather than presenting a passive walkthrough.",
    approach: [
      { step: "01", title: "Research & Reference Gathering", desc: "Studied available visual, architectural, and historical references." },
      { step: "02", title: "Digital Environment Production", desc: "Recreated the fort and its spatial experience as a real-time 3D environment." },
      { step: "03", title: "Experience Design", desc: "Designed free exploration and accessible historical discovery." },
      { step: "04", title: "VR Development", desc: "Integrated interactions and optimized the experience for standalone headset performance." },
      { step: "05", title: "Testing & Delivery", desc: "Tested, refined, and prepared the application for Meta Quest 3." }
    ],
    tech: { engine: "Real-Time VR Development", platform: "Meta Quest 3", output: "Bilingual Immersive Heritage Virtual Tour", status: "Final deployment and handover" },
    gallery: [],
    buildProcess: [],
    outcomes: { summary: "A physical landmark transformed into an explorable digital experience — extending cultural discovery through immersive technology.", deliverablesList: ["Full real-time 3D environment", "Immersive VR exploration experience", "Historical information experience layer", "Meta Quest 3 application", "Testing and quality assurance", "Final deployment, handover, and three-month post-delivery support"] },
    image: "", imageAlt: "",
    mediaPlan: {
      hero: awaitingImage("nakhal-fort-hero", "21/9"),
      overview: [awaitingImage("nakhal-digital-reconstruction"), awaitingImage("nakhal-architectural-detail")],
      process: [
        { id: "nakhal-environment", title: "Digital reconstruction", copy: "The fort and its architectural context recreated as a real-time environment.", align: "media-left", media: awaitingImage("nakhal-environment-production") },
        { id: "nakhal-vr-exploration", title: "VR exploration", copy: "Human-scale movement and spatial discovery prepared for Meta Quest 3.", align: "media-right", media: awaitingImage("nakhal-user-exploration") },
      ],
      cinematic: awaitingVideo("nakhal-walkthrough-video", "21/9"),
      experience: { title: "Historical discovery in VR", copy: "Free exploration is paired with an accessible historical-information layer throughout the journey.", primary: awaitingImage("nakhal-historical-interaction"), secondary: [awaitingImage("nakhal-vr-user"), awaitingImage("nakhal-architectural-detail-secondary")] },
      gallery: [awaitingImage("nakhal-gallery-fort"), awaitingImage("nakhal-gallery-interior"), awaitingImage("nakhal-gallery-vr")],
    },
    nextSlug: "remal-park"
  },
  "remal-park": {
    slug: "remal-park",
    title: "Remal Park",
    location: "SAUDI ARABIA",
    category: "VR, DESKTOP & ARCHITECTURAL VISUALIZATION",
    theme: "Destination Visualization & Exploration",
    summary: "Transforming architectural CAD into both a cinematic visualization package and an explorable real-time environment for VR and desktop.",
    overview: ["The project began with architectural CAD documentation and transformed the proposed destination into two complementary digital experiences: a high-quality cinematic visualization package and an optimized interactive version for exploring the park.", "The two production strategies shared one source: one focused on visual fidelity and communication, while the other focused on real-time performance and interaction."],
    role: "CAD Interpretation / 3D Environment Production / Visualization / Interactive Development",
    tags: ["Virtual Reality", "Interactive 3D", "Architectural Visualization", "Desktop Application"],
    industry: "Destination & Architectural Visualization",
    deliverables: "Cinematic visualization, real-time environment, VR and desktop applications",
    platform: "Virtual Reality & Desktop",
    challenge: "Architectural CAD communicates construction and spatial information, but not necessarily what a destination will feel like. The project needed to communicate atmosphere, scale, architecture, landscape, and activities while remaining suitable for VR and desktop exploration.",
    approach: [
      { step: "01", title: "CAD Review & Spatial Understanding", desc: "Established the spatial hierarchy, destinations, structures, and visitor areas." },
      { step: "02", title: "3D Environment Production", desc: "Built architecture, landscape, materials, lighting, and supporting visual elements." },
      { step: "03", title: "Cinematic Visualization", desc: "Developed a high-fidelity version for rendered imagery and cinematic sequences." },
      { step: "04", title: "Real-Time Optimization", desc: "Prepared an interactive version while preserving the project’s visual identity." },
      { step: "05", title: "VR & Desktop Development", desc: "Integrated the environment into applications for direct exploration." }
    ],
    tech: { engine: "Cinematic & Real-Time 3D Production", platform: "Virtual Reality and Desktop", output: "Bilingual Visualization & Interactive Experience", status: "QA and final delivery" },
    gallery: [{ image: "/images/projects/remal-park/remal-park.jpg", caption: "Approved Remal Park destination visualization." }],
    buildProcess: [
      { stage: "01", title: "Cinematic Visualization", description: "Rendered sequences, environmental imagery, lighting, atmosphere, and destination presentation." },
      { stage: "02", title: "Interactive Experience", description: "Free movement, destination exploration, and VR and desktop use." }
    ],
    outcomes: { summary: "One architectural source transformed into two experiences — cinematic communication for presentation and real-time exploration for immersion.", deliverablesList: ["Digital 3D environment", "Cinematic imagery and video sequences", "Optimized real-time environment", "VR and desktop interactive applications", "Exploration of destinations and activities", "QA, final delivery, and three-month post-delivery support"] },
    image: "/images/projects/remal-park/remal-park.jpg",
    imageAlt: "Remal Park architectural visualization",
    mediaPlan: {
      hero: approvedImage("remal-hero", "/images/projects/remal-park/remal-park.jpg", "Remal Park cinematic architectural visualization", undefined, "21/9", true),
      overview: [awaitingImage("remal-cad-source"), approvedImage("remal-high-fidelity", "/images/projects/remal-park/remal-park.jpg", "High-fidelity Remal Park destination visualization")],
      process: [
        { id: "remal-cinematic", title: "Cinematic visualization", copy: "High-fidelity imagery developed to communicate architecture, atmosphere, landscape, and destination character.", align: "media-left", media: approvedImage("remal-cinematic-sequence", "/images/projects/remal-park/remal-park.jpg", "Remal Park cinematic visualization") },
        { id: "remal-realtime", title: "Real-time environment", copy: "A second production version prepared for responsive exploration while retaining the project’s visual identity.", align: "media-right", media: awaitingImage("remal-realtime-environment") },
      ],
      cinematic: approvedImage("remal-cinematic-break", "/images/projects/remal-park/remal-park.jpg", "Remal Park destination visualization", undefined, "21/9"),
      experience: { title: "VR and desktop exploration", copy: "The optimized environment supports direct movement through planned destinations, activities, and visitor zones.", primary: awaitingImage("remal-vr-experience"), secondary: [awaitingImage("remal-desktop-exploration"), awaitingImage("remal-activities-destinations")] },
      gallery: [approvedImage("remal-gallery-destination", "/images/projects/remal-park/remal-park.jpg", "Remal Park destination visualization"), awaitingImage("remal-gallery-vr"), awaitingImage("remal-gallery-desktop")],
    },
    nextSlug: "simulxr-owt"
  },
  "industrial-training-experience": {
    slug: "industrial-training-experience",
    title: "SUMED LPG Handling Station",
    location: "AIN SUKHNA, EGYPT",
    category: "INDUSTRIAL DIGITAL FACILITY",
    theme: "Interactive Exploration",
    summary: "Industrial facility reconstruction and interactive exploration.",
    overview: [], role: "3D Facility Reconstruction", tags: [], industry: "Oil & Gas", deliverables: "Digital facility", platform: "Interactive 3D", challenge: "", approach: [],
    tech: { engine: "", platform: "", output: "", status: "" }, gallery: [], buildProcess: [], outcomes: { summary: "", deliverablesList: [] },
    image: "", imageAlt: "", nextSlug: "simulxr-owt", public: false
  }
};

export function getCaseStudy(slug: string): CaseStudy | undefined { return caseStudies[slug] }
export function getAllCaseStudySlugs(): string[] { return Object.keys(caseStudies) }
export function getAllCaseStudies(): CaseStudy[] { return Object.values(caseStudies).filter((project) => project.public !== false) }
