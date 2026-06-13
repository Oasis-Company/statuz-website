export interface Layer {
  id: string;
  name: string;
  version: string;
  status: string;
  description: string;
  answers: string;
  primitives: string[];
  yamlSample: string;
}

export interface YamlPreset {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  fileName: string;
  yaml: string;
}

export interface CliCommand {
  name: string;
  description: string;
  args: string[];
  outputSim: string[];
}

export interface ThemeConfig {
  style: 'minimal' | 'technical';
  radius: 'none' | 'sm' | 'md' | 'full';
  highlightColor: string;
  gridVisible: boolean;
}
