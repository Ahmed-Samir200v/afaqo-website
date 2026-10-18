"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationContent, isRouteActive, type NavItem } from "@/content/global/navigation";
import { MobileMenu } from "./MobileMenu";
import { NavGlassReflection } from "./NavGlassReflection";

export interface HeaderProps {
  theme?: "dark" | "light";
  isScrolled?: boolean;
  activeHref?: string;
  className?: string;
  style?: React.CSSProperties;
}

function NavLinkItem({
  item,
  isActive,
  textColor,
  isDark = true,
}: {
  item: NavItem;
  isActive: boolean;
  textColor: string;
  isDark?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const activeColor = isDark ? "#FFFFFF" : "var(--color-brand-blue, #0866FF)";
  const indicatorColor = isDark ? "var(--color-accent-cyan, #00D1FF)" : "var(--color-brand-blue, #0866FF)";
  const glowColor = isDark ? "0 0 8px rgba(0, 209, 255, 0.55)" : "0 0 8px rgba(8, 102, 255, 0.40)";

  return (
    <Link
      href={item.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-inter)",
        fontSize: "13.5px",
        fontWeight: 500,
        color: hovered || isActive ? activeColor : textColor,
        transform: hovered ? "translateY(-1px)" : "translateY(0px)",
        transition: "color 220ms ease, transform 220ms ease",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBlock: "0.35rem",
        paddingInline: "0.25rem",
        borderRadius: "var(--radius-sm, 2px)",
        position: "relative",
        textDecoration: "none",
        whiteSpace: "nowrap",
        zIndex: 10,
      }}
    >
      <span>{item.label}</span>
      {/* Precision indicator */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "0px",
          width: hovered || isActive ? "16px" : "0px",
          height: "2px",
          backgroundColor: indicatorColor,
          borderRadius: "1px",
          boxShadow: hovered || isActive ? glowColor : "none",
          transition: "width 240ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 240ms ease",
        }}
      />
    </Link>
  );
}

function NavCTA({ label, href, isDark = true }: { label: string; href: string; isDark?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.45rem",
        backgroundColor: isDark
          ? hovered
            ? "rgba(8, 102, 255, 0.28)"
            : "rgba(255, 255, 255, 0.08)"
          : hovered
          ? "#0052cc"
          : "var(--color-brand-blue, #0866FF)",
        border: isDark
          ? hovered
            ? "1px solid rgba(0, 209, 255, 0.40)"
            : "1px solid rgba(255, 255, 255, 0.13)"
          : "1px solid transparent",
        color: "#FFFFFF",
        padding: "0.48rem 1.15rem",
        borderRadius: "var(--radius-lg, 10px)",
        fontFamily: "var(--font-inter)",
        fontSize: "13.5px",
        fontWeight: 500,
        letterSpacing: "0.01em",
        textDecoration: "none",
        position: "relative",
        zIndex: 10,
        transition:
          "background-color 220ms ease, border-color 220ms ease, box-shadow 220ms ease",
        boxShadow: hovered
          ? "0 4px 18px -2px rgba(8, 102, 255, 0.32)"
          : isDark
          ? "none"
          : "0 2px 10px rgba(8, 102, 255, 0.20)",
      }}
    >
      <span>{label}</span>
      <span
        aria-hidden="true"
        style={{
          color: isDark ? "var(--color-accent-cyan)" : "#FFFFFF",
          display: "inline-block",
          transform: hovered ? "translateX(3px)" : "translateX(0px)",
          transition: "transform 220ms ease",
          fontSize: "0.95rem",
        }}
      >
        ↗
      </span>
    </Link>
  );
}

