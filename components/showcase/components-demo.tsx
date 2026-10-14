import { Cpu, Heart, Star, Terminal, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

const stats = [
  { label: 'Năng lượng sao', value: 82, color: 'bg-pastel-lavender' },
  { label: 'Độ dễ thương', value: 100, color: 'bg-pastel-pink' },
  { label: 'Tốc độ ánh sáng', value: 64, color: 'bg-pastel-mint' },
]

export function ComponentsDemo() {
  return (
    <section aria-labelledby="components-title" className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="font-mono text-xs uppercase tracking-widest text-pastel-pink">{'02 / thành phần'}</p>
        <h2 id="components-title" className="text-2xl font-bold md:text-3xl">
          Giao diện mẫu
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="glass flex flex-col gap-4 rounded-3xl p-6">
          <h3 className="font-semibold">Nút bấm</h3>
          <div className="flex flex-wrap gap-2">
            <Button className="rounded-full">Mặc định</Button>
            <Button variant="secondary" className="rounded-full">Phụ</Button>
            <Button variant="outline" className="rounded-full">Viền</Button>
            <Button className="rounded-full bg-pastel-pink text-accent-foreground hover:bg-pastel-pink/80">
              <Heart data-icon="inline-start" aria-hidden="true" />
              Thích
            </Button>
            <Button className="rounded-full bg-pastel-mint text-primary-foreground hover:bg-pastel-mint/80">
              <Zap data-icon="inline-start" aria-hidden="true" />
              Tăng tốc
            </Button>
          </div>
          <h3 className="pt-2 font-semibold">Nhãn</h3>
          <div className="flex flex-wrap gap-2">
            <Badge>Mới</Badge>
            <Badge className="bg-pastel-sky text-primary-foreground">Beta</Badge>
            <Badge className="bg-pastel-mint text-primary-foreground">Online</Badge>
            <Badge variant="outline" className="font-mono">v2.4.1</Badge>
          </div>
        </div>

        <div className="glass flex flex-col gap-4 rounded-3xl p-6">
          <h3 className="font-semibold">Biểu mẫu</h3>
          <label className="flex flex-col gap-2 text-sm">
            <span className="text-muted-foreground">Tên phi hành gia</span>
            <Input placeholder="vd: Mèo Sao Hỏa" className="h-10 rounded-xl" />
          </label>
          <div className="flex items-center justify-between gap-4 rounded-xl bg-muted/60 p-3">
            <label htmlFor="stardust" className="text-sm">Bật bụi sao lấp lánh</label>
            <Switch id="stardust" defaultChecked />
          </div>
          <div className="flex items-center justify-between gap-4 rounded-xl bg-muted/60 p-3">
            <label htmlFor="gravity" className="text-sm">Chế độ không trọng lực</label>
            <Switch id="gravity" />
          </div>
          <Button className="mt-auto h-10 rounded-xl">
            <Star data-icon="inline-start" aria-hidden="true" />
            Gửi tín hiệu
          </Button>
        </div>

        <div className="glass flex flex-col gap-4 rounded-3xl p-6 md:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-semibold">
              <Cpu className="size-4 text-pastel-sky" aria-hidden="true" />
              Trạng thái hệ thống
            </h3>
            <span className="flex items-center gap-1.5 font-mono text-xs text-pastel-mint">
              <span className="size-2 animate-twinkle rounded-full bg-pastel-mint" aria-hidden="true" />
              online
            </span>
          </div>
          <ul className="flex flex-col gap-4">
            {stats.map((s) => (
              <li key={s.label} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-sm">
                  <span>{s.label}</span>
                  <span className="font-mono text-muted-foreground">{s.value}%</span>
                </div>
                <div
                  className="h-2 overflow-hidden rounded-full bg-muted"
                  role="progressbar"
                  aria-label={s.label}
                  aria-valuenow={s.value}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.value}%` }} />
                </div>
              </li>
            ))}
          </ul>
          <div className="rounded-xl bg-background/70 p-4 font-mono text-xs leading-relaxed ring-1 ring-border">
            <p className="mb-2 flex items-center gap-2 text-muted-foreground">
              <Terminal className="size-3.5" aria-hidden="true" />
              galaxy.sh
            </p>
            <p>
              <span className="text-pastel-pink">$</span> npm run{' '}
              <span className="text-pastel-lavender">launch</span>
            </p>
            <p className="text-pastel-mint">{'[ok] Đã kết nối trạm vũ trụ'}</p>
            <p className="text-pastel-sky">{'→ Khoảng cách: 4.2 năm ánh sáng'}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
