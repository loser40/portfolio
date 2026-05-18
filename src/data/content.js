// ════════════════════════════════════════════════════
//  TimeTunnel Portfolio · Real content
//  Edit this file to update bio, skills, projects, etc.
// ════════════════════════════════════════════════════

// ── CHARACTER SHEETS ──
import { assetPath } from "../utils/assets";

export const characters = {
  dipak: {
    name: "Dipak Dhurve",
    role: "Builder · Still chasing",
    level: 7,
    photo: assetPath("/characters/dipak.jpg"),
    photoAnime: assetPath("/characters/dipak-anime.png"),
    badge: "Polytechnic 2nd Year · Diploma Engineering",
    bio: [
      "I'm Dipak. Polytechnic 2nd year at BKIT (SAKOLI). Newer to this game than Sagar.",
      "I built sanghx.in, helped ship cyber raksha v1+v2, dropped pashu raksha in 24 hours.",
      "I'm not perfect. I just build. I'm still learning the basics deeper every week.",
      "Sagar's ahead of me. I'm chasing.  — we're trying to devour each other and the giants ahead of us.",
    ],
    skills: [
      { name: "Java",                 lv: 5 },
      { name: "C++",                  lv: 5 },
      { name: "JavaScript",           lv: 6 },
      { name: "HTML",                 lv: 7 },
      { name: "CSS",                  lv: 6 },
      { name: "React",                lv: 4, sub: "learning" },
      { name: "Three.js",             lv: 3, sub: "just started" },
      { name: "Assembly",             lv: 2, sub: "little knowledge" },
      { name: "Real-world projects",  lv: 3, sub: "from shipping real shit" },
      { name: "Critical thinking",    lv: 10, sub: "this is my edge" },
      { name: "Logical thinking",     lv: 10, sub: "this is my edge" },
    ],
    traits: ["Adaptive", "Hungry", "Always 100%+"],
    github: "https://github.com/dipakdhurve9975-lgtm",
  },
  sagar: {
    name: "Sagar Mankar",
    role: "Logic-first · Security-leaning · Senpai",
    level: 20,
    photo: assetPath("/characters/sagar.jpg"),
    photoAnime: assetPath("/characters/sagar-anime.png"),
    badge: "Polytechnic 2nd Year · Diploma Engineering",
    bio: [
      "I'm Sagar.  Polytechnic 2nd year at BKIT (SAKOLI). Been in this game longer.",
      "I lean security and logic. Cyber raksha was my home turf.",
      "Strong on basics — Java, C++, low-level,c++(DSA). Honest about what I'm still figuring out.",
      ".Catching up fast. We're both trying to overtake each other — that's how we both get better.",
    ],
    skills: [
      { name: "Java",                 lv: 8 },
      { name: "C++",                  lv: 8 },
      { name: "C",                    lv: 7 },
      { name: "JavaScript",           lv: 7 },
      { name: "HTML",                 lv: 8 },
      { name: "CSS",                  lv: 7 },
      { name: "Basic Assembly",       lv: 5 },
      { name: "Cyber security",       lv: 7, sub: "home turf" },
      { name: "DSA",                  lv: 7 },
      { name: "Logic & problem solving", lv: 9, sub: "this is my edge" },
    ],
    traits: ["Logic-first", "Security-leaning", "Patient builder"],
    github: "https://github.com/Sagarmankar123",
  },
};

// ── ACHIEVEMENTS UNLOCKED ──
export const achievements = [
  {
    rank: "1st",
    title: "Diamond Award",
    sub: "GHRSTU INNOVEX-26 · Tech Manthan · State-level Inter-polytechnic",
    date: "12 March 2026",
    image: assetPath("/achievements/diamond-award.jpg"),
  },
  {
    rank: "200+",
    title: "Real orders, no ads",
    sub: "sanghx.in · 20 days · word of mouth only",
    image: assetPath("/projects/sanghx-real.png"),
  },
  {
    rank: "Top 16",
    title: "Sankalp Bharat 2026",
    sub: "National hackathon · 800+ teams · Team PANDA · #16 rank",
    image: assetPath("/projects/sankalp-rank.png"),
  },
  {
    rank: "Launched",
    title: "Cyber Raksha v2",
    sub: "Gaikwad Patil Technofest · app + pc + web",
    image: assetPath("/projects/cyberraksha-real.png"),
  },
  {
    rank: "24h",
    title: "Pashu Raksha",
    sub: "offline AI cattle disease detection · built in 24 hours",
    image: assetPath("/projects/pashuraksha-real.jpg"),
  },
];

