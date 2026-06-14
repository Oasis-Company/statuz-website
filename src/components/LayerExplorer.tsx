import type { Layer } from '../data';

interface Props {
  layer: Layer;
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
      </div>
    </div>
  );
}
