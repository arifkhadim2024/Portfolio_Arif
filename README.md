# Arif Khadim — Modern Developer Portfolio

A modern, highly interactive personal portfolio website engineered with **React 18**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

![Portfolio Preview](/og-image.png)

---

## 🌟 Key Highlights

- **Dark-First Modern Aesthetic**: Deep space slate palette with subtle ambient gradient glows and glassmorphism.
- **Light & Dark Mode Switcher**: Smooth animated theme toggle with persistent storage.
- **Dynamic Hero Section**: Typewriter role transitions, glowing visual avatar treatment, and interactive particle canvas.
- **Interactive Terminal Component**: Live code switcher highlighting developer metadata, skills, and contact logic.
- **Category Filterable Projects & Skills**: Real-time filtering by tech stack and discipline.
- **Deep-Dive Case Study Modal**: Problem statement, solution architecture, and metric highlights for projects.
- **Certificate Lightbox Gallery**: Verified credentials preview with direct verification links.
- **Validated Contact Form & Confetti**: Real-time input validation, copy-to-clipboard email trigger, and mail service integration support.
- **100% Responsive Design**: Tailored experience for desktop, tablet, and mobile with animated drawer navigation.
- **Zero UI-Coupled Data**: Centralized TypeScript data files inside `src/data/` for updating without modifying UI code.

---

## 🚀 Quick Start

### 1. Installation
```bash
# Clone or navigate into the repository
cd portfolio_Arif

# Install all dependencies
npm install
```

### 2. Run Locally
```bash
# Start the Vite development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
# Build optimized static bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🛠️ How to Customize Your Information

All portfolio content is centralized in the `src/data/` folder:

| File | Description |
|---|---|
| [`src/data/profile.ts`](src/data/profile.ts) | Name, headline, typewriter roles, biography, statistics, quick facts, avatar URL |
| [`src/data/skills.ts`](src/data/skills.ts) | Programming languages, frameworks, tools, AI/ML, and databases |
| [`src/data/projects.ts`](src/data/projects.ts) | Featured projects, case studies, metric highlights, GitHub & demo links |
| [`src/data/experience.ts`](src/data/experience.ts) | Professional roles, internships, leadership timeline, and achievements |
| [`src/data/education.ts`](src/data/education.ts) | Academic degrees, universities, GPA/scores, and relevant coursework |
| [`src/data/certificates.ts`](src/data/certificates.ts) | Certifications, issuing organizations, dates, and credential IDs |
| [`src/data/social.ts`](src/data/social.ts) | GitHub, LinkedIn, Twitter/X, Instagram URLs, and contact settings |

---

## 📸 How to Replace Your Profile Photo & Resume

### Profile Photo
1. Place your image inside the `public/` directory (e.g. `public/avatar.jpg`).
2. Open [`src/data/profile.ts`](src/data/profile.ts) and update:
```typescript
avatarUrl: "/avatar.jpg"
```

### Resume PDF
1. Save your resume as `resume.pdf` directly into the `public/` folder.
2. The portfolio is pre-configured to link directly to `/resume.pdf` for both in-browser preview and one-click download.

---

## 📬 How to Connect the Contact Form

To receive real email submissions:
1. Create a free endpoint on [Formspree](https://formspree.io/) or [Web3Forms](https://web3forms.com/).
2. Open [`src/data/social.ts`](src/data/social.ts) and set `formEndpoint`:
```typescript
export const contactConfig = {
  email: "your-email@example.com",
  location: "Your City, India",
  responseTime: "Usually responds within 24 hours",
  formEndpoint: "https://formspree.io/f/your-form-id", // Paste your endpoint here
};
```

---

## 🚢 Deployment Guide

### Deploy on Vercel (Recommended)
1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import this repository — Vercel will automatically detect Vite and configure build commands:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**!

### Deploy on Netlify
1. Connect your GitHub repo on [Netlify](https://netlify.com).
2. Set Build command to `npm run build` and Publish directory to `dist`.
3. Deploy!

---

## 📄 License
This project is open-source and customizable under the MIT License.
