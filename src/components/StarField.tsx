import { useMemo } from 'react'

/**
 * Lightweight CSS/SVG starfield used as the page backdrop behind the whole
 * dashboard (the WebGL canvas only covers the orbit core). Pure DOM so it
 * renders instantly and costs almost nothing.
 */
export default function StarField() {
  const stars = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 0.6,
        delay: Math.random() * 4,
        duration: 2.5 + Math.random() * 3,
      })),
    [],
  )

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-space-radial"
    >
      {/* soft nebula blooms */}
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-nebula-violet/15 blur-3xl" />
      <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-nebula-indigo/15 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      {/* twinkling stars */}
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
