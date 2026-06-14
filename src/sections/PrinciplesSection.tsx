import { principles } from '../data';

export default function PrinciplesSection() {
  return (
    <section id="principles" className="border-b hairline">
      <div className="mx-auto px-4 py-24" style={{ maxWidth: 1200 }}>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <div className="label">Principles</div>
            <h2 className="mt-4 font-display font-medium text-[2rem] sm:text-[2.3rem] leading-tight text-ink">
              Six principles that shape every layer.
            </h2>
            <p className="mt-4 text-ink-60 text-base leading-relaxed">
              When a feature conflicts with one of these, the principle wins. Every choice in Statuz —
              protocol-level, tool-level, or visual — returns to these sentences.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink-10 border hairline rounded-sm overflow-hidden">
            {principles.map((p, i) => (
              <article key={p.id} className="bg-white p-7">
                <div className="flex items-baseline justify-between">
                  <div className="label">{String(i + 1).padStart(2, '0')}</div>
                  <div className="label">{p.id}</div>
                </div>
                <h3 className="mt-5 font-display font-medium text-xl leading-snug text-ink">
                  {p.headline}
                </h3>
                <p className="mt-3 text-ink-60 text-[0.95rem] leading-relaxed">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
