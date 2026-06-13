const PROBLEMS = [
  {
    id: 'status',
    title: 'Agent state is not a log — it is a recoverable graph.',
    body: 'When an agent forgets what it agreed to do, downstream decisions silently drift. Statuz treats every turn as a signed, diffable status snapshot so recovery is mechanical, not magical.',
  },
  {
    id: 'ecology',
    title: 'Envelopes bound what an agent may touch.',
    body: 'Tool bleed across boundaries is the most common failure surface. Statuz declares envelopes declaratively and audits every tool call against them.',
  },
  {
    id: 'calibration',
    title: 'Confidence claims must be scored, not trusted.',
    body: 'Overconfident claims compound across episodes. Statuz compares declared p50/p90 against observed outcomes and flags calibration drift before decisions compound.',
  },
  {
    id: 'human',
    title: 'Human intent is a contract, not a prompt.',
    body: 'Milestones, acceptance criteria, and amendments are versioned text. Statuz turns intent into explicit, bilateral contracts the agent can cite, not hallucinate.',
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="py-16 border-b border-zinc-200">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-4">
          <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-500">
            The Problems
          </div>
          <h2 className="font-display text-3xl text-zinc-950 mt-4 leading-tight">
            Four failure surfaces — four explicit instruments.
          </h2>
          <p className="mt-4 text-zinc-600 text-sm max-w-prose">
            Each problem below is real, observed, and expensive at scale. Statuz provides a
            compact mechanism for each, composed into a single status surface.
          </p>
        </div>

        <div className="col-span-12 md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PROBLEMS.map((p, idx) => (
            <article
              key={p.id}
              className="border border-zinc-200 rounded-sm bg-white p-5 flex flex-col"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>{String(idx + 1).padStart(2, '0')} · problem.{p.id}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
              </div>
              <h3 className="mt-3 font-display text-lg text-zinc-900 leading-snug">{p.title}</h3>
              <p className="mt-3 text-sm text-zinc-600 leading-relaxed">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
