import { useEffect, useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent } from 'react'
import olivaInterior from './assets/venues/oliva-interior.webp'
import olivaTerrace from './assets/venues/oliva-terrace.webp'
import cocktail1 from './assets/venues/25831.png'
import cocktail2 from './assets/venues/10246.png'
import city1 from './assets/venues/99181.png'
import city2 from './assets/venues/8581.png'
import mariiaHead from './assets/venues/mariia-head.png'
import melvynHead from './assets/venues/melvyn.png'

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

type Screen = 'form' | 'intro' | 'plan'

function App() {
  const [screen, setScreen] = useState<Screen>('form')
  const [showDino, setShowDino] = useState(false)
  const [step, setStep] = useState(0)
  const [dodge, setDodge] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const stage = stages[Math.min(step, stages.length - 1)]
  const isDodge = stage.mode === 'dodge'
  const intensity = step / (stages.length - 1)

  useEffect(() => {
    if (!isDodge) setDodge({ x: 0, y: 0 })
  }, [isDodge])

  const acceptYes = () => setScreen('intro')

  const handleClick = () => {
    if (isDodge) {
      acceptYes()
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
          mon · apr 27 · 4pm ·{' '}
          <button
            type="button"
            onClick={() => setShowDino(true)}
            aria-label="secret"
            className="secret-m inline-block cursor-pointer text-rose-200/60 hover:text-[var(--color-gold)] transition"
          >
            m
          </button>
          arburg
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
            onClick={acceptYes}
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

      {screen === 'intro' ? <YesIntro onDone={() => setScreen('plan')} /> : null}
      {screen === 'plan' ? <PlanModal onClose={() => setScreen('form')} /> : null}
      {showDino ? <MarburgDino onClose={() => setShowDino(false)} /> : null}
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

function YesIntro({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3200)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className="intro-root fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#12050f] px-6">
      <svg
        viewBox="0 0 900 200"
        className="intro-svg w-full max-w-3xl"
        aria-hidden
      >
        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          className="intro-text"
        >
          i know that you would say yes
        </text>
      </svg>
    </div>
  )
}

function PlanModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[rgba(12,5,10,0.78)] px-4 py-8 backdrop-blur-md">
      <div className="modal-enter w-full max-w-md rounded-2xl border border-white/10 bg-[#1a0a14] p-6">
        <p className="text-[0.68rem] uppercase tracking-[0.3em] text-rose-200/60">the plan</p>

        <ol className="mt-5 space-y-5">
          {stops.map((stop, i) => (
            <li
              key={stop.time}
              className="stop-in flex gap-4"
              style={{ animationDelay: `${0.25 + i * 0.7}s` }}
            >
              <span className="w-12 shrink-0 pt-0.5 font-display text-base italic text-[var(--color-gold)]">
                {stop.time}
              </span>
              <div className="flex-1">
                <p className="text-sm text-[var(--color-cream)]">{stop.title}</p>
                {stop.note ? <p className="mt-0.5 text-xs text-rose-50/55">{stop.note}</p> : null}
                {stop.images ? (
                  <div className="mt-2 grid grid-cols-2 gap-1.5">
                    {stop.images.map((src, j) => (
                      <img
                        key={j}
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

const DINO_W = 680
const DINO_H = 220
const PLAYER_X = 60
const PLAYER_SIZE = 56
const ENEMY_SIZE = 46
const GRAVITY = 0.85
const JUMP_V = 15
const SPEED = 5.2
const GOAL = 10
const FLY_Y = 78

type Enemy = { id: number; x: number; passed: boolean; fly: boolean }

function MarburgDino({ onClose }: { onClose: () => void }) {
  const [, setTick] = useState(0)
  const [jumps, setJumps] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [revealed, setRevealed] = useState(false)

  const yRef = useRef(0)
  const vRef = useRef(0)
  const enemiesRef = useRef<Enemy[]>([])
  const idRef = useRef(0)
  const lastSpawnRef = useRef(0)
  const runningRef = useRef(true)

  const reset = () => {
    yRef.current = 0
    vRef.current = 0
    enemiesRef.current = []
    idRef.current = 0
    lastSpawnRef.current = performance.now()
    setGameOver(false)
    setJumps(0)
    runningRef.current = true
  }

  const jump = () => {
    if (gameOver || revealed) return
    if (yRef.current <= 0.5) vRef.current = -JUMP_V
  }

  useEffect(() => {
    if (jumps >= GOAL && !revealed) {
      setRevealed(true)
      runningRef.current = false
    }
  }, [jumps, revealed])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        if (gameOver) reset()
        else jump()
      } else if (e.code === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [gameOver, revealed, onClose])

  useEffect(() => {
    let raf = 0
    let last = performance.now()
    lastSpawnRef.current = last

    const loop = (t: number) => {
      const dt = Math.min(t - last, 40)
      last = t
      const f = dt / 16

      if (runningRef.current && !revealed) {
        vRef.current += GRAVITY * f
        yRef.current -= vRef.current * f
        if (yRef.current < 0) {
          yRef.current = 0
          vRef.current = 0
        }

        if (t - lastSpawnRef.current > 1400 + Math.random() * 900) {
          const fly = Math.random() < 0.35
          enemiesRef.current.push({ id: idRef.current++, x: DINO_W, passed: false, fly })
          lastSpawnRef.current = t
        }

        for (const e of enemiesRef.current) e.x -= SPEED * f

        for (const e of enemiesRef.current) {
          const overlapX = e.x < PLAYER_X + PLAYER_SIZE - 10 && e.x + ENEMY_SIZE - 10 > PLAYER_X
          if (overlapX) {
            const pBottom = yRef.current
            const pTop = yRef.current + PLAYER_SIZE
            const eBottom = e.fly ? FLY_Y : 0
            const eTop = eBottom + ENEMY_SIZE
            const hits = pTop - 12 > eBottom && pBottom + 12 < eTop
            if (hits) {
              runningRef.current = false
              setGameOver(true)
              break
            }
          }
          if (!e.passed && e.x + ENEMY_SIZE < PLAYER_X) {
            e.passed = true
            setJumps((j) => j + 1)
          }
        }

        enemiesRef.current = enemiesRef.current.filter((e) => e.x + ENEMY_SIZE > -30)

        setTick((n) => (n + 1) % 1_000_000)
      }

      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [revealed])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[rgba(12,5,10,0.9)] px-4 py-8 backdrop-blur-md">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between text-[0.68rem] uppercase tracking-[0.3em] text-rose-200/60">
          <span>jump melvyn · {jumps}/{GOAL}</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 px-3 py-1 text-rose-50/70 hover:bg-white/5"
          >
            esc
          </button>
        </div>

        <div
          className="relative mt-3 w-full select-none overflow-hidden rounded-2xl border border-white/10 bg-[#1a0a14]"
          style={{ aspectRatio: `${DINO_W} / ${DINO_H}` }}
          onClick={() => (gameOver ? reset() : jump())}
        >
          <div className="dino-stage absolute inset-0">
            <div
              className="absolute bottom-0 left-0 right-0 border-t border-white/10"
              style={{ height: 2 }}
            />

            <img
              src={mariiaHead}
              alt="mariia"
              draggable={false}
              className="absolute"
              style={{
                left: `${(PLAYER_X / DINO_W) * 100}%`,
                bottom: `calc(2px + ${(yRef.current / DINO_H) * 100}%)`,
                width: `${(PLAYER_SIZE / DINO_W) * 100}%`,
                height: `${(PLAYER_SIZE / DINO_H) * 100}%`,
                objectFit: 'cover',
                borderRadius: '50%',
                boxShadow: '0 0 0 2px rgba(244,197,122,0.4)',
              }}
            />

            {enemiesRef.current.map((e) => (
              <img
                key={e.id}
                src={melvynHead}
                alt="melvyn"
                draggable={false}
                className={`absolute ${e.fly ? 'enemy-fly' : ''}`}
                style={{
                  left: `${(e.x / DINO_W) * 100}%`,
                  bottom: `calc(2px + ${((e.fly ? FLY_Y : 0) / DINO_H) * 100}%)`,
                  width: `${(ENEMY_SIZE / DINO_W) * 100}%`,
                  height: `${(ENEMY_SIZE / DINO_H) * 100}%`,
                  objectFit: 'cover',
                  borderRadius: '40%',
                  filter: 'grayscale(0.3)',
                }}
              />
            ))}
          </div>

          {gameOver && !revealed ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[rgba(12,5,10,0.8)]">
              <p className="font-display text-3xl italic text-[var(--color-cream)]">caught by melvyn</p>
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-rose-200/60">space · tap to retry</p>
            </div>
          ) : null}
        </div>

        <p className="mt-3 text-center text-[0.66rem] uppercase tracking-[0.3em] text-rose-200/40">
          space / tap to jump
        </p>
      </div>

      {revealed ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[rgba(12,5,10,0.92)] px-6 backdrop-blur-xl">
          <div className="modal-enter w-full max-w-lg rounded-2xl border border-white/10 bg-[#1a0a14] p-8 text-center">
            <p className="text-[0.68rem] uppercase tracking-[0.3em] text-[var(--color-gold)]">secret letter</p>
            <p className="mt-4 font-display text-2xl italic leading-snug text-[var(--color-cream)]">
              I know that you have fear about me, it's normal, i am effraying, what kind of life do you want ?
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-full border border-white/10 px-5 py-2 text-xs uppercase tracking-[0.2em] text-rose-50/70 transition hover:bg-white/5"
            >
              close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App
