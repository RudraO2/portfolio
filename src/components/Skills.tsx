import { Wand2, Network, LineChart, Terminal, Cloud, Crosshair, type LucideIcon } from 'lucide-react'
import { Kicker, GhostNum, trackGlow } from './Section'

interface SkillCard {
  Icon: LucideIcon
  label: string
  title: string
  description: string
  wide?: boolean
}

const cards: SkillCard[] = [
  {
    Icon: Wand2,
    label: 'Mobile',
    title: 'Mobile apps',
    description:
      'React Native, Expo, and Kotlin. Built Android tools that talk directly to system telephony and accessibility services, distributed via signed APKs.',
    wide: true,
  },
  {
    Icon: Network,
    label: 'Web',
    title: 'Web development',
    description:
      'Next.js, React, TypeScript, and Tailwind CSS. Built responsive web tools, browser games in Phaser, and installable offline PWAs.',
  },
  {
    Icon: LineChart,
    label: 'Data & Backend',
    title: 'Data & backend',
    description:
      'Python, pandas, Streamlit, Node.js, and Supabase. Data scraping, market cycle analysis, and real-time state for games and tools.',
  },
  {
    Icon: Terminal,
    label: 'Tooling',
    title: 'Developer workflow',
    description:
      'Git, GitHub Actions CI, Gradle, Vitest, and clean command-line automation. Building with tests so things stay reliable.',
  },
  {
    Icon: Crosshair,
    label: 'AI & LLMs',
    title: 'AI and model eval',
    description:
      'Building deterministic benchmarks (tokenbrawl), running local models on GPUs, and connecting to Groq and Gemini APIs.',
  },
  {
    Icon: Cloud,
    label: 'Deployment',
    title: 'Getting it live',
    description:
      'Deploying web applications to Vercel and Netlify, running live dashboards on Streamlit, and sharing APKs directly.',
  },
]

const groups = [
  { title: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'Kotlin'] },
  { title: 'Frameworks', items: ['React', 'Next.js', 'React Native', 'Expo', 'Tailwind CSS', 'Node.js', 'Streamlit', 'Phaser'] },
  { title: 'Cloud and DevOps', items: ['Vercel', 'Netlify', 'Supabase', 'Git', 'GitHub Actions', 'Gradle', 'Vitest'] },
  { title: 'AI and data', items: ['LLM benchmarking', 'Local open-weight models', 'Groq and Gemini APIs', 'MCP servers', 'pandas'] },
]

export function Skills() {
  return (
    <section
      id="skills"
      className="relative px-6 md:px-14 lg:px-20 py-24 md:py-36 border-b border-white/10 overflow-hidden scroll-mt-24"
    >
      {/* static ambient glow behind the glass */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-50"
        style={{
          background:
            'radial-gradient(50% 40% at 80% 10%, rgba(16,185,129,0.10), transparent 60%), radial-gradient(45% 45% at 10% 85%, rgba(45,212,191,0.07), transparent 60%)',
        }}
      />
      <GhostNum n="02" side="left" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <Kicker num="02" label="Skills" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-14">
          <h2
            className="md:col-span-7 font-playfair italic text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.05]"
            data-reveal
          >
The toolbox behind the builds
          </h2>
          <p
            className="md:col-span-5 md:pt-4 text-white/50 leading-relaxed self-end"
            data-reveal
            style={{ '--rd': 1 } as React.CSSProperties}
          >
Everything I reach for, from a first commit to a shipped release.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {cards.map(({ Icon, label, title, description, wide }, i) => (
            <article
              key={title}
              className={`cursor-target glass glass-hover glow-card rounded-3xl p-7 md:p-8 flex flex-col gap-5 ${
                wide ? 'sm:col-span-2' : ''
              }`}
              data-reveal
              style={{ '--rd': i % 3 } as React.CSSProperties}
              onPointerMove={trackGlow}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl border border-white/10 bg-white/[0.06]">
                  <Icon className="w-5 h-5 text-emerald-300" strokeWidth={1.5} />
                </span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                  {label}
                </span>
              </div>
              <div className="mt-auto">
                <h3 className="font-playfair italic text-2xl md:text-3xl text-white">{title}</h3>
                <p className="mt-3 text-sm text-white/60 leading-relaxed">{description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" data-reveal>
          {groups.map(({ title, items }) => (
            <div key={title}>
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-emerald-300/80">{title}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-white/60">
                {items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
