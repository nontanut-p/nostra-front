import { useState } from 'react'
import { cn } from '../lib/cn'
import LifeAreaCards from './LifeAreaCards'
import TarotCoreCTA from './TarotCoreCTA'
import FullGuide from './FullGuide'

function StepBadge({
  n,
  titleTh,
  done,
  active,
}: {
  n: number
  titleTh: string
  done?: boolean
  active?: boolean
}) {
  return (
    <div className="mb-3 flex items-center gap-2.5">
      <span
        className={cn(
          'grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold transition',
          done
            ? 'bg-nebula-teal/20 text-nebula-teal ring-1 ring-nebula-teal/50'
            : active
              ? 'bg-gold/20 text-gold ring-1 ring-gold/50'
              : 'bg-surface text-slate-400 ring-1 ring-surface-border',
        )}
      >
        {done ? '✓' : n}
      </span>
      <h3 lang="th" className="font-serif text-sm font-semibold tracking-wide text-slate-200">
        {titleTh}
      </h3>
    </div>
  )
}

export default function GamifiedInsights() {
  // Step 2 → Step 3 progressive disclosure gate.
  const [tarotPulled, setTarotPulled] = useState(false)

  return (
    <section className="panel flex flex-col gap-5 p-4 sm:p-5" aria-label="ข้อมูลเชิงลึกแบบทีละขั้นตอน">
      {/* STEP 1 — calculated life path: 2x2 score cards */}
      <div>
        <StepBadge n={1} titleTh="ดวงชะตา 4 ด้านหลัก" active />
        <LifeAreaCards />
      </div>

      <div className="hairline" />

      {/* STEP 2 — interactive tarot core CTA */}
      <div>
        <StepBadge n={2} titleTh="แกนหลักทาโรต์ (Interactive Core)" done={tarotPulled} active={!tarotPulled} />
        <TarotCoreCTA pulled={tarotPulled} onPull={() => setTarotPulled(true)} />
      </div>

      <div className="hairline" />

      {/* STEP 3 — dynamic integration result, locked until step 2 done */}
      <div>
        <StepBadge n={3} titleTh="บทสรุปคำแนะนำ (Full Guide)" active={tarotPulled} />
        <FullGuide unlocked={tarotPulled} />
        {tarotPulled && (
          <button
            type="button"
            onClick={() => setTarotPulled(false)}
            className="tap mt-3 w-full rounded-xl border border-surface-border/60 py-2 text-xs text-slate-400 transition hover:border-gold/40 hover:text-gold"
          >
            <span lang="th" className="font-thai">
              รีเซ็ตขั้นตอน
            </span>
          </button>
        )}
      </div>
    </section>
  )
}
