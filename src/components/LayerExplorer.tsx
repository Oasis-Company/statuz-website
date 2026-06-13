import { useState } from 'react';
import { layers } from '../data';

export default function LayerExplorer() {
  const [active, setActive] = useState(layers[0].id);
  const layer = layers.find(l => l.id === active) ?? layers[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-zinc-200 rounded-sm overflow-hidden bg-white">
      <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-zinc-200">
        {layers.map((l, idx) => (
          <button
            key={l.id}
            onClick={() => setActive(l.id)}
            className={`w-full text-left px-4 py-3 border-b border-zinc-200 last:border-b-0 font-mono text-[12px] transition-colors ${
              active === l.id ? 'bg-zinc-50 text-zinc-900 border-l-[3px] border-l-zinc-950' : 'text-zinc-600 hover:bg-zinc-50/60'
            }`}
          >
            <span className="text-zinc-400 mr-2">{String(idx + 1).padStart(2, '0')}</span>
            {l.name}
          </button>
        ))}
      </div>
      <div className="md:col-span-3 p-5">
        <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
          layer.{layer.id}
        </div>
        <div className="font-display text-xl text-zinc-900 mt-1">{layer.name}</div>
        <div className="mt-2 text-zinc-600 text-sm max-w-prose">{layer.summary}</div>
        <dl className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <dt className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">responsibility</dt>
            <dd className="text-zinc-800 mt-1">{layer.responsibility}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">cadence</dt>
            <dd className="text-zinc-800 mt-1">{layer.cadence}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">failure mode</dt>
            <dd className="text-zinc-800 mt-1">{layer.failureMode}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
