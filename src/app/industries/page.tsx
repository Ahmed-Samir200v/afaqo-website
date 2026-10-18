import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import styles from "@/components/sections/industries/Industries.module.css";

export const metadata: Metadata = {
  title: "Industries — Immersive Solutions Across Sectors | AFAQO",
  description:
    "Explore how AFAQO applies immersive technology, digital twins, and real-time 3D simulation across Industry & Manufacturing, Oil & Gas, Education, and Culture & Heritage.",
};

const sectors = [
  {
    id: "manufacturing",
    number: "01",
    category: "Manufacturing & Robotics",
    title: "Industry & Manufacturing",
    challenge:
      "Modern industrial facilities and automated manufacturing lines generate complex telemetry that is difficult to visualize, monitor, and train staff on safely.",
    solution:
      "We build interactive digital twins and real-time 3D product simulations that turn complex telemetry into spatial intelligence, enabling intuitive remote operations and zero-downtime training.",
    applications: [
      {
        title: "Digital Twins & Telemetry",
        desc: "Live spatial models mirroring real physical machinery and automation lines.",
      },
      {
        title: "Virtual Commissioning",
        desc: "Interactive validation of robotics workflows before factory floor deployment.",
      },
      {
        title: "Maintenance Simulation",
        desc: "Guided step-by-step diagnostic procedures in interactive 3D.",
      },
      {
        title: "Interactive Product Explorers",
        desc: "Exploded engineering views and operational demonstrations for stakeholders.",
      },
    ],
    caseStudyHref: "/work/taf35-robot-simulation",
    caseStudyTitle: "TAF35 Robot Simulation",
    image: "/images/industries/manufacturing.webp",
    badge: "Industrial Automation",
    reversed: false,
  },
  {
    id: "oil-gas",
    number: "02",
    category: "Energy & Infrastructure",
    title: "Oil & Gas",
    challenge:
      "Field personnel operate in hazardous environments with critical safety protocols, where on-site mistakes carry extreme operational risk and downtime costs.",
    solution:
      "We deliver high-fidelity VR simulations and spatial training systems that replicate complex plants, valves, and emergency procedures without operational interruption or safety risks.",
    applications: [
      {
        title: "High-Risk VR Training",
        desc: "Immersive field procedure simulations for safety and emergency response.",
      },
      {
        title: "Hazardous Scenario Testing",
        desc: "Simulated emergency drills and protocol validation in controlled VR environments.",
      },
      {
        title: "Facility Visualization",
        desc: "Geospatial and structural plant visual models for planning and familiarization.",
      },
      {
        title: "Procedural Assessment",
        desc: "Scored technician evaluation with telemetry analytics tracking accuracy.",
      },
    ],
    caseStudyHref: "/work/industrial-training-experience",
    caseStudyTitle: "Industrial Training Experience",
    image: "/images/industries/oil-gas.webp",
    badge: "Operational Safety",
    reversed: true,
  },
  {
    id: "education",
    number: "03",
    category: "Learning & Research",
    title: "Education & Academic Labs",
    challenge:
      "Traditional classrooms struggle to convey abstract STEM concepts and cannot always provide safe or affordable physical access to advanced laboratory equipment.",
    solution:
      "Through SIMULXR and spatial computing, we create virtual laboratories and interactive curricula where students conduct real scientific experiments and explore complex phenomena safely.",
    applications: [
      {
        title: "Virtual Science Laboratories",
        desc: "Interactive chemistry, physics, and biology lab stations in WebGL and VR.",
      },
      {
        title: "Experiential Curriculum",
        desc: "Spatial lessons allowing students to interact directly with microscopic or planetary scale.",
      },
      {
        title: "Simulated Instrumentation",
        desc: "Hands-on experience with high-cost scientific machinery without capital barriers.",
      },
      {
        title: "Standardized Evaluation",
        desc: "Interactive quiz modules and experimental verification pipelines.",
      },
    ],
    caseStudyHref: "/simulxr",
    caseStudyTitle: "SIMULXR Platform",
    image: "/images/industries/education.webp",
    badge: "Virtual Labs",
    reversed: false,
  },
  {
    id: "culture-heritage",
    number: "04",
    category: "Culture, Tourism & Exhibits",
    title: "Culture & Heritage",
    challenge:
      "Historical landmarks, archaeological sites, and cultural institutions need to preserve delicate artifacts while making cultural narratives globally accessible.",
    solution:
      "We construct millimeter-precise 3D reconstructions, cinematic environments, and interactive spatial visitor exhibits that transport audiences through history with atmospheric realism.",
    applications: [
      {
        title: "Photorealistic Site Reconstructions",
        desc: "Archival-grade digital preservation of historical monuments and landscapes.",
      },
      {
        title: "Interactive Visitor Experiences",
        desc: "Multi-sensory museum installations and interactive spatial narratives.",
      },
      {
        title: "Virtual Tourism Journeys",
        desc: "Remote interactive exploration for global audiences and educational initiatives.",
      },
      {
        title: "Cultural Digital Archiving",
        desc: "Optimized 3D geometry and photogrammetric assets ready for exhibition.",
      },
    ],
    caseStudyHref: "/work/remal-park",
    caseStudyTitle: "Remal Park Experience",
    image: "/images/industries/culture-heritage.webp",
    badge: "Cultural Preservation",
    reversed: true,
  },
];

