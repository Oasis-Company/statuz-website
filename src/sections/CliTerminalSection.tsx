import CommandTerminal from '../components/CommandTerminal';

export default function CliTerminalSection() {
  return (
    <section id="terminal" className="py-16 border-b border-zinc-200">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-4">
          <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-500">
            Command Terminal
          </div>
          <h2 className="font-display text-3xl text-zinc-950 mt-4 leading-tight">
            Command Statuz from a terminal.
          </h2>
          <p className="mt-4 text-zinc-600 text-sm max-w-prose">
            Try <code className="font-mono text-zinc-900 bg-zinc-100 px-1">status</code>,
            <code className="font-mono text-zinc-900 bg-zinc-100 px-1 mx-1">drift</code>, or
            <code className="font-mono text-zinc-900 bg-zinc-100 px-1">contract</code>. The terminal
            runs inside the page and keeps its own scrollable history.
          </p>
        </div>
        <div className="col-span-12 md:col-span-8">
          <CommandTerminal />
        </div>
      </div>
    </section>
  );
}
