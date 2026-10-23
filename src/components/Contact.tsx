import { MapPin, GraduationCap, Briefcase } from 'lucide-react'
import { Kicker, GhostNum, trackGlow } from './Section'

const details = [
  { Icon: MapPin, label: 'Location', value: 'Jaipur, Rajasthan, India' },
  { Icon: GraduationCap, label: 'Education', value: 'BS in Data Science, IIT Madras' },
  { Icon: Briefcase, label: 'Open to', value: 'Internships, technical roles, and side projects' },
]

export function Contact() {
  return (
    <section
      id="contact"
      className="relative px-6 md:px-14 lg:px-20 py-24 md:py-36 overflow-hidden scroll-mt-24"
    >
      {/* static ambient glow behind the glass */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-60"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 100%, rgba(16,185,129,0.12), transparent 65%), radial-gradient(40% 40% at 85% 10%, rgba(45,212,191,0.07), transparent 60%)',
        }}
      />
      <GhostNum n="05" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <Kicker num="05" label="Contact" />

        <h2
          className="font-playfair text-5xl sm:text-6xl md:text-8xl font-normal leading-[1.02] max-w-4xl"
          data-reveal
        >
          Let&apos;s build{' '}
          <em className="italic text-emerald-300">something real.</em>
        </h2>

        <p
          className="mt-8 text-lg text-white/60 leading-relaxed max-w-2xl"
          data-reveal
          style={{ '--rd': 1 } as React.CSSProperties}
        >
          Always happy to discuss software, interesting engineering problems,
          internships, or new ideas to build. Reach out anytime.
        </p>

        {/* Giant mail link on glass */}
        <div
          className="glass glass-hover glow-card rounded-3xl px-7 py-8 md:px-10 md:py-10 mt-12 md:mt-16"
          data-reveal
          style={{ '--rd': 2 } as React.CSSProperties}
          onPointerMove={trackGlow}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">Email</p>
          <a
            href="mailto:rudra.pratap.12233@gmail.com"
            className="cursor-target link-underline inline-block font-playfair italic text-2xl sm:text-4xl md:text-5xl text-white break-all leading-snug"
          >
            rudra.pratap.12233@gmail.com
          </a>
        </div>

        {/* Detail tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6 mt-14 md:mt-20">
          {details.map(({ Icon, label, value }, i) => (
            <div
              key={label}
              className="glass glass-hover glow-card rounded-3xl p-7"
              data-reveal
              style={{ '--rd': i } as React.CSSProperties}
              onPointerMove={trackGlow}
            >
              <Icon className="w-5 h-5 text-emerald-300 mb-4" strokeWidth={1.5} />
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">{label}</p>
              <p className="text-white/90">{value}</p>
            </div>
          ))}
        </div>

        <footer className="mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="font-playfair italic text-xl text-white">
            Rudra Techie <span className="text-white/50 text-base">(Rudra Pratap Singh)</span>
          </span>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="https://github.com/RudraO2"
              target="_blank"
              rel="me noopener noreferrer"
              className="cursor-target text-sm text-white/60 hover:text-emerald-300 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/rudratechie/"
              target="_blank"
              rel="me noopener noreferrer"
              className="cursor-target text-sm text-white/60 hover:text-emerald-300 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:rudra.pratap.12233@gmail.com"
              className="cursor-target text-sm text-white/60 hover:text-emerald-300 transition-colors"
            >
              Email
            </a>
            <p className="text-sm text-white/40">Student at IIT Madras, building from Jaipur</p>
          </div>
        </footer>
      </div>
    </section>
  )
}
