import React from 'react';
import { ThemeConfig } from '../types';
import { Sparkles, Sliders, Check, Eye, HelpCircle } from 'lucide-react';

interface Props {
  config: ThemeConfig;
  onChange: (updates: Partial<ThemeConfig>) => void;
}

export default function DesignSystemWizard({ config, onChange }: Props) {
  return (
    <div className="border border-zinc-200 bg-white p-5 md:p-6 shadow-sm relative overflow-hidden" style={{ borderRadius: config.radius === 'none' ? '0' : config.radius === 'sm' ? '0.25rem' : config.radius === 'md' ? '0.75rem' : '1.5rem' }}>
      {/* Decorative continuous line showing design intent */}
      <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: config.highlightColor }} />
      
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-zinc-100 rounded-full" style={{ color: config.highlightColor }}>
          <Sliders className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-display font-medium text-zinc-900 tracking-tight text-lg">Interactive Design Calibration</h3>
          <p className="text-xs text-zinc-500 font-sans">Toggle visual parameters to witness the alignment layout system change in real-time.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 pt-3">
        {/* Style selection */}
        <div>
          <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wider">Aesthetic Pairings</label>
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => onChange({ style: 'minimal' })}
              className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between border transition-all ${
                config.style === 'minimal'
                  ? 'bg-zinc-950 text-white border-zinc-950 font-medium'
                  : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
              }`}
              style={{ borderRadius: config.radius === 'none' ? '0' : '0.375rem' }}
            >
              <span>Editorial Swiss / Minimal</span>
              {config.style === 'minimal' && <Check className="w-4 h-4" />}
            </button>
            <button
              onClick={() => onChange({ style: 'technical' })}
              className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between border transition-all ${
                config.style === 'technical'
                  ? 'bg-zinc-950 text-white border-zinc-950 font-medium'
                  : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
              }`}
              style={{ borderRadius: config.radius === 'none' ? '0' : '0.375rem' }}
            >
              <span>Operational / Technical</span>
              {config.style === 'technical' && <Check className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Radius selection */}
        <div>
          <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wider">Border Radii</label>
          <div className="grid grid-cols-2 gap-1.5">
            {(['none', 'sm', 'md', 'full'] as const).map((r) => (
              <button
                key={r}
                onClick={() => onChange({ radius: r })}
                className={`px-3 py-1.5 text-xs border text-center capitalize transition-all ${
                  config.radius === r
                    ? 'border-zinc-950 bg-zinc-950 text-white font-medium'
                    : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400'
                }`}
                style={{ borderRadius: r === 'none' ? '0' : r === 'sm' ? '0.125rem' : r === 'md' ? '0.375rem' : '9999px' }}
              >
                {r === 'none' ? 'Pure Sharp' : r === 'sm' ? 'Corner Sm' : r === 'md' ? 'Rounded Md' : 'Capsule'}
              </button>
            ))}
          </div>
        </div>

        {/* Accent color selection */}
        <div>
          <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wider">Accent Hue</label>
          <div className="flex gap-2 items-center py-1">
            {[
              { label: 'Blackout', value: '#050505' },
              { label: 'Forest', value: '#10b981' },
              { label: 'Indigo', value: '#6366f1' },
              { label: 'Crimson', value: '#ef4444' },
              { label: 'Orange', value: '#f97316' }
            ].map((color) => (
              <button
                key={color.value}
                onClick={() => onChange({ highlightColor: color.value })}
                className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center relative cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color.value }}
                title={color.label}
              >
                {config.highlightColor === color.value && (
                  <Check className="w-4 h-4 text-white drop-shadow-sm absolute" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Grid and utility overlays */}
        <div>
          <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wider">Grid Overlay</label>
          <button
            onClick={() => onChange({ gridVisible: !config.gridVisible })}
            className={`w-full py-2 text-xs border transition-all flex items-center justify-center gap-2 ${
              config.gridVisible
                ? 'bg-zinc-100 text-zinc-900 border-zinc-900 font-medium'
                : 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400'
            }`}
            style={{ borderRadius: config.radius === 'none' ? '0' : '0.375rem' }}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{config.gridVisible ? 'System Grid Active' : 'Hide Grid lines'}</span>
          </button>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
        <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5 leading-none">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Active Context Calibration Mode: Synchronized
        </span>
        <button
          onClick={() => onChange({ style: 'minimal', radius: 'none', highlightColor: '#050505', gridVisible: false })}
          className="text-[11px] font-mono text-zinc-400 hover:text-zinc-900 underline cursor-pointer"
        >
          Reset to default (Strict Monochrome Swiss)
        </button>
      </div>
    </div>
  );
}
