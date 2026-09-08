const items = [
  'Agentic AI',
  'Next.js',
  'LLM Benchmarking',
  'TypeScript',
  'React Native',
  'Python',
  'Airgapped Systems',
  'Streamlit',
  'Supabase',
  'Vercel',
]

/** Infinite tech ticker — pure CSS animation, zero JS. */
export function TechMarquee() {
  const row = (key: string, ariaHidden = false) => (
    <div key={key} aria-hidden={ariaHidden} className="flex items-center shrink-0">
      {items.map((item, i) => (
        <span key={item} className="flex items-center whitespace-nowrap">
          <span
            className={
              i % 2 === 0
                ? 'font-playfair italic text-white/90 text-3xl md:text-5xl'
                : 'marquee-outline font-semibold tracking-tight text-3xl md:text-5xl'
            }
          >
            {item}
          </span>
          <span className="mx-6 md:mx-8 text-emerald-300/70 text-2xl md:text-4xl">·</span>
        </span>
      ))}
    </div>
  )

  return (
    <section className="relative py-24 md:py-32 border-b border-white/10 bg-black overflow-hidden">
      <div className="-rotate-2 scale-105 glass border-x-0 rounded-none py-8 md:py-10 overflow-hidden">
        <div className="marquee-track">
          {row('a')}
          {row('b', true)}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-black to-transparent z-10" />
    </section>
  )
}
