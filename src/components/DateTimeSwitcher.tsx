import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'

interface Props {
  label: string
  onPrev: () => void
  onNext: () => void
}

export default function DateTimeSwitcher({ label, onPrev, onNext }: Props) {
  return (
    <div className="flex items-center justify-between gap-2 sm:gap-4">
      <button
        type="button"
        aria-label="วันก่อนหน้า"
        onClick={onPrev}
        className="tap grid place-items-center rounded-full border border-surface-border/60 bg-surface/60 text-gold transition hover:bg-surface-raised hover:shadow-gold active:scale-95"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        type="button"
        className="tap group flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gold/25 bg-midnight-800/60 px-3 py-2.5 transition hover:border-gold/50"
      >
        <span lang="th" className="font-thai text-sm font-medium text-slate-100 sm:text-base">
          {label}
        </span>
        <ChevronDown
          size={18}
          className="shrink-0 text-gold/70 transition group-hover:text-gold"
        />
      </button>

      <button
        type="button"
        aria-label="วันถัดไป"
        onClick={onNext}
        className="tap grid place-items-center rounded-full border border-surface-border/60 bg-surface/60 text-gold transition hover:bg-surface-raised hover:shadow-gold active:scale-95"
      >
        <ChevronRight size={22} />
      </button>
    </div>
  )
}
