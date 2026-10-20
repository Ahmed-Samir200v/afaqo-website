import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import styles from "@/components/sections/simulxr/Simulxr.module.css";

export const metadata: Metadata = {
  title: "SIMULXR | Industrial Simulation & Immersive Training | AFAQO",
  description:
    "SIMULXR is an AFAQO initiative focused on industrial simulation, procedural training and explorable technical systems for complex operations.",
};

const modules = [
  {
    number: "01",
    category: "Operational Topology",
    title: "Explorable Process Environments",
    desc: "3D environments of plants, processing units and mechanical bays built for spatial orientation and process flow understanding. Technicians can trace piping, identify isolation valves and understand spatial relationships without plant downtime.",
    specs: [
      "Scale-accurate 3D facility reconstruction from engineering references and site data",
      "Interactive process flow visualization and piping walkthroughs",
      "Contextual equipment callouts and operating parameters",
      "Multi-user site walkthroughs for team orientation and planning",
    ],
    image: "/images/projects/industrial-training/industrial-training.png",
    badge: "Facility Digital Replica",
    reversed: false,
  },
  {
    number: "02",
    category: "Component Inspection",
    title: "Equipment Inspection & Cutaway Views",
    desc: "Interactive 3D models of complex equipment and assemblies that can be inspected externally, exploded into individual components and viewed in cross-section to reveal internal mechanics.",
    specs: [
      "Exploded assembly views showing sub-components and spatial relationships",
      "Kinematic mechanical sequences demonstrating operating cycles",
      "Component identification with functional descriptions and specifications",
      "Integrated technical callouts and inspection checkpoints",
    ],
    image: "/images/projects/taf35-robot/taf35-robot.png",
    badge: "Interactive Mechanics",
    reversed: true,
  },
  {
    number: "03",
    category: "Procedural Training",
    title: "Procedural Training Modules",
    desc: "Step-by-step VR and interactive 3D training scenarios for standard operating procedures, safety sequences and equipment startup protocols.",
    specs: [
      "Step-by-step procedural guidance with real-time feedback",
      "Procedural verification for lockout/tagout (LOTO) and safety checks",
      "Scenario variations covering standard, abnormal and emergency states",
      "Objective completion tracking to support training assessment",
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
      {/* S00: Route Header (Unified Home Navigation) */}
      <Header />

      {/* X01: Industrial Hero */}
      <section className={styles.heroSection} aria-labelledby="simulxr-heading">
        <span className={styles.eyebrow}>A SPECIALIZED AFAQO INITIATIVE</span>
        <h1 id="simulxr-heading" className={styles.heroTitle}>
          SIMULXR. Industrial systems <span className={styles.accentWord}>made explorable.</span>
        </h1>
        <p className={styles.heroIntro}>
          An initiative by AFAQO focused on interactive simulation, procedural training and spatial understanding for technical, industrial and operational environments.
        </p>
        <div className={styles.heroButtons}>
          <Link href="/contact" className={styles.primaryBtn}>
            Discuss an Industrial Use Case <span>→</span>
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
            Why simulation matters.
          </h2>
          <div className={styles.whyContent}>
            <p className={styles.bodyLarge}>
              Complex facilities, heavy machinery and high-voltage systems are difficult to explain through static drawings and risky to practice on directly. Field training often requires shutting down active lines, taking mentors away from operations or putting personnel near hazards before they understand the basics.
            </p>
            <p className={styles.bodyRegular}>
              SIMULXR develops interactive 3D and VR simulations that let operators, engineers and technicians explore equipment internally, walk through step-by-step procedures and make mistakes safely—building muscle memory and procedural confidence before stepping into the field.
            </p>
            <p style={{
              fontSize: "0.8125rem",
              lineHeight: 1.5,
              color: "var(--color-text-secondary, rgba(5, 13, 36, 0.65))",
              borderLeft: "2px solid var(--color-brand-blue, #0866FF)",
              paddingLeft: "1rem",
              marginTop: "1.5rem",
              fontStyle: "italic",
            }}>
              Note: Illustrative process visualization and procedural training environments are engineered for operational understanding and safety familiarity; they do not replace formal engineering calculation, certified hardware validation, or regulatory compliance testing.
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
            What should your team be able to explore or practice?
          </h2>
          <p className={styles.ctaSubtitle}>
            Whether you need to explain an industrial system to stakeholders or build a procedural training module for operators, let&apos;s discuss your requirements.
          </p>
          <Link href="/contact" className={styles.primaryBtn}>
            Start a Conversation <span>→</span>
          </Link>
        </div>
      </section>

      {/* Global Unified Footer */}
      <Footer />
    </div>
  );
}
