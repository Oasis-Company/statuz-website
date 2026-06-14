export const siteMeta = {
  name: 'Statuz',
  tagline: 'Situated Alignment Runtime',
  subtitle:
    'Memory lets an AI remember the past. Statuz lets an AI understand where it stands, what matters now, and when human direction must be renewed.',
  version: '0.5.0',
  maintainer: 'ceaserzhao',
  company: 'Oasis Company',
  license: 'Apache-2.0',
  repository: 'github.com/statuz-protocol/statuz',
};

export interface Layer {
  id: string;
  name: string;
  subtitle: string;
  summary: string;
  responsibility: string;
  questionAnswered: string;
  cadence: string;
  status: string;
  primitives?: string[];
}

export const layers: Layer[] = [
  {
    id: 'core',
    name: 'Statuz Core',
    subtitle: 'Runtime Status',
    summary:
      'A compact, recoverable view of the present. Answers the most basic operational question an agent must be able to answer.',
    responsibility:
      'Six primitives — identity, role, goal, progress, relations, next_action — structured as YAML that a human can read and a machine can parse.',
    questionAnswered: 'Who am I? What am I doing? What was I doing? What is next?',
    cadence: 'per-turn / per-checkpoint',
    status: 'Stable 0.5.0',
    primitives: ['identity', 'role', 'goal', 'progress', 'relations', 'next_action'],
  },
  {
    id: 'niche',
    name: 'niche',
    subtitle: 'Ecological Positioning',
    summary:
      'Statuz\'s secret weapon. Declares where the agent stands in the project ecosystem — what it does, what it does not do, what success looks like.',
    responsibility:
      'A declaration of position, boundaries, strategic bets, and success signals. Static until changed by SYN.',
    questionAnswered: 'Where do I stand in the ecosystem? What changes affect me? Should I recalibrate?',
    cadence: 'per-session / on-signal',
    status: 'Working Draft 0.5.0',
    primitives: ['position', 'boundaries', 'strategic bets', 'success signals'],
  },
  {
    id: 'calibration',
    name: 'Calibration',
    subtitle: 'Drift Detection',
    summary:
      'The monitoring layer that compares declared niche against observed behavior. Detects when an agent drifts away from what it said it would do.',
    responsibility:
      'Measure task drift, collaboration drift, boundary drift. Trigger SYN. Never modifies niche on its own authority.',
    questionAnswered: 'Am I doing what I said I would do? By how much am I off?',
    cadence: 'per-episode / on-signal',
    status: 'Working Draft 0.5.0',
    primitives: ['task drift', 'collaboration drift', 'boundary drift'],
  },
  {
    id: 'syn',
    name: 'SYN',
    subtitle: 'Human Governance & Strategic Synchronization',
    summary:
      'The governance interface. When calibration detects drift beyond a declared threshold, or when an agent judges a strategic decision required, SYN surfaces the question to the human principal.',
    responsibility:
      'Structured decision record. Only SYN can modify niche — this is Statuz\'s core governance principle.',
    questionAnswered: 'When must I request human direction? And who decides?',
    cadence: 'triggered by drift or agent judgment',
    status: 'Working Draft 0.5.0',
    primitives: ['request', 'options', 'resolution', 'accountability record'],
  },
  {
    id: 'sixtysix',
    name: '66 — Arrow Maps',
    subtitle: 'Topological Abstraction',
    summary:
      'The fifth layer — a vision for reusable, executable topologies of agents, projects, tools, and organizations.',
    responsibility:
      'Arrow = directed relationship declaration. StatuNode = everything is a node. Arrow Map = portable, executable ecological topology.',
    questionAnswered: 'What is the invisible architecture that makes me possible?',
    cadence: 'project-level / by-amendment',
    status: 'Implementation v0.1.0-draft',
    primitives: ['Arrow', 'StatuNode', 'Arrow Map'],
  },
];

export interface Problem {
  id: string;
  headline: string;
  body: string;
}

