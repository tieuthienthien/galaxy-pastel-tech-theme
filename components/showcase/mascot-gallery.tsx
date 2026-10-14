'use client'

import Image from 'next/image'
import { useRef, useState, type MouseEvent } from 'react'
import { Floaters, Particles, localPoint, replay, useFloaters, useParticles } from './use-effects'

const MASCOTS = [
  { src: '/images/astro/coding.png', name: 'Code Mode', caption: 'Gõ phím giữa dải ngân hà', tint: 'bg-pastel-lavender' },
  { src: '/images/astro/waving.png', name: 'Hello World', caption: 'Chào bạn mới đến trạm', tint: 'bg-pastel-pink' },
  { src: '/images/astro/planet.png', name: 'Remote Work', caption: 'Văn phòng trên hành tinh nhỏ', tint: 'bg-pastel-mint' },
  { src: '/images/astro/rocket.png', name: 'Deploy!', caption: 'Phóng bản build lên quỹ đạo', tint: 'bg-pastel-sky' },
  { src: '/images/astro/sleepy.png', name: 'Sleep Mode', caption: 'Ngủ trưa trên mặt trăng', tint: 'bg-pastel-lavender' },
  { src: '/images/astro/debug.png', name: 'Bug Hunter', caption: 'Tìm con bug dễ thương', tint: 'bg-pastel-pink' },
  { src: '/images/astro/party.png', name: 'All Green', caption: 'Test pass hết rồi nè', tint: 'bg-pastel-mint' },
  { src: '/images/astro/coffee.png', name: 'Coffee Break', caption: 'Cà phê hơi nước hình sao', tint: 'bg-pastel-sky' },
]

const BOOPS = ['boop!', 'hihi', 'beep', '+1', 'yay', 'zoom']

function MascotCard({ mascot, index }: { mascot: (typeof MASCOTS)[number]; index: number }) {
  const imageRef = useRef<HTMLDivElement>(null)
  const { particles, spawn } = useParticles()
  const { floaters, float } = useFloaters()
  const [boops, setBoops] = useState(0)

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const { x, y } = localPoint(e)
    replay(imageRef.current, 'animate-jelly')
    spawn(x, y, { count: 10, shape: 'star', spread: 70 })
    float(x, y, BOOPS[(boops + index) % BOOPS.length])
    setBoops((n) => n + 1)
  }

  return (
    <li>
      <button
        type="button"
        onClick={handleClick}
        aria-label={`Chạm vào mascot ${mascot.name}`}
        className="group relative flex w-full flex-col gap-3 rounded-3xl border border-border bg-card p-3 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-[0_12px_40px_-12px_var(--pastel-lavender)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div ref={imageRef} className="relative aspect-square overflow-hidden rounded-2xl">
          <Image
            src={mascot.src}
            alt={`Mascot phi hành gia: ${mascot.caption}`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="flex items-center justify-between gap-2 px-1">
          <div className="flex flex-col">
            <span className="font-semibold">{mascot.name}</span>
            <span className="text-xs text-muted-foreground">{mascot.caption}</span>
          </div>
          <span
            className={`flex h-6 min-w-6 items-center justify-center rounded-full px-2 font-mono text-xs font-bold text-primary-foreground ${mascot.tint}`}
            aria-label={`${boops} lần chạm`}
          >
            {boops}
          </span>
        </div>
        <Particles particles={particles} />
        <Floaters floaters={floaters} className="text-pastel-pink" />
      </button>
    </li>
  )
}

export function MascotGallery() {
  return (
    <section aria-labelledby="gallery-title" className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-widest text-pastel-mint">03 / mascot</span>
        <h2 id="gallery-title" className="text-balance text-3xl font-bold md:text-4xl">
          Gia đình <span className="text-galaxy">Starbuddy</span>
        </h2>
        <p className="max-w-xl text-pretty text-muted-foreground">
          8 tư thế phi hành gia cầm laptop. Bấm vào từng bé để nghe tiếng boop và xem mưa sao.
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {MASCOTS.map((mascot, i) => (
          <MascotCard key={mascot.src} mascot={mascot} index={i} />
        ))}
      </ul>
    </section>
  )
}
