/** Editorial evidence: see docs/services/SERVICE_DETAIL_IMPLEMENTATION.md. */
export type ServiceSlug = "extended-reality" | "interactive-3d" | "real-time-3d-production" | "simulation-immersive-training";
export type CapabilityIcon = "vr" | "ar" | "mr" | "platform" | "explore" | "replica" | "inspect" | "web" | "environment" | "material" | "optimize" | "cinematic" | "scenario" | "walkthrough" | "learning";
export interface Explanation { title: string; text: string }
export interface Capability extends Explanation { icon: CapabilityIcon; deliverable: string; application: string }
export interface IndustryApplication extends Explanation { anchor: "manufacturing" | "oil-gas" | "education" | "culture-heritage" }
export interface ServiceDetail {
  slug: ServiceSlug;
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  proposition: string;
  introduction: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  seoTitle: string;
  seoDescription: string;
  definition: { heading: string; paragraphs: string[]; distinctions: Explanation[] };
  benefits: Explanation[];
  capabilities: Capability[];
  useCases: Explanation[];
  industries: IndustryApplication[];
  technologies: Explanation[];
  delivery: Explanation[];
  considerations: { heading: string; text: string; items: string[] };
  projects: { slug: string; relevance: string }[];
  faq: { question: string; answer: string }[];
  cta: string;
}

// These stages intentionally preserve the Services overview's five-stage language.
export const serviceDetailProcess = [
  { title: "Discovery & Strategy", text: "Aligning creative direction, technical feasibility, and measurable business objectives." },
  { title: "Experience Architecture", text: "Designing interaction paradigms, spatial ergonomics, and technical system specifications." },
  { title: "3D & Spatial Asset Production", text: "Sculpting, modeling, texturing, and optimizing assets for target runtime performance." },
  { title: "Real-Time Engineering", text: "Developing game-engine logic, UI systems, hardware integration, and telemetry pipelines." },
  { title: "Validation & Deployment", text: "Rigorous testing on target hardware, on-site commissioning, and lifecycle maintenance." },
] satisfies Explanation[];

