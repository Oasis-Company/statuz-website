import { defaultStatuzYaml, siteMeta } from '../data';

function parseTopLevelRows(yaml: string, max: number): Array<[string, string]> {
  const rows: Array<[string, string]> = [];
  try {
    const topSection = yaml.split(/\n\n/)[0] ?? yaml;
    const lines = topSection.split('\n');
    const re = /^\s*([A-Za-z0-9_\-]+)\s*:\s*(.*)$/;
    for (const line of lines) {
      const m = line.match(re);
      if (!m) continue;
      const rawVal = m[2].trim();
      const val = rawVal.startsWith('"') && rawVal.endsWith('"')
        ? rawVal.slice(1, -1)
        : rawVal;
      rows.push([m[1], val]);
      if (rows.length >= max) break;
    }
  } catch {
    // fall through to empty; static fallback below
  }
  return rows;
}

const FALLBACK: Array<[string, string]> = [
  ['statuz_version', '0.1'],
  ['agent_name', 'dev-agent'],
  ['project_name', 'statuz-website'],
  ['organization', 'Oasis Company'],
  ['updated_at', 'just now'],
];

export default function HeroSection() {
  const rows = (() => {
    const parsed = parseTopLevelRows(defaultStatuzYaml, 6);
    return parsed.length >= 3 ? parsed : FALLBACK;
  })();

  return (
    <section id="top" className="border-b hairline">
      <div className="mx-auto px-4 pt-20 pb-24" style={{ maxWidth: 1200 }}>
        <div className="label">{siteMeta.tagline} · {siteMeta.name}</div>

        <h1 className="mt-6 font-display font-medium tracking-tight text-[2.75rem] sm:text-[3.4rem] leading-[1.02] text-ink max-w-3xl">
          Memory lets an AI remember the past.
          <span className="block text-ink-40 font-sans font-light mt-3 text-[1.8rem] sm:text-[2.2rem]">
            {siteMeta.subtitle}
          </span>
        </h1>

        <div className="mt-14 grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-ink-60 text-[1.05rem] leading-relaxed max-w-2xl">
              {siteMeta.fullTagline} Statuz provides an open, verifiable, extensible stack for expressing who
              an agent is, what it is doing, what progress has been made, what else in the project ecosystem
              it relates to — and where it stands in relation to a human principal's intent.
            </p>
            <p className="mt-4 text-ink-60 text-[1.05rem] leading-relaxed max-w-2xl">
              It is not a vector database. It is not MCP. It is not a task manager. It is the compact,
              versioned, human-auditable runtime status and ecological positioning that every agent workflow
              eventually needs.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={siteMeta.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm mono text-white bg-ink hover:bg-ink-80 rounded-sm px-5 py-3 transition-colors"
              >
                start on github ↗
              </a>
              <a
                href={siteMeta.npmUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm mono text-ink border hairline hover:bg-ink-05 rounded-sm px-5 py-3 transition-colors"
              >
                {siteMeta.npmPackage} on npm ↗
              </a>
              <a
                href="#stack"
                className="inline-flex items-center gap-2 text-sm mono text-ink-60 hover:text-ink underline underline-offset-4"
              >
                read the layer stack →
              </a>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <div className="border hairline rounded-sm">
              <div className="bg-ink text-white px-5 py-3 flex items-center justify-between text-[0.7rem] mono">
                <span>session · statuz/v{siteMeta.version}</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" /> live
                </span>
              </div>
              <div className="mono text-[0.78rem] leading-7 text-ink-80 bg-ink-05/40 px-5 py-5">
                {rows.map(([k, v]) => (
                  <div key={k}>
                    <span className="text-ink-40">{k.padEnd(18, ' ')}</span>
                    <span className="text-ink">{String(v)}</span>
                  </div>
                ))}
                <div className="mt-3 pt-3 border-t hairline text-ink-40">turn · just now</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
