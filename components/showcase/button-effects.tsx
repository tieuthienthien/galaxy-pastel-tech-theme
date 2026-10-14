'use client'

import { useRef, useState, type MouseEvent, type ReactNode } from 'react'
import {
  Bell,
  Check,
  Copy,
  Heart,
  Loader2,
  Lock,
  PartyPopper,
  Rocket,
  RotateCw,
  Send,
  Sparkles,
  Star,
  ThumbsUp,
  Wand2,
  Zap,
} from 'lucide-react'
import { Floaters, Particles, localPoint, replay, useFloaters, useParticles } from './use-effects'

const base =
  'relative inline-flex select-none items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition-[transform,box-shadow,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'

function Tile({ name, hint, children }: { name: string; hint: string; children: ReactNode }) {
  return (
    <li className="glass flex flex-col items-center justify-between gap-5 rounded-3xl border border-border p-5 text-center">
      <div className="flex min-h-20 items-center justify-center">{children}</div>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold">{name}</span>
        <span className="font-mono text-[11px] text-muted-foreground">{hint}</span>
      </div>
    </li>
  )
}

function RippleButton() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])
  const nextId = useRef(0)
  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const id = nextId.current++
    setRipples((r) => [...r, { id, ...localPoint(e) }])
    setTimeout(() => setRipples((r) => r.filter((p) => p.id !== id)), 700)
  }
  return (
    <button type="button" onClick={handleClick} className={`${base} overflow-hidden bg-primary text-primary-foreground`}>
      <Sparkles className="size-4" aria-hidden="true" />
      Gợn sóng
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden="true"
          className="pointer-events-none absolute size-16 animate-ripple rounded-full bg-white/60"
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </button>
  )
}

function JellyButton() {
  const ref = useRef<HTMLButtonElement>(null)
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => replay(ref.current, 'animate-jelly')}
      className={`${base} bg-pastel-pink text-accent-foreground`}
    >
      Thạch rau câu
    </button>
  )
}

function ConfettiButton() {
  const { particles, spawn } = useParticles()
  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const { x, y } = localPoint(e)
    spawn(x, y, { count: 22, shape: 'confetti', spread: 90 })
  }
  return (
    <button type="button" onClick={handleClick} className={`${base} bg-pastel-mint text-primary-foreground active:scale-95`}>
      <PartyPopper className="size-4" aria-hidden="true" />
      Pháo giấy
      <Particles particles={particles} />
    </button>
  )
}

function StarBurstButton() {
  const { particles, spawn } = useParticles()
  return (
    <button
      type="button"
      onClick={(e) => {
        const { x, y } = localPoint(e)
        spawn(x, y, { count: 12, shape: 'star', spread: 70 })
      }}
      className={`${base} border border-pastel-sky/60 bg-pastel-sky/15 text-pastel-sky active:scale-95`}
    >
      <Star className="size-4 fill-current" aria-hidden="true" />
      Mưa sao
      <Particles particles={particles} />
    </button>
  )
}

function LikeButton() {
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(128)
  const iconRef = useRef<HTMLSpanElement>(null)
  const { particles, spawn } = useParticles()
  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const next = !liked
    setLiked(next)
    setCount((c) => c + (next ? 1 : -1))
    replay(iconRef.current, 'animate-jelly')
    if (next) {
      const { x, y } = localPoint(e)
      spawn(x, y, { count: 8, shape: 'heart', spread: 55 })
    }
  }
  return (
    <button
      type="button"
      aria-pressed={liked}
      onClick={handleClick}
      className={`${base} border ${liked ? 'border-pastel-pink bg-pastel-pink/20 text-pastel-pink' : 'border-border bg-secondary text-secondary-foreground'}`}
    >
      <span ref={iconRef} className="inline-flex">
        <Heart className={`size-4 ${liked ? 'fill-current' : ''}`} aria-hidden="true" />
      </span>
      <span className="font-mono tabular-nums">{count}</span>
      <Particles particles={particles} />
    </button>
  )
}

function ShakeButton() {
  const ref = useRef<HTMLButtonElement>(null)
  const [error, setError] = useState(false)
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => {
        setError(true)
        replay(ref.current, 'animate-shake')
        setTimeout(() => setError(false), 900)
      }}
      className={`${base} border ${error ? 'border-destructive bg-destructive/15 text-destructive' : 'border-border bg-secondary text-secondary-foreground'}`}
    >
      <Lock className="size-4" aria-hidden="true" />
      {error ? 'Sai mật khẩu' : 'Đăng nhập'}
    </button>
  )
}

