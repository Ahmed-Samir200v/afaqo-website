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

          <BackToTopButton />
        </div>
      </div>
    </footer>
  );
}
