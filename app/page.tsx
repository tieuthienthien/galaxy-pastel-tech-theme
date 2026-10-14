import { Orbit, Sparkles } from 'lucide-react'
import { Hero } from '@/components/showcase/hero'
import { Palette } from '@/components/showcase/palette'
import { ComponentsDemo } from '@/components/showcase/components-demo'

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div aria-hidden="true" className="starfield pointer-events-none absolute inset-0 animate-twinkle opacity-70" />
      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="#" className="flex items-center gap-2 font-bold">
          <span className="flex size-8 items-center justify-center rounded-xl bg-pastel-lavender text-primary-foreground">
            <Orbit className="size-4" aria-hidden="true" />
          </span>
          Galaxy Pastel
        </a>
        <nav aria-label="Chính" className="hidden gap-6 text-sm text-muted-foreground sm:flex">
          <a href="#palette-title" className="hover:text-foreground">Bảng màu</a>
          <a href="#components-title" className="hover:text-foreground">Thành phần</a>
        </nav>
      </header>
      <main className="relative mx-auto flex max-w-6xl flex-col gap-20 px-6 pb-20 pt-8 md:pt-12">
        <Hero />
        <Palette />
        <ComponentsDemo />
      </main>
      <footer className="relative border-t border-border py-6 text-center font-mono text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          made with <Sparkles className="size-3 text-pastel-pink" aria-label="sao" /> stardust & pastel
        </span>
      </footer>
    </div>
  )
}
