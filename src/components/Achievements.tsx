import { ArrowUpRight } from 'lucide-react'
import { Kicker, GhostNum, trackGlow } from './Section'

interface Win {
  result: string
  event: string
  meta: string
  description: string
  link?: { label: string; href: string }
  image?: { src: string; alt: string; width: number; height: number }
}

const wins: Win[] = [
  {
    result: '1st Place',
    event: 'HackPulse 2026: The Pre Heist',
    meta: 'UEM Jaipur · 4 Oct 2026 · 12-hour offline hackathon',
    description:
      'Won solo as team Hot Reload. I built a dashboard that lets community managers run their Slack, Telegram and WhatsApp groups from one place.',
    link: {
      label: 'Result post by HackPulse',
      href: 'https://www.linkedin.com/posts/hackpulse-team-3b0a18441_hackpulse-hackathon-hackpulse2026-ugcPost-7513644640395239424-w3n2/',
    },
    image: {
      src: '/images/hackpulse-2026-first-place.webp',
      alt: 'Rudra Pratap Singh receiving the 1st place trophy at HackPulse 2026, UEM Jaipur',
      width: 1280,
      height: 720,
    },
  },
  {
    result: '3rd Runner Up',
    event: 'Agora EchoSphere 2026 Hackathon',
    meta: 'Microsoft office, Gurugram · 12 Sep 2026',
    description:
      'Team of three with Aryan Techie and Shipra Porwal. We built Aria, a real-time voice sales agent on the Agora Conversational AI Engine.',
    link: { label: 'Aria on GitHub', href: 'https://github.com/Aryan-Techie/aria' },
    image: {
      src: '/images/agora-echosphere-2026.webp',
      alt: 'Rudra Pratap Singh and teammates holding the 3rd Runner Up cheque at Agora EchoSphere 2026',
      width: 1280,
      height: 776,
    },
  },
  {
    result: 'Speaker',
    event: 'Omarchy New Delhi',
    meta: 'Thoughtworks office, New Delhi · 10 Oct 2026',
    description:
      'My first talk. I co-organised the meetup and spoke on "The Systematic Way of Vibe Coding" to a room of working professionals.',
  },
]

export function Achievements() {
  return (
    <section
      id="achievements"
      className="relative px-6 md:px-14 lg:px-20 py-24 md:py-36 border-b border-white/10 overflow-hidden scroll-mt-24"
    >
      {/* static ambient glow behind the glass */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-50"
        style={{
          background:
            'radial-gradient(50% 40% at 85% 15%, rgba(16,185,129,0.10), transparent 60%), radial-gradient(45% 45% at 10% 90%, rgba(45,212,191,0.07), transparent 60%)',
        }}
      />
      <GhostNum n="03" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <Kicker num="03" label="Wins" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16 md:mb-20">
          <h2
            className="md:col-span-7 font-playfair italic text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.05]"
            data-reveal
          >
            Hackathons and talks
          </h2>
          <p
            className="md:col-span-5 md:pt-4 text-white/50 leading-relaxed self-end"
            data-reveal
            style={{ '--rd': 1 } as React.CSSProperties}
          >
            Where the building got tested against a clock and a room full of people.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {wins.map((win, i) => (
            <article
              key={win.event}
              className={`glass glow-card rounded-3xl overflow-hidden flex flex-col ${
                win.image ? '' : 'md:col-span-2'
              }`}
              data-reveal
              style={{ '--rd': i } as React.CSSProperties}
              onPointerMove={trackGlow}
            >
              {win.image && (
                <img
                  src={win.image.src}
                  alt={win.image.alt}
                  width={win.image.width}
                  height={win.image.height}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-video object-cover"
                />
              )}
              <div className="p-8 md:p-10 flex flex-col gap-4 flex-1">
                <span className="text-[11px] uppercase tracking-[0.2em] text-emerald-300/80">
                  {win.result}
                </span>
                <h3 className="font-playfair text-3xl md:text-4xl leading-tight text-white">
                  {win.event}
                </h3>
                <p className="text-sm text-white/50">{win.meta}</p>
                <p className="text-white/70 leading-relaxed">{win.description}</p>
                {win.link && (
                  <a
                    href={win.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-target group mt-auto pt-2 inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-emerald-300 transition-colors"
                  >
                    {win.link.label}
                    <ArrowUpRight
                      className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      strokeWidth={1.5}
                    />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
