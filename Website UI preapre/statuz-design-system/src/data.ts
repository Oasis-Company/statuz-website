import { Layer, YamlPreset, CliCommand } from './types';

export const LAYERS: Layer[] = [
  {
    id: 'layer1',
    name: 'Layer 1: Statuz Core (Runtime Status)',
    version: 'v0.5.0 (Stable)',
    status: 'Stable',
    description: 'Provides deep, instant state recovery for autonomous execution. It acts as the transaction log of agent intent, ensuring that after any context reset, api failure, or interruption, the agent can recover in sub-milliseconds.',
    answers: 'Who am I? What am I doing right now? What is my direct checkpoint?',
    primitives: ['identity', 'role', 'goal', 'progress', 'relations', 'next_action'],
    yamlSample: `identity: "muserock-helper-04"
role: "Frontend Refactoring Agent"
goal: "Migrate styling from custom CSS to Tailwind v4 utilities"
progress:
  completed_files: 14
  pending_files: 3
  current_target: "src/components/Navigation.tsx"
relations:
  upstream: "backend-api-v1"
  downstream: "shared-core-types"
next_action: "Parse src/components/Navigation.tsx for inline classes"`
  },
  {
    id: 'layer2',
    name: 'Layer 2: niche (Ecological Positioning)',
    version: 'v0.5.0 (Working Draft)',
    status: 'Working Draft',
    description: 'This is Statuz\'s secret weapon and core differentiator. It establishes the agent\'s ecological boundaries in the wider codebase ecosystem. It defines exactly what is within the agent\'s scope, what is out-of-bounds, its dependencies, and its core strategic assumptions.',
    answers: 'Where do I stand in the project footprint? What files can I modify? What are my boundaries?',
    primitives: ['position', 'boundaries', 'strategic_bets', 'success_signals'],
    yamlSample: `niche:
  position: "Maintainer of /src/components folder"
  boundaries:
    allowed_write_paths:
      - "src/components/**/*.tsx"
      - "src/components/**/*.ts"
    forbidden_write_paths:
      - "src/db/**"
      - "server.ts"
  strategic_bets:
    - "Tailwind v4 theme variables will simplify typography declarations by 80%"
  success_signals:
    - "No build compilation errors"
    - "Linter runs successfully with exit code 0"`
  },
  {
    id: 'layer3',
    name: 'Layer 3: Calibration (Drift Detection)',
    version: 'v0.5.0 (Working Draft)',
    status: 'Working Draft',
    description: 'Scans and monitors agent behavior against its declared niche. If the agent begins writing files outside of its allowed boundaries, or alters its core strategy without review, Calibration detects the drift. It cannot modify niche—it can only flag discrepancies.',
    answers: 'Is my actual execution aligned with my declared boundary? Has a drift occurred?',
    primitives: ['drift_vectors', 'thresholds', 'observation_history'],
    yamlSample: `calibration:
  drift_vectors:
    - type: "boundary_drift"
      observed: "Attempted edit on server.ts"
      allowed: false
      score: 0.95
  thresholds:
    max_drift_allowed: 0.20
  observation_history:
    - timestamp: "2026-06-12T18:22:00Z"
      event: "Linter error on server.ts corrected manually"
      drift_detected: true`
  },
  {
    id: 'layer4',
    name: 'Layer 4: SYN (Strategic Synchronization)',
    version: 'v0.5.0 (Working Draft)',
    status: 'Working Draft',
    description: 'The governance contract. When Calibration logs a drift score exceeding user-defined thresholds, or when the agent identifies a high-risk fork in strategy, SYN halts auto-execution and requests explicit human calibration.',
    answers: 'When should I halt and request explicit direction? How do we recheck alignment?',
    primitives: ['syn_trigger_conditions', 'escalation_path', 'human_resolution'],
    yamlSample: `syn:
  trigger_conditions:
    - "drift_score > 0.30"
    - "attempted_api_endpoint_override"
  escalation_path:
    platform: "github-issue"
    handle: "@statuz-protocol/maintainers"
  human_resolution:
    status: "pending_calibration"
    requested_at: "2026-06-12T18:22:45Z"
    evidence_payload: "Agent requested to modify server.ts import structure"`
  },
  {
    id: 'layer5',
    name: 'Layer 5: Arrow Maps (Topological Abstraction)',
    version: 'v0.1.0-draft (Implementation)',
    status: 'In Implementation',
    description: 'Unveils the invisible topology of relationships. In dynamic multi-agent system coordination, Arrow represents directed dependencies between nodes. It is not a visualization deck—it is a functional blueprint for agent awareness.',
    answers: 'What is the network topology of other agent nodes? How do we discover connections?',
    primitives: ['statu_nodes', 'arrow_declarations', 'map_export'],
    yamlSample: `arrow_map:
  nodes:
    - id: "client-agent-1"
      type: "StatuNode"
      state: "active"
    - id: "db-agent-2"
      type: "StatuNode"
      state: "idle"
  arrows:
    - from: "client-agent-1"
      to: "db-agent-2"
      relationType: "rpc_read_write"
      status: "aligned"`
  }
];

