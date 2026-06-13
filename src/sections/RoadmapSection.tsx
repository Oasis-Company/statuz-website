interface Entry {
  version: string;
  date: string;
  title: string;
  items: string[];
  state: 'shipped' | 'active' | 'planned';
}

const ROADMAP: Entry[] = [
  {
    version: 'v0.5.0',
    date: '2026-06',
    title: 'Beta — statuz website + YAML sandbox',
    state: 'active',
    items: [
      'Interactive design-system wizard with live theme switch',
      'YAML contract sandbox with lightweight observables parser',
      'Command terminal for status, drift, and contract inspection',
    ],
  },
  {
    version: 'v0.7.0',
    date: '2026-Q3',
    title: 'Reference runtime',
    state: 'planned',
    items: [
      'Minimal TypeScript runtime implementing envelopes and calibration scoring',
      'Observable emitters for popular agent frameworks',
      'Offline-first session snapshots',
    ],
  },
  {
    version: 'v1.0.0',
    date: '2026-Q4',
    title: 'Bilateral human contracts',
    state: 'planned',
    items: [
      'Explicit human-intent contracts with versioned amendments',
      'Audit trail and acceptance record',
      'Open protocol spec (Apache-2.0)',
    ],
  },
];

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="py-16 border-b border-zinc-200">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-4">
          <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-500">
            Roadmap
          </div>
          <h2 className="font-display text-3xl text-zinc-950 mt-4 leading-tight">
            From beta to bilateral contracts.
          </h2>
          <p className="mt-4 text-zinc-600 text-sm max-w-prose">
            The roadmap is a signal, not a contract — each entry is a living milestone that can be
            amended, and those amendments become part of the agent's history.
          </p>
        </div>

        <div className="col-span-12 md:col-span-8 space-y-4">
          {ROADMAP.map((entry, idx) => (
            <article
              key={entry.version}
              className="border border-zinc-200 rounded-sm bg-white p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                    milestone {String(idx + 1).padStart(2, '0')} · {entry.date}
                  </div>
                  <h3 className="font-display text-lg text-zinc-950 mt-1">{entry.title}</h3>
                </div>
                <div
                  className={`text-[11px] font-mono uppercase tracking-wider px-2 py-1 rounded-xs border ${
                    entry.state === 'active'
                      ? 'border-zinc-900 bg-zinc-900 text-white'
                      : entry.state === 'shipped'
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                        : 'border-zinc-200 text-zinc-500'
                  }`}
                >
                  {entry.state}
                </div>
              </div>

              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                {entry.items.map((it, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-zinc-700 border border-zinc-100 rounded-xs p-3 bg-zinc-50/40"
                  >
                    <span className="font-mono text-[11px] text-zinc-400">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
