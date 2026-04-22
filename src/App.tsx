import { useCallback, useMemo, useState } from 'react'
import barLounge from './assets/venues/bar-lounge.webp'
import barLoungeNeon from './assets/venues/bar-lounge-neon.webp'
import olivaInterior from './assets/venues/oliva-interior.webp'
import olivaTerrace from './assets/venues/oliva-terrace.webp'

type NonStage = {
  label: string
  scale: number
  shake: boolean
  dodge: boolean
  driftX: number
  driftY: number
}

const nonStages: NonStage[] = [
  { label: 'NON', scale: 1, shake: false, dodge: false, driftX: 0, driftY: 0 },
  { label: 'non ?', scale: 0.96, shake: false, dodge: false, driftX: 8, driftY: 2 },
  { label: 'vraiment ?', scale: 0.92, shake: false, dodge: false, driftX: -10, driftY: 4 },
  { label: 'tu es sûre ?', scale: 0.86, shake: true, dodge: false, driftX: 12, driftY: -6 },
  { label: 'hmm… NON', scale: 0.8, shake: true, dodge: false, driftX: -16, driftY: 8 },
  { label: 'oops', scale: 0.74, shake: true, dodge: true, driftX: 18, driftY: -10 },
  { label: 'attrape-moi', scale: 0.68, shake: true, dodge: true, driftX: -20, driftY: 12 },
  { label: 'too slow', scale: 0.62, shake: true, dodge: true, driftX: 24, driftY: -14 },
  { label: 'NON non', scale: 0.57, shake: true, dodge: true, driftX: -28, driftY: 16 },
  { label: 'hehe', scale: 0.52, shake: true, dodge: true, driftX: 30, driftY: -18 },
  { label: 'presque', scale: 0.47, shake: true, dodge: true, driftX: -34, driftY: 20 },
  { label: 'raté', scale: 0.42, shake: true, dodge: true, driftX: 36, driftY: -22 },
  { label: 'pas facile', scale: 0.38, shake: true, dodge: true, driftX: -38, driftY: 24 },
  { label: 'mini NON', scale: 0.34, shake: true, dodge: true, driftX: 42, driftY: -26 },
  { label: 'zut', scale: 0.3, shake: true, dodge: true, driftX: -44, driftY: 28 },
  { label: '😏', scale: 0.27, shake: true, dodge: true, driftX: 46, driftY: -30 },
  { label: 'encore ?', scale: 0.24, shake: true, dodge: true, driftX: -48, driftY: 24 },
  { label: 'tiny no', scale: 0.21, shake: true, dodge: true, driftX: 52, driftY: -18 },
  { label: 'bon…', scale: 0.18, shake: true, dodge: true, driftX: -56, driftY: 12 },
  { label: '🥲', scale: 0.16, shake: true, dodge: true, driftX: 0, driftY: -20 },
]

const hints = [
  '',
  'A tiny hesitation, hmm? ✨',
  'This button is starting to feel shy.',
  'It did not like that click at all.',
  'Playfully protesting…',
  'Okay now it is getting slippery.',
  'Very determined of you.',
  'It has chosen chaos.',
  'Still trying? I respect the commitment.',
  'This is becoming a sport.',
  'Almost impossible, but not quite.',
  'The NON button is fighting for its life.',
  'It refuses to cooperate gracefully.',
  'Now it is tiny *and* dramatic.',
  'This is honestly impressive.',
  'Still click-able, just very unserious.',
  'We are deep into mischief now.',
  'One stubborn little NON.',
  'Okay, this has become cartoonish.',
  'At this point maybe just press OUI 💕',
]

