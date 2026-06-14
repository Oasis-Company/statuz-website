import { useState } from 'react';
import { defaultStatuzYaml } from '../data';

interface Observation {
  key: string;
  value: string;
}

function parseLightweight(src: string): Observation[] {
  const rows: Observation[] = [];
  const lines = src.split('\n').filter((l) => l.trim() && !l.trim().startsWith('#'));
  for (const raw of lines) {
    const match = raw.match(/^(\s*)([A-Za-z0-9_\-]+):\s*(.*)$/);
    if (match && match[3] && !match[3].startsWith('-') && match[1].length <= 2) {
      rows.push({ key: match[2], value: match[3] });
    }
  }
  return rows;
}

export default function YamlSandbox() {
  const [yaml, setYaml] = useState(defaultStatuzYaml);
  const [copied, setCopied] = useState(false);
  const observations = parseLightweight(yaml);

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
    <div className="border hairline rounded-sm overflow-hidden">
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-7 border-b md:border-b-0 md:border-r hairline">
          <div className="flex items-center justify-between px-6 py-3 bg-ink-05 border-b hairline">
            <span className="label">.statuz/statuz.yaml — contract</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setYaml(defaultStatuzYaml)}
                className="text-[0.7rem] mono text-ink-60 hover:text-ink border hairline rounded-sm px-2.5 py-1.5"
              >
                reset
              </button>
              <button
                onClick={copy}
                className="text-[0.7rem] mono text-white bg-ink hover:bg-ink-80 rounded-sm px-2.5 py-1.5"
              >
                {copied ? 'copied' : 'copy'}
              </button>
            </div>
          </div>
          <textarea
            value={yaml}
            onChange={(e) => setYaml(e.target.value)}
            spellCheck={false}
            className="w-full h-[32rem] mono text-[0.82rem] leading-6.5 text-ink-80 bg-white px-6 py-5 resize-none focus:outline-none"
            style={{ lineHeight: 1.85 }}
          />
        </div>

        <div className="col-span-12 md:col-span-5 flex flex-col">
          <div className="flex items-center justify-between px-6 py-3 bg-ink-05 border-b hairline">
            <span className="label">parsed observations</span>
            <span className="text-[0.7rem] mono text-ink-60">
              {observations.length} keys
            </span>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-5 mono text-[0.78rem] text-ink-80">
            {observations.length === 0 && (
              <div className="text-ink-40 italic">No top-level observables yet.</div>
            )}
            {observations.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[140px_1fr] gap-3 py-2 border-b hairline last:border-b-0"
              >
                <span className="text-ink-40">{row.key}</span>
                <span className="text-ink truncate">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
