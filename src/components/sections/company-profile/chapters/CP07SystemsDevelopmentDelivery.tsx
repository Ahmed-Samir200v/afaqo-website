"use client";

import Image from "next/image";
import { companyProfileData } from "../companyProfileContent";
import styles from "../CompanyProfileExperience.module.css";

export function CP07SystemsDevelopmentDelivery() {
  const data = companyProfileData.cp07;
  const simulxr = data.simulxrDemo;
  const park = data.immersivePark;

  return (
    <section
      id="cp07"
      className={styles.systemsSection}
      aria-label="Systems in Development and Delivery"
      data-source-pages="21,22,23,24,25,26,27,28"
      data-chapter-id="cp07"
    >
      <div className={styles.container}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <span className={styles.eyebrow}>{data.eyebrow}</span>
          <span className={styles.sourceBadge}>SOURCE: PAGES 21–28</span>
        </div>

        {/* ==================================================================
            SUBCHAPTER 7A: SIMULXR OILY-WATER DEMO (IN DEVELOPMENT)
            ================================================================== */}
        <div style={{ marginTop: "1rem" }}>
          <div className={styles.statusPillDevelopment}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00d1ff", boxShadow: "0 0 8px #00d1ff" }} />
            <span>{simulxr.statusBadge}</span>
          </div>

          <h2 className={styles.h2Title}>{simulxr.title}</h2>
          <p className={styles.leadText} style={{ marginBottom: "0.5rem" }}>
            {simulxr.subtitle}
          </p>
          <p style={{ fontSize: "0.85rem", color: "rgba(0, 209, 255, 0.8)", fontFamily: "monospace" }}>
            NOTE: {simulxr.statusNote}
          </p>

          {/* Opener Frame (Page 21) */}
          <div className={styles.editorialFrame} style={{ aspectRatio: "21 / 9", marginTop: "2.5rem" }}>
            <Image
              src={simulxr.artwork.opener}
              alt="SIMULXR Oily-Water treatment plant simulation in development"
              fill
              sizes="100vw"
            />
          </div>

          {/* Operational Challenges (Page 22) */}
          <div style={{ marginTop: "4rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
              <h3 className={styles.h2Title} style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)" }}>
                {simulxr.challengeHeadline}
              </h3>
              <span className={styles.sourceBadge}>PAGE 22</span>
            </div>

            <div className={styles.challengesGrid}>
              {simulxr.challenges.map((c) => (
                <div key={c.num} className={styles.challengeCard}>
                  <span className={styles.challengeNum}>CHALLENGE {c.num}</span>
                  <h4 style={{ fontFamily: "var(--font-manrope)", fontSize: "1.1rem", color: "#ffffff", marginBottom: "0.5rem" }}>
                    {c.title}
                  </h4>
                  <p className={styles.bodyText} style={{ fontSize: "0.88rem" }}>
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className={styles.editorialFrame} style={{ marginTop: "2rem" }}>
              <Image
                src={simulxr.artwork.challenge}
                alt="Process complexity and operational awareness challenges"
                fill
                sizes="(min-width: 1024px) 80vw, 100vw"
              />
            </div>
          </div>

          {/* 6-Stage Process Sequence (Page 23) */}
          <div style={{ marginTop: "4.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <span className={styles.eyebrow} style={{ color: "#00d1ff" }}>
                  PROCESS MAPPING
                </span>
                <h3 className={styles.h2Title} style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)" }}>
                  Understand the Process. Explore the System.
                </h3>
              </div>
              <span className={styles.sourceBadge}>PAGE 23</span>
            </div>

            <div className={styles.processSequenceGrid}>
              {simulxr.processSequence.map((step) => (
                <div key={step.step} className={styles.processSequenceCard}>
                  <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#00d1ff", display: "block" }}>
                    STAGE {step.step}
                  </span>
                  <h4 style={{ fontFamily: "var(--font-manrope)", fontSize: "0.95rem", color: "#ffffff", marginBlock: "0.35rem" }}>
                    {step.name}
                  </h4>
                  <p style={{ fontSize: "0.78rem", color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.45, margin: 0 }}>
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className={styles.editorialFrame} style={{ marginTop: "2rem" }}>
              <Image
                src={simulxr.artwork.process}
                alt="Annotated overhead process diagram of oily-water treatment"
                fill
                sizes="(min-width: 1024px) 80vw, 100vw"
              />
            </div>
          </div>

          {/* Development Roadmap (Page 24) */}
          <div style={{ marginTop: "4.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <span className={styles.eyebrow} style={{ color: "#0866ff" }}>
                  DEVELOPMENT TIMELINE
                </span>
                <h3 className={styles.h2Title} style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)" }}>
                  From Industrial Environments to Immersive Learning
                </h3>
              </div>
              <span className={styles.sourceBadge}>PAGE 24</span>
            </div>

            <div className={styles.editorialFrame} style={{ marginTop: "1.5rem" }}>
              <Image
                src={simulxr.artwork.development}
                alt="Development stages showing planned validation and pilot evaluation"
                fill
                sizes="(min-width: 1024px) 80vw, 100vw"
              />
            </div>
          </div>
        </div>

        {/* ==================================================================
            HARD EDITORIAL BREAK
            ================================================================== */}
        <div className={styles.hardDivider} role="separator" />

        {/* ==================================================================
            SUBCHAPTER 7B: IMMERSIVE PARK EXPERIENCE (DELIVERED)
            ================================================================== */}
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(8, 102, 255, 0.15)", border: "1px solid rgba(8, 102, 255, 0.4)", padding: "0.35rem 0.8rem", borderRadius: "100px", color: "#ffffff", fontFamily: "monospace", fontSize: "0.75rem", marginBottom: "1.25rem" }}>
            <span>{park.statusBadge}</span>
          </div>

          <h2 className={styles.h2Title}>{park.title}</h2>
          <p className={styles.leadText} style={{ marginBottom: "0.5rem" }}>
            {park.subtitle}
          </p>
          <p className={styles.bodyText}>{park.lead}</p>

          {/* Sunset Hero Opener (Page 25) */}
          <div className={styles.editorialFrame} style={{ aspectRatio: "21 / 9", marginTop: "2.5rem" }}>
            <Image
              src={park.artwork.opener}
              alt="Immersive park sunset architectural visualization"
              fill
              sizes="100vw"
            />
          </div>

          {/* Destination Explorer (Page 26) */}
          <div style={{ marginTop: "4.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <span className={styles.eyebrow} style={{ color: "#00d1ff" }}>
                  DESTINATION HIGHLIGHTS
                </span>
                <h3 className={styles.h2Title} style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)" }}>
                  Explore the Experience
                </h3>
              </div>
              <span className={styles.sourceBadge}>PAGE 26</span>
            </div>

            <div className={styles.destinationsGrid}>
              {park.destinations.map((d) => (
                <div key={d.id} className={styles.destinationCard}>
                  <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#0866ff", display: "block", marginBottom: "0.4rem" }}>
                    ZONE {d.num}
                  </span>
                  <h4 style={{ fontFamily: "var(--font-manrope)", fontSize: "1.1rem", color: "#ffffff", marginBottom: "0.5rem" }}>
                    {d.name}
                  </h4>
                  <p className={styles.bodyText} style={{ fontSize: "0.85rem" }}>
                    {d.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className={styles.editorialFrame} style={{ marginTop: "2rem" }}>
              <Image
                src={park.artwork.destinations}
                alt="Masterplan and destination vignettes of the immersive park"
                fill
                sizes="(min-width: 1024px) 80vw, 100vw"
              />
            </div>
          </div>

          {/* CAD to Interactive Pipeline (Page 27) */}
          <div style={{ marginTop: "4.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <span className={styles.eyebrow} style={{ color: "#00d1ff" }}>
                  TECHNICAL PIPELINE
                </span>
                <h3 className={styles.h2Title} style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)" }}>
                  From CAD to Interactive Reality
                </h3>
              </div>
              <span className={styles.sourceBadge}>PAGE 27</span>
            </div>

            <div className={styles.editorialFrame} style={{ marginTop: "1.5rem" }}>
              <Image
                src={park.artwork.pipeline}
                alt="CAD drawings to 3D models to Unity game engine integration pipeline"
                fill
                sizes="(min-width: 1024px) 80vw, 100vw"
              />
            </div>
          </div>

          {/* Delivery & Performance Claims (Page 28) */}
          <div style={{ marginTop: "4.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <span className={styles.eyebrow} style={{ color: "#0866ff" }}>
                  DELIVERY CLAIMS & SPECIFICATIONS
                </span>
                <h3 className={styles.h2Title} style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)" }}>
                  Built. Tested. Delivered.
                </h3>
                <p className={styles.bodyText}>
                  Technical parameters and delivery commitments as specified in the supplied company profile.
                </p>
              </div>
              <span className={styles.sourceBadge}>PAGE 28</span>
            </div>

            <div className={styles.deliverySpecsTable}>
              {park.deliverySpecs.map((spec) => (
                <div key={spec.label} className={styles.specRow}>
                  <span className={styles.specLabel}>{spec.label}</span>
                  <span className={styles.specValue}>{spec.value}</span>
                  <span className={styles.specNote}>({spec.note})</span>
                </div>
              ))}
            </div>

            <div className={styles.editorialFrame} style={{ marginTop: "2rem" }}>
              <Image
                src={park.artwork.delivery}
                alt="Immersive park deployment hardware setup and delivery specifications"
                fill
                sizes="(min-width: 1024px) 80vw, 100vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
