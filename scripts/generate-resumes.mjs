import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");

const PAGE = { width: 595.28, height: 841.89 };
const COLORS = {
  ink: "#0f172a",
  muted: "#475569",
  line: "#cbd5e1",
  cyan: "#0891b2",
  soft: "#ecfeff",
  white: "#ffffff",
};

const resumes = {
  dipak: {
    name: "Dipak Dhurve",
    title: "Creative Developer | Web, Mobile App & AI Integration",
    meta: "Diploma Engineering | Polytechnic 2nd Year | BKIT Sakoli | Open to creative developer internships",
    github: "https://github.com/dipakdhurve9975-lgtm",
    openTo: "Creative Developer Intern | Web/App Intern | AI Integration Intern",
    profile:
      "Diploma engineering student building across web, mobile app interfaces, AI tooling, and product demos while learning deeper every week. Strongest edge is visualisation: turning rough ideas into clear UI flows, product stories, demos, and screens people understand.",
    education: ["Diploma Engineering", "Polytechnic 2nd Year", "BKIT Sakoli"],
    strengths: [
      "UI visualisation and frontend implementation",
      "Product thinking, demo storytelling, fast prototyping",
      "Critical thinking under short deadlines",
      "Collaborative project building and pitch support",
    ],
    skills: [
      ["Web", "HTML, CSS, JavaScript, React (learning), Three.js (exploring)"],
      ["Mobile App Development", "XML, Flutter"],
      ["AI Tooling", "AI-assisted workflows, prompt iteration, product integration"],
      ["Programming", "Java, C++, basic Assembly"],
      ["Workflow", "Firebase basics, GitHub, deployment basics"],
      ["Creative edge", "User flows, visual systems, product demos, presentation clarity"],
    ],
    projects: [
      {
        name: "Cyber Raksha v1/v2",
        text:
          "Helped ship a cybersecurity awareness platform across app/web/PC presence. v1 won Diamond Award and 1st place at GHRSTU INNOVEX-26; v2 improved bugs and launch readiness.",
      },
      {
        name: "Pashu Raksha / PashuMitra",
        text:
          "Integrated an offline chatbot utilizing a local AI model for cattle disease detection. Built entirely during an intense 24-hour hackathon sprint under extreme deadline pressure.",
      },
      {
        name: "MVP Genie",
        text:
          "Built with interactive parallax UI and AI context memory integration, shaping the landing page into a stronger AI-product story.",
      },
      {
        name: "Smart Leads Dashboard",
        text:
          "MERN stack project for managing business leads, with frontend UI, CRUD operations, lead states, filters, and export-ready flows.",
      },
      {
        name: "JGU University Site",
        text:
          "Modern, tech-driven UI clone with polished navigation, responsive layout, and admissions-style presentation.",
      },
      {
        name: "Sanghx.in",
        text:
          "Built and operated local food-ordering flows with WhatsApp operations. Reached 200+ paying orders in 20 days through word of mouth, with real users and real delivery constraints.",
      },
      {
        name: "Eatlo.food",
        text:
          "Helped adapt the food-ordering playbook for another city launch with frontend/product support and ongoing expansion work.",
      },
      {
        name: "Sankalp Bharat 2026",
        text:
          "Team PANDA reached Top 16 nationally among 800+ teams. Contributed product thinking, pitch flow, and rapid build execution under pressure.",
      },
    ],
    achievements: [
      "Diamond Award, 1st place - GHRSTU INNOVEX-26 Tech Manthan, 12 March 2026",
      "Top 16 - Sankalp Bharat 2026 national hackathon, 800+ teams",
      "200+ real local orders through Sanghx.in in 20 days",
    ],
    note:
      "Current skill levels reflect active learning and real project work, with steady improvement through each build.",
  },
  sagar: {
    name: "Sagar Mankar",
    title: "Full-Stack Architect | Security & Mobile App Developer",
    meta: "Diploma Engineering | Polytechnic 2nd Year | BKIT Sakoli | Open to full-stack/security/app internships",
    github: "https://github.com/Sagarmankar123",
    openTo: "Full-Stack Intern | MERN Intern | Security/App Intern",
    profile:
      "Diploma engineering student focused on logic, cybersecurity fundamentals, and full-stack development. Comfortable moving across frontend, backend, MERN-style builds, tooling, debugging, and security-aware product thinking. In team projects, brings structure under pressure by breaking problems down, choosing tools, building logic, and stabilising demos.",
    education: ["Diploma Engineering", "Polytechnic 2nd Year", "BKIT Sakoli"],
    strengths: [
      "Logic-first problem solving and DSA fundamentals",
      "MERN/full-stack development and API thinking",
      "Cybersecurity basics and security-aware product flows",
      "Tool selection, debugging, and demo readiness under deadlines",
    ],
    skills: [
      ["Programming", "Java, C++, C, DSA, basic Assembly"],
      ["Web / MERN", "JavaScript, HTML, CSS, React, Node.js, Express, MongoDB"],
      ["Mobile App Development", "Android/app workflows, app delivery basics"],
      ["Security", "Cybersecurity fundamentals, awareness flows, risk-first thinking"],
      ["Workflow", "GitHub, Firebase basics, debugging, deployment basics, tooling"],
    ],
    projects: [
      {
        name: "Cyber Raksha v1/v2",
        text:
          "Security awareness platform for everyday users. Contributed security-minded logic and product flows; v1 won Diamond Award and 1st place, v2 expanded app + PC + web delivery.",
      },
      {
        name: "Smart Leads Dashboard",
        text:
          "Contributed MERN backend and architecture thinking for managing business leads, CRUD operations, lead states, filters, and dashboard flows.",
      },
      {
        name: "Pashu Raksha / PashuMitra",
        text:
          "Integrated an offline chatbot utilizing a local AI model for cattle disease detection. Built entirely during an intense 24-hour hackathon sprint under extreme deadline pressure.",
      },
      {
        name: "MVP Genie",
        text:
          "Contributed technical architecture for the parallax landing experience and AI context memory positioning.",
      },
      {
        name: "JGU University Site",
        text:
          "Contributed technical architecture for a modern, tech-driven university UI clone with responsive structure.",
      },
      {
        name: "Sanghx / Eatlo / Tabey",
        text:
          "Supported startup-style food-ordering product builds, launch workflows, operations thinking, and technical iteration across related local delivery products.",
      },
      {
        name: "Sankalp Bharat 2026",
        text:
          "Team PANDA reached Top 16 nationally among 800+ teams. Contributed logic, technical execution, and pressure-time issue solving.",
      },
    ],
    achievements: [
      "Diamond Award, 1st place - GHRSTU INNOVEX-26 Tech Manthan, 12 March 2026",
      "Top 16 - Sankalp Bharat 2026 national hackathon, 800+ teams",
      "Built across app, web, PC, MERN, Firebase, and cybersecurity-aware projects",
    ],
    note:
      "Current skill snapshot is honest and practical: strong fundamentals, broad project exposure, and active growth through real builds.",
  },
};

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16) / 255);
}

