import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import NavigationBar from './sections/NavigationBar';
import TopInfoBar from './sections/TopInfoBar';
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
import DesignSystemWizard from './components/DesignSystemWizard';
import TokenInspector from './components/TokenInspector';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  const [inspectorOpen, setInspectorOpen] = useState<boolean>(false);

  return (
    <ThemeProvider>
      <div className="bg-white min-h-screen relative font-sans text-zinc-800 antialiased selection:bg-zinc-950 selection:text-white pb-16 overflow-x-hidden">
        <TopInfoBar />
        <NavigationBar onOpenInspector={() => setInspectorOpen(true)} />

        <main className="max-w-7xl mx-auto px-4 mt-8 md:mt-12">
          <section className="mb-12">
            <ErrorBoundary section="Design Calibration">
              <DesignSystemWizard
                config={{
                  theme: 'linear',
                  accent: '#0f172a',
                  radius: 12,
                  density: 'comfortable',
                }}
                onChange={() => {}}
              />
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
              className="absolute inset-0 bg-zinc-950/20 backdrop-blur-sm transition-opacity"
              onClick={() => setInspectorOpen(false)}
            />
            <div className="relative w-full max-w-md h-full bg-white shadow-2xl z-20 animate-in slide-in-from-right">
              <TokenInspector onClose={() => setInspectorOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
