import LayerExplorer from '../components/LayerExplorer';

export default function LayerStackSection() {
  return (
    <section id="stack" className="py-16 border-b border-zinc-200">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-4">
          <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-500">
            Layer Stack
          </div>
          <h2 className="font-display text-3xl text-zinc-950 mt-4 leading-tight">
            Four instruments, one surface.
          </h2>
          <p className="mt-4 text-zinc-600 text-sm max-w-prose">
            Click through each layer to read its responsibility, cadence, and failure mode.
            Layers compose vertically — an agent observes status, operates within an envelope,
            declares calibration, and anchors to a human contract.
          </p>
        </div>

        <div className="col-span-12 md:col-span-8">
          <LayerExplorer />
        </div>
      </div>
    </section>
  );
}
