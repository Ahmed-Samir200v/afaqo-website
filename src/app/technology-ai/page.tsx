import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import styles from "@/components/sections/technology/Technology.module.css";

export const metadata: Metadata = {
  title: "Technology & Real-Time Development | AFAQO",
  description:
    "How AFAQO approaches real-time engines, spatial computing, 3D asset pipelines and selective AI integration to build dependable interactive experiences.",
};

const architecturePillars = [
  {
    code: "SYS.01 // REALTIME",
    title: "Real-Time Engines",
    desc: "Unreal Engine, Unity, WebGL and WebXR configured for deterministic interaction, stable frame rates and responsive controls across desktop, mobile and headsets.",
    tech: ["Unreal Engine", "Unity", "WebGL / Three.js", "C# / C++"],
  },
  {
    code: "SYS.02 // SPATIAL",
    title: "Spatial Computing",
    desc: "Headset tracking, 6DOF controller input, hand interaction and spatial audio engineered for comfort, clarity and repeatable procedural training.",
    tech: ["OpenXR", "Meta XR SDK", "VisionOS", "WebXR"],
  },
  {
    code: "SYS.03 // PIPELINE",
    title: "3D Asset Pipeline",
    desc: "High-precision modeling, technical optimization and PBR material authoring built to deliver visual depth within realistic polygon and memory budgets.",
    tech: ["Blender", "Substance 3D", "ZBrush", "Houdini"],
  },
  {
    code: "SYS.04 // ADAPTIVE",
    title: "Selective AI Integration",
    desc: "Targeted AI workflows that improve production velocity and enable contextual assistance—without unverified autonomous claims.",
    tech: ["Pipeline Automation", "Contextual Guidance", "NLP Interfaces"],
  },
];

const pipelineStages = [
  {
    step: "01",
    title: "Blockout & Scale",
    desc: "Establishing spatial proportions and ergonomic sightlines.",
  },
  {
    step: "02",
    title: "High-Poly Modeling",
    desc: "Sculpting mechanical details and environmental geometry.",
  },
  {
    step: "03",
    title: "UV & Texture Baking",
    desc: "Baking ambient occlusion, normal, and curvature maps.",
  },
  {
    step: "04",
    title: "PBR Material Authoring",
    desc: "Physically based roughness, metallic, and optical properties.",
  },
  {
    step: "05",
    title: "LOD & Mesh Optimization",
    desc: "Targeting strict polygon and draw-call budgets.",
  },
  {
    step: "06",
    title: "Engine Runtime Wiring",
    desc: "Compiling shaders, collisions, and interactive scripts.",
  },
];

const spatialMatrix = [
  {
    badge: "Augmented Reality",
    title: "Contextual Overlays",
    desc: "Superimposing contextual 3D schematics and operational data directly onto physical machinery or consumer environments.",
    specs: [
      { label: "Hardware", value: "Mobile iOS/Android & Headsets" },
      { label: "Primary Use", value: "Field Maintenance & Showcases" },
      { label: "Tracking", value: "Markerless Surface & Spatial Anchors" },
      { label: "Framerate Target", value: "60 FPS Continuous" },
    ],
  },
  {
    badge: "Virtual Reality",
    title: "Full Immersion",
    desc: "Transporting users into fully synthetic, photorealistic environments for high-consequence procedural training and deep exploration.",
    specs: [
      { label: "Hardware", value: "Meta Quest 3, Vive, PC VR" },
      { label: "Primary Use", value: "Industrial Training & Exhibits" },
      { label: "Tracking", value: "6DOF Inside-Out & Controllers" },
      { label: "Framerate Target", value: "72–90 FPS Zero-Jitter" },
    ],
  },
  {
    badge: "Mixed Reality",
    title: "Blended Reality",
    desc: "High-resolution passthrough video combining physical spaces with reactive, occlusion-aware holographic elements and intuitive hand gestures.",
    specs: [
      { label: "Hardware", value: "Apple Vision Pro & Quest 3" },
      { label: "Primary Use", value: "Collaborative Workspaces & Labs" },
      { label: "Tracking", value: "Optical Hand & Eye Tracking" },
      { label: "Framerate Target", value: "90 FPS Low-Latency" },
    ],
  },
];

const aiTracks = [
  {
    tag: "TRACK A: INTERNAL VELOCITY",
    title: "Internal Production Velocity",
    desc: "How we use machine intelligence within our own design, asset preparation and testing pipelines to accelerate delivery and reduce repetitive manual tasks.",
    items: [
      "Accelerating repetitive asset preparation, UV unwrapping and format conversions",
      "Automating test scripts and layout variations across target resolutions",
      "Rapid prototyping of interface concepts and spatial wireframes",
      "Continuous integration checks for asset budgets and runtime performance",
    ],
  },
  {
    tag: "TRACK B: USER EXPERIENCE",
    title: "Delivered Experience Capabilities",
    desc: "Capabilities integrated into client applications only where they provide clear, verifiable utility and fit the operational environment.",
    items: [
      "Contextual virtual assistants and natural-language interaction where relevant",
      "Adaptive scenario pacing based on user progression during training",
      "Automated multilingual text and audio narration layers",
      "Dynamic scenario variables within structured, pre-authored boundaries",
    ],
  },
];