export const serviceDetails: Record<ServiceSlug, ServiceDetail> = {
  "extended-reality": {
    slug: "extended-reality", number: "01", title: "Extended Reality (XR)", shortTitle: "Extended Reality", category: "Spatial computing",
    proposition: "Put people inside the experience.",
    introduction: "AFAQO designs VR, AR and mixed-reality experiences for exploring spaces, understanding equipment and following purposeful interactions. We start with what people need to do, then shape the content, interface and runtime around that task.",
    image: "/images/services/afaqo-services-hero.webp", imageAlt: "A person using a headset beside spatial displays of industrial environments", imageCaption: "SPATIAL COMPUTING / VR · AR · MR",
    seoTitle: "XR Development Services | VR, AR & Mixed Reality | AFAQO",
    seoDescription: "Explore AFAQO's extended reality services: VR environments, AR applications and mixed-reality interfaces, with practical use cases, delivery choices and project context.",
    definition: {
      heading: "A different relationship with digital information.",
      paragraphs: ["Extended reality is the umbrella term for virtual reality, augmented reality and mixed reality. These formats place digital content around the user, rather than confining every interaction to a flat screen. The right format depends on whether people need to leave the physical setting, add information to it, or interact across both.", "An XR experience combines spatial design, real-time 3D content, input and feedback. A convincing environment is only part of the work: movement, readable interfaces, scale and clear instructions all shape whether someone can use it comfortably."],
      distinctions: [
        { title: "Virtual reality / VR", text: "A digital environment replaces the user's view of their surroundings. It can support guided exploration, equipment familiarization and scenario-based learning." },
        { title: "Augmented reality / AR", text: "Digital information appears alongside a camera view or the physical world. Mobile and wearable applications can make spatial information available in context." },
        { title: "Mixed reality / MR", text: "Spatial interfaces relate digital elements to the surrounding space. Interaction and environmental understanding depend on the selected device and project scope." },
      ],
    },
    benefits: [
      { title: "Understand scale and space", text: "View an environment from a human perspective and inspect relationships that are difficult to communicate in a slide or plan." },
      { title: "Learn through interaction", text: "Let people explore equipment or follow a defined sequence, with contextual guidance instead of an uninterrupted stream of instructions." },
      { title: "Make remote places accessible", text: "Bring a representation of a facility or cultural environment to an audience that cannot visit the physical location." },
    ],
    capabilities: [
      { icon: "vr", title: "VR environments", text: "Purpose-built spaces for exploration and guided training, organized around the user's task.", deliverable: "A navigable real-time environment with agreed interactions and guidance.", application: "Facility orientation and equipment familiarization." },
      { icon: "ar", title: "AR spatial applications", text: "Digital content presented in relation to a mobile or wearable viewing context.", deliverable: "An application with scoped spatial content, interface states and interaction flows.", application: "Explaining a product or presenting contextual information." },
      { icon: "mr", title: "Mixed-reality interfaces", text: "Spatial interface concepts and experiential installations that connect content with physical surroundings.", deliverable: "An experience designed for the selected tracking and input capabilities.", application: "Spatial presentations and interactive installations." },
      { icon: "platform", title: "Cross-platform interactions", text: "Input and navigation adapted to the target hardware instead of assuming one control scheme fits every device.", deliverable: "Device-appropriate controls, scene budgets and tested interaction states.", application: "An experience scoped for its intended headset, mobile or desktop context." },
    ],
    useCases: [
      { title: "Immersive orientation", text: "Introduce the layout and landmarks of a facility before a visit. A guided route helps establish spatial context without suggesting that the digital model replaces site induction." },
      { title: "Equipment familiarization", text: "Let a user inspect components, understand their arrangement and rehearse agreed interactions before encountering the equipment in person." },
      { title: "Spatial presentations", text: "Present an environment or concept at an appropriate scale, with information placed where it supports the discussion." },
      { title: "Learning environments", text: "Turn a technical subject into an explorable setting. Guidance can direct attention toward the relationships that matter to the lesson." },
      { title: "Cultural exploration", text: "Make a modeled site or narrative accessible through an immersive journey, using spatial composition to support understanding." },
      { title: "Contextual product explanation", text: "Use AR or MR to relate digital content to a viewing space. Tracking, placement and input are selected for the actual delivery device." },
    ],
    industries: [
      { anchor: "manufacturing", title: "Industry & Manufacturing", text: "Equipment exploration and spatial interfaces can help engineers, operators and stakeholders understand mechanical relationships." },
      { anchor: "oil-gas", title: "Oil & Gas", text: "Facility orientation and procedural context can be represented in digital environments, with domain experts defining the appropriate learning boundaries." },
      { anchor: "education", title: "Education", text: "Explorable environments can make engineering and scientific concepts tangible through scale, movement and interaction." },
      { anchor: "culture-heritage", title: "Culture & Heritage", text: "Modeled places and spatial stories can introduce architectural context to visitors and remote audiences." },
    ],
    technologies: [
      { title: "Unity / Unreal Engine", text: "Real-time engines bring scene content, input, interfaces and application logic together. The platform and interaction requirements guide engine selection." },
      { title: "OpenXR / Meta XR SDK", text: "These spatial-development tools appear in AFAQO's existing technology stack. They may connect supported device input and runtime features; availability is checked for each target." },
      { title: "WebXR", text: "A browser-based spatial route can be considered where the target browser and hardware support it. Browser delivery is a project decision, not a universal compatibility promise." },
      { title: "3D content and spatial UX", text: "Modeling, materials, lighting and optimization are paired with readable spatial interfaces, comfortable navigation and input designed for the user's task." },
    ],
    delivery: [
      { title: "Standalone headsets", text: "On-device delivery suits untethered experiences. AFAQO's SIMULXR content identifies Meta Quest 3; memory, input, comfort and deployment conditions still need project-specific verification." },
      { title: "PC VR", text: "A workstation-connected runtime can be considered when the visual or interaction requirements justify it. Device selection and integration are agreed during discovery." },
      { title: "Mobile / browser", text: "AR and browser-based spatial formats can widen access where supported. Tracking, installation requirements and the non-headset fallback are scoped early." },
    ],
    considerations: { heading: "The interface matters as much as the environment.", text: "XR UX needs a clear relationship between what people see, how they move and what they can do. We define these decisions alongside the 3D content and runtime.", items: ["Comfortable movement and clear orientation cues", "Readable interface scale and appropriate viewing distance", "Controls matched to the actual input method", "3D detail and lighting balanced against device performance"] },
    projects: [
      { slug: "industrial-training-experience", relevance: "Shows the underlying industrial scene production, contextual overlays and route visualization relevant to an immersive environment. The current case study documents web/workstation presentation; it is not presented here as proof of a specific headset deployment." },
    ],
    faq: [
      { question: "Is XR the same as VR?", answer: "No. XR includes VR, AR and MR. VR places the user in a digital environment; AR adds digital information to a view of the physical world; MR relates spatial interfaces to the surrounding environment." },
      { question: "When is a headset appropriate?", answer: "When presence, human-scale spatial understanding or immersive input adds value to the task. If the need is inspection or explanation on a familiar screen, an interactive 3D application may be the better starting point." },
      { question: "Which devices can the experience use?", answer: "Delivery is scoped to a target, not assumed to cover every device. AFAQO's existing material includes standalone Meta Quest 3, PC VR, mobile and web delivery types. We confirm runtime support, input and performance before agreeing the target." },
      { question: "What 3D content is needed?", answer: "We review existing models, references and the required interactions. Models often need preparation for real-time use, including geometry, materials, hierarchy and scene organization appropriate to the selected device." },
      { question: "Can an existing environment become an XR experience?", answer: "Potentially. The starting point is an asset and experience review: suitability, ownership, detail, scale, input and performance. A scene that looks complete in a desktop renderer is not automatically ready for a headset." },
      { question: "How do we start?", answer: "Share the audience, task, viewing environment, available assets and intended delivery format. Discovery establishes the scope and whether XR is the appropriate format; pricing and timing are defined against that scope." },
    ],
    cta: "Tell us what people need to see, understand or do in space.",
  },
  "interactive-3d": {
    slug: "interactive-3d", number: "02", title: "Interactive 3D & Digital Environments", shortTitle: "Interactive 3D", category: "Real-time systems",
    proposition: "Make complex systems explorable.",
    introduction: "AFAQO creates interactive representations of products, equipment and facilities. We combine navigable 3D scenes, component inspection and contextual information so users can explore the relationships that static images cannot fully explain.",
    image: "/images/projects/taf35-robot/taf35-robot.png", imageAlt: "TAF35 robot modeled in an industrial setting for an interactive technical explorer", imageCaption: "TAF35 / TECHNICAL PRODUCT EXPLORER",
    seoTitle: "Interactive 3D & Digital Environments | AFAQO",
    seoDescription: "Interactive 3D visualization, equipment explorers and digital environments by AFAQO. Understand use cases, WebGL delivery, production workflows and relevant projects.",
    definition: {
      heading: "Move beyond the single viewpoint.",
      paragraphs: ["Interactive 3D lets a person change the viewpoint, select information or manipulate an agreed part of a digital scene. A digital environment places that experience within a coherent space: a facility, product setting or modeled location.", "Unlike XR, this does not necessarily require a headset. A browser or desktop application can support orbiting, navigation, exploded views and information overlays. The interaction should make the subject clearer, rather than turn every surface into a control."],
      distinctions: [
        { title: "Digital replica", text: "A representation of a product, facility or space for visualization and exploration. It can communicate form and relationships without being connected to live systems." },
        { title: "Interactive explorer", text: "A focused application for navigation, component inspection and contextual information, with controls selected for the intended audience." },
        { title: "Digital-twin context", text: "A visualization is not automatically an operational digital twin. Live data, integration, validation and system ownership are separate requirements that must be explicitly scoped." },
      ],
    },
    benefits: [
      { title: "Explain relationships", text: "Show how components fit together and how equipment relates to a wider facility, with a viewpoint the visitor can control." },
      { title: "Support different questions", text: "Allow technical and nontechnical audiences to inspect relevant parts rather than follow one fixed sequence of slides." },
      { title: "Explore without a site visit", text: "Make a digital representation available for orientation or discussion when physical access is limited or impractical." },
    ],
    capabilities: [
      { icon: "explore", title: "Facility and equipment explorers", text: "Navigable 3D representations with purposeful camera and interaction controls.", deliverable: "An interactive scene with agreed viewpoints, navigation and information states.", application: "Facility orientation and equipment explanation." },
      { icon: "replica", title: "Digital replicas", text: "Organized spatial representations for understanding a place or system.", deliverable: "A modeled environment and presentation layer appropriate to the available references.", application: "Stakeholder communication and remote spatial review." },
      { icon: "inspect", title: "Component inspection", text: "Views that reveal mechanical structure through selected parts and exploded assemblies.", deliverable: "A component hierarchy with inspection, labels and agreed presentation states.", application: "Technical walkthroughs and product familiarization." },
      { icon: "web", title: "WebGL and native applications", text: "Custom interactive experiences designed for browser or native runtime delivery.", deliverable: "A deployable application with controls and content budgets for its target.", application: "Browser-based product explorers and enterprise workstation tools." },
    ],
    useCases: [
      { title: "Product exploration", text: "Inspect a product from multiple viewpoints and select components to understand their function. TAF35 demonstrates this technical-explorer approach." },
      { title: "Exploded assembly walkthroughs", text: "Separate a complex assembly visually to explain its hierarchy and part relationships, then return to the assembled view." },
      { title: "Facility navigation", text: "Explore a modeled plant, landmark or equipment environment using routes and viewpoints chosen for orientation." },
      { title: "Technical presentations", text: "Place contextual labels and information beside the geometry being discussed, helping the presenter respond to different questions." },
      { title: "Process-route explanation", text: "Highlight a route or equipment relationship in a modeled environment. A visual sequence explains context without claiming to reproduce validated engineering behavior." },
      { title: "Spatial storytelling", text: "Connect environments, viewpoints and explanatory content into a guided narrative for cultural or educational audiences." },
    ],
    industries: [
      { anchor: "manufacturing", title: "Industry & Manufacturing", text: "Engineers, operators and product stakeholders can examine robotic assemblies, components and mechanical layouts." },
      { anchor: "oil-gas", title: "Oil & Gas", text: "Modeled facilities and highlighted process routes can support orientation and technical explanation." },
      { anchor: "education", title: "Education", text: "Explorable models can demonstrate engineering concepts and equipment relationships without requiring a headset." },
      { anchor: "culture-heritage", title: "Culture & Heritage", text: "Digital environments can communicate a site's architectural context and guide a visitor through a spatial story." },
    ],
    technologies: [
      { title: "WebGL / browser graphics", text: "A browser runtime can bring navigation and component interaction to a familiar screen. TAF35's case study explicitly documents WebGL and enterprise desktop delivery." },
      { title: "Unity / Unreal Engine", text: "Real-time engines may be selected for native applications that need a particular scene pipeline, interaction model or deployment environment." },
      { title: "CAD-to-real-time preparation", text: "TAF35 documents converting manufacturing CAD geometry and organizing its mechanical hierarchy. Source quality, format and ownership determine what can be reused." },
      { title: "Materials, lighting and optimization", text: "Prepared geometry and materials must remain legible and responsive. Budgets for meshes, textures and scene complexity are established for the delivery target." },
    ],
    delivery: [
      { title: "Web browsers", text: "Browser-based exploration is supported by the TAF35 and Industrial Training case-study records. Browser capabilities, device resources and hosting requirements are confirmed during scoping." },
      { title: "Enterprise desktop", text: "A workstation presentation can support detailed scenes and focused technical use. Native versus browser packaging follows the deployment requirements." },
      { title: "Mobile access", text: "Mobile is part of AFAQO's published cross-platform scope. Touch navigation, display size and graphics budgets require adaptation rather than assuming a desktop build will transfer unchanged." },
    ],
    considerations: { heading: "A useful explorer has a clear interaction model.", text: "We connect the information architecture to the geometry: what can be selected, what that selection reveals and how the visitor returns to the larger system.", items: ["Camera routes and orientation that match the subject", "Readable component names and contextual information", "Deliberate hierarchy for parts and assemblies", "A clear distinction between visualization and live operational data"] },
    projects: [
      { slug: "taf35-robot-simulation", relevance: "An interactive technical explorer with component hierarchy, inspection views and real-time product presentation for web and desktop." },
      { slug: "industrial-training-experience", relevance: "Connects industrial reference material, equipment assemblies and an explorable facility through contextual overlays and route visualization." },
    ],
    faq: [
      { question: "Do users need a VR headset?", answer: "No. Interactive 3D can run on a screen with mouse, keyboard or touch controls. XR is a related delivery category when spatial presence or headset input is useful." },
      { question: "Is a digital replica the same as a digital twin?", answer: "No. A digital replica can be a visual representation for navigation and explanation. A live operational digital twin needs an explicitly defined relationship with data and systems, plus appropriate validation and integration." },
      { question: "Can existing CAD or 3D models be used?", answer: "Yes, subject to review. The TAF35 workflow includes CAD conversion and optimization. We examine format, rights, geometry, hierarchy and the intended target before defining reuse or rebuilding work." },
      { question: "What can users interact with?", answer: "Scope can include camera navigation, part selection, exploded assemblies, contextual labels and guided routes. The required interactions are agreed around the actual subject and audience." },
      { question: "Can it run in a browser?", answer: "Browser delivery is documented in the TAF35 and Industrial Training records. The supported browser/device range and scene budget need testing for the specific application; browser delivery does not mean unlimited graphics performance." },
      { question: "What should we prepare for discovery?", answer: "Provide references or source models, the audience, the questions the explorer should answer, the required interactions and where it will run. Identify any live-data requirement separately from visual content." },
    ],
    cta: "Show us the product, facility or system people need to understand.",
  },
  "real-time-3d-production": {
    slug: "real-time-3d-production", number: "03", title: "Real-Time 3D Production", shortTitle: "Real-Time 3D Production", category: "High-fidelity CG",
    proposition: "Build the visual world. Prepare it to run.",
    introduction: "AFAQO produces environments and assets with visual quality, scene organization and runtime performance considered together. From modeling and materials to lighting and engine integration, the output is shaped by the experience it needs to support.",
    image: "/images/projects/remal-park/remal-park.jpg", imageAlt: "Remal Park architectural visualization with landscaped grounds and warm environmental lighting", imageCaption: "REMAL PARK / ENVIRONMENT & LIGHTING",
    seoTitle: "Real-Time 3D Production & Engine-Ready Assets | AFAQO",
    seoDescription: "AFAQO's real-time 3D production services cover environment modeling, materials, lighting, asset optimization and engine integration for interactive experiences.",
    definition: {
      heading: "Visual craft with a runtime in mind.",
      paragraphs: ["Real-time 3D production creates content that can be drawn and updated while a person interacts with it. The environment must remain understandable as cameras, lighting and user input change, rather than working only from one carefully composed render viewpoint.", "Engine-ready production brings geometry, materials, hierarchy and scene organization into an agreed runtime. It is not a promise that every asset works on every device: the target, interaction requirements and performance budget guide production decisions from the start."],
      distinctions: [
        { title: "Assets and environments", text: "Model individual objects, assemblies and spaces, with scale, pivots and organization appropriate to their use." },
        { title: "Look development", text: "Use physically based materials, lighting and atmosphere to communicate form and visual character consistently." },
        { title: "Runtime readiness", text: "Balance meshes, textures, materials and scene complexity against the target engine and device constraints." },
      ],
    },
    benefits: [
      { title: "Keep quality and performance connected", text: "Define what the audience needs to see before spending the asset budget, so detail supports the experience rather than competing with responsiveness." },
      { title: "Make production useful downstream", text: "Organized hierarchies, materials and scene content make integration into an interactive experience more deliberate." },
      { title: "Communicate spatial intent", text: "Use coherent environments, lighting and visual sequences to explain a place, product or technical setting." },
    ],
    capabilities: [
      { icon: "environment", title: "Environment modeling", text: "Architectural and industrial spaces built as coherent, organized 3D scenes.", deliverable: "An agreed environment asset package with scene hierarchy and spatial references.", application: "Visitor environments and industrial facility visualization." },
      { icon: "material", title: "Materials & lighting", text: "Physically based surfaces, shaders and lighting chosen to explain form and atmosphere.", deliverable: "Material definitions and lighting setups for the target scene workflow.", application: "Architectural look development and equipment presentation." },
      { icon: "optimize", title: "Real-time optimization", text: "Preparation for polygon, draw-call and texture budgets instead of treating optimization as a final export step.", deliverable: "Prepared meshes, scene organization and agreed levels of detail for integration.", application: "Interactive scenes intended for constrained or varied devices." },
      { icon: "cinematic", title: "Cinematic sequences", text: "Directed camera movement and visual sequences built from the environment and its assets.", deliverable: "High-resolution media and scene-based sequences within the agreed scope.", application: "Exhibition media and industrial environment walkthroughs." },
    ],
    useCases: [
      { title: "Engine-ready environment packages", text: "Prepare a space and its assets for integration into an interactive application, with agreed scene organization and resource budgets." },
      { title: "CAD-derived equipment assets", text: "Translate suitable source geometry into real-time meshes with useful assembly structure. TAF35 documents this conversion and preparation workflow." },
      { title: "Architectural look development", text: "Explore materials, daylight and atmosphere in a coherent environment. Remal Park provides existing evidence of this production discipline." },
      { title: "Industrial scene assembly", text: "Combine equipment, structures and process routes into a navigable setting while keeping the scene hierarchy legible." },
      { title: "Exhibition and presentation media", text: "Compose visual sequences from the environment for a defined display or communication format." },
      { title: "Asset and scene optimization", text: "Review geometry, texture use, material count and levels of detail against a target runtime. The outcome is defined by agreed tests, not a universal performance claim." },
    ],
    industries: [
      { anchor: "culture-heritage", title: "Culture & Heritage", text: "Environmental modeling, material character and atmospheric lighting can support cultural visitor presentations, as documented in Remal Park." },
      { anchor: "manufacturing", title: "Industry & Manufacturing", text: "Prepared equipment assemblies and mechanical hierarchies support product explorers and technical presentations." },
      { anchor: "oil-gas", title: "Oil & Gas", text: "Facility geometry and equipment assets establish a visual foundation for route explanation and spatial orientation." },
      { anchor: "education", title: "Education", text: "Organized objects and environments provide the visual material for explorable engineering concepts and learning experiences." },
    ],
    technologies: [
      { title: "Blender", text: "Listed in AFAQO's published 3D asset pipeline, Blender may support modeling and asset preparation. Tool selection follows the source material and required handoff." },
      { title: "Substance 3D", text: "The existing technology stack includes Substance 3D for material workflows. Surface definitions are authored for the selected shader and texture budgets." },
      { title: "ZBrush / Houdini", text: "These are named in AFAQO's current pipeline content. Sculpting or procedural preparation is selected where the asset requirement justifies it, rather than used as a default for every scene." },
      { title: "Unity / Unreal Engine", text: "Engine integration provides the context for materials, lighting, scene hierarchy and performance checks. Existing pipeline content includes LOD and mesh optimization." },
    ],
    delivery: [
      { title: "Engine-ready content", text: "Asset organization, scene structure and material setup are agreed for the selected engine and integration responsibilities." },
      { title: "Interactive runtime assets", text: "Visual content is prepared for the performance and interaction requirements of the companion XR or interactive 3D application." },
      { title: "High-resolution media", text: "Remal Park documents visual assets and render sequences prepared for exhibition integration. Display format and output specifications are defined with the client." },
    ],
    considerations: { heading: "The pipeline is part of the deliverable.", text: "A useful handoff is more than a folder of detailed meshes. It explains how the content is organized and what the receiving runtime expects.", items: ["Source references, asset ownership and agreed target formats", "Scale, pivots, assembly hierarchy and naming", "Material, texture and scene-complexity budgets", "LOD strategy and runtime checks appropriate to the target"] },
    projects: [
      { slug: "remal-park", relevance: "Environmental modeling, physically based materials, lighting and high-resolution visual sequences prepared for exhibition integration." },
      { slug: "taf35-robot-simulation", relevance: "CAD-to-real-time geometry preparation, mechanical hierarchy and industrial materials used in an interactive technical explorer." },
    ],
    faq: [
      { question: "How does this differ from a rendering service?", answer: "A single render is a fixed image. Real-time production also considers changing viewpoints, scene hierarchy, interaction and runtime budgets. High-resolution media may be one output, but it is not the only production requirement." },
      { question: "Can you prepare existing CAD geometry?", answer: "The TAF35 case study documents CAD conversion and real-time mesh preparation. Reuse depends on source format, ownership, geometry quality and the intended output. We review these before defining the production scope." },
      { question: "How is visual quality balanced with performance?", answer: "We agree the target runtime and the visual priorities, then work within geometry, material, texture and draw-call budgets. Existing pipeline content includes LOD and mesh optimization. Performance must be checked in the actual target scene." },
      { question: "Does the service include animation?", answer: "AFAQO's existing scope includes cinematic visual sequences and mechanical hierarchy for interactive assemblies. The required camera work, object movement or interaction-driven animation is defined per project; no general character-animation offering is implied." },
      { question: "What will the handoff contain?", answer: "The handoff follows the agreed scope: prepared assets, scene organization, materials and lighting, engine integration work or final visual sequences. Source formats and responsibilities should be settled during discovery." },
      { question: "Can the same assets run everywhere?", answer: "Not without review. A detailed workstation scene and a mobile or standalone-headset scene have different resource constraints. Reuse may involve alternate detail levels, textures, materials or scene arrangements." },
    ],
    cta: "Bring us the environment, assets or production challenge behind your next experience.",
  },
  "simulation-immersive-training": {
    slug: "simulation-immersive-training", number: "04", title: "Simulation & Immersive Training", shortTitle: "Simulation & Training", category: "Simulation & training",
    proposition: "Turn operational context into guided experience.",
    introduction: "AFAQO develops simulated environments and scenario-driven learning flows for equipment familiarization, process exploration and guided procedures. The learning objective, subject references and delivery constraints shape what the experience needs to show and how people interact with it.",
    image: "/images/projects/industrial-training/oil and gas/Image Sequence_001_0000.jpg", imageAlt: "Modeled industrial processing facility with pump skids, pipework and structural frames", imageCaption: "INDUSTRIAL TRAINING / SPATIAL SYSTEMS",
    seoTitle: "Simulation & Immersive Training Services | AFAQO",
    seoDescription: "Explore AFAQO's simulation and immersive training services for equipment familiarization, guided procedures and industrial environments, with process and project evidence.",
    definition: {
      heading: "Learn the system by exploring its context.",
      paragraphs: ["A simulation represents an environment, system or sequence so a person can explore it through defined interactions. Immersive training organizes those interactions around a learning objective: understanding equipment, following a procedure or recognizing a relationship in an operational setting.", "The format can be a headset experience, a desktop walkthrough or a browser-based environment. What matters is the connection between the subject, the learner's actions and the guidance. A visually realistic scene is not, by itself, a validated engineering or safety simulator."],
      distinctions: [
        { title: "Equipment familiarization", text: "Introduce parts, spatial relationships and agreed interaction points before asking someone to follow a complete procedure." },
        { title: "Guided learning", text: "Structure a sequence with contextual instructions and information states that support a defined learning objective." },
        { title: "Simulation boundaries", text: "State what the experience represents and what it does not. Engineering validation, safety certification and training effectiveness require separate evidence." },
      ],
    },
    benefits: [
      { title: "Make procedures visible", text: "Connect an instruction to the equipment or location it concerns, rather than leaving the learner to translate between separate documents." },
      { title: "Create a repeatable sequence", text: "Let people revisit the agreed scenario and guidance. Repetition is a property of the digital experience, not a promise of measured learning improvement." },
      { title: "Explore before physical access", text: "Introduce a representation of an environment or equipment arrangement when a real location is unavailable or access must be carefully managed." },
    ],
    capabilities: [
      { icon: "scenario", title: "Scenario-based training", text: "Learning sequences organized around a defined operational context and audience.", deliverable: "An agreed scenario with equipment interactions and guidance states.", application: "Equipment familiarization and procedural context." },
      { icon: "walkthrough", title: "Interactive walkthroughs", text: "Navigable routes that connect equipment, locations and process information.", deliverable: "A digital environment with routes, viewpoints and contextual explanations.", application: "Facility orientation and process exploration." },
      { icon: "learning", title: "Guided learning flows", text: "Contextual instructional overlays and progressive information around the learner's task.", deliverable: "A sequence of instructions, interaction states and agreed feedback.", application: "Introducing an equipment relationship or guided procedure." },
      { icon: "platform", title: "Multi-platform delivery", text: "A learning experience adapted to its intended headset, workstation or web context.", deliverable: "A runtime and control scheme tested against the agreed target.", application: "Training presentations for the intended operational environment." },
    ],
    useCases: [
      { title: "Equipment identification", text: "Introduce component names, positions and relationships in a modeled assembly, supporting an early familiarization stage." },
      { title: "Guided procedure exploration", text: "Connect steps to an agreed equipment context with overlays and interaction states. Domain experts must review the represented sequence." },
      { title: "Facility orientation", text: "Use camera navigation and route highlighting to introduce how a space is arranged and where relevant equipment is located." },
      { title: "Process explanation", text: "Relate engineering references to a spatial environment, making selected paths and equipment relationships easier to follow." },
      { title: "Safety-oriented learning scenarios", text: "Represent an agreed situation for discussion and guided exploration. This does not certify a learner or replace required site training and supervision." },
      { title: "Technical learning modules", text: "Organize a focused topic into a repeatable digital sequence. Any assessment rules, completion tracking or reporting are additional scoped requirements." },
    ],
    industries: [
      { anchor: "manufacturing", title: "Industry & Manufacturing", text: "Operators and technical learners can explore equipment structures and guided inspection sequences within a digital setting." },
      { anchor: "oil-gas", title: "Oil & Gas", text: "Facility orientation, process routes and equipment context can be explained through modeled industrial environments and contextual information." },
      { anchor: "education", title: "Education", text: "Engineering and technical concepts can be explored through guided interaction, with educators defining the learning objective and appropriate feedback." },
    ],
    technologies: [
      { title: "Unity / Unreal Engine", text: "Real-time engines connect environment content, interaction logic and instructional states. Engine choice follows the intended learning format and deployment target." },
      { title: "OpenXR / Meta XR SDK", text: "For an agreed headset scope, spatial frameworks can support device input and runtime behavior. AFAQO's existing technology content names these tools; specific features require target testing." },
      { title: "WebGL", text: "The Industrial Training case study documents web graphics, contextual overlays and workstation/browser presentation. A screen-based version can support exploration without headset access." },
      { title: "3D and reference preparation", text: "Equipment geometry, layout references and instructional information are assembled into a coherent environment. Source review and subject-matter input establish the represented relationships." },
    ],
    delivery: [
      { title: "Standalone VR", text: "SIMULXR's existing delivery material names Meta Quest 3. A specific training scope must confirm the device, input, installation and runtime constraints." },
      { title: "Workstations / PC VR", text: "Desktop and PC VR are published delivery types. The level of immersion and input hardware should follow the learning task, not the other way around." },
      { title: "Web browsers", text: "Existing Industrial Training evidence supports interactive facility presentation in modern workstation browsers. The required browser range and access environment are agreed for the project." },
    ],
    considerations: { heading: "Define the learning boundary before the interaction.", text: "The client and domain experts need to establish the reference procedure, intended audience and what completion means. Visual fidelity and instructional validity are different questions.", items: ["Agreed learning objectives and subject-matter review", "Clear distinction between exploration and validated simulation", "Feedback and assessment rules defined explicitly in scope", "Device testing, navigation comfort and readable guidance"] },
    projects: [
      { slug: "industrial-training-experience", relevance: "The documented work connects engineering references, exploded equipment, an assembled industrial facility, route highlighting and contextual overlays. It demonstrates visual and interactive foundations without establishing certified training outcomes." },
      { slug: "taf35-robot-simulation", relevance: "A complementary example of equipment exploration and component inspection. It demonstrates technical familiarization, not a validated training assessment." },
    ],
    faq: [
      { question: "Is every simulation a validated engineering simulator?", answer: "No. A visual or interactive simulation may support explanation and learning without reproducing validated physical behavior. Validation requirements, reference data and acceptance criteria must be agreed separately." },
      { question: "Does training need to use a VR headset?", answer: "No. The task may suit VR, a desktop walkthrough or a browser experience. We consider the learner, environment, input, access constraints and required spatial interaction before selecting a format." },
      { question: "Can existing procedures and models be used?", answer: "They can form the starting point for review. We need suitable rights, current references and domain-expert input. Models and documentation may require restructuring or preparation before they become an interactive learning sequence." },
      { question: "Can completion or assessment be included?", answer: "SIMULXR content includes objective-completion tracking as a capability. Assessment rules, feedback, storage and reporting must be scoped and verified for the project. We do not imply that the case studies establish learning improvements or certification." },
      { question: "Does this replace physical or safety training?", answer: "No such replacement is claimed. A digital experience may support familiarization and guided learning. The responsible organization must determine how it fits required instruction, supervision, certification and operational procedures." },
      { question: "What is needed to define a training project?", answer: "Share the learners, equipment or facility references, learning objectives, approved procedure, required interactions and intended device. Identify domain reviewers, assessment expectations and any integration needs during discovery." },
    ],
    cta: "Start with the learning objective and the operational context.",
  },
};
