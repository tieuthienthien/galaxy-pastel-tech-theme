const swatches = [
  { name: 'Nebula Night', token: '--background', className: 'bg-background ring-1 ring-border', value: 'oklch(0.16 0.045 285)' },
  { name: 'Lavender', token: '--pastel-lavender', className: 'bg-pastel-lavender', value: 'oklch(0.82 0.11 300)' },
  { name: 'Candy Pink', token: '--pastel-pink', className: 'bg-pastel-pink', value: 'oklch(0.84 0.1 350)' },
  { name: 'Mint Comet', token: '--pastel-mint', className: 'bg-pastel-mint', value: 'oklch(0.88 0.1 170)' },
  { name: 'Baby Sky', token: '--pastel-sky', className: 'bg-pastel-sky', value: 'oklch(0.85 0.09 235)' },
]

export function Palette() {
  return (
    <section aria-labelledby="palette-title" className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="font-mono text-xs uppercase tracking-widest text-pastel-mint">{'01 / bảng màu'}</p>
        <h2 id="palette-title" className="text-2xl font-bold md:text-3xl">
          Năm sắc màu vũ trụ
        </h2>
      </div>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {swatches.map((s) => (
          <li key={s.token} className="glass flex flex-col gap-3 rounded-2xl p-3">
            <div className={`h-24 rounded-xl ${s.className}`} aria-hidden="true" />
            <div className="flex flex-col gap-0.5 px-1">
              <span className="font-semibold">{s.name}</span>
              <code className="font-mono text-[11px] text-muted-foreground">{s.token}</code>
              <code className="font-mono text-[11px] text-muted-foreground">{s.value}</code>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
