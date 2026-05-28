import { ChevronLeft, ChevronRight } from 'lucide-react'
import { months, type MonthLabel } from '../data/mockData'
import { cn } from '../lib/cn'

interface Props {
  active: MonthLabel
  onSelect: (m: MonthLabel) => void
  onStep: (dir: -1 | 1) => void
}

export default function MonthTimeline({ active, onSelect, onStep }: Props) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label="เดือนก่อนหน้า"
        onClick={() => onStep(-1)}
        className="tap grid shrink-0 place-items-center rounded-full border border-surface-border/60 bg-surface/60 text-gold transition hover:bg-surface-raised active:scale-95"
      >
        <ChevronLeft size={20} />
      </button>

      {/* horizontal scrollable timeline */}
      <div className="relative flex-1 overflow-x-auto">
        {/* track line */}
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <ul className="relative flex min-w-max items-center justify-between gap-1 px-1">
          {months.map((m) => {
            const isActive = m === active
            return (
              <li key={m}>
                <button
                  type="button"
                  onClick={() => onSelect(m)}
                  className={cn(
                    'tap flex flex-col items-center gap-1.5 rounded-xl px-3 py-1.5 transition',
                    isActive ? 'text-gold' : 'text-slate-400 hover:text-slate-200',
                  )}
                >
                  <span
                    className={cn(
                      'h-2.5 w-2.5 rounded-full border transition',
                      isActive
                        ? 'border-gold bg-gold shadow-gold'
                        : 'border-slate-500 bg-midnight-800',
                    )}
                  />
                  <span
                    className={cn(
                      'text-xs font-semibold tracking-[0.15em] transition',
                      isActive && 'text-shadow-gold',
                    )}
                  >
                    {m}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <button
        type="button"
        aria-label="เดือนถัดไป"
        onClick={() => onStep(1)}
        className="tap grid shrink-0 place-items-center rounded-full border border-surface-border/60 bg-surface/60 text-gold transition hover:bg-surface-raised active:scale-95"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  )
}
