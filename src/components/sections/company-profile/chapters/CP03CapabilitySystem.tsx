"use client";

import { useState } from "react";
import Image from "next/image";
import { companyProfileData } from "../companyProfileContent";
import styles from "../CompanyProfileExperience.module.css";

export function CP03CapabilitySystem() {
  const data = companyProfileData.cp03;
  const [activeIndustryId, setActiveIndustryId] = useState(data.industries[0].id);

  const currentIndustry = data.industries.find((i) => i.id === activeIndustryId) || data.industries[0];

  return (
    <section
      id="cp03"
      className={styles.capabilitySection}
      aria-label="Capability System"
      data-source-pages="6,7,8"
      data-chapter-id="cp03"
    >
      <div className={styles.container}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <span className={styles.eyebrow}>{data.eyebrow}</span>
          <span className={styles.sourceBadge}>SOURCE: PAGES 06–08</span>
        </div>

        <h2 className={styles.h2Title}>{data.title}</h2>
        <p className={styles.leadText}>{data.subtitle}</p>

        {/* Section 1: Five Industries Explorer (Page 6) */}
        <div style={{ marginTop: "3.5rem" }}>
          <div className={styles.industryTabs} role="tablist" aria-label="Target Industries">
            {data.industries.map((ind) => {
              const isActive = ind.id === activeIndustryId;
              return (
                <button
                  key={ind.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`industry-panel-${ind.id}`}
                  id={`industry-tab-${ind.id}`}
                  className={`${styles.industryTabBtn} ${isActive ? styles.industryTabBtnActive : ""}`}
                  onClick={() => setActiveIndustryId(ind.id)}
                >
                  <span style={{ fontFamily: "monospace", marginRight: "0.4rem", color: isActive ? "#ffffff" : "#00d1ff" }}>
                    {ind.number}
                  </span>
                  {ind.name}
                </button>
              );
            })}
          </div>

          <div
            id={`industry-panel-${currentIndustry.id}`}
            role="tabpanel"
            aria-labelledby={`industry-tab-${currentIndustry.id}`}
            className={styles.industryShowcase}
          >
            <div>
              <span className={styles.eyebrow} style={{ color: "#00d1ff" }}>
                INDUSTRY FOCUS — {currentIndustry.number}
              </span>
              <h3 style={{ fontFamily: "var(--font-manrope)", fontSize: "1.75rem", marginBottom: "1rem", color: "#ffffff" }}>
                {currentIndustry.name}
              </h3>
              <p className={styles.leadText} style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>
                {currentIndustry.scope}
              </p>
              <div style={{ padding: "1rem", background: "rgba(255, 255, 255, 0.03)", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#00d1ff", display: "block", marginBottom: "0.25rem" }}>
                  STRATEGIC OUTCOME
                </span>
                <p style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.8)", margin: 0 }}>
                  {currentIndustry.focus}
                </p>
              </div>
            </div>

            <div className={styles.editorialFrame}>
              <Image
                src={data.artwork.industries}
                alt="AFAQO multi-industry technology integration artwork"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Four Core Capabilities (Page 7) */}
        <div style={{ marginTop: "5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span className={styles.eyebrow} style={{ color: "#0866ff" }}>
                CORE ARCHITECTURE
              </span>
              <h3 className={styles.h2Title} style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
                Four Capabilities. One Connected Experience.
              </h3>
            </div>
            <span className={styles.sourceBadge}>PAGE 07</span>
          </div>

          <div className={styles.capabilitiesGrid}>
            {data.capabilities.map((cap) => (
              <div key={cap.number} className={styles.capCard}>
                <span className={styles.capNum}>{cap.number}</span>
                <h4 className={styles.capTitle}>{cap.name}</h4>
                <p className={styles.capTagline}>{cap.tagline}</p>
                <ul className={styles.capServicesList}>
                  {cap.services.map((srv) => (
                    <li key={srv} className={styles.capServiceItem}>
                      {srv}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Seven-Stage Delivery Pipeline (Page 8) */}
        <div className={styles.deliveryTrack}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span className={styles.eyebrow} style={{ color: "#00d1ff" }}>
                DELIVERY FRAMEWORK
              </span>
              <h3 className={styles.h2Title} style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", marginBottom: "0.5rem" }}>
                The Right Team for the Full Scope
              </h3>
              <p className={styles.bodyText}>
                End-to-end production governance from initial strategy through deployment and lifecycle support.
              </p>
            </div>
            <span className={styles.sourceBadge}>PAGE 08</span>
          </div>

          <div className={styles.deliveryList}>
            {data.deliveryPipeline.map((item) => (
              <div key={item.step} className={styles.deliveryStepCard}>
                <span className={styles.deliveryStepNum}>PHASE {item.step}</span>
                <h4 className={styles.deliveryStepPhase}>{item.phase}</h4>
                <p className={styles.deliveryStepDetail}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