export default function TechnologyAiPage() {
  return (
    <div className={styles.techPage}>
      {/* S00: Route Header (Unified Home Navigation) */}
      <Header />

      {/* T01: Hero */}
      <section className={styles.heroSection} aria-labelledby="tech-heading">
        <span className={styles.eyebrow}>05 / TECHNOLOGY & ARCHITECTURE</span>
        <h1 id="tech-heading" className={styles.heroTitle}>
          The right technology serves the <span className={styles.accentWord}>experience.</span>
        </h1>
        <p className={styles.heroIntro}>
          We select platforms, runtimes and pipelines based on what the experience must achieve—not the newest release cycle. Every technical choice balances fidelity, stability and practical delivery.
        </p>
      </section>

      {/* T02: Architecture Pillars */}
      <section className={styles.architectureSection} aria-labelledby="pillars-heading">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>Core Infrastructure</span>
          <h2 id="pillars-heading" className={styles.sectionTitle}>
            Four pillars of technical execution.
          </h2>
          <p className={styles.sectionSubtitle}>
            Our engineering stack balances creative visual fidelity with rigorous runtime
            stability and predictable cross-platform performance.
          </p>
        </div>

        <div className={styles.pillarsGrid}>
          {architecturePillars.map((p) => (
            <div key={p.code} className={styles.pillarCard}>
              <span className={styles.pillarCode}>{p.code}</span>
              <h3 className={styles.pillarTitle}>{p.title}</h3>
              <p className={styles.pillarDesc}>{p.desc}</p>
              <ul className={styles.pillarTechList}>
                {p.tech.map((t) => (
                  <li key={t} className={styles.pillarTechBadge}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* T03 - T05: Light Surface Section (3D Pipeline & Spatial Matrix) */}
      <section className={styles.lightSection} aria-labelledby="pipeline-heading">
        <div className={styles.lightContainer}>
          <span className={styles.eyebrow}>06 / CRAFT & PRECISION</span>
          <h2 id="pipeline-heading" className={styles.lightTitle}>
            3D production pipeline.
          </h2>
          <p className={styles.lightSubtitle}>
            From initial geometric volume studies to runtime vertex shading, every asset
            moves through a six-stage optimization discipline.
          </p>

          <div className={styles.pipelineGrid}>
            {pipelineStages.map((stage) => (
              <div key={stage.step} className={styles.pipelineStep}>
                <span className={styles.stepNumber}>{stage.step}</span>
                <h3 className={styles.stepTitle}>{stage.title}</h3>
                <p className={styles.stepDesc}>{stage.desc}</p>
              </div>
            ))}
          </div>

          <h2 className={styles.lightTitle}>Spatial computing modalities.</h2>
          <p className={styles.lightSubtitle}>
            We select the spatial medium based on operational objectives, ergonomics, and hardware constraints.
          </p>

          <div className={styles.spatialMatrixGrid}>
            {spatialMatrix.map((item) => (
              <div key={item.badge} className={styles.spatialCard}>
                <span className={styles.spatialBadge}>{item.badge}</span>
                <h3 className={styles.spatialCardTitle}>{item.title}</h3>
                <p className={styles.spatialCardDesc}>{item.desc}</p>
                <ul className={styles.specsList}>
                  {item.specs.map((spec) => (
                    <li key={spec.label} className={styles.specRow}>
                      <span className={styles.specLabel}>{spec.label}</span>
                      <span className={styles.specValue}>{spec.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* T06: AI in Practice: Two Tracks */}
      <section className={styles.aiSection} aria-labelledby="ai-heading">
        <div className={styles.aiContainer}>
          <span className={styles.eyebrow}>07 / ARTIFICIAL INTELLIGENCE</span>
          <h2 id="ai-heading" className={styles.sectionTitle}>
            Where AI helps—and where it does not.
          </h2>
          <p className={styles.sectionSubtitle}>
            We distinguish between tools that accelerate internal production and capabilities delivered inside client applications.
          </p>

          <div className={styles.aiTracksGrid}>
            {aiTracks.map((track) => (
              <div key={track.tag} className={styles.aiTrackCard}>
                <span className={styles.trackTag}>{track.tag}</span>
                <h3 className={styles.trackTitle}>{track.title}</h3>
                <p className={styles.trackDesc}>{track.desc}</p>
                <ul className={styles.trackItems}>
                  {track.items.map((item, idx) => (
                    <li key={idx} className={styles.trackItem}>
                      <span className={styles.trackItemBullet}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* T09: CTA */}
      <section className={styles.ctaSection} aria-labelledby="cta-heading">
        <div className={styles.ctaContainer}>
          <h2 id="cta-heading" className={styles.ctaTitle}>
            Have a technical constraint? Let&apos;s work through it.
          </h2>
          <p className={styles.ctaSubtitle}>
            Whether you are evaluating platform fit, real-time feasibility or production scope, we can help assess the requirements.
          </p>
          <Link href="/contact" className={styles.ctaButton}>
            Discuss Your Challenge <span>→</span>
          </Link>
        </div>
      </section>

      {/* Global Unified Footer */}
      <Footer />
    </div>
  );
}
