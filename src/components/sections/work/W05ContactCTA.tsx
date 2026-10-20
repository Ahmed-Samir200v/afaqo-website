import Link from "next/link";
import styles from "./Work.module.css";

export function W05ContactCTA() {
  return (
    <section className={styles.ctaSection} aria-labelledby="work-cta-heading">
      <div className="page-container">
        <div className={styles.ctaGrid}>
          {/* Left Column: Heading */}
          <div>
            <div className={styles.eyebrow}>
              <span>05 / GET IN TOUCH</span>
              <span className={styles.eyebrowLine} aria-hidden="true" />
            </div>

            <h2 id="work-cta-heading" className={styles.ctaHeading}>
              Have a project that needs
              <br />
              more than a <span className={styles.headingAccent}>static image?</span>
            </h2>
          </div>

          {/* Right Column: Copy & Action */}
          <div className={styles.ctaActionColumn}>
            <p className={styles.ctaDescription}>
              Let&apos;s explore how interactive 3D or immersive technology could help communicate your idea.
            </p>

            <Link href="/contact" className={styles.ctaButton}>
              <span>Discuss Your Challenge</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
