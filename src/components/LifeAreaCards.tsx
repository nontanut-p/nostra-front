import { Heart, Briefcase, Coins, Activity, ChevronRight } from 'lucide-react'
import { lifeAreas, type LifeArea } from '../data/mockData'
import { cn } from '../lib/cn'

const iconMap = {
  heart: Heart,
  briefcase: Briefcase,
  coins: Coins,
  activity: Activity,
} as const

function scoreTone(score: number) {
  if (score >= 7) return 'text-nebula-teal'
  if (score >= 5) return 'text-gold'
  return 'text-nebula-rose'
}

function LifeCard({ area }: { area: LifeArea }) {
  const Icon = iconMap[area.icon]
  return (
    <div className="panel-inset group flex flex-col gap-2 p-3.5 transition hover:border-gold/40 hover:bg-surface-raised/60">
      <div className="flex items-start justify-between">
        <span
          className={cn(
            'grid h-11 w-11 place-items-center rounded-xl bg-midnight-700/80 shadow-gold transition group-hover:scale-105',
            area.accent,
          )}
        >
          <Icon size={22} />
        </span>
        <span className={cn('font-score text-xl font-bold leading-none', scoreTone(area.score))}>
          {area.score.toFixed(1)}
          <span className="text-xs font-normal text-slate-500">/10</span>
        </span>
      </div>

      <h4 lang="th" className="font-serif text-base font-semibold text-slate-100">
        {area.titleTh}
      </h4>

      {/* score meter */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-midnight-700">
        <div
          className={cn(
            'h-full rounded-full bg-gradient-to-r',
            area.score >= 7
              ? 'from-nebula-teal/70 to-nebula-teal'
              : area.score >= 5
                ? 'from-gold-dark to-gold'
                : 'from-nebula-rose/70 to-nebula-rose',
          )}
          style={{ width: `${(area.score / 10) * 100}%` }}
        />
      </div>

      <button
        type="button"
        className="tap -mx-1 mt-auto flex items-center gap-1 self-start rounded-lg px-1 text-xs font-medium text-gold/90 transition hover:text-gold"
      >
        <span lang="th" className="font-thai">
          ดูรายละเอียด
        </span>
        <ChevronRight size={14} />
      </button>
    </div>
  )
}

export default function LifeAreaCards() {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {lifeAreas.map((a) => (
        <LifeCard key={a.id} area={a} />
      ))}
    </div>
  )
}
