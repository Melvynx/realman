import { useMemo, useState } from 'react'
import barLounge from './assets/venues/bar-lounge.webp'
import barLoungeNeon from './assets/venues/bar-lounge-neon.webp'
import olivaInterior from './assets/venues/oliva-interior.webp'
import olivaTerrace from './assets/venues/oliva-terrace.webp'

type NonStage = {
  label: string
  taunt: string
  x: number
  y: number
  scale: number
  rotate: number
  skew: number
  radius: string
  width: number
  height: number
  mode: 'inline' | 'absolute'
  decoys: number
}

type ItineraryStop = {
  time: string
  eyebrow: string
  title: string
  description: string
  note?: string
  images?: string[]
}

const nonStages: NonStage[] = [
  {
    label: 'I might pretend to hesitate',
    taunt: 'Elegant little lie: this button does not believe in your hesitation.',
    x: 0,
    y: 0,
    scale: 1,
    rotate: -2,
    skew: 0,
    radius: '999px',
    width: 244,
    height: 60,
    mode: 'inline',
    decoys: 0,
  },
  {
    label: 'hmm… let me dramatize this',
    taunt: 'Oh. A lady has chosen the theatrical route.',
    x: 22,
    y: -6,
    scale: 0.96,
    rotate: 6,
    skew: -5,
    radius: '24px',
    width: 232,
    height: 58,
    mode: 'inline',
    decoys: 0,
  },
  {
    label: 'I am pretending to resist',
    taunt: 'The button just rolled its eyes in perfect English.',
    x: -34,
    y: 18,
    scale: 0.88,
    rotate: -9,
    skew: 6,
    radius: '18px 30px 18px 34px',
    width: 220,
    height: 56,
    mode: 'absolute',
    decoys: 0,
  },
  {
    label: 'no, but make it stylish',
    taunt: 'It just leaped higher than your objection.',
    x: 112,
    y: -88,
    scale: 1.08,
    rotate: 13,
    skew: -10,
    radius: '999px 18px 999px 18px',
    width: 214,
    height: 54,
    mode: 'absolute',
    decoys: 1,
  },
  {
    label: 'I am sulking, couture edition',
    taunt: 'Now it is posing in the corner like an offended diva.',
    x: -126,
    y: 92,
    scale: 0.72,
    rotate: -16,
    skew: 12,
    radius: '16px',
    width: 182,
    height: 50,
    mode: 'absolute',
    decoys: 1,
  },
  {
    label: 'catch me if you dare',
    taunt: 'Teleportation enabled. Terrible attitude, excellent timing.',
    x: 152,
    y: 118,
    scale: 0.84,
    rotate: 18,
    skew: -12,
    radius: '999px',
    width: 188,
    height: 46,
    mode: 'absolute',
    decoys: 2,
  },
  {
    label: 'I am tiny and stubborn',
    taunt: 'There it is in an inconvenient pocket-size format.',
    x: -148,
    y: -112,
    scale: 0.58,
    rotate: -24,
    skew: 16,
    radius: '14px 26px 14px 30px',
    width: 140,
    height: 40,
    mode: 'absolute',
    decoys: 2,
  },
  {
    label: 'this is a fake refusal',
    taunt: 'There are decoys now. Very editorial, very suspicious.',
    x: 0,
    y: -132,
    scale: 1.16,
    rotate: 9,
    skew: -8,
    radius: '999px 999px 24px 24px',
    width: 228,
    height: 48,
    mode: 'absolute',
    decoys: 3,
  },
  {
    label: 'surrender stylishly? absolutely not.',
    taunt: 'The button has chosen the very edge of the frame. Pointless audacity.',
    x: 164,
    y: -2,
    scale: 0.66,
    rotate: 26,
    skew: -18,
    radius: '999px',
    width: 156,
    height: 38,
    mode: 'absolute',
    decoys: 4,
  },
  {
    label: '…fine, press yes',
    taunt: 'At this point, even the no button is rooting for the date.',
    x: -164,
    y: 10,
    scale: 0.62,
    rotate: -28,
    skew: 18,
    radius: '12px',
    width: 150,
    height: 36,
    mode: 'absolute',
    decoys: 4,
  },
]

const confettiIcons = ['💋', '💕', '✨', '🥂', '🌹', '💌', '🎀', '🍒']

