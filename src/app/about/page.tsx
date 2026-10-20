import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import styles from "@/components/sections/about/About.module.css";

export const metadata: Metadata = {
  title: "About AFAQO | Creative Technology & Immersive Experiences",
  description:
    "AFAQO is a creative technology company based in Cairo, working globally. We turn complex ideas into immersive experiences across XR, interactive 3D and simulation.",
};

const collaborationPrinciples = [
  {
    number: "01",
    title: "Purpose before platform",
    desc: "We choose tools, engines and delivery formats to fit the user, the environment and the task—never to showcase hardware for its own sake.",
  },
  {
    number: "02",
    title: "Clarity over complexity",
    desc: "An immersive experience should make complicated systems easier to understand, not add another layer of confusion.",
  },
  {
    number: "03",
    title: "Detail with discipline",
    desc: "From scale accuracy and physically based materials to stable frame rates, craft and performance must reinforce each other.",
  },
  {
    number: "04",
    title: "Collaboration across disciplines",
    desc: "We work directly with domain experts—engineers, educators, curators and operators—to ensure every experience reflects operational truth.",
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
          AFAQO is a creative technology company. We turn complex ideas, systems and
          environments into immersive digital experiences that people can explore,
          understand and act on.
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
              We work at the intersection of spatial computing, real-time 3D, interactive media and simulation.
            </p>
            <p className={styles.bodyRegular}>
              Our focus is not on technology as a display piece, but on what an interactive experience makes possible: making a mechanical process visible before fabrication, allowing a team to rehearse high-risk procedures safely, or turning cultural heritage into an explorable environment.
            </p>
            <p className={styles.bodyRegular}>
              We collaborate with industrial operators, cultural institutions, educational organizations and forward-thinking enterprises across the Middle East, North Africa and internationally.
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
        <span className={styles.eyebrow}>HOW WE WORK</span>
        <h2 id="collab-heading" className={styles.sectionLabel}>
          Four principles that guide our work.
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
              Based in Cairo, Egypt, AFAQO delivers projects across the Gulf region, North
              Africa and internationally. We combine regional proximity with international
              production standards, collaborating closely with teams in Oman, Saudi Arabia,
              the UAE and beyond.
            </p>

            {/* A08: SIMULXR Specialized Initiative Card */}
            <div className={styles.simulxrCard}>
              <span className={styles.simulxrTag}>Specialized Initiative</span>
              <h3 className={styles.simulxrTitle}>SIMULXR by AFAQO</h3>
              <p className={styles.simulxrDesc}>
                Our dedicated platform and initiative for industrial simulation, procedural
                safety training and explorable technical systems.
              </p>
              <Link href="/simulxr" className={styles.simulxrLink}>
                Explore SIMULXR →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* A09: Closing CTA */}
      <section className={styles.closingCtaSection} aria-labelledby="cta-heading">
        <div className={styles.ctaContainer}>
          <h2 id="cta-heading" className={styles.ctaTitle}>
            Let&apos;s understand your challenge.
          </h2>
          <p className={styles.ctaSubtitle}>
            Tell us what your team needs to explain, train, visualize or build. We will help
            identify the right approach.
          </p>
          <Link href="/contact" className={styles.ctaButton}>
            Start a Project <span>→</span>
          </Link>
        </div>
      </section>

      {/* Global Unified Footer */}
      <Footer />
    </div>
  );
}
