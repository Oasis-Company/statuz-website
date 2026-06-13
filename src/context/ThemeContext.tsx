import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { ThemeConfig, ThemeKey } from '../types';

const defaults: ThemeConfig = {
  theme: 'linear',
  accent: '#0f172a',
  radius: 12,
  density: 'comfortable',
};

interface Ctx {
  config: ThemeConfig;
  update: (patch: Partial<ThemeConfig>) => void;
  cycleTheme: () => void;
}

const ThemeContext = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<ThemeConfig>(defaults);

  const update = useCallback((patch: Partial<ThemeConfig>) => {
    setConfig(prev => ({ ...prev, ...patch }));
  }, []);

  const cycleTheme = useCallback(() => {
    setConfig(prev => {
      const order: ThemeKey[] = ['linear', 'compact', 'mono'];
      const next = order[(order.indexOf(prev.theme) + 1) % order.length];
      return { ...prev, theme: next };
    });
  }, []);

  const value = useMemo(() => ({ config, update, cycleTheme }), [config, update, cycleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <div
        style={
          {
            '--accent': config.accent,
            '--radius': `${config.radius}px`,
          } as { [key: string]: string }
        }
        className={config.theme === 'mono' ? 'font-mono' : ''}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
