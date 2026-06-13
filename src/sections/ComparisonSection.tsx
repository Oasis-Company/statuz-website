interface Row {
  axis: string;
  statuz: string;
  vanillaAgent: string;
  evalNotes: string;
}

const ROWS: Row[] = [
  {
    axis: 'status recovery',
    statuz: 'signed diff graph · per-turn',
    vanillaAgent: 'conversation memory · best-effort',
    evalNotes: 'Statuz recovers deterministic state; vanilla agents lose fidelity across restarts.',
  },
  {
    axis: 'envelope / tools',
    statuz: 'declarative envelope · audited calls',
    vanillaAgent: 'implicit · ad-hoc guards',
    evalNotes: 'Tool bleed is scored, not merely warned against.',
  },
  {
    axis: 'calibration',
    statuz: 'declared p50/p90 vs observed',
    vanillaAgent: 'confidence text (unscored)',
    evalNotes: 'Drift compounds in plain agents; Statuz flags before decisions compound.',
  },
  {
    axis: 'human intent',
    statuz: 'bilateral contract · versioned',
    vanillaAgent: 'prompt / system message',
    evalNotes: 'Prompts are not contracts; Statuz keeps the contract explicit and amendable.',
  },
  {
    axis: 'audit surface',
    statuz: 'machine & human readable',
    vanillaAgent: 'chat transcript only',
    evalNotes: 'Chat transcripts are narrative; Statuz keeps observables in a parseable shape.',
  },
];

export default function ComparisonSection() {
  return (
    <section id="compare" className="py-16 border-b border-zinc-200">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-4">
          <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-500">
            Comparison Matrix
          </div>
          <h2 className="font-display text-3xl text-zinc-950 mt-4 leading-tight">
            How Statuz differs from a plain agent.
          </h2>
          <p className="mt-4 text-zinc-600 text-sm max-w-prose">
            Read the matrix below as a compact evaluation of five key axes. The right column
            describes the failure mode each axis is designed to prevent.
          </p>
        </div>

        <div className="col-span-12 md:col-span-8 overflow-hidden border border-zinc-200 rounded-sm bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                <tr>
                  <th className="text-left px-4 py-3 font-normal w-1/4">axis</th>
                  <th className="text-left px-4 py-3 font-normal w-1/3">statuz</th>
                  <th className="text-left px-4 py-3 font-normal w-1/3">plain agent</th>
                  <th className="text-left px-4 py-3 font-normal hidden lg:table-cell">notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {ROWS.map(r => (
                  <tr key={r.axis} className="align-top">
                    <td className="px-4 py-3 font-mono text-xs text-zinc-500 whitespace-nowrap">
                      {r.axis}
                    </td>
                    <td className="px-4 py-3 text-zinc-900">{r.statuz}</td>
                    <td className="px-4 py-3 text-zinc-600">{r.vanillaAgent}</td>
                    <td className="px-4 py-3 text-zinc-500 hidden lg:table-cell">{r.evalNotes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
