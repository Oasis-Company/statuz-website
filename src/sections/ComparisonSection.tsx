import { comparisons } from '../data';

interface IconProps {
  type: string;
}

function LineIcon({ type }: IconProps) {
  const common = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  if (type.startsWith('vs Memory')) {
    // clock icon
    return (
      <svg {...common} aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }
  if (type.startsWith('vs MCP')) {
    // plug / connect icon
    return (
      <svg {...common} aria-hidden="true">
        <circle cx="9" cy="9" r="2" />
        <circle cx="15" cy="15" r="2" />
        <circle cx="15" cy="9" r="2" />
        <circle cx="9" cy="15" r="2" />
      </svg>
    );
  }
  if (type.startsWith('vs Agent Skills')) {
    // package icon
    return (
      <svg {...common} aria-hidden="true">
        <path d="M3 7l9-4 9 4-9 4-9-4z" />
        <path d="M3 7v10l9 4 9-4V7" />
        <path d="M12 11v10" />
      </svg>
    );
  }
  if (type.startsWith('vs Project Documentation')) {
    // book icon
    return (
      <svg {...common} aria-hidden="true">
        <path d="M4 4h10a4 4 0 014 4v12H8a4 4 0 01-4-4V4z" />
        <path d="M4 4v12a4 4 0 014-4h10" />
      </svg>
    );
  }
  if (type.startsWith('vs Task Management')) {
    // checkbox / todo list icon
    return (
      <svg {...common} aria-hidden="true">
        <rect x="4" y="5" width="6" height="6" rx="1" />
        <path d="M13 8h7M13 13h7M13 18h7" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <path d="M6 6l2 2" />
      </svg>
    );
  }
  return null;
}

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
                <div className="col-span-3 px-5 py-5 mono text-[0.78rem] text-ink-60">
                  <div className="flex items-center gap-2 text-ink-60">
                    <span className="inline-flex text-ink-40"><LineIcon type={c.axis} /></span>
                    <span>{c.axis}</span>
                  </div>
                </div>
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
