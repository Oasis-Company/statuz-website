import { roadmap, type RoadmapEntry } from '../data';

function summarizeByState(entries: RoadmapEntry[]): Array<{
  state: RoadmapEntry['state'];
  versions: string;
  count: number;
}> {
  const order: Array<RoadmapEntry['state']> = ['stable', 'in-progress', 'draft', 'planned'];
  return order
    .map((s) => {
      const group = entries.filter((e) => e.state === s);
      if (group.length === 0) return null;
      const versions = group.map((e) => e.version).join(' · ');
      return { state: s, versions, count: group.length };
    })
    .filter((x): x is { state: RoadmapEntry['state']; versions: string; count: number } => x !== null);
}

export default function RoadmapSection() {
  const summary = summarizeByState(roadmap);

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
              {summary.map((s) => (
                <div
                  key={s.state}
                  className={
                    s.state === 'in-progress'
                      ? 'border hairline rounded-sm p-4 bg-ink text-white'
                      : 'border hairline rounded-sm p-4'
                  }
                >
                  <div className="label" style={s.state === 'in-progress' ? { color: 'rgba(255,255,255,0.55)' } : undefined}>
                    {s.state}
                  </div>
                  <div className="mt-2 font-display text-xl text-inherit leading-none">
                    {s.count} entr{s.count === 1 ? 'y' : 'ies'}
                  </div>
                  <div className="mt-2 text-sm opacity-70 break-words">{s.versions}</div>
                </div>
              ))}
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
                      <span className="mono text-ink-40 text-[0.78rem] mt-1 shrink-0">
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
