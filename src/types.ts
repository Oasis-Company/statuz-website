export type ThemeKey = 'linear' | 'compact' | 'mono';

export interface ThemeConfig {
  theme: ThemeKey;
  accent: string;
  radius: number;
  density: 'compact' | 'comfortable' | 'spacious';
}

export interface QuizAnswer {
  id: string;
  label: string;
}

export interface StatuzRow {
  field: string;
  value: string;
  source?: 'system' | 'agent' | 'human';
}

export interface Layer {
  id: string;
  name: string;
  summary: string;
  responsibility: string;
  cadence: string;
  failureMode: string;
}
