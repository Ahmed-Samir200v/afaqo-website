import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import styles from "@/components/sections/industries/Industries.module.css";

export const metadata: Metadata = {
  title: "Industries We Serve | Industrial XR & Immersive Experiences | AFAQO",
  description:
    "See how AFAQO applies immersive technology and interactive 3D across industry, energy, education, culture, architecture and enterprise.",
};

const sectors = [
  {
    id: "manufacturing",
    number: "01",
    category: "Manufacturing & Robotics",
    title: "Industry & Manufacturing",
    challenge:
      "Modern industrial facilities and automated manufacturing equipment bring together complex procedures and equipment relationships that are difficult to explain through conventional documentation alone.",
    solution:
      "We build interactive 3D product simulations and digital environments that make equipment form, mechanical hierarchy, and operational workflows accessible for inspection and orientation.",
    applications: [
      {
        title: "Digital Environments & Explorers",
        desc: "Interactive 3D models mirroring equipment form and spatial layouts.",
      },
      {
        title: "Virtual Exploration",
        desc: "Interactive inspection of robotics workflows and subsystem mechanics.",
      },
      {
        title: "Maintenance Simulation",
        desc: "Guided step-by-step diagnostic and inspection procedures in interactive 3D.",
      },
      {
        title: "Interactive Product Explorers",
        desc: "Exploded engineering views and operational demonstrations for stakeholders.",
      },
    ],
    caseStudyHref: "/work/taf35-robot-simulation",
    caseStudyTitle: "TAF35 Robot Simulation",
    image: "/images/industries/manufacturing.webp",
    badge: "Industrial Equipment",
    reversed: false,
  },
  {
    id: "oil-gas",
    number: "02",
    category: "Energy & Infrastructure",
    title: "Oil & Gas",
    challenge:
      "Field personnel operate around specialized equipment and spatial constraints where physical access for familiarization and practice is limited or hazardous.",
    solution:
      "We deliver high-fidelity VR experiences and spatial training simulations that replicate plants, valves, and procedural sequences in a controlled, risk-free digital setting.",
    applications: [
      {
        title: "Scenario-Based Training",
        desc: "Immersive field procedure simulations for safety and orientation.",
      },
      {
        title: "Procedure Walkthroughs",
        desc: "Simulated scenario drills and protocol familiarization in controlled VR environments.",
      },
      {
        title: "Facility Visualization",
        desc: "Navigable 3D models for plant layout familiarization and planning.",
      },
      {
        title: "Procedural Learning Flows",
        desc: "Guided operational sequences tracking step accuracy and safety compliance.",
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
      "Complex STEM subjects and specialized laboratory equipment can be challenging to convey effectively through passive visual media alone.",
    solution:
      "Through SIMULXR and interactive 3D, we create virtual laboratories and interactive curricula where learners explore systems, interact with equipment, and discover concepts safely.",
    applications: [
      {
        title: "Virtual Science Laboratories",
        desc: "Interactive science lab environments in WebGL and VR.",
      },
      {
        title: "Experiential Curriculum",
        desc: "Spatial lessons allowing students to interact directly with microscopic or planetary scale.",
      },
      {
        title: "Simulated Instrumentation",
        desc: "Hands-on experience with equipment concepts without physical risk.",
      },
      {
        title: "Interactive Verification",
        desc: "Interactive exploration modules reinforcing practical understanding.",
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
      "Cultural landmarks, architectural sites, and museum institutions seek to make spatial environments and cultural narratives accessible beyond physical access constraints.",
    solution:
      "We construct detailed 3D environmental reconstructions and interactive spatial visitor experiences that convey architectural scale and atmospheric realism.",
    applications: [
      {
        title: "Site Visual Reconstructions",
        desc: "Archival-grade digital representations of historical sites and landscapes.",
      },
      {
        title: "Interactive Visitor Experiences",
        desc: "Engaging museum and exhibition visual environments.",
      },
      {
        title: "Virtual Exploration Journeys",
        desc: "Remote interactive exploration for global audiences and educational initiatives.",
      },
      {
        title: "Cultural Digital Assets",
        desc: "Optimized 3D geometry and environments prepared for spatial presentation.",
      },
    ],
    caseStudyHref: "/work/remal-park",
    caseStudyTitle: "Remal Park Experience",
    image: "/images/industries/culture-heritage.webp",
    badge: "Cultural Visualization",
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
          Different sectors face different questions. We apply experience design,
          interactive 3D and immersive technology where they can make complex information
          easier to explore and communicate.
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
          <span className={styles.ctaEyebrow}>Start a Conversation</span>
          <h2 id="cta-heading" className={styles.ctaTitle}>
            Different sectors. A shared need for clarity.
          </h2>
          <p className={styles.ctaSubtitle}>
            If your challenge is difficult to explain, visualize or experience,
            we can help define an appropriate interactive approach.
          </p>
          <Link href="/contact" className={styles.ctaButton}>
            Discuss Your Challenge <span>↗</span>
          </Link>
        </div>
      </section>

      {/* Global Unified Footer */}
      <Footer />
    </div>
  );
}
