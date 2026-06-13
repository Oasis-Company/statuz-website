import { useEffect, useState } from 'react';
import { Sparkles, Clipboard, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SimStep {
  step: string;
  title: string;
  status: string;
  desc: string;
  log: string;
  color: string;
}

const SIM_SEQUENCE: SimStep[] = [
  {
    step: '01',
    title: 'BOOTSTRAP READ',
    status: 'active',
    desc: 'Agent parses identity schema from .statuz/statuz.yaml',
    log: '● Read: crawler-alpha | Goal: "Ingest arxiv continuous alignment papers"',
    color: '#050505',
  },
  {
    step: '02',
    title: 'RUN-TIME EXECUTION',
    status: 'active',
    desc: 'Agent executes designated code synthesis parameters',
    log: '💾 Fetching PDF text blocks: arxiv:2410.1983',
    color: '#3b82f6',
  },
  {
    step: '03',
    title: 'COMMIT CHECKPOINT',
    status: 'active',
    desc: 'Saves current index state, incrementing metrics',
    log: '✔ Snapshotted checkpoint. Progress: 88/200 paper digests.',
    color: '#10b981',
  },
  {
    step: '04',
    title: 'DRIFT CALIBRATION',
    status: 'warning',
    desc: 'Monitors file alterations against allowed niche boundaries',
    log: '⚠ Calibration: Scanned edit in package.json (Forbidden block)',
    color: '#f97316',
  },
  {
    step: '05',
    title: 'SYN STRATEGIC ESCALATION',
    status: 'panic',
    desc: 'Drift detected exceeds 30% tolerance. HALTING auto-execution.',
    log: '🚨 [SYN EXCEPTION] Halted. Escalated pending manual syn authorization.',
    color: '#ef4444',
  },
];

export default function HeroSection() {
  const { config } = useTheme();
  const [simState, setSimState] = useState<number>(0);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);
  const [installedCopied, setInstalledCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setSimState((prev) => (prev + 1) % SIM_SEQUENCE.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const copyInstall = (): void => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText('npm install -g @statuz/cli');
    }
    setInstalledCopied(true);
    setTimeout(() => setInstalledCopied(false), 2000);
  };

  const active = SIM_SEQUENCE[simState];

  return (
    <section id="hero" className="mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[440px]">
        <div className="lg:col-span-7 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 border border-zinc-200 font-mono text-[10px] font-bold text-zinc-900 uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
            Active Open Standard Protocol Beta
          </span>

          <h1 className="font-display text-4xl md:text-5.5xl font-extrabold tracking-tight text-zinc-900 leading-none">
            Because Memory alone <br />
            <span className="text-zinc-400 font-light italic">
              cannot recover
            </span>{' '}
            execution.
          </h1>

          <p className="text-zinc-600 text-base md:text-lg font-sans leading-relaxed max-w-2xl">
            Memory stores the past.{' '}
            <strong className="text-zinc-900 font-medium">
              Statuz defines where your Agent stands right now.
            </strong>{' '}
            An open protocol and toolchain optimizing status recovery,
            ecological boundaries, calibration drift detection, and human
            strategic synchronization contracts.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div
              className="bg-zinc-950 text-white p-1 flex items-center justify-between border border-zinc-900"
              style={{
                borderRadius: config.radius === 'none' ? '0' : '0.375rem',
                minWidth: '280px',
              }}
            >
              <code className="text-xs font-mono pl-3 text-zinc-300 select-all">
                $ npm install -g @statuz/cli
              </code>
              <button
                onClick={copyInstall}
                className="ml-4 bg-zinc-800 hover:bg-zinc-700 p-2 text-xs font-bold transition-colors cursor-pointer"
                style={{
                  borderRadius: config.radius === 'none' ? '0' : '0.25rem',
                }}
                aria-label="Copy install command"
              >
                {installedCopied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Clipboard className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            <a
              href="#code-playground"
              className="px-5 py-3 border border-zinc-300 hover:border-zinc-950 text-sm font-semibold tracking-wide hover:bg-zinc-50 transition-all text-center"
              style={{
                borderRadius: config.radius === 'none' ? '0' : '0.375rem',
              }}
            >
              Launch Live Sandbox
            </a>
          </div>

          <div className="flex items-center gap-2 pt-2 text-xs text-zinc-400">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-300" />
            <span>
              Standardized by{' '}
              <a
                href="https://github.com/Oasis-Company"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-zinc-950"
              >
                ceaserzhao
              </a>
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-300" />
            <span>Apache 2.0 Free</span>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div
            className="border border-zinc-200 bg-white p-5 md:p-6 shadow-md relative"
            style={{
              borderRadius: config.radius === 'none' ? '0' : '0.75rem',
            }}
          >
            <div className="absolute -left-[30px] top-[140px] w-[30px] h-[2px] bg-zinc-200 hidden lg:block -z-10" />

            <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3.5 flex items-center justify-between">
              <span>UNBROKEN RUNTIME SIMULATOR</span>
              <button
                onClick={() => setAutoPlay(!autoPlay)}
                className="text-[10px] font-mono hover:text-zinc-900 border border-zinc-150 px-2 py-0.5 cursor-pointer bg-zinc-50"
              >
                {autoPlay ? '⏸ Pause Loop' : '▶ Play Auto'}
              </button>
            </h4>

            <div
              className="bg-zinc-950 text-white rounded-lg p-4 font-mono text-xs shadow-inner"
              style={{ borderLeft: `4px solid ${active.color}` }}
            >
              <div className="flex items-center justify-between pb-2.5 border-b border-zinc-800 mb-3">
                <span className="font-semibold text-zinc-300">
                  AGENT CONTRIBUTE_ENV // {active.step}
                </span>
                <span
                  className="text-[10px] px-2 py-0.5 font-bold uppercase select-none rounded-xs"
                  style={{
                    backgroundColor: `${active.color}15`,
                    color: active.color,
                    border: `1px solid ${active.color}`,
                  }}
                >
                  {active.title}
                </span>
              </div>

              <p className="text-zinc-400 mb-2 leading-relaxed">
                <strong>Process Sequence:</strong> {active.desc}
              </p>

              <div className="bg-zinc-90 w-full p-2.5 bg-zinc-900/60 rounded text-emerald-450 text-[11px] overflow-hidden truncate">
                {active.log}
              </div>
            </div>

            <div className="flex items-center justify-between mt-5 pt-4 border-t border-zinc-100">
              {SIM_SEQUENCE.map((item, idx) => (
                <button
                  key={item.step}
                  onClick={() => {
                    setSimState(idx);
                    setAutoPlay(false);
                  }}
                  className={`w-7 h-7 rounded-full border flex items-center justify-center font-mono text-xs font-bold transition-all hover:scale-110 cursor-pointer ${
                    simState === idx
                      ? 'border-zinc-900 bg-zinc-950 text-white shadow'
                      : 'border-zinc-200 bg-white text-zinc-400 hover:border-zinc-400'
                  }`}
                >
                  {item.step}
                </button>
              ))}
            </div>

            <div className="mt-4 p-3 bg-zinc-50 border border-zinc-150/60 rounded text-[11px] text-zinc-500 leading-relaxed font-sans">
              The active loop shows how Statuz handles interruptions. If step
              04 calibration reports unapproved drift, the session escalates
              automatically via SYN (step 05) preventing structural corruption.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
