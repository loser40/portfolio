import { useState } from "react";
import { characters } from "../data/content";
import Spotlight from "./Spotlight";

/**
 * CharacterSheet — Manual tab switching between Dipak/Sagar.
 * No auto-scroll switching (removed — was behaving abnormally).
 */
export default function CharacterSheet() {
  const [active, setActive] = useState("dipak");
  const me = characters[active];

  return (
    <div className="char-sheet">
      <div className="cs-tabs">
        <button
          className={`cs-tab ${active === "dipak" ? "active" : ""}`}
          onClick={() => setActive("dipak")}
        >
          <img src={characters.dipak.photo} alt="" />
          <span>Dipak</span>
          <span className="cs-tab-lv">Lv.{characters.dipak.level}</span>
        </button>
        <span className="cs-vs">VS</span>
        <button
          className={`cs-tab ${active === "sagar" ? "active" : ""}`}
          onClick={() => setActive("sagar")}
        >
          <img src={characters.sagar.photo} alt="" />
          <span>Sagar</span>
          <span className="cs-tab-lv">Lv.{characters.sagar.level}</span>
        </button>
      </div>

      <div className="cs-body" key={active}>
        <div className="cs-grid">
          <div className="cs-portrait-col">
            <div className="cs-portrait-frame">
              <Spotlight
                base={me.photo}
                reveal={me.photoAnime || me.photo}
                alt={me.name}
              />
            </div>
            <div className="cs-portrait-meta">
              <h3>{me.name}</h3>
              <p>{me.role}</p>
              <span className="cs-lv-badge">Lv. {me.level}</span>
            </div>
          </div>

          <div className="cs-info">
            <div className="cs-badge">📜 {me.badge}</div>
            <div className="cs-bio">
              {me.bio.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <div className="cs-section">
              <span className="cs-label">Skills · honest levels</span>
              <div className="cs-skills">
                {me.skills.map((s) => <SkillBar key={s.name} skill={s} />)}
              </div>
            </div>
            <div className="cs-section">
              <span className="cs-label">Traits</span>
              <div className="cs-traits">
                {me.traits.map((t) => (
                  <span key={t} className="cs-trait">{t}</span>
                ))}
              </div>
            </div>
            <a className="cs-github" href={me.github} target="_blank" rel="noreferrer">
              {me.github.replace("https://", "")} ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillBar({ skill }) {
  const pct = (skill.lv / 10) * 100;
  let color = "#475569";
  if (skill.lv >= 9) color = "#06b6d4";
  else if (skill.lv >= 7) color = "#22d3ee";
  else if (skill.lv >= 5) color = "#a5b4fc";
  else if (skill.lv >= 3) color = "#64748b";

  return (
    <div className="sb">
      <div className="sb-row">
        <span className="sb-name">{skill.name}</span>
        <span className="sb-lv" style={{ color }}>Lv.{skill.lv}<span className="sb-max">/10</span></span>
      </div>
      <div className="sb-track">
        <div className="sb-fill" style={{
          width: `${pct}%`,
          background: `linear-gradient(90deg, ${color}55, ${color})`,
        }} />
      </div>
      {skill.sub && <span className="sb-sub">— {skill.sub}</span>}
    </div>
  );
}
