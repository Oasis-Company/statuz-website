export default function ComparisonSection() {
  const rows = [
    {
      feature: 'Current Task Recovery',
      memory: 'Slow (unstructured retrieval query)',
      mcp: 'No (it is a transport link)',
      pm: 'Manual (Tickets/Issues)',
      statuz: 'Sub-millisecond (.statuz)',
    },
    {
      feature: 'Ecological Boundary Declars',
      memory: 'None',
      mcp: 'None',
      pm: 'Coarse description limits',
      statuz: 'Strict YAML boundaries',
    },
    {
      feature: 'Drift & Calibration Audit',
      memory: 'No (uncontrolled generation)',
      mcp: 'No',
      pm: 'Manual backlog reviews',
      statuz: 'Real-Time Drift metrics',
    },
    {
      feature: 'Human SYN Escalations',
      memory: 'None',
      mcp: 'None',
      pm: 'Manual pull requests',
      statuz: 'Structured SYN Governance',
    },
    {
      feature: 'Core Architecture Model',
      memory: 'Unstructured Vector Logs',
      mcp: 'JSON-RPC Transport API',
      pm: 'Web Kanban UI Boards',
      statuz: 'Layered YAML Declarables',
    },
  ];

  return (
    <section id="comparison" className="mb-16">
      <div className="text-center mb-10">
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 inline-block mb-1">
          Ecosystem Positioning
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-950 leading-none">
          Where Statuz Fits
        </h2>
        <p className="text-zinc-550 mt-2 text-sm max-w-lg mx-auto">
          Statuz does not replace your team&apos;s tools. It fills the
          diagnostic gap to guarantee autonomous safe execution thresholds.
        </p>
      </div>

      <div className="overflow-x-auto border border-zinc-200">
        <table className="w-full text-left text-xs md:text-sm font-sans border-collapse select-none">
          <thead>
            <tr className="bg-zinc-50 text-zinc-500 border-b border-zinc-200 font-mono text-[11px] uppercase tracking-wider">
              <th className="p-4 md:p-5 font-semibold">
                Technical Feature Matrix
              </th>
              <th className="p-4 md:p-5 font-semibold">Memory Systems</th>
              <th className="p-4 md:p-5 font-semibold">MCP Servers</th>
              <th className="p-4 md:p-5 font-semibold">
                GitHub PM (Linear)
              </th>
              <th className="p-4 md:p-5 font-semibold bg-zinc-950 text-white border-x border-zinc-950 text-center">
                Statuz Protocol
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-150">
            {rows.map((row) => (
              <tr key={row.feature}>
                <td className="p-4 md:p-5 font-semibold text-zinc-900">
                  {row.feature}
                </td>
                <td className="p-4 md:p-5 text-zinc-500">{row.memory}</td>
                <td className="p-4 md:p-5 text-zinc-500">{row.mcp}</td>
                <td className="p-4 md:p-5 text-zinc-500">{row.pm}</td>
                <td className="p-4 md:p-5 font-semibold text-zinc-950 bg-zinc-50/55 border-x border-zinc-150 text-center">
                  {row.statuz}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
