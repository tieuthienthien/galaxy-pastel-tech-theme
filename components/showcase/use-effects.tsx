'use client'

import { useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import { Heart, Star } from 'lucide-react'

export const PASTELS = [
  'var(--pastel-lavender)',
  'var(--pastel-pink)',
  'var(--pastel-mint)',
  'var(--pastel-sky)',
  'var(--chart-5)',
]

export function replay(el: HTMLElement | null, className: string) {
  if (!el) return
  el.classList.remove(className)
  void el.offsetWidth
  el.classList.add(className)
}

export function localPoint(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect()
  const fromKeyboard = e.detail === 0
  return {
    x: fromKeyboard ? rect.width / 2 : e.clientX - rect.left,
    y: fromKeyboard ? rect.height / 2 : e.clientY - rect.top,
  }
}

type Shape = 'dot' | 'star' | 'heart' | 'confetti'

type Particle = {
  id: number
  x: number
  y: number
  dx: number
  dy: number
  rot: number
  color: string
  shape: Shape
}

export function useParticles() {
  const [particles, setParticles] = useState<Particle[]>([])
  const nextId = useRef(0)

  function spawn(x: number, y: number, { count = 12, shape = 'dot' as Shape, spread = 60 } = {}) {
    const batch = Array.from({ length: count }, (_, i) => {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.6
      const distance = spread * (0.6 + Math.random() * 0.7)
      return {
        id: nextId.current++,
        x,
        y,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        rot: Math.random() * 540 - 270,
        color: PASTELS[i % PASTELS.length],
        shape,
      }
    })
    const ids = new Set(batch.map((p) => p.id))
    setParticles((prev) => [...prev, ...batch])
    setTimeout(() => setParticles((prev) => prev.filter((p) => !ids.has(p.id))), 900)
  }

  return { particles, spawn }
}

export function Particles({ particles }: { particles: Particle[] }) {
  return (
    <>
      {particles.map((p) => (
        <span
          key={p.id}
          aria-hidden="true"
          className="pointer-events-none absolute z-10 animate-particle"
          style={
            {
              left: p.x,
              top: p.y,
              color: p.color,
              '--dx': `${p.dx}px`,
              '--dy': `${p.dy}px`,
              '--rot': `${p.rot}deg`,
            } as CSSProperties
          }
        >
          {p.shape === 'star' && <Star className="size-3.5 fill-current" />}
          {p.shape === 'heart' && <Heart className="size-3.5 fill-current" />}
          {p.shape === 'dot' && <span className="block size-2 rounded-full bg-current" />}
          {p.shape === 'confetti' && <span className="block h-2.5 w-1.5 rounded-sm bg-current" />}
        </span>
      ))}
    </>
  )
}

type Floater = { id: number; x: number; y: number; label: string }

export function useFloaters() {
  const [floaters, setFloaters] = useState<Floater[]>([])
  const nextId = useRef(0)

  function float(x: number, y: number, label: string) {
    const id = nextId.current++
    setFloaters((prev) => [...prev, { id, x, y, label }])
    setTimeout(() => setFloaters((prev) => prev.filter((f) => f.id !== id)), 950)
  }

  return { floaters, float }
}

export function Floaters({ floaters, className = '' }: { floaters: Floater[]; className?: string }) {
  return (
    <>
      {floaters.map((f) => (
        <span
          key={f.id}
          aria-hidden="true"
          className={`pointer-events-none absolute z-10 animate-float-up whitespace-nowrap font-mono text-sm font-bold ${className}`}
          style={{ left: f.x, top: f.y - 16 }}
        >
          {f.label}
        </span>
      ))}
    </>
  )
}
