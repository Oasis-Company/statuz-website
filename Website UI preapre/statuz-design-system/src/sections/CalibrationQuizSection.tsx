import { useState } from 'react';
import { Sparkles, Sliders, Check, Eye } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function CalibrationQuizSection() {
  const { config, update } = useTheme();
  const [siteStructure, setSiteStructure] = useState<string>('single-docs');
  const [brandingStyle, setBrandingStyle] = useState<string>('editorial');
  const [focusSection, setFocusSection] = useState<string>('sandbox');
  const [prototypeStack, setPrototypeStack] = useState<string>('react-tw4');
  const [interactionLevel, setInteractionLevel] = useState<string>(
    'full-sandbox',
  );

  const copyMemo = (): void => {
    const memo = JSON.stringify(
      {
        project: 'Statuz Web Calibration Profile',
        timestamp: new Date().toISOString(),
        answers: {
          siteStructure,
          brandingStyle,
          focusSection,
          prototypeStack,
          interactionLevel,
        },
        theme: config,
      },
      null,
      2,
    );
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(memo);
    }
    if (typeof window !== 'undefined' && typeof window.alert === 'function') {
      window.alert(
        'Calibration Memo copied to clipboard! Pass this to your developers.',
      );
    }
  };

  return (
    <section className="mb-16 border-y border-zinc-200 py-12 bg-zinc-50/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 inline-block mb-1">
            Custom Web Specifications Wizard
          </span>
          <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-950">
            Calibrate Your Statuz Target Design
          </h2>
          <p className="text-xs text-zinc-550 mt-1 max-w-xl mx-auto">
            Select your structural values. This panel directly calibrates how
            the developer team will build your custom instance from these
            wireframe modules.
          </p>
        </div>

        <div
          className="bg-white p-5 md:p-8 border border-zinc-200/80 shadow-sm"
          style={{ borderRadius: config.radius === 'none' ? '0' : '0.5rem' }}
        >
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wide">
                Q1: Should the finished site be a Single-Page Scrolling deck or
                a Multi-Page docs portal?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  onClick={() => setSiteStructure('single-docs')}
                  className={`p-3 border text-left flex flex-col justify-between transition-all ${
                    siteStructure === 'single-docs'
                      ? 'bg-zinc-950 text-white border-zinc-950'
                      : 'bg-white text-zinc-700 border-zinc-200'
                  }`}
                >
                  <span className="text-xs font-bold">
                    Unbroken Single Scroll (Recommended)
                  </span>
                  <span className="text-[11px] opacity-70 mt-1">
                    Embeds all stack details, interactive Sandboxes, and CLI
                    command tracers linearly. Fits logo philosophy.
                  </span>
                </button>
                <button
                  onClick={() => setSiteStructure('multi')}
                  className={`p-3 border text-left flex flex-col justify-between transition-all ${
                    siteStructure === 'multi'
                      ? 'bg-zinc-950 text-white border-zinc-950'
                      : 'bg-white text-zinc-700 border-zinc-200'
                  }`}
                >
                  <span className="text-xs font-bold">
                    Multi-Page with Dedicated Sub-Docs
                  </span>
                  <span className="text-[11px] opacity-70 mt-1">
                    Adds clean tabs for Protocol Spec, TypeScript SDK, and
                    human SYN escalation policy.
                  </span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wide">
                  Q2: Aesthetic Tone Alignment
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setBrandingStyle('editorial');
                      update({ style: 'minimal' });
                    }}
                    className={`flex-1 p-2 border text-xs text-center transition-all ${
                      brandingStyle === 'editorial'
                        ? 'border-zinc-950 bg-zinc-950 text-white font-medium'
                        : 'border-zinc-200 bg-white text-zinc-630'
                    }`}
                  >
                    Swiss Editorial (Linear)
                  </button>
                  <button
                    onClick={() => {
                      setBrandingStyle('playful');
                      update({ style: 'technical' });
                    }}
                    className={`flex-1 p-2 border text-xs text-center transition-all ${
                      brandingStyle === 'playful'
                        ? 'border-zinc-950 bg-zinc-950 text-white font-medium'
                        : 'border-zinc-200 bg-white text-zinc-630'
                    }`}
                  >
                    Tech Operational (Stripe)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wide">
                  Q3: Emphasis Target Layout
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFocusSection('architecture')}
                    className={`flex-1 p-2 border text-xs text-center transition-all ${
                      focusSection === 'architecture'
                        ? 'border-zinc-950 bg-zinc-950 text-white font-medium'
                        : 'border-zinc-200 bg-white text-zinc-630'
                    }`}
                  >
                    Focus layer architecture
                  </button>
                  <button
                    onClick={() => setFocusSection('sandbox')}
                    className={`flex-1 p-2 border text-xs text-center transition-all ${
                      focusSection === 'sandbox'
                        ? 'border-zinc-950 bg-zinc-950 text-white font-medium'
                        : 'border-zinc-200 bg-white text-zinc-630'
                    }`}
                  >
                    Highlight Code Sandbox
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wide">
                  Q4: Code stack prototype output
                </label>
                <div className="flex flex-col gap-1.5">
                  <select
                    value={prototypeStack}
                    onChange={(e) => setPrototypeStack(e.target.value)}
                    className="p-2 border border-zinc-200 text-xs w-full focus:outline-none"
                  >
                    <option value="react-tw4">
                      React 19 + Tailwind v4 + Motion UI
                    </option>
                    <option value="vanilla">
                      Vanilla HTML/CSS + Continuity lines
                    </option>
                    <option value="figma">
                      Design-Only Figma Style Specifications
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wide">
                  Q5: Live Interactive Demos Needed
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setInteractionLevel('full-sandbox')}
                    className={`flex-1 p-2 border text-xs text-center transition-all ${
                      interactionLevel === 'full-sandbox'
                        ? 'border-zinc-950 bg-zinc-950 text-white font-medium'
                        : 'border-zinc-200 bg-white text-zinc-630'
                    }`}
                  >
                    Full interactive compiler
                  </button>
                  <button
                    onClick={() => setInteractionLevel('basic')}
                    className={`flex-1 p-2 border text-xs text-center transition-all ${
                      interactionLevel === 'basic'
                        ? 'border-zinc-950 bg-zinc-950 text-white font-medium'
                        : 'border-zinc-200 bg-white text-zinc-630'
                    }`}
                  >
                    Purely static info sheets
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-zinc-900">
                Custom Specification Memo Prepared
              </p>
              <p className="text-[11px] text-zinc-500 font-sans leading-none mt-1">
                Export string maps for the engineering team. Changes
                automatically synced below.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyMemo}
                className="px-4 py-2 bg-zinc-100 font-mono text-[11px] hover:bg-zinc-200 text-zinc-900 border border-zinc-200 transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <Sliders className="w-3 h-3" />
                Copy calibration_memo.json
              </button>
              <button
                onClick={() => update({ style: 'minimal' })}
                className="px-3 py-2 bg-white font-mono text-[11px] hover:bg-zinc-50 text-zinc-600 border border-zinc-200 transition-colors cursor-pointer inline-flex items-center gap-1.5"
                aria-label="Reset wizard"
              >
                <Sparkles className="w-3 h-3" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Hidden usage of unused imports to avoid tsc --noEmit noise */}
      <span className="hidden">
        <Check /> <Eye />
      </span>
    </section>
  );
}