export const YAML_PRESETS: YamlPreset[] = [
  {
    id: 'preset1',
    name: '01. Resume Capability (Core)',
    subtitle: 'State Recovery after Interruption',
    description: 'Simulates the basic transaction log file to recover state after any cold-boot, model context reset, or session timeout. Perfect for simple offline agent agents.',
    fileName: '.statuz/statuz.yaml',
    yaml: `# Statuz Protocol Core State Schema - v0.5.0
statuz_version: "0.5.0"
timestamp: "2026-06-12T18:23:45-07:00"

identity:
  agent_id: "crawler-alpha"
  origin_model: "gemini-2.5-pro"
  namespace: "oasis-search-crawler"

role:
  definition: "Deep research paper crawler"
  permissions_level: "restricted-vcs"

goal:
  current_objective: "Extract metadata of 200 arxiv papers regarding continuous state verification"
  target_metrics:
    target_count: 200
    current_count: 87

progress:
  checkpoint: "arxiv:2410.1983 - Verification Loop Design"
  status_flag: "executing"
  step_index: 872
  data_stashed_locally: true

relations:
  upstream_service: "arxiv-rss-feed"
  downstream_sink: "pinecone-index-main"

next_action:
  action_type: "fetch_pdf"
  target_url: "https://arxiv.org/pdf/2410.1983.pdf"
  fallback_action: "retry_with_delay"`
  },
  {
    id: 'preset2',
    name: '02. Niche Boundary (Ecosystem)',
    subtitle: 'Structuring Agent Constraints',
    description: 'Enforces ecological safety. Declares strict boundaries, files allowed to be altered, and what metrics prove success. Protects the core codebase from random agent drift.',
    fileName: '.statuz/niche.yaml',
    yaml: `# Statuz Niche Schema - v0.5.0
niche_version: "0.5.0"
agent_ref: "crawler-alpha"

ecological_position:
  scope: "Arxiv raw data parsing and cache index management"
  responsibilities:
    - "Ingest pdf documents"
    - "Parse bibtex markers"
    - "Write static json dumps"

boundaries:
  allowed_filesystem_write:
    - "data/raw/**/*.json"
    - "data/cache/*.idx"
  forbidden_filesystem_write:
    - "src/**/*.ts"
    - "configs/*.json"
    - "package.json"
  max_api_cost_per_session_usd: 12.00
  network_access_allowed_domains:
    - "arxiv.org"
    - "export.arxiv.org"

strategic_bets:
  - "Storing pdf raw txt blocks locally reduces re-fetch costs by 94%"
  - "Refusing system file modifications guarantees sandbox security"

success_signals:
  - "JSON schema validating with 100% success rate"
  - "API cost remains below $2.50 per 100 paper digests"`
  },
  {
    id: 'preset3',
    name: '03. Human Escalate (SYN)',
    subtitle: 'Structured Governance Framework',
    description: 'Defines threshold policies for when manual consent is mandatory. Instructs Statuz to stop and request syn before any destructive or strategic operation.',
    fileName: '.statuz/syn.yaml',
    yaml: `# Statuz SYN Synchronization Contract - v0.5.0
syn_version: "0.5.0"
active_policy: "strict-human-in-the-loop"

trigger_thresholds:
  unexpected_file_modification_count: 1
  hourly_spending_spike_percent: 50
  unverified_domain_pings: true
  unhandled_exceptions_retry_count: 3

escalation_channel:
  dispatch_target: "slack-webhook"
  route_to: "#engineering-alerts"
  priority: "BLOCKING"

audit_state:
  last_sync_time: "2026-06-12T15:00:00Z"
  last_authorized_by: "ceaserzhao"
  drift_alarm_raised: true
  evidence:
    message: "Agent requested write to 'package.json' to inject dependencies"
    affected_files: ["package.json"]
    drift_score: 0.98`
  }
];

