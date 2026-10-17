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
              Let’s make your
              <br />
              next idea <span className={styles.headingAccent}>real.</span>
            </h2>
          </div>

          {/* Right Column: Copy & Action */}
          <div className={styles.ctaActionColumn}>
            <p className={styles.ctaDescription}>
              We’d love to hear about your project and explore how we can create
              immersive experiences and digital solutions together.
            </p>

            <Link href="/contact" className={styles.ctaButton}>
              <span>Start a Project</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