// ── EXPERIENCE / JOURNEY ──
// Real chronological journey. Each stop = clickable node like Shubham's map.
export const experience = [
  {
    id: "sanghx",
    short: "S",
    name: "Sanghx.in",
    level: 12,
    role: "First real product · Food delivery",
    period: "the start",
    summary: "Local food delivery startup. Built it. Launched it. Ran ops on WhatsApp. 200+ paying orders in 20 days. Zero rupees on ads — pure word of mouth. Real users, real money, real bugs at 2am.",
    stack: ["Next.js", "Firebase", "WhatsApp ops"],
    link: "#sanghx-url",
    accent: "#22d3ee",
  },
  {
    id: "eatlo",
    short: "E",
    name: "Eatlo.food",
    level: 13,
    role: "Helped a friend launch the same",
    period: "shortly after",
    summary: "Our friend wanted to do food delivery in his city. We helped him build eatlo.food. Same playbook, his hands now. Still expanding. Something big coming.",
    stack: ["React", "Firebase", "Tailwind"],
    link: "https://eatlo.food",
    accent: "#22d3ee",
  },
  {
    id: "tabey",
    short: "T",
    name: "Tabey.in",
    level: 14,
    role: "Sanghx v2 — paused, still alive",
    period: "the pause",
    summary: "Tabey.in — sanghx v2. Faster, cleaner, bigger. We were about to launch. Then stuff happened. Had to pause. Site's still live. We're not done with it.",
    stack: ["Next.js", "Firebase"],
    link: "#tabey-url",
    accent: "#67e8f9",
  },
  {
    id: "cyber-v1",
    short: "1",
    name: "Cyber Raksha v1",
    level: 15,
    role: "🏆 Diamond Award · 1st place state-level",
    period: "March 2026",
    summary: "First competition. GHRSTU INNOVEX-26. Cyber Raksha — security awareness app for people who don't know how to protect themselves. It's like a lock on a house. Not fully safe — we never claimed it was. But something is better than nothing. We won 1st place. Diamond Award.",
    stack: ["Android", "Kotlin"],
    link: "https://cyber-raksha.vercel.app",
    accent: "#fbbf24",
    starred: true,
  },
  {
    id: "cyber-v2",
    short: "2",
    name: "Cyber Raksha v2",
    level: 16,
    role: "Launched at Gaikwad Patil Technofest",
    period: "after the win",
    summary: "v1 won but had bugs. So we rebuilt it. v2 — better features, v1 bugs gone. Shipped as app + pc app + website. Site live, download links coming soon (in production).",
    stack: ["Android", "Kotlin", "PC App", "Web"],
    link: "https://cyber-raksha.vercel.app",
    accent: "#06b6d4",
  },
  {
    id: "sankalp",
    short: "N",
    name: "Sankalp Bharat",
    level: 17,
    role: "National hackathon · Top 16 · 800+ teams",
    period: "2026 · environment theme",
    summary: "Round 1 → top 100 (rank 31). Round 2 → 26. Round 3 → 16. IIIT won. But the industry-level judges actually listened to our pitch. They liked what we built. We're polytechnic kids — small college, diploma. Nobody expected us at that table. We still got there. Sometimes you win, sometimes you learn.",
    stack: ["Hackathon"],
    accent: "#67e8f9",
  },
  {
    id: "pashu",
    short: "P",
    name: "Pashu Raksha",
    level: 18,
    role: "Built in 24 hours · OFFLINE AI",
    period: "for sankalp bharat",
    summary: "Animal disease detection for farmers. App + website + offline AI model + offline chatbot. Yeah — offline. No internet needed. Named after Pashupatinath — Shiva, caretaker of all beings.",
    stack: ["AI", "Offline-first", "Mobile + Web"],
    link: "https://shiva-caretaker-app.lovable.app",
    accent: "#22d3ee",
  },
  {
    id: "now",
    short: "✕",
    name: "You are here",
    level: 19,
    role: "still building · still learning",
    period: "Today",
    summary: "Expanding eatlo. Cooking something new. Polytechnic 2nd year, still learning daily. We're not great. But we're doing it. Luck isn't there. But hard work is — 100 percent. And more.",
    stack: ["Now"],
    accent: "#06b6d4",
    isHere: true,
  },
];

