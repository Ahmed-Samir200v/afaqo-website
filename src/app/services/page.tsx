import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getAllCaseStudies } from "@/content/projects/case-studies";
import { ServicesScrollReveal } from "@/components/sections/services/ServicesScrollReveal";
import styles from "@/components/sections/services/Services.module.css";

export const metadata: Metadata = {
  title: "Immersive Technology Services | XR, 3D & Simulation | AFAQO",
  description:
    "Explore AFAQO's XR development, interactive 3D, digital environment visualization, real-time development and immersive training capabilities.",
};

const chapters = [
  {
    number: "01",
    category: "Spatial Computing",
    title: "Extended Reality (XR)",
    description:
      "We design VR, AR and mixed-reality experiences that help people interact with spaces, products and information in direct, purposeful ways. The experience starts with the user's task—not the headset.",
    deliverables: [
      "Virtual Reality (VR) environments for exploration and guided training",
      "Augmented Reality (AR) spatial applications for mobile and wearable devices",
      "Mixed Reality (MR) spatial interfaces and experiential installations",
      "Cross-platform spatial interactions designed for target hardware",
    ],
    tags: ["AR", "VR", "MR", "Spatial Experiences", "Interactive Physics"],
    image: "/images/hero/afaqo-hero-desktop.jpg",
    badge: "Spatial / XR",
    reversed: false,
  },
  {
    number: "02",
    category: "Real-Time Systems",
    title: "Interactive 3D & Digital Environments",
    description:
      "We create detailed 3D representations of facilities, equipment, and complex systems for visualization, orientation, and interactive exploration. Depending on project scope, these may form part of a broader digital-twin initiative when the necessary data and systems are available. (A visualization model is a digital replica, distinct from a live operational digital twin.)",
    deliverables: [
      "Interactive 3D facility and equipment visual explorers",
      "Navigable digital replicas for spatial understanding and stakeholder communication",
      "Interactive component inspection and exploded mechanical assemblies",
      "Custom WebGL and native runtime interactive applications",
    ],
    tags: ["Digital Environments", "Interactive 3D", "Robotics", "Simulation"],
    image: "/images/projects/taf35-robot/taf35-robot.png",
    badge: "Interactive Systems",
    reversed: true,
  },
  {
    number: "03",
    category: "High-Fidelity CG",
    title: "Real-Time 3D Production",
    description:
      "Our 3D production workflow balances visual fidelity, scene organization, and runtime performance together—from modeling and materials to real-time optimization and engine integration.",
    deliverables: [
      "Architectural and industrial 3D environment modeling",
      "Physically-based (PBR) materials, shaders, and authentic lighting",
      "Optimization for strict polygon, draw-call, and texture budgets",
      "High-resolution cinematic visual sequences and media assets",
    ],
    tags: ["3D Environments", "Materials & Lighting", "Optimization", "Cinematics"],
    image: "/images/projects/remal-park/remal-park.jpg",
    badge: "Visual Production",
    reversed: false,
  },
  {
    number: "04",
    category: "Simulation & Training",
    title: "Simulation & Immersive Training",
    description:
      "We develop simulated experiences that let users explore environments, interact with equipment, and follow scenario-driven learning flows. The design is shaped around the learning objective, system constraints, and intended platform.",
    deliverables: [
      "Scenario-based training sequences for equipment familiarization",
      "Interactive operational walkthroughs and process exploration",
      "Guided learning flows with contextual instructional overlays",
      "Hardware deployment across VR headsets, enterprise workstations, and web",
    ],
    tags: ["Simulation", "Scenario Training", "Process Exploration", "Ergonomics"],
    image: "/images/projects/industrial-training/industrial-training.png",
    badge: "Training & Simulation",
    reversed: true,
  },
];

const processStages = [
  {
    index: "01",
    name: "Discovery & Strategy",
    desc: "Aligning creative direction, technical feasibility, and measurable business objectives.",
  },
  {
    index: "02",
    name: "Experience Architecture",
    desc: "Designing interaction paradigms, spatial ergonomics, and technical system specifications.",
  },
  {
    index: "03",
    name: "3D & Spatial Asset Production",
    desc: "Sculpting, modeling, texturing, and optimizing assets for target runtime performance.",
  },
  {
    index: "04",
    name: "Real-Time Engineering",
    desc: "Developing game-engine logic, UI systems, hardware integration, and telemetry pipelines.",
  },
  {
    index: "05",
    name: "Validation & Deployment",
    desc: "Rigorous testing on target hardware, on-site commissioning, and lifecycle maintenance.",
  },
];

