"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { navigationContent, isRouteActive } from "@/content/global/navigation";
import { getMotionPreference } from "@/lib/motion-preference";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeHref?: string;
}

export function MobileMenu({ isOpen, onClose, activeHref }: MobileMenuProps) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const headerRowRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const utilRowRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    }
  }

  // Controlled Exit Animation (Reverse order, faster 350–450ms, or simple fade on reduced motion)
  const triggerClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);

    const { shouldReduceMotion } = getMotionPreference();

    if (shouldReduceMotion || !overlayRef.current) {
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.15,
          onComplete: () => {
            setShouldRender(false);
            setIsClosing(false);
            onClose();
          },
        });
      } else {
        setShouldRender(false);
        setIsClosing(false);
        onClose();
      }
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power2.in" },
      onComplete: () => {
        setShouldRender(false);
        setIsClosing(false);
        onClose();
      },
    });

    const validNavItems = navItemsRef.current.filter(Boolean);
    const topControls = [logoRef.current, closeBtnRef.current].filter(Boolean);

    // 1. Metadata fades out first
    if (metaRef.current) {
      tl.to(metaRef.current, { opacity: 0, duration: 0.12 }, 0);
    }

    // 2. SIMULXR & Start a Project fade out
    if (utilRowRef.current) {
      tl.to(utilRowRef.current, { opacity: 0, y: 6, duration: 0.14 }, 0.04);
    }

    // 3. Nav items reverse vertically
    if (validNavItems.length > 0) {
      const reversedItems = [...validNavItems].reverse();
      tl.to(
        reversedItems,
        { opacity: 0, y: -16, duration: 0.2, stagger: 0.03 },
        0.08
      );
    }

    // 4. Logo and Close fade out
    if (topControls.length > 0) {
      tl.to(topControls, { opacity: 0, y: -6, duration: 0.15 }, 0.16);
    }

    // 5. Overlay fades out last
    tl.to(overlayRef.current, { opacity: 0, duration: 0.2 }, 0.2);
  }, [isClosing, onClose]);

  // Lock body scroll with scrollbar shift compensation
  useEffect(() => {
    if (shouldRender && !isClosing) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;

      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      closeBtnRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          triggerClose();
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [shouldRender, isClosing, triggerClose]);

  // Entrance GSAP Animation Sequence (500–700ms total, simple fade if reduced motion)
  useEffect(() => {
    if (shouldRender && !isClosing && overlayRef.current) {
      const { shouldReduceMotion } = getMotionPreference();

      const ctx = gsap.context(() => {
        if (shouldReduceMotion) {
          gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.15 });
          return;
        }

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // 1. Overlay background appears
        tl.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.35, ease: "power2.out" },
          0
        );

        // 2. Logo and Close fade in
        const topControls = [logoRef.current, closeBtnRef.current].filter(Boolean);
        if (topControls.length > 0) {
          tl.fromTo(
            topControls,
            { opacity: 0, y: -8 },
            { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
            0.12
          );
        }

        // 3. Primary nav items reveal vertically (clipped vertical text reveal, stagger 55ms)
        const validNavItems = navItemsRef.current.filter(Boolean);
        if (validNavItems.length > 0) {
          tl.fromTo(
            validNavItems,
            { opacity: 0, y: 32 },
            {
              opacity: 1,
              y: 0,
              duration: 0.48,
              stagger: 0.055,
              ease: "power3.out",
            },
            0.2
          );
        }

        // 4. SIMULXR and Start a Project appear
        if (utilRowRef.current) {
          tl.fromTo(
            utilRowRef.current,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
            0.38
          );
        }

        // 5. Metadata appears last
        if (metaRef.current) {
          tl.fromTo(
            metaRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.35, ease: "power2.out" },
            0.46
          );
        }
      }, overlayRef);

      return () => ctx.revert();
    }
  }, [shouldRender, isClosing]);

  if (!shouldRender) return null;

  return (
    <div
      id="mobile-navigation"
      role="dialog"
      aria-modal="true"
      aria-label="Full Screen Navigation Menu"
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "var(--color-canvas-dark)",
        color: "var(--color-text-on-dark)",
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
        maxHeight: "100dvh",
        overflowY: "auto",
        overscrollBehavior: "contain",
      }}
    >
      {/* Top Architectural Header Row */}
      <div
        ref={headerRowRef}
        className="page-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "clamp(72px, 8vw, 88px)",
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <Link ref={logoRef} href="/" onClick={triggerClose} aria-label="AFAQO Home">
          <Image
            src="/brand/afaqo-logo-light.svg"
            alt="AFAQO — Immersive Digital Transformation"
            width={215}
            height={49}
            priority
            style={{
              width: "auto",
              height: "clamp(36px, 3.8vw, 46px)",
              display: "block",
            }}
          />
        </Link>

        {/* Minimal Editorial Close Control: "Close ×" */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={triggerClose}
          aria-label="Close navigation menu"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            color: "var(--color-text-on-dark)",
            padding: "0.5rem 0.25rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-inter)",
            fontSize: "0.8125rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 500,
            transition: "opacity var(--duration-fast) var(--ease-standard)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <span>Close</span>
          <span
            aria-hidden="true"
            style={{
              fontSize: "1.25rem",
              lineHeight: 1,
              fontWeight: 300,
              display: "inline-block",
            }}
          >
            ×
          </span>
        </button>
      </div>

      {/* Main Full-Screen Composition */}
      <div
        className="page-container"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingTop: "clamp(1.5rem, 4vh, 3.5rem)",
          paddingBottom: "clamp(2rem, 5vh, 4rem)",
        }}
      >
        {/* Centered / Cohesive Main Navigation Block */}
        <nav aria-label="Full-screen menu navigation">
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "clamp(0.75rem, 2vh, 1.35rem)",
            }}
          >
            {navigationContent.primaryNavigation.map((item, index) => {
              const isActive = activeHref ? isRouteActive(activeHref, item.href) : false;
              return (
                <li key={item.label} style={{ lineHeight: 1.05 }}>
                  <Link
                    ref={(el) => {
                      navItemsRef.current[index] = el;
                    }}
                    href={item.href}
                    onClick={triggerClose}
                    className="nav-link-editorial"
                    style={{
                      fontFamily: "var(--font-manrope)",
                      fontSize: "clamp(2.5rem, 5.2vw, 4.25rem)",
                      fontWeight: 300,
                      lineHeight: 1.05,
                      letterSpacing: "-0.03em",
                      color: "var(--color-text-on-dark)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.85rem",
                      position: "relative",
                    }}
                  >
                    {/* Active Precision Indicator (Cyan Square) */}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        style={{
                          width: "7px",
                          height: "7px",
                          backgroundColor: "var(--color-accent-cyan)",
                          borderRadius: "var(--radius-sm)",
                          display: "inline-block",
                          flexShrink: 0,
                        }}
                      />
                    )}
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Cohesive Lower Utility Composition */}
        <div
          style={{
            marginTop: "clamp(2.5rem, 5vh, 4rem)",
            paddingTop: "2rem",
            borderTop: "1px solid var(--color-border-dark)",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {/* Mid Row: SIMULXR (Left) + Start a Project (Right) */}
          <div
            ref={utilRowRef}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            {/* SIMULXR Secondary Utility */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {navigationContent.utilityNavigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={triggerClose}
                  className="type-metadata"
                  style={{
                    color: "var(--color-accent-cyan)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.45rem",
                    letterSpacing: "0.16em",
                    fontSize: "0.8125rem",
                    transition: "opacity var(--duration-fast) var(--ease-standard)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <span>{item.label}</span>
                  <span aria-hidden="true" style={{ fontSize: "1rem" }}>
                    ↗
                  </span>
                </Link>
              ))}
            </div>

            {/* Editorial Action: Start a Project ↗ */}
            <div>
              <Link
                href={navigationContent.primaryCTA.href}
                onClick={triggerClose}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                  color: "var(--color-text-on-dark)",
                  letterSpacing: "-0.01em",
                  borderBottom: "1.5px solid var(--color-accent)",
                  paddingBottom: "0.3rem",
                  transition: "border-color var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-accent-cyan)";
                  const arrow = e.currentTarget.querySelector(".menu-cta-arrow") as HTMLElement;
                  if (arrow) arrow.style.transform = "translate(3px, -3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-accent)";
                  const arrow = e.currentTarget.querySelector(".menu-cta-arrow") as HTMLElement;
                  if (arrow) arrow.style.transform = "translate(0px, 0px)";
                }}
              >
                <span>{navigationContent.primaryCTA.label}</span>
                <span
                  className="menu-cta-arrow"
                  aria-hidden="true"
                  style={{
                    color: "var(--color-accent-cyan)",
                    fontSize: "1rem",
                    lineHeight: 1,
                    display: "inline-block",
                    transition: "transform var(--duration-fast) var(--ease-standard)",
                  }}
                >
                  ↗
                </span>
              </Link>
            </div>
          </div>

          {/* Bottom Row: Metadata Corporate Descriptor */}
          <div
            ref={metaRef}
            className="type-metadata"
            style={{
              color: "var(--color-text-secondary-on-dark)",
              letterSpacing: "0.16em",
              fontSize: "0.75rem",
            }}
          >
            {navigationContent.metaUtility}
          </div>
        </div>
      </div>
    </div>
  );
}