export function Header({
  theme = "dark",
  isScrolled: externalIsScrolled,
  activeHref,
  className = "",
  style,
}: HeaderProps) {
  const pathname = usePathname();
  const currentActive = activeHref !== undefined ? activeHref : pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuHovered, setMenuHovered] = useState(false);
  const [headerHovered, setHeaderHovered] = useState(false);
  const [simulxrHovered, setSimulxrHovered] = useState(false);
  const [internalIsScrolled, setInternalIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setInternalIsScrolled(window.scrollY > 48);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isScrolled = externalIsScrolled !== undefined ? externalIsScrolled : internalIsScrolled;
  const isDark = theme === "dark";

  const textColor = isDark ? "rgba(255, 255, 255, 0.78)" : "var(--color-text-on-light)";
  const logoSrc = isDark ? "/brand/afaqo-logo-light.svg" : "/brand/afaqo-logo-dark.svg";

  return (
    <>
      <header
        className={className}
        onMouseEnter={() => setHeaderHovered(true)}
        onMouseLeave={() => setHeaderHovered(false)}
        style={{
          position: "fixed",
          top: "clamp(12px, 2vw, 18px)",
          left: "50%",
          transform: `translateX(-50%) ${headerHovered ? "translateY(-1px)" : "translateY(0px)"}`,
          width: "calc(100% - clamp(24px, 4vw, 48px))",
          maxWidth: "1400px",
          height: isScrolled ? "64px" : "clamp(64px, 6.5vw, 70px)",
          backgroundColor: isDark
            ? isScrolled
              ? "rgba(5, 13, 36, 0.58)"
              : "rgba(5, 13, 36, 0.34)"
            : headerHovered
            ? "rgba(255, 255, 255, 0.92)"
            : isScrolled
            ? "rgba(255, 255, 255, 0.88)"
            : "rgba(249, 248, 244, 0.82)",
          backdropFilter: "blur(24px) saturate(155%)",
          WebkitBackdropFilter: "blur(24px) saturate(155%)",
          border: isDark
            ? headerHovered
              ? "1px solid rgba(255, 255, 255, 0.20)"
              : isScrolled
              ? "1px solid rgba(255, 255, 255, 0.16)"
              : "1px solid rgba(255, 255, 255, 0.13)"
            : "1px solid rgba(5, 13, 36, 0.08)",
          boxShadow: isDark
            ? headerHovered
              ? "inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -1px 0 rgba(255,255,255,0.03), 0 24px 70px rgba(0,0,0,0.36)"
              : isScrolled
              ? "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(255,255,255,0.03), 0 22px 65px rgba(0,0,0,0.30)"
              : "inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(255,255,255,0.025), 0 18px 60px rgba(0,0,0,0.16)"
            : "0 10px 30px rgba(5, 13, 36, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: "clamp(1rem, 2vw, 2.25rem)",
          zIndex: 50,
          transition:
            "background-color 300ms ease, height 300ms ease, box-shadow 300ms ease, border-color 300ms ease, transform 250ms ease",
          overflow: "hidden",
          ...style,
        }}
      >
        {/* Interactive Glass Mouse Reflection */}
        <NavGlassReflection />

        {/* Top Glass Highlight Accent */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Official Brand Logo */}
        <Link
          href="/"
          aria-label="AFAQO Home"
          style={{
            display: "inline-flex",
            alignItems: "center",
            flexShrink: 0,
            position: "relative",
            zIndex: 10,
          }}
        >
          <Image
            src={logoSrc}
            alt="AFAQO — Immersive Digital Transformation"
            width={215}
            height={49}
            priority
            style={{
              width: "auto",
              height: "clamp(28px, 2.8vw, 36px)",
              display: "block",
            }}
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="lg-nav-visible"
          style={{ display: "none", position: "relative", zIndex: 10 }}
        >
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              alignItems: "center",
              gap: "clamp(0.75rem, 1.4vw, 2rem)",
              padding: 0,
              margin: 0,
            }}
          >
            {navigationContent.primaryNavigation.map((item) => (
              <li key={item.label}>
                <NavLinkItem
                  item={item}
                  isActive={isRouteActive(currentActive, item.href)}
                  textColor={textColor}
                  isDark={isDark}
                />
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Utility (SIMULXR) & Primary Action (Start a Project) */}
        <div
          className="lg-actions-visible"
          style={{
            display: "none",
            alignItems: "center",
            gap: "clamp(0.75rem, 1.3vw, 1.75rem)",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* SIMULXR Secondary Utility Link */}
          {navigationContent.utilityNavigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="type-metadata"
              style={{
                color: "#00D1FF",
                letterSpacing: "0.14em",
                fontSize: "0.75rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                textDecoration: "none",
                opacity: simulxrHovered ? 1 : 0.82,
                transform: simulxrHovered ? "translateY(-1px)" : "translateY(0px)",
                transition: "opacity 220ms ease, transform 220ms ease",
              }}
              onMouseEnter={() => setSimulxrHovered(true)}
              onMouseLeave={() => setSimulxrHovered(false)}
            >
              <span>{item.label}</span>
              <span aria-hidden="true" style={{ fontSize: "0.85rem" }}>
                ↗
              </span>
            </Link>
          ))}

          {/* Primary Action Button (Start a Project) */}
          <NavCTA
            label={navigationContent.primaryCTA.label}
            href={navigationContent.primaryCTA.href}
            isDark={isDark}
          />
        </div>

        {/* Mobile / Tablet Compact Menu Trigger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          onMouseEnter={() => setMenuHovered(true)}
          onMouseLeave={() => setMenuHovered(false)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          className="mobile-trigger-visible"
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: "5px",
            width: "42px",
            height: "42px",
            padding: "8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: isDark ? "#FFFFFF" : "var(--color-text-on-light, #050D24)",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Top Line */}
          <span
            style={{
              width: "22px",
              height: "1.5px",
              backgroundColor: "currentColor",
              borderRadius: "1px",
              display: "block",
              transition: "width var(--duration-fast) var(--ease-standard)",
            }}
          />
          {/* Bottom Line */}
          <span
            style={{
              width: menuHovered ? "22px" : "15px",
              height: "1.5px",
              backgroundColor: "currentColor",
              borderRadius: "1px",
              display: "block",
              transition: "width var(--duration-fast) var(--ease-standard)",
            }}
          />
        </button>
      </header>

      {/* Full-Screen Navigation Overlay (Preserved intact) */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeHref={currentActive}
      />
    </>
  );
}
