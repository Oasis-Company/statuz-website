import { useState } from 'react';
import { layers, architectureFlows, type Layer } from '../data';

interface Props {
  activeLayerId: string;
  onSelect: (id: string) => void;
}

function FlowDiagram({ layer }: { layer: Layer }) {
  const flow = architectureFlows.find((f) => f.layerId === layer.id);
  if (!flow) return null;

  const { inputs, outputs, triggers, relationships } = flow;

  return (
    <div className="space-y-4">
      <div className="label">layer · {layer.id}</div>
      <div className="font-display text-2xl text-ink leading-tight">
        {layer.name}
      </div>
      <div className="text-ink-60 text-sm leading-relaxed">
        {layer.summary}
      </div>

      {/* Flow diagram SVG — renders arrow flow */}
      <svg
        viewBox="0 0 600 320"
        className="w-full border hairline rounded-sm bg-white overflow-hidden"
        style={{ minHeight: 320 }}
        aria-label={`${layer.name} flow diagram`}
      >
        {/* INPUTS box */}
        <g>
          <rect x="20" y="40" width="160" height="80" fill="white" stroke="#0a0a0a" strokeWidth="1.5" />
          <text x="30" y="60" fontFamily="JetBrains Mono" fontSize="10" fill="#8a8a93">
            inputs
          </text>
          {inputs.map((item, i) => (
            <text key={i} x="30" y={85 + i * 15} fontFamily="Inter" fontSize="11" fill="#1f1f1f">
              {`→ ${item}`}
            </text>
          ))}
        </g>

        {/* Arrow from inputs to this layer */}
        <g stroke="#0a0a0a" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)">
          <path d="M180 80 L220 80" strokeDasharray="0" />
        </g>

        {/* THIS LAYER box */}
        <g>
          <rect
            x="220" y="40" width="160" height="80" fill="#0a0a0a" stroke="#0a0a0a" strokeWidth="1.5" />
          <text x="230" y="60" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(255,255,255,0.55)">
            this layer
          </text>
          <text x="230" y="85" fontFamily="Space Grotesk" fontSize="14" fill="white">
            {layer.name}
          </text>
          <text x="230" y="105" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(255,255,255,0.55)">
            {layer.subtitle}
          </text>
        </g>

        {/* Arrow from this layer to outputs */}
        <g stroke="#0a0a0a" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)">
          <path d="M380 80 L420 80" />
        </g>

        {/* OUTPUTS box */}
        <g>
          <rect x="420" y="40" width="160" height="80" fill="white" stroke="#0a0a0a" strokeWidth="1.5" />
          <text x="430" y="60" fontFamily="JetBrains Mono" fontSize="10" fill="#8a8a93">
            outputs
          </text>
          {outputs.map((item, i) => (
            <text key={i} x="430" y={85 + i * 15} fontFamily="Inter" fontSize="11" fill="#1f1f1f">
              {`→ ${item}`}
            </text>
          ))}
        </g>

        {/* TRIGGERS — below the main flow */}
        <g>
          <rect x="20" y="160" width="560" height="60" fill="white" stroke="#0a0a0a" strokeWidth="1.5" strokeDasharray="4 2" />
          <text x="30" y="180" fontFamily="JetBrains Mono" fontSize="10" fill="#8a8a93">
            triggers · dashed = downstream
          </text>
          {triggers.map((item, i) => (
            <text key={i} x="30" y={205 + i * 15} fontFamily="Inter" fontSize="11" fill="#1f1f1f">
              {`↳ ${item}`}
            </text>
          ))}
        </g>

        {/* Arrow marker */}
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#0a0a0a" />
          </marker>
        </defs>
      </svg>

      {/* Relationships — text description below diagram */}
      <div>
        <div className="label mb-2">relationships</div>
        <ul className="space-y-1.5 text-sm text-ink-80 leading-relaxed">
          {relationships.map((r, i) => (
            <li key={i} className="flex gap-3">
              <span className="mono text-ink-40 text-xs mt-1">{String(i + 1).padStart(2, '0')}</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ArchitectureDiagram({ activeLayerId, onSelect }: Props) {
  const [active, setActive] = useState<string>(activeLayerId);
  const activeLayer = layers.find((l) => l.id === active) ?? layers[0];

  const handleSelect = (id: string) => {
    setActive(id);
    onSelect(id);
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* LEFT: layer stack list */}
      <div className="col-span-12 lg:col-span-4">
        <div className="space-y-2">
          {[...layers].reverse().map((layer, displayIdx) => {
            const isActive = layer.id === active;
            return (
              <button
                key={layer.id}
                onClick={() => handleSelect(layer.id)}
                className={`w-full text-left border hairline rounded-sm px-5 py-4 transition-colors ${
                  isActive
                    ? 'bg-ink text-white'
                    : 'bg-white hover:bg-ink-05 text-ink'
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <span className={`text-xs mono ${isActive ? 'text-white/60' : 'text-ink-40'}`}>
                    {String(displayIdx + 1).padStart(2, '0')} · {layer.id}
                  </span>
                  <span className={`text-xs mono ${isActive ? 'text-white/60' : 'text-ink-40'}`}>
                    {layer.status}
                  </span>
                </div>
                <div className="mt-2 font-display font-medium text-lg">{layer.name}</div>
                <div className={`text-sm ${isActive ? 'text-white/75' : 'text-ink-60'}`}>
                  {layer.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-4 text-xs mono text-ink-40 italic">
          click a layer to see its data flow
        </div>
      </div>

      {/* RIGHT: flow diagram for the selected layer */}
      <div className="col-span-12 lg:col-span-8">
        <div className="border hairline rounded-sm bg-white p-6">
          <FlowDiagram layer={activeLayer} />
        </div>
      </div>
    </div>
  );
}