function pdfColor(hex, stroke = false) {
  return `${hexToRgb(hex).map((n) => n.toFixed(3)).join(" ")} ${stroke ? "RG" : "rg"}`;
}

function esc(text) {
  return String(text)
    .replace(/[–—]/g, "-")
    .replace(/[“”]/g, '"')
    .replace(/[’]/g, "'")
    .replace(/[•]/g, "-")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function rect(ops, x, y, w, h, color) {
  ops.push(`q ${pdfColor(color)} ${num(x)} ${num(y)} ${num(w)} ${num(h)} re f Q`);
}

function line(ops, x1, y1, x2, y2, color = COLORS.line, width = 0.8) {
  ops.push(
    `q ${pdfColor(color, true)} ${num(width)} w ${num(x1)} ${num(y1)} m ${num(x2)} ${num(y2)} l S Q`,
  );
}

function text(ops, value, x, y, size = 10, color = COLORS.ink, font = "F1") {
  ops.push(`q ${pdfColor(color)} BT /${font} ${num(size)} Tf ${num(x)} ${num(y)} Td (${esc(value)}) Tj ET Q`);
}

function num(value) {
  return Number(value).toFixed(2).replace(/\.00$/, "");
}

function measure(value, size, font = "F1") {
  const factor = font === "F2" ? 0.57 : 0.52;
  return String(value).length * size * factor;
}

function wrap(value, maxWidth, size = 10, font = "F1") {
  const words = String(value).split(/\s+/);
  const lines = [];
  let current = "";

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (measure(test, size, font) <= maxWidth || !current) {
      current = test;
    } else {
      lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function paragraph(ops, value, x, y, maxWidth, options = {}) {
  const {
    size = 9.3,
    lineHeight = 13,
    color = COLORS.muted,
    font = "F1",
    maxLines = Infinity,
  } = options;
  const lines = wrap(value, maxWidth, size, font).slice(0, maxLines);
  for (const row of lines) {
    text(ops, row, x, y, size, color, font);
    y -= lineHeight;
  }
  return y;
}

function sectionTitle(ops, label, x, y, width) {
  text(ops, label.toUpperCase(), x, y, 8, COLORS.cyan, "F2");
  line(ops, x, y - 5, x + width, y - 5, COLORS.line, 0.6);
  return y - 18;
}

function bullets(ops, items, x, y, width, options = {}) {
  const { size = 8.8, gap = 5, bulletColor = COLORS.cyan } = options;
  for (const item of items) {
    rect(ops, x, y + 3, 3.2, 3.2, bulletColor);
    y = paragraph(ops, item, x + 11, y, width - 11, {
      size,
      lineHeight: size + 3.4,
      color: COLORS.muted,
    });
    y -= gap;
  }
  return y;
}

function labelledLines(ops, rows, x, y, width) {
  for (const [label, value] of rows) {
    text(ops, label, x, y, 8.6, COLORS.ink, "F2");
    y -= 11;
    y = paragraph(ops, value, x, y, width, {
      size: 8.2,
      lineHeight: 11.2,
      color: COLORS.muted,
      maxLines: 3,
    });
    y -= 8;
  }
  return y;
}

function projectBlock(ops, project, x, y, width) {
  text(ops, project.name, x, y, 9.4, COLORS.ink, "F2");
  y -= 12;
  y = paragraph(ops, project.text, x, y, width, {
    size: 8.1,
    lineHeight: 10.5,
    color: COLORS.muted,
    maxLines: 2,
  });
  return y - 7;
}

function resumePage(data) {
  const ops = [];
  const links = [];
  const margin = 40;
  const leftX = margin;
  const leftW = 158;
  const rightX = 224;
  const rightW = 331;

  rect(ops, 0, 0, PAGE.width, PAGE.height, COLORS.white);
  rect(ops, 0, 0, 14, PAGE.height, COLORS.ink);

  text(ops, data.name, margin, 785, 25, COLORS.ink, "F2");
  text(ops, data.title, margin, 764, 11, COLORS.cyan, "F2");
  text(ops, data.meta, margin, 746, 8.5, COLORS.muted);
  text(ops, `GitHub: ${data.github.replace("https://", "")}`, margin, 731, 8.5, COLORS.ink);
  links.push({ x: margin + 36, y: 727, w: 190, h: 12, url: data.github });
  line(ops, margin, 713, PAGE.width - margin, 713, COLORS.cyan, 1.1);

  let yLeft = 686;
  yLeft = sectionTitle(ops, "Education", leftX, yLeft, leftW);
  data.education.forEach((item) => {
    text(ops, item, leftX, yLeft, 9, COLORS.muted);
    yLeft -= 13;
  });
  yLeft -= 12;

  yLeft = sectionTitle(ops, "Open To", leftX, yLeft, leftW);
  yLeft = paragraph(ops, data.openTo, leftX, yLeft, leftW, {
    size: 9,
    lineHeight: 12.5,
    color: COLORS.ink,
    font: "F2",
  });
  yLeft -= 12;

  yLeft = sectionTitle(ops, "Core Strengths", leftX, yLeft, leftW);
  yLeft = bullets(ops, data.strengths, leftX, yLeft, leftW);
  yLeft -= 8;

  yLeft = sectionTitle(ops, "Technical Skills", leftX, yLeft, leftW);
  yLeft = labelledLines(ops, data.skills, leftX, yLeft, leftW);

  let yRight = 686;
  yRight = sectionTitle(ops, "Profile", rightX, yRight, rightW);
  yRight = paragraph(ops, data.profile, rightX, yRight, rightW, {
    size: 9.1,
    lineHeight: 13,
    color: COLORS.muted,
    maxLines: 7,
  });
  yRight -= 14;

  yRight = sectionTitle(ops, "Selected Project Work", rightX, yRight, rightW);
  for (const project of data.projects) {
    yRight = projectBlock(ops, project, rightX, yRight, rightW);
  }

  yRight = Math.min(yRight, 248);
  yRight = sectionTitle(ops, "Achievements", rightX, yRight, rightW);
  yRight = bullets(ops, data.achievements, rightX, yRight, rightW, {
    size: 8.5,
    gap: 3,
  });

  rect(ops, margin, 38, PAGE.width - margin * 2, 34, COLORS.soft);
  text(ops, "Honest resume note", margin + 12, 58, 8.2, COLORS.cyan, "F2");
  paragraph(ops, data.note, margin + 12, 46, PAGE.width - margin * 2 - 24, {
    size: 7.7,
    lineHeight: 9,
    color: COLORS.muted,
    maxLines: 2,
  });

  return { stream: ops.join("\n"), links };
}

function buildPdf(pages) {
  const objects = [];
  const add = (content) => {
    objects.push(content);
    return objects.length;
  };

  const catalogRef = add("");
  const pagesRef = add("");
  const fontRef = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const boldFontRef = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");

  const pageRefs = [];
  for (const page of pages) {
    const contentRef = add(`<< /Length ${Buffer.byteLength(page.stream, "utf8")} >>\nstream\n${page.stream}\nendstream`);
    const annotationRefs = page.links.map((link) => {
      const rectValue = [link.x, link.y, link.x + link.w, link.y + link.h].map(num).join(" ");
      return add(
        `<< /Type /Annot /Subtype /Link /Rect [${rectValue}] /Border [0 0 0] /A << /S /URI /URI (${esc(link.url)}) >> >>`,
      );
    });
    const annots = annotationRefs.length ? `/Annots [${annotationRefs.map((ref) => `${ref} 0 R`).join(" ")}]` : "";
    const pageRef = add(
      `<< /Type /Page /Parent ${pagesRef} 0 R /MediaBox [0 0 ${PAGE.width} ${PAGE.height}] /Resources << /Font << /F1 ${fontRef} 0 R /F2 ${boldFontRef} 0 R >> >> /Contents ${contentRef} 0 R ${annots} >>`,
    );
    pageRefs.push(pageRef);
  }

  objects[catalogRef - 1] = `<< /Type /Catalog /Pages ${pagesRef} 0 R >>`;
  objects[pagesRef - 1] = `<< /Type /Pages /Kids [${pageRefs.map((ref) => `${ref} 0 R`).join(" ")}] /Count ${pageRefs.length} >>`;

  let pdf = "%PDF-1.7\n";
  const offsets = [0];
  objects.forEach((content, index) => {
    offsets.push(Buffer.byteLength(pdf, "utf8"));
    pdf += `${index + 1} 0 obj\n${content}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(pdf, "utf8");
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i <= objects.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogRef} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  return Buffer.from(pdf, "utf8");
}

mkdirSync(publicDir, { recursive: true });

const dipakPage = resumePage(resumes.dipak);
const sagarPage = resumePage(resumes.sagar);

writeFileSync(join(publicDir, "resume-dipak.pdf"), buildPdf([dipakPage]));
writeFileSync(join(publicDir, "resume-sagar.pdf"), buildPdf([sagarPage]));
writeFileSync(join(publicDir, "resume.pdf"), buildPdf([dipakPage, sagarPage]));

console.log("Generated public/resume-dipak.pdf, public/resume-sagar.pdf, and public/resume.pdf");
