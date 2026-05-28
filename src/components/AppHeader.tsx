import { useState } from 'react'
import { Menu, X, User, Home, Sparkles, IdCard, CalendarDays } from 'lucide-react'
import { cn } from '../lib/cn'

const navItems = [
  { id: 'home', labelTh: 'หน้าหลัก', icon: Home },
  { id: 'forecast', labelTh: 'คำทำนาย', icon: Sparkles },
  { id: 'profile', labelTh: 'ข้อมูลส่วนตัว', icon: IdCard },
  { id: 'calendar', labelTh: 'ปฏิทิน', icon: CalendarDays },
]

function BrandLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'font-display font-semibold leading-none text-gold-sheen text-shadow-gold',
        className,
      )}
    >
      N<span className="relative">Ö</span>STRA
    </span>
  )
}

export default function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')

  return (
    <header className="sticky top-0 z-40 border-b border-surface-border/50 bg-midnight-900/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:py-4">
        {/* Left: hamburger (mobile) / full branding (desktop) */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="เปิดเมนู"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="tap grid place-items-center rounded-xl border border-surface-border/60 bg-surface/60 text-gold transition hover:bg-surface-raised hover:shadow-gold lg:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Desktop: full branding with subtitle on the top-left */}
          <div className="hidden lg:flex lg:flex-col lg:leading-tight">
            <BrandLogo className="text-2xl tracking-brand" />
            <span lang="th" className="mt-1 font-thai text-xs text-gold/70">
              จังหวะเวลาทางโหราศาสตร์ • 2026
            </span>
          </div>
        </div>

        {/* Center: logo (mobile only — desktop shows it on the left) */}
        <div className="flex flex-1 flex-col items-center lg:hidden">
          <BrandLogo className="text-xl tracking-[0.3em] sm:text-2xl" />
          <span lang="th" className="font-thai text-[0.62rem] text-gold/70">
            จังหวะเวลาทางโหราศาสตร์ • 2026
          </span>
        </div>

        {/* Center-right: full nav on desktop */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = active === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                className={cn(
                  'tap flex items-center gap-2 rounded-xl px-4 text-sm font-medium transition',
                  isActive
                    ? 'bg-gold/10 text-gold shadow-gold'
                    : 'text-slate-300 hover:bg-surface/60 hover:text-gold',
                )}
              >
                <Icon size={18} />
                <span lang="th" className="font-thai">
                  {item.labelTh}
                </span>
              </button>
            )
          })}
        </nav>

        {/* Right: profile avatar bubble */}
        <button
          type="button"
          aria-label="โปรไฟล์ผู้ใช้"
          className="tap relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border border-gold/50 bg-gradient-to-br from-nebula-indigo/60 to-midnight-700 text-gold shadow-gold transition hover:shadow-gold-lg"
        >
          <User size={20} />
          <span className="absolute -right-0 -top-0 h-3 w-3 rounded-full border-2 border-midnight-900 bg-nebula-teal" />
        </button>
      </div>

      {/* Mobile slide-down menu */}
      <div
        className={cn(
          'overflow-hidden border-t border-surface-border/40 transition-[max-height,opacity] duration-300 lg:hidden',
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <nav className="flex flex-col gap-1 p-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = active === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActive(item.id)
                  setMenuOpen(false)
                }}
                className={cn(
                  'tap flex items-center gap-3 rounded-xl px-4 text-base font-medium transition',
                  isActive
                    ? 'bg-gold/10 text-gold'
                    : 'text-slate-200 hover:bg-surface/60',
                )}
              >
                <Icon size={20} className={isActive ? 'text-gold' : 'text-gold/70'} />
                <span lang="th" className="font-thai">
                  {item.labelTh}
                </span>
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
