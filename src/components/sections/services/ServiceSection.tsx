import React from "react";
import Image from "next/image";
import {
  ServiceCapabilityCard,
  CapabilityCardData,
} from "./ServiceCapabilityCard";
import styles from "./Services.module.css";

export interface ServiceSectionProps {
  number: string;
  category: string;
  title: string;
  titleAccent?: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt?: string;
  badge: string;
  cards: Omit<CapabilityCardData, "serviceTitle">[];
}

export function ServiceSection({
  number,
  category,
  title,
  titleAccent,
  description,
  tags,
  image,
  imageAlt,
  badge,
  cards,
}: ServiceSectionProps) {
  // If titleAccent is provided, separate the base title from the accented portion
  const renderTitle = () => {
    if (!titleAccent) {
      return title;
    }
    const parts = title.split(titleAccent);
    if (parts.length === 2) {
      return (
        <>
          {parts[0]}
          <span className={styles.headlineAccent}>{titleAccent}</span>
          {parts[1]}
        </>
      );
    }
    return title;
  };

  return (
    <section
      data-reveal-service-section
      className={styles.unifiedServiceSection}
      aria-labelledby={`service-heading-${number}`}
    >
      <div className={styles.sectionContainer}>
        {/* ====================================================================
            TIER A — SERVICE INTRODUCTION (Text 48% / Featured Image 52%)
            ==================================================================== */}
        <div className={styles.serviceIntroGrid}>
          {/* Left Column: Eyebrow, Heading, Description, Tags */}
          <div data-reveal-service-intro-text className={styles.serviceIntroText}>
            {/* Eyebrow */}
            <div className={styles.serviceEyebrow}>
              <span className={styles.eyebrowNumber}>{number}</span>
              <span className={styles.eyebrowLabel}>{category}</span>
            </div>

            {/* Headline */}
            <h2
              id={`service-heading-${number}`}
              className={styles.serviceHeadline}
            >
              {renderTitle()}
            </h2>

            {/* Description */}
            <p className={styles.serviceDescription}>{description}</p>

            {/* Tags */}
            <div className={styles.serviceTagRow} aria-label={`${title} key capabilities`}>
              {tags.map((tag, idx) => (
                <span key={idx} className={styles.serviceTagPill}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Featured Image */}
          <div data-reveal-service-media className={styles.serviceMediaColumn}>
            <div className={styles.serviceMediaFrame}>
              <span className={styles.serviceMediaBadge}>{badge}</span>
              <Image
                src={image}
                alt={imageAlt || `${title} - AFAQO immersive capability`}
                fill
                priority={number === "01"}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 680px"
                className={styles.serviceMediaImage}
              />
            </div>
          </div>
        </div>

        {/* ====================================================================
            TIER B — CAPABILITY CARDS (4-Column Grid, 32px below Tier A)
            ==================================================================== */}
        <div className={styles.serviceCardsGrid}>
          {cards.map((card) => (
            <ServiceCapabilityCard
              key={card.number}
              number={card.number}
              icon={card.icon}
              title={card.title}
              description={card.description}
              serviceTitle={title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