const framework = [
  {
    step: "01",
    name: "Sector Challenge",
    desc: "Identifying operational bottlenecks, safety liabilities, learning barriers, or cultural access constraints.",
  },
  {
    step: "02",
    name: "Spatial Ergonomics",
    desc: "Designing the interaction paradigm specifically tailored to user context, environment, and physical constraints.",
  },
  {
    step: "03",
    name: "Technical Engine",
    desc: "Engineering the real-time simulation, physics, data integration, and cross-platform runtime deployment.",
  },
  {
    step: "04",
    name: "Measurable Impact",
    desc: "Deploying high-reliability systems with validated user retention, procedural compliance, and operational insight.",
  },
];

export default function IndustriesPage() {
  return (
    <div className={styles.industriesPage}>
      {/* S00: Route Header (Unified Home Navigation) */}
      <Header />

      {/* I01: Hero & Industry Index */}
      <section className={styles.heroSection} aria-labelledby="industries-heading">
        <span className={styles.eyebrow}>03 / INDUSTRIES</span>
        <h1 id="industries-heading" className={styles.heroTitle}>
          Technology shaped around real-world challenges.
        </h1>
        <p className={styles.heroIntro}>
          Every sector has its own needs. We connect design, immersive technology,
          and interactive production to the challenges that matter.
        </p>

        {/* Anchor Jump Navigation */}
        <nav aria-label="Industries Jump Navigation">
          <ul className={styles.industryNavPills}>
            {sectors.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={styles.navPill}>
                  <span className={styles.navPillNum}>{s.number}</span>
                  <span>{s.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {/* I02 - I05: Sector Chapters */}
      {sectors.map((sector) => (
        <section
          key={sector.id}
          id={sector.id}
          className={styles.sectorSection}
          aria-labelledby={`sector-${sector.id}`}
        >
          <div
            className={
              sector.reversed
                ? styles.sectorContainerReversed
                : styles.sectorContainer
            }
          >
            {/* Sector Details */}
            <div>
              <div className={styles.sectorMeta}>
                <span className={styles.sectorNum}>{sector.number}</span>
                <span className={styles.sectorCategory}>{sector.category}</span>
              </div>
              <h2 id={`sector-${sector.id}`} className={styles.sectorTitle}>
                {sector.title}
              </h2>

              <div className={styles.challengeBox}>
                <span className={styles.challengeLabel}>The Challenge</span>
                <p className={styles.challengeText}>{sector.challenge}</p>
              </div>

              <p className={styles.solutionText}>{sector.solution}</p>

              <div className={styles.applicationsGrid}>
                {sector.applications.map((app, idx) => (
                  <div key={idx} className={styles.appItem}>
                    <h3 className={styles.appItemTitle}>{app.title}</h3>
                    <p className={styles.appItemDesc}>{app.desc}</p>
                  </div>
                ))}
              </div>

              <Link href={sector.caseStudyHref} className={styles.caseStudyLink}>
                Explore related project: {sector.caseStudyTitle} <span>↗</span>
              </Link>
            </div>

            {/* Sector Visual */}
            <div>
              <div className={styles.mediaFrame}>
                <span className={styles.mediaBadge}>{sector.badge}</span>
                <Image
                  src={sector.image}
                  alt={`${sector.title} - AFAQO Industry Solution`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={styles.mediaImage}
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* I06: Cross-Industry Approach (Dark Navy Section) */}
      <section className={styles.approachSection} aria-labelledby="framework-heading">
        <div className={styles.approachContainer}>
          <span className={styles.approachEyebrow}>Execution Framework</span>
          <h2 id="framework-heading" className={styles.approachTitle}>
            From sector challenges to operational outcomes.
          </h2>
          <p className={styles.approachIntro}>
            Regardless of industry domain, our cross-disciplinary methodology
            ensures every solution is grounded in authentic operational context.
          </p>

          <div className={styles.frameworkGrid}>
            {framework.map((step) => (
              <div key={step.step} className={styles.frameworkCard}>
                <span className={styles.frameworkStep}>{step.step}</span>
                <h3 className={styles.frameworkName}>{step.name}</h3>
                <p className={styles.frameworkDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* I08: Closing CTA */}
      <section className={styles.closingCtaSection} aria-labelledby="cta-heading">
        <div className={styles.ctaContainer}>
          <span className={styles.ctaEyebrow}>Sector Collaboration</span>
          <h2 id="cta-heading" className={styles.ctaTitle}>
            Discuss your industry challenge.
          </h2>
          <p className={styles.ctaSubtitle}>
            Let’s explore how spatial simulation, real-time digital twins, or immersive
            training can solve your organization’s unique operational requirements.
          </p>
          <Link href="/contact" className={styles.ctaButton}>
            Start a Conversation <span>↗</span>
          </Link>
        </div>
      </section>

      {/* Global Unified Footer */}
      <Footer />
    </div>
  );
}
