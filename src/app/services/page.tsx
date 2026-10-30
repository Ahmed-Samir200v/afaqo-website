import type { Metadata } from "next";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getAllCaseStudies } from "@/content/projects/case-studies";
import { ServicesScrollReveal } from "@/components/sections/services/ServicesScrollReveal";
import { ServiceSection, ServiceSectionProps } from "@/components/sections/services/ServiceSection";
import {
  IconVRHeadset,
  IconMobileAR,
  IconMixedReality,
  IconCrossPlatform,
  Icon3DExplorers,
  IconDigitalReplicas,
  IconComponentInspection,
  IconWebGLApps,
  Icon3DEnvironments,
  IconMaterialsLighting,
  IconOptimization,
  IconCinematics,
  IconScenarioTraining,
  IconWalkthroughs,
  IconGuidedLearning,
  IconMultiPlatform,
  IconStageDiscovery,
  IconStageArchitecture,
  IconStageProduction,
  IconStageEngineering,
  IconStageValidation,
} from "@/components/sections/services/ServiceIcons";
import styles from "@/components/sections/services/Services.module.css";

export const metadata: Metadata = {
  title: "Immersive Technology Services | XR, 3D & Simulation | AFAQO",
  description:
    "Explore AFAQO's XR development, interactive 3D, digital environment visualization, real-time development and immersive training capabilities.",
};

const servicesData: ServiceSectionProps[] = [
  {
    number: "01",
    detailHref: "/services/extended-reality",
    category: "Spatial Computing",
    title: "Extended Reality (XR)",
    description:
      "We design VR, AR and mixed-reality experiences that help people interact with spaces, products and information in direct, purposeful ways. The experience starts with the user's task—not the headset.",
    tags: ["AR", "VR", "MR", "Spatial Experiences", "Interactive Physics"],
    image: "/images/hero/afaqo-hero-desktop.jpg",
    imageAlt: "Extended Reality (XR) immersive spatial computing - AFAQO",
    badge: "Spatial / XR",
    cards: [
      {
        number: "01",
        icon: <IconVRHeadset />,
        title: "Virtual Reality (VR) environments for exploration and guided training",
      },
      {
        number: "02",
        icon: <IconMobileAR />,
        title: "Augmented Reality (AR) spatial applications for mobile and wearable devices",
      },
      {
        number: "03",
        icon: <IconMixedReality />,
        title: "Mixed Reality (MR) spatial interfaces and experiential installations",
      },
      {
        number: "04",
        icon: <IconCrossPlatform />,
        title: "Cross-platform spatial interactions designed for target hardware",
      },
    ],
  },
  {
    number: "02",
    detailHref: "/services/interactive-3d",
    category: "Real-Time Systems",
    title: "Interactive 3D & Digital Environments",
    description:
      "We create detailed 3D representations of facilities, equipment, and complex systems for visualization, orientation, and interactive exploration. Depending on project scope, these may form part of a broader digital-twin initiative when the necessary data and systems are available. (A visualization model is a digital replica, distinct from a live operational digital twin.)",
    tags: ["Digital Environments", "Interactive 3D", "Robotics", "Simulation"],
    image: "/images/projects/taf35-robot/taf35-robot.png",
    imageAlt: "Interactive 3D and digital environments - AFAQO",
    badge: "Interactive Systems",
    cards: [
      {
        number: "01",
        icon: <Icon3DExplorers />,
        title: "Interactive 3D facility and equipment visual explorers",
      },
      {
        number: "02",
        icon: <IconDigitalReplicas />,
        title: "Navigable digital replicas for spatial understanding and stakeholder communication",
      },
      {
        number: "03",
        icon: <IconComponentInspection />,
        title: "Interactive component inspection and exploded mechanical assemblies",
      },
      {
        number: "04",
        icon: <IconWebGLApps />,
        title: "Custom WebGL and native runtime interactive applications",
      },
    ],
  },
  {
    number: "03",
    detailHref: "/services/real-time-3d-production",
    category: "High-Fidelity CG",
    title: "Real-Time 3D Production",
    titleAccent: "Production",
    description:
      "Our 3D production workflow balances visual fidelity, scene organization, and runtime performance together—from modeling and materials to real-time optimization and engine integration.",
    tags: ["3D Environments", "Materials & Lighting", "Optimization", "Cinematics"],
    image: "/images/projects/remal-park/remal-park.jpg",
    imageAlt: "Real-time 3D production and high-fidelity CG - AFAQO",
    badge: "Visual Production",
    cards: [
      {
        number: "01",
        icon: <Icon3DEnvironments />,
        title: "3D Environments",
        description: "Architectural and industrial 3D environment modeling.",
      },
      {
        number: "02",
        icon: <IconMaterialsLighting />,
        title: "Materials & Lighting",
        description: "Physically-based (PBR) materials, shaders, and authentic lighting.",
      },
      {
        number: "03",
        icon: <IconOptimization />,
        title: "Optimization",
        description: "Optimization for strict polygon, draw-call, and texture budgets.",
      },
      {
        number: "04",
        icon: <IconCinematics />,
        title: "Cinematics",
        description: "High-resolution cinematic visual sequences and media assets.",
      },
    ],
  },
  {
    number: "04",
    detailHref: "/services/simulation-immersive-training",
    category: "Simulation & Training",
    title: "Simulation & Immersive Training",
    titleAccent: "Immersive Training",
    description:
      "We develop simulated experiences that let users explore environments, interact with equipment, and follow scenario-driven learning flows. The design is shaped around the learning objective, system constraints, and intended platform.",
    tags: ["Simulation", "Scenario Training", "Process Exploration", "Ergonomics"],
    image: "/images/projects/industrial-training/oil and gas/industrial-training.png",
    imageAlt: "Simulation and immersive training systems - AFAQO",
    badge: "Training & Simulation",
    cards: [
      {
        number: "01",
        icon: <IconScenarioTraining />,
        title: "Scenario-Based Training",
        description: "Scenario-based training sequences for equipment familiarization.",
      },
      {
        number: "02",
        icon: <IconWalkthroughs />,
        title: "Interactive Walkthroughs",
        description: "Interactive operational walkthroughs and process exploration.",
      },
      {
        number: "03",
        icon: <IconGuidedLearning />,
        title: "Guided Learning Flows",
        description: "Guided learning flows with contextual instructional overlays.",
      },
      {
        number: "04",
        icon: <IconMultiPlatform />,
        title: "Multi-Platform Deployment",
        description: "Hardware deployment across VR headsets, enterprise workstations, and web.",
      },
    ],
  },
];

