import YamlSandbox from '../components/YamlSandbox';

export default function YamlSandboxSection() {
  return (
    <section id="sandbox" className="py-16 border-b border-zinc-200">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-4">
          <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-500">
            YAML Sandbox
          </div>
          <h2 className="font-display text-3xl text-zinc-950 mt-4 leading-tight">
            Edit the contract; watch the surface recompute.
          </h2>
          <p className="mt-4 text-zinc-600 text-sm max-w-prose">
            A lightweight YAML contract is parsed on the right. Change envelopes, calibration
            bounds, or human contract fields — the observables panel updates instantly. This is
            the same contract surface an agent would read at runtime.
          </p>
        </div>
        <div className="col-span-12 md:col-span-8">
          <YamlSandbox />
        </div>
      </div>
    </section>
  );
}
