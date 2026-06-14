import { useEffect, useState } from 'react';
import NavigationBar from './sections/NavigationBar';
import TopInfoBar from './sections/TopInfoBar';
import HeroSection from './sections/HeroSection';
import ProblemSection from './sections/ProblemSection';
import LayerStackSection from './sections/LayerStackSection';
import YamlSandboxSection from './sections/YamlSandboxSection';
import CliTerminalSection from './sections/CliTerminalSection';
import ComparisonSection from './sections/ComparisonSection';
import PrinciplesSection from './sections/PrinciplesSection';
import RoadmapSection from './sections/RoadmapSection';
import FooterSection from './sections/FooterSection';
import TokenInspector from './components/TokenInspector';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  const [inspectorOpen, setInspectorOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!inspectorOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setInspectorOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [inspectorOpen]);

  return (
    <div className="bg-white min-h-screen relative font-sans text-zinc-800 antialiased selection:bg-zinc-950 selection:text-white pb-16 overflow-x-hidden">
      <TopInfoBar />
      <NavigationBar onOpenInspector={() => setInspectorOpen(true)} />

      <main className="max-w-none">
        <ErrorBoundary section="Hero">
          <HeroSection />
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

        <ErrorBoundary section="Comparison">
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

      {inspectorOpen && <TokenInspector onClose={() => setInspectorOpen(false)} />}
    </div>
  );
}
