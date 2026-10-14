import Image from 'next/image'
import { Sparkles, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function Hero() {
  return (
    <section className="grid items-center gap-10 md:grid-cols-2">
      <div className="flex flex-col gap-6">
        <Badge
          variant="outline"
          className="w-fit gap-1.5 border-pastel-lavender/40 bg-pastel-lavender/10 px-3 py-1 font-mono text-xs text-pastel-lavender"
        >
          <Sparkles aria-hidden="true" />
          {'theme v1.0 // galaxy-pastel'}
        </Badge>
        <h1 className="text-balance text-4xl font-bold leading-tight md:text-6xl">
          Công nghệ <span className="text-galaxy">dễ thương</span> giữa dải ngân hà
        </h1>
        <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
          Một bộ theme pha trộn sắc tím vũ trụ sâu thẳm với những gam pastel mềm mại —
          vừa hiện đại, vừa đáng yêu cho mọi sản phẩm số của bạn.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" className="h-11 rounded-full px-6 shadow-[0_0_24px] shadow-pastel-lavender/40">
            <Rocket data-icon="inline-start" aria-hidden="true" />
            Khởi hành ngay
          </Button>
          <Button size="lg" variant="outline" className="h-11 rounded-full px-6">
            Xem bảng màu
          </Button>
        </div>
      </div>

      <div className="relative mx-auto aspect-square w-full max-w-sm">
        <div
          aria-hidden="true"
          className="absolute inset-6 rounded-full bg-pastel-lavender/30 blur-3xl"
        />
        <Image
          src="/images/mascot.png"
          alt="Chú robot phi hành gia dễ thương bay giữa các vì sao"
          fill
          priority
          sizes="(min-width: 768px) 384px, 90vw"
          className="animate-float rounded-[2.5rem] object-cover ring-1 ring-border"
        />
      </div>
    </section>
  )
}
