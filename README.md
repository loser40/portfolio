# Time Tunnel Portfolio

A Doraemon-style time-machine portfolio for **Dipak Dhurve** & **Sagar Mankar**.
Single scrollable page. Time machine in 3D background. Glass cards float over the tunnel as you scroll. Cursor spotlight reveals an anime version of each character.

Inspired by shubhamgl.com's structure (Hero → About → Achievements → Experience → Projects → Connect), built on a dark cosmic theme with strict palette rules (cyan accent, yellow ONLY for trophy badges).

---

## ✨ Features

- 🎮 **PLAY screen** with yellow rectangle button (matches reference)
- 🎵 **Soothing music fade-in** — starts at 0 vol, ramps to 0.25 over 6 seconds
- 🌀 **3D time tunnel** — your original Three.js scene preserved exactly
- 🧭 **Smart navbar** — hidden on hero, fades in only after scrolling
- 👥 **Character Sheet** — Dipak/Sagar tabs with honest skill levels (Bluelock vibes)
- 🖱️ **Cursor Spotlight** — hover the portrait to reveal an anime version of you
- 🏆 **Trophy Shelf** — featured Diamond Award + grid of other wins
- 🗺️ **Long Voyage** — Sanghx → Eatlo → Tabey → Cyber Raksha v1+v2 → Sankalp → Pashu Raksha → Now
- 📦 **Quest Log** — real project screenshots
- 🤝 **Let's Connect** — GitHub × 2, Instagram × 2, LinkedIn (placeholder), Resume PDF
- 📄 **Auto-generated resume.pdf** — included, ready to download

---

## 🚀 Deploy in 10 seconds

### Option 1 — Netlify Drop (no signup, no setup)
1. Unzip
2. Open https://app.netlify.com/drop
3. Drag the `dist/` folder onto the page
4. ✅ Live URL

### Option 2 — Vercel
1. Open https://vercel.com/new
2. Drag the `dist/` folder
3. ✅ Live URL

### Option 3 — Local dev
```bash
npm install
npm run dev
```
Open `http://localhost:5173`.

To rebuild for deploy: `npm run build` → drag the new `dist/` folder.

---

## ✏️ Editing content

99% of changes happen in **one file**: `src/data/content.js`

Open it. You'll see:
- `characters` — Dipak/Sagar bios + skills + traits
- `achievements` — Diamond Award + other wins (the rank pills)
- `experience` — chronological journey nodes
- `projects` — main projects with screenshots
- `sideQuests` — smaller things
- `connect` — Let's Connect cards
- `closingQuote` — the final line

Save → Vite hot-reloads.

---

## 🖼 Replacing photos

Drop new files in these locations (keep filenames the same):
```
public/characters/dipak.jpg              ← your real photo
public/characters/dipak-anime.png        ← anime version (for spotlight)
public/characters/sagar.jpg
public/characters/sagar-anime.png
public/achievements/diamond-award.jpg    ← trophy photo
public/projects/sanghx.png
public/projects/eatlo.png
public/projects/cyberraksha.png
public/projects/pashuraksha.png
public/machine.png                       ← time machine 3D plane
public/audio/doraemon.mp4                ← background music
public/resume.pdf                        ← downloadable resume
```

---

## 🎙️ Optional: Voice cloning (ElevenLabs)

Currently disabled (would have cost $) but the proxy is scaffolded at `api/tts.js`.
To enable later: see `.env.example` for setup steps.

---

we're not great. but we're still doing it.
luck isn't there. but hard work is — 100 percent. and more.

— Dipak & Sagar · still climbing
