import { Lock, BookOpen } from 'lucide-react'
import { fullGuide } from '../data/mockData'
import { cn } from '../lib/cn'

interface Props {
  unlocked: boolean
}

export default function FullGuide({ unlocked }: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-surface-border/60 bg-surface/60 p-4">
      <div className="mb-3 flex items-center gap-2">
        <BookOpen size={18} className="text-gold" />
        <h4 className="font-serif text-base font-semibold text-slate-100">
          บทสรุปคำแนะนำประจำวัน
        </h4>
      </div>
      <p lang="th" className="mb-3 font-thai text-xs text-slate-400">
        Full Guide · บทตีความรวมจากดวงดาวและไพ่ทาโรต์
      </p>

      {/* Content: blurred + locked until tarot is pulled */}
      <div className="relative">
        <div
          className={cn(
            'flex flex-col gap-3 transition-all duration-700',
            unlocked
              ? 'blur-0 opacity-100'
              : 'pointer-events-none select-none blur-[6px] saturate-50 opacity-60',
          )}
          aria-hidden={!unlocked}
        >
          {fullGuide.map((section) => (
            <div key={section.heading} className="rounded-xl bg-midnight-800/60 p-3">
              <h5 lang="th" className="mb-1 font-thai text-sm font-semibold text-gold">
                {section.heading}
              </h5>
              <p lang="th" className="font-thai text-[0.82rem] leading-relaxed text-slate-300">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* Locked overlay */}
        {!unlocked && (
          <div className="absolute inset-0 grid place-items-center rounded-xl bg-midnight-900/40">
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-surface-border/60 bg-midnight-900/80 px-5 py-4 text-center backdrop-blur-sm">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 bg-midnight-800 text-gold/80">
                <Lock size={20} />
              </span>
              <span lang="th" className="font-thai text-sm font-medium text-slate-200">
                เปิดไพ่ทาโรต์ก่อน
              </span>
              <span lang="th" className="font-thai text-[0.7rem] text-slate-400">
                ทำขั้นตอนที่ 2 ให้เสร็จเพื่อปลดล็อกบทสรุป
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
