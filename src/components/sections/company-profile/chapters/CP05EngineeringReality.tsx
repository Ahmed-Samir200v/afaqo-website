"use client";

import Image from "next/image";
import { companyProfileData } from "../companyProfileContent";
import styles from "../CompanyProfileExperience.module.css";

export function CP05EngineeringReality() {
  const data = companyProfileData.cp05;

  return (
    <section
      id="cp05"
      className={styles.digitalRealitySection}
      aria-label="Engineering to Digital Reality"
      data-source-pages="11,12,13,14"
      data-chapter-id="cp05"
    >
      <div className={styles.container}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <span className={styles.eyebrow}>{data.eyebrow}</span>
          <span className={styles.sourceBadge}>SOURCE: PAGES 11–14</span>
        </div>

        <h2 className={styles.h2Title}>{data.title}</h2>
        <p className={styles.leadText}>{data.subtitle}</p>

        {/* Section 1: Facility Opener & Case Introduction (Page 11) */}
        <div style={{ marginTop: "3rem" }}>
          <div className={styles.editorialFrame} style={{ aspectRatio: "21 / 9" }}>
            <Image
              src={data.artwork.opener}
              alt="Industrial digital twin aerial facility reconstruction"
              fill
              sizes="100vw"
              loading="lazy"
            />
          </div>
        </div>

        {/* Section 2: Four-Stage Transformation Pipeline (Page 12) */}
        <div style={{ marginTop: "4.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span className={styles.eyebrow} style={{ color: "#00d1ff" }}>
                PIPELINE ARCHITECTURE
              </span>
              <h3 className={styles.h2Title} style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
                From References to Real-Time World
              </h3>
            </div>
            <span className={styles.sourceBadge}>PAGE 12</span>
          </div>

          <div className={styles.stagesGrid}>
            {data.stages.map((stage) => (
              <div key={stage.step} className={styles.stageCard}>
                <span className={styles.stageStep}>STEP {stage.step}</span>
                <h4 className={styles.stageTitle}>{stage.title}</h4>
                <p className={styles.stageDesc}>{stage.desc}</p>
              </div>
            ))}
          </div>

          <div className={styles.editorialFrame} style={{ marginTop: "2rem" }}>
            <Image
              src={data.artwork.process}
              alt="Four-stage engineering reference to digital facility progression"
              fill
              sizes="(min-width: 1024px) 80vw, 100vw"
              loading="lazy"
            />
          </div>
        </div>

        {/* Section 3: Interactive Training Outcomes (Page 13) */}
        <div style={{ marginTop: "5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span className={styles.eyebrow} style={{ color: "#0866ff" }}>
                OPERATIONAL VALUE
              </span>
              <h3 className={styles.h2Title} style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
                From Digital Facility to Interactive Training
              </h3>
              <p className={styles.bodyText}>
                Enabling operational workforce familiarization, procedural adherence, and emergency drill repetition.
              </p>
            </div>
            <span className={styles.sourceBadge}>PAGE 13</span>
          </div>

          <div className={styles.trainingOutcomesGrid}>
            {data.trainingOutcomes.map((item) => (
              <div key={item.id} className={styles.outcomeCard}>
                <span className={styles.outcomeNum}>{item.number}</span>
                <h4 className={styles.outcomeLabel}>{item.label}</h4>
                <p className={styles.outcomeDetail}>{item.detail}</p>
              </div>
            ))}
          </div>

          <div className={styles.editorialFrame} style={{ marginTop: "2rem" }}>
            <Image
              src={data.artwork.training}
              alt="Interactive training application showing valve operations and procedural simulation"
              fill
              sizes="(min-width: 1024px) 80vw, 100vw"
              loading="lazy"
            />
          </div>
        </div>

        {/* Section 4: Production Craft (Page 14) */}
        <div className={styles.dccCompareContainer}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span className={styles.eyebrow} style={{ color: "#00d1ff" }}>
                TECHNICAL RIGOR
              </span>
              <h3 className={styles.h2Title} style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", marginBottom: "0.5rem" }}>
                {data.productionCraft.headline}
              </h3>
            </div>
            <span className={styles.sourceBadge}>PAGE 14</span>
          </div>

          <div className={styles.editorialFrame} style={{ marginTop: "1.5rem" }}>
            <Image
              src={data.artwork.production}
              alt="DCC wireframe topology alongside final real-time shaded render"
              fill
              sizes="(min-width: 1024px) 80vw, 100vw"
              loading="lazy"
            />
          </div>

          <div className={styles.dccCompareGrid}>
            <div className={styles.dccCard}>
              <h4 className={styles.dccCardTitle}>{data.productionCraft.dccLabel}</h4>
              <p className={styles.bodyText}>{data.productionCraft.dccDesc}</p>
            </div>
            <div className={styles.dccCard}>
              <h4 className={styles.dccCardTitle}>{data.productionCraft.realtimeLabel}</h4>
              <p className={styles.bodyText}>{data.productionCraft.realtimeDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
