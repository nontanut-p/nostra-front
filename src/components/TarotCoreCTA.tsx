import { Sparkles, Check } from 'lucide-react'
import { tarotSpread } from '../data/mockData'
import { cn } from '../lib/cn'

interface Props {
  pulled: boolean
  onPull: () => void
}

export default function TarotCoreCTA({ pulled, onPull }: Props) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border p-4 transition-all duration-500',
        pulled
          ? 'border-gold/60 bg-gradient-to-br from-nebula-indigo/30 via-surface to-midnight-800 shadow-gold-lg'
          : 'border-gold/40 bg-gradient-to-br from-surface to-midnight-800 shadow-gold animate-pulse-glow',
      )}
    >
      {/* shimmer sweep */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(240,214,126,0.12)_50%,transparent_70%)] bg-[length:200%_100%] animate-shimmer"
      />

      {!pulled ? (
        <button
          type="button"
          onClick={onPull}
          className="tap relative flex w-full flex-col items-center gap-2 py-3 text-center"
        >
          <span className="grid h-14 w-14 place-items-center rounded-full border border-gold/50 bg-midnight-900/60 text-gold shadow-gold">
            <Sparkles size={26} />
          </span>
          <span className="font-serif text-lg font-semibold text-gold-sheen">
            แกนหลักทาโรต์ประจำวัน
          </span>
          <span lang="th" className="font-thai text-xs text-slate-300">
            Tarot Core Concept · แตะเพื่อเปิดไพ่ของคุณ
          </span>
          <span className="mt-1 rounded-full bg-gold/15 px-4 py-1.5 text-sm font-semibold text-gold">
            เปิดไพ่
          </span>
        </button>
      ) : (
        <div className="relative animate-fade-in-up">
          <div className="mb-3 flex items-center justify-center gap-2 text-nebula-teal">
            <Check size={16} />
            <span lang="th" className="font-thai text-xs font-medium">
              เปิดไพ่เรียบร้อย
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {tarotSpread.map((card, i) => (
              <div
                key={card.id}
                className="flex flex-col items-center gap-1 rounded-xl border border-gold/30 bg-midnight-900/60 p-2 text-center animate-fade-in-up"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <span className="text-2xl text-gold text-shadow-gold" aria-hidden>
                  {card.glyph}
                </span>
                <span className="font-serif text-[0.7rem] font-semibold leading-tight text-slate-100">
                  {card.name}
                </span>
                <span lang="th" className="font-thai text-[0.62rem] text-slate-400">
                  {card.nameTh}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
