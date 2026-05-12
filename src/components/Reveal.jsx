import { useEffect, useRef, useState } from "react";

/**
 * Reveal — Wraps children with a fade-in-up animation that triggers
 * when the element scrolls into view (IntersectionObserver).
 * Used throughout the site for the "time-loop discovery" feel.
 */
export default function Reveal({ children, delay = 0, as = "div", once = true }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            if (once) obs.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [once]);

  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "visible" : ""}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}
