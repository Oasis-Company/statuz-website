const PRINCIPLES: { num: string; title: string; desc: string }[] = [
  {
    num: '01',
    title: 'Runtime First',
    desc: 'Everything must strengthen state evaluation for quick session pick-ups.',
  },
  {
    num: '02',
    title: 'Discovery First',
    desc: 'AI agent discovers ecological relations, but humans explicitly confirm status.',
  },
  {
    num: '03',
    title: 'State Before Automation',
    desc: 'The agent must parse its location boundaries before executing any code changes.',
  },
  {
    num: '04',
    title: 'Structure Before Interface',
    desc: 'Topology mappings and YAML schema semantics are 10x more important than visual diagram dashboards.',
  },
  {
    num: '05',
    title: 'Compression Over Collection',
    desc: 'Reduce state values to strict metrics, rather than accumulating bloated chats.',
  },
  {
    num: '06',
    title: 'Understanding Over Visualization',
    desc: 'A beautiful relation graph is useless if it produces no functional alignment.',
  },
  {
    num: '07',
    title: 'Small Enough to Survive',
    desc: 'Config blocks must remain small enough to be loaded instantly at prompt start.',
  },
  {
    num: '08',
    title: 'Declaration ≠ Authority',
    desc: 'Observed agent behavior does not grant automatic authorization. Only SYN overrides are valid.',
  },
  {
    num: '09',
    title: 'Minimal Disclosure',
    desc: 'Every telemetry profile contains only the minimum information necessary to execute alignment.',
  },
];

export default function PrinciplesSection() {
  return (
    <section className="mb-16 border-t border-zinc-200 pt-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            The Manifesto Principles
          </span>
          <h3 className="font-display text-2.5xl font-extrabold tracking-tight text-zinc-950 mt-1">
            The 9 Laws of Situated Alignment
          </h3>
          <p className="text-xs text-zinc-500 mt-2 font-sans leading-relaxed">
            Statuz is guided by architectural constraints designed to prevent
            scope-creep. We value structure before interfaces and minimal
            disclosures.
          </p>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRINCIPLES.map((princ) => (
            <div
              key={princ.num}
              className="bg-white border border-zinc-200/80 p-5 group hover:border-zinc-950 transition-all text-left"
              style={{
                borderRadius:
                  // Reuse a sensible radius token
                  '0.375rem',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-zinc-400 group-hover:text-zinc-900 transition-colors font-bold">
                  {princ.num}
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-200 group-hover:bg-zinc-950 transition-colors" />
              </div>
              <h4 className="font-display font-bold text-sm text-zinc-950 tracking-tight">
                {princ.title}
              </h4>
              <p className="text-xs text-zinc-600 mt-1 font-sans leading-relaxed">
                {princ.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
