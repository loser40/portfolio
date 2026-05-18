import { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import TimeTunnelScene from "./components/TimeTunnelScene";
import PlayScreen from "./components/PlayScreen";
import CharacterSheet from "./components/CharacterSheet";
import Achievements from "./components/Achievements";
import Experience from "./components/Experience";
import ProjectsList from "./components/ProjectsList";
import Connect from "./components/Connect";
import Reveal from "./components/Reveal";
import { assetPath } from "./utils/assets";
import "./App.css";

export default function App() {
  const scrollRef = useRef(null);
  const audioRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false); // true after passing hero
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const handleScroll = () => {
      const el = scrollRef.current;
      if (!el) return;
      const maxScroll = el.scrollHeight - el.clientHeight;
      const progress = el.scrollTop / maxScroll;
      setScrollProgress(progress);
      // Show navbar after scrolling past 30% of hero (~30vh)
      setScrolled(el.scrollTop > el.clientHeight * 0.3);
    };
    const el = scrollRef.current;
    el?.addEventListener("scroll", handleScroll, { passive: true });
    return () => el?.removeEventListener("scroll", handleScroll);
  }, [started]);

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el && scrollRef.current) {
      scrollRef.current.scrollTo({
        top: el.offsetTop - 60,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="app-root">
      <audio ref={audioRef} src={assetPath("/audio/doraemon.mp4")} loop preload="auto" />

      {!started ? (
        <PlayScreen audioRef={audioRef} onPlay={() => setStarted(true)} />
      ) : (
        <>
          {/* Fixed 3D canvas */}
          <div className="canvas-bg">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 60 }}
              gl={{ antialias: true, alpha: true }}
            >
              <TimeTunnelScene scrollProgress={scrollProgress} />
            </Canvas>
          </div>

          {/* Sticky nav pill — fades in only after scroll */}
          <nav className={`top-nav ${scrolled ? "visible" : ""}`}>
            <button onClick={() => scrollTo("about")}>About</button>
            <button onClick={() => scrollTo("experience")}>Experience</button>
            <button onClick={() => scrollTo("projects")}>Projects</button>
            <button onClick={() => scrollTo("connect")}>Connect</button>
          </nav>

          {/* Mute toggle — always visible at top right */}
          <button
            className={`mute-btn ${muted ? "muted" : ""}`}
            onClick={toggleMute}
            aria-label={muted ? "unmute music" : "mute music"}
            title={muted ? "Unmute music" : "Mute music"}
          >
            {muted ? "🔇" : "🔊"}
          </button>

          {/* Scrollable content */}
          <div className="scroll-container" ref={scrollRef}>
            {/* Hero — clean, reduced glow */}
            <section className="section hero-section">
              <Reveal delay={300}>
                <p className="hero-eyebrow">⌬ a journey through time</p>
              </Reveal>
              <Reveal delay={600}>
                <h1 className="hero-title">
                  Two builders.<br />
                  <span className="gradient-text">One time machine.</span>
                </h1>
              </Reveal>
              <Reveal delay={1100}>
                <p className="hero-sub">scroll to discover →</p>
              </Reveal>
              <Reveal delay={1500}>
                <button className="hero-cta" onClick={() => scrollTo("about")}>
                  venture forth ↓
                </button>
              </Reveal>
              <div className="scroll-hint">
                <span className="scroll-arrow">↓</span>
                <span>Scroll</span>
              </div>
            </section>

            {/* About */}
            <section id="about" className="section about-section">
              <div className="glass-card wide">
                <Reveal>
                  <span className="section-tag">001 — About</span>
                </Reveal>
                <Reveal delay={120}>
                  <h2>Character<br /><span className="grad-cyan">Sheet</span></h2>
                </Reveal>
                <Reveal delay={240}>
                  <p className="section-sub">two builders. one time machine. tap a tab to switch.</p>
                </Reveal>
                <Reveal delay={360}>
                  <CharacterSheet />
                </Reveal>
              </div>
            </section>

            {/* Achievements / Trophy Shelf */}
            <section className="section achv-section">
              <div className="glass-card wide">
                <Reveal>
                  <span className="section-tag">002 — Achievements Unlocked</span>
                </Reveal>
                <Reveal delay={120}>
                  <h2>Trophy<br /><span className="grad-yellow">Shelf</span></h2>
                </Reveal>
                <Reveal delay={240}>
                  <p className="section-sub">real wins. real moments. real proof.</p>
                </Reveal>
                <Reveal delay={360}>
                  <Achievements />
                </Reveal>
              </div>
            </section>

            {/* Experience */}
            <section id="experience" className="section exp-section">
              <div className="glass-card wide">
                <Reveal>
                  <span className="section-tag">003 — Journey So Far</span>
                </Reveal>
                <Reveal delay={120}>
                  <h2>The<br /><span className="grad-cyan">Long Voyage</span></h2>
                </Reveal>
                <Reveal delay={240}>
                  <p className="section-sub">every stop a story. every project a relic. tap a checkpoint to explore.</p>
                </Reveal>
                <Reveal delay={360}>
                  <Experience />
                </Reveal>
              </div>
            </section>

            {/* Projects */}
            <section id="projects" className="section proj-section">
              <div className="glass-card wide">
                <Reveal>
                  <span className="section-tag">004 — Quest Log</span>
                </Reveal>
                <Reveal delay={120}>
                  <h2>Things<br /><span className="grad-cyan">We've Shipped</span></h2>
                </Reveal>
                <Reveal delay={240}>
                  <p className="section-sub">real products. real users. real bugs at 2am.</p>
                </Reveal>
                <Reveal delay={360}>
                  <ProjectsList />
                </Reveal>
              </div>
            </section>

            {/* Connect */}
            <section id="connect" className="section contact-section">
              <div className="glass-card wide center">
                <Reveal>
                  <span className="section-tag">005 — Treasure Found</span>
                </Reveal>
                <Reveal delay={120}>
                  <h2>Let's<br /><span className="grad-cyan">Connect</span></h2>
                </Reveal>
                <Reveal delay={240}>
                  <p className="section-sub">take what you need, adventurer.</p>
                </Reveal>
                <Reveal delay={360}>
                  <Connect />
                </Reveal>
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
