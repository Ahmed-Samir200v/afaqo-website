"use client";

import Image from "next/image";
import Link from "next/link";
import { companyProfileData, PDF_DOWNLOAD_SPEC } from "../companyProfileContent";
import styles from "../CompanyProfileExperience.module.css";

export function CP01HorizonHero() {
  const data = companyProfileData.cp01;

  return (
    <section
      id="cp01"
      className={styles.heroSection}
      aria-label="Horizon and Arrival"
      data-source-pages="1,2"
      data-chapter-id="cp01"
    >
      {/* Visual Backdrop (Source Page 1 Particle Wave Artwork) */}
      <div className={styles.heroBackdrop} aria-hidden="true">
        <Image
          src={data.coverArtwork}
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroGradientOverlay} />
      </div>

      <div className={styles.container}>
        <div className={styles.heroContent}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <span className={styles.eyebrow}>{data.eyebrow}</span>
            <span className={styles.sourceBadge}>SOURCE: PAGES 01–02</span>
          </div>

          <h1 className={styles.h1Title}>
            Transforming Ideas <br />
            <span style={{ color: "#00d1ff" }}>Into Experiences.</span>
          </h1>

          <p className={styles.leadText}>
            {data.subtitle}. {data.positioning}
          </p>

          {/* Action CTAs: Immediate PDF Download + Explore Scroll */}
          <div className={styles.heroActions}>
            <a
              href={PDF_DOWNLOAD_SPEC.url}
              download={PDF_DOWNLOAD_SPEC.filename}
              className={styles.btnDownload}
              aria-label={PDF_DOWNLOAD_SPEC.accessibleLabel}
            >
              <svg
                className={styles.downloadIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download Company Profile (PDF)</span>
              <span className={styles.downloadSizeBadge}>{PDF_DOWNLOAD_SPEC.sizeLabel}</span>
            </a>

            <Link href="#cp02" className={styles.btnSecondary}>
              <span>Explore Profile</span>
              <span aria-hidden="true">↓</span>
            </Link>
          </div>

          {/* Taxonomy Metadata Strip */}
          <div className={styles.heroTaxonomy}>
            {data.taxonomy.map((tag, idx) => (
              <span key={tag} className={styles.taxItem}>
                {tag}
                {idx < data.taxonomy.length - 1 && <span className={styles.taxDot}> • </span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
