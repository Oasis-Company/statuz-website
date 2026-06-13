import React, { useState, useEffect } from 'react';
import { ThemeConfig } from './types';
import { 
  Terminal, Sliders, Sparkles, Layers, Compass, ChevronRight, 
  Clipboard, Check, Info, ExternalLink, HelpCircle, RefreshCw, 
  FileText, X, Lock, Plus, Menu, BookOpen, Users, Flag, Zap,
  CheckCircle2, ArrowRight, Github, ShieldAlert, Heart
} from 'lucide-react';
import DesignSystemWizard from './components/DesignSystemWizard';
import LayerExplorer from './components/LayerExplorer';
import YamlSandbox from './components/YamlSandbox';
import CommandTerminal from './components/CommandTerminal';
import TokenInspector from './components/TokenInspector';

export default function App() {
  // Theme Configuration State
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
    style: 'minimal',
    radius: 'none',
    highlightColor: '#050505',
    gridVisible: false,
  });

  // State for the Inspector Drawer
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(false);

  // Calibration Quiz Answers (direct answers to instructions requirements)
  const [quizAnswers, setQuizAnswers] = useState({
    siteStructure: 'single-docs', // 'single-docs' | 'multi'
    brandingStyle: 'editorial', // 'editorial' | 'playful'
    focusSection: 'sandbox', // 'architecture' | 'sandbox' | 'cli'
    prototypeStack: 'react-tw4', // 'react-tw4' | 'figma' | 'vanilla'
    interactionLevel: 'full-sandbox' // 'full-sandbox' | 'basic'
  });

  // Active documentation tab (used if siteStructure is single-docs/multi)
  const [activeTab, setActiveTab] = useState<'home' | 'spec' | 'sdk' | 'governance'>('home');

  // Copy success indicator
  const [installedCopied, setInstalledCopied] = useState<boolean>(false);

  // Agent Simulation Core state
  const [simState, setSimState] = useState<number>(0);
  const [simAutoPlay, setSimAutoPlay] = useState<boolean>(true);

  // Simulated agent sequence
  const simSequence = [
    {
      step: '01',
      title: 'BOOTSTRAP READ',
      status: 'active',
      desc: 'Agent parses identity schema from .statuz/statuz.yaml',
      log: '● Read: crawler-alpha | Goal: "Ingest arxiv continuous alignment papers"',
      color: '#050505'
    },
    {
      step: '02',
      title: 'RUN-TIME EXECUTION',
      status: 'active',
      desc: 'Agent executes designated code synthesis parameters',
      log: '💾 Fetching PDF text blocks: arxiv:2410.1983',
      color: '#3b82f6'
    },
    {
      step: '03',
      title: 'COMMIT CHECKPOINT',
      status: 'active',
      desc: 'Saves current index state, incrementing metrics',
      log: '✔ Snapshotted checkpoint. Progress: 88/200 paper digests.',
      color: '#10b981'
    },
    {
      step: '04',
      title: 'DRIFT CALIBRATION',
      status: 'warning',
      desc: 'Monitors file alterations against allowed niche boundaries',
      log: '⚠ Calibration: Scanned edit in package.json (Forbidden block)',
      color: '#f97316'
    },
    {
      step: '05',
      title: 'SYN STRATEGIC ESCALATION',
      status: 'panic',
      desc: 'Drift detected exceeds 30% tolerance. HALTING auto-execution.',
      log: '🚨 [SYN EXCEPTION] Halted. Escalated pending manual syn authorization.',
      color: '#ef4444'
    }
  ];

  // Auto Tick agent sequence timer
  useEffect(() => {
    if (!simAutoPlay) return;
    const interval = setInterval(() => {
      setSimState((prev) => (prev + 1) % simSequence.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [simAutoPlay]);

  const copyInstallCommand = () => {
    navigator.clipboard.writeText('npm install -g @statuz/cli');
    setInstalledCopied(true);
    setTimeout(() => setInstalledCopied(false), 2000);
  };

  const handleConfigChange = (updates: Partial<ThemeConfig>) => {
    setThemeConfig((prev) => ({ ...prev, ...updates }));
  };

  const activeSeq = simSequence[simState];

  return (
    <div className="bg-white min-h-screen relative font-sans text-zinc-800 antialiased selection:bg-zinc-950 selection:text-white pb-16 overflow-x-hidden">
      
      {/* 1. Golden ratio grid lines overlay (Toggleable via DesignSystemWizard) */}
      {themeConfig.gridVisible && (
        <div className="fixed inset-0 grid grid-cols-12 gap-4 md:gap-8 max-w-7xl mx-auto pointer-events-none z-50 px-4">
          {[...Array(13)].map((_, i) => (
            <div key={i} className="h-full border-l border-dashed border-red-500/8 opacity-[0.14]" />
          ))}
        </div>
      )}

      {/* Modern floating top info-line */}
      <div className="bg-zinc-950 text-white py-2 px-4 text-center text-xs font-mono select-none tracking-tight flex items-center justify-between relative z-40">
        <div className="flex items-center gap-1.5 leading-none">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Statuz Beta v0.5.0 Calibration Console</span>
        </div>
        <p className="hidden md:block opacity-60 text-[11px]">
          Maintainer: ceaserzhao (Oasis Company) | License: Apache-2.0
        </p>
        <button 
          onClick={() => setIsInspectorOpen(true)}
          className="bg-zinc-800 hover:bg-zinc-700 px-2.5 py-0.5 text-[10px] uppercase font-mono tracking-wider transition-colors cursor-pointer rounded-xs"
        >
          Inspect System Variables
        </button>
      </div>

      {/* NAVIGATION BAR - Swiss asymmetry design */}
      <nav className="border-b border-zinc-150 py-4 bg-white sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo continuous line design */}
            <a href="#hero" className="flex items-center gap-3 group">
              <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Horizontal uninterrupted base line representing continuity */}
                <path d="M5 50 H95" stroke="#050505" strokeWidth="6" strokeLinecap="square" className="line-draw" />
                {/* Asymmetric step-trigger node */}
                <path d="M50 20 V80" stroke="#050505" strokeWidth="6" strokeLinecap="square" />
                <path d="M75 35 V65" stroke={themeConfig.highlightColor} strokeWidth="6" strokeLinecap="square" />
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

            {/* Nav menu links */}
            <div className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              <a href="#design-sandbox" className="hover:text-zinc-950 transition-colors">Aesthetic Alignment</a>
              <a href="#layer-stack" className="hover:text-zinc-950 transition-colors">The 5-Layer Stack</a>
              <a href="#code-playground" className="hover:text-zinc-950 transition-colors">YAML Sandbox</a>
              <a href="#cli-command-block" className="hover:text-zinc-950 transition-colors">CLI Toolchain</a>
              <a href="#comparison" className="hover:text-zinc-950 transition-colors">Positioning Map</a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/statuz-protocol/statuz" 
              target="_blank" 
              rel="noreferrer"
              className="text-zinc-655 hover:text-zinc-950 px-2.5 py-1.5 text-xs font-mono border border-zinc-200 hover:border-zinc-350 flex items-center gap-1.5"
              style={{ borderRadius: themeConfig.radius === 'none' ? '0' : '0.25rem' }}
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
              <span className="text-zinc-400 font-bold">1.2k</span>
            </a>
            
            <button
              onClick={() => setIsInspectorOpen(true)}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all cursor-pointer shadow-sm hover:opacity-90"
              style={{ 
                backgroundColor: themeConfig.highlightColor,
                borderRadius: themeConfig.radius === 'none' ? '0' : '0.25rem'
              }}
            >
              Open Token Spec
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 mt-8 md:mt-12">
        
        {/* DESIGN CALIBRATION SHIFT CONTROLLER */}
        <section id="design-sandbox" className="mb-12">
          <DesignSystemWizard config={themeConfig} onChange={handleConfigChange} />
        </section>

        {/* HERO SECTION */}
        <section id="hero" className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[440px]">
            {/* Hero Left Column Text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 border border-zinc-200 font-mono text-[10px] font-bold text-zinc-900 uppercase tracking-widest">
                <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
                Active Open Standard Protocol Beta
              </span>
              
              <h1 className="font-display text-4xl md:text-5.5xl font-extrabold tracking-tight text-zinc-900 leading-none">
                Because Memory alone <br />
                <span className="text-zinc-400 font-light italic">cannot recover</span> execution.
              </h1>
              
              <p className="text-zinc-600 text-base md:text-lg font-sans leading-relaxed max-w-2xl">
                Memory stores the past. <strong className="text-zinc-900 font-medium">Statuz defines where your Agent stands right now.</strong> An open protocol and toolchain optimizing status recovery, ecological boundaries, calibration drift detection, and human strategic synchronization contracts.
              </p>

              {/* Install and Action block */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div 
                  className="bg-zinc-950 text-white p-1 flex items-center justify-between border border-zinc-900"
                  style={{ 
                    borderRadius: themeConfig.radius === 'none' ? '0' : '0.375rem',
                    minWidth: '280px'
                  }}
                >
                  <code className="text-xs font-mono pl-3 text-zinc-300 select-all">$ npm install -g @statuz/cli</code>
                  <button 
                    onClick={copyInstallCommand}
                    className="ml-4 bg-zinc-800 hover:bg-zinc-700 p-2 text-xs font-bold transition-colors cursor-pointer"
                    style={{ borderRadius: themeConfig.radius === 'none' ? '0' : '0.25rem' }}
                  >
                    {installedCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Clipboard className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <a 
                  href="#code-playground" 
                  className="px-5 py-3 border border-zinc-300 hover:border-zinc-950 text-sm font-semibold tracking-wide hover:bg-zinc-50 transition-all text-center"
                  style={{ borderRadius: themeConfig.radius === 'none' ? '0' : '0.375rem' }}
                >
                  Launch Live Sandbox
                </a>
              </div>

              {/* Author badge */}
              <div className="flex items-center gap-2 pt-2 text-xs text-zinc-400">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-300" />
                <span>Standardized by <a href="https://github.com/statuz-protocol" target="_blank" rel="noreferrer" className="underline hover:text-zinc-950">ceaserzhao</a></span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-300" />
                <span>Apache 2.0 Free</span>
              </div>
            </div>

            {/* Hero Right Column Interactive Preview Screen */}
            <div className="lg:col-span-5">
              <div 
                className="border border-zinc-200 bg-white p-5 md:p-6 shadow-md relative"
                style={{ borderRadius: themeConfig.radius === 'none' ? '0' : '0.75rem' }}
              >
                {/* Visual Connection line showing continuous execution metaphor */}
                <div className="absolute -left-[30px] top-[140px] w-[30px] h-[2px] bg-zinc-200 hidden lg:block -z-10" />
                
                <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3.5 flex items-center justify-between">
                  <span>UNBROKEN RUNTIME SIMULATOR</span>
                  <button 
                    onClick={() => setSimAutoPlay(!simAutoPlay)}
                    className="text-[10px] font-mono hover:text-zinc-900 border border-zinc-150 px-2 py-0.5 cursor-pointer bg-zinc-50"
                  >
                    {simAutoPlay ? '⏸ Pause Loop' : '▶ Play Auto'}
                  </button>
                </h4>

                {/* Simulated Agent Container box */}
                <div 
                  className="bg-zinc-950 text-white rounded-lg p-4 font-mono text-xs shadow-inner"
                  style={{ borderLeft: `4px solid ${activeSeq.color}` }}
                >
                  <div className="flex items-center justify-between pb-2.5 border-b border-zinc-800 mb-3">
                    <span className="font-semibold text-zinc-300">AGENT CONTRIBUTE_ENV // {activeSeq.step}</span>
                    <span 
                      className="text-[10px] px-2 py-0.5 font-bold uppercase select-none rounded-xs"
                      style={{ 
                        backgroundColor: `${activeSeq.color}15`, 
                        color: activeSeq.color,
                        border: `1px solid ${activeSeq.color}` 
                      }}
                    >
                      {activeSeq.title}
                    </span>
                  </div>

                  <p className="text-zinc-400 mb-2 leading-relaxed">
                    <strong>Process Sequence:</strong> {activeSeq.desc}
                  </p>

                  <div className="bg-zinc-90 w-full p-2.5 bg-zinc-900/60 rounded text-emerald-450 text-[11px] overflow-hidden truncate">
                    {activeSeq.log}
                  </div>
                </div>

                {/* Steps indicator nodes */}
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-zinc-100">
                  {simSequence.map((item, idx) => (
                    <button
                      key={item.step}
                      onClick={() => {
                        setSimState(idx);
                        setSimAutoPlay(false);
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

                {/* Explain the metaphor */}
                <div className="mt-4 p-3 bg-zinc-50 border border-zinc-150/60 rounded text-[11px] text-zinc-500 leading-relaxed font-sans">
                  The active loop shows how Statuz handles interruptions. If step 04 calibration reports unapproved drift, the session escalates automatically via SYN (step 05) preventing structural corruption.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CALIBRATION QUIZ BLOCK - direct UI response to critical design questions */}
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
                Select your structural values. This panel directly calibrates how the developer team will build your custom instance from these wireframe modules.
              </p>
            </div>

            <div className="bg-white p-5 md:p-8 border border-zinc-200/80 shadow-sm" style={{ borderRadius: themeConfig.radius === 'none' ? '0' : '0.5rem' }}>
              <div className="space-y-6">
                
                {/* Quiz Question 1 */}
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wide">
                    Q1: Should the finished site be a Single-Page Scrolling deck or a Multi-Page docs portal?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button 
                      onClick={() => setQuizAnswers(prev => ({...prev, siteStructure: 'single-docs'}))}
                      className={`p-3 border text-left flex flex-col justify-between transition-all ${
                        quizAnswers.siteStructure === 'single-docs'
                          ? 'bg-zinc-950 text-white border-zinc-950'
                          : 'bg-white text-zinc-700 border-zinc-200'
                      }`}
                    >
                      <span className="text-xs font-bold">Unbroken Single Scroll (Recommended)</span>
                      <span className="text-[11px] opacity-70 mt-1">Embeds all stack details, interactive Sandboxes, and CLI command tracers linearly. Fits logo philosophy.</span>
                    </button>
                    <button 
                      onClick={() => setQuizAnswers(prev => ({...prev, siteStructure: 'multi'}))}
                      className={`p-3 border text-left flex flex-col justify-between transition-all ${
                        quizAnswers.siteStructure === 'multi'
                          ? 'bg-zinc-950 text-white border-zinc-950'
                          : 'bg-white text-zinc-700 border-zinc-200'
                      }`}
                    >
                      <span className="text-xs font-bold">Multi-Page with Dedicated Sub-Docs</span>
                      <span className="text-[11px] opacity-70 mt-1">Adds clean tabs for Protocol Spec, TypeScript SDK, and human SYN escalation policy.</span>
                    </button>
                  </div>
                </div>

                {/* Quiz Question 2 & 3 in a grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Q2 */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wide">
                      Q2: Aesthetic Tone Alignment
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setQuizAnswers(prev => ({...prev, brandingStyle: 'editorial'}));
                          handleConfigChange({ style: 'minimal' });
                        }}
                        className={`flex-1 p-2 border text-xs text-center transition-all ${
                          quizAnswers.brandingStyle === 'editorial' ? 'border-zinc-950 bg-zinc-950 text-white font-medium' : 'border-zinc-200 bg-white text-zinc-630'
                        }`}
                      >
                        Swiss Editorial (Linear)
                      </button>
                      <button
                        onClick={() => {
                          setQuizAnswers(prev => ({...prev, brandingStyle: 'playful'}));
                          handleConfigChange({ style: 'technical' });
                        }}
                        className={`flex-1 p-2 border text-xs text-center transition-all ${
                          quizAnswers.brandingStyle === 'playful' ? 'border-zinc-950 bg-zinc-950 text-white font-medium' : 'border-zinc-200 bg-white text-zinc-630'
                        }`}
                      >
                        Tech Operational (Stripe)
                      </button>
                    </div>
                  </div>

                  {/* Q3 */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wide">
                      Q3: Emphasis Target Layout
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setQuizAnswers(prev => ({...prev, focusSection: 'architecture'}))}
                        className={`flex-1 p-2 border text-xs text-center transition-all ${
                          quizAnswers.focusSection === 'architecture' ? 'border-zinc-950 bg-zinc-950 text-white font-medium' : 'border-zinc-200 bg-white text-zinc-630'
                        }`}
                      >
                        Focus layer architecture
                      </button>
                      <button
                        onClick={() => setQuizAnswers(prev => ({...prev, focusSection: 'sandbox'}))}
                        className={`flex-1 p-2 border text-xs text-center transition-all ${
                          quizAnswers.focusSection === 'sandbox' ? 'border-zinc-950 bg-zinc-950 text-white font-medium' : 'border-zinc-200 bg-white text-zinc-630'
                        }`}
                      >
                        Highlight Code Sandbox
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quiz Question 4 & 5 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Q4 */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wide">
                      Q4: Code stack prototype output
                    </label>
                    <div className="flex flex-col gap-1.5">
                      <select 
                        value={quizAnswers.prototypeStack} 
                        onChange={(e) => setQuizAnswers(prev => ({...prev, prototypeStack: e.target.value}))}
                        className="p-2 border border-zinc-200 text-xs w-full focus:outline-none"
                      >
                        <option value="react-tw4">React 19 + Tailwind v4 + Motion UI</option>
                        <option value="vanilla">Vanilla HTML/CSS + Continuity lines</option>
                        <option value="figma">Design-Only Figma Style Specifications</option>
                      </select>
                    </div>
                  </div>

                  {/* Q5 */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wide">
                      Q5: Live Interactive Demos Needed
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setQuizAnswers(prev => ({...prev, interactionLevel: 'full-sandbox'}))}
                        className={`flex-1 p-2 border text-xs text-center transition-all ${
                          quizAnswers.interactionLevel === 'full-sandbox' ? 'border-zinc-950 bg-zinc-950 text-white font-medium' : 'border-zinc-200 bg-white text-zinc-630'
                        }`}
                      >
                        Full interactive compiler
                      </button>
                      <button
                        onClick={() => setQuizAnswers(prev => ({...prev, interactionLevel: 'basic'}))}
                        className={`flex-1 p-2 border text-xs text-center transition-all ${
                          quizAnswers.interactionLevel === 'basic' ? 'border-zinc-950 bg-zinc-950 text-white font-medium' : 'border-zinc-200 bg-white text-zinc-630'
                        }`}
                      >
                        Purely static info sheets
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Quiz Footer - Export Memo block */}
              <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-zinc-900">Custom Specification Memo Prepared</p>
                  <p className="text-[11px] text-zinc-500 font-sans leading-none mt-1">
                    Export string maps for the engineering team. Changes automatically synced below.
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const memo = JSON.stringify({
                        project: "Statuz Web Calibration Profile",
                        timestamp: new Date().toISOString(),
                        answers: quizAnswers,
                        theme: themeConfig
                      }, null, 2);
                      navigator.clipboard.writeText(memo);
                      alert('Calibration Memo copied to clipboard! You can pass this to your developers to instantiate the layout.');
                    }}
                    className="px-4 py-2 bg-zinc-100 font-mono text-[11px] hover:bg-zinc-200 text-zinc-900 border border-zinc-200 transition-colors cursor-pointer"
                  >
                    Copy calibration_memo.json
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NARRATIVE SECTION 1: THE CORE PROBLEM (State Recovery) */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-950 text-zinc-100 p-8 md:p-12 rounded-2xl relative overflow-hidden">
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-r from-transparent to-zinc-700" />
            <div className="absolute bottom-0 left-0 w-24 h-[1px] bg-gradient-to-r from-zinc-700 to-transparent" />

            <div className="lg:col-span-6 space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-[#ef4444] uppercase font-bold block">
                The Fragmentation Threat
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-none">
                AI Agents are ecologically blind after context resets.
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                Every time your LLM agent restarts, receives a new API routing request, or experiences a task handoff, it suffers a complete cold amnesia. Typical memory systems try to dump thousands of dry vector embedding history tokens back into context—polluting context windows, bloating billing APIs, and slowing runtime parameters down.
              </p>
              
              <div className="space-y-2 pt-2">
                <div className="flex items-start gap-2.5 text-xs">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ef4444] mt-1.5" />
                  <p className="text-zinc-300"><strong>Session Fragmentation:</strong> Fast failures picking up active state pipelines.</p>
                </div>
                <div className="flex items-start gap-2.5 text-xs">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ef4444] mt-1.5" />
                  <p className="text-zinc-300"><strong>Ecological Blindness:</strong> Agents cannot locate downstream or upstream boundaries.</p>
                </div>
                <div className="flex items-start gap-2.5 text-xs">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ef4444] mt-1.5" />
                  <p className="text-zinc-300"><strong>Strategic Drift:</strong> Inability to evaluate if an action violates guidelines until too late.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 border border-zinc-800 bg-zinc-900 p-5 rounded-xl font-mono text-[11px] space-y-4 shadow-2xl">
              <span className="text-zinc-500 uppercase font-bold text-[10px] tracking-wider block border-b border-zinc-800 pb-2">
                Memory system vs. Statuz Alignment State
              </span>

              {/* Memory block */}
              <div>
                <div className="flex items-center justify-between text-zinc-400 mb-1.5">
                  <span className="text-red-400">$ Typical Memory Dump (Unhandles State)</span>
                  <span>12,000 Tokens Bloat</span>
                </div>
                <div className="bg-zinc-950 p-3 rounded text-zinc-500 max-h-[85px] overflow-hidden truncate whitespace-pre-line text-left leading-relaxed">
                  ... USER: "What are you doing again?"
                  ASSISTANT (vector retrieval): "Based on 47 previous session logs, you queried about CSS styling trends in 2024. Then you initiated an Express router debug. Let me list the entire transaction stack..."
                </div>
              </div>

              {/* Statuz block */}
              <div>
                <div className="flex items-center justify-between text-zinc-400 mb-1.5">
                  <span className="text-emerald-400">$ Statuz State Recovery (.statuz/statuz.yaml)</span>
                  <span>142 Words (Minimal)</span>
                </div>
                <div className="bg-zinc-950 p-3 rounded text-zinc-100 border border-emerald-900/40 text-left select-all">
                  <span className="text-zinc-550 italic"># sub-millisecond recover loop</span><br />
                  identity: "helper-04"<br />
                  goal: "Migrate styling from custom CSS to Tailwind v4 utilities"<br />
                  progress: &#123; completed_files: 14, current_target: "src/components/Navigation.tsx" &#125;<br />
                  next_action: "Parse src/components/Navigation.tsx for inline classes"
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NARRATIVE SECTION 2: THE 5-LAYER STACK ARCHITECTURE */}
        <section id="layer-stack" className="mb-16">
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 inline-block mb-1">
              Architecture Blueprint
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-950 leading-none">
              Hierarchical Alignment Framework
            </h2>
            <p className="text-zinc-500 mt-2 text-sm max-w-xl mx-auto">
              Statuz parses operational bounds across 5 layered abstractions. From instant session checkpoint variables to ecological niche governance parameters.
            </p>
          </div>

          <LayerExplorer themeConfig={themeConfig} />
        </section>

        {/* NARRATIVE SECTION 3: THE COMPILATION CODE SANDBOX */}
        <section id="code-playground" className="mb-16">
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 inline-block mb-1">
              Interactive Test Chamber
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-950 leading-none">
              The Live Spec Playground
            </h2>
            <p className="text-zinc-500 mt-2 text-sm max-w-xl mx-auto">
              Inspect and override actual `.statuz` files. Observe how the drift vectors change as you tweak simulated constraints.
            </p>
          </div>

          <YamlSandbox themeConfig={themeConfig} />
        </section>

        {/* NARRATIVE SECTION 4: CLI sandbox operations */}
        <section id="cli-command-block" className="mb-16">
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 inline-block mb-1">
              Developer Workflow Toolchain
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 leading-none">
              The Statuz Command CLI
            </h2>
            <p className="text-zinc-500 mt-2 text-sm max-w-xl mx-auto">
              Simple system integration boundaries. Execute core commands or read MCP diagnostic states within standard terminal prompts.
            </p>
          </div>

          <CommandTerminal themeConfig={themeConfig} />
        </section>

        {/* COMPETITIVE MATRIX GRID */}
        <section id="comparison" className="mb-16">
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 inline-block mb-1">
              Ecosystem Positioning
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-950 leading-none">
              Where Statuz Fits
            </h2>
            <p className="text-zinc-550 mt-2 text-sm max-w-lg mx-auto">
              Statuz does not replace your team's tools. It fills the diagnostic gap to guarantee autonomous safe execution thresholds.
            </p>
          </div>

          <div className="overflow-x-auto border border-zinc-200">
            <table className="w-full text-left text-xs md:text-sm font-sans border-collapse select-none">
              <thead>
                <tr className="bg-zinc-50 text-zinc-500 border-b border-zinc-200 font-mono text-[11px] uppercase tracking-wider">
                  <th className="p-4 md:p-5 font-semibold">Technical Feature Matrix</th>
                  <th className="p-4 md:p-5 font-semibold">Memory Systems</th>
                  <th className="p-4 md:p-5 font-semibold">MCP Servers</th>
                  <th className="p-4 md:p-5 font-semibold">GitHub PM (Linear)</th>
                  <th className="p-4 md:p-5 font-semibold bg-zinc-950 text-white border-x border-zinc-950 text-center">Statuz Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-150">
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-zinc-900">Current Task Recovery</td>
                  <td className="p-4 md:p-5 text-zinc-500">Slow (unstructured retrieval query)</td>
                  <td className="p-4 md:p-5 text-zinc-500">No (it is a transport link)</td>
                  <td className="p-4 md:p-5 text-zinc-500">Manual (Tickets/Issues)</td>
                  <td className="p-4 md:p-5 font-semibold text-zinc-950 bg-zinc-50/55 border-x border-zinc-150 text-center">Sub-millisecond (.statuz)</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-zinc-900 font-medium">Ecological Boundary Declars</td>
                  <td className="p-4 md:p-5 text-zinc-500">None</td>
                  <td className="p-4 md:p-5 text-zinc-500">None</td>
                  <td className="p-4 md:p-5 text-zinc-500">Coarse description limits</td>
                  <td className="p-4 md:p-5 font-semibold text-zinc-950 bg-zinc-50/55 border-x border-zinc-150 text-center">Strict YAML boundaries</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-zinc-900">Drift & Calibration Audit</td>
                  <td className="p-4 md:p-5 text-zinc-500">No (uncontrolled generation)</td>
                  <td className="p-4 md:p-5 text-zinc-500">No</td>
                  <td className="p-4 md:p-5 text-zinc-500">Manual backlog reviews</td>
                  <td className="p-4 md:p-5 font-semibold text-zinc-950 bg-zinc-50/55 border-x border-zinc-150 text-center">Real-Time Drift metrics</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-zinc-900">Human SYN Escalations</td>
                  <td className="p-4 md:p-5 text-zinc-500">None</td>
                  <td className="p-4 md:p-5 text-zinc-500">None</td>
                  <td className="p-4 md:p-5 text-zinc-500">Manual pull requests</td>
                  <td className="p-4 md:p-5 font-semibold text-zinc-950 bg-zinc-50/55 border-x border-zinc-150 text-center">Structured SYN Governance</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-zinc-900">Core Architecture Model</td>
                  <td className="p-4 md:p-5 text-zinc-500">Unstructured Vector Logs</td>
                  <td className="p-4 md:p-5 text-zinc-500">JSON-RPC Transport API</td>
                  <td className="p-4 md:p-5 text-zinc-550">Web Kanban UI Boards</td>
                  <td className="p-4 md:p-5 font-bold text-zinc-100 bg-zinc-950 border-x border-zinc-950 text-center">Layered YAML Declarables</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* STATUZ PRINCIPLES & MANIFESTO */}
        <section className="mb-16 border-t border-zinc-200 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left column */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">The Manifesto Principles</span>
              <h3 className="font-display text-2.5xl font-extrabold tracking-tight text-zinc-950 mt-1">
                The 9 Laws of Situated Alignment
              </h3>
              <p className="text-xs text-zinc-500 mt-2 font-sans leading-relaxed">
                Statuz is guided by architectural constraints designed to prevent scope-creep. We value structure before interfaces and minimal disclosures.
              </p>
            </div>

            {/* Right column bento grid */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { num: '01', title: 'Runtime First', desc: 'Everything must strengthen state evaluation for quick session pick-ups.' },
                { num: '02', title: 'Discovery First', desc: 'AI agent discovers ecological relations, but humans explicitly confirm status.' },
                { num: '03', title: 'State Before Automation', desc: 'The agent must parse its location boundaries before executing any code changes.' },
                { num: '04', title: 'Structure Before Interface', desc: 'Topology mappings and YAML schema semantics are 10x more important than visual diagram dashboards.' },
                { num: '05', title: 'Compression Over Collection', desc: 'Reduce state values to strict metrics, rather than accumulating bloated chats.' },
                { num: '06', title: 'Understanding Over Visualization', desc: 'A beautiful relation graph is useless if it produces no functional alignment.' },
                { num: '07', title: 'Small Enough to Survive', desc: 'Config blocks must remain small enough to be loaded instantly at prompt start.' },
                { num: '08', title: 'Declaration ≠ Authority', desc: 'Observed agent behavior does not grant automatic authorization. Only SYN overrides are valid.' },
                { num: '09', title: 'Minimal Disclosure', desc: 'Every telemetry profile contains only the minimum information necessary to execute alignment.' }
              ].map((princ) => (
                <div 
                  key={princ.num} 
                  className="bg-white border border-zinc-200/80 p-5 group hover:border-zinc-950 transition-all text-left"
                  style={{ borderRadius: themeConfig.radius === 'none' ? '0' : '0.375rem' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-zinc-400 group-hover:text-zinc-900 transition-colors font-bold">{princ.num}</span>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-200 group-hover:bg-zinc-950 transition-colors" />
                  </div>
                  <h4 className="font-display font-bold text-sm text-zinc-950 tracking-tight">{princ.title}</h4>
                  <p className="text-xs text-zinc-600 mt-1 font-sans leading-relaxed">{princ.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ROADMAP / SPEC STEPS */}
        <section className="mb-12 bg-zinc-50 border border-zinc-150 p-6 md:p-8 rounded-xl text-center">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">
            STATUZ DEVELOPMENT FLOW
          </span>
          <h3 className="font-display text-xl font-bold tracking-tight text-zinc-950">
            Roadmap to Protocol v1.0
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 mb-5 text-left max-w-4xl mx-auto text-xs">
            <div className="space-y-1">
              <span className="text-zinc-400 font-mono text-[10px] uppercase font-bold block">Phase 01-03 // Done</span>
              <h4 className="font-bold text-zinc-950">Drafting & Initial SDK</h4>
              <p className="text-zinc-500 font-sans">Drafted seed protocol specifications, completed TypeScript SDK and core Commander.js CLI engine wrappers.</p>
            </div>
            <div className="space-y-1 border-l border-zinc-200 pl-4">
              <span className="text-zinc-400 font-mono text-[10px] uppercase font-bold block">Phase 04-05 // Current</span>
              <h4 className="font-bold text-zinc-950">IDE Integrations</h4>
              <p className="text-zinc-500 font-sans">VS Code diagnostics integration, status bar alerts, syn decision WebView panels, and NPM release deployment.</p>
            </div>
            <div className="space-y-1 border-l border-zinc-200 pl-4 text-zinc-500">
              <span className="text-zinc-400 font-mono text-[10px] uppercase block">Phase 06-09 // Active</span>
              <h4 className="font-bold text-zinc-700">Niche Object set</h4>
              <p className="font-sans">Implementing automated niche discovery controllers, Arrow topologies, and decentralized signal buses.</p>
            </div>
            <div className="space-y-1 border-l border-zinc-200 pl-4 text-zinc-500">
              <span className="text-zinc-400 font-mono text-[10px] uppercase block">Phase 1.0 // Future</span>
              <h4 className="font-bold text-zinc-700">Consolidated Spec Node</h4>
              <p className="font-sans">Freeze core schema constructs. Open decentralization coordination pools to third-party integrations.</p>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-150 mt-16 pt-8 bg-zinc-50/50">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="text-zinc-950 font-display font-extrabold tracking-tight">Statuz</span>
              <span>© 2026 Oasis Company. All rights reserved.</span>
            </div>
            <div className="flex gap-4 uppercase font-mono text-[10px] mt-2 md:mt-0 tracking-wider">
              <a href="https://github.com/statuz-protocol/statuz/blob/main/LICENSE" target="_blank" rel="noreferrer" className="hover:text-zinc-900 transition-colors">Apache 2.0 License</a>
              <a href="https://github.com/statuz-protocol/statuz/blob/main/SPEC.md" target="_blank" rel="noreferrer" className="hover:text-zinc-900 transition-colors">Protocol Spec Document</a>
              <a href="https://github.com/statuz-protocol/statuz" target="_blank" rel="noreferrer" className="hover:text-zinc-900 transition-colors">Source Code Repo</a>
            </div>
          </div>

          <p className="text-[10px] text-zinc-400 max-w-2xl mx-auto font-sans leading-relaxed">
            Statuz is an independent open protocol initiated by ceaserzhao (@zbbsdsb). Every component rendered above is a high-fidelity design specification representation managed locally by our active developer core.
          </p>

          <div className="text-[11px] font-mono text-zinc-400 flex items-center justify-center gap-1.5 pt-4">
            <span>Crafted with pure black lines & unbroken continuity</span>
            <Heart className="w-3 h-3 text-[red] fill-[red]" />
          </div>
        </div>
      </footer>

      {/* 2. INSPECTOR SIDE DRAWER */}
      {isInspectorOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            onClick={() => setIsInspectorOpen(false)}
            className="absolute inset-0 bg-zinc-950/20 backdrop-blur-xs transition-opacity duration-300 pointer-events-auto"
          />
          
          {/* Drawer Paper */}
          <div className="relative w-full max-w-md h-full bg-white shadow-2xl z-20 pointer-events-auto animate-in slide-in-from-right duration-350 ease-out">
            <TokenInspector themeConfig={themeConfig} onClose={() => setIsInspectorOpen(false)} />
          </div>
        </div>
      )}

    </div>
  );
}
