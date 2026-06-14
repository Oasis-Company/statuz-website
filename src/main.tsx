import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './index.css';

const rootEl = document.getElementById('root');
if (!rootEl) {
  // eslint-disable-next-line no-console
  console.error('[statuz-website] #root element not found in document.');
} else {
  createRoot(rootEl).render(
    <StrictMode>
      <ErrorBoundary section="Application">
        <App />
      </ErrorBoundary>
    </StrictMode>,
  );
}
