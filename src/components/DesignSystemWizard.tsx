import { useState, type ChangeEvent } from 'react';
import type { ThemeConfig, ThemeKey } from '../types';

interface Props {
  config: ThemeConfig;
  onChange: (patch: Partial<ThemeConfig>) => void;
}

const themeOptions: { key: ThemeKey; label: string; tagline: string }[] = [
  { key: 'linear', label: 'Linear Continuity', tagline: 'Editorial lines & breathing whitespace' },
  { key: 'compact', label: 'Compact Signal', tagline: 'Dense tables, high information density' },
  { key: 'mono', label: 'Mono Protocol', tagline: 'Monospace, terminal-first, protocol view' },
];

export default function DesignSystemWizard({ config, onChange }: Props) {
  const [accent, setAccent] = useState(config.accent);
  const [radius, setRadius] = useState(config.radius);

  const handleAccent = (e: ChangeEvent<HTMLInputElement>) => {
    setAccent(e.target.value);
    onChange({ accent: e.target.value });
  };

  const handleRadius = (e: ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setRadius(v);
    onChange({ radius: v });
  };

  return (
    <div className="rounded-sm border border-zinc-200 bg-white">
      <div className="px-5 py-4 border-b border-zinc-200 flex items-center justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 font-mono">
            Design Calibration
          </div>
          <div className="font-display text-lg text-zinc-900 mt-1">
            Pick your visual contract
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-zinc-500">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" /> live-reload
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-200">
        {themeOptions.map(opt => (
          <button
            key={opt.key}
            onClick={() => onChange({ theme: opt.key })}
            className={`text-left px-5 py-4 transition-colors ${
              config.theme === opt.key
                ? 'bg-zinc-50 border-l-[3px] border-l-zinc-950'
                : 'hover:bg-zinc-50/60'
            }`}
          >
            <div className="font-display text-sm text-zinc-900">{opt.label}</div>
            <div className="text-xs text-zinc-500 mt-1">{opt.tagline}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x divide-zinc-200 border-t border-zinc-200">
        <div className="px-5 py-4">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Accent</div>
          <div className="flex items-center gap-3 mt-2">
            <input
              type="color"
              value={accent}
              onChange={handleAccent}
              className="w-10 h-10 rounded-xs border border-zinc-200 bg-transparent cursor-pointer"
            />
            <input
              type="text"
              value={accent}
              onChange={handleAccent}
              className="font-mono text-sm text-zinc-700 bg-zinc-50 px-2 py-1 rounded-xs border border-zinc-200 w-28"
            />
          </div>
        </div>

        <div className="px-5 py-4">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Radius</div>
          <div className="flex items-center gap-3 mt-2">
            <input
              type="range"
              min={0}
              max={24}
              value={radius}
              onChange={handleRadius}
              className="flex-1 accent-zinc-900"
            />
            <span className="font-mono text-sm text-zinc-700 w-10 text-right">{radius}px</span>
          </div>
        </div>

        <div className="px-5 py-4">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Density</div>
          <div className="flex items-center gap-2 mt-2">
            {(['compact', 'comfortable', 'spacious'] as const).map(d => (
              <button
                key={d}
                onClick={() => onChange({ density: d })}
                className={`text-xs px-2 py-1 rounded-xs border transition-colors font-mono ${
                  config.density === d
                    ? 'border-zinc-900 bg-zinc-900 text-white'
                    : 'border-zinc-200 text-zinc-600 hover:border-zinc-400'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
