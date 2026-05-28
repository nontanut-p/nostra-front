/**
 * Mock data for the NÖSTRA dashboard.
 * Shaped to mirror the reference design; swap for a real API later by
 * keeping these type contracts intact.
 */

export interface AstroPoint {
  key: 'SUN' | 'MOON' | 'ASC' | 'MC'
  label: string
  glyph: string // astrological glyph
  degree: string // e.g. "21°"
  sign: string // e.g. "Taurus"
  signTh: string // Thai sign name
}

export const astroPoints: AstroPoint[] = [
  { key: 'SUN', label: 'SUN', glyph: '☉', degree: '21°', sign: 'Taurus', signTh: 'พฤษภ' },
  { key: 'MOON', label: 'MOON', glyph: '☾', degree: '17°', sign: 'Scorpio', signTh: 'พิจิก' },
  { key: 'ASC', label: 'ASC', glyph: '♈', degree: '13°', sign: 'Aries', signTh: 'เมษ' },
  { key: 'MC', label: 'MC', glyph: '♑', degree: '28°', sign: 'Capricorn', signTh: 'มังกร' },
]

export interface LifeArea {
  id: 'love' | 'career' | 'finance' | 'health'
  titleTh: string
  shortTh: string
  icon: 'heart' | 'briefcase' | 'coins' | 'activity'
  score: number // out of 10
  accent: string // tailwind text color class
}

export const lifeAreas: LifeArea[] = [
  { id: 'love', titleTh: 'ดวงความรัก', shortTh: 'ความรัก', icon: 'heart', score: 8.5, accent: 'text-nebula-rose' },
  { id: 'career', titleTh: 'ดวงการงาน', shortTh: 'การงาน', icon: 'briefcase', score: 8.5, accent: 'text-nebula-violet' },
  { id: 'finance', titleTh: 'ดวงการเงิน', shortTh: 'การเงิน', icon: 'coins', score: 3.5, accent: 'text-gold' },
  { id: 'health', titleTh: 'สุขภาพ', shortTh: 'สุขภาพ', icon: 'activity', score: 8.5, accent: 'text-nebula-teal' },
]

export interface Highlight {
  id: string
  titleTh: string
  subtitleTh: string
  icon: 'sparkles' | 'compass' | 'triangle' | 'gem'
  date?: string
}

export const yearAheadHighlights: Highlight[] = [
  { id: 'tarot', titleTh: 'Tarot Core Insights', subtitleTh: 'แก่นไพ่ทาโรต์ประจำปี', icon: 'sparkles', date: '21 มิ.ย. 2026' },
  { id: 'timing', titleTh: 'Astrology Timing Advice', subtitleTh: 'บทเรียนทางตัวเลข', icon: 'compass' },
  { id: 'element', titleTh: 'Element Balance', subtitleTh: 'กลยุทธ์อี้จิง (I Ching)', icon: 'triangle' },
  { id: 'chakra', titleTh: 'Chakra Reflection', subtitleTh: 'สมดุลพลังงานภายใน', icon: 'gem' },
]

export const months = ['JAN', 'MAR', 'MAY', 'JUL', 'SEP', 'NOV'] as const
export type MonthLabel = (typeof months)[number]

export interface DateState {
  label: string // "12 พฤษภาคม 2026, 10:30 น."
  activeMonth: MonthLabel
}

export const initialDate: DateState = {
  label: '12 พฤษภาคม 2026, 10:30 น.',
  activeMonth: 'MAY',
}

/** Sequential date labels for the chevron switcher (mock day stepping). */
export const dateSequence: string[] = [
  '10 พฤษภาคม 2026, 10:30 น.',
  '11 พฤษภาคม 2026, 10:30 น.',
  '12 พฤษภาคม 2026, 10:30 น.',
  '13 พฤษภาคม 2026, 10:30 น.',
  '14 พฤษภาคม 2026, 10:30 น.',
]

export interface TarotCard {
  id: string
  name: string
  nameTh: string
  arcana: string
  glyph: string
}

/** The three cards "pulled" in Step 2. */
export const tarotSpread: TarotCard[] = [
  { id: 'past', name: 'The Star', nameTh: 'ดวงดาว', arcana: 'XVII', glyph: '✦' },
  { id: 'present', name: 'The Sun', nameTh: 'ดวงอาทิตย์', arcana: 'XIX', glyph: '☀' },
  { id: 'future', name: 'The Moon', nameTh: 'ดวงจันทร์', arcana: 'XVIII', glyph: '☽' },
]

/** Step 3 — revealed only after the tarot core is pulled. */
export interface GuideSection {
  heading: string
  body: string
}

export const fullGuide: GuideSection[] = [
  {
    heading: 'ภาพรวมประจำวัน',
    body: 'พลังของดวงอาทิตย์ในราศีพฤษภเสริมความมั่นคงให้กับการตัดสินใจ จังหวะนี้เหมาะกับการวางรากฐานระยะยาวมากกว่าการเร่งรีบ ค่อย ๆ เดินอย่างมีสติแล้วผลลัพธ์จะตามมา',
  },
  {
    heading: 'คำแนะนำด้านความสัมพันธ์',
    body: 'ไพ่ดวงดาวบ่งบอกถึงความหวังและการเยียวยา เปิดใจสื่อสารอย่างอ่อนโยน แล้วความเข้าใจจะกลับคืนมา หลีกเลี่ยงการตัดสินจากอารมณ์ชั่ววูบ',
  },
  {
    heading: 'จังหวะการเงินและการงาน',
    body: 'ดวงการเงินยังต้องระมัดระวัง (3.5/10) เลี่ยงการลงทุนที่ไม่คุ้นเคย แต่ดวงการงานเด่น (8.5/10) เหมาะกับการนำเสนอไอเดียและสร้างเครือข่ายใหม่',
  },
]
