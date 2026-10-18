"use client";

import Image from "next/image";
import Link from "next/link";
import { companyProfileData, PDF_DOWNLOAD_SPEC } from "../companyProfileContent";
import styles from "../CompanyProfileExperience.module.css";

export function CP08ClosingHorizon() {
  const data = companyProfileData.cp08;

  return (
    <section
      id="cp08"
      className={styles.closingSection}
      aria-label="Closing Horizon and Download"
      data-source-pages="29"
      data-chapter-id="cp08"
    >
      {/* Background Artwork (Page 29) */}
      <div className={styles.closingBackdrop} aria-hidden="true">
        <Image
          src={data.closingArtwork}
          alt=""
          fill
          sizes="100vw"
        />
        <div className={styles.closingGradient} />
      </div>

      <div className={styles.container}>
        <div className={styles.closingContent}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <span className={styles.eyebrow}>{data.eyebrow}</span>
            <span className={styles.sourceBadge}>SOURCE: PAGE 29</span>
          </div>

          <h2 className={styles.h1Title} style={{ fontSize: "clamp(2rem, 4.5vw, 4.25rem)" }}>
            Together toward a <br />
            <span style={{ color: "#00d1ff" }}>smarter, stronger industry.</span>
          </h2>

          <p className={styles.leadText} style={{ marginInline: "auto", marginBottom: "1.25rem" }}>
            {data.statement}
          </p>

          <p className={styles.bodyText} style={{ marginInline: "auto", maxWidth: "60ch" }}>
            {data.contactLead}
          </p>

          <div className={styles.closingActions}>
            <Link href={data.contactCTA.href} className={styles.btnPrimary}>
              <span>{data.contactCTA.label}</span>
              <span aria-hidden="true">↗</span>
            </Link>

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
          </div>
        </div>
      </div>
    </section>
  );
}
