// @ts-nocheck — React 19 class component runtime still works; type definitions are noisy
import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error(
      `[statuz-website] boundary "${this.props.section}" caught an error:`,
      error,
      info,
    );
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="border border-ink-20 rounded-sm bg-white p-6 mx-auto max-w-2xl">
          <div className="mono text-xs uppercase tracking-widest text-ink-40">
            statuz error · {this.props.section}
          </div>
          <div className="mt-3 font-display text-lg text-ink">
            A section encountered an unrecoverable error.
          </div>
          <div className="mt-2 text-sm text-ink-60 leading-relaxed">
            The rest of the page continues to work. Refresh to re-run this
            section, or open an issue on GitHub to report it.
          </div>
          {this.state.error?.message && (
            <pre className="mt-4 mono text-xs bg-ink-05 text-ink-60 p-3 rounded-sm overflow-x-auto">
              {String(this.state.error.message)}
            </pre>
          )}
          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={() => window.location.reload()}
              className="mono text-xs text-white bg-ink hover:bg-ink-80 rounded-sm px-4 py-2"
            >
              refresh page
            </button>
            <button
              onClick={() => this.setState({ hasError: false, error: undefined })}
              className="mono text-xs text-ink border border-ink-20 hover:border-ink rounded-sm px-4 py-2"
            >
              retry section
            </button>
          </div>
        </div>
      );
    }
    return this.props.children ?? null;
  }
}