interface ProcessStage {
  index: string;
  name: string;
  desc: string;
  icon: React.ReactNode;
}

const processStages: ProcessStage[] = [
  {
    index: "01",
    name: "Discovery & Strategy",
    desc: "Aligning creative direction, technical feasibility, and measurable business objectives.",
    icon: <IconStageDiscovery />,
  },
  {
    index: "02",
    name: "Experience Architecture",
    desc: "Designing interaction paradigms, spatial ergonomics, and technical system specifications.",
    icon: <IconStageArchitecture />,
  },
  {
    index: "03",
    name: "3D & Spatial Asset Production",
    desc: "Sculpting, modeling, texturing, and optimizing assets for target runtime performance.",
    icon: <IconStageProduction />,
  },
  {
    index: "04",
    name: "Real-Time Engineering",
    desc: "Developing game-engine logic, UI systems, hardware integration, and telemetry pipelines.",
    icon: <IconStageEngineering />,
  },
  {
    index: "05",
    name: "Validation & Deployment",
    desc: "Rigorous testing on target hardware, on-site commissioning, and lifecycle maintenance.",
    icon: <IconStageValidation />,
  },
];

export default function ServicesPage() {
  const relevantProjects = getAllCaseStudies().slice(0, 3);

  return (
    <div className={styles.servicesPage}>
      {/* S00: Route Header (Unified Home Navigation) */}
      <Header />

      <main id="main-content" tabIndex={-1} className={styles.mainContent}>
        <ServicesScrollReveal>
          {/* S01: Full-Width Cinematic Background Hero */}
          <section
            className={styles.heroSection}
            aria-labelledby="services-heading"
          >
            {/* Edge-to-edge background image container */}
            <div data-reveal-hero-bg className={styles.heroMediaWrapper}>
              <ResponsiveImage
                src="/images/services/afaqo-services-hero.webp"
                alt="AFAQO immersive technology, spatial computing and industrial digital twins"
                fill
                priority
                sizes="100vw"
                className={styles.heroBackgroundImage}
              />
              {/* Restrained white legibility gradient overlay */}
              <div className={styles.heroGradientOverlay} aria-hidden="true" />
            </div>

            {/* Left Text Container aligned with global container grid */}
            <div className={styles.heroContentContainer}>
              <div className={styles.heroTextWrapper}>
                <span data-reveal-hero-item className={styles.eyebrow}>
                  OUR CAPABILITIES
                </span>
                <h1
                  id="services-heading"
                  data-reveal-hero-item
                  className={styles.heroTitle}
                >
                  Ideas become{" "}
                  <span className={styles.accentWord}>experiences.</span>
                </h1>
                <p data-reveal-hero-item className={styles.heroIntro}>
                  From strategy and design to 3D production and real-time
                  development, we create interactive digital experiences built
                  around practical needs.
                </p>
              </div>
            </div>
          </section>

          {/* S02 - S05: Four Unified Service Sections */}
          {servicesData.map((service, index) => (
            <ServiceSection
              key={service.number}
              isFirst={index === 0}
              detailHref={service.detailHref}
              number={service.number}
              category={service.category}
              title={service.title}
              titleAccent={service.titleAccent}
              description={service.description}
              tags={service.tags}
              image={service.image}
              imageAlt={service.imageAlt}
              badge={service.badge}
              cards={service.cards}
            />
          ))}

          {/* S06: Deep Navy Technical Band (System Architecture: One partner. End to end.) */}
          <section data-reveal-endtoend className={styles.endToEndSection} aria-labelledby="end-to-end-heading">
            <div className={styles.endToEndContainer}>
              <div data-reveal-endtoend-header className={styles.endToEndHeader}>
                <div className={styles.endToEndEyebrowRow}>
                  <span className={styles.accentLine} aria-hidden="true" />
                  <span className={styles.endToEndEyebrow}>System Architecture</span>
                </div>
                <h2 id="end-to-end-heading" className={styles.endToEndTitle}>
                  One partner. End to end.
                </h2>
                <p className={styles.endToEndSubhead}>
                  From the first idea to the final deployed experience, we engineer
                  continuous technical coherence across every project milestone.
                </p>
              </div>

              <ol data-reveal-stages-grid className={styles.stagesGrid}>
                {processStages.map((stage) => (
                  <li key={stage.index} data-reveal-stage-card className={styles.stageCard}>
                    <div className={styles.stageIndex} aria-hidden="true">{stage.index}</div>
                    <div className={styles.stageIconContainer} aria-hidden="true">
                      {stage.icon}
                    </div>
                    <h3 className={styles.stageName}>{stage.name}</h3>
                    <p className={styles.stageDesc}>{stage.desc}</p>
                  </li>
                ))}
              </ol>
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
                    <ResponsiveImage
                      src={project.image}
                      alt={project.imageAlt || project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={styles.projectImage}
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
      </main>

      {/* Global Unified Footer */}
      <Footer />
    </div>
  );
}
