import { achievements } from "../data/content";

/**
 * Achievements — Trophy Shelf.
 * Featured Diamond Award (large left) + 4 smaller cards with screenshots (right grid).
 * Yellow ONLY on rank pills.
 */
export default function Achievements() {
  const featured = achievements[0]; // Diamond Award
  const rest = achievements.slice(1);

  return (
    <div className="trophy-shelf">
      {/* Featured */}
      <article className="trophy-featured">
        <div className="trophy-featured-img">
          <img src={featured.image} alt={featured.title} />
          <div className="trophy-featured-overlay">
            <span className="trophy-rank">{featured.rank}</span>
          </div>
        </div>
        <div className="trophy-featured-body">
          <span className="trophy-eyebrow">FEATURED · highest honour</span>
          <h3>{featured.title}</h3>
          <p>{featured.sub}</p>
          {featured.date && <span className="trophy-date">{featured.date}</span>}
        </div>
      </article>

      {/* Grid of smaller — now each has a screenshot */}
      <div className="trophy-grid">
        {rest.map((a, i) => (
          <article key={i} className="trophy-card">
            {a.image && (
              <div className="trophy-card-img">
                <img src={a.image} alt={a.title} />
              </div>
            )}
            <div className="trophy-card-body">
              <span className="trophy-rank">{a.rank}</span>
              <h4>{a.title}</h4>
              <p>{a.sub}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
