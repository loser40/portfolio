import { useEffect, useRef, useState } from "react";
import { experience } from "../data/content";

const AUTOPLAY_DELAY = 2200;

/**
 * Experience — The Long Voyage.
 * Clean interactive timeline that fits the dark cosmic theme.
 *
 * Layout:
 *   LEFT  — Vertical journey list (clickable checkpoints with cyan accent)
 *   RIGHT — Detail card that updates when a checkpoint is clicked
 *
 * No copyrighted characters. Just clean cyan-violet space aesthetic.
 */
export default function Experience() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const listRef = useRef(null);
  const stopRefs = useRef([]);
  const resumeTimerRef = useRef(null);
  const stop = experience[active];

  useEffect(() => {
    if (paused || experience.length <= 1) return undefined;

    const interval = setInterval(() => {
      setActive((current) => (current + 1) % experience.length);
    }, AUTOPLAY_DELAY);

    return () => clearInterval(interval);
  }, [paused]);

  useEffect(() => {
    const list = listRef.current;
    const node = stopRefs.current[active];
    if (!list || !node) return;

    if (active === 0) {
      list.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const nextTop = node.offsetTop - list.clientHeight / 2 + node.clientHeight / 2;
    list.scrollTo({ top: Math.max(0, nextTop), behavior: "smooth" });
  }, [active]);

  const selectStop = (index) => {
    setActive(index);
    setPaused(true);
    window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => setPaused(false), AUTOPLAY_DELAY);
  };

  useEffect(() => () => window.clearTimeout(resumeTimerRef.current), []);

  return (
    <div className="lv-wrap">
      <div className="lv-grid">
        {/* LEFT — Journey checkpoints */}
        <div
          className="lv-list"
          ref={listRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="lv-list-head">
            <span className="lv-head-label">TERRA INCOGNITA</span>
            <span className="lv-head-compass">N · S · E · W</span>
          </div>

          {/* Connecting line */}
          <div className="lv-line" />

          <div className="lv-stops">
            {experience.map((e, i) => {
              const isActive = i === active;
              const isPast = i < active;
              return (
                <button
                  key={e.id}
                  ref={(node) => { stopRefs.current[i] = node; }}
                  className={`lv-stop ${isActive ? "active" : ""} ${isPast ? "past" : ""} ${e.isHere ? "is-here" : ""}`}
                  onClick={() => selectStop(i)}
                >
                  <span className="lv-stop-lv">Lv. {e.level}</span>

                  {/* Cyan node */}
                  <span className="lv-stop-node">
                    <span className="lv-node-core" />
                    <span className="lv-node-ring" />
                  </span>

                  <span className="lv-stop-info">
                    <span className="lv-stop-name">{e.name}</span>
                    <span className="lv-stop-period">{e.period}</span>
                  </span>

                  {e.isHere && <span className="lv-stop-here">YOU ARE HERE</span>}
                </button>
              );
            })}

            {/* Mystery / what's next */}
            <div className="lv-mystery">
              <span className="lv-mystery-icon">?</span>
              <span>What's next?</span>
            </div>
          </div>
        </div>

        {/* RIGHT — Detail card */}
        <div className="lv-detail-col">
          <span className="lv-detail-eyebrow">CAMPSITES ALONG THE TRAIL</span>

          <article className="lv-card" key={active}>
            <div className="lv-card-head">
              <span className="lv-card-tag">CHECKPOINT</span>
              <span className="lv-card-lv">Lv. {stop.level}</span>
            </div>

            <h3 className="lv-card-title">
              {stop.name}{stop.starred && " 🏆"}
            </h3>

            <p className="lv-card-role">{stop.role}</p>
            <p className="lv-card-period">{(stop.period || "").toUpperCase()}</p>

            <div className="lv-card-divider" />

            <p className="lv-card-summary">{stop.summary}</p>

            <div className="lv-card-tags">
              {stop.stack.slice(0, 5).map((s) => (
                <span key={s} className="lv-card-stack-tag">{s}</span>
              ))}
            </div>

            {stop.link && !stop.link.startsWith("#") && (
              <a href={stop.link} target="_blank" rel="noreferrer" className="lv-card-link">
                {stop.link.replace("https://", "")} <span>↗</span>
              </a>
            )}
          </article>

          {/* Active marker */}
          <div className="lv-status-bar">
            <span className="lv-status-dot" />
            <div className="lv-status-text">
              <strong>VOYAGE PROGRESS</strong>
              <span>{active + 1} of {experience.length} stops · currently at {stop.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom quote */}
      <div className="lv-quote">
        <span className="lv-quote-mark">❝</span>
        <span className="lv-quote-text">Time is just a ride. The journey is what makes it legendary.</span>
        <span className="lv-quote-spark">✦</span>
      </div>
    </div>
  );
}
