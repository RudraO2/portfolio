import { ArrowUpRight } from 'lucide-react'
import { Kicker, GhostNum, trackGlow } from './Section'
import { projects, projectPath } from '../content/projects'

const featuredOrder = ['faraday', 'airgapped-os', 'visual-tutor', 'office-drama', 'tokenbrawl', 'nse-screener', 'ghostpad', 'trueg', 'stratum', 'genai-roadmap', 'anywherecode', 'six-months-left', 'hussh', 'whatsapp-automation']
const featuredProjects = featuredOrder.map(slug => projects.find(project => project.slug === slug)!).filter(Boolean)

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
            Projects &amp; experiments
          </h2>
          <p
            className="md:col-span-5 md:pt-4 text-white/50 leading-relaxed self-end"
            data-reveal
            style={{ '--rd': 1 } as React.CSSProperties}
          >
            Fourteen build notes, from live tools to prototypes. Each page explains the design, implementation, and what the current version can actually do.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {featuredProjects.map((project, i) => (
            <a
              key={project.slug}
              href={projectPath(project)}
              className="cursor-target group glass glass-hover glow-card rounded-3xl overflow-hidden flex flex-col"
              data-reveal
              style={{ '--rd': i } as React.CSSProperties}
              onPointerMove={trackGlow}
            >
              <img src={project.coverSmall} srcSet={`${project.coverSmall} 600w, ${project.cover} 1200w`} sizes="(max-width: 768px) 100vw, 560px" width="1200" height="675" alt={project.coverAlt} loading="lazy" decoding="async" className="project-card-image" />
              <div className="project-card-copy p-8 md:p-10 flex flex-col gap-6 flex-1">
              <div className="flex items-start justify-between">
                <span className="font-playfair italic text-xl text-emerald-300/70">{String(i + 1).padStart(2, '0')}</span>
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
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="text-xs text-white/60 border border-white/10 bg-white/[0.05] rounded-full px-3 py-1.5"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-2 mt-2 text-xs text-emerald-300/80 group-hover:text-emerald-200">Read project notes <ArrowUpRight className="w-4 h-4" aria-hidden="true" /></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
