import { useEffect, useRef, useState } from "react";
import { projects, sideQuests } from "../data/content";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

/**
 * Projects — Auto-scrolling carousel with loop
 * + Side Quests grid below.
 */
export default function ProjectsList() {
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollSpeed = 0.5; // pixels per frame

    const scroll = () => {
      const loopPoint = container.scrollWidth / 2;
      const nextScroll = container.scrollLeft + scrollSpeed;

      if (nextScroll >= loopPoint) {
        container.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      container.scrollLeft = nextScroll;
    };

    const start = () => {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(scroll, 16); // ~60fps
      }
    };

    const stop = () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };

    start();

    container.addEventListener("mouseenter", stop);
    container.addEventListener("mouseleave", start);

    return () => {
      stop();
      container.removeEventListener("mouseenter", stop);
      container.removeEventListener("mouseleave", start);
    };
  }, []);

  return (
    <div className="proj-wrap">
      {/* Main projects - Auto scrolling */}
      <div className="proj-main" ref={scrollRef}>
        {/* Render projects twice for seamless loop */}
        {[...projects, ...projects].map((p, i) => (
          <article key={`${p.id}-${i}`} className="proj-card">
            <div className="proj-roman">{ROMAN[i % projects.length]}</div>
            <ProjectImage project={p} />
            <div className="proj-info">
              <h3>{p.title}</h3>
              <p className="proj-summary">{p.summary}</p>
              <div className="proj-stack">
                {p.stack.map((s) => <span key={s}>{s}</span>)}
              </div>
              {p.link && (
                <a href={p.link} target="_blank" rel="noreferrer" className="proj-link">
                  Link ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Side quests */}
      <div className="sq-section">
        <h3 className="sq-heading">Side Quests</h3>
        <div className="sq-grid">
          {sideQuests.map((s, i) => (
            <article key={i} className="sq-card">
              <span className="sq-tag">Side Quest</span>
              <h4>{s.title}</h4>
              <p>{s.summary}</p>
              <div className="sq-stack">
                {s.stack.map((t) => <span key={t}>{t}</span>)}
              </div>
              {s.link && (
                <a href={s.link} target="_blank" rel="noreferrer" className="sq-link">
                  Visit ↗
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectImage({ project }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const initials = project.title
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <div className={`proj-img-wrap ${loaded ? "is-loaded" : ""} ${failed ? "has-error" : ""}`}>
      {!loaded && !failed && <div className="proj-img-skeleton" aria-hidden="true" />}

      {!failed ? (
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="proj-img-fallback" role="img" aria-label={`${project.title} preview unavailable`}>
          <span>{initials}</span>
          <strong>Preview loading</strong>
        </div>
      )}
    </div>
  );
}
