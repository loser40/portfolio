import { projects, sideQuests } from "../data/content";

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

/**
 * Projects — Big project cards with screenshots (like shubham I/II/III)
 * + Side Quests grid below.
 */
export default function ProjectsList() {
  return (
    <div className="proj-wrap">
      {/* Main projects */}
      <div className="proj-main">
        {projects.map((p, i) => (
          <article key={p.id} className="proj-card">
            <div className="proj-roman">{ROMAN[i]}</div>
            <div className="proj-img-wrap">
              <img src={p.image} alt={p.title} loading="lazy" />
            </div>
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
