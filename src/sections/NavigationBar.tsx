import { useState } from 'react';

interface Props {
  onOpenInspector: () => void;
}

const NAV = [
  { label: 'The Problem', href: '#problem' },
  { label: 'Layer Stack', href: '#stack' },
  { label: 'YAML Contract', href: '#sandbox' },
  { label: 'Terminal', href: '#terminal' },
  { label: 'Comparison', href: '#compare' },
  { label: 'Principles', href: '#principles' },
  { label: 'Roadmap', href: '#roadmap' },
];

function Logo({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      style={{ color: 'currentColor' }}
    >
      <line x1="10" y1="46" x2="36" y2="42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="36" y1="42" x2="28" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="18" x2="54" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="30" r="3" fill="currentColor" />
    </svg>
  );
}

export default function NavigationBar({ onOpenInspector }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur">
      <div className="border-b hairline">
        <div className="mx-auto px-4 h-16 flex items-center justify-between" style={{ maxWidth: 1200 }}>
          <a href="#top" className="flex items-center gap-3 text-ink">
            <Logo size={28} />
            <div className="flex items-baseline gap-2">
              <span className="font-display text-lg tracking-tight">statuz</span>
              <span className="label hidden sm:inline">v 0.5.0</span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-7 text-[0.82rem] text-ink-60">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-ink transition-colors">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenInspector}
              className="hidden md:inline-flex items-center gap-2 text-[0.72rem] mono text-ink-60 hover:text-ink border hairline rounded-sm px-3 py-2 transition-colors"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-ink" />
              inspect tokens
            </button>
            <a
              href="https://github.com/statuz-protocol/statuz"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-[0.72rem] mono text-white bg-ink hover:bg-ink-80 rounded-sm px-3 py-2 transition-colors"
            >
              github ↗
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="lg:hidden w-9 h-9 flex items-center justify-center border hairline rounded-sm text-ink-60"
            >
              {open ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-b hairline bg-white">
          <div className="mx-auto px-4 py-3 flex flex-col gap-2 text-sm" style={{ maxWidth: 1200 }}>
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-1.5 text-ink-60 hover:text-ink">
                {n.label}
              </a>
            ))}
            <button onClick={() => { setOpen(false); onOpenInspector(); }} className="py-1.5 text-left text-ink-60 hover:text-ink">
              inspect tokens
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
