import YamlSandbox from '../components/YamlSandbox';

export default function YamlSandboxSection() {
  return (
    <section id="code-playground" className="mb-16">
      <div className="text-center mb-10">
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 inline-block mb-1">
          Interactive Test Chamber
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-950 leading-none">
          The Live Spec Playground
        </h2>
        <p className="text-zinc-500 mt-2 text-sm max-w-xl mx-auto">
          Inspect and override actual <code>.statuz</code> files. Observe how
          the drift vectors change as you tweak simulated constraints.
        </p>
      </div>

      <YamlSandbox />
    </section>
  );
}
