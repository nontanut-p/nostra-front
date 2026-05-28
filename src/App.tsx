import AppHeader from './components/AppHeader'
import StarField from './components/StarField'
import AstroDataWidgets from './components/AstroDataWidgets'
import YearAheadHighlights from './components/YearAheadHighlights'
import AstroTimingCore from './components/AstroTimingCore'
import GamifiedInsights from './components/GamifiedInsights'
import BottomNav from './components/BottomNav'

/**
 * Responsive layout:
 *  - Mobile / tablet (< lg): single scrolling column. Order via `order-*`:
 *      1. Astro positions  2. Orbit core  3. Gamified steps  4. Year-ahead
 *  - Desktop (>= lg): 3-column grid (25% | 50% | 25%) via a 4-col grid where
 *    the center spans 2 columns. Left column stacks Astro + Year-ahead.
 */
export default function App() {
  return (
    <div className="relative min-h-[100dvh] text-slate-200">
      <StarField />
      <AppHeader />

      <main className="mx-auto max-w-[1600px] px-3 pb-28 pt-4 sm:px-5 lg:px-6 lg:pb-10">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:items-start lg:gap-5">
          {/* LEFT — astro positions (top of left column) */}
          <div className="order-1 lg:order-none lg:col-start-1 lg:row-start-1">
            <AstroDataWidgets />
          </div>

          {/* CENTER — interactive astro-timing core (hero / main focus) */}
          <div className="order-2 lg:order-none lg:col-start-2 lg:col-span-2 lg:row-start-1 lg:row-span-2">
            <AstroTimingCore />
          </div>

          {/* RIGHT — step-by-step gamified insights */}
          <div className="order-3 lg:order-none lg:col-start-4 lg:row-start-1 lg:row-span-2">
            <GamifiedInsights />
          </div>

          {/* LEFT — year-ahead highlights (bottom of left column) */}
          <div className="order-4 lg:order-none lg:col-start-1 lg:row-start-2">
            <YearAheadHighlights />
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
