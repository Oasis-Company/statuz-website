export type ThemeKey = 'linear' | 'compact' | 'mono';

export interface ThemeConfig {
  theme: ThemeKey;
  accent: string;
  radius: number;
  density: 'compact' | 'comfortable' | 'spacious';
}

export function isThemeKey(s: string): s is ThemeKey {
  return s === 'linear' || s === 'compact' || s === 'mono';
}

export function themeKeyLabel(k: ThemeKey): string {
  return k === 'linear'
    ? 'Linear Continuity'
    : k === 'compact'
      ? 'Compact Signal'
      : 'Mono Protocol';
}
