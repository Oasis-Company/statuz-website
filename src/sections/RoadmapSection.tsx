import { roadmap } from '../data';

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="border-b hairline">
      <div className="mx-auto px-4 py-24" style={{ maxWidth: 1200 }}>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <div className="label">Roadmap</div>
            <h2 className="mt-4 font-display font-medium text-[2rem] sm:text-[2.3rem] leading-tight text-ink">
              Grow with the protocol.
            </h2>
            <p className="mt-4 text-ink-60 text-base leading-relaxed">
              Start with a single YAML file. Add a CLI. Add niche. Add calibration. Add SYN. Each step is
              independently useful. None requires the others to make sense today.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-3">
              <div className="border hairline rounded-sm p-4">
                <div className="label">stable</div>
                <div className="mt-2 font-display text-2xl text-ink">0.1 – 0.4</div>
                <div className="mt-2 text-sm text-ink-60">Core protocol · CLI · SDK · MCP</div>
              </div>
              <div className="border hairline rounded-sm p-4 bg-ink text-white">
                <div className="label" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  in progress
                </div>
                <div className="mt-2 font-display text-2xl">0.5</div>
                <div className="mt-2 text-sm opacity-75">Integrations · VS Code Extension</div>
              </div>
              <div className="border hairline rounded-sm p-4">
                <div className="label">draft</div>
                <div className="mt-2 font-display text-2xl text-ink">0.6 – 0.8</div>
                <div className="mt-2 text-sm text-ink-60">niche charter → vertical demo</div>
              </div>
              <div className="border hairline rounded-sm p-4">
                <div className="label">planned</div>
                <div className="mt-2 font-display text-2xl text-ink">0.9 → 1.0</div>
                <div className="mt-2 text-sm text-ink-60">SYN MVP · protocol finalization</div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 space-y-3">
            {roadmap.map((r) => (
              <article key={r.id} className="border hairline rounded-sm bg-white p-6">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                  <div className="flex items-baseline gap-4">
                    <span className="mono text-ink-40 text-[0.78rem]">{r.version}</span>
                    <h3 className="font-display font-medium text-xl text-ink leading-snug">
                      {r.title}
                    </h3>
                  </div>
                  <span className="label">{r.state}</span>
                </div>
                <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 text-[0.95rem] text-ink-60 leading-relaxed">
                  {r.items.map((item, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="mono text-ink-40 text-[0.78rem] mt-1">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
