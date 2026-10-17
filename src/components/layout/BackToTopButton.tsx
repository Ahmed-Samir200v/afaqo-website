"use client";

export function BackToTopButton() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="site-footer__back-to-top"
      aria-label="Back to top of page"
    >
      <span>Back to top</span>
      <span aria-hidden="true" className="site-footer__back-to-top-arrow">
        ↑
      </span>
    </button>
  );
}
