import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--color-canvas-dark, #050D24)",
        color: "var(--color-text-on-dark, #FFFFFF)",
      }}
    >
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(8rem, 14vw, 11rem) var(--gutter-mobile, 1.25rem) clamp(5rem, 8vw, 7rem)",
        }}
      >
        <div
          className="page-container"
          style={{
            maxWidth: "760px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <span
            className="type-metadata"
            style={{ color: "var(--color-brand-cyan, #00D1FF)" }}
          >
            404 / PAGE NOT FOUND
          </span>
          <h1
            className="type-heading-1"
            style={{ color: "var(--color-text-on-dark, #FFFFFF)" }}
          >
            This horizon could not be found.
          </h1>
          <p
            className="type-body-lg"
            style={{
              color: "var(--color-text-secondary-on-dark, #A9B7D0)",
              maxWidth: "52ch",
            }}
          >
            The page you requested may have moved or does not exist. Explore our work,
            services, or return to the AFAQO homepage.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1rem",
              marginTop: "0.5rem",
            }}
          >
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.85rem 1.75rem",
                borderRadius: "var(--radius-pill, 9999px)",
                backgroundColor: "var(--color-brand-blue, #0866FF)",
                color: "#FFFFFF",
                fontWeight: 500,
                fontSize: "0.95rem",
              }}
            >
              Return Home
            </Link>
            <Link
              href="/work"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.85rem 1.75rem",
                borderRadius: "var(--radius-pill, 9999px)",
                border: "1px solid rgba(255, 255, 255, 0.22)",
                color: "#FFFFFF",
                fontWeight: 500,
                fontSize: "0.95rem",
              }}
            >
              Explore Our Work
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
