# Arif Khadim — Creative Developer & Full-Stack Engineer Portfolio

A pixel-faithful recreation of the **design system, layout, fluid typography, motion, and interaction style of [mrazek-tomas.cz](https://www.mrazek-tomas.cz/)**, customized with **Arif Khadim's** personal content, projects, and an interactive 3D WebGL layer.

---

## 🌟 Architecture & Design System Highlights

- **Design System & Color Tokens**:
  - Exact color palette: `#23222B` (Primary Dark), `#212027` (Deep Card Surface), `#FF4848` (Brand Red Accent), `#E7E7E7` (Primary Text), and `#434345` (Dividers).
  - Subtle repeating noise overlay texture with `background-blend-mode: overlay`.
- **Fluid Viewport Typography Scale**:
  - Root scaling matching the reference: `html { font-size: 0.521vw; }` on desktop with seamless responsive adjustments for tablets and mobile devices.
  - Bold extended geometric display typography (`transducer-extended` / `Syne` / `Monument Extended` / `Space Grotesk`) and `Open Sans` / `Space Mono`.
- **Signature Typographic Casing & Word Splits**:
  - Inverted lowercase leading letter convention: `mAIL`, `pROFILE`, `Cin`, `gITHUB`, `lINKEDIN`, `yOUR nAME`.
  - Stylized split words: `Partner—ship`, `tranS—parency`, `Easy—going`, `revision—less`.
- **Motion, Transitions & Lenis Smooth Scroll**:
  - **Lenis Smooth Scroll** synced with requestAnimationFrame for ultra-fluid scrolling.
  - **3-Bar Staggered Wipe Page Transition** (`.transition-overlay` with 3 wiping panels) across Home, Projects, About, and Contact.
  - Sibling dimming navigation underline effect with center-radiating red glowing gradient (`linear-gradient(270.05deg, ...)`).
  - Signature 2-column footer cards with vertical 180° rotated typography (`writing-mode: vertical-rl`) and slide-out hover avatar (`transform: translateX(4rem)`).
- **Interactive 3D WebGL Layer**:
  - React Three Fiber + Drei interactive floating 3D hero artefact with mouse parallax, lerp smoothing, dynamic lighting, and DPR clamped to 2 with mobile fallback.
- **"Let's meet" Contact Modal**:
  - Interactive modal dialog triggered by "Get in Touch" buttons.
  - Custom animated Nice-Select budget dropdown with options (`$3K - $5K`, `$6K - $10K`, `$11K - $15K`, `$16K - $19K`, `$20+`).
  - Validation, confetti on success, error handling, and Formspree integration (`https://formspree.io/f/xzezbygl`).

---

## 🚀 Quick Start

### 1. Installation
```bash
# Clone or navigate into the repository
cd portfolio_Arif

# Install dependencies
npm install
```

### 2. Run Locally
```bash
# Start the Vite development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build & Verify
```bash
# Type check and build optimized static bundle
npm run build

# Run linter
npm run lint

# Preview production build locally
npm run preview
```

---

## 🛠️ Content Customization

All personal information, projects, values, services, and contact settings are located in:
📂 [`src/data/portfolioData.ts`](src/data/portfolioData.ts)

| Configuration Area | Description |
|---|---|
| `hero` | Headline, day/night tagline reveals, greetings, and overview paragraphs |
| `projects` | Featured projects, case studies, problem/solution breakdown, metrics, and URLs |
| `values` | 4 cornerstone values (`Partner—ship`, `tranS—parency`, `Easy—going`, `revision—less`) |
| `services` | "What I love to do" capabilities and core tech stacks |
| `testimonials` | Client and peer quotes, authors, companies, and avatar URLs |
| `experiences` | Career chronology, roles, and achievements |
| `socials` & `cin` | Social profile links, email, phone, and registration indices |
| `budgetOptions` | Budget dropdown ranges for the "Let's meet" modal |
| `formEndpoint` | Formspree / backend endpoint for instant message delivery |

---

## 🚢 Deployment (Vercel)

1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository — Vercel will automatically detect Vite:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**!

---

## 📄 License
MIT License. Crafted for **Arif Khadim**.
