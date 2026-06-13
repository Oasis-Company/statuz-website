const PRINCIPLES = [
  {
    id: 'observable',
    title: 'Observable over opaque.',
    body: 'Every agent turn must emit a status row a human or another agent can read.',
  },
  {
    id: 'explicit',
    title: 'Explicit over implicit.',
    body: 'Envelopes, contracts, and confidence bands are declared text — never inferred.',
  },
  {
    id: 'calibrated',
    title: 'Calibrated over confident.',
    body: 'A wrong claim with honest calibration is cheaper to fix than an over-confident one.',
  },
  {
    id: 'bilateral',
    title: 'Bilateral over one-sided.',
    body: 'Human intent is a contract with an acceptance record, not a throwaway prompt.',
  },
  {
    id: 'versioned',
    title: 'Versioned over latest-only.',
    body: 'Status and contracts are diffable, so recovery is a diff, not a do-over.',
  },
  {
    id: 'auditable',
    title: 'Auditable by default.',
    body: 'Protocol output is plain-text and parseable. No bespoke tooling required to audit.',
  },
];

export default function PrinciplesSection() {
  return (
    <section id="principles" className="py-16 border-b border-zinc-200">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-4">
          <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-500">
            Principles
          </div>
          <h2 className="font-display text-3xl text-zinc-950 mt-4 leading-tight">
            Six design principles.
          </h2>
          <p className="mt-4 text-zinc-600 text-sm max-w-prose">
            The protocol, toolchain, and visual surface are shaped by these principles. When a
            feature conflicts with one, the principle wins.
          </p>
        </div>

        <div className="col-span-12 md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PRINCIPLES.map((p, idx) => (
            <article
              key={p.id}
              className="border border-zinc-200 rounded-sm bg-white p-5"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>principle {String(idx + 1).padStart(2, '0')}</span>
                <span className="text-zinc-400">{p.id}</span>
              </div>
              <h3 className="mt-3 font-display text-lg text-zinc-900">{p.title}</h3>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
