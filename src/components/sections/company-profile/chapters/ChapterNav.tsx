"use client";

import { CHAPTER_INDEX, PDF_DOWNLOAD_SPEC } from "../companyProfileContent";
import styles from "../CompanyProfileExperience.module.css";

interface ChapterNavProps {
  activeChapter: string;
  onChapterClick: (id: string) => void;
  isVisible: boolean;
}

export function ChapterNav({ activeChapter, onChapterClick, isVisible }: ChapterNavProps) {
  if (!isVisible) return null;

  return (
    <nav
      className={styles.chapterNavWrapper}
      aria-label="Company Profile Chapter Navigation"
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      <div className={styles.chapterNavPill}>
        <ul className={styles.navItemsList} role="menubar">
          {CHAPTER_INDEX.map((chapter) => {
            const isActive = activeChapter === chapter.chapterId;
            return (
              <li key={chapter.chapterId} role="none">
                <button
                  type="button"
                  role="menuitem"
                  aria-current={isActive ? "true" : undefined}
                  className={`${styles.navItemBtn} ${isActive ? styles.navItemBtnActive : ""}`}
                  onClick={() => onChapterClick(chapter.chapterId)}
                >
                  <span className={styles.navNum}>{chapter.chapterNumber}</span>
                  <span>{chapter.title}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Compact PDF Download Action */}
        <a
          href={PDF_DOWNLOAD_SPEC.url}
          download={PDF_DOWNLOAD_SPEC.filename}
          className={styles.navPdfAction}
          aria-label={PDF_DOWNLOAD_SPEC.accessibleLabel}
          title={PDF_DOWNLOAD_SPEC.accessibleLabel}
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
          <span>PDF {PDF_DOWNLOAD_SPEC.sizeLabel}</span>
        </a>
      </div>
    </nav>
  );
}
