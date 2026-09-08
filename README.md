# Personal Portfolio

My personal website and project showcase, built with React 19, TypeScript, Vite, and Tailwind CSS.

Live at: [https://rudrao2.vercel.app/](https://rudrao2.vercel.app/)

---

## What this is

A dark-mode portfolio built to show my work across web apps, mobile tools, and AI projects. Rather than a static list of links, it includes a few interactive touches:

- **Cursor spotlight reveal:** Two layered background images connected to mouse position with a radial mask (`RevealLayer.tsx`), letting you peel back the top image as you move around the hero section.
- **Target cursor:** A rotating custom cursor that locks onto interactive cards and buttons.
- **Card glow effects:** Glassmorphic cards with mouse-tracked border gradients that follow your cursor without heavy animation libraries.
- **Editorial typography:** Playfair Display for big editorial headings paired with clean Inter body copy.

---

## Featured projects inside

All the projects showcased here are live or downloadable:

| Project | Status | What it does | Link |
| :--- | :--- | :--- | :--- |
| **Airgapped OS** | Live on Vercel | Browser-based workstation simulation running local LLMs with verifiable isolation proofs | [Demo](https://faraday-five.vercel.app) |
| **Visual Tutor** | Live on Vercel | Topic-to-mindmap study tool with interactive visual models and an embedded AI tutor | [Demo](https://visual-tutor-eight.vercel.app) |
| **Office Drama** | Live on Netlify | 2D office RPG where NPCs remember conversations and spread rumors across a shared database | [Play](https://officedrama1.netlify.app/game) |
| **tokenbrawl** | AI Benchmark | Turn-based fighting game benchmark testing LLMs against a draining token bank under strict rules | [Repo](https://github.com/RudraO2/tokenbrawl) |
| **NSE Screener** | Live on Streamlit | Indian market cycle screener ranking momentum leaders in capital-inflow sectors with no login | [App](https://nse-screener1.streamlit.app) |
| **Faraday** | SIH 2026 Prototype | Sovereign industrial AI workbench built for Smart India Hackathon (MRPL problem statement) | [Repo](https://github.com/RudraO2/Faraday) |
| **Ghostpad** | Android & Web | Stealth note-taking app that disguises private messages as code snippets for WhatsApp | [Repo](https://github.com/RudraO2/ghostpad) |
| **TrueG** | Shipped APK | Android utility querying radio state to check if your 5G connection is real or carrier branding | [APK](https://github.com/RudraO2/TrueG) |

---

## Tech stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 6
- **Styling:** Tailwind CSS 3
- **Icons:** Lucide React
- **Animations:** GSAP + native CSS hardware-accelerated transforms
- **Typography:** Playfair Display + Inter

---

## Local setup

To run this locally on your machine:

```bash
# 1. Clone the repository
git clone https://github.com/RudraO2/portfolio.git

# 2. Enter the directory
cd portfolio

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

To create a production build:

```bash
npm run build
```

---

## About me

I am Rudra Pratap Singh, currently studying Data Science at IIT Madras (class of 2027) and building from Jaipur. I build web apps, mobile tools, and AI evaluations, then ship them out where people can actually use them.

- **GitHub:** [@RudraO2](https://github.com/RudraO2)
- **Email:** [24f3001340@ds.study.iitm.ac.in](mailto:24f3001340@ds.study.iitm.ac.in)