function RocketButton() {
  const iconRef = useRef<HTMLSpanElement>(null)
  return (
    <button
      type="button"
      onClick={() => replay(iconRef.current, 'animate-launch')}
      className={`${base} galaxy-bg overflow-hidden border border-primary/40 text-foreground`}
    >
      <span ref={iconRef} className="inline-flex" onAnimationEnd={(e) => e.currentTarget.classList.remove('animate-launch')}>
        <Rocket className="size-4 text-pastel-pink" aria-hidden="true" />
      </span>
      Phóng tàu
    </button>
  )
}

function SubmitButton() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle')
  function handleClick() {
    if (status !== 'idle') return
    setStatus('loading')
    setTimeout(() => setStatus('done'), 1200)
    setTimeout(() => setStatus('idle'), 2600)
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      aria-live="polite"
      className={`${base} min-w-36 ${status === 'done' ? 'bg-pastel-mint' : 'bg-primary'} text-primary-foreground`}
    >
      {status === 'idle' && (
        <>
          <Send className="size-4" aria-hidden="true" />
          Gửi tín hiệu
        </>
      )}
      {status === 'loading' && (
        <>
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          Đang gửi
        </>
      )}
      {status === 'done' && (
        <span className="inline-flex animate-pop-in items-center gap-2">
          <Check className="size-4" aria-hidden="true" />
          Đã nhận!
        </span>
      )}
    </button>
  )
}

