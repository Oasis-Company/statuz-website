export const siteMeta = {
  name: 'Statuz',
  tagline: 'Situated Alignment Ecosystem',
  subtitle:
    'Memory lets an AI remember the past. Statuz lets an AI understand where it stands, what matters now, and when human direction must be renewed.',
  fullTagline:
    'Statuz is a Runtime that keeps users, agents, projects, and niches in continuous Reality Synchronization.',
  version: '0.5.1',
  maintainer: 'ceaserzhao',
  company: 'Oasis Company',
  license: 'Apache-2.0',
  repository: 'github.com/statuz-protocol/statuz',
  repoUrl: 'https://github.com/statuz-protocol/statuz',
  issuesUrl: 'https://github.com/statuz-protocol/statuz/issues',
  npmPackage: '@statuz/statuz',
  npmUrl: 'https://www.npmjs.com/package/@statuz/statuz',
  docsUrl: 'https://github.com/statuz-protocol/statuz#readme',
  homepage: 'https://statuz-protocol.github.io/statuz/',
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
      'The minimal situation layer. A compact, recoverable view of the present — identity, role, current state, progress, relations, rules, and next action. Expressed as YAML that a human can read and a machine can parse.',
    responsibility:
      'Six primitives — identity, role, goal, progress, relations, next_action — together with checkpoint and rule fields. Stored in a single, versioned YAML file.',
    questionAnswered: 'Who am I? What am I doing? What was I doing? What is next?',
    cadence: 'per-turn / per-checkpoint',
    status: 'Stable 0.5.1',
    primitives: ['identity', 'role', 'goal / current_state', 'progress', 'relations', 'next_action', 'rules', 'checkpoints'],
  },
  {
    id: 'niche',
    name: 'niche',
    subtitle: 'Ecological Positioning',
    summary:
      "Statuz's secret weapon. niche declares where the agent stands in the project ecosystem — what it does, what it does NOT do, what its strategic bets are, and how success is measured.",
    responsibility:
      'A declaration of ecological position and boundaries. Static until changed by SYN. Lives at `.statuz/niche/manifest.yaml`.',
    questionAnswered: 'Where do I stand in the ecosystem? What changes affect me? What are my boundaries?',
    cadence: 'per-session / on-signal',
    status: 'Working Draft 0.5.1',
    primitives: ['declared_position', 'boundaries (does / does_not)', 'strategic_bets', 'success_signals'],
  },
  {
    id: 'calibration',
    name: 'Calibration',
    subtitle: 'Drift Detection',
    summary:
      'The monitoring layer that compares declared niche against observed behavior. Detects task drift, collaboration drift, and boundary drift. Never modifies niche on its own authority.',
    responsibility:
      'Measure the gap between declared position and observed behavior. Surface drift evidence. Trigger SYN when thresholds are exceeded.',
    questionAnswered: 'Am I doing what I said I would do? By how much am I off? What is the evidence?',
    cadence: 'per-episode / on-signal',
    status: 'Working Draft 0.5.1',
    primitives: ['task_drift', 'collaboration_drift', 'boundary_drift', 'drift_threshold', 'SYN_trigger'],
  },
  {
    id: 'syn',
    name: 'SYN',
    subtitle: 'Human Governance & Strategic Synchronization',
    summary:
      'The governance interface. When calibration detects drift beyond a declared threshold, or when an agent judges a strategic decision required, SYN surfaces the question to the human principal and records the decision.',
    responsibility:
      'Structured decision record. Only SYN can modify niche — this is Statuz\'s core governance principle. Escalation options are presented with evidence; the human decides.',
    questionAnswered: 'When must I request human direction? Who decides? How is the decision recorded?',
    cadence: 'triggered by drift or agent judgment',
    status: 'Working Draft 0.5.1',
    primitives: ['request', 'options_with_evidence', 'resolution', 'accountability_record'],
  },
  {
    id: 'sixtysix',
    name: '66 — Arrow Maps',
    subtitle: 'Topological Abstraction',
    summary:
      'A vision for reusable, executable topologies of agents, projects, tools, and organizations. Beyond three layers: discovering and evolving the invisible architecture that makes projects survive.',
    responsibility:
      'Arrow = directed relationship declaration. Node = everything is a node. Arrow Map = portable, executable ecological topology.',
    questionAnswered: 'What is the invisible architecture that makes me possible? How do niches compose?',
    cadence: 'project-level / by-amendment',
    status: 'Implementation Draft',
    primitives: ['Arrow', 'StatuNode', 'Arrow Map', 'niche composition'],
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
      'Without declared boundaries, agents drift into responsibilities they were not designed for. Statuz requires every agent to have explicit does / does-not declarations in its niche manifest.',
  },
  {
    id: 'decision-opacity',
    headline: 'No protocol governs when an agent should escalate strategic questions to humans.',
    body:
      'SYN is the governance layer: drift-exceeding-threshold triggers a structured escalation with evidence. The resolution is recorded as accountability — so decisions are auditable.',
  },
];

