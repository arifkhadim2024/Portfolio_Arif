# DESIGN_SPEC.md — Mrazek-Tomas Design System & Technical Spec

This document details the extracted design tokens, typography rules, layout metrics, motion specs, 3D layer integration, and interaction patterns reverse-engineered from [mrazek-tomas.cz](https://www.mrazek-tomas.cz/) for the portfolio of **Arif Khadim**.

---

## 1. Color Palette & Vibrant Accent System

The design system combines the dark base mood of the reference site with a rich, modern accent system configured via CSS variables and Tailwind tokens for instant swappability:

### Base Surface & Reference Colors
| Token | Exact Hex / Value | Usage |
|---|---|---|
| `--color-bg` (`--blake-800`) | `#23222B` | Default page background color |
| `--color-surface` (`--blake-900`) | `#212027` | Deep card surfaces, footer panels, select list options, input backgrounds |
| `--color-surface-card` | `#2A2933` | Elevated card surfaces and interactive containers |
| `--color-border` (`--blake-300`) | `#434345` | Subtle container borders, dark dividers |
| `--color-text` (`--white-300`) | `#E7E7E7` | Primary body text and headline color (high WCAG AA contrast) |
| `--color-text-muted` (`--white-700`) | `#C4C4C4` | Secondary text, placeholders, subtitles, project meta |
| `--color-text-subtle` | `#7E7E83` | Project index numbering, disabled states, inactive lines |
| `--white` | `#FFFFFF` | Button backgrounds, active indicators, bright icons |

### Vibrant Accent Tokens
| Accent Token | Exact Hex | Purpose & Usage |
|---|---|---|
| `--accent-primary` | `#7C3AED` | **Electric Violet** — Primary brand accent, glowing shadows, interactive borders |
| `--accent-secondary` | `#22D3EE` | **Cyan** — Secondary accent, live indicators, tech tags, 3D particle lighting |
| `--accent-tertiary` | `#F472B6` | **Hot Pink / Magenta** — Tertiary accent, playful badges, interactive arrows |
| `--accent-highlight` | `#A3E635` | **Lime** — High-contrast status pips, certification badges (used sparingly) |
| `--accent-warm` | `#FB923C` | **Warm Orange** — Creative tags and warm secondary gradients |

### Signature Gradients & Glows
| Gradient Token | Formula | Application |
|---|---|---|
| `--gradient-signature` | `linear-gradient(135deg, #7C3AED 0%, #F472B6 50%, #22D3EE 100%)` | Headline keywords, CTA buttons, border highlights, active nav indicators |
| `--gradient-glow` | `linear-gradient(270deg, rgba(124, 58, 237, 0) 0%, #7C3AED 35%, #F472B6 65%, rgba(34, 211, 238, 0) 100%)` | Radiating nav link underline & section dividers |
| `--gradient-border` | `linear-gradient(135deg, rgba(124,58,237,0.4), rgba(244,114,182,0.4), rgba(34,211,238,0.4))` | Subtle glowing card borders on 3D tilt |
| `--gradient-mesh` | Multi-stop radial gradients (violet, magenta, cyan at 15-20% opacity) | Ambient background aura behind hero & section headers |

### Accessibility (WCAG AA) & Palette Swapping
- **Contrast**: All body text maintains a contrast ratio > 7:1 against base dark surfaces (`#23222B`), and all colored badges use semi-transparent tinted backgrounds with high-luminance text.
- **Swappability**: Changing CSS variables (`--accent-primary`, `--accent-secondary`, etc.) in `:root` automatically propagates across all headings, buttons, 3D Canvas lighting, cards, tags, and theme variants.

---

## 2. Typography & Text Styling

### Font Families
- **Display & Headings**: `transducer-extended`, `Syne`, `Monument Extended`, `Space Grotesk`, `sans-serif` (Extended geometric grotesque with weights **500 Medium** and **900 Black**)
- **Body & Captions**: `Open Sans`, `Inter`, `sans-serif` (Weights **300**, **400**, **600**, **700**)
- **Technical & Tags**: `Space Mono`, `monospace` (Weights **400**, **700**)

### Fluid Typography Scale
The reference site uses dynamic root `vw` scaling for seamless responsive sizing:
```css
html { font-size: 0.521vw; } /* Desktop standard */
@media (min-width: 1680px) { html { font-size: 9px; } }
@media (max-width: 991px) { html { font-size: 1.5vw; } }
@media (max-width: 767px) { html { font-size: 2vw; } }
@media (max-width: 490px) { html { font-size: 2.667vw; } }
```

### Type Hierarchy
| Element / Class | Desktop Size | Mobile Size | Weight | Letter Spacing | Line Height | Case / Transform |
|---|---|---|---|---|---|---|
| `h1.h1` (Poster Title) | `19rem` – `19.6rem` | `6.8rem` – `7.5rem` | `900` | `-0.02em` | `0.83` | UPPERCASE |
| `h2.h2` (Section Title) | `7.2rem` – `10rem` | `4.2rem` – `5rem` | `900` | `-0.02em` | `1.1` | Sentence / Title |
| `h3.h3` (Card / Modal Title) | `4.2rem` | `2.4rem` – `3rem` | `900` | `-0.02em` | `1.14` | Mixed / Sentence |
| `h4.h4` (Sub-item Title) | `3.2rem` | `2rem` – `2.4rem` | `900` | `0` | `1.06` | UPPERCASE |
| `h5.h5` (Labels / Tracking) | `2.0rem` | `1.2rem` – `1.4rem` | `900` | `+0.4em` | `2.0` | UPPERCASE |
| `.info-label` | `1.4rem` | `1.0rem` | `900` | `+0.4em` | `1.8` | UPPERCASE |
| `.nav-link_label` | `1.2rem` | `4.2rem` (drawer) | `900` | `+0.4rem` | `1.16` | UPPERCASE |
| `p`, `body`, `.p-14` | `1.4rem` – `1.6rem` | `1.4rem` | `400` / `500` | `0` | `1.5 – 1.7` | Normal |

### Distinctive Typographic Quirks & Text Casing
The design features an signature typographic convention:
1. **Inverted Camel / Lowercase Leading Letters**:
   - `mAIL` *(lowercase `m`, uppercase `AIL`)*
   - `pROFILE` *(lowercase `p`, uppercase `ROFILE`)*
   - `Cin` *(lowercase `in`, uppercase `C`)*
   - `wEBFLOW exPERT prOFILE`
   - `yOUR nAME` *(lowercase `y`, uppercase `OUR`, lowercase `n`, uppercase `AME`)*
2. **Dashed Split Words with Mixed Capitalization**:
   - `Partner—ship`
   - `tranS—parency`
   - `Easy—going`
   - `revision—less`
3. **Hero Interactive Pill**:
   - `TM` / `AK` badge with solid and stroked dot indicators, paired with a handwritten SVG curved arrow pointing to the badge ("click me").

---

## 3. Spacing Scale, Grid & Layout Metrics

- **Max Container Width**: `140rem` (Desktop), with dynamic fluid horizontal padding `4rem` (Desktop), `2.4rem` (Tablet), `1.6rem` (Mobile).
- **Border Radii**:
  - Buttons: `0.8rem`
  - Cards & Panels: `2.0rem` – `2.4rem`
  - Dropdown Menus: `0.5rem` – `0.8rem`
  - Brand Badges & Pill Chips: `2.5rem` (50px / 9999px full pill)
- **Buttons**:
  - `.button`: `background-color: var(--white); color: var(--blake-900); font-weight: 900; font-size: 1.2rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 1.7rem 2.3rem; border-radius: 0.8rem;`
  - Hover state: `background-color: #000000; color: #FFFFFF; transition: all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1);`
- **Interactive Cursor & Hover Details**:
  - Arrow translations on hover (`transform: translate(0.4rem, -0.4rem)` for external links, `transform: translateX(1rem)` for horizontal visit links).
  - Thumbnail scale on hover (`transform: scale(1.05)`).
  - Footer avatar slide-out on hover (`transform: translateX(5rem)`).

---

## 4. Navbar Architecture & Behavior

- **Positioning**: Fixed top (`position: fixed; top: 0; left: 0; width: 100%; z-index: 1000; padding: 2.4rem 4rem;`).
- **Brand Logo**: Left circular/pill badge containing user monogram ("AK" / "TM") with SVG border stroke.
- **Nav Links**:
  - `Home`, `Projects`, `About`, `Contact`
  - Hover effect: Center-radiating red glowing line (`linear-gradient(270.05deg, rgba(255, 72, 72, 0) 0.04%, #FF4848 47.65%, rgba(255, 72, 72, 0) 101.62%)`).
  - Sibling dimming: When hovering over any nav link, the underline indicators of sibling links are muted/hidden (`.nav-link_line.hidden`).
- **CTA Action**: "Get in Touch" button triggers the "Let's meet" modal overlay.
- **Mobile Navigation**:
  - Hamburger icon (`.nav_ham-box`) with 3 animated horizontal bar spans.
  - Fullscreen sliding drawer with staggered large typography links (`font-size: 4.2rem`), social media links, and full-width "Get in Touch" button.

---

## 5. Motion, Animations & Easings

Detected and configured animation engine stack: **GSAP + ScrollTrigger** + **Lenis Smooth Scroll** + **Framer Motion**:

### Key Timing & Easings
- **Primary Snappy Ease**: `cubic-bezier(0.215, 0.61, 0.355, 1)` (power3.out equivalent) — Used for buttons, nav underlines, and link hover states.
- **Smooth Cinematic Ease**: `cubic-bezier(0.23, 1, 0.32, 1)` (power4.out equivalent) — Used for page transitions, section reveals, and modal slide-ins.
- **Spring / Bounce Ease**: `cubic-bezier(0.5, 0, 0, 1.25)` — Used for dropdown menu reveal scaling.

### Scroll & Page Transitions
1. **Page Transition Wipe**:
   - 3 consecutive animated horizontal bars (`.transition-line._1`, `._2`, `._3`) wiping across the screen on route change.
2. **Hero Staggered Reveal**:
   - Hero poster headline and subheadline reveal with 0.15s stagger and subtle upward translation (`translateY(4rem) -> 0`).
3. **Interactive Hero Switcher**:
   - Clicking the interactive badge triggers a smooth cross-fade and 3D figure rotation/morph between character avatar and live portrait.
4. **Scroll-triggered Section Reveals**:
   - Contact list items and project items slide in from `translateX(-10rem)` to `0` with opacity fading from 0 to 1 upon entering viewport.

---

## 6. 3D & WebGL / Canvas Layer

- **Hero 3D Object**:
  - Interactive low-poly / abstract geometric 3D mesh (e.g. 3D stylized initials / interactive creative developer artefact) built with **React Three Fiber** + **Drei**.
  - Dynamic responsiveness: Rotates and floats smoothly following the mouse cursor coordinates (`useFrame` with lerped mouse delta).
- **Project Cards 3D Tilt**:
  - Interactive 3D perspective tilt on hover (`transform: perspective(1000px) rotateX(...) rotateY(...)`) with dynamic lighting shimmer.
- **Scroll-linked Parallax**:
  - Camera subtly tracks scroll progress between Hero, Projects, and Services sections.
- **Performance Constraints**:
  - Cap pixel ratio at `Math.min(window.devicePixelRatio, 2)`.
  - Lazy load canvas with fallback static visual for mobile and low-power devices.

---

## 7. "Let's meet" Modal & Form Specification

- **Trigger**: Any "Get in Touch" button or contact CTA.
- **Overlay Animation**:
  - Backdrop blur + opacity fade (`opacity: 0 -> 1`).
  - Modal container: `scale: 0.95 -> 1.0`, `translateY: 20px -> 0px`, duration `0.35s easeOut`.
- **Close Action**: Top right circular "X" button or backdrop click.
- **Form Structure**:
  1. `yOUR nAME` (Text input, required)
  2. `Email` (Email input, required)
  3. `What is your Budget?` (Custom Nice-Select animated dropdown):
     - Options: `Please select one..`, `$3K - $5K`, `$6K - $10K`, `$11K - $15K`, `$16K - $19K`, `$20+`
     - Dropdown popover: animated `scale(0.75) translateY(-21px)` to `scale(1) translateY(0)` with custom downward SVG chevron rotation.
  4. `Project Summary` (Textarea, placeholder: `"Tell me more about your project..."`, required)
  5. `Submit` Button (`.button.w-button`, loading state: `"Please wait..."`).
- **Success State**:
  - Replaces form with smooth cross-fade:
  - Headline: `"Thanks for reaching out to me."`
  - Subtitle: `"You can anticipate the reply within 24 hours."`
- **Error State**:
  - Inline error banner: `"Oops! Something went wrong while submitting the form."`
- **Integration**: Pluggable backend adapter (Formspree / Resend / EmailJS / Web3Forms).

---

## 8. Content Mapping Plan (Arif Khadim)

| Reference Item | Arif Khadim's Content |
|---|---|
| Name | **Arif Khadim** |
| Tagline / Hero | **Full-Stack Developer & Creative Engineer** |
| Hero Accent | "Building Pixel-Perfect Web Experiences & Scalable Systems" |
| Brand Monogram | **AK** (in place of TM) |
| Location & Email | Contact links, email address, GitHub, LinkedIn, Twitter/X |
| Featured Projects | 1. Modular Web Architecture<br>2. 3D Interactive Experience<br>3. Next.js SaaS Platform<br>4. Creative Design System |
| About Sections | **Partner—ship**, **tranS—parency**, **Easy—going**, **revision—less** |
| Skills & Tools | React / Next.js, TypeScript, Three.js / WebGL, GSAP, Tailwind CSS, Node.js, Python |
