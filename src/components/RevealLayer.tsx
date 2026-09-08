import { useEffect, useRef } from 'react'

export const SPOTLIGHT_R = 260

interface RevealLayerProps {
  image: string
}

/**
 * Cursor-following spotlight that reveals a second image layer.
 * Implemented as a CSS radial-gradient mask written straight to the DOM —
 * no canvas encoding, no React re-renders. The rAF loop only runs while
 * the hero is on screen.
 */
export function RevealLayer({ image }: RevealLayerProps) {
  const revealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = revealRef.current
    if (!el) return

    const mouse = { x: -999, y: -999 }
    const pos = { x: -999, y: -999 }
    let raf = 0
    let running = false

    const setMask = () => {
      const m = `radial-gradient(circle ${SPOTLIGHT_R}px at ${pos.x.toFixed(1)}px ${pos.y.toFixed(1)}px, rgb(255 255 255) 40%, rgb(255 255 255 / 0.75) 60%, rgb(255 255 255 / 0.4) 75%, rgb(255 255 255 / 0.12) 88%, transparent 100%)`
      el.style.maskImage = m
      el.style.setProperty('-webkit-mask-image', m)
    }

    const tick = () => {
      pos.x += (mouse.x - pos.x) * 0.1
      pos.y += (mouse.y - pos.y) * 0.1
      setMask()
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(tick)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const io = new IntersectionObserver(([entry]) =>
      entry.isIntersecting ? start() : stop()
    )
    io.observe(el)

    setMask()
    return () => {
      window.removeEventListener('mousemove', onMove)
      io.disconnect()
      stop()
    }
  }, [])

  return (
    <div
      ref={revealRef}
      className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
      style={{ backgroundImage: `url(${image})` }}
    />
  )
}