export const CLI_COMMANDS: CliCommand[] = [
  {
    name: 'statuz init',
    description: 'Initializes a new .statuz block inside your workspace, creating the core schemas.',
    args: ['--force', '--schema=<custom-schema-path>'],
    outputSim: [
      '⚿ statuz-cli v0.5.1 - Situated Runtime Protocol',
      '✔ Created workspace directory: ./.statuz/',
      '✔ Generated configuration profile: ./.statuz/statuz.yaml (Layer 1 Core)',
      '✔ Resolved identity metadata schema from local package.json',
      '✔ Bound MCP listener on port 3000 mapping standard tools',
      '✨ Statuz successfully integrated! Start your agent session.'
    ]
  },
  {
    name: 'statuz validate',
    description: 'Validates current state, evaluates drift calibration, and raises SYN alarms.',
    args: ['--strict', '--log-output'],
    outputSim: [
      '🔍 Scanning workspace status...',
      '● [INFO] Loaded Core State from ./.statuz/statuz.yaml',
      '● [INFO] Loaded Ecosystem Boundaries from ./.statuz/niche.yaml',
      '● [INFO] Checking file modifications against sandbox boundaries...',
      '⚠ [WARN] Drift Detected on: src/index.css (Drift score: 0.12 - Allowed: True)',
      '✖ [FATAL] Violation Detected! Attempted modification in package.json (Allowed: False)',
      '🚨 [SYN TRIGGERED] Escalating state to human via SYN Strategic Sync...',
      '👉 Status: PAUSED (Awaiting calibration resolution)'
    ]
  },
  {
    name: 'statuz resume',
    description: 'Reads current statuz.yaml and generates a compact runtime brief for the AI agent.',
    args: ['--brief', '--format=markdown'],
    outputSim: [
      '⚡ Reassembling agent session from transaction log...',
      '● Recovered state successfully in 1.4 milliseconds.',
      '────────────────────────── ACTIVE BRIEF ──────────────────────────',
      'Who: crawler-alpha (using gemini-2.5-pro)',
      'Current Goal: Extract metadata of 200 arxiv papers regarding continuous state verification',
      'Completed Progress: 87/200 papers processed.',
      'Checkpoint: arxiv:2410.1983 - Verification Loop Design',
      'Next Step: Fetch PDF from https://arxiv.org/pdf/2410.1983.pdf',
      '──────────────────────────────────────────────────────────────────',
      '✔ Prompt context injection generated.'
    ]
  },
  {
    name: 'statuz checkpoint',
    description: 'Forces custom state snapshot, incrementing current step progress metrics.',
    args: ['--message="Custom backup"', '--progress-step=15'],
    outputSim: [
      '✔ Reading current runtime memory trackers...',
      '✔ Formatted state to strict YAML syntax.',
      '💾 Snapshotted to ./.statuz/statuz.yaml',
      '✔ Incremented progress counter by 15 details.',
      '● New active checkpoint: "Step tracker snapshot enforced by CLI"'
    ]
  }
];
