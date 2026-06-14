import type { Layer } from '../data';
import { architectureFlows } from '../data';

interface Props {
  layer: Layer;
}

function MiniFlow({ layer }: { layer: Layer }) {
  const flow = architectureFlows.find((f) => f.layerId === layer.id);
  if (!flow) return null;

  const { inputs, outputs } = flow;
  const maxItems = Math.min(3, Math.max(inputs.length, outputs.length));

  return (
    <svg
      viewBox="0 0 600 220"
      className="w-full"
      style={{ minHeight: 220 }}
      aria-label={`${layer.name} mini flow`}
    >
      <defs>
        <marker id="mini-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#0a0a0a" />
        </marker>
      </defs>

      {/* INPUTS column */}
      <g>
        <rect x="20" y="30" width="180" height={50 + maxItems * 22} fill="white" stroke="#0a0a0a" strokeWidth="1.2" />
        <text x="30" y="50" fontFamily="JetBrains Mono" fontSize="10" fill="#8a8a93">
          inputs
        </text>
        {inputs.slice(0, maxItems).map((item, i) => (
          <text key={i} x="30" y={75 + i * 22} fontFamily="Inter" fontSize="11" fill="#1f1f1f">
            {`→ ${item.length > 28 ? item.slice(0, 26) + '…' : item}`}
          </text>
        ))}
      </g>

      {/* Arrow inputs → layer */}
      <path d="M200 60 L250 60" stroke="#0a0a0a" strokeWidth="1.2" fill="none" markerEnd="url(#mini-arrow)" />

      {/* LAYER box */}
      <g>
        <rect x="250" y="30" width="120" height={50 + maxItems * 22} fill="#0a0a0a" stroke="#0a0a0a" strokeWidth="1.2" />
        <text x="260" y="50" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(255,255,255,0.55)">
          {layer.id}
        </text>
        <text x="260" y="78" fontFamily="Space Grotesk" fontSize="14" fill="white">
          {layer.name.length > 18 ? layer.name.slice(0, 16) + '…' : layer.name}
        </text>
        <text x="260" y="100" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(255,255,255,0.4)">
          {layer.subtitle.length > 20 ? layer.subtitle.slice(0, 18) + '…' : layer.subtitle}
        </text>
      </g>

      {/* Arrow layer → outputs */}
      <path d="M370 60 L420 60" stroke="#0a0a0a" strokeWidth="1.2" fill="none" markerEnd="url(#mini-arrow)" />

      {/* OUTPUTS column */}
      <g>
        <rect x="420" y="30" width="160" height={50 + maxItems * 22} fill="white" stroke="#0a0a0a" strokeWidth="1.2" />
        <text x="430" y="50" fontFamily="JetBrains Mono" fontSize="10" fill="#8a8a93">
          outputs
        </text>
        {outputs.slice(0, maxItems).map((item, i) => (
          <text key={i} x="430" y={75 + i * 22} fontFamily="Inter" fontSize="11" fill="#1f1f1f">
            {`→ ${item.length > 24 ? item.slice(0, 22) + '…' : item}`}
          </text>
        ))}
      </g>
    </svg>
  );
}

export default function LayerExplorer({ layer }: Props) {
  return (
    <div className="border hairline rounded-sm overflow-hidden">
      <div className="bg-ink text-white px-6 py-4 flex items-baseline justify-between">
        <div className="flex items-baseline gap-3">
          <span className="label" style={{ color: 'rgba(255,255,255,0.55)' }}>
            {layer.id}
          </span>
          <span className="font-display font-medium text-lg">{layer.name}</span>
          <span className="label hidden sm:inline" style={{ color: 'rgba(255,255,255,0.45)' }}>
            — {layer.subtitle}
          </span>
        </div>
        <span className="text-[0.7rem] mono opacity-70">{layer.status}</span>
      </div>

      <div className="px-6 py-6">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-7">
            <div className="label">Question Answered</div>
            <p className="mt-3 font-serif-display text-ink text-2xl leading-[1.25]">
              {layer.questionAnswered}
            </p>
            <div className="mt-8">
              <div className="label">Summary</div>
              <p className="mt-3 text-ink-60 text-[0.97rem] leading-relaxed">{layer.summary}</p>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 space-y-6">
            <div>
              <div className="label">Responsibility</div>
              <p className="mt-2 text-ink-80 text-[0.92rem] leading-relaxed">{layer.responsibility}</p>
            </div>
            <div>
              <div className="label">Cadence</div>
              <p className="mt-2 text-ink-80 text-[0.92rem] leading-relaxed">{layer.cadence}</p>
            </div>
            {layer.primitives && layer.primitives.length > 0 && (
              <div>
                <div className="label">Primitives</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {layer.primitives.map((p) => (
                    <span
                      key={p}
                      className="mono text-[0.72rem] text-ink-60 border hairline rounded-sm px-2.5 py-1.5 bg-ink-05"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mini flow diagram */}
        <div className="mt-8 pt-6 border-t hairline">
          <div className="label mb-3">how this layer works</div>
          <MiniFlow layer={layer} />
        </div>
      </div>
    </div>
  );
}
