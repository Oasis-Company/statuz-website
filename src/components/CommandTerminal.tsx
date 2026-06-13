import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

type CmdHandler = (args: string[]) => string;

const COMMANDS: Record<string, { help: string; run: CmdHandler }> = {
  help: {
    help: 'list commands',
    run: () =>
      [
        'Available commands:',
        '  help         — show this list',
        '  status       — show live statuz variables',
        '  theme <name> — switch theme (linear | compact | mono)',
        '  contract     — summarize the current human contract',
        '  drift        — emit a synthetic calibration-drift report',
        '  clear        — clear terminal',
        '  echo <text>  — print text back',
      ].join('\n'),
  },
  echo: {
    help: 'echo input',
    run: args => args.join(' '),
  },
  status: {
    help: 'show statuz variables',
    run: () =>
      [
        'protocol      statuz/v1',
        'session.id    sess_8F2a...e1',
        'agent.id      agent_ceaserzhao',
        'envelope      research/docs,web:read',
        'tools         browser, files, planner',
        'calib.p50     0.72 ± 0.04',
        'contract      deploy-statuz-website',
        'milestone     beta-v0.5.0',
        'last.turn     631ms ago',
      ].join('\n'),
  },
  theme: {
    help: 'switch theme',
    run: args => {
      const t = args[0];
      if (!t || !['linear', 'compact', 'mono'].includes(t)) {
        return `usage: theme <linear | compact | mono>`;
      }
      return `theme → ${t}  (change via Design System Wizard for full effect)`;
    },
  },
  contract: {
    help: 'summarize contract',
    run: () =>
      [
        'contract: deploy-statuz-website',
        '  principals: ceaserzhao / Oasis Company',
        '  milestones: beta-v0.5.0 → v1.0.0',
        '  scope:      website + docs + sandbox',
        '  accepted:   yes (tacit, pending signature)',
      ].join('\n'),
  },
  drift: {
    help: 'synthetic calibration drift report',
    run: () =>
      [
        'episode  42     p50=0.72  sigma=0.04  calibration=ok',
        'episode  58     p50=0.78  sigma=0.08  calibration=drifting',
        'episode  71     p50=0.83  sigma=0.14  calibration=flagged',
        '—',
        'recommended action: re-anchor against human contract.',
      ].join('\n'),
  },
};

interface Line {
  kind: 'input' | 'output' | 'meta';
  text: string;
}

export default function CommandTerminal() {
  const [history, setHistory] = useState<Line[]>([
    { kind: 'meta', text: 'Statuz Beta v0.5.0 — type `help` to begin.' },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const run = (raw: string) => {
    const line = raw.trim();
    if (!line) return;
    setHistory(prev => [...prev, { kind: 'input', text: `$ ${line}` }]);
    const [cmd, ...args] = line.split(/\s+/);
    if (cmd === 'clear') {
      setHistory([]);
      return;
    }
    const handler = COMMANDS[cmd];
    const out = handler
      ? handler.run(args)
      : `command not found: ${cmd}. type \`help\`.`;
    setHistory(prev => [...prev, { kind: 'output', text: out }]);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(input);
      setInput('');
    }
  };

  return (
    <div className="rounded-sm border border-zinc-200 bg-zinc-950 text-zinc-100 font-mono text-[12.5px] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900 text-zinc-400 text-[11px] uppercase tracking-wider">
        <div>statuz terminal</div>
        <div>session sess_8F2a...e1</div>
      </div>

      <div className="px-4 py-3 h-[320px] overflow-y-auto leading-6 whitespace-pre-wrap">
        {history.map((l, i) => (
          <div
            key={i}
            className={
              l.kind === 'input'
                ? 'text-emerald-300'
                : l.kind === 'meta'
                  ? 'text-zinc-500'
                  : 'text-zinc-200'
            }
          >
            {l.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="flex items-center gap-2 px-4 py-3 border-t border-zinc-800 bg-zinc-900">
        <span className="text-emerald-400">$</span>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKey}
          spellCheck={false}
          autoCapitalize="none"
          className="flex-1 bg-transparent outline-none text-zinc-100 placeholder-zinc-600"
          placeholder="type a command, then press enter"
        />
      </div>
    </div>
  );
}
