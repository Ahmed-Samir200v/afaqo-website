"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projectsContent, type Project } from "@/content/projects";
import styles from "./Work.module.css";

const FILTERS = [
  "All Work",
  "Immersive XR",
  "Digital Twins",
  "Interactive 3D",
  "Visualization",
] as const;

type FilterType = (typeof FILTERS)[number];

export function W03ProjectExplorer() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All Work");

  const filteredProjects = projectsContent.projects.filter((project: Project) => {
    if (activeFilter === "All Work") return true;
    if (project.filterCategory === activeFilter) return true;
    if (project.tags.some((tag) => tag.toLowerCase() === activeFilter.toLowerCase())) return true;
    return false;
  });

  return (
    <section className={styles.explorerSection} aria-labelledby="project-explorer-heading">
      <div className="page-container">
        <div className={styles.eyebrow}>
          <span>03 / PROJECT EXPLORER</span>
          <span className={styles.eyebrowLine} aria-hidden="true" />
        </div>

        <h2 id="project-explorer-heading" className={styles.sectionHeading}>
          Explore our work<span className={styles.headingAccent}>.</span>
        </h2>

        {/* Filter Navigation */}
        <nav aria-label="Project filter categories" className={styles.filterNav}>
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`${styles.filterButton} ${isActive ? styles.filterButtonActive : ""}`}
                aria-pressed={isActive}
              >
                {filter}
              </button>
            );
          })}
        </nav>

        {/* Projects Grid */}
        <div className={styles.projectsGrid}>
          {filteredProjects.map((project: Project) => (
            <Link
              key={project.slug}
              href={project.href}
              className={styles.projectCard}
              aria-label={`View case study: ${project.title}`}
            >
              <div className={styles.cardMedia}>
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
                  className={styles.cardImage}
                />
              </div>

              <div className={styles.cardContent}>
                <div className={styles.cardHeaderRow}>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <span className={styles.cardArrowCircle} aria-hidden="true">
                    →
                  </span>
                </div>

                <div className={styles.tagsRow} style={{ marginBottom: 0, marginTop: "1rem" }}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tagPill}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
