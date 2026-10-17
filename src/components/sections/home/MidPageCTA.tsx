"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionPreference } from "@/lib/motion-preference";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function MidPageCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const lightSweepRef = useRef<HTMLDivElement>(null);
  const copyContainerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { shouldReduceMotion } = useMotionPreference();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (shouldReduceMotion) return;

      // 1. Entrance timeline on scrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Image scale & subtle reveal (1.05 -> 1.00, ~1.5s power3.out)
      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { scale: 1.05, opacity: 0.8 },
          { scale: 1.0, opacity: 1, duration: 1.5, ease: "power3.out" },
          0
        );
      }

      // Architectural light sweep: ONE subtle non-looping sweep during entrance
      if (lightSweepRef.current) {
        tl.fromTo(
          lightSweepRef.current,
          { xPercent: -120, opacity: 0 },
          {
            xPercent: 220,
            opacity: 1,
            duration: 1.6,
            ease: "power2.inOut",
          },
          0.2
        );
      }

      // Copy sequence (eyebrow, headline, supporting copy, button)
      // Masked y: 24px -> 0 + opacity, 80ms stagger
      if (copyContainerRef.current) {
        const copyItems = copyContainerRef.current.querySelectorAll(".cta-anim-item");
        tl.fromTo(
          copyItems,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
          },
          0.35
        );
      }

      // 2. Parallax: subtle natural image drift around ±12px during scroll (no pin, no hijack)
      if (imageContainerRef.current) {
        gsap.fromTo(
          imageContainerRef.current,
          { y: -12 },
          {
            y: 12,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  // Button hover micro-interaction
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (shouldReduceMotion) return;

    if (labelRef.current) {
      gsap.to(labelRef.current, { x: 2, duration: 0.4, ease: "power3.out" });
    }
    if (arrowRef.current) {
      gsap.to(arrowRef.current, { x: 4, y: -4, duration: 0.4, ease: "power3.out" });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (shouldReduceMotion) return;

    if (labelRef.current) {
      gsap.to(labelRef.current, { x: 0, duration: 0.4, ease: "power3.out" });
    }
    if (arrowRef.current) {
      gsap.to(arrowRef.current, { x: 0, y: 0, duration: 0.4, ease: "power3.out" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="cta"
      aria-label="Let's Collaborate — Have a Project in Mind?"
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(640px, 48vw, 760px)",
        minHeight: "580px",
        backgroundColor: "#050D24",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background Cinematic Image Layer */}
      <div
        ref={imageContainerRef}
        style={{
          position: "absolute",
          inset: "-20px",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <Image
          ref={imageRef}
          src="/images/cta/afaqo-project-cta.webp"
          alt="AFAQO architectural visionary skyline collaboration"
          fill
          priority
          sizes="100vw"
          className="cta-bg-image"
          style={{
            objectFit: "cover",
            objectPosition: "62% center",
          }}
        />

        {/* Layered Deep Navy Gradients over LEFT only for perfect text readability */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(5, 13, 36, 0.94) 0%, rgba(5, 13, 36, 0.88) 30%, rgba(5, 13, 36, 0.52) 52%, rgba(5, 13, 36, 0.12) 72%, rgba(5, 13, 36, 0.00) 86%)",
          }}
        />

        {/* Ambient Top & Bottom Vignette Protection */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(5, 13, 36, 0.45) 0%, rgba(5, 13, 36, 0.00) 22%, rgba(5, 13, 36, 0.00) 78%, rgba(5, 13, 36, 0.45) 100%)",
          }}
        />

        {/* ONE subtle non-looping architectural light sweep on entrance */}
        <div
          ref={lightSweepRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: "35%",
            background:
              "linear-gradient(108deg, transparent 20%, rgba(255, 255, 255, 0.07) 50%, transparent 80%)",
            transform: "translateX(-120%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Copy & Action Content Container */}
      <div
        className="page-container"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "1440px",
          margin: "0 auto",
          paddingInline: "clamp(1.5rem, 5vw, 5rem)",
          boxSizing: "border-box",
        }}
      >
        <div
          ref={copyContainerRef}
          style={{
            maxWidth: "clamp(480px, 44vw, 640px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {/* Eyebrow */}
          <div
            className="cta-anim-item type-metadata"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#00D1FF",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: "clamp(1rem, 1.8vh, 1.4rem)",
            }}
          >
            AFAQO / LET&apos;S COLLABORATE
          </div>

          {/* Headline with 'project' highlighted in Electric Blue */}
          <h2
            className="cta-anim-item"
            style={{
              fontFamily: "var(--font-manrope)",
              fontSize: "clamp(42px, 5.2vw, 88px)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              color: "#FFFFFF",
              margin: 0,
              marginBottom: "clamp(1.25rem, 2vh, 1.75rem)",
            }}
          >
            Have a{" "}
            <span
              style={{
                color: "var(--color-brand-blue, #0866FF)",
                fontWeight: 400,
              }}
            >
              project
            </span>
            <br />
            in mind?
          </h2>

          {/* Supporting Copy */}
          <p
            className="cta-anim-item"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(1rem, 1.15vw, 1.1875rem)",
              fontWeight: 400,
              color: "rgba(255, 255, 255, 0.82)",
              lineHeight: 1.58,
              margin: 0,
              marginBottom: "clamp(2rem, 3.2vh, 2.75rem)",
              maxWidth: "46ch",
            }}
          >
            Let&apos;s turn your vision into an immersive experience.
          </p>

          {/* Prominent Solid CTA Button (56-62px height, 28-34px padding, 8px radius) */}
          <div className="cta-anim-item">
            <Link
              ref={buttonRef}
              href="#contact"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              aria-label="Start a Project — Connect with AFAQO"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                height: "58px",
                paddingInline: "clamp(28px, 2.2vw, 34px)",
                borderRadius: "8px",
                backgroundColor: isHovered ? "#0055EE" : "var(--color-brand-blue, #0866FF)",
                color: "#FFFFFF",
                fontFamily: "var(--font-inter)",
                fontSize: "0.9375rem",
                fontWeight: 500,
                letterSpacing: "0.01em",
                textDecoration: "none",
                boxShadow: isHovered
                  ? "0 10px 28px rgba(8, 102, 255, 0.42)"
                  : "0 6px 18px rgba(8, 102, 255, 0.28)",
                transform: isHovered ? "translateY(-1px) scale(1.02)" : "translateY(0) scale(1.0)",
                transition: "background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
              }}
            >
              <span ref={labelRef} style={{ display: "inline-block" }}>
                Start a Project
              </span>
              <span
                ref={arrowRef}
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  fontSize: "1.05rem",
                  lineHeight: 1,
                }}
              >
                ↗
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scoped Responsive Styles */}
      <style>{`
        @media (max-width: 767px) {
          #cta {
            height: clamp(580px, 86vh, 680px) !important;
          }
          .cta-bg-image {
            object-position: 72% center !important;
          }
        }
      `}</style>
    </section>
  );
}
