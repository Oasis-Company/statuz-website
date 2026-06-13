import { useState } from 'react';

interface Props {
  onOpenInspector: () => void;
}

const NAV = [
  { label: 'Problem', href: '#problem' },
  { label: 'Layer Stack', href: '#stack' },
  { label: 'YAML Sandbox', href: '#sandbox' },
  { label: 'Terminal', href: '#terminal' },
  { label: 'Comparison', href: '#compare' },
  { label: 'Principles', href: '#principles' },
  { label: 'Roadmap', href: '#roadmap' },
];

export default function NavigationBar({ onOpenInspector }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-zinc-950" />
          <span className="font-display text-zinc-900 tracking-tight">statuz</span>
          <span className="font-mono text-[11px] text-zinc-400 hidden sm:inline">v0.5.0</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-600">
          {NAV.map(n => (
            <a key={n.href} href={n.href} className="hover:text-zinc-950 transition-colors">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenInspector}
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-mono text-zinc-600 hover:text-zinc-900 border border-zinc-200 hover:border-zinc-400 rounded-xs px-2.5 py-1.5 transition-colors"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
            inspect tokens
          </button>
          <a
            href="#sandbox"
            className="inline-flex items-center text-xs font-mono text-white bg-zinc-950 hover:bg-zinc-800 rounded-xs px-3 py-1.5 transition-colors"
          >
            try sandbox
          </a>
          <button
            onClick={() => setOpen(v => !v)}
            aria-label="Menu"
            className="md:hidden w-8 h-8 flex items-center justify-center border border-zinc-200 rounded-xs text-zinc-700"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-zinc-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-2 text-sm">
            {NAV.map(n => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-1.5 text-zinc-700 hover:text-zinc-950"
              >
                {n.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                onOpenInspector();
              }}
              className="py-1.5 text-left text-zinc-700 hover:text-zinc-950"
            >
              inspect tokens
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
