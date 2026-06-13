import LayerExplorer from '../components/LayerExplorer';

export default function LayerStackSection() {
  return (
    <section id="layer-stack" className="mb-16">
      <div className="text-center mb-10">
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 inline-block mb-1">
          Architecture Blueprint
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-950 leading-none">
          Hierarchical Alignment Framework
        </h2>
        <p className="text-zinc-500 mt-2 text-sm max-w-xl mx-auto">
          Statuz parses operational bounds across 5 layered abstractions. From
          instant session checkpoint variables to ecological niche governance
          parameters.
        </p>
      </div>

      <LayerExplorer />
    </section>
  );
}
