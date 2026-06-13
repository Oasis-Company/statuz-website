import CommandTerminal from '../components/CommandTerminal';

export default function CliTerminalSection() {
  return (
    <section id="cli-command-block" className="mb-16">
      <div className="text-center mb-10">
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 inline-block mb-1">
          Developer Workflow Toolchain
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 leading-none">
          The Statuz Command CLI
        </h2>
        <p className="text-zinc-500 mt-2 text-sm max-w-xl mx-auto">
          Simple system integration boundaries. Execute core commands or read
          MCP diagnostic states within standard terminal prompts.
        </p>
      </div>

      <CommandTerminal />
    </section>
  );
}
