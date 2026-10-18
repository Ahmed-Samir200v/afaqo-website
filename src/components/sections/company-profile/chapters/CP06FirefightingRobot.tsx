"use client";

import { useState } from "react";
import Image from "next/image";
import { companyProfileData } from "../companyProfileContent";
import styles from "../CompanyProfileExperience.module.css";

export function CP06FirefightingRobot() {
  const data = companyProfileData.cp06;
  const [selectedOrtho, setSelectedOrtho] = useState(data.orthographicViews[0].id);

  const activeOrtho = data.orthographicViews.find((v) => v.id === selectedOrtho) || data.orthographicViews[0];

  return (
    <section
      id="cp06"
      className={styles.robotSection}
      aria-label="Firefighting Robot Training"
      data-source-pages="15,16,17,18,19,20"
      data-chapter-id="cp06"
    >
      <div className={styles.container}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <span className={styles.eyebrow}>{data.eyebrow}</span>
          <span className={styles.sourceBadge}>SOURCE: PAGES 15–20</span>
        </div>

        {/* Mandatory Provenance & Prior-Engagement Banner */}
        <div className={styles.provenanceBanner} role="note" aria-label="Project Provenance Disclosure">
          <span className={styles.provenanceBadgeText}>{data.provenanceBadge}</span>
          <p className={styles.provenanceNoticeText}>{data.provenanceNotice}</p>
        </div>

        <h2 className={styles.h2Title}>{data.title}</h2>
        <p className={styles.leadText}>{data.subtitle}</p>

        {/* Section 1: Robot Opener (Page 15) */}
        <div style={{ marginTop: "3rem" }}>
          <div className={styles.editorialFrame} style={{ aspectRatio: "21 / 9" }}>
            <Image
              src={data.artwork.opener}
              alt="TAF35 Firefighting Robot full 3D assembly and kinematics render"
              fill
              sizes="100vw"
            />
          </div>
        </div>

        {/* Section 2: Detailed 3D Production & Orthographic Views (Page 16) */}
        <div style={{ marginTop: "4.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span className={styles.eyebrow} style={{ color: "#00d1ff" }}>
                MECHANICAL RECONSTRUCTION
              </span>
              <h3 className={styles.h2Title} style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
                Detailed 3D Production & Kinematics
              </h3>
            </div>
            <span className={styles.sourceBadge}>PAGE 16</span>
          </div>

          {/* Interactive View Angle Selector */}
          <div className={styles.orthoSelector} role="group" aria-label="Orthographic Views">
            {data.orthographicViews.map((ortho) => {
              const isActive = ortho.id === selectedOrtho;
              return (
                <button
                  key={ortho.id}
                  type="button"
                  aria-pressed={isActive}
                  className={`${styles.orthoBtn} ${isActive ? styles.orthoBtnActive : ""}`}
                  onClick={() => setSelectedOrtho(ortho.id)}
                >
                  {ortho.label}
                </button>
              );
            })}
          </div>

          <div style={{ padding: "1rem 1.25rem", background: "rgba(255, 255, 255, 0.03)", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.08)", marginBottom: "1.5rem" }}>
            <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#00d1ff", display: "block", marginBottom: "0.25rem" }}>
              ACTIVE ASPECT: {activeOrtho.label.toUpperCase()}
            </span>
            <p style={{ fontSize: "0.88rem", color: "rgba(255, 255, 255, 0.8)", margin: 0 }}>
              {activeOrtho.desc}
            </p>
          </div>

          <div className={styles.editorialFrame}>
            <Image
              src={data.artwork.build}
              alt="Four orthographic technical views of the TAF35 firefighting robot"
              fill
              sizes="(min-width: 1024px) 80vw, 100vw"
            />
          </div>
        </div>

        {/* Section 3: Training Steps (Pages 17, 18, 19) */}
        <div style={{ marginTop: "4.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span className={styles.eyebrow} style={{ color: "#0866ff" }}>
                SIMULATION PHASES
              </span>
              <h3 className={styles.h2Title} style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
                From Machine to Emergency Response
              </h3>
            </div>
            <span className={styles.sourceBadge}>PAGES 17–19</span>
          </div>

          <div className={styles.robotStepsList}>
            {data.steps.map((step) => (
              <div key={step.number} className={styles.stageCard}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className={styles.stageStep}>STEP {step.number}</span>
                  <span style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "rgba(255, 255, 255, 0.4)" }}>
                    PAGE {step.pageRef}
                  </span>
                </div>
                <h4 className={styles.stageTitle}>{step.title}</h4>
                <p className={styles.stageDesc}>{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Sequential Stills Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginTop: "2rem" }}>
            <div className={styles.editorialFrame}>
              <Image src={data.artwork.environment} alt="Factory environment scene" fill sizes="50vw" />
            </div>
            <div className={styles.editorialFrame}>
              <Image src={data.artwork.vrInterface} alt="VR HUD and controller interface" fill sizes="50vw" />
            </div>
            <div className={styles.editorialFrame}>
              <Image src={data.artwork.emergency} alt="Emergency response fire suppression drill" fill sizes="50vw" />
            </div>
          </div>
        </div>

        {/* Section 4: Multidisciplinary Team Breakdown (Page 20) */}
        <div style={{ marginTop: "5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span className={styles.eyebrow} style={{ color: "#00d1ff" }}>
                MULTIDISCIPLINARY COLLABORATION
              </span>
              <h3 className={styles.h2Title} style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", marginBottom: "0.5rem" }}>
                {data.multidisciplinaryTeam.headline}
              </h3>
              <p className={styles.bodyText}>{data.multidisciplinaryTeam.lead}</p>
            </div>
            <span className={styles.sourceBadge}>PAGE 20</span>
          </div>

          <div className={styles.editorialFrame} style={{ marginTop: "2rem" }}>
            <Image
              src={data.artwork.outcome}
              alt="Connected training experience summary and 6-person multidisciplinary delivery breakdown"
              fill
              sizes="(min-width: 1024px) 80vw, 100vw"
            />
          </div>

          <div className={styles.teamRolesGrid}>
            {data.multidisciplinaryTeam.roles.map((r) => (
              <div key={r.role} className={styles.teamRoleCard}>
                <h4 className={styles.roleTitle}>{r.role}</h4>
                <p className={styles.roleContribution}>{r.contribution}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
