import { useEffect, useRef } from "react";
import { assetPath } from "../utils/assets";

/**
 * PlayScreen — Black bg + yellow rectangle PLAY button.
 * Plays minecraft click sound on press, then starts music with soothing fade.
 */

// ════════════════════════════════════════════════════════════════
//  🎵 BACKGROUND MUSIC CONFIG
//  To remove the background music in the future:
//    1. Delete the file: /public/audio/doraemon.mp4
//    2. Set MUSIC_ENABLED = false below
//    3. Done — no music will play
// ════════════════════════════════════════════════════════════════
const MUSIC_ENABLED = false;
const MUSIC_SRC = assetPath("/audio/doraemon.mp4");
// ════════════════════════════════════════════════════════════════

export default function PlayScreen({ onPlay, audioRef }) {
  const clickRef = useRef(null);

  useEffect(() => {
    // Preload the click sound
    clickRef.current = new Audio(assetPath("/audio/click.mp3"));
    clickRef.current.volume = 0.6;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handlePlay = async () => {
    // Play minecraft click sound immediately
    try {
      if (clickRef.current) {
        clickRef.current.currentTime = 0;
        await clickRef.current.play();
      }
    } catch (e) {
      console.warn("click sound blocked:", e);
    }

    // Start background music with soothing fade-in
    if (MUSIC_ENABLED && audioRef?.current) {
      try {
        audioRef.current.volume = 0;
        await audioRef.current.play();
        // Soothing ease-out fade over 6 seconds, max 0.25
        const target = 0.25;
        const duration = 6000;
        const steps = 60;
        const interval = duration / steps;
        let i = 0;
        const fade = setInterval(() => {
          i++;
          const t = i / steps;
          const eased = 1 - Math.pow(1 - t, 3);
          if (audioRef.current) audioRef.current.volume = Math.min(target, target * eased);
          if (i >= steps) clearInterval(fade);
        }, interval);
      } catch (e) {
        console.warn("audio blocked:", e);
      }
    }

    // Small delay so click sound plays before transition
    setTimeout(() => onPlay?.(), 150);
  };

  return (
    <div className="play-screen">
      <button className="yellow-play-btn" onClick={handlePlay}>
        <span className="yp-arrow">▶</span>
        <span className="yp-label">PLAY</span>
      </button>
    </div>
  );
}
