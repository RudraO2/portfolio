import { Kicker, GhostNum, Stat, trackGlow } from './Section'

export function About() {
  return (
    <section
      id="about"
      className="relative px-6 md:px-14 lg:px-20 py-24 md:py-36 border-b border-white/10 overflow-hidden bg-black scroll-mt-24"
    >
      {/* static emerald glow — cheap, no animation */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-60"
        style={{
          background:
            'radial-gradient(60% 60% at 15% 20%, rgba(16,185,129,0.10), transparent 60%), radial-gradient(50% 50% at 90% 90%, rgba(45,212,191,0.08), transparent 60%)',
        }}
      />
      <GhostNum n="01" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <Kicker num="01" label="About" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start">
          {/* Statement + bio */}
          <div className="md:col-span-7">
            <h2
              className="font-playfair text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.08]"
              data-reveal
            >
              Building software people can{' '}
              <em className="italic text-emerald-300">actually use</em>, and{' '}
              <em className="italic">actually shipping it.</em>
            </h2>
            <div
              className="glass glow-card rounded-3xl p-7 md:p-8 mt-10"
              data-reveal
              style={{ '--rd': 1 } as React.CSSProperties}
              onPointerMove={trackGlow}
            >
              <p className="text-lg md:text-xl text-white/70 leading-relaxed">
                I&apos;m Rudra Pratap Singh, known online as Rudra Techie (earlier Rudra O2). I study
                Data Science at IIT Madras and build from Jaipur. Most of what I create starts from personal annoyance: phone carriers showing
                fake 5G icons, private notes being exposed on screen, or benchmarks that reward
                pure API speed over actual reasoning.
              </p>
              <p className="mt-5 text-base text-white/50 leading-relaxed">
                I work across Next.js, React Native, Python, and local AI models. Rather than
                letting code sit unseen, I get it out where anyone can test it right away: live web
                demos on Vercel and Netlify, runnable Streamlit tools, and direct Android APK downloads.
              </p>
            </div>
          </div>

          {/* Portrait card */}
          <div className="md:col-span-5" data-reveal style={{ '--rd': 2 } as React.CSSProperties}>
            <figure className="cursor-target group glass relative rounded-3xl overflow-hidden p-2 md:rotate-2 md:hover:rotate-0 transition-transform duration-500">
              <img
                src="/img2.jpeg"
                alt="Rudra Techie (Rudra Pratap Singh), developer from Jaipur"
                width={1376}
                height={768}
                loading="lazy"
                className="w-full aspect-[4/5] object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-[filter] duration-700"
              />
              <figcaption className="absolute inset-x-2 bottom-2 flex items-center justify-between px-5 py-4 rounded-b-2xl bg-gradient-to-t from-black/80 to-transparent">
                <span className="font-playfair italic text-white text-lg">Rudra Techie</span>
                <span className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Jaipur, India
                </span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Stats band */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6 mt-16 md:mt-24">
          <Stat value={9.0} decimals={1} label="CGPA at IIT Madras (BS in Data Science, exp. 2027)" />
          <Stat value={95.4} decimals={1} suffix="%" label="Class 12 CBSE, 2024" />
          <Stat value={14} suffix="+" label="Projects on GitHub, across public releases and active private builds" />
        </div>
      </div>
    </section>
  )
}
