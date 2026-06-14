import { useState } from 'react';
import ArchitectureDiagram from '../components/ArchitectureDiagram';

export default function ArchitectureSection() {
  const [active, setActive] = useState<string>('core');

  return (
    <section id="architecture" className="border-b hairline">
      <div className="mx-auto px-4 py-24" style={{ maxWidth: 1200 }}>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <div className="label">Architecture</div>
            <h2 className="mt-4 font-display font-medium text-[2rem] sm:text-[2.3rem] leading-tight text-ink">
              Five layers, one status surface.
            </h2>
            <p className="mt-4 text-ink-60 text-base leading-relaxed">
              Statuz defines five layers of situated alignment. Layers compose
              bottom-up: you begin with a single YAML file, and as your agent
              system grows, each layer above becomes useful. Click any layer
              on the right to see its data flow.
            </p>
            <div className="mt-8 border hairline rounded-sm p-5 bg-ink-05">
              <div className="label">composability principle</div>
              <p className="mt-3 text-ink-60 text-sm leading-relaxed">
                Each layer is optional. No layer requires any layer above it.
                A single YAML file is a valid Statuz project. A full 5-layer
                installation is also valid — and everything in between.
              </p>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <ArchitectureDiagram activeLayerId={active} onSelect={setActive} />
          </div>
        </div>
      </div>
    </section>
  );
}
