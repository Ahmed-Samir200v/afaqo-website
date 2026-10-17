import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getAllCaseStudies } from "@/content/projects/case-studies";
import { ServicesScrollReveal } from "@/components/sections/services/ServicesScrollReveal";
import styles from "@/components/sections/services/Services.module.css";

export const metadata: Metadata = {
  title: "Services — Creative Technology & Immersive Capabilities | AFAQO",
  description:
    "Explore AFAQO's end-to-end capabilities across Immersive Experiences (AR/VR/MR), Interactive Digital Solutions, 3D Content & Visualization, and Experience Design & Development.",
};

const chapters = [
  {
    number: "01",
    category: "Spatial Computing",
    title: "Immersive Experiences",
    description:
      "We design and build augmented, virtual, and mixed reality experiences that connect people with new ways to learn, explore, and interact. Every environment is engineered for presence, fluid spatial interaction, and meaningful human engagement.",
    deliverables: [
      "Augmented Reality (AR) spatial applications for mobile & vision headsets",
      "Virtual Reality (VR) simulations for high-stakes operational training",
      "Mixed Reality (MR) spatial interfaces and experiential installations",
      "Multi-user collaborative virtual spaces and exhibition environments",
    ],
    tags: ["AR", "VR", "MR", "Spatial Experiences", "Interactive Physics"],
    image: "/images/hero/afaqo-hero-desktop.jpg",
    badge: "Spatial / XR",
    reversed: false,
  },
  {
    number: "02",
    category: "Real-Time Systems",
    title: "Interactive Digital Solutions",
    description:
      "We transform complex industrial equipment, physical facilities, and enterprise systems into interactive digital twins and real-time operational applications. By grounding spatial models in functional telemetry, we make complex data immediately understandable.",
    deliverables: [
      "Real-time Digital Twins for industrial infrastructure and robotics",
      "Interactive 3D configurators and product visualization engines",
      "Simulation platforms for predictive maintenance and training",
      "Custom WebGL and native runtime interactive dashboards",
    ],
    tags: ["Digital Twins", "Real-Time Systems", "Robotics", "Simulations"],
    image: "/images/projects/taf35-robot/taf35-robot.png",
    badge: "Interactive Systems",
    reversed: true,
  },
  {
    number: "03",
    category: "High-Fidelity CG",
    title: "3D Content & Visualization",
    description:
      "We produce photorealistic 3D environments, digital assets, and cinematic visual content that articulate visionary concepts with technical fidelity and atmospheric depth. From architectural masterplans to intricate mechanics, we bring precision to every millimeter.",
    deliverables: [
      "Photorealistic environmental and architectural visualization",
      "Hero-grade hard-surface and organic 3D asset modeling",
      "Atmospheric daylight, lighting, and material simulation",
      "Cinematic real-time and offline animation sequences",
    ],
    tags: ["3D Environments", "Visualization", "Materials", "Cinematics"],
    image: "/images/projects/remal-park/remal-park.jpg",
    badge: "Visual Production",
    reversed: false,
  },
  {
    number: "04",
    category: "End-to-End Delivery",
    title: "Experience Design & Development",
    description:
      "We translate high-level business vision into intuitive, friction-free interactive products. Our methodology unifies creative direction, spatial UX ergonomics, rapid interactive prototyping, and hardened full-stack software engineering.",
    deliverables: [
      "Strategic technical discovery and experience roadmapping",
      "Spatial UX/UI design systems, wireframes, and ergonomics",
      "Cross-platform real-time interactive development (Unreal / Unity / Web)",
      "Quality assurance, deployment architecture, and lifecycle support",
    ],
    tags: ["Creative Direction", "Spatial UX", "Full-Stack Dev", "QA"],
    image: "/images/projects/industrial-training/industrial-training.png",
    badge: "Architecture & UX",
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
      {/* S00: Route Header (Light surface) */}
      <Header theme="light" />

      <ServicesScrollReveal>
        {/* S01: Editorial Hero */}
        <section className={styles.heroSection} aria-labelledby="services-heading">
          <span data-reveal-hero-item className={styles.eyebrow}>02 / SERVICES</span>
          <h1 id="services-heading" data-reveal-hero-item className={styles.heroTitle}>
            Ideas become <span className={styles.accentWord}>experiences.</span>
          </h1>
          <p data-reveal-hero-item className={styles.heroIntro}>
            From strategy and design to immersive production and real-time development,
            we create digital experiences built around real-world needs.
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