const confettiIcons = ['💕', '✨', '🌹', '💖', '🎀', '💌', '🥂', '🌷']

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 24 }, (_, index) => ({
        icon: confettiIcons[index % confettiIcons.length],
        left: Math.random() * 100,
        duration: 3.6 + Math.random() * 2.8,
        delay: Math.random() * 1.5,
        size: 14 + Math.random() * 16,
      })),
    [],
  )

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      {pieces.map((piece, index) => (
        <span
          key={index}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            animationDuration: `${piece.duration}s`,
            animationDelay: `${piece.delay}s`,
            fontSize: `${piece.size}px`,
          }}
        >
          {piece.icon}
        </span>
      ))}
    </div>
  )
}

function VenueCard({
  time,
  title,
  subtitle,
  note,
  images,
}: {
  time: string
  title: string
  subtitle?: string
  note?: string
  images?: string[]
}) {
  return (
    <article className="rounded-[1.75rem] border border-white/12 bg-white/6 p-4 shadow-[0_20px_60px_rgba(14,3,10,0.35)] backdrop-blur-sm sm:p-5">
      <p className="mb-2 text-[0.72rem] uppercase tracking-[0.32em] text-rose-300/80">{time}</p>
      <h3 className="font-serif text-2xl text-[var(--color-cream)]">{title}</h3>
      {subtitle ? <p className="mt-1 text-sm text-rose-100/70">{subtitle}</p> : null}
      {note ? <p className="mt-3 text-sm text-[var(--color-gold)]">{note}</p> : null}
      {images ? (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {images.map((image) => (
            <img
              key={image}
              src={image}
              alt=""
              className="h-28 w-full rounded-2xl object-cover sm:h-36"
            />
          ))}
        </div>
      ) : null}
    </article>
  )
}

function PlanModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[rgba(19,2,14,0.84)] px-4 py-8 backdrop-blur-md sm:py-12">
      <Confetti />
      <div className="mx-auto w-full max-w-3xl modal-enter">
        <div className="rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(97,17,50,0.72),rgba(29,8,26,0.94))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.32em] text-rose-300/70">
                Monday, April 27 · Marburg
              </p>
              <h2 className="mt-2 font-serif text-4xl text-[var(--color-cream)] sm:text-5xl">
                Our little soirée
              </h2>
              <p className="mt-2 text-base italic text-rose-100/70">
                Cute, simple, and worth saying oui to.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-rose-50 transition hover:bg-white/14"
            >
              Close
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <VenueCard time="5:00 PM" title="I’ll pick you up at your place" />
            <VenueCard
              time="6:00 PM"
              title="360° Bar & Lounge"
              subtitle="Hotel Rosenpark, Marburg"
              images={[barLounge, barLoungeNeon]}
            />
            <VenueCard
              time="7:30 PM"
              title="Restaurant OLIVA"
              subtitle="Hotel Rosenpark, Marburg"
              images={[olivaInterior, olivaTerrace]}
            />
          </div>

          <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-black/15 p-5 text-sm text-rose-50/88">
            <p>romantic table requested with a nice view</p>
            <p className="mt-2">parking: Parkhaus Nord or Vila Vita underground parking</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [accepted, setAccepted] = useState(false)
  const [nonClicks, setNonClicks] = useState(0)
  const [teleport, setTeleport] = useState({ x: 0, y: 0 })

  const currentStage = nonStages[Math.min(nonClicks, nonStages.length - 1)]

  const teaseNon = useCallback(() => {
    if (!currentStage.dodge) return

    const rangeX = 90 + nonClicks * 3
    const rangeY = 34 + Math.min(nonClicks, 10) * 4

    setTeleport({
      x: (Math.random() - 0.5) * rangeX,
      y: (Math.random() - 0.5) * rangeY,
    })
  }, [currentStage.dodge, nonClicks])

  const handleNonClick = useCallback(() => {
    setNonClicks((value) => Math.min(value + 1, nonStages.length - 1))

    if (currentStage.dodge) {
      setTeleport({
        x: (Math.random() - 0.5) * (120 + nonClicks * 4),
        y: (Math.random() - 0.5) * 72,
      })
    }
  }, [currentStage.dodge, nonClicks])

  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-8rem] top-[-7rem] h-72 w-72 rounded-full bg-rose-500/20 blur-3xl" />
        <div className="absolute right-[-7rem] top-[10%] h-80 w-80 rounded-full bg-fuchsia-400/12 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-300/10 blur-3xl" />
      </div>

      <main className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
        <section className="hero-in w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/12 bg-white/6 shadow-[0_24px_80px_rgba(10,2,9,0.35)] backdrop-blur-md">
          <div className="grid gap-0 lg:grid-cols-[1.12fr_0.88fr]">
            <div className="p-6 sm:p-8 lg:p-12">
              <p className="text-[0.72rem] uppercase tracking-[0.38em] text-rose-300/75">
                a very special invitation
              </p>

              <div className="mt-6 space-y-4 text-left">
                <p className="font-serif text-4xl leading-none text-[var(--color-cream)] sm:text-5xl lg:text-6xl">
                  Hey Princiess,
                </p>
                <p className="max-w-2xl text-xl leading-relaxed text-rose-50/88 sm:text-2xl">
                  Would you accept my invitation for a date in Marburg the Monday, April 27 at
                  5:00 PM?
                </p>
                <p className="text-lg italic text-rose-100/72 sm:text-xl">
                  I’ll pick you up at your place.
                </p>
              </div>

              <div className="relative mt-10 flex min-h-[9rem] flex-col items-start justify-center gap-5 sm:min-h-[10rem] sm:flex-row sm:items-center sm:justify-start sm:gap-6">
                <button
                  type="button"
                  onClick={() => setAccepted(true)}
                  className="btn-oui-glow rounded-[1.25rem] bg-[linear-gradient(135deg,#f43f5e,#be185d)] px-9 py-4 font-serif text-2xl text-white transition duration-200 hover:-translate-y-0.5 hover:scale-[1.03] active:scale-95"
                >
                  OUI
                </button>

                <div
                  className="relative"
                  style={{
                    transform: `translate(${teleport.x + currentStage.driftX}px, ${teleport.y + currentStage.driftY}px)`,
                    transition: currentStage.dodge ? 'transform 140ms ease-out' : 'transform 260ms ease',
                  }}
                >
                  <button
                    type="button"
                    onClick={handleNonClick}
                    onMouseEnter={teaseNon}
                    onFocus={teaseNon}
                    className={`rounded-[1.1rem] border border-white/16 bg-white/6 px-7 py-3 font-serif text-rose-100/75 transition ${currentStage.shake ? 'btn-shaking' : ''}`}
                    style={{
                      transform: `scale(${currentStage.scale})`,
                      transformOrigin: 'center',
                    }}
                  >
                    {currentStage.label}
                  </button>
                </div>
              </div>

              <p className="mt-2 min-h-6 text-sm italic text-rose-200/55">{hints[nonClicks]}</p>
            </div>

            <div className="relative min-h-[18rem] border-t border-white/10 lg:min-h-full lg:border-l lg:border-t-0">
              <img
                src={barLounge}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(36,6,21,0.16),rgba(25,4,14,0.82))]" />
              <div className="absolute inset-x-4 bottom-4 rounded-[1.5rem] border border-white/12 bg-[rgba(28,8,20,0.58)] p-4 backdrop-blur-sm sm:inset-x-6 sm:bottom-6 sm:p-5">
                <p className="text-[0.7rem] uppercase tracking-[0.32em] text-rose-300/75">Marburg moodboard</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <img src={barLoungeNeon} alt="" className="h-28 w-full rounded-2xl object-cover" />
                  <img src={olivaInterior} alt="" className="h-28 w-full rounded-2xl object-cover" />
                </div>
                <p className="mt-3 text-sm text-rose-50/72">
                  Elegant drinks, dinner at Rosenpark, and a sweet little evening together.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {accepted ? <PlanModal onClose={() => setAccepted(false)} /> : null}
    </>
  )
}

export default App