function CopyButton() {
  const [copied, setCopied] = useState(false)
  async function handleClick() {
    try {
      await navigator.clipboard.writeText('oklch(0.82 0.11 300)')
    } catch {}
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${base} border border-border bg-secondary font-mono text-xs text-secondary-foreground active:scale-95`}
    >
      {copied ? (
        <Check className="size-4 animate-pop-in text-pastel-mint" aria-hidden="true" />
      ) : (
        <Copy className="size-4" aria-hidden="true" />
      )}
      {copied ? 'Đã copy' : '#lavender'}
    </button>
  )
}

function CounterButton() {
  const [count, setCount] = useState(0)
  const { floaters, float } = useFloaters()
  return (
    <button
      type="button"
      onClick={(e) => {
        const { x, y } = localPoint(e)
        float(x, y, '+1')
        setCount((c) => c + 1)
      }}
      className={`${base} bg-pastel-sky text-primary-foreground active:scale-90`}
    >
      <ThumbsUp className="size-4" aria-hidden="true" />
      <span className="font-mono tabular-nums">{count}</span>
      <Floaters floaters={floaters} className="text-pastel-sky" />
    </button>
  )
}

function PressButton() {
  return (
    <button
      type="button"
      className={`${base} bg-pastel-lavender text-primary-foreground shadow-[0_6px_0_0_oklch(0.55_0.12_295)] hover:-translate-y-0.5 hover:shadow-[0_8px_0_0_oklch(0.55_0.12_295)] active:translate-y-1.5 active:shadow-[0_0_0_0_oklch(0.55_0.12_295)]`}
    >
      Nút kẹo 3D
    </button>
  )
}

function BounceButton() {
  const ref = useRef<HTMLButtonElement>(null)
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => replay(ref.current, 'animate-bounce-once')}
      className={`${base} rounded-full bg-chart-5 text-primary-foreground`}
    >
      Nhảy tưng tưng
    </button>
  )
}

function BellButton() {
  const ref = useRef<HTMLSpanElement>(null)
  const [unread, setUnread] = useState(3)
  return (
    <button
      type="button"
      aria-label={`Thông báo, ${unread} chưa đọc`}
      onClick={() => {
        replay(ref.current, 'animate-wiggle')
        setUnread((n) => (n === 0 ? 3 : n - 1))
      }}
      className={`${base} size-12 rounded-full border border-border bg-secondary p-0 text-secondary-foreground`}
    >
      <span ref={ref} className="inline-flex origin-top">
        <Bell className="size-5" aria-hidden="true" />
      </span>
      {unread > 0 && (
        <span
          key={unread}
          className="absolute -right-1 -top-1 flex size-5 animate-pop-in items-center justify-center rounded-full bg-pastel-pink font-mono text-[10px] font-bold text-accent-foreground"
        >
          {unread}
        </span>
      )}
    </button>
  )
}

function RingButton() {
  const ref = useRef<HTMLButtonElement>(null)
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => replay(ref.current, 'animate-ring')}
      className={`${base} rounded-full border border-pastel-mint/60 bg-pastel-mint/15 text-pastel-mint [--ring-color:var(--pastel-mint)]`}
    >
      <Zap className="size-4" aria-hidden="true" />
      Sóng năng lượng
    </button>
  )
}

function FlipButton() {
  const ref = useRef<HTMLButtonElement>(null)
  const [side, setSide] = useState(0)
  const labels = ['Lật thẻ', 'Mặt sau!', 'Lại nữa?']
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => {
        replay(ref.current, 'animate-flip')
        setTimeout(() => setSide((s) => (s + 1) % labels.length), 300)
      }}
      className={`${base} border border-primary/50 bg-primary/15 text-primary`}
    >
      <RotateCw className="size-4" aria-hidden="true" />
      {labels[side]}
    </button>
  )
}

function ShineButton() {
  return (
    <button
      type="button"
      className={`${base} group overflow-hidden bg-[linear-gradient(110deg,var(--pastel-lavender),var(--pastel-pink),var(--pastel-sky))] text-primary-foreground active:scale-95`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-white/50 transition-all duration-700 group-hover:left-[150%]"
      />
      <Wand2 className="size-4" aria-hidden="true" />
      Lấp lánh
    </button>
  )
}

function ToggleStar() {
  const [on, setOn] = useState(false)
  const { particles, spawn } = useParticles()
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label="Bật chế độ sao"
      onClick={(e) => {
        setOn(!on)
        if (!on) {
          const { x, y } = localPoint(e)
          spawn(x, y, { count: 8, shape: 'dot', spread: 45 })
        }
      }}
      className={`relative h-8 w-16 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${on ? 'border-pastel-lavender bg-pastel-lavender/40' : 'border-border bg-secondary'}`}
    >
      <span
        aria-hidden="true"
        className={`absolute top-1 flex size-6 items-center justify-center rounded-full bg-foreground text-primary-foreground transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${on ? 'left-9 rotate-[360deg] bg-pastel-lavender' : 'left-1'}`}
      >
        <Star className={`size-3.5 ${on ? 'fill-current' : ''}`} />
      </span>
      <Particles particles={particles} />
    </button>
  )
}

export function ButtonEffects() {
  return (
    <section aria-labelledby="effects-title" className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-widest text-pastel-pink">04 / interactions</span>
        <h2 id="effects-title" className="text-balance text-3xl font-bold md:text-4xl">
          16 hiệu ứng <span className="text-galaxy">khi click</span>
        </h2>
        <p className="max-w-xl text-pretty text-muted-foreground">
          Bấm thử từng nút nhé. Tất cả đều tôn trọng cài đặt giảm chuyển động của hệ thống.
        </p>
      </div>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Tile name="Ripple" hint="sóng từ điểm chạm"><RippleButton /></Tile>
        <Tile name="Jelly" hint="nảy như thạch"><JellyButton /></Tile>
        <Tile name="Confetti" hint="nổ pháo giấy"><ConfettiButton /></Tile>
        <Tile name="Star burst" hint="bung sao pastel"><StarBurstButton /></Tile>
        <Tile name="Like" hint="tim bay + đếm"><LikeButton /></Tile>
        <Tile name="Shake" hint="rung báo lỗi"><ShakeButton /></Tile>
        <Tile name="Launch" hint="tên lửa cất cánh"><RocketButton /></Tile>
        <Tile name="Async" hint="loading → xong"><SubmitButton /></Tile>
        <Tile name="Copy" hint="đổi icon bật ra"><CopyButton /></Tile>
        <Tile name="Counter" hint="+1 bay lên"><CounterButton /></Tile>
        <Tile name="3D press" hint="lún xuống khi ấn"><PressButton /></Tile>
        <Tile name="Bounce" hint="nhảy hai nhịp"><BounceButton /></Tile>
        <Tile name="Bell" hint="lắc chuông + badge"><BellButton /></Tile>
        <Tile name="Pulse ring" hint="vòng năng lượng"><RingButton /></Tile>
        <Tile name="Flip" hint="lật 360 độ"><FlipButton /></Tile>
        <Tile name="Shine / Switch" hint="hover sáng, gạt sao">
          <div className="flex flex-col items-center gap-3">
            <ShineButton />
            <ToggleStar />
          </div>
        </Tile>
      </ul>
    </section>
  )
}
