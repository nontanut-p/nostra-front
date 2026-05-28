import { lazy, Suspense, useState } from 'react'
import { Crosshair, Globe, Moon, Info } from 'lucide-react'
import DateTimeSwitcher from './DateTimeSwitcher'
import MonthTimeline from './MonthTimeline'
import { dateSequence, months, type MonthLabel } from '../data/mockData'
import { cn } from '../lib/cn'

// Code-split the WebGL bundle so first paint isn't blocked by Three.js.
const PlanetaryOrbit = lazy(() => import('./orbit/PlanetaryOrbit'))

type ViewMode = 'system' | 'globe' | 'lunar'

const viewButtons: { id: ViewMode; icon: typeof Crosshair; label: string }[] = [
  { id: 'system', icon: Crosshair, label: 'มุมมองระบบสุริยะ' },
  { id: 'globe', icon: Globe, label: 'มุมมองโลก' },
  { id: 'lunar', icon: Moon, label: 'มุมมองดวงจันทร์' },
]

function OrbitFallback() {
  return (
    <div className="grid h-full w-full place-items-center">
      <div className="flex flex-col items-center gap-3 text-gold/70">
        <span className="h-12 w-12 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
        <span lang="th" className="font-thai text-xs">
          กำลังโหลดแผนภูมิดาว…
        </span>
      </div>
    </div>
  )
}

export default function AstroTimingCore() {
  const [dateIdx, setDateIdx] = useState(2) // points at "12 พฤษภาคม"
  const [activeMonth, setActiveMonth] = useState<MonthLabel>('MAY')
  const [view, setView] = useState<ViewMode>('system')

  const label = dateSequence[dateIdx]
  const stepDate = (dir: -1 | 1) =>
    setDateIdx((i) => Math.min(dateSequence.length - 1, Math.max(0, i + dir)))

  const stepMonth = (dir: -1 | 1) => {
    const idx = months.indexOf(activeMonth)
    const next = Math.min(months.length - 1, Math.max(0, idx + dir))
    setActiveMonth(months[next])
  }

  return (
    <section className="panel flex flex-col gap-4 p-4 sm:p-5" aria-label="แกนหลักจังหวะเวลาทางโหราศาสตร์">
      {/* Top: date / time switcher */}
      <DateTimeSwitcher label={label} onPrev={() => stepDate(-1)} onNext={() => stepDate(1)} />

      {/* Middle: responsive 3D orbit canvas */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-surface-border/40 bg-[radial-gradient(ellipse_at_center,#141d33_0%,#080b14_75%)] sm:aspect-[4/3] lg:aspect-square">
        <Suspense fallback={<OrbitFallback />}>
          <PlanetaryOrbit />
        </Suspense>

        {/* vertical view-control buttons (right edge) */}
        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2 rounded-2xl border border-surface-border/50 bg-midnight-900/60 p-1.5 backdrop-blur-md">
          {viewButtons.map((b) => {
            const Icon = b.icon
            const isActive = view === b.id
            return (
              <button
                key={b.id}
                type="button"
                aria-label={b.label}
                aria-pressed={isActive}
                onClick={() => setView(b.id)}
                className={cn(
                  'tap grid place-items-center rounded-xl transition',
                  isActive
                    ? 'bg-gold/15 text-gold shadow-gold'
                    : 'text-slate-300 hover:bg-surface/60 hover:text-gold',
                )}
              >
                <Icon size={18} />
              </button>
            )
          })}
          <span className="mt-0.5 rounded-lg bg-gold/10 px-2 py-1 text-[0.6rem] font-bold tracking-widest text-gold">
            3D
          </span>
        </div>
      </div>

      {/* numerology lessons label */}
      <div className="flex items-center justify-center gap-2 text-slate-300">
        <span lang="th" className="font-thai text-sm">
          1-9 บทเรียนทางตัวเลข
        </span>
        <button
          type="button"
          aria-label="ข้อมูลบทเรียนทางตัวเลข"
          className="tap grid h-7 w-7 place-items-center rounded-full text-gold/70 transition hover:text-gold"
        >
          <Info size={15} />
        </button>
      </div>

      {/* Bottom: month timeline */}
      <MonthTimeline active={activeMonth} onSelect={setActiveMonth} onStep={stepMonth} />
    </section>
  )
}
