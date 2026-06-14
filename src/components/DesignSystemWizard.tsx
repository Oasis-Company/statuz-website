import { useState } from 'react';

type ThemeKey = 'linear' | 'compact' | 'mono';

interface ThemeConfig {
  theme: ThemeKey;
  accent: string;
  radius: number;
}

const OPTIONS: { key: ThemeKey; label: string; tagline: string }[] = [
  { key: 'linear', label: 'Linear Continuity', tagline: 'Editorial lines & generous whitespace' },
  { key: 'compact', label: 'Compact Signal', tagline: 'Dense tables, high information density' },
  { key: 'mono', label: 'Mono Protocol', tagline: 'Monospace, terminal-first, protocol view' },
];

export default function DesignSystemWizard() {
  const [config, setConfig] = useState<ThemeConfig>({
    theme: 'linear',
    accent: '#0a0a0a',
    radius: 4,
  });

  const setTheme = (theme: ThemeKey) => setConfig((c) => ({ ...c, theme }));
  const setAccent = (accent: string) => setConfig((c) => ({ ...c, accent }));
  const setRadius = (radius: number) => setConfig((c) => ({ ...c, radius }));

  return (
    <div className="rounded-sm border hairline bg-white">
      <div className="flex items-center justify-between border-b hairline bg-ink-05 px-6 py-4">
        <div>
          <div className="label">Design Calibration</div>
          <div className="mt-2 font-display text-xl text-ink leading-tight">
            Pick your visual contract
          </div>
        </div>
        <span className="hidden md:inline-flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-ink" />
          <span className="label">live</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x hairline">
        {OPTIONS.map((opt) => {
          const active = config.theme === opt.key;
          return (
            <button
              key={opt.key}
              onClick={() => setTheme(opt.key)}
              className={`text-left px-6 py-5 transition-colors ${
                active ? 'bg-ink text-white' : 'text-ink hover:bg-ink-05'
              }`}
            >
              <div className="font-display text-base leading-tight">{opt.label}</div>
              <div className={`mt-2 text-sm ${active ? 'text-white/70' : 'text-ink-60'}`}>
                {opt.tagline}
              </div>
              <div className="mt-4 mono text-[0.7rem] uppercase tracking-wider opacity-60">
                {active ? 'current' : 'choose'}
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x hairline border-t hairline">
        <div className="px-6 py-5">
          <div className="label">Accent</div>
          <div className="mt-3 flex items-center gap-3">
            <input
              type="color"
              value={config.accent}
              onChange={(e) => setAccent(e.target.value)}
              className="w-10 h-10 rounded-sm border hairline bg-white"
            />
            <input
              type="text"
              value={config.accent}
              onChange={(e) => setAccent(e.target.value)}
              className="mono text-sm text-ink-80 bg-white border hairline rounded-sm px-3 py-1.5 w-32"
            />
          </div>
        </div>

        <div className="px-6 py-5">
          <div className="label">Radius</div>
          <div className="mt-3 flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={12}
              value={config.radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="flex-1 accent-ink"
            />
            <span className="mono text-sm text-ink w-12 text-right">{config.radius}px</span>
          </div>
        </div>

        <div className="px-6 py-5">
          <div className="label">Current Contract</div>
          <div className="mt-3 mono text-[0.8rem] text-ink-60 leading-6">
            <div>
              theme &nbsp;&nbsp;&nbsp; <span className="text-ink">{config.theme}</span>
            </div>
            <div>
              accent &nbsp;&nbsp;<span className="text-ink">{config.accent}</span>
            </div>
            <div>
              radius &nbsp;&nbsp;<span className="text-ink">{config.radius}px</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
