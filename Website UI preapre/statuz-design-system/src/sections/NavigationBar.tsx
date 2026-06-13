import { useState } from 'react';
import { Github } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface Props {
  onOpenInspector: () => void;
}

export default function NavigationBar({ onOpenInspector }: Props) {
  const { config } = useTheme();
  const [copied, setCopied] = useState<boolean>(false);

  const copyInstall = (): void => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText('npm install -g @statuz/cli');
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <nav className="border-b border-zinc-150 py-4 bg-white sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="#hero" className="flex items-center gap-3 group">
            <svg
              className="w-8 h-8"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 50 H95"
                stroke="#050505"
                strokeWidth="6"
                strokeLinecap="square"
                className="line-draw"
              />
              <path
                d="M50 20 V80"
                stroke="#050505"
                strokeWidth="6"
                strokeLinecap="square"
              />
              <path
                d="M75 35 V65"
                stroke={config.highlightColor}
                strokeWidth="6"
                strokeLinecap="square"
              />
            </svg>
            <div>
              <span className="text-xl font-display font-extrabold tracking-tight text-zinc-950 block leading-none">
                Statuz
              </span>
              <span className="text-[10px] font-mono text-zinc-400 tracking-wider">
                SITUATED ALIGNMENT
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            <a
              href="#design-sandbox"
              className="hover:text-zinc-950 transition-colors"
            >
              Aesthetic Alignment
            </a>
            <a
              href="#layer-stack"
              className="hover:text-zinc-950 transition-colors"
            >
              The 5-Layer Stack
            </a>
            <a
              href="#code-playground"
              className="hover:text-zinc-950 transition-colors"
            >
              YAML Sandbox
            </a>
            <a
              href="#cli-command-block"
              className="hover:text-zinc-950 transition-colors"
            >
              CLI Toolchain
            </a>
            <a
              href="#comparison"
              className="hover:text-zinc-950 transition-colors"
            >
              Positioning Map
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Oasis-Company/statuz"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-655 hover:text-zinc-950 px-2.5 py-1.5 text-xs font-mono border border-zinc-200 hover:border-zinc-350 flex items-center gap-1.5"
            style={{ borderRadius: config.radius === 'none' ? '0' : '0.25rem' }}
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
            <span className="text-zinc-400 font-bold">
              {copied ? 'Linked' : '1.2k'}
            </span>
          </a>

          <button
            onClick={onOpenInspector}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all cursor-pointer shadow-sm hover:opacity-90"
            style={{
              backgroundColor: config.highlightColor,
              borderRadius: config.radius === 'none' ? '0' : '0.25rem',
            }}
          >
            Open Token Spec
          </button>
        </div>
      </div>
    </nav>
  );
}
