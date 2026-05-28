import { useState } from 'react'
import { Home, Sparkles, IdCard, CalendarDays } from 'lucide-react'
import { cn } from '../lib/cn'

const items = [
  { id: 'home', labelTh: 'หน้าหลัก', icon: Home },
  { id: 'forecast', labelTh: 'คำทำนาย', icon: Sparkles },
  { id: 'profile', labelTh: 'ข้อมูลส่วนตัว', icon: IdCard },
  { id: 'calendar', labelTh: 'ปฏิทิน', icon: CalendarDays },
]

/** Mobile/tablet bottom tab bar. Hidden on desktop (nav lives in the header). */
export default function BottomNav() {
  const [active, setActive] = useState('home')

  return (
    <nav
      aria-label="แถบนำทางหลัก"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-surface-border/50 bg-midnight-900/90 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-2 py-1.5">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <li key={item.id} className="flex-1">
              <button
                type="button"
                onClick={() => setActive(item.id)}
                className={cn(
                  'tap flex w-full flex-col items-center gap-0.5 rounded-xl py-1.5 transition',
                  isActive ? 'text-gold' : 'text-slate-400',
                )}
              >
                <Icon
                  size={22}
                  className={cn('transition', isActive && 'drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]')}
                />
                <span lang="th" className="font-thai text-[0.62rem] font-medium">
                  {item.labelTh}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
