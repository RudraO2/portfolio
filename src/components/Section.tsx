import { useEffect, useRef } from 'react'

/** Pointer handler for .glow-card: writes cursor position to CSS vars. */
export function trackGlow(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--gx', `${e.clientX - r.left}px`)
  el.style.setProperty('--gy', `${e.clientY - r.top}px`)
}

/** Editorial section kicker: number — label + hairline rule to the edge. */
export function Kicker({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-5 mb-12 md:mb-16" data-reveal>
      <p className="text-xs uppercase tracking-[0.25em] text-emerald-300/70 whitespace-nowrap">
        {num} — {label}
      </p>
      <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
    </div>
  )
}

/** Giant outlined ghost numeral, decorative motif for every section. */
export function GhostNum({ n, side = 'right' }: { n: string; side?: 'left' | 'right' }) {
  return (
    <span
      aria-hidden="true"
      className={`ghost-num hidden md:block ${side === 'left' ? 'left-0 -translate-x-6' : 'right-0 translate-x-6'}`}
    >
      {n}
    </span>
  )
}

/** Count-up numeral that animates once when scrolled into view. */
export function Stat({
  value,
  decimals = 0,
  suffix = '',
  label,
}: {
  value: number
  decimals?: number
  suffix?: string
  label: string
}) {
  const numRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = numRef.current
    if (!el) return
    const final = value.toFixed(decimals) + suffix
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = final
      return
    }
    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        const dur = 1400
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur)
          const e = 1 - Math.pow(1 - p, 3) // easeOutCubic
          el.textContent = (value * e).toFixed(decimals) + suffix
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, decimals, suffix])

  return (
    <div
      className="glass glass-hover glow-card rounded-3xl p-7 md:p-8"
      data-reveal
      onPointerMove={trackGlow}
    >
      <p className="font-playfair italic text-5xl md:text-6xl text-white leading-none">
        <span ref={numRef}>0{suffix}</span>
      </p>
      <p className="mt-4 text-sm text-white/50 leading-relaxed max-w-[26ch]">{label}</p>
    </div>
  )
}
