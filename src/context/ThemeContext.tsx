import { createContext, useCallback, useContext, useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import type { ThemeConfig, ThemeKey } from '../types';

const defaults: ThemeConfig = {
  theme: 'linear',
  accent: '#0a0a0a',
  radius: 4,
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
    setConfig((prev) => ({ ...prev, ...patch }));
  }, []);

  const cycleTheme = useCallback(() => {
    setConfig((prev) => {
      const order: ThemeKey[] = ['linear', 'compact', 'mono'];
      const next = order[(order.indexOf(prev.theme) + 1) % order.length];
      return { ...prev, theme: next };
    });
  }, []);

  const value = useMemo(() => ({ config, update, cycleTheme }), [config, update, cycleTheme]);

  const fontFamily: CSSProperties['fontFamily'] =
    config.theme === 'mono' ? '"JetBrains Mono", ui-monospace, monospace' : undefined;

  const style: CSSProperties = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ['--accent' as any]: config.accent,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ['--radius' as any]: `${config.radius}px`,
    ...(fontFamily ? { fontFamily } : undefined),
  };

  return (
    <ThemeContext.Provider value={value}>
      <div style={style}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme(): Ctx {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
