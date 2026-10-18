import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import styles from "@/components/sections/about/About.module.css";

export const metadata: Metadata = {
  title: "About — Creative Technology Company | AFAQO",
  description:
    "AFAQO brings creative thinking and technology together to transform complex ideas into purposeful digital experiences. Cairo — Working Globally.",
};

const collaborationPrinciples = [
  {
    number: "01",
    title: "Listen & Understand",
    desc: "We start by deeply analyzing your operational realities, user workflows, and technical constraints before proposing solutions.",
  },
  {
    number: "02",
    title: "Align & Architect",
    desc: "We map out clear spatial ergonomics, system architecture, and production milestones with complete transparency.",
  },
  {
    number: "03",
    title: "Prototype & Validate",
    desc: "We rapidly build functional interactive prototypes on target hardware, verifying assumptions early in real runtime conditions.",
  },
  {
    number: "04",
    title: "Deliver & Support",
    desc: "We engineer production-grade deployments, maintain zero-jitter framerates, and support continuous lifecycle operation.",
  },
];

const creativeCapabilities = [
  "Vision & Art Direction",
  "Spatial UX & Ergonomic Design",
  "Photorealistic 3D Environments",
  "Interactive Storytelling & Narratives",
  "Digital Twin User Interfaces",
];

const technicalCapabilities = [
  "Real-Time Game Engine Engineering (Unreal / Unity)",
  "Cross-Platform Spatial Computing (OpenXR / VisionOS)",
  "Hardware Sensor & Telemetry Integration",
  "High-Performance 3D Asset Optimization",
  "Cloud & Local Network Multi-User Synchronization",
];

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      {/* S00: Route Header (Unified Home Navigation) */}
      <Header />

      {/* A01: Manifesto Hero */}
      <section className={styles.heroSection} aria-labelledby="about-heading">
        <span className={styles.eyebrow}>01 / ABOUT AFAQO</span>
        <h1 id="about-heading" className={styles.heroTitle}>
          From a single point to <span className={styles.accentWord}>infinite horizons.</span>
        </h1>
        <p className={styles.heroIntro}>
          AFAQO brings creative thinking and technology together to transform complex
          ideas into purposeful, high-fidelity digital experiences.
        </p>
      </section>

      {/* A02: Who We Are */}
      <section className={styles.whoWeAreSection} aria-labelledby="who-heading">
        <div className={styles.whoContainer}>
          <h2 id="who-heading" className={styles.sectionLabel}>
            Who we are.
          </h2>
          <div className={styles.whoContent}>
            <p className={styles.bodyLarge}>
              We are a Creative Technology company operating at the intersection of
              spatial computing, real-time engineering, and experiential design.
            </p>
            <p className={styles.bodyRegular}>
              Rather than treating technology as a novelty, we believe every digital
              environment, simulation, and interactive system must serve a clear purpose:
              accelerating understanding, enabling safe training, or preserving heritage
              with emotional resonance.
            </p>
            <p className={styles.bodyRegular}>
              Our multidisciplinary team unifies creative directors, 3D artists, real-time
              developers, and systems engineers under a shared commitment to craft,
              precision, and technical rigor.
            </p>
          </div>
        </div>
      </section>

      {/* A03: Philosophy — Dot Flow */}
      <section className={styles.philosophySection} aria-labelledby="philosophy-heading">
        <div className={styles.philosophyContainer}>
          <div className={styles.brandSymbolFrame}>
            <Image
              src="/brand/afaqo-logo-dark.svg"
              alt="AFAQO Official Brand Identity Mark"
              width={480}
              height={110}
              className={styles.brandImage}
              priority
            />
          </div>
          <div className={styles.philosophyText}>
            <span className={styles.eyebrow}>Brand Interpretation</span>
            <h2 id="philosophy-heading" className={styles.philosophyTitle}>
              The Dot Flow: Connection & Movement.
            </h2>
            <p className={styles.bodyRegular}>
              In Arabic, the word <em>Afaq</em> (آفاق) means horizons — the vast boundaries
              where the earth meets the sky, representing limitless potential.
            </p>
            <p className={styles.bodyRegular}>
              Our visual identity embodies this transition: from an initial point of insight,
              ideas expand outward into immersive space. The dynamic triangular and dot
              elements reflect directional momentum, human connection, and continuous
              digital transformation.
            </p>
          </div>
        </div>
      </section>

      {/* A04: Creative × Technology (Navy Contrast Band) */}
      <section className={styles.disciplinesBand} aria-labelledby="disciplines-heading">
        <div className={styles.disciplinesContainer}>
          <span className={styles.bandEyebrow}>Our Duality</span>
          <h2 id="disciplines-heading" className={styles.bandTitle}>
            Creative vision meets technical precision.
          </h2>

          <div className={styles.dualGrid}>
            {/* Creative Column */}
            <div className={styles.dualCard}>
              <div className={styles.dualHeader}>
                <span className={styles.dualTag}>Discipline 01</span>
                <h3 className={styles.dualTitle}>Creative Craft</h3>
              </div>
              <p className={styles.dualDesc}>
                Sensory immersion requires emotional clarity, intuitive aesthetics, and
                rigorous user ergonomics.
              </p>
              <ul className={styles.dualList}>
                {creativeCapabilities.map((item, idx) => (
                  <li key={idx} className={styles.dualItem}>
                    <span className={styles.dualBullet}>—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Column */}
            <div className={styles.dualCard}>
              <div className={styles.dualHeader}>
                <span className={styles.dualTag}>Discipline 02</span>
                <h3 className={styles.dualTitle}>Technical Rigor</h3>
              </div>
              <p className={styles.dualDesc}>
                True presence depends on unbreakable performance: stable frame budgets,
                clean network architecture, and deterministic physics.
              </p>
              <ul className={styles.dualList}>
                {technicalCapabilities.map((item, idx) => (
                  <li key={idx} className={styles.dualItem}>
                    <span className={styles.dualBullet}>—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* A05: How We Collaborate */}
      <section className={styles.collabSection} aria-labelledby="collab-heading">
        <span className={styles.eyebrow}>Work Ethic</span>
        <h2 id="collab-heading" className={styles.sectionLabel}>
          How we collaborate.
        </h2>
        <div className={styles.principlesGrid}>
          {collaborationPrinciples.map((principle) => (
            <div key={principle.number} className={styles.principleCard}>
              <span className={styles.principleNumber}>{principle.number}</span>
              <h3 className={styles.principleTitle}>{principle.title}</h3>
              <p className={styles.principleDesc}>{principle.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* A07: Cairo — Working Globally & A08: SIMULXR */}
      <section className={styles.locationSection} aria-labelledby="location-heading">
        <div className={styles.locationContainer}>
          <div>
            <span className={styles.eyebrow}>Presence & Reach</span>
            <h2 id="location-heading" className={styles.locationHeadline}>
              CAIRO — WORKING GLOBALLY.
            </h2>
          </div>
          <div className={styles.locationBody}>
            <p className={styles.bodyRegular}>
              Headquartered in Cairo, we operate as a globally integrated creative technology
              partner. Our workflows connect international engineering standards with rich
              cultural perspectives across Europe, the Middle East, and beyond.
            </p>

            {/* A08: SIMULXR Specialized Initiative Card */}
            <div className={styles.simulxrCard}>
              <span className={styles.simulxrTag}>Specialized Initiative</span>
              <h3 className={styles.simulxrTitle}>SIMULXR by AFAQO</h3>
              <p className={styles.simulxrDesc}>
                Our dedicated educational and industrial simulation platform, transforming
                STEM education and procedural training into interactive virtual reality.
              </p>
              <Link href="/simulxr" className={styles.simulxrLink}>
                Learn more about SIMULXR ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* A09: Closing CTA */}
      <section className={styles.closingCtaSection} aria-labelledby="cta-heading">
        <div className={styles.ctaContainer}>
          <h2 id="cta-heading" className={styles.ctaTitle}>
            Let’s build something meaningful.
          </h2>
          <p className={styles.ctaSubtitle}>
            Whether you are exploring spatial computing for the first time or scaling an
            existing interactive system, we are ready to partner with you.
          </p>
          <Link href="/contact" className={styles.ctaButton}>
            Start a Project <span>↗</span>
          </Link>
        </div>
      </section>

      {/* Global Unified Footer */}
      <Footer />
    </div>
  );
}