export interface ComparisonRow {
  axis: string;
  left: string;
  right: string;
  statuz: string;
}

export const comparisons: ComparisonRow[] = [
  {
    axis: 'vs Memory',
    left: 'Stores the past — vectors, transcripts, embeddings.',
    right: 'Describes the present — agent state, position, intent.',
    statuz: 'Complementary. Memory stores; Statuz locates.',
  },
  {
    axis: 'vs MCP',
    left: 'Connects agents to tools, data, and workflows.',
    right: 'Describes the runtime status of the agent using them.',
    statuz: 'Complementary. Statuz can be read and written through MCP.',
  },
  {
    axis: 'vs Agent Skills',
    left: 'Package reusable abilities and workflows.',
    right: 'Records the current state of an agent using them.',
    statuz: 'A skill can generate, update, or consume Statuz files.',
  },
  {
    axis: 'vs Project Documentation',
    left: 'Explains the project — the permanent picture.',
    right: 'Explains where the agent is within the project right now.',
    statuz: 'Docs are permanent; Statuz is per-session.',
  },
  {
    axis: 'vs Task Management',
    left: 'Assigns and tracks tasks for humans and teams.',
    right: 'Gives an agent a compact operational state and recovery point.',
    statuz: 'A Statuz checkpoint may reference a task ticket. It does not replace one.',
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
    body: 'Every agent turn must emit a status row a human or another agent can read.',
  },
  {
    id: 'explicit',
    headline: 'Explicit over implicit.',
    body: 'Boundaries, contracts, and confidence bands are declared text — never inferred from behavior.',
  },
  {
    id: 'calibrated',
    headline: 'Calibrated over confident.',
    body: 'A wrong claim with honest calibration is cheaper to fix than an over-confident one.',
  },
  {
    id: 'bilateral',
    headline: 'Bilateral over one-sided.',
    body: 'Human intent is a contract with an acceptance record, not a throwaway prompt.',
  },
  {
    id: 'versioned',
    headline: 'Versioned over latest-only.',
    body: 'Status and contracts are diffable, so recovery is a diff, not a do-over.',
  },
  {
    id: 'auditable',
    headline: 'Auditable by default.',
    body: 'Protocol output is plain-text and parseable. No bespoke tooling required.',
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
      'Draft core YAML format: identity, role, current_state, progress, relations, rules, next_action.',
      'Add JSON Schema with date-time validation.',
      'Add first example Statuz files.',
      'Add CLI scaffold (init / validate / resume).',
    ],
  },
  {
    id: 'r02',
    version: '0.2',
    title: 'Practical CLI',
    state: 'stable',
    items: [
      'Stable `statuz init` — generates a starting YAML.',
      'Stable `statuz validate` — checks against JSON Schema.',
      'Stable `statuz resume` — prints a human-readable resume brief.',
      'Optional `.gitignore` generation for `.statuz/` paths.',
      'Improved error messages and path unification to `.statuz/agents/{agentName}.yaml`.',
    ],
  },
  {
    id: 'r03',
    version: '0.3',
    title: 'Dual SDKs',
    state: 'stable',
    items: [
      'TypeScript SDK — `Statuz` class with read / write / validation / creation support.',
      'Python SDK — `Statuz` class with Pydantic type definitions and same API.',
      'Checkpoint append helpers and `forAgent` / `for_agent` convenience methods.',
      'Multi-agent file helpers — `.statuz/agents/{agentName}.yaml`.',
    ],
  },
  {
    id: 'r04',
    version: '0.4',
    title: 'MCP Server',
    state: 'stable',
    items: [
      '`statuz_init` — initialize a new Statuz file over MCP.',
      '`statuz_read` — read existing Statuz file over MCP.',
      '`statuz_checkpoint` — append a checkpoint event.',
      '`statuz_get_resume_brief` — get a human-readable resume brief.',
      '`statuz_update_status` — update status fields from an agent turn.',
    ],
  },
  {
    id: 'r041',
    version: '0.4.1',
    title: 'Implementation Hardening',
    state: 'stable',
    items: [
      'Fixed TypeScript SDK validation logic — validation now works correctly.',
      'Ajv 2020 — proper JSON Schema Draft 2020-12 support for schemas.',
      'date-time field validation for `updated_at` and `checkpoints.at`.',
      'MCP server security boundaries — `setAllowedRoots`, `assertSafePath`, path-traversal prevention.',
      'Extended CI coverage across CLI / TS SDK / Python SDK / MCP server.',
    ],
  },
  {
    id: 'r05',
    version: '0.5',
    title: 'Integrations — IN PROGRESS',
    state: 'in-progress',
    items: [
      'VS Code Extension — syntax highlighting, in-editor validation, Niche Explorer, SYN decision interface.',
      'npm publish for CLI, TypeScript SDK, Python SDK, and MCP server packages.',
      'Open VSX publish for the VS Code Extension.',
      'Coordination Pool — MVP for shared agent status surface (local only).',
    ],
  },
  {
    id: 'r06',
    version: '0.6',
    title: 'niche Technical Charter',
    state: 'draft',
    items: [
      'Publish NICHE_MANIFEST.md technical charter.',
      'Define niche manifest, signal, assessment, context, outcome, calibration, SYN.',
      'Create ADR for protocol boundaries and Core / niche separation.',
      'Complete vertical example in `examples/niche-example/`.',
    ],
  },
  {
    id: 'r07',
    version: '0.7',
    title: 'niche Minimum Object Set',
    state: 'draft',
    items: [
      'Define niche-manifest schema — declared_position, boundaries, strategic_bets, success_signals.',
      'Define niche-signal, niche-assessment, niche-context, niche-outcome, niche-calibration schemas.',
      'Define niche-syn schema for escalation request / resolution records.',
      'Validate all niche examples against schemas (23 / 23 pass).',
    ],
  },
  {
    id: 'r08',
    version: '0.8',
    title: 'niche Vertical Demo',
    state: 'draft',
    items: [
      'Create backend, frontend, and qa agent-specific manifests.',
      'Create signal → assessment → context → outcome chains (3 complete chains).',
      'Create calibration proposals — scope drift, collaboration drift, with evidence.',
      'Create SYN request and resolution examples — scope update, security deployment.',
    ],
  },
  {
    id: 'r09',
    version: '0.9',
    title: 'SYN Project MVP',
    state: 'draft',
    items: [
      'Create the Statuz project niche manifest.',
      'Generate observed direction — signal / assessment / outcome chain.',
      'Generate calibration proposal — scope drift detected.',
      'Generate SYN request and SYN resolution with accountability record.',
      'Update project manifest to reflect niche as core responsibility.',
    ],
  },
  {
    id: 'r10',
    version: '1.0',
    title: 'Stable Protocol',
    state: 'planned',
    items: [
      'SPEC.md formal versioning — 1.0 with compatibility statement and breaking-change policy.',
      'Complete schema regression test suite across Core, niche, and SYN layers.',
      'CLI and SDK regression tests; MCP server security tests.',
      '0.x → 1.0 migration guide with example updates.',
      'Formal security model — file access permissions, sensitive-data tagging spec.',
      'Lightweight Statuz status dashboard prototype (optional).',
    ],
  },
];

