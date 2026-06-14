import CommandTerminal from '../components/CommandTerminal';

export default function CliTerminalSection() {
  return (
    <section id="terminal" className="border-b hairline">
      <div className="mx-auto px-4 py-24" style={{ maxWidth: 1200 }}>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <div className="label">Command Terminal</div>
            <h2 className="mt-4 font-display font-medium text-[2rem] sm:text-[2.3rem] leading-tight text-ink">
              Command Statuz from a terminal.
            </h2>
            <p className="mt-4 text-ink-60 text-base leading-relaxed">
              The three real CLI commands are exposed here:
              <code className="font-mono text-ink bg-ink-05 px-1.5 mx-1">statuz init</code>,
              <code className="font-mono text-ink bg-ink-05 px-1.5 mx-1">statuz validate</code>, and
              <code className="font-mono text-ink bg-ink-05 px-1.5 ml-1">statuz resume</code>.
              The terminal runs inside the page and keeps its own scrollable history.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <CommandTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}
