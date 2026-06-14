import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { siteMeta } from '../data';

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
        '  help                 — show this list',
        '  statuz init          — scaffold a new .statuz/statuz.yaml',
        '  statuz validate      — validate a statuz yaml against the JSON schema',
        '  statuz resume        — print a human-readable resume brief',
        '  statuz version       — show the installed CLI version',
        '  niche manifest       — show the niche manifest (ecological position)',
        '  calibration drift    — report drift between declared niche and observed behavior',
        '  syn request          — begin a structured human-governed decision request',
        '  echo <text>          — print text back',
        '  clear                — clear the terminal',
      ].join('\n'),
  },
  echo: { help: 'echo input', run: (args) => args.join(' ') },
  'statuz init': {
    help: 'initialize a new statuz file',
    run: () =>
      [
        '» statuz init --agent dev-agent --project statuz-website',
        '',
        '  [1/3] creating .statuz/ ........................................... ok',
        '  [2/3] writing statuz.yaml ......................................... ok',
        '  [3/3] writing .gitignore entry .................................... ok',
        '',
        '  ✓ initialized .statuz/statuz.yaml (statuz_version: 0.1)',
        '  next: statuz validate .statuz/statuz.yaml',
      ].join('\n'),
  },
  'statuz validate': {
    help: 'validate a statuz yaml against the JSON schema',
    run: (args) =>
      [
        `» statuz validate ${args[0] || '.statuz/statuz.yaml'}`,
        '',
        '  ┌ statuz_version ........................................................ 0.1 ✓',
        '  ├ identity.agent_name .............................................. dev-agent ✓',
        '  ├ identity.project_name .......................................... statuz-website ✓',
        '  ├ role.responsibilities .............................................. 2 items ✓',
        '  ├ role.boundaries ........................................................... 1 ✓',
        '  ├ current_state.phase ........................................... implementation ✓',
        '  ├ current_state.status ............................................ in_progress ✓',
        '  ├ relations.related_agents .......................................... 2 items ✓',
        '  ├ relations.related_projects ........................................ 1 item  ✓',
        '  ├ rules.should / should_not ............................................ ok ✓',
        '  └ checkpoints[0].at ........................ 2026-06-14T00:00:00Z (iso8601) ✓',
        '',
        '  ✓ 11 / 11 checks passed — valid',
      ].join('\n'),
  },
  'statuz resume': {
    help: 'print a human-readable resume brief',
    run: () =>
      [
        '» statuz resume',
        '',
        '  # Resume brief — statuz-website / dev-agent',
        '',
        '  You were implementing the Statuz public website. The layer stack is in place,',
        '  the YAML sandbox is wired with a complete default document, and the command',
        '  terminal exposes the three real CLI commands: init, validate, resume.',
        '',
        '  · progress: copy edited, niche + calibration + SYN sections aligned with real release.',
        '  · block:    none.',
        '  · next:     npm run build — then deploy.',
      ].join('\n'),
  },
  'statuz version': {
    help: 'show the installed CLI version',
    run: () => `@statuz/cli v${siteMeta.version} · ${siteMeta.repository}`,
  },
  'niche manifest': {
    help: 'show the niche manifest (ecological position)',
    run: () =>
      [
        '» niche manifest',
        '',
        '  declared_position:',
        '    purpose:  "Handle the public-facing Statuz website."',
        '    does:    ["Build and maintain sections", "Render the YAML sandbox",',
        '               "Render the interactive command terminal"]',
        '    does_not:["Modify backend CLI logic", "Change the protocol specification",',
        '               "Store secrets or API keys in Statuz files"]',
        '',
        '  strategic_bets:',
        '    - Monochrome, line-first typography (no ornamentation).',
        '    - Core content is a single TypeScript file (data.ts) — easy to diff.',
        '',
        '  success_signals:',
        '    - Copy stays aligned with the real Statuz repository release.',
        '    - No schema / copy drift between website and protocol.',
      ].join('\n'),
  },
  'calibration drift': {
    help: 'report drift between declared niche and observed behavior',
    run: () =>
      [
        '» calibration drift',
        '',
        '  ┌ signal: website-copy-vs-repo',
        '  ├ metric:  alignment score',
        '  ├ declared_threshold: 0.90',
        '  ├ observed_score:      0.94',
        '  └ status:  within tolerance — no SYN request required',
        '',
        '  last_calibration_run: 2026-06-14T00:00:00Z',
        '  next_auto_check:      ~ 12h',
      ].join('\n'),
  },
  'syn request': {
    help: 'begin a structured human-governed decision request',
    run: () =>
      [
        '» syn request --type boundary_expansion --urgency medium',
        '',
        '  SYN request opened · id: syn-statuz-website-0001',
        '',
        '  · type:      boundary_expansion (should this website ship changes to the CLI?)',
        '  · evidence:  calibration drift scores, related agent manifest, git diff',
        '  · principal: ceaserzhao / Oasis Company',
        '  · options:   [accept, reject, amend]',
        '',
        '  Awaiting human resolution. Resolution will be recorded in .statuz/niche/syn/.',
        '  (Only a human decision can modify the declared niche. Calibration does not.)',
      ].join('\n'),
  },
  clear: {
    help: 'clear the terminal',
    run: () => '',
  },
};

function findCommand(raw: string): { cmd: string; args: string[]; handler: CmdHandler } | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const sorted = Object.keys(COMMANDS).sort((a, b) => b.length - a.length);
  for (const key of sorted) {
    if (trimmed === key || trimmed.startsWith(key + ' ')) {
      const rest = trimmed.slice(key.length).trim();
      return { cmd: key, args: rest ? rest.split(/\s+/) : [], handler: COMMANDS[key] };
    }
  }
  return null;
}

export default function CommandTerminal() {
  const [history, setHistory] = useState<string[]>([
    `Statuz v${siteMeta.version} — type “help” to begin.`,
    ' ',
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const run = useCallback((raw: string) => {
    const line = raw.trim();
    const next: string[] = [`$ ${line || '(empty)'} `];
    if (!line) {
      setHistory((h) => [...h, ...next]);
      return;
    }
    const match = findCommand(line);
    if (!match) {
      next.push(
        `command not found: ${line.split(/\s+/)[0]} — type “help” to see the real CLI commands.`,
      );
      setHistory((h) => [...h, ...next]);
      return;
    }
    if (match.cmd === 'clear') {
      setHistory([]);
      return;
    }
    next.push(match.handler.run(match.args));
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
          @statuz/cli v{siteMeta.version}
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
          placeholder="type a command, then press enter — try: statuz init, statuz validate, statuz resume"
        />
      </div>
    </div>
  );
}
