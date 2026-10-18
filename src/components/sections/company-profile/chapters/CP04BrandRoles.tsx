"use client";

import Image from "next/image";
import Link from "next/link";
import { companyProfileData } from "../companyProfileContent";
import styles from "../CompanyProfileExperience.module.css";

export function CP04BrandRoles() {
  const data = companyProfileData.cp04;

  return (
    <section
      id="cp04"
      className={styles.brandRolesSection}
      aria-label="Brand Roles and Transition"
      data-source-pages="9,10"
      data-chapter-id="cp04"
    >
      <div className={styles.container}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <span className={styles.eyebrow}>{data.eyebrow}</span>
          <span className={styles.sourceBadge}>SOURCE: PAGES 09–10</span>
        </div>

        <h2 className={styles.h2Title}>{data.title}</h2>
        <p className={styles.leadText}>{data.subtitle}</p>

        {/* Section 1: Two Distinct Brand Focus Cards (Page 9) */}
        <div className={styles.rolesGrid}>
          {data.roles.map((r) => (
            <div key={r.brand} className={styles.roleCard}>
              <div>
                <span className={styles.eyebrow} style={{ color: r.brand === "AFAQO" ? "#00d1ff" : "#0866ff" }}>
                  {r.eyebrow}
                </span>
                <h3 className={styles.roleBrand}>{r.brand}</h3>
                <h4 style={{ fontFamily: "var(--font-manrope)", fontSize: "1.2rem", fontWeight: 500, color: "#ffffff", marginTop: "0.5rem" }}>
                  {r.lead}
                </h4>
                <p className={styles.bodyText} style={{ marginTop: "0.75rem" }}>
                  {r.description}
                </p>
              </div>

              <div>
                <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.45)", letterSpacing: "0.08em" }}>
                  CORE DELIVERABLES
                </span>
                <ul className={styles.roleDeliverables}>
                  {r.deliverables.map((d) => (
                    <li key={d} className={styles.roleDeliverableItem}>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Source Governance Clarification Note (Page 9 EIDOSIA/AFAQO Mismatch) */}
        <div className={styles.clarificationBox}>
          <span className={styles.clarificationLabel}>{data.clarificationNote.label}</span>
          <p className={styles.clarificationText}>{data.clarificationNote.text}</p>
        </div>

        {/* Section 2: Cinematic Transition Montage (Page 10) */}
        <div className={styles.transitionMontage}>
          <Image
            src={data.transition.artwork}
            alt="Cinematic montage of industrial, architectural, and robotics projects"
            fill
            sizes="100vw"
            loading="lazy"
          />
          <div className={styles.transitionOverlay}>
            <span className={styles.eyebrow} style={{ color: "#00d1ff", marginBottom: "0.5rem" }}>
              CHAPTER TRANSITION
            </span>
            <h3 style={{ fontFamily: "var(--font-manrope)", fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)", fontWeight: 500, color: "#ffffff", marginBottom: "0.5rem" }}>
              {data.transition.headline}
            </h3>
            <p className={styles.leadText} style={{ marginBottom: "1.5rem" }}>
              {data.transition.lead}
            </p>
            <div>
              <Link href="#cp05" className={styles.btnPrimary}>
                <span>{data.transition.actionPrompt}</span>
                <span aria-hidden="true">↓</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
