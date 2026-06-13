import { useState } from 'react';
import { Check, Info } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function TopInfoBar() {
  const [inspectorOpen, setInspectorOpen] = useState<boolean>(false);
  const { config } = useTheme();

  return (
    <div className="bg-zinc-950 text-white py-2 px-4 text-center text-xs font-mono select-none tracking-tight flex items-center justify-between relative z-40">
      <div className="flex items-center gap-1.5 leading-none">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Statuz Beta v0.5.0 Calibration Console</span>
      </div>
      <p className="hidden md:block opacity-60 text-[11px]">
        Maintainer: ceaserzhao (Oasis Company) | License: Apache-2.0
      </p>
      <button
        onClick={() => setInspectorOpen((v) => !v)}
        className="bg-zinc-800 hover:bg-zinc-700 px-2.5 py-0.5 text-[10px] uppercase font-mono tracking-wider transition-colors cursor-pointer rounded-xs inline-flex items-center gap-1"
      >
        <Info className="w-3 h-3" />
        {inspectorOpen ? 'Close' : 'Inspect'} System Variables
      </button>
      {/* Hidden flag — kept for future integration with TokenInspector drawer */}
      <span aria-hidden className="hidden">
        {config.highlightColor}
      </span>
    </div>
  );
}
