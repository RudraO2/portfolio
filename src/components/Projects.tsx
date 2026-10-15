import { ArrowUpRight } from 'lucide-react'
import { Kicker, GhostNum, trackGlow } from './Section'

interface Project {
  title: string
  status: string
  description: string
  skills: string[]
  link: string
}

const projects: Project[] = [
  {
    title: 'Airgapped OS',
    status: 'Live on Vercel',
    description:
      'A browser-based workstation simulation running local LLMs without letting data escape. Built to demonstrate air-gapped industrial AI workflows with on-screen isolation proofs.',
    skills: ['React', 'Groq API', 'TypeScript', 'Vercel'],
    link: 'https://faraday-five.vercel.app',
  },
  {
    title: 'Visual Tutor',
    status: 'Live on Vercel',
    description:
      'Type in any topic to get an interactive concept map, animated visual explanations, and an AI tutor named Tanya that follows along with whatever you click.',
    skills: ['React', 'Gemini API', 'Tailwind CSS', 'Vercel'],
    link: 'https://visual-tutor-eight.vercel.app',
  },
  {
    title: 'Office Drama',
    status: 'Live on Netlify',
    description:
      'A 2D office game where NPCs share a persistent database. Characters remember what you tell them, spread rumors between cubicles, and help or mislead you while you hunt for a stolen drive.',
    skills: ['Next.js', 'Phaser', 'VRM', 'Supabase'],
    link: 'https://officedrama1.netlify.app/game',
  },
  {
    title: 'tokenbrawl',
    status: 'Benchmark',
    description:
      'A turn-based fighting game where two LLMs battle using a fixed token budget. Fast responses give no edge; models must balance tactical depth against token burn under strict rules.',
    skills: ['TypeScript', 'Node.js', 'Vitest', 'AI Eval'],
    link: 'https://github.com/RudraO2/tokenbrawl',
  },
  {
    title: 'NSE Screener',
    status: 'Live on Streamlit',
    description:
      'Tracks sector rotation in the Indian market to spot where capital is actively flowing, then filters momentum stocks across the Nifty 500. Runs live with no login or API keys needed.',
    skills: ['Python', 'Streamlit', 'pandas', 'yfinance'],
    link: 'https://nse-screener1.streamlit.app',
  },
  {
    title: 'Faraday',
    status: 'SIH 2026 Prototype',
    description:
      'An on-premise AI workbench built for Smart India Hackathon (MRPL problem statement). Runs open-weight models locally on operator GPUs so sensitive industrial files never touch the cloud.',
    skills: ['Node.js', 'Local LLMs', 'SIH 2026', 'TypeScript'],
    link: 'https://github.com/RudraO2/Faraday',
  },
  {
    title: 'Ghostpad',
    status: 'Android & Web',
    description:
      'Looks like a plain notes app on your phone, but quietly encodes your messages into code snippets and sends them via WhatsApp so onlookers see homework, not chats.',
    skills: ['React Native', 'Expo', 'Offline', 'Privacy'],
    link: 'https://github.com/RudraO2/ghostpad',
  },
  {
    title: 'TrueG',
    status: 'Shipped APK',
    description:
      'My phone kept showing a 5G icon while connected to 4G towers, so I made an app that reads raw cellular radio data to tell you if your connection is actually 5G or just marketing.',
    skills: ['React Native', 'Expo', 'Android', 'Telephony'],
    link: 'https://github.com/RudraO2/TrueG',
  },
]

export function Projects() {
  return (
    <section
      id="projects"
      className="relative px-6 md:px-14 lg:px-20 py-24 md:py-36 border-b border-white/10 overflow-hidden scroll-mt-24"
    >
      {/* static ambient glow behind the glass */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-50"
        style={{
          background:
            'radial-gradient(55% 45% at 20% 15%, rgba(16,185,129,0.10), transparent 60%), radial-gradient(45% 40% at 90% 80%, rgba(45,212,191,0.07), transparent 60%)',
        }}
      />
      <GhostNum n="04" side="left" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <Kicker num="04" label="Work" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16 md:mb-20">
          <h2
            className="md:col-span-7 font-playfair italic text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.05]"
            data-reveal
          >
            Featured projects
          </h2>
          <p
            className="md:col-span-5 md:pt-4 text-white/50 leading-relaxed self-end"
            data-reveal
            style={{ '--rd': 1 } as React.CSSProperties}
          >
            Things I built to solve real annoyances and tested in the wild. Every project has live
            code or a running build you can try right now.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {projects.map((project, i) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-target group glass glass-hover glow-card rounded-3xl p-8 md:p-10 flex flex-col gap-6"
              data-reveal
              style={{ '--rd': i } as React.CSSProperties}
              onPointerMove={trackGlow}
            >
              <div className="flex items-start justify-between">
                <span className="font-playfair italic text-xl text-emerald-300/70">0{i + 1}</span>
                <ArrowUpRight
                  className="w-7 h-7 text-white/40 group-hover:text-emerald-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                  strokeWidth={1.5}
                />
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-emerald-300/80">
                  {project.status}
                </span>
                <h3 className="font-playfair text-3xl md:text-5xl mt-3 leading-tight text-white group-hover:text-emerald-300 transition-colors duration-300">
                  {project.title}
                </h3>
              </div>

              <p className="text-white/70 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2 mt-auto pt-2">
                {project.skills.map((s) => (
                  <span
                    key={s}
                    className="text-xs text-white/60 border border-white/10 bg-white/[0.05] rounded-full px-3 py-1.5"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