export interface ToolchainItem {
  name: string;
  package: string;
  version: string;
  status: string;
  url: string;
  registry: 'npm' | 'pypi' | 'vsx' | 'github' | 'n/a';
}

export const toolchain: ToolchainItem[] = [
  { name: 'CLI', package: '@statuz/cli', version: '0.5.1', status: 'Stable', url: 'https://www.npmjs.com/package/@statuz/cli', registry: 'npm' },
  { name: 'TypeScript SDK', package: '@statuz/sdk-ts', version: '0.5.0', status: 'Stable', url: 'https://www.npmjs.com/package/@statuz/sdk-ts', registry: 'npm' },
  { name: 'Python SDK', package: 'statuz-sdk-py', version: '0.5.0', status: 'Stable', url: 'https://pypi.org/project/statuz-sdk-py/', registry: 'pypi' },
  { name: 'MCP Server', package: '@statuz/mcp-server', version: '0.5.0', status: 'Stable', url: 'https://www.npmjs.com/package/@statuz/mcp-server', registry: 'npm' },
  { name: 'VS Code Extension', package: 'statuz-vscode', version: '0.5.0', status: 'Stable · Open VSX', url: 'https://marketplace.visualstudio.com/items?itemName=statuz.statuz-vscode', registry: 'vsx' },
  { name: 'Signal Bus', package: '@statuz/signal-bus', version: '0.1.0', status: 'Early', url: 'https://github.com/statuz-protocol/statuz', registry: 'github' },
  { name: 'Coordination Pool', package: '@statuz/coordination', version: '0.1.0', status: 'MVP · local only', url: 'https://github.com/statuz-protocol/statuz', registry: 'github' },
  { name: 'Super Package', package: '@statuz/statuz', version: '0.5.1', status: 'Stable', url: 'https://www.npmjs.com/package/@statuz/statuz', registry: 'npm' },
];

