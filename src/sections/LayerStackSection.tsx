import { useState } from 'react';
import { layers, type Layer } from '../data';
import LayerExplorer from '../components/LayerExplorer';

export default function LayerStackSection() {
  const [active, setActive] = useState<Layer>(layers[0]);

  return (
    <section id="stack" className="border-b hairline">
      <div className="mx-auto px-4 py-24" style={{ maxWidth: 1200 }}>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <div className="label">Layer Stack</div>
            <h2 className="mt-4 font-display font-medium text-[2rem] sm:text-[2.3rem] leading-tight text-ink">
              Five layers, one status surface.
            </h2>
            <p className="mt-4 text-ink-60 text-base leading-relaxed">
              Statuz defines five layers of situated alignment. Layers compose bottom-up: you begin with a
              single YAML file, and as your agent system grows, each layer above becomes useful.
            </p>
            <div className="mt-10 space-y-3">
              {layers.map((l, i) => (
                <button
                  key={l.id}
                  onClick={() => setActive(l)}
                  className={`w-full text-left border hairline rounded-sm px-5 py-4 transition-colors ${
                    active.id === l.id ? 'bg-ink text-white' : 'bg-white hover:bg-ink-05 text-ink'
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <span className="text-[0.75rem] mono opacity-70">
                      {String(i + 1).padStart(2, '0')} · {l.id}
                    </span>
                    <span className="text-[0.68rem] mono opacity-70">{l.status}</span>
                  </div>
                  <div className="mt-2 font-display font-medium text-lg">{l.name}</div>
                  <div className={`text-[0.85rem] mt-1 ${active.id === l.id ? 'opacity-80' : 'text-ink-60'}`}>
                    {l.subtitle}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <LayerExplorer layer={active} />
          </div>
        </div>
      </div>
    </section>
  );
}
