import {
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import type { ReactNode } from 'react';
import type { ThemeConfig } from '../types';

const DEFAULT_THEME: ThemeConfig = {
  style: 'minimal',
  radius: 'none',
  highlightColor: '#050505',
  gridVisible: false,
};

type ThemeAction =
  | { type: 'update'; updates: Partial<ThemeConfig> }
  | { type: 'reset' };

function themeReducer(state: ThemeConfig, action: ThemeAction): ThemeConfig {
  switch (action.type) {
    case 'update':
      return { ...state, ...action.updates };
    case 'reset':
      return { ...DEFAULT_THEME };
    default:
      return state;
  }
}

interface ThemeContextValue {
  config: ThemeConfig;
  update: (updates: Partial<ThemeConfig>) => void;
  reset: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [config, dispatch] = useReducer(themeReducer, DEFAULT_THEME);

  const value = useMemo<ThemeContextValue>(
    () => ({
      config,
      update: (updates) => dispatch({ type: 'update', updates }),
      reset: () => dispatch({ type: 'reset' }),
    }),
    [config],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used inside a <ThemeProvider>');
  }
  return ctx;
}
