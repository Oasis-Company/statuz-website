import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';

interface CmdHandler {
  help: string;
  run: (args: string[]) => string;
}

const COMMANDS: Record<string, CmdHandler> = {
  help: {
    help: 'list commands',
    run: () =>
      [
        'Available commands:',
        '  help                — show this list',
        '  status              — show live statuz variables',
        '  validate [path]     — validate a statuz yaml',
        '  resume [path]       — print a resume brief',
        '  list                — list agents and their states',
        '  drift               — print synthetic calibration-drift report',
        '  contract            — summarize the current human contract',
        '  echo <text>         — print text back',
        '  clear               — clear the terminal',
      ].join('\n'),
  },
  echo: { help: 'echo input', run: (args) => args.join(' ') },
  status: {
    help: 'show live statuz variables',
    run: () =>
      [
        'protocol      statuz/v1',
        'session.id    sess_8F2a...e1',
        'agent.id      agent_ceaserzhao',
        'envelope      research/docs, web:read',
        'tools         browser, files, planner',
        'calib.p50     0.72 ± 0.04',
        'contract      deploy-statuz-website',
        'milestone     beta-v0.5.0',
        'last.turn     631ms ago',
      ].join('\n'),
  },
  validate: {
    help: 'validate a statuz yaml',
    run: (args) =>
      args.length === 0
        ? 'usage: validate <path.yaml>'
        : [
            `validating ${args[0]}...`,
            '· statuz_version   ok',
            '· identity         ok',
            '· role             ok',
            '· current_state    ok',
            '· relations        ok',
            '· rules            ok',
            '',
            'result: valid · 0 issues',
          ].join('\n'),
  },
  resume: {
    help: 'print a resume brief',
    run: () =>
      [
        '>>> statuz resume',
        'You were implementing the Statuz public website. The copy is drafted',
        'and the YAML sandbox is wired. Next action: npm run build — then deploy.',
      ].join('\n'),
  },
  list: {
    help: 'list agents and their states',
    run: () =>
      [
        'agent_ceaserzhao     active    statuz-website',
        'agent_doc            idle      docs.statuz.website',
        'agent_qa             idle      qa.statuz.website',
      ].join('\n'),
  },
  drift: {
    help: 'synthetic calibration-drift report',
    run: () =>
      [
        'episode  0042  p50=0.72  sigma=0.04  calibration=ok',
        'episode  0058  p50=0.78  sigma=0.08  calibration=drifting',
        'episode  0071  p50=0.83  sigma=0.14  calibration=flagged',
        '—',
        'recommended action: re-anchor against human contract.',
      ].join('\n'),
  },
  contract: {
    help: 'summarize the current human contract',
    run: () =>
      [
        'contract: deploy-statuz-website',
        '  principals: ceaserzhao / Oasis Company',
        '  milestones: beta-v0.5.0 → v1.0.0',
        '  scope:      website + interactive sandbox',
        '  accepted:   yes (tacit — pending signature)',
      ].join('\n'),
  },
};

export default function CommandTerminal() {
  const [history, setHistory] = useState<string[]>([
    'Statuz Beta v0.5.0 — type `help` to begin.',
    ' ',
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const run = useCallback((raw: string) => {
    const line = raw.trim();
    const next: string[] = [`$ ${line}`];
    if (!line) {
      setHistory((h) => [...h, ...next]);
      return;
    }
    const [cmd, ...args] = line.split(/\s+/);
    if (cmd === 'clear') {
      setHistory([]);
      return;
    }
    const handler = COMMANDS[cmd];
    next.push(handler ? handler.run(args) : `command not found: ${cmd}  — type \`help\`.`);
    setHistory((h) => [...h, ...next]);
  }, []);

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(input);
      setInput('');
    }
  };

  return (
    <div className="rounded-sm border hairline overflow-hidden bg-ink text-white mono text-[0.82rem] leading-6">
      <div className="flex items-baseline justify-between border-b border-white/15 bg-ink-80 px-5 py-3">
        <span className="label" style={{ color: 'rgba(255,255,255,0.5)' }}>
          statuz terminal
        </span>
        <span className="label" style={{ color: 'rgba(255,255,255,0.45)' }}>
          sess_8F2a...e1
        </span>
      </div>

      <div className="px-5 py-5 h-[22rem] overflow-y-auto whitespace-pre-wrap">
        {history.map((l, i) => (
          <div key={i} className={l.startsWith('$ ') ? 'text-white' : 'text-white/70'}>
            {l}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="flex items-center gap-2 border-t border-white/15 px-5 py-3">
        <span className="text-white/60">$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          spellCheck={false}
          autoCapitalize="none"
          className="flex-1 bg-transparent outline-none text-white placeholder-white/30"
          placeholder="type a command, then press enter — try: status, drift, contract"
        />
      </div>
    </div>
  );
}
