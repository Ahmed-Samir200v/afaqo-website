import Image from "next/image";
import Link from "next/link";
import styles from "./Work.module.css";

export function W02FeaturedExperience() {
  return (
    <section id="featured-work" className={styles.featuredSection} aria-labelledby="featured-work-heading">
      <div className="page-container">
        {/* Cinematic Media Frame */}
        <div className={styles.featuredMediaContainer}>
          <Image
            src="/images/projects/industrial-training/industrial-training.png"
            alt="Industrial Facility Simulation and VR Training Experience"
            fill
            priority
            sizes="(max-width: 1400px) 100vw, 1360px"
            className={styles.featuredImage}
          />
        </div>

        {/* Content Meta Row */}
        <div className={styles.featuredContentRow}>
          <div>
            <div className={styles.eyebrow}>
              <span>02 / FEATURED EXPERIENCE</span>
              <span className={styles.eyebrowLine} aria-hidden="true" />
            </div>
            <h2 id="featured-work-heading" className={styles.featuredTitle}>
              Industrial Facility Simulation
            </h2>
          </div>

          <div>
            <p className={styles.featuredDescription}>
              An immersive training experience that recreates complex industrial
              environments with high realism, enabling safe, effective, and repeatable
              learning.
            </p>

            <div className={styles.tagsRow}>
              <span className={styles.tagPill}>Simulation</span>
              <span className={styles.tagPill}>VR Training</span>
              <span className={styles.tagPill}>Real-Time 3D</span>
            </div>

            <Link
              href="/work/industrial-training-experience"
              className={styles.linkWithArrow}
            >
              <span>View Case Study</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