export default function ServicesPage() {
  const relevantProjects = getAllCaseStudies().slice(0, 3);

  return (
    <div className={styles.servicesPage}>
      {/* S00: Route Header (Unified Home Navigation) */}
      <Header />

      <ServicesScrollReveal>
        {/* S01: Editorial Hero */}
        <section className={styles.heroSection} aria-labelledby="services-heading">
          <span data-reveal-hero-item className={styles.eyebrow}>OUR CAPABILITIES</span>
          <h1 id="services-heading" data-reveal-hero-item className={styles.heroTitle}>
            Ideas become <span className={styles.accentWord}>experiences.</span>
          </h1>
          <p data-reveal-hero-item className={styles.heroIntro}>
            From strategy and design to 3D production and real-time development,
            we create interactive digital experiences built around practical needs.
          </p>
        </section>

        {/* S02 - S05: Four Distinct Capability Chapters */}
        {chapters.map((chapter) => (
          <section
            key={chapter.number}
            data-reveal-chapter
            className={styles.chapterSection}
            aria-labelledby={`chapter-${chapter.number}`}
          >
            <div
              className={
                chapter.reversed
                  ? styles.chapterContainerReversed
                  : styles.chapterContainer
              }
            >
              {/* Text Column */}
              <div>
                <div data-reveal-chapter-text className={styles.chapterMeta}>
                  <span className={styles.chapterNumber}>{chapter.number}</span>
                  <span className={styles.chapterCategory}>{chapter.category}</span>
                </div>
                <h2 id={`chapter-${chapter.number}`} data-reveal-chapter-text className={styles.chapterTitle}>
                  {chapter.title}
                </h2>
                <p data-reveal-chapter-text className={styles.chapterDescription}>{chapter.description}</p>
                
                <ul data-reveal-chapter-text className={styles.deliverablesList}>
                  {chapter.deliverables.map((item, idx) => (
                    <li key={idx} className={styles.deliverableItem}>
                      <span className={styles.deliverableBullet}>—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div data-reveal-chapter-text className={styles.tagRow}>
                  {chapter.tags.map((tag, idx) => (
                    <span key={idx} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Media Column */}
              <div data-reveal-chapter-media>
                <div className={styles.mediaFrame}>
                  <span className={styles.mediaBadge}>{chapter.badge}</span>
                  <Image
                    src={chapter.image}
                    alt={`${chapter.title} - AFAQO capability`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={styles.mediaImage}
                  />
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* S06: Deep Navy Technical Band (One Partner. End to End.) */}
        <section data-reveal-endtoend className={styles.endToEndSection} aria-labelledby="end-to-end-heading">
          <div className={styles.endToEndContainer}>
            <span data-reveal-endtoend-header className={styles.endToEndEyebrow}>System Architecture</span>
            <h2 id="end-to-end-heading" data-reveal-endtoend-header className={styles.endToEndTitle}>
              One partner. End to end.
            </h2>
            <p data-reveal-endtoend-header className={styles.endToEndSubhead}>
              From the first idea to the final deployed experience, we engineer
              continuous technical coherence across every project milestone.
            </p>

            <div data-reveal-stages-grid className={styles.stagesGrid}>
              {processStages.map((stage) => (
                <div key={stage.index} data-reveal-stage-card className={styles.stageCard}>
                  <div className={styles.stageIndex}>{stage.index}</div>
                  <h3 className={styles.stageName}>{stage.name}</h3>
                  <p className={styles.stageDesc}>{stage.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* S07: Relevant Work */}
        <section data-reveal-work className={styles.relevantWorkSection} aria-labelledby="relevant-work-heading">
          <div data-reveal-work-header className={styles.sectionHeader}>
            <div>
              <span className={styles.eyebrow}>03 / PROVEN EXECUTION</span>
              <h2 id="relevant-work-heading" className={styles.sectionTitle}>
                Capabilities in practice.
              </h2>
            </div>
            <Link href="/work" className={styles.viewAllLink}>
              Explore all projects ↗
            </Link>
          </div>

          <div data-reveal-projects-grid className={styles.projectsGrid}>
            {relevantProjects.map((project) => (
              <Link
                key={project.slug}
                data-reveal-project-card
                href={`/work/${project.slug}`}
                className={styles.projectCard}
              >
                <div className={styles.projectImageFrame}>
                  <Image
                    src={project.image}
                    alt={project.imageAlt || project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.mediaImage}
                  />
                </div>
                <div className={styles.projectBody}>
                  <div className={styles.projectMeta}>
                    <span>{project.category}</span>
                    <span>{project.location}</span>
                  </div>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectSummary}>{project.summary}</p>
                  <div className={styles.projectArrow}>
                    View case study <span>↗</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* S08: Closing CTA */}
        <section data-reveal-cta className={styles.closingCtaSection} aria-labelledby="cta-heading">
          <div className={styles.ctaContainer}>
            <span data-reveal-cta-item className={styles.ctaEyebrow}>Start a Conversation</span>
            <h2 id="cta-heading" data-reveal-cta-item className={styles.ctaTitle}>
              Let’s build something worth experiencing.
            </h2>
            <p data-reveal-cta-item className={styles.ctaSubtitle}>
              Whether you have a fully scoped technical brief or an early-stage spatial concept,
              our team is ready to help you define and build it.
            </p>
            <div data-reveal-cta-item>
              <Link href="/contact" className={styles.ctaButton}>
                Start a Project <span>↗</span>
              </Link>
            </div>
          </div>
        </section>
      </ServicesScrollReveal>

      {/* Global Unified Footer */}
      <Footer />
    </div>
  );
}