export const problems: Problem[] = [
  {
    id: 'session-fragmentation',
    headline: 'After a context reset, the agent forgets what it was doing.',
    body:
      'Session fragmentation is the baseline failure: restart, model switch, or task handoff leaves the agent unable to answer its most basic operational question. Statuz stores a compact, versioned state instead of depending on context-window memory.',
  },
  {
    id: 'ecological-blindness',
    headline: 'The agent has no awareness of its position in the project.',
    body:
      'An agent working on a frontend service cannot tell whether a change in a shared library affects it. niche declares position and boundaries; calibration measures deviations from them.',
  },
  {
    id: 'boundary-ambiguity',
    headline: 'There is no structured declaration of what the agent does and does not do.',
    body:
      'Without declared boundaries, agents drift into responsibilities they were not designed for. Statuz requires every agent to have explicit does / does-not declarations.',
  },
  {
    id: 'decision-opacity',
    headline: 'No protocol governs when an agent should escalate strategic questions to humans.',
    body:
      'SYN is the governance layer: drift-exceeding-threshold triggers a structured escalation, and the resolution is recorded as accountability.',
  },
];

export interface ComparisonRow {
  axis: string;
  left: string;
  right: string;
  statuz: string;
  note: string;
}

export const comparisons: ComparisonRow[] = [
  {
    axis: 'vs Memory',
    left: 'Stores the past.',
    right: 'Describes the present.',
    statuz: 'Complementary. Memory stores; Statuz locates.',
    note: 'Memory is not enough. The agent also needs a compact, current, operational view.',
  },
  {
    axis: 'vs MCP',
    left: 'Connects agents to tools, data, and workflows.',
    right: 'Describes the runtime status of the agent.',
    statuz: 'Complementary. Statuz can be read and written through MCP.',
    note: 'MCP is a tool-access layer; Statuz is a status layer.',
  },
  {
    axis: 'vs Skills',
    left: 'Package reusable abilities and workflows.',
    right: 'Records the current state of the agent using them.',
    statuz: 'A skill can generate, update, or consume Statuz files.',
    note: 'Ability is not location. You need both.',
  },
  {
    axis: 'vs Project Documentation',
    left: 'Explains the project.',
    right: 'Explains where the agent is within the project right now.',
    statuz: 'Docs are permanent; Statuz is per-session.',
    note: 'A Statuz file is not a README. It is a runtime checkpoint.',
  },
  {
    axis: 'vs Task Management',
    left: 'Assigns and tracks tasks for humans and teams.',
    right: 'Gives an agent a compact operational state and recovery point.',
    statuz: 'A Statuz checkpoint may reference a task ticket. It does not replace one.',
    note: 'Task management is organizational; Statuz is operational.',
  },
];

export interface Principle {
  id: string;
  headline: string;
  body: string;
}

export const principles: Principle[] = [
  {
    id: 'observable',
    headline: 'Observable over opaque.',
    body:
      'Every agent turn must emit a status row a human or another agent can read.',
  },
  {
    id: 'explicit',
    headline: 'Explicit over implicit.',
    body:
      'Envelopes, contracts, and confidence bands are declared text — never inferred.',
  },
  {
    id: 'calibrated',
    headline: 'Calibrated over confident.',
    body:
      'A wrong claim with honest calibration is cheaper to fix than an over-confident one.',
  },
  {
    id: 'bilateral',
    headline: 'Bilateral over one-sided.',
    body:
      'Human intent is a contract with an acceptance record, not a throwaway prompt.',
  },
  {
    id: 'versioned',
    headline: 'Versioned over latest-only.',
    body:
      'Status and contracts are diffable, so recovery is a diff, not a do-over.',
  },
  {
    id: 'auditable',
    headline: 'Auditable by default.',
    body:
      'Protocol output is plain-text and parseable. No bespoke tooling required.',
  },
];

export interface RoadmapEntry {
  id: string;
  version: string;
  title: string;
  state: 'stable' | 'draft' | 'in-progress' | 'planned';
  items: string[];
}

