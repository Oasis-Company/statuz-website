import { X } from 'lucide-react';
import DesignSystemWizard from '../components/DesignSystemWizard';
import TokenInspector from '../components/TokenInspector';
import { useTheme } from '../context/ThemeContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function InspectorDrawer({
  isOpen,
  onClose,
}: Props) {
  const { config, update } = useTheme();
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-zinc-950/20 backdrop-blur-xs transition-opacity duration-300 pointer-events-auto"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md h-full bg-white shadow-2xl z-20 pointer-events-auto animate-in slide-in-from-right duration-350 ease-out overflow-y-auto">
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-zinc-100 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase block">
              Design Calibration
            </span>
            <h3 className="font-display font-bold text-zinc-900 tracking-tight text-lg">
              System Style Controls
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer"
            aria-label="Close inspector"
          >
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block">
              Interactive Design Calibration
            </span>
            <p className="text-xs text-zinc-500 font-sans leading-relaxed">
              Toggle visual parameters to witness the alignment layout system
              change in real-time.
            </p>
          </div>

          <DesignSystemWizard config={config} onChange={update} />

          <div className="border-t border-zinc-100 pt-6">
            <TokenInspector themeConfig={config} onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}
