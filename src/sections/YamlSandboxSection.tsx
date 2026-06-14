import YamlSandbox from '../components/YamlSandbox';

export default function YamlSandboxSection() {
  return (
    <section id="sandbox" className="border-b hairline">
      <div className="mx-auto px-4 py-24" style={{ maxWidth: 1200 }}>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <div className="label">YAML Contract</div>
            <h2 className="mt-4 font-display font-medium text-[2rem] sm:text-[2.3rem] leading-tight text-ink">
              A contract a human can read, an agent can parse.
            </h2>
            <p className="mt-4 text-ink-60 text-base leading-relaxed">
              Edit the YAML on the left to see how Statuz interprets it. The same structure an agent
              consumes at runtime is visible to any contributor — and audit-able without tooling.
            </p>
            <div className="mt-8 border hairline rounded-sm p-5 bg-ink-05">
              <div className="label">A rule worth writing down</div>
              <p className="mt-3 text-ink-60 text-sm leading-relaxed">
                If you cannot describe in text what the agent should do next, an LLM cannot reliably infer
                it either. Write it down; then Statuz will remember it for you.
              </p>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <YamlSandbox />
          </div>
        </div>
      </div>
    </section>
  );
}