const itinerary: ItineraryStop[] = [
  {
    time: '5:00 PM',
    eyebrow: 'prelude',
    title: 'Pickup right outside your place',
    description: 'I come pick you up, everyday mode disappears, and the evening begins before the first turn even happens.',
    note: 'Suggested dress code: irresistible, obviously.',
  },
  {
    time: '6:00 PM',
    eyebrow: 'first act',
    title: 'Cocktails, low lights, and a lovely little dizzy spell',
    description: 'First stop: a toast, eye contact that lingers a little too long, and the city casually becoming our set for the night.',
    images: [barLounge, barLoungeNeon],
  },
  {
    time: '7:30 PM',
    eyebrow: 'second act',
    title: 'Candlelit dinner with a view that absolutely knows what it is doing',
    description: 'The next scene unfolds around a romantic table, a genuinely good dinner, and that exact moment when neither of us wants the night to rush ahead.',
    note: 'Yes, the pretty table with the pretty view was specifically requested.',
    images: [olivaInterior, olivaTerrace],
  },
]

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 26 }, (_, index) => ({
        icon: confettiIcons[index % confettiIcons.length],
        left: Math.random() * 100,
        duration: 3.8 + Math.random() * 2.2,
        delay: Math.random() * 1.2,
        size: 16 + Math.random() * 14,
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

function ItineraryCard({ stop }: { stop: ItineraryStop }) {
  return (
    <article className="editorial-card rounded-[2rem] p-4 sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.72rem] uppercase tracking-[0.34em] text-rose-200/65">{stop.eyebrow}</p>
          <h3 className="mt-2 font-display text-[2rem] leading-[0.95] text-[var(--color-cream)] sm:text-[2.25rem]">
            {stop.title}
          </h3>
        </div>
        <div className="rounded-full border border-white/12 bg-white/8 px-3 py-2 text-[0.72rem] uppercase tracking-[0.28em] text-rose-100/80">
          {stop.time}
        </div>
      </div>

      <p className="mt-4 max-w-md text-[0.98rem] leading-7 text-rose-50/82 sm:text-[1.02rem]">
        {stop.description}
      </p>

      {stop.images ? (
        <div className="mt-5 grid grid-cols-2 gap-3">
          {stop.images.map((image, index) => (
            <figure key={`${image}-${index}`} className="overflow-hidden rounded-[1.45rem] border border-white/10 bg-white/5">
              <img src={image} alt="" className="h-36 w-full object-cover sm:h-44" />
            </figure>
          ))}
        </div>
      ) : null}

      {stop.note ? <p className="mt-4 text-sm italic text-[var(--color-gold)]">{stop.note}</p> : null}
    </article>
  )
}

function PlanModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[rgba(18,5,13,0.72)] px-4 py-6 backdrop-blur-md sm:px-6 sm:py-10">
      <Confetti />
      <div className="mx-auto w-full max-w-5xl modal-enter">
        <div className="rounded-[2.2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(52,14,29,0.95),rgba(17,8,18,0.96))] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.45)] sm:p-6 lg:p-8">
          <div className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-[0.72rem] uppercase tracking-[0.38em] text-rose-300/72">monday edition · april 27 · marburg</p>
              <h2 className="mt-3 font-display text-5xl leading-none text-[var(--color-cream)] sm:text-6xl">
                The spoiler-free plan,
                <br />
                but with temptation.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-rose-50/78 sm:text-lg">
                Promise: the itinerary stays useful, the surprises keep their mystery, and the flirting is legally a little excessive.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="self-start rounded-full border border-white/14 bg-white/8 px-4 py-2 text-sm uppercase tracking-[0.24em] text-rose-50 transition hover:bg-white/14"
            >
              close the secret
            </button>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="grid gap-4">
              {itinerary.map((stop) => (
                <ItineraryCard key={`${stop.time}-${stop.title}`} stop={stop} />
              ))}
            </div>

            <aside className="space-y-4">
              <div className="editorial-card rounded-[2rem] p-5 sm:p-6">
                <p className="text-[0.72rem] uppercase tracking-[0.34em] text-rose-200/65">small details that matter</p>
                <ul className="mt-4 space-y-4 text-[0.98rem] leading-7 text-rose-50/80">
                  <li>• romantic table requested, ideally with a lovely view and exactly the right level of discreet wow</li>
                  <li>• timing planned so everything feels smooth, chic, and never like we are sprinting through a bad rom-com</li>
                  <li>• parking possible nearby, quietly accounted for in case the evening prefers a stress-free arrival</li>
                </ul>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(160deg,rgba(255,255,255,0.1),rgba(255,255,255,0.02))] p-5 sm:p-6">
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-fuchsia-400/20 blur-3xl" />
                <p className="text-[0.72rem] uppercase tracking-[0.34em] text-rose-200/65">very important clause</p>
                <p className="mt-4 font-display text-3xl leading-none text-[var(--color-cream)]">
                  You are fully allowed to arrive looking stunning.
                </p>
                <p className="mt-4 max-w-sm text-sm leading-7 text-rose-50/78">
                  I am bringing the car, the plan, and that dangerously confident energy of someone who very much intends to make you smile all evening.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [accepted, setAccepted] = useState(false)
  const [nonClicks, setNonClicks] = useState(0)

  const stage = nonStages[Math.min(nonClicks, nonStages.length - 1)]

  const decoys = useMemo(
    () =>
      Array.from({ length: stage.decoys }, (_, index) => {
        const direction = index % 2 === 0 ? 1 : -1
        return {
          id: `${nonClicks}-${index}`,
          x: stage.x + direction * (48 + index * 18),
          y: stage.y + (index - 1.5) * 34,
          rotate: stage.rotate + direction * (10 + index * 2),
          scale: Math.max(0.42, stage.scale - 0.14 + index * 0.04),
          opacity: Math.max(0.16, 0.34 - index * 0.04),
        }
      }),
    [nonClicks, stage.decoys, stage.rotate, stage.scale, stage.x, stage.y],
  )

  const handleNonClick = () => {
    setNonClicks((value) => Math.min(value + 1, nonStages.length - 1))
  }

  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,84,144,0.2),transparent_30%),radial-gradient(circle_at_85%_18%,rgba(205,54,132,0.15),transparent_24%),linear-gradient(135deg,#12050f_0%,#24101e_48%,#120711_100%)]">
        <div className="absolute inset-x-0 top-0 h-px bg-white/12" />
        <div className="absolute left-[8%] top-[12%] h-44 w-44 rounded-full bg-[#ff5ca8]/18 blur-3xl" />
        <div className="absolute right-[6%] top-[18%] h-52 w-52 rounded-full bg-[#ffcf70]/10 blur-3xl" />
        <div className="absolute bottom-[8%] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7f4dff]/12 blur-3xl" />
        <div className="grain-overlay absolute inset-0 opacity-30" />
      </div>

      <main className="px-4 py-4 sm:px-6 sm:py-6">
        <section className="hero-shell hero-in mx-auto w-full max-w-6xl overflow-hidden rounded-[2.25rem] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
            <div className="flex flex-col justify-between gap-6 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-5 sm:p-7 lg:p-8">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-[0.72rem] uppercase tracking-[0.32em] text-rose-200/70">
                  <span className="rounded-full border border-white/10 bg-white/6 px-3 py-2">private date-zine</span>
                  <span>limited edition</span>
                  <span>marburg after 5</span>
                </div>

                <div className="mt-7 max-w-3xl">
                  <p className="text-sm uppercase tracking-[0.36em] text-rose-300/72">cover story</p>
                  <h1 className="mt-3 font-display text-[3.35rem] leading-[0.88] text-[var(--color-cream)] sm:text-[4.5rem] lg:text-[5.5rem]">
                    Princess,
                    <br />
                    what if Monday turned scandalously charming?
                  </h1>
                  <p className="mt-5 max-w-2xl text-[1.08rem] leading-8 text-rose-50/84 sm:text-[1.18rem]">
                    Official invitation to an evening that prefers editorial flirting over dating-app energy:
                    I am picking you up on Monday, April 27 at <span className="text-[var(--color-gold)]">5:00 PM</span>,
                    and then we let Marburg play a very photogenic supporting role.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-[0.88fr_1.12fr]">
                <div className="rounded-[1.6rem] border border-white/10 bg-[#2a1020]/75 p-4">
                  <p className="text-[0.72rem] uppercase tracking-[0.32em] text-rose-200/65">perfectly reasonable motive</p>
                  <p className="mt-3 font-display text-3xl leading-none text-[var(--color-cream)]">A drink, a dinner, a view, and far too much charm.</p>
                </div>
                <div className="rotated-note rounded-[1.6rem] border border-[#ffdb96]/18 bg-[linear-gradient(135deg,rgba(255,224,162,0.12),rgba(255,255,255,0.03))] p-4 sm:p-5">
                  <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#ffd38f]/72">quietly slipped note</p>
                  <p className="mt-3 text-base leading-7 text-rose-50/82">
                    Yes, I planned the polished version of the evening: lovely pacing, flattering light, and enough mystery to avoid any vulgar spoilers.
                  </p>
                </div>
              </div>

              <div className="choice-panel relative overflow-hidden rounded-[2rem] border border-white/10 p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[0.72rem] uppercase tracking-[0.34em] text-rose-200/65">final editorial detail</p>
                    <p className="mt-2 max-w-xl text-sm leading-7 text-rose-50/76 sm:text-base">
                      There are two options below. One is chic. The other is bratty, ill-behaved, and getting less believable by the second.
                    </p>
                  </div>
                  <p className="text-sm italic text-rose-200/68">{stage.taunt}</p>
                </div>

                <div className="relative mt-5 min-h-[16rem] overflow-hidden rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))] px-3 py-4 sm:px-4 sm:py-5">
                  <div className="absolute left-4 top-4 text-[0.68rem] uppercase tracking-[0.28em] text-rose-200/40">highly biased promotional choice</div>

                  <button
                    type="button"
                    onClick={() => setAccepted(true)}
                    className="btn-oui-glow relative z-20 inline-flex min-h-[60px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#ff6f91,#ff3d6f_55%,#d31e63)] px-7 py-4 text-left text-white shadow-[0_12px_30px_rgba(211,30,99,0.35)] transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 sm:px-8"
                  >
                    <span>
                      <span className="block font-sans text-[0.68rem] uppercase tracking-[0.28em] text-rose-50/70">deliciously sensible option</span>
                      <span className="mt-1 block font-display text-[1.7rem] leading-none">I am letting myself be charmed</span>
                    </span>
                  </button>

                  {decoys.map((decoy) => (
                    <span
                      key={decoy.id}
                      aria-hidden="true"
                      className="pointer-events-none absolute z-10 inline-flex items-center justify-center border border-dashed border-white/12 bg-white/4 px-4 text-[0.72rem] uppercase tracking-[0.22em] text-rose-50/50 backdrop-blur-sm"
                      style={{
                        left: '50%',
                        top: '50%',
                        width: `${Math.max(108, stage.width - 24)}px`,
                        height: `${Math.max(34, stage.height - 8)}px`,
                        borderRadius: stage.radius,
                        transform: `translate(calc(-50% + ${decoy.x}px), calc(-50% + ${decoy.y}px)) rotate(${decoy.rotate}deg) scale(${decoy.scale})`,
                        opacity: decoy.opacity,
                      }}
                    >
                      fake no
                    </span>
                  ))}

                  <button
                    type="button"
                    onClick={handleNonClick}
                    onMouseEnter={handleNonClick}
                    onFocus={handleNonClick}
                    className={`absolute z-30 inline-flex items-center justify-center border border-white/12 bg-[rgba(255,255,255,0.08)] px-4 text-center text-rose-50/76 backdrop-blur-sm transition duration-200 hover:bg-[rgba(255,255,255,0.12)] ${stage.mode === 'absolute' ? 'non-chaos' : ''}`}
                    style={{
                      left: stage.mode === 'absolute' ? '50%' : '0.75rem',
                      top: stage.mode === 'absolute' ? '50%' : '5.4rem',
                      width: `${stage.width}px`,
                      height: `${stage.height}px`,
                      borderRadius: stage.radius,
                      transform:
                        stage.mode === 'absolute'
                          ? `translate(calc(-50% + ${stage.x}px), calc(-50% + ${stage.y}px)) rotate(${stage.rotate}deg) skew(${stage.skew}deg) scale(${stage.scale})`
                          : `translate(${stage.x}px, ${stage.y}px) rotate(${stage.rotate}deg) skew(${stage.skew}deg) scale(${stage.scale})`,
                    }}
                  >
                    <span>
                      <span className="block font-sans text-[0.62rem] uppercase tracking-[0.24em] text-rose-100/55">falsely serious option</span>
                      <span className="mt-1 block font-display text-[1.15rem] leading-none sm:text-[1.3rem]">{stage.label}</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <aside className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="relative min-h-[19rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[#170913]">
                <img src={barLounge} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,8,17,0.08),rgba(22,5,13,0.82))]" />
                <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[0.68rem] uppercase tracking-[0.28em] text-rose-100/72 backdrop-blur-sm">
                  tonight's cover
                </div>
                <div className="absolute bottom-4 left-4 right-4 rounded-[1.55rem] border border-white/10 bg-[rgba(23,8,15,0.5)] p-4 backdrop-blur-md sm:p-5">
                  <p className="text-[0.72rem] uppercase tracking-[0.32em] text-rose-200/65">promised atmosphere</p>
                  <p className="mt-3 font-display text-4xl leading-none text-[var(--color-cream)]">Pop luxury, soft light, and an excellent excuse to look at you.</p>
                </div>
              </div>

              <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] p-4 sm:p-5">
                <div className="grid grid-cols-2 gap-3">
                  <img src={barLoungeNeon} alt="" className="h-36 w-full rounded-[1.35rem] object-cover" />
                  <img src={olivaInterior} alt="" className="h-36 w-full rounded-[1.35rem] object-cover" />
                  <img src={olivaTerrace} alt="" className="col-span-2 h-40 w-full rounded-[1.35rem] object-cover" />
                </div>

                <div className="flex flex-wrap gap-2 text-[0.72rem] uppercase tracking-[0.28em] text-rose-200/62">
                  <span className="rounded-full border border-white/10 px-3 py-2">cocktails with sparkle</span>
                  <span className="rounded-full border border-white/10 px-3 py-2">a dinner that knows how to seduce</span>
                  <span className="rounded-full border border-white/10 px-3 py-2">ridiculously photogenic view</span>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      {accepted ? <PlanModal onClose={() => setAccepted(false)} /> : null}
    </>
  )
}

export default App
