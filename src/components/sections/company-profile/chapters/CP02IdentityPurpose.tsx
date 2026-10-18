"use client";

import Image from "next/image";
import { companyProfileData } from "../companyProfileContent";
import styles from "../CompanyProfileExperience.module.css";

export function CP02IdentityPurpose() {
  const data = companyProfileData.cp02;

  return (
    <section
      id="cp02"
      className={styles.identitySection}
      aria-label="Identity and Purpose"
      data-source-pages="3,4,5"
      data-chapter-id="cp02"
    >
      <div className={styles.container}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <span className={styles.eyebrow}>{data.eyebrow}</span>
          <span className={styles.sourceBadge}>SOURCE: PAGES 03–05</span>
        </div>

        <div className={styles.identityGrid}>
          {/* Part 1: Who We Are & 4 Disciplines (Page 3) */}
          <div className={styles.editorialSplit}>
            <div className={styles.editorialFrame}>
              <Image
                src={data.artwork.whoWeAre}
                alt="AFAQO Industrial wireframe and real-time execution artwork"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                loading="lazy"
              />
            </div>

            <div>
              <span className={styles.eyebrow} style={{ color: "#0866ff" }}>
                WHO WE ARE
              </span>
              <h2 className={styles.h2Title}>{data.title}</h2>
              <p className={styles.bodyText}>
                We combine creative thinking, 3D production, experience design, and real-time technology to bridge the gap
                between engineering complexity and human understanding.
              </p>

              <div className={styles.disciplinesGrid}>
                {data.disciplines.map((d) => (
                  <div key={d.tag} className={styles.disciplineCard}>
                    <span className={styles.disciplineTag}>{d.tag}</span>
                    <h3 className={styles.disciplineTitle}>{d.label}</h3>
                    <p className={styles.disciplineDesc}>{d.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Part 2: Vision & Mission (Page 4) */}
          <div className={`${styles.editorialSplit} ${styles.editorialSplitReverse}`}>
            <div>
              <span className={styles.eyebrow} style={{ color: "#00d1ff" }}>
                DIRECTION & VALUES
              </span>
              <h2 className={styles.h2Title}>{data.visionMission.headline}</h2>
              <p className={styles.bodyText}>
                Guided by a commitment to technical precision and human-centric spatial interaction.
              </p>

              <div className={styles.visionMissionBox}>
                <div className={styles.vmCard}>
                  <span className={styles.vmLabel}>{data.visionMission.vision.label}</span>
                  <p className={styles.vmText}>{data.visionMission.vision.statement}</p>
                </div>
                <div className={styles.vmCard}>
                  <span className={styles.vmLabel}>{data.visionMission.mission.label}</span>
                  <p className={styles.vmText}>{data.visionMission.mission.statement}</p>
                </div>
              </div>
            </div>

            <div className={styles.editorialFrame}>
              <Image
                src={data.artwork.direction}
                alt="AFAQO vision and mission direction wave artwork"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                loading="lazy"
              />
            </div>
          </div>

          {/* Part 3: Purpose — Beyond Seeing, Toward Experiencing (Page 5) */}
          <div className={styles.editorialSplit}>
            <div className={styles.editorialFrame}>
              <Image
                src={data.artwork.purpose}
                alt="Virtual reality spatial immersion and user experience"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                loading="lazy"
              />
            </div>

            <div>
              <span className={styles.eyebrow} style={{ color: "#0866ff" }}>
                PURPOSE & IMPACT
              </span>
              <h2 className={styles.h2Title}>{data.purpose.headline}</h2>
              <p className={styles.leadText} style={{ marginBottom: "1rem" }}>
                {data.purpose.lead}
              </p>
              <p className={styles.bodyText}>{data.purpose.body}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