export const roadmap: RoadmapEntry[] = [
  {
    id: 'r01',
    version: '0.1',
    title: 'Seed protocol',
    state: 'stable',
    items: [
      'Define Statuz as AI Agent Runtime Status Protocol.',
      'Draft core YAML format.',
      'Add JSON Schema.',
      'Add first examples.',
      'Add CLI scaffold.',
    ],
  },
  {
    id: 'r02',
    version: '0.2',
    title: 'Practical CLI',
    state: 'stable',
    items: ['Stable statuz init.', 'Stable statuz validate.', 'Stable statuz resume.', 'Better error messages.'],
  },
  {
    id: 'r03',
    version: '0.3',
    title: 'SDK',
    state: 'stable',
    items: ['JavaScript / TypeScript SDK.', 'Python SDK.', 'Checkpoint append helpers.', 'Multi-agent file helpers.'],
  },
  {
    id: 'r04',
    version: '0.4',
    title: 'MCP Server',
    state: 'stable',
    items: ['statuz.read.', 'statuz.write_checkpoint.', 'statuz.get_resume_brief.', 'statuz.update_agent_status.'],
  },
  {
    id: 'r05',
    version: '0.5',
    title: 'Integrations — IN PROGRESS',
    state: 'in-progress',
    items: [
      'VS Code Extension: syntax highlighting, validation, Niche Explorer.',
      'npm publish for CLI / SDK / MCP.',
      'Open VSX publish for VS Code Extension.',
    ],
  },
  {
    id: 'r06',
    version: '0.6–0.8',
    title: 'niche technical charter → vertical demo',
    state: 'draft',
    items: [
      'Niche manifest, signal, assessment, context, outcome, calibration schemas.',
      'SYN request and resolution schemas.',
      'Agent-specific manifests and complete chains.',
      'Calibration proposals: scope drift, collaboration drift.',
    ],
  },
  {
    id: 'r07',
    version: '0.9 → 1.0',
    title: 'SYN Project MVP → Stability',
    state: 'planned',
    items: [
      'Project niche manifest.',
      'Observed direction (signal → assessment → outcome).',
      'SYN request + resolution.',
      'Protocol document finalization.',
      'Release: 1.0 Stable.',
    ],
  },
];

export interface ToolchainItem {
  name: string;
  package: string;
  version: string;
  status: string;
}

export const toolchain: ToolchainItem[] = [
  { name: 'CLI', package: '@statuz/cli', version: '0.5.1', status: 'Stable' },
  { name: 'TypeScript SDK', package: '@statuz/sdk-ts', version: '0.5.0', status: 'Stable' },
  { name: 'Python SDK', package: 'statuz-sdk-py', version: '—', status: 'Planned' },
  { name: 'MCP Server', package: '@statuz/mcp-server', version: '0.5.0', status: 'Stable' },
  { name: 'VS Code Extension', package: 'statuz-vscode', version: '0.5.0', status: 'Stable' },
  { name: 'Signal Bus', package: '@statuz/signal-bus', version: '0.1.0', status: 'Early' },
  { name: 'Coordination Pool', package: '@statuz/coordination', version: '0.1.0', status: 'MVP' },
  { name: 'Super Package', package: '@statuz/statuz', version: '0.5.1', status: 'Stable' },
];

export const defaultStatuzYaml = `statuz_version: "0.1"

identity:
  agent_name: dev-agent
  project_name: statuz-website
  organization: Oasis Company

role:
  name: implementation-assistant
  responsibilities:
    - build the public-facing website
    - keep the visual contract aligned with "Linear Continuity"
    - maintain monochrome, line-first typography

current_state:
  phase: implementation
  task: roll out niche and SYN sections
  status: in_progress
  last_checkpoint: copy edited, ready to rebuild and deploy
  next_action: npm run build, then deploy

relations:
  related_agents:
    - doc-agent
    - qa-agent
  related_projects:
    - statuz
    - oasis-cli
  related_files:
    - src/sections/HeroSection.tsx
    - src/sections/RoadmapSection.tsx

rules:
  should_not:
    - introduce color beyond black and white
    - add generic parallax, bounce, or trend-driven ornamentation
    - write backend code, CLI logic, or external protocol changes on this repo
`;
