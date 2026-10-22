import React from "react";
import Link from "next/link";
import { IconArrowRight } from "./ServiceIcons";
import styles from "./Services.module.css";

export interface CapabilityCardData {
  number: string;
  icon: React.ReactNode;
  title: string;
  description?: string;
  serviceTitle: string;
}

export function ServiceCapabilityCard({
  number,
  icon,
  title,
  description,
  serviceTitle,
}: CapabilityCardData) {
  const contactHref = `/contact?service=${encodeURIComponent(
    serviceTitle
  )}&capability=${encodeURIComponent(title)}`;

  return (
    <Link
      href={contactHref}
      data-reveal-capability-card
      className={styles.capabilityCard}
      aria-label={`Inquire about ${title} (${serviceTitle})`}
    >
      {/* Top Row: Icon on left, Capability Number on right */}
      <div className={styles.cardTopRow}>
        <div className={styles.cardIconBox}>{icon}</div>
        <span className={styles.cardNumber}>{number}</span>
      </div>

      {/* Content Area: Title & optional Description */}
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        {description && (
          <p className={styles.cardDescription}>{description}</p>
        )}
      </div>

      {/* Bottom Row: Functional Arrow Button */}
      <div className={styles.cardBottomRow}>
        <div className={styles.cardArrowCircle} aria-hidden="true">
          <IconArrowRight size={18} />
        </div>
      </div>
    </Link>
  );
}
