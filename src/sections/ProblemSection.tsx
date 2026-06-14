import { problems } from '../data';

export default function ProblemSection() {
  return (
    <section id="problem" className="border-b hairline">
      <div className="mx-auto px-4 py-24" style={{ maxWidth: 1200 }}>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <div className="label">The Problems</div>
            <h2 className="mt-4 font-display font-medium text-[2rem] sm:text-[2.3rem] leading-tight text-ink">
              Four places where agents quietly break.
            </h2>
            <p className="mt-4 text-ink-60 text-base leading-relaxed">
              Statuz is organized around four failure surfaces — each observed repeatedly across production
              agent deployments. Each corresponds to a layer of the protocol.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink-10 border hairline rounded-sm overflow-hidden">
            {problems.map((p, idx) => (
              <article key={p.id} className="bg-white p-7 flex flex-col">
                <div className="flex items-baseline justify-between">
                  <div className="label">{String(idx + 1).padStart(2, '0')}</div>
                  <div className="label">problem · {p.id}</div>
                </div>
                <h3 className="mt-5 font-display font-medium text-xl leading-snug text-ink">
                  {p.headline}
                </h3>
                <p className="mt-3 text-ink-60 text-[0.95rem] leading-relaxed">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