export const defaultStatuzYaml = `statuz_version: "0.1"
updated_at: "2026-06-14T00:00:00Z"

identity:
  agent_name: dev-agent
  project_name: statuz-website
  organization: Oasis Company
  environment: production

role:
  name: implementation-assistant
  responsibilities:
    - build and maintain the public-facing Statuz website
    - keep the visual contract aligned with "Linear Continuity"
    - maintain monochrome, line-first typography
  boundaries:
    - does_not: modify backend code, CLI logic, or external protocol changes on this repo

current_state:
  phase: implementation
  task: roll out corrected niche and SYN sections
  status: in_progress
  last_checkpoint: cp-0042 — copy edited; data.ts aligned with real 0.5.1 release
  next_action: npm run build, then deploy

progress:
  completed:
    - hero copy aligned with real Statuz positioning tagline
    - data.ts version bumped to 0.5.1, repo link corrected
    - niche / calibration / SYN / 66 layers rewritten from real docs
    - roadmap rewritten to reflect actual 0.1 → 0.5.1 → 1.0 progression
  blocked_by:
    - none
  open_questions:
    - should the 66 arrow-map section get a live visualization?

relations:
  related_agents:
    - doc-agent
    - qa-agent
  related_projects:
    - statuz (protocol + packages)
  related_files:
    - src/sections/HeroSection.tsx
    - src/sections/RoadmapSection.tsx
    - src/components/CommandTerminal.tsx
  related_tools:
    - vite
    - typescript

rules:
  should:
    - read .statuz/statuz.yaml at session start
    - write a checkpoint after meaningful progress
    - update current_state.task when switching tasks
  should_not:
    - introduce color beyond black and white
    - add generic parallax, bounce, or trend-driven ornamentation
    - store secrets or API keys in Statuz files

checkpoints:
  - id: cp-0042
    at: "2026-06-14T00:00:00Z"
    summary: aligned website copy with real 0.5.1 release, repo, and roadmap
    next_action: npm run build → deploy
`;
