import { useRef, useEffect } from "react";

/**
 * Spotlight — Cursor-based reveal of an anime image over a real photo.
 *
 * Layered:
 *   .spot-base   (real photo, bottom)
 *   .spot-reveal (anime, top, masked by radial-gradient at cursor)
 *   .spot-ring   (soft cyan glow at the cursor edge)
 *   .spot-hint   (label, fades on hover)
 *
 * Performance:
 *   - Native mousemove + touchmove listeners (reliable across browsers/tests)
 *   - requestAnimationFrame loop runs only while active
 *   - CSS variables updated directly on the wrapper (no React re-render per frame)
 *   - GPU-accelerated mask-image
 */
export default function Spotlight({
  base,
  reveal,
  alt = "",
  radius = 95,
  feather = 50,
}) {
  const wrapRef = useRef(null);
  const ringRef = useRef(null);
  const stateRef = useRef({
    tx: 0.5, ty: 0.5,        // target (0..1)
    cx: 0.5, cy: 0.5,        // current (lerped)
    alpha: 0,                // current alpha (0..1)
    targetAlpha: 0,          // target alpha
    raf: null,
    touchTimeout: null,
    rect: null,              // cached bounding rect
  });

  useEffect(() => {
    const wrap = wrapRef.current;
    const ring = ringRef.current;
    if (!wrap || !ring) return;

    // Set initial CSS vars
    wrap.style.setProperty("--sx", "50%");
    wrap.style.setProperty("--sy", "50%");
    wrap.style.setProperty("--sa", "0");

    const s = stateRef.current;

    const updateRect = () => { s.rect = wrap.getBoundingClientRect(); };
    updateRect();

    // Animation loop — runs continuously, but is cheap when idle
    const tick = () => {
      // Smooth lerp
      s.cx += (s.tx - s.cx) * 0.22;
      s.cy += (s.ty - s.cy) * 0.22;
      s.alpha += (s.targetAlpha - s.alpha) * 0.14;

      const px = (s.cx * 100).toFixed(2);
      const py = (s.cy * 100).toFixed(2);
      wrap.style.setProperty("--sx", `${px}%`);
      wrap.style.setProperty("--sy", `${py}%`);
      wrap.style.setProperty("--sa", s.alpha.toFixed(3));

      if (s.rect) {
        const rx = s.cx * s.rect.width;
        const ry = s.cy * s.rect.height;
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${0.45 + s.alpha * 0.55})`;
        ring.style.opacity = s.alpha;
      }

      s.raf = requestAnimationFrame(tick);
    };
    s.raf = requestAnimationFrame(tick);

    // Native event handlers
    const onMove = (e) => {
      if (!s.rect) updateRect();
      const cx = e.clientX;
      const cy = e.clientY;
      const r = s.rect;
      const x = (cx - r.left) / r.width;
      const y = (cy - r.top) / r.height;
      // Clamp
      s.tx = Math.max(0, Math.min(1, x));
      s.ty = Math.max(0, Math.min(1, y));
      // Activate if cursor is inside
      const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
      s.targetAlpha = inside ? 1 : 0;
    };

    const onEnter = (e) => {
      updateRect();
      s.targetAlpha = 1;
      onMove(e);
    };

    const onLeave = () => {
      s.targetAlpha = 0;
    };

    const onTouch = (e) => {
      updateRect();
      const t = e.touches?.[0] || e.changedTouches?.[0];
      if (!t) return;
      const r = s.rect;
      s.tx = Math.max(0, Math.min(1, (t.clientX - r.left) / r.width));
      s.ty = Math.max(0, Math.min(1, (t.clientY - r.top) / r.height));
      s.targetAlpha = 1;
      clearTimeout(s.touchTimeout);
      s.touchTimeout = setTimeout(() => { s.targetAlpha = 0; }, 2500);
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mouseleave", onLeave);
    wrap.addEventListener("touchstart", onTouch, { passive: true });
    wrap.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, { passive: true, capture: true });

    return () => {
      cancelAnimationFrame(s.raf);
      clearTimeout(s.touchTimeout);
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseenter", onEnter);
      wrap.removeEventListener("mouseleave", onLeave);
      wrap.removeEventListener("touchstart", onTouch);
      wrap.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect, true);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="spotlight"
      style={{
        "--sr": `${radius}px`,
        "--sf": `${radius + feather}px`,
      }}
    >
      <img className="spot-base" src={base} alt={alt} draggable="false" />
      <img
        className="spot-reveal"
        src={reveal}
        alt=""
        aria-hidden="true"
        draggable="false"
      />
      <div ref={ringRef} className="spot-ring" />
      <div className="spot-hint">
        <span>✦ HOVER TO REVEAL</span>
      </div>
    </div>
  );
}
