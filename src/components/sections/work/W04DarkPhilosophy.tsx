import styles from "./Work.module.css";

const NODES = [
  "IDEAS",
  "DESIGN",
  "3D PRODUCTION",
  "TECHNOLOGY",
  "REAL EXPERIENCES",
];

export function W04DarkPhilosophy() {
  return (
    <section className={styles.philosophySection} aria-labelledby="philosophy-heading">
      <div className="page-container">
        <div className={styles.philosophyGrid}>
          {/* Left Column: Strategic Narrative */}
          <div>
            <div className={styles.philosophyEyebrow}>
              <span>04 / APPROACH</span>
              <span className={styles.philosophyEyebrowLine} aria-hidden="true" />
            </div>

            <h2 id="philosophy-heading" className={styles.philosophyHeading}>
              Different challenges.
              <br />
              <span className={styles.philosophyCyan}>One connected approach.</span>
            </h2>

            <p className={styles.philosophyBody}>
              We combine creative thinking, 3D craftsmanship, and real-time
              technology to turn complex ideas into intuitive, immersive
              experiences — connecting concept to experience, end to end.
            </p>
          </div>

          {/* Right Column: Architectural Flow Diagram */}
          <div>
            <div className={styles.diagramContainer}>
              {NODES.map((node) => (
                <div key={node} className={styles.diagramNode}>
                  <span className={styles.diagramDot} aria-hidden="true" />
                  <span>{node}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
