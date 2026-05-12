import { useState, useRef, useEffect } from "react";
import { connect, closingQuote } from "../data/content";

export default function Connect() {
  const [openCard, setOpenCard] = useState(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpenCard(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isMerged = (c) => c.isInstagramMerged || c.isGithubMerged || c.isResumeMerged;

  const handleCardClick = (c, e) => {
    if (isMerged(c)) {
      e.preventDefault();
      setOpenCard(openCard === c.title ? null : c.title);
    }
  };

  const chooserLabel = (c) => {
    if (c.isResumeMerged) return "Download resume";
    return "Choose profile";
  };

  return (
    <div className="conn-wrap" ref={wrapRef}>
      <div className="conn-grid">
        {connect.map((c) => (
          <div key={c.title} className="conn-card-wrap">
            <a
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : "_self"}
              rel="noreferrer"
              className={`conn-card ${c.href === "#" ? "is-placeholder" : ""} ${isMerged(c) ? "is-merged" : ""} ${openCard === c.title ? "is-active" : ""}`}
              onClick={(e) => handleCardClick(c, e)}
            >
              <div className="conn-icon">
                <Icon name={c.icon} />
              </div>
              <h3>{c.title}</h3>
              <p>{c.sub}</p>
              <span className="conn-cta">
                {c.cta} {isMerged(c) ? (openCard === c.title ? "↑" : "↓") : "→"}
              </span>
            </a>

            {isMerged(c) && openCard === c.title && (
              <div className="ig-chooser">
                <span className="ig-chooser-title">{chooserLabel(c)}</span>
                {c.options.map((opt) => (
                  <a
                    key={opt.name}
                    href={opt.href}
                    target="_blank"
                    rel="noreferrer"
                    className="ig-option"
                    download={c.isResumeMerged ? true : undefined}
                  >
                    <span className="ig-name">{opt.name}</span>
                    <span className="ig-handle">{opt.handle}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="closing-quote">
        {closingQuote.split("\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}
        <span className="closing-sign">— Dipak &amp; Sagar · still climbing —</span>
      </div>

      <div className="campfire">🔥</div>
      <p className="adventure-end">the adventure never ends.</p>
    </div>
  );
}

function Icon({ name }) {
  switch (name) {
    case "github":
      return (
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
          <path d="M12 .5C5.4.5 0 5.9 0 12.5c0 5.3 3.4 9.7 8.2 11.3.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2.9-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6C20.6 22.2 24 17.8 24 12.5 24 5.9 18.6.5 12 .5z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
          <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.5 19h-3v-9h3v9zm-1.5-10.27c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75c.97 0 1.75.78 1.75 1.75s-.78 1.76-1.75 1.76zm13 10.27h-3v-4.74c0-1.13-.02-2.59-1.58-2.59-1.58 0-1.82 1.23-1.82 2.51v4.82h-3v-9h2.88v1.23h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v4.74z"/>
        </svg>
      );
    case "resume":
      return (
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" y1="13" x2="16" y2="13" />
          <line x1="8" y1="17" x2="13" y2="17" />
        </svg>
      );
    default:
      return <span style={{ fontSize: 26 }}>✦</span>;
  }
}
