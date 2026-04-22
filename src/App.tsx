import { useEffect, useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent } from 'react'
import olivaInterior from './assets/venues/oliva-interior.webp'
import olivaTerrace from './assets/venues/oliva-terrace.webp'
import cocktail1 from './assets/venues/25831.png'
import cocktail2 from './assets/venues/10246.png'
import city1 from './assets/venues/99181.png'
import city2 from './assets/venues/8581.png'

type Stage = {
  label: string
  x: number
  y: number
  rotate: number
  scaleX: number
  scaleY: number
  mode: 'click' | 'dodge'
  reactivity?: number
  extra?: string
}

const stages: Stage[] = [
  { label: 'no',        x: 0,    y: 0,   rotate: 0,   scaleX: 1,    scaleY: 1,    mode: 'click' },
  { label: 'nope',      x: 0,    y: 0,   rotate: -8,  scaleX: 0.88, scaleY: 0.88, mode: 'click' },
  { label: 'nah',       x: 0,    y: 0,   rotate: 12,  scaleX: 0.78, scaleY: 0.78, mode: 'click' },
  { label: 'nnnno',     x: 0,    y: 0,   rotate: 0,   scaleX: 1.7,  scaleY: 0.5,  mode: 'click' },
  { label: 'no',        x: 0,    y: 0,   rotate: 0,   scaleX: 0.5,  scaleY: 1.55, mode: 'click' },
  { label: 'hmm…',      x: -140, y: -80, rotate: -20, scaleX: 0.72, scaleY: 0.72, mode: 'click' },
  { label: 'over here', x: 140,  y: 80,  rotate: 22,  scaleX: 0.7,  scaleY: 0.7,  mode: 'click' },
  { label: 'sideways',  x: 0,    y: 0,   rotate: 90,  scaleX: 0.78, scaleY: 0.78, mode: 'click', extra: 'btn-wobble' },
  { label: 'ghost…',    x: 40,   y: -30, rotate: -10, scaleX: 0.7,  scaleY: 0.7,  mode: 'click', extra: 'btn-ghost' },
  { label: 'catch me',  x: 0,    y: 0,   rotate: 0,   scaleX: 0.68, scaleY: 0.68, mode: 'dodge', reactivity: 1 },
]

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

function App() {
  const [accepted, setAccepted] = useState(false)
  const [step, setStep] = useState(0)
  const [dodge, setDodge] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const stage = stages[Math.min(step, stages.length - 1)]
  const isDodge = stage.mode === 'dodge'
  const intensity = step / (stages.length - 1)

  useEffect(() => {
    if (!isDodge) setDodge({ x: 0, y: 0 })
  }, [isDodge])

  const handleClick = () => {
    if (isDodge) {
      setAccepted(true)
      return
    }
    setStep((s) => Math.min(s + 1, stages.length - 1))
  }

  const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!isDodge || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const homeX = rect.width - 56
    const homeY = rect.height / 2
    const cx = e.clientX - rect.left
    const cy = e.clientY - rect.top

    setDodge((prev) => {
      const btnX = homeX + prev.x
      const btnY = homeY + prev.y
      const dx = btnX - cx
      const dy = btnY - cy
      const dist = Math.hypot(dx, dy) || 1
      const threshold = 160
      if (dist < threshold) {
        const force = (1 - dist / threshold) * 110 * (stage.reactivity ?? 1)
        const nx = (dx / dist) * force
        const ny = (dy / dist) * force
        return {
          x: clamp(prev.x * 0.45 + nx, -230, 20),
          y: clamp(prev.y * 0.45 + ny, -95, 95),
        }
      }
      return { x: prev.x * 0.82, y: prev.y * 0.82 }
    })
  }

  const x = stage.x + dodge.x
  const y = stage.y + dodge.y

  const noTransition = isDodge
    ? 'transform 140ms cubic-bezier(0.22, 1, 0.36, 1)'
    : 'transform 520ms cubic-bezier(0.34, 1.56, 0.64, 1)'

  return (
    <>
      <main className="mx-auto flex min-h-[100svh] w-full max-w-xl flex-col justify-center px-6 py-10">
        <p className="text-[0.68rem] uppercase tracking-[0.3em] text-rose-200/60">
          mon · apr 27 · 4pm · marburg
        </p>

        <h1 className="mt-3 font-display text-4xl leading-[1] text-[var(--color-cream)] sm:text-5xl">
          A date?
        </h1>

        <p className="mt-2 text-sm text-rose-50/65">
          I pick you up by car. Drinks, dinner, view.
        </p>

        <div
          ref={containerRef}
          onMouseMove={handleMove}
          className="relative mt-12 h-60 w-full"
        >
          <button
            type="button"
            onClick={() => setAccepted(true)}
            style={{ '--i': intensity } as CSSProperties}
            className="btn-yes absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-[var(--color-cream)] px-6 py-3 text-sm font-medium text-[#12050f] active:scale-95"
          >
            yes
          </button>

          <button
            type="button"
            onClick={handleClick}
            className={`btn-no absolute right-0 top-1/2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-rose-50/70 backdrop-blur-sm hover:border-white/25 ${stage.extra ?? ''}`}
            style={{
              transform: `translate(${x}px, calc(-50% + ${y}px)) rotate(${stage.rotate}deg) scale(${stage.scaleX}, ${stage.scaleY})`,
              transition: noTransition,
            }}
          >
            {stage.label}
          </button>
        </div>

        {isDodge ? (
          <p className="mt-4 text-center text-[0.66rem] uppercase tracking-[0.3em] text-rose-200/40">
            catch it to surrender
          </p>
        ) : null}
      </main>

      {accepted ? <PlanModal onClose={() => setAccepted(false)} /> : null}
    </>
  )
}

type Stop = {
  time: string
  title: string
  note?: string
  images?: string[]
}

const stops: Stop[] = [
  { time: '4:00', title: 'visit your city', note: 'I come pick you up. A little surprise along the way.', images: [city1, city2] },
  { time: '6:00', title: 'cocktails', note: "buvons de l'alcool sans alcool.", images: [cocktail1, cocktail2] },
  { time: '7:30', title: 'dinner', note: 'mangeons du pain allemand uniquement.', images: [olivaInterior, olivaTerrace] },
]

function PlanModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[rgba(12,5,10,0.78)] px-4 py-8 backdrop-blur-md">
      <div className="modal-enter w-full max-w-md rounded-2xl border border-white/10 bg-[#1a0a14] p-6">
        <p className="text-[0.68rem] uppercase tracking-[0.3em] text-rose-200/60">the plan</p>

        <ol className="mt-5 space-y-5">
          {stops.map((stop) => (
            <li key={stop.time} className="flex gap-4">
              <span className="w-12 shrink-0 pt-0.5 font-display text-base italic text-[var(--color-gold)]">
                {stop.time}
              </span>
              <div className="flex-1">
                <p className="text-sm text-[var(--color-cream)]">{stop.title}</p>
                {stop.note ? <p className="mt-0.5 text-xs text-rose-50/55">{stop.note}</p> : null}
                {stop.images ? (
                  <div className="mt-2 grid grid-cols-2 gap-1.5">
                    {stop.images.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt=""
                        className="aspect-[4/3] w-full rounded-md object-cover opacity-85"
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ol>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-rose-50/70 transition hover:bg-white/5"
        >
          close
        </button>
      </div>
    </div>
  )
}

export default App
