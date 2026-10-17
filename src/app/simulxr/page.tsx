import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import styles from "@/components/sections/simulxr/Simulxr.module.css";

export const metadata: Metadata = {
  title: "SIMULXR — Industrial Simulation & Immersive Training | AFAQO",
  description:
    "SIMULXR is AFAQO's specialized industrial simulation and immersive training initiative, helping teams explore equipment, understand processes, and master operational systems.",
};

const modules = [
  {
    number: "01",
    category: "Operational Topology",
    title: "Digital Facility & System Architecture",
    desc: "We construct spatial digital twins of complex industrial plants, substations, and production lines. Every pipe, valve, and sensor is mapped with geometric accuracy and functional relationships.",
    specs: [
      "Millimeter-accurate 3D facility reconstruction from engineering blueprints",
      "Interactive piping and instrumentation diagram (P&ID) spatial mapping",
      "Real-time sensor telemetry visualization directly within 3D space",
      "Multi-user site walkthroughs and operational planning sessions",
    ],
    image: "/images/projects/industrial-training/industrial-training.png",
    badge: "Facility Digital Twin",
    reversed: false,
  },
  {
    number: "02",
    category: "Component Inspection",
    title: "Equipment Understanding & Cutaway Exploration",
    desc: "Complex robotic assemblies and high-pressure equipment can be inspected from any angle, exploded into discrete components, or observed with simulated fluid or electrical flow.",
    specs: [
      "Exploded engineering views illustrating internal assemblies",
      "Animated mechanical workflows with accurate kinematic constraints",
      "Step-by-step assembly and disassembly guidance modules",
      "Integrated technical documentation and safety callouts",
    ],
    image: "/images/projects/taf35-robot/taf35-robot.png",
    badge: "Interactive Mechanics",
    reversed: true,
  },
  {
    number: "03",
    category: "Procedural Mastery",
    title: "High-Consequence VR Procedural Training",
    desc: "Technicians execute rigorous standard operating procedures in simulated VR environments. Mistakes trigger realistic diagnostic feedback without safety hazards or facility downtime.",
    specs: [
      "Natural 6DOF hand interaction for valve operation and tool handling",
      "Strict procedural verification: lockout/tagout (LOTO) protocols",
      "Simulated abnormal conditions and emergency shutdown sequences",
      "Scored technician competency reports and telemetry tracking",
    ],
    image: "/images/industries/oil-gas.webp",
    badge: "Zero-Hazard Training",
    reversed: false,
  },
];

const workflowStages = [
  {
    step: "01",
    name: "CAD & Telemetry Ingestion",
    desc: "Ingesting engineering CAD models, operational manuals, and instrumentation schematics.",
  },
  {
    step: "02",
    name: "Polygon & PBR Optimization",
    desc: "Converting dense CAD geometry into clean, optimized real-time meshes with photorealistic PBR materials.",
  },
  {
    step: "03",
    name: "Physics & Logic Simulation",
    desc: "Implementing kinematic constraints, fluid logic, electrical flow, and procedural validation checks.",
  },
  {
    step: "04",
    name: "Deployment & Commissioning",
    desc: "Validating stable 90 FPS performance on target VR headsets and commissioning with operational teams.",
  },
];

const hardwareTargets = [
  {
    type: "PORTABLE & FIELD-READY",
    title: "Standalone VR Headsets",
    desc: "Optimized mobile GPU runtimes for Meta Quest 3 and enterprise headsets, enabling untethered training anywhere.",
    specs: [
      { key: "Target Framerate", val: "72 - 90 FPS" },
      { key: "Tethering", val: "100% Wireless" },
      { key: "Tracking", val: "Inside-Out Optical" },
    ],
  },
  {
    type: "HIGH-FIDELITY SIMULATION",
    title: "PC VR & Simulation Cabs",
    desc: "Tethered high-end workstations delivering photorealistic lighting, advanced haptic controllers, and physical replica cabs.",
    specs: [
      { key: "Target Framerate", val: "90 - 120 FPS" },
      { key: "Visuals", val: "Raytraced Lighting" },
      { key: "Peripherals", val: "Force-Feedback Haptics" },
    ],
  },
  {
    type: "CROSS-PLATFORM ACCESS",
    title: "Web & Enterprise Desktop",
    desc: "Interactive 3D digital twins accessible instantly through corporate web browsers without software installation.",
    specs: [
      { key: "Runtime", val: "WebGL / WebGPU" },
      { key: "Compatibility", val: "Chrome, Edge, Safari" },
      { key: "Deployment", val: "Private Cloud / On-Prem" },
    ],
  },
];

