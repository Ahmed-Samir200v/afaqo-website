import Link from "next/link";
import Image from "next/image";
import { homeContent } from "@/content/global/home";

/**
 * AFAQO Corporate Editorial Footer — Soft Ivory, refined architectural presence.
 * Integrates directly with the Closing section as one continuous brand conclusion.
 */
export function Footer() {
  const { finalCTA } = homeContent;

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

          {/* Clean Editorial Navigation */}
          <nav aria-label="Footer Navigation" className="site-footer__nav">
            <ul role="list" className="site-footer__nav-list">
              {finalCTA.footerLinks.map((link) => (
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
              {finalCTA.footerMetadata.location}
            </span>
          </div>
        </div>

        {/* Bottom Refined Legal & Spec Micro-Row */}
        <div className="site-footer__bottom">
          <span className="site-footer__legal-text">
            © 2026 {finalCTA.footerMetadata.brand}. ALL RIGHTS RESERVED.
          </span>
          <span className="site-footer__legal-text site-footer__legal-text--dim">
            CREATIVE TECHNOLOGY STUDIO — SPATIAL &amp; INTERACTIVE SYSTEMS
          </span>
        </div>
      </div>
    </footer>
  );
}