// ── PROJECTS / QUEST LOG ──
// The big ones with screenshots
export const projects = [
  {
    id: "sanghx",
    title: "Sanghx.in",
    summary: "Local food delivery startup. 200+ orders in 20 days, zero rupees on ads. Built solo, launched solo, ran ops on WhatsApp. The first real product that taught me what shipping means.",
    stack: ["Next.js", "Firebase", "WhatsApp ops", "Tailwind"],
    image: assetPath("/projects/sanghx.png"),
    link: "#sanghx-url",
  },
  {
    id: "cyberraksha",
    title: "Cyber Raksha",
    summary: "India's AI cybersecurity platform — built for everyday people who don't know how to protect themselves. Won Diamond Award (state-level, GHRSTU INNOVEX-26). v2 launched at Gaikwad Patil Technofest.",
    stack: ["Android", "Kotlin", "PC App", "Next.js"],
    image: assetPath("/projects/cyberraksha.png"),
    link: "https://cyber-raksha.vercel.app",
  },
  {
    id: "pashu",
    title: "Pashu Raksha · PashuMitra",
    summary: "Offline AI cattle disease detection for farmers. Built in 24 hours for Sankalp Bharat. Edge AI mobile app — works without internet, in any language, for every farmer. Inspired by Pashupatinath.",
    stack: ["Edge AI", "Offline-first", "Multilingual"],
    image: assetPath("/projects/pashuraksha.png"),
    link: "https://shiva-caretaker-app.lovable.app",
  },
  {
    id: "eatlo",
    title: "Eatlo.food",
    summary: "Helped a friend launch the same food delivery playbook from sanghx in his city. Currently expanding. Something bigger coming.",
    stack: ["React", "Firebase", "Tailwind"],
    image: assetPath("/projects/eatlo.png"),
    link: "https://eatlo.food",
  },
];

// ── SIDE QUESTS ──
export const sideQuests = [
  {
    title: "Tabey.in",
    summary: "Sanghx v2. Faster, cleaner. Was about to launch — paused but site's still live. We'll come back to it.",
    stack: ["Next.js", "Firebase"],
    link: "#tabey-url",
  },
  {
    title: "Hackathon survival kit",
    summary: "Random utilities and scripts that helped during 24-hour builds. Half are still on a USB stick somewhere.",
    stack: ["Scripts"],
  },
  {
    title: "Auto-WhatsApp order parser",
    summary: "Quick script that reads sanghx WhatsApp orders and dumps them into a sheet. Saved hours every weekend.",
    stack: ["Python", "WhatsApp"],
  },
  {
    title: "AI prompt experiments",
    summary: "Months of trying to make Gemini/Claude actually do what I want. Notes, prompts, failures, wins.",
    stack: ["Gemini", "Claude"],
  },
];

// ── CONNECT (Let's Connect cards) — clean, strict palette ──
export const connect = [
  {
    icon: "github",
    title: "GitHub",
    sub: "our code & projects",
    cta: "Follow",
    href: "#github",
    isGithubMerged: true,
    options: [
      { name: "Dipak", handle: "dipakdhurve9975-lgtm", href: "https://github.com/dipakdhurve9975-lgtm" },
      { name: "Sagar", handle: "Sagarmankar123", href: "https://github.com/Sagarmankar123" },
    ],
  },
  {
    icon: "instagram",
    title: "Instagram",
    sub: "follow our journey",
    cta: "Follow",
    href: "#instagram",
    isInstagramMerged: true,
    options: [
      { name: "Dipak", handle: "@dipak.s.dhurve", href: "https://www.instagram.com/dipak.s.dhurve" },
      { name: "Sagar", handle: "@sg_sagar__", href: "https://www.instagram.com/sg_sagar__" },
    ],
  },
  {
    icon: "linkedin",
    title: "LinkedIn",
    sub: "coming soon",
    cta: "Connect",
    href: "#",
  },
  {
    icon: "resume",
    title: "Resume",
    sub: "full adventure log",
    cta: "Loot",
    href: "#resume",
    isResumeMerged: true,
    options: [
      { name: "Dipak Dhurve", handle: "Full-Stack Builder", href: assetPath("/resume-dipak.pdf") },
      { name: "Sagar Mankar", handle: "Security & Logic Dev", href: assetPath("/resume-sagar.pdf") },
    ],
  },
];

// Soul of the site
export const closingQuote = "We’re not yet the men we want to be,\nbut we’re far from the boys we once were.";
