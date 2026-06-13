import React, { useState } from 'react';
import { ThemeConfig } from '../types';
import { Clipboard, Check, Eye, ToggleLeft, ArrowRight, X } from 'lucide-react';

interface Props {
  themeConfig: ThemeConfig;
  onClose: () => void;
}

export default function TokenInspector({ themeConfig, onClose }: Props) {
  const [copiedText, setCopiedText] = useState<string>('');

  const triggerCopy = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedText(val);
    setTimeout(() => setCopiedText(''), 2500);
  };

  const colors = [
    { name: 'Canvas White', hex: '#FFFFFF', desc: 'Primary backdrop space' },
    { name: 'Contrast Off-White', hex: '#F7F7F8', desc: 'Asymmetric grid panels' },
    { name: 'Brand Black', hex: '#050505', desc: 'Extreme display headings' },
    { name: 'Muted Zinc-400', hex: '#94A3B8', desc: 'Meta/arguments metrics' },
    { name: 'Selected Accent', hex: themeConfig.highlightColor, desc: 'Flow connection threads' },
  ];

  const fonts = [
    { name: 'Display Heading', family: 'Space Grotesk', weight: '700/600', scale: '2rem (3xl) to 1.125rem (lg)' },
    { name: 'Body Reading', family: 'Inter', weight: '400/500', scale: '0.875rem (sm) to 0.75rem (xs)' },
    { name: 'Diagnostics Code', family: 'JetBrains Mono', weight: '500', scale: '0.75rem (xs)' },
  ];

  const transitions = [
    { name: 'Draw Unbroken Line', code: 'stroke-dashoffset 2.5s cubic-bezier(0.25, 0.1, 0.25, 1)' },
    { name: 'Interactive Card Shift', code: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' },
    { name: 'Status Stream Tick', code: 'translate-x 0.3s ease-out' },
  ];

  return (
    <div className="bg-white border-l border-zinc-200 h-full w-full max-w-md p-6 overflow-y-auto flex flex-col justify-between shadow-2xl relative select-none">
      <div>
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-150 mb-6">
          <div>
            <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase">Inspect Canvas Variables</span>
            <h3 className="font-display font-bold text-zinc-900 tracking-tight text-lg">System Style Tokens</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        </div>

        {/* Section 1: Color Palette */}
        <div className="mb-6">
          <span className="text-xs font-mono text-zinc-400 block mb-2.5 uppercase tracking-wider">Color Tokens</span>
          <div className="space-y-2">
            {colors.map((c) => (
              <div
                key={c.hex}
                onClick={() => triggerCopy(c.hex)}
                className="flex items-center justify-between p-2 hover:bg-zinc-50 cursor-pointer border border-transparent hover:border-zinc-150 transition-all"
                style={{ borderRadius: themeConfig.radius === 'none' ? '0' : '0.25rem' }}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 border border-zinc-200/50 block shadow-sm" style={{ backgroundColor: c.hex, borderRadius: themeConfig.radius === 'none' ? '0' : '0.25rem' }} />
                  <div>
                    <p className="text-xs font-semibold text-zinc-800">{c.name}</p>
                    <p className="text-[10px] text-zinc-405 leading-none">{c.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-mono text-zinc-400">{c.hex}</span>
                  {copiedText === c.hex ? (
                    <Check className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <Clipboard className="w-3 h-3 text-zinc-300 hover:text-zinc-500 transition-colors" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Fonts System */}
        <div className="mb-6">
          <span className="text-xs font-mono text-zinc-400 block mb-2.5 uppercase tracking-wider">Typographic Grid Scale</span>
          <div className="space-y-3">
            {fonts.map((f) => (
              <div key={f.name} className="p-3 bg-zinc-50 border border-zinc-100" style={{ borderRadius: themeConfig.radius === 'none' ? '0' : '0.375rem' }}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">{f.name}</span>
                  <span className="text-[10px] font-mono text-zinc-500">{f.family}</span>
                </div>
                <p 
                  className="my-1.5 text-zinc-900 border-b border-zinc-200/40 pb-1.5"
                  style={{ 
                    fontFamily: f.family === 'Space Grotesk' ? 'Space Grotesk' : f.family === 'JetBrains Mono' ? 'JetBrains Mono' : 'Inter'
                  }}
                >
                  Continuity alignment
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                  <span>Weight: {f.weight}</span>
                  <span>Scale: {f.scale}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Motion Easing */}
        <div className="mb-6">
          <span className="text-xs font-mono text-zinc-400 block mb-2.5 uppercase tracking-wider">Line Anim Specifications</span>
          <div className="space-y-2">
            {transitions.map((t) => (
              <div 
                key={t.name}
                onClick={() => triggerCopy(t.code)}
                className="p-2 border border-zinc-100 hover:border-zinc-200 bg-white hover:bg-zinc-50 cursor-pointer block text-left"
                style={{ borderRadius: themeConfig.radius === 'none' ? '0' : '0.25rem' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-800">{t.name}</span>
                  {copiedText === t.code ? (
                    <span className="text-[10px] text-emerald-500 font-mono font-medium">Copied!</span>
                  ) : (
                    <Clipboard className="w-3 h-3 text-zinc-300 hover:text-zinc-500" />
                  )}
                </div>
                <p className="text-[10px] font-mono text-zinc-400 mt-1 overflow-x-auto whitespace-nowrap scrollbar-none select-text">
                  {t.code}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Branding of design system rules */}
      <div className="pt-4 border-t border-zinc-150">
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-450 leading-none">
          <span>SPECIFICATION TYPE: 2026</span>
          <span>COMPLIANCE LEVEL: 100%</span>
        </div>
        <p className="text-[10px] text-zinc-400 font-sans mt-2 leading-relaxed">
          The design system uses pure black lines on white spaces with asymmetrical boundaries, reflecting the continuous flow of agent memory streams.
        </p>
      </div>
    </div>
  );
}
