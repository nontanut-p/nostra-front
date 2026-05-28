import { Sparkles, Compass, Triangle, Gem, ChevronRight } from 'lucide-react'
import { yearAheadHighlights, type Highlight } from '../data/mockData'

const iconMap = {
  sparkles: Sparkles,
  compass: Compass,
  triangle: Triangle,
  gem: Gem,
} as const

function HighlightRow({ item }: { item: Highlight }) {
  const Icon = iconMap[item.icon]
  return (
    <button
      type="button"
      className="tap group flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition hover:bg-surface-raised/60"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-gold/30 bg-midnight-700/70 text-gold transition group-hover:shadow-gold">
        <Icon size={18} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-serif text-[0.95rem] font-medium text-slate-100">
          {item.titleTh}
        </span>
        <span lang="th" className="block truncate font-thai text-xs text-slate-400">
          {item.subtitleTh}
          {item.date ? ` • ${item.date}` : ''}
        </span>
      </span>
      <ChevronRight
        size={18}
        className="shrink-0 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-gold"
      />
    </button>
  )
}

export default function YearAheadHighlights() {
  return (
    <section className="panel relative overflow-hidden p-4" aria-labelledby="year-ahead-heading">
      {/* mystical cat / moon motif echo (decorative) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-8 h-40 w-40 rounded-full bg-gradient-to-br from-nebula-violet/30 to-transparent blur-2xl"
      />
      <div className="relative mb-2 flex items-center justify-between">
        <h2 id="year-ahead-heading" className="eyebrow">
          Year Ahead Highlight
        </h2>
      </div>
      <p lang="th" className="relative mb-3 font-thai text-xs text-slate-400">
        จุดเด่นและจังหวะสำคัญตลอดทั้งปี
      </p>
      <div className="relative flex flex-col gap-1">
        {yearAheadHighlights.map((h) => (
          <HighlightRow key={h.id} item={h} />
        ))}
      </div>
    </section>
  )
}
