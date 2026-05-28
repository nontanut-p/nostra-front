import { astroPoints, type AstroPoint } from '../data/mockData'

function PointCard({ point }: { point: AstroPoint }) {
  return (
    <div className="panel-inset flex items-center gap-3 p-3 transition hover:border-gold/40">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-midnight-700/80 text-xl text-gold shadow-gold">
        <span aria-hidden>{point.glyph}</span>
      </div>
      <div className="min-w-0">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold/70">
          {point.label}
        </p>
        <p className="font-score text-base font-semibold text-slate-100">
          {point.degree}{' '}
          <span className="font-sans text-sm font-normal text-slate-300">
            {point.sign}
          </span>
        </p>
        <p lang="th" className="font-thai text-xs text-slate-400">
          ราศี{point.signTh}
        </p>
      </div>
    </div>
  )
}

export default function AstroDataWidgets() {
  return (
    <section className="panel p-4" aria-labelledby="astro-data-heading">
      <div className="mb-3 flex items-center justify-between">
        <h2 id="astro-data-heading" className="eyebrow">
          Current Positions
        </h2>
        <span lang="th" className="font-thai text-xs text-slate-400">
          ตำแหน่งดาวปัจจุบัน
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {astroPoints.map((p) => (
          <PointCard key={p.key} point={p} />
        ))}
      </div>
    </section>
  )
}
