import { comparisons } from '../data';

export default function ComparisonSection() {
  return (
    <section id="compare" className="border-b hairline">
      <div className="mx-auto px-4 py-24" style={{ maxWidth: 1200 }}>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <div className="label">Comparison</div>
            <h2 className="mt-4 font-display font-medium text-[2rem] sm:text-[2.3rem] leading-tight text-ink">
              What Statuz is not.
            </h2>
            <p className="mt-4 text-ink-60 text-base leading-relaxed">
              Statuz does not replace MCP, memory systems, task managers, or documentation. It
              complements each of them by providing a shared, versioned picture of an agent's current
              state and intent.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-8 overflow-hidden border hairline rounded-sm">
            <div className="grid grid-cols-12 bg-ink-05 border-b hairline">
              <div className="col-span-3 px-5 py-3 label">category</div>
              <div className="col-span-3 px-5 py-3 label">it</div>
              <div className="col-span-3 px-5 py-3 label">Statuz</div>
              <div className="col-span-3 px-5 py-3 label">readout</div>
            </div>

            {comparisons.map((c) => (
              <div
                key={c.axis}
                className="grid grid-cols-12 items-start border-b hairline last:border-b-0"
              >
                <div className="col-span-3 px-5 py-5 mono text-[0.78rem] text-ink-40">{c.axis}</div>
                <div className="col-span-3 px-5 py-5 text-ink-80 text-[0.92rem] leading-relaxed">
                  {c.left}
                </div>
                <div className="col-span-3 px-5 py-5 text-ink text-[0.92rem] leading-relaxed">
                  {c.right}
                </div>
                <div className="col-span-3 px-5 py-5 text-ink-60 text-[0.88rem] leading-relaxed">
                  {c.statuz}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4 lg:col-start-5 lg:col-end-13">
            <div className="border hairline rounded-sm p-6 bg-ink-05">
              <div className="label">in short</div>
              <p className="mt-4 font-serif-display text-ink text-2xl leading-[1.3]">
                Memory is for the past. Tools are for action. Statuz is for knowing where — in the
                project, in the ecosystem, and in the human's intent — you currently stand.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
