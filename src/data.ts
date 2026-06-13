import type { Layer, StatuzRow } from './types';

export const siteMeta = {
  name: 'Statuz',
  tagline: 'Situated Alignment Runtime',
  version: '0.5.0',
  maintainer: 'ceaserzhao',
  company: 'Oasis Company',
};

export const layers: Layer[] = [
  {
    id: 'status',
    name: 'Status Recovery',
    summary: 'Agent state is versioned, diffed, and replayable.',
    responsibility: 'Capture runtime observables into a deterministic status graph.',
    cadence: 'per-turn',
    failureMode: 'lost context / state drift',
  },
  {
    id: 'ecology',
    name: 'Ecological Boundaries',
    summary: 'Envelopes bound what an agent may observe and act upon.',
    responsibility: 'Scope inputs, outputs, tools per envelope contract.',
    cadence: 'per-session',
    failureMode: 'scope creep / tool bleed',
  },
  {
    id: 'calibration',
    name: 'Calibration Drift',
    summary: 'Compare declared vs. observed confidence over time.',
    responsibility: 'Score calibration; flag drift before decisions compound.',
    cadence: 'per-episode',
    failureMode: 'overconfidence / underclaiming',
  },
  {
    id: 'human',
    name: 'Human Strategic Sync',
    summary: 'Bilateral contracts between agents and human principals.',
    responsibility: 'Explicit intent, acceptance, and amendment record.',
    cadence: 'per-milestone',
    failureMode: 'silent misalignment',
  },
];

export const statuzRows: StatuzRow[] = [
  { field: 'protocol', value: 'statuz/v1', source: 'system' },
  { field: 'session.id', value: 'sess_8F2a...e1', source: 'system' },
  { field: 'agent.id', value: 'agent_ceaserzhao', source: 'agent' },
  { field: 'envelope', value: 'research/docs,web:read', source: 'system' },
  { field: 'tools.enabled', value: 'browser, files, planner', source: 'agent' },
  { field: 'calibration.p50', value: '0.72 ± 0.04', source: 'agent' },
  { field: 'human.contract', value: 'deploy-statuz-website', source: 'human' },
  { field: 'milestone', value: 'beta-v0.5.0', source: 'system' },
  { field: 'last.turn', value: '631ms ago', source: 'system' },
];