export default function SimulxrPage() {
  return (
    <div className={styles.simulxrPage}>
      {/* S00: Route Header (Dark surface) */}
      <Header theme="dark" />

      {/* X01: Industrial Hero */}
      <section className={styles.heroSection} aria-labelledby="simulxr-heading">
        <span className={styles.eyebrow}>SPECIALIZED INITIATIVE // SIMULXR</span>
        <h1 id="simulxr-heading" className={styles.heroTitle}>
          Industrial systems. <span className={styles.accentWord}>Immersive understanding.</span>
        </h1>
        <p className={styles.heroIntro}>
          SIMULXR is AFAQO’s specialized industrial simulation and immersive training initiative,
          helping teams explore equipment, understand processes, and engage with operational systems.
        </p>
        <div className={styles.heroButtons}>
          <Link href="/contact" className={styles.primaryBtn}>
            Discuss an Industrial Project <span>↗</span>
          </Link>
          <a href="#capabilities" className={styles.secondaryBtn}>
            Explore Capabilities ↓
          </a>
        </div>
      </section>

      {/* X02: Why Simulation Matters */}
      <section className={styles.whySection} aria-labelledby="why-heading">
        <div className={styles.whyContainer}>
          <h2 id="why-heading" className={styles.whyTitle}>
            Why industrial simulation matters.
          </h2>
          <div className={styles.whyContent}>
            <p className={styles.bodyLarge}>
              Modern industrial infrastructure is increasingly complex, automated, and hazardous.
              Training field personnel on live facilities carries high operational risks and costly downtime.
            </p>
            <p className={styles.bodyRegular}>
              SIMULXR closes the gap between abstract engineering manuals and hands-on muscle memory.
              By giving technicians an interactive, millimeter-accurate digital replica of their workplace,
              they master critical procedures before stepping foot on site.
            </p>
          </div>
        </div>
      </section>

      {/* X03 - X06: Capabilities & Industrial Modules */}
      <section id="capabilities" className={styles.featureSection} aria-labelledby="modules-heading">
        <span className={styles.eyebrow}>02 / CAPABILITIES</span>
        <h2 id="modules-heading" className={styles.heroTitle} style={{ marginBottom: "3.5rem" }}>
          Engineered for operational clarity.
        </h2>

        {modules.map((mod) => (
          <div
            key={mod.number}
            className={
              mod.reversed ? styles.featureGridReversed : styles.featureGrid
            }
          >
            {/* Description */}
            <div>
              <div className={styles.featureMeta}>
                <span className={styles.featureNumber}>{mod.number}</span>
                <span className={styles.featureCategory}>{mod.category}</span>
              </div>
              <h3 className={styles.featureTitle}>{mod.title}</h3>
              <p className={styles.featureDesc}>{mod.desc}</p>
              <ul className={styles.featureSpecs}>
                {mod.specs.map((item, idx) => (
                  <li key={idx} className={styles.featureSpecItem}>
                    <span className={styles.specBullet}>—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual Media */}
            <div>
              <div className={styles.mediaFrame}>
                <span className={styles.mediaBadge}>{mod.badge}</span>
                <Image
                  src={mod.image}
                  alt={mod.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={styles.mediaImage}
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* X07: Production Workflow */}
      <section className={styles.workflowSection} aria-labelledby="workflow-heading">
        <div className={styles.workflowContainer}>
          <span className={styles.eyebrow}>03 / METHODOLOGY</span>
          <h2 id="workflow-heading" className={styles.workflowTitle}>
            From engineering CAD to verified runtime.
          </h2>
          <p className={styles.workflowSubtitle}>
            Our production workflow maintains absolute dimensional fidelity while
            delivering lightning-fast real-time framerates.
          </p>

          <div className={styles.stagesGrid}>
            {workflowStages.map((stage) => (
              <div key={stage.step} className={styles.stageCard}>
                <span className={styles.stageStep}>{stage.step}</span>
                <h3 className={styles.stageName}>{stage.name}</h3>
                <p className={styles.stageDesc}>{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* X09: Deployment Targets */}
      <section className={styles.hardwareSection} aria-labelledby="hardware-heading">
        <span className={styles.eyebrow}>04 / RUNTIMES</span>
        <h2 id="hardware-heading" className={styles.workflowTitle}>
          Flexible hardware deployment.
        </h2>
        <div className={styles.hardwareGrid}>
          {hardwareTargets.map((hw) => (
            <div key={hw.title} className={styles.hardwareCard}>
              <span className={styles.hardwareType}>{hw.type}</span>
              <h3 className={styles.hardwareTitle}>{hw.title}</h3>
              <p className={styles.hardwareDesc}>{hw.desc}</p>
              <ul className={styles.hardwareSpecs}>
                {hw.specs.map((s) => (
                  <li key={s.key} className={styles.hardwareSpecRow}>
                    <span className={styles.hardwareSpecKey}>{s.key}</span>
                    <span className={styles.hardwareSpecVal}>{s.val}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* X10: CTA */}
      <section className={styles.ctaSection} aria-labelledby="cta-heading">
        <div className={styles.ctaContainer}>
          <h2 id="cta-heading" className={styles.ctaTitle}>
            Discuss an industrial simulation project.
          </h2>
          <p className={styles.ctaSubtitle}>
            Let’s explore how SIMULXR can digitize your facilities, accelerate technician
            onboarding, and eliminate procedural training risk.
          </p>
          <Link href="/contact" className={styles.primaryBtn}>
            Start a Conversation <span>↗</span>
          </Link>
        </div>
      </section>

      {/* Global Unified Footer */}
      <Footer />
    </div>
  );
}
