const PHASES: {
  num: string;
  title: string;
  desc: string;
}[] = [
  {
    num: '01-03',
    title: 'Drafting & Initial SDK',
    desc: 'Drafted seed protocol specifications, completed TypeScript SDK and core Commander.js CLI engine wrappers.',
  },
  {
    num: '04-05',
    title: 'IDE Integrations',
    desc: 'VS Code diagnostics integration, status bar alerts, syn decision WebView panels, and NPM release deployment.',
  },
  {
    num: '06-09',
    title: 'Niche Object Set',
    desc: 'Implementing automated niche discovery controllers, Arrow topologies, and decentralized signal buses.',
  },
  {
    num: '1.0',
    title: 'Consolidated Spec Node',
    desc: 'Freeze core schema constructs. Open decentralization coordination pools to third-party integrations.',
  },
];

export default function RoadmapSection() {
  return (
    <section className="mb-12 bg-zinc-50 border border-zinc-150 p-6 md:p-8 rounded-xl text-center">
      <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">
        STATUZ DEVELOPMENT FLOW
      </span>
      <h3 className="font-display text-xl font-bold tracking-tight text-zinc-950">
        Roadmap to Protocol v1.0
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 mb-5 text-left max-w-4xl mx-auto text-xs">
        {PHASES.map((phase, idx) => (
          <div
            key={phase.num}
            className={`space-y-1 ${
              idx === 0 ? '' : 'border-l border-zinc-200 pl-4'
            }`}
          >
            <span className="text-zinc-400 font-mono text-[10px] uppercase font-bold block">
              Phase {phase.num} {idx < 2 ? '// Done' : idx === 2 ? '// Active' : '// Future'}
            </span>
            <h4 className="font-bold text-zinc-950">{phase.title}</h4>
            <p className="text-zinc-500 font-sans">{phase.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
