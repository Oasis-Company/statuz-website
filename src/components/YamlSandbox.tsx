import { useState, type ClipboardEvent } from 'react';

const defaultYaml = `protocol: statuz/v1
session:
  id: sess_8F2a...e1
  envelope: research/docs,web:read
agent:
  id: agent_ceaserzhao
  tools: [browser, files, planner]
  calibration:
    p50: 0.72
    sigma: 0.04
human:
  contract: deploy-statuz-website
  milestone: beta-v0.5.0
boundary:
  maxTurns: 200
  allowToolBleed: false
observables:
  - status
  - ecology
  - calibration
  - human
`;

interface Parsed {
  lines: { key: string; value: string }[];
  ok: boolean;
}

function parseLightweight(src: string): Parsed {
  const lines: { key: string; value: string }[] = [];
  let ok = true;
  const indentStack: { indent: number; prefix: string }[] = [{ indent: -1, prefix: '' }];
  try {
    for (const raw of src.split('\n')) {
      if (!raw.trim() || raw.trim().startsWith('#')) continue;
      const match = raw.match(/^(\s*)([A-Za-z0-9_\-]+):\s*(.*)$/);
      if (!match) {
        ok = false;
        continue;
      }
      const [, indent, key, rest] = match;
      const level = indent.length / 2;
      while (indentStack.length && indentStack[indentStack.length - 1].indent >= level) {
        indentStack.pop();
      }
      const parent = indentStack[indentStack.length - 1]?.prefix ?? '';
      const full = parent ? `${parent}.${key}` : key;
      indentStack.push({ indent: level, prefix: full });
      if (rest.trim() && !rest.trim().startsWith('[')) {
        lines.push({ key: full, value: rest.trim() });
      }
    }
  } catch {
    ok = false;
  }
  return { lines, ok };
}

export default function YamlSandbox() {
  const [yaml, setYaml] = useState(defaultYaml);
  const parsed = parseLightweight(yaml);
  const [copied, setCopied] = useState(false);

  const handlePaste = (e: ClipboardEvent<HTMLTextAreaElement>) => {
    const text = e.clipboardData.getData('text');
    if (!text) return;
    setYaml(prev => (prev.endsWith('\n') ? prev + text : prev + '\n' + text));
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(yaml);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 border border-zinc-200 rounded-sm overflow-hidden bg-white">
      <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-zinc-200">
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 bg-zinc-50">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
            statuz.yaml — contract sandbox
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setYaml(defaultYaml)}
              className="text-[11px] font-mono text-zinc-600 hover:text-zinc-900 border border-zinc-200 px-2 py-1 rounded-xs"
            >
              reset
            </button>
            <button
              onClick={copy}
              className="text-[11px] font-mono text-zinc-100 bg-zinc-900 hover:bg-zinc-800 px-2 py-1 rounded-xs"
            >
              {copied ? 'copied' : 'copy'}
            </button>
          </div>
        </div>
        <textarea
          value={yaml}
          onChange={e => setYaml(e.target.value)}
          onPaste={handlePaste}
          spellCheck={false}
          className="w-full h-[360px] font-mono text-[13px] text-zinc-800 bg-white px-4 py-3 resize-none focus:outline-none leading-6"
        />
      </div>

      <div className="lg:col-span-2 flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 bg-zinc-50">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
            parsed observables
          </div>
          <div
            className={`text-[11px] font-mono px-2 py-0.5 rounded-xs ${
              parsed.ok
                ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                : 'text-amber-700 bg-amber-50 border border-amber-200'
            }`}
          >
            {parsed.ok ? 'ok' : 'partial'}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[12px] text-zinc-700">
          {parsed.lines.length === 0 && (
            <div className="text-zinc-400 italic">No observables yet. Edit the YAML on the left.</div>
          )}
          {parsed.lines.map((line, idx) => (
            <div key={idx} className="flex gap-3 py-1 border-b border-zinc-100 last:border-b-0">
              <span className="text-zinc-500">{line.key}</span>
              <span className="text-zinc-900 truncate">{line.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
