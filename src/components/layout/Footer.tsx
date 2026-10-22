import Link from "next/link";
import Image from "next/image";
import { navigationContent } from "@/content/global/navigation";
import { BackToTopButton } from "./BackToTopButton";
import { CurrentYear } from "./CurrentYear";

/**
 * AFAQO Unified Global Corporate Editorial Footer — Soft Ivory, refined architectural presence.
 * Satisfies docs/design/FOOTER_REQUIREMENTS.md across all routes.
 */
export function Footer() {
  return (
    <footer className="site-footer" aria-label="AFAQO Corporate Footer">
      <div className="page-container site-footer__container">
        {/* Main Editorial Row */}
        <div className="site-footer__main">
          {/* Brand Identity Column */}
          <div className="site-footer__identity">
            <Link href="/" aria-label="AFAQO Home" className="site-footer__logo-link">
              <Image
                src="/brand/afaqo-logo-dark.svg"
                alt="AFAQO"
                width={1100}
                height={253}
                priority={false}
                style={{ width: "auto", height: "34px", display: "block" }}
              />
            </Link>
            <p className="site-footer__tagline">
              IMMERSIVE DIGITAL TRANSFORMATION
            </p>

            {/* Social Media Channels */}
            <div className="site-footer__socials" aria-label="AFAQO Social Media Channels">
              <a
                href="https://www.linkedin.com/company/afaqotech/home"
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer__social-link"
                aria-label="AFAQO on LinkedIn"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="site-footer__social-icon"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                </svg>
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61595320057324"
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer__social-link"
                aria-label="AFAQO on Facebook"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="site-footer__social-icon"
                >
                  <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.704 0-1.225.109-1.562.327-.338.218-.507.654-.507 1.309v2.345h3.669l-.489 3.667h-3.18v7.98H9.101z" />
                </svg>
              </a>

              <a
                href="https://www.youtube.com/@AFAQO-TECH"
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer__social-link"
                aria-label="AFAQO on YouTube"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="site-footer__social-icon"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              <a
                href="mailto:info@afaqo.tech"
                className="site-footer__social-link"
                aria-label="Contact AFAQO via Email"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.85"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="site-footer__social-icon"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Clean Editorial Navigation (All 7 required routes) */}
          <nav aria-label="Footer Navigation" className="site-footer__nav">
            <ul role="list" className="site-footer__nav-list">
              {navigationContent.footerNavigation.map((link) => (
                <li key={link.label} className="site-footer__nav-item">
                  <Link href={link.href} className="site-footer__nav-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Regional & Global Presence Badge */}
          <div className="site-footer__location-badge">
            <span className="site-footer__presence-dot" aria-hidden="true" />
            <span className="site-footer__location-text">
              {navigationContent.metaUtility}
            </span>
          </div>
        </div>

        {/* Bottom Refined Legal & Spec Micro-Row with Back to Top */}
        <div className="site-footer__bottom">
          <div className="site-footer__legal-group">
            <span className="site-footer__legal-text">
              © <CurrentYear /> AFAQO. ALL RIGHTS RESERVED.
            </span>
            <span className="site-footer__legal-text site-footer__legal-text--dim">
              CREATIVE TECHNOLOGY STUDIO — SPATIAL &amp; INTERACTIVE SYSTEMS
            </span>
          </div>

          <div className="site-footer__actions">
            <a
              id="footer-download-company-profile"
              href="/company-profile/AFAQO-company-profile.pdf"
              download
              className="site-footer__back-to-top site-footer__download"
              aria-label="Download AFAQO Company Profile (PDF)"
            >
              Company Profile
              <span className="site-footer__download-arrow" aria-hidden="true">↓</span>
            </a>
            <BackToTopButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
