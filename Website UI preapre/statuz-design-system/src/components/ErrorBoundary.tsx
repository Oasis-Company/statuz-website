import { Component, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  section?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: unknown;
}

// React 19 treats class component instance fields differently; using
// explicit `this` cast to keep the class boundary type-safe in tsc.
export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
    this.handleReset = this.handleReset.bind(this);
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown): void {
    const self = this as unknown as {
      props: ErrorBoundaryProps;
    };
    console.error('[ErrorBoundary]', {
      section: self.props.section,
      error,
    });
  }

  private handleReset(): void {
    const self = this as unknown as {
      setState: (s: ErrorBoundaryState) => void;
    };
    self.setState({ hasError: false, error: null });
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }

  render(): ReactNode {
    const self = this as unknown as {
      state: ErrorBoundaryState;
      props: ErrorBoundaryProps;
    };
    if (self.state.hasError) {
      if (self.props.fallback) {
        return self.props.fallback;
      }

      return (
        <section className="border border-zinc-200 bg-white p-6 md:p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-zinc-100 rounded-full">
              <AlertTriangle className="w-5 h-5 text-zinc-800" />
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="font-display text-lg font-bold tracking-tight text-zinc-900">
                Something went wrong
                {self.props.section ? ` in ${self.props.section}` : ''}.
              </h3>
              <p className="text-sm text-zinc-500 font-sans leading-relaxed">
                This section failed to render. Refreshing the page usually
                resolves transient issues.
              </p>
              {self.state.error !== null &&
                self.state.error !== undefined && (
                  <pre className="mt-2 p-3 bg-zinc-950 text-zinc-200 text-[11px] font-mono overflow-x-auto rounded">
                    {String(self.state.error)}
                  </pre>
                )}
              <button
                onClick={this.handleReset}
                className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-zinc-950 text-white text-xs font-semibold tracking-wide hover:opacity-90 transition-opacity cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reload page
              </button>
            </div>
          </div>
        </section>
      );
    }

    return self.props.children;
  }
}
