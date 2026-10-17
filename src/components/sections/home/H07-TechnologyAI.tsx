import { technologyContent } from "@/content/technology";

/**
 * H07 — TECHNOLOGY & AI (Phase 1: Pure Static Final Frame)
 *
 * All GSAP and ScrollTrigger animations are completely removed in Phase 1
 * to establish a perfect, static, reliable visual composition.
 */
export function H07TechnologyAI() {
  return (
    <section
      id="technology-ai"
      className="technology-section"
      style={{
        backgroundColor: "#F9F8F4",
        color: "#050D24",
        position: "relative",
        isolation: "isolate",
        overflow: "hidden",
      }}
      aria-labelledby="technology-ai-heading"
    >
      {/* 1. Approved Spatial Technology Visual (Absolute CSS Background Layer) */}
      <div
        className="technology-bg"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage: "url('/images/technology/technology-ai-bg.webp')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "right center",
          opacity: 1,
        }}
      />

      {/* 2. Soft Ivory Controlled Readability Wash (Solid Ivory Left -> Luminous Reveal Right) */}
      <div
        className="technology-bg-wash"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(90deg, rgba(249,248,244,1) 0%, rgba(249,248,244,0.98) 28%, rgba(249,248,244,0.84) 43%, rgba(249,248,244,0.42) 58%, rgba(249,248,244,0.12) 75%, rgba(249,248,244,0.04) 100%)",
        }}
      />

      {/* 3. Foreground Content */}
      <div
        className="page-container technology-content"
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Top Left Editorial Header Block */}
        <div className="technology-header-block">
          <div className="technology-label-group">
            <span className="technology-eyebrow">
              {technologyContent.eyebrow}
            </span>
            <span className="technology-label-rule" aria-hidden="true" />
          </div>

          <h2 id="technology-ai-heading" className="technology-headline">
            <span>The technology</span>
            <span>behind the</span>
            <span className="technology-accent">experience.</span>
          </h2>

          <div className="technology-body-wrapper">
            <p className="technology-body">
              {technologyContent.body}
            </p>
          </div>
        </div>

        {/* Continuous Technical / Editorial Rail Across Lower Section */}
        <div className="technology-rail-wrapper">
          <div className="technology-rail-baseline" aria-hidden="true" />

          <div className="technology-rail-items">
            {technologyContent.pillars.map((pillar) => (
              <div key={pillar.number} className="tech-cap-node">
                <div className="tech-cap-anchor" aria-hidden="true">
                  <span className="tech-cap-point" />
                  <span className="tech-cap-tick" />
                </div>

                <div className="tech-cap-content">
                  <div className="tech-cap-header">
                    <span className="tech-cap-number">{pillar.number}</span>
                    <span className="tech-cap-code">{pillar.specCode}</span>
                  </div>

                  <h3 className="tech-cap-title">{pillar.title}</h3>
                  <p className="tech-cap-body">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
