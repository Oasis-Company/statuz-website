import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import DesignSystemWizard from './components/DesignSystemWizard';
import TokenInspector from './components/TokenInspector';
import NavigationBar from './sections/NavigationBar';
import HeroSection from './sections/HeroSection';
import CalibrationQuizSection from './sections/CalibrationQuizSection';
import ProblemSection from './sections/ProblemSection';
import LayerStackSection from './sections/LayerStackSection';
import YamlSandboxSection from './sections/YamlSandboxSection';
import CliTerminalSection from './sections/CliTerminalSection';
import ComparisonSection from './sections/ComparisonSection';
import PrinciplesSection from './sections/PrinciplesSection';
import RoadmapSection from './sections/RoadmapSection';
import FooterSection from './sections/FooterSection';
import { useTheme } from './context/ThemeContext';

function CalibrationPanel() {
  const { config, update } = useTheme();
  return <DesignSystemWizard config={config} onChange={update} />;
}

export default function App() {
  const [inspectorOpen, setInspectorOpen] = useState<boolean>(false);

  return (
    <ThemeProvider>
      <div className="bg-white min-h-screen relative font-sans text-zinc-800 antialiased selection:bg-zinc-950 selection:text-white pb-16 overflow-x-hidden">
        <div className="bg-zinc-950 text-white py-2 px-4 text-center text-xs font-mono select-none tracking-tight flex items-center justify-between relative z-40">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Statuz Beta v0.5.0 Calibration Console</span>
          </div>
          <p className="hidden md:block opacity-60 text-[11px]">
            Maintainer: ceaserzhao (Oasis Company) | License: Apache-2.0
          </p>
          <button
            onClick={() => setInspectorOpen(true)}
            className="bg-zinc-800 hover:bg-zinc-700 px-2.5 py-0.5 text-[10px] uppercase font-mono tracking-wider transition-colors cursor-pointer rounded-xs"
          >
            Inspect System Variables
          </button>
        </div>

        <NavigationBar onOpenInspector={() => setInspectorOpen(true)} />

        <main className="max-w-7xl mx-auto px-4 mt-8 md:mt-12">
          <section className="mb-12">
            <ErrorBoundary section="Design Calibration">
              <CalibrationPanel />
            </ErrorBoundary>
          </section>

          <ErrorBoundary section="Hero">
            <HeroSection />
          </ErrorBoundary>

          <ErrorBoundary section="Calibration Quiz">
            <CalibrationQuizSection />
          </ErrorBoundary>

          <ErrorBoundary section="Problem">
            <ProblemSection />
          </ErrorBoundary>

          <ErrorBoundary section="Layer Stack">
            <LayerStackSection />
          </ErrorBoundary>

          <ErrorBoundary section="YAML Sandbox">
            <YamlSandboxSection />
          </ErrorBoundary>

          <ErrorBoundary section="CLI Terminal">
            <CliTerminalSection />
          </ErrorBoundary>

          <ErrorBoundary section="Comparison Matrix">
            <ComparisonSection />
          </ErrorBoundary>

          <ErrorBoundary section="Principles">
            <PrinciplesSection />
          </ErrorBoundary>

          <ErrorBoundary section="Roadmap">
            <RoadmapSection />
          </ErrorBoundary>
        </main>

        <FooterSection />

        {inspectorOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div
              className="absolute inset-0 bg-zinc-950/20 backdrop-blur-xs transition-opacity duration-300 pointer-events-auto"
              onClick={() => setInspectorOpen(false)}
            />
            <div className="relative w-full max-w-md h-full bg-white shadow-2xl z-20 pointer-events-auto animate-in slide-in-from-right duration-350 ease-out">
              <TokenInspector onClose={() => setInspectorOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
