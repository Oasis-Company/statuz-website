import { useEffect, useState } from 'react';
import type { ThemeConfig } from '../types';
import { YAML_PRESETS } from '../data';
import {
  AlertCircle,
  CheckCircle,
  Code,
  RefreshCw,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface Props {
  themeConfig?: ThemeConfig;
}

function computeDrift(
  baseDrift: number,
  fileMedsCount: number,
  sessionCostUsd: number,
  isPreset3: boolean,
  isMemoryPolluted: boolean,
): number {
  let computed = baseDrift;
  if (fileMedsCount > 2) computed += 0.25;
  if (sessionCostUsd > 10) computed += 0.4;
  if (isPreset3) computed += 0.35;
  if (isMemoryPolluted) computed += 0.2;
  return Math.min(Math.max(computed, 0.02), 1);
}

export default function YamlSandbox({
  themeConfig: propConfig,
}: Props) {
  const ctx = useTheme();
  const config = propConfig ?? ctx.config;
  const [selectedPresetId, setSelectedPresetId] = useState<string>(
    YAML_PRESETS[0].id,
  );
  const activePreset =
    YAML_PRESETS.find((p) => p.id === selectedPresetId) ?? YAML_PRESETS[0];

  const [yamlText, setYamlText] = useState<string>(activePreset.yaml);
  const [fileMedsCount, setFileMedsCount] = useState<number>(0);
  const [sessionCostUsd, setSessionCostUsd] = useState<number>(1.2);
  const [forceCustomDrift, setForceCustomDrift] = useState<number>(0.05);

  useEffect(() => {
    setYamlText(activePreset.yaml);
    if (activePreset.id === 'preset1') {
      setFileMedsCount(0);
      setSessionCostUsd(1.2);
    } else if (activePreset.id === 'preset2') {
      setFileMedsCount(1);
      setSessionCostUsd(2.4);
    } else {
      setFileMedsCount(4);
      setSessionCostUsd(14.5);
    }
  }, [selectedPresetId, activePreset]);

  const isMemoryPolluted =
    yamlText.toLowerCase().includes('vector_db') ||
    yamlText.toLowerCase().includes('vector_database') ||
    yamlText.toLowerCase().includes('vector_store') ||
    yamlText.toLowerCase().includes('embedding_dimension') ||
    yamlText.toLowerCase().includes('long_term_memory');

  const isMcpReplaced =
    yamlText.toLowerCase().includes('mcp_replacement') ||
    yamlText.toLowerCase().includes('replace_mcp');

  const hasBracketMismatch = (() => {
    let count = 0;
    for (const ch of yamlText) {
      if (ch === '{' || ch === '[') count++;
      if (ch === '}' || ch === ']') count--;
    }
    return count !== 0;
  })();

  const warnings: string[] = [];
  const errors: string[] = [];
  if (hasBracketMismatch) {
    errors.push(
      'YAML-SYNTAX-ERROR: Direct JSON bracket nesting is unbalanced. Statuz prefers strict plain tabbed YAML structures for clean agent streams.',
    );
  }
  if (isMemoryPolluted) {
    warnings.push(
      'CRITICAL MISALIGNMENT: Statuz is strictly designed for Situated Runtime Alignment, NOT as a memory vector storage. Embedding arrays pollute runtime context.',
    );
  }
  if (isMcpReplaced) {
    warnings.push(
      'SPECIFICATION VIOLATION: Statuz is a layer above the transport layer. It complements Model Context Protocol (MCP) rather than replacing it.',
    );
  }

  const driftScore = computeDrift(
    forceCustomDrift,
    fileMedsCount,
    sessionCostUsd,
    activePreset.id === 'preset3',
    isMemoryPolluted,
  );

  let statusLabel = 'ALIGNED';
  let statusColor = '#10b981';
  let statusDesc =
    'Agent operates safely within its ecological niche boundaries.';

  if (driftScore >= 0.2 && driftScore < 0.5) {
    statusLabel = 'CALIBRATION_WARNING';
    statusColor = '#f97316';
    statusDesc =
      'Minor behavioral drift observed. Calibration layer is monitoring path pings.';
  } else if (driftScore >= 0.5) {
    statusLabel = 'SYN_ESCALATION_TRIGGERED';
    statusColor = '#ef4444';
    statusDesc =
      'DRIFT THRESHOLD BREACHED. Auto-execution HALTED. Requesting immediate Human Strategic Sync authorization.';
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2 pb-1 border-b border-zinc-100">
        {YAML_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => setSelectedPresetId(preset.id)}
            className={`px-3 py-2 text-xs font-mono border transition-all ${
              selectedPresetId === preset.id
                ? 'bg-zinc-950 text-white border-zinc-950 font-semibold'
                : 'bg-white text-zinc-500 border-zinc-200 hover:text-zinc-900'
            }`}
            style={{
              borderRadius: config.radius === 'none' ? '0' : '0.25rem',
            }}
          >
            {preset.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
        <div className="xl:col-span-7 flex flex-col">
          <div className="bg-zinc-900 border border-zinc-800 p-2.5 flex items-center justify-between rounded-t-lg">
            <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-2">
              <Code className="w-3.5 h-3.5 text-zinc-500" />
              {activePreset.fileName}
            </span>
            <span className="text-[10px] font-mono text-zinc-500 bg-zinc-950/80 px-2 py-0.5 rounded">
              YAML Syntax
            </span>
          </div>

          <div className="relative flex-1">
            <textarea
              value={yamlText}
              onChange={(e) => setYamlText(e.target.value)}
              className="w-full h-[380px] bg-zinc-950 text-zinc-50 text-xs font-mono p-5 leading-relaxed focus:outline-none focus:ring-0 resize-none border-x border-b border-zinc-800 rounded-b-lg font-light selection:bg-zinc-700/60 block"
              spellCheck={false}
              placeholder="Paste or write your own statuz.yaml configuration..."
            />

            <div className="absolute bottom-3 right-3 bg-zinc-900 px-3 py-1 border border-zinc-800 text-[10px] font-mono text-zinc-500 rounded">
              Lines: {yamlText.split('\n').length} | Chars: {yamlText.length}
            </div>
          </div>

          <div className="mt-3 p-3 bg-zinc-50 border border-zinc-150 text-xs font-sans text-zinc-500 rounded-md">
            <strong className="text-zinc-700">Sandbox Protip:</strong> Try
            typing{' '}
            <code className="bg-zinc-200 px-1 font-mono text-[11px] rounded">
              vector_db: true
            </code>{' '}
            inside the editor on the left to see the verification parser
            trigger a customized design constraint warning on the right!
          </div>
        </div>

        <div className="xl:col-span-5 flex flex-col">
          <div
            className="border border-zinc-200 bg-white p-5 md:p-6 flex flex-col justify-between h-full shadow-sm"
            style={{
              borderRadius: config.radius === 'none' ? '0' : '0.5rem',
            }}
          >
            <div>
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block mb-4">
                Real-Time Validation Engine
              </span>

              <div
                className="p-4 border border-zinc-150/80 mb-5 relative overflow-hidden transition-all duration-300"
                style={{
                  borderRadius: config.radius === 'none' ? '0' : '0.375rem',
                  borderLeft: `4px solid ${statusColor}`,
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="text-xs font-mono font-bold tracking-wider"
                    style={{ color: statusColor }}
                  >
                    {statusLabel}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    Drift: {(driftScore * 100).toFixed(0)}%
                  </span>
                </div>

                <div className="w-full h-1.5 bg-zinc-100 rounded-full my-2 overflow-hidden">
                  <div
                    className="h-full transition-all duration-500 rounded-full"
                    style={{
                      width: `${driftScore * 100}%`,
                      backgroundColor: statusColor,
                    }}
                  />
                </div>

                <p className="text-xs text-zinc-650 mt-1 leading-relaxed font-sans">
                  {statusDesc}
                </p>
              </div>

              <div className="space-y-4 mb-6 border-b border-zinc-100 pb-5">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
                  Simulate Runtime Variables
                </span>

                <div>
                  <div className="flex justify-between text-xs font-sans mb-1.5">
                    <span className="text-zinc-600 flex items-center gap-1">
                      Unapproved File Updates
                    </span>
                    <span className="font-mono text-zinc-900 font-semibold">
                      {fileMedsCount} paths
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={5}
                    value={fileMedsCount}
                    onChange={(e) =>
                      setFileMedsCount(Number(e.target.value))
                    }
                    className="w-full accent-zinc-950 h-1 bg-zinc-150 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-[10px] text-zinc-400 block mt-0.5">
                    Modifying files outside declared niche bounds increments
                    drift vectors.
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-sans mb-1.5">
                    <span className="text-zinc-600">
                      Model Session spend rate
                    </span>
                    <span className="font-mono text-zinc-950 font-semibold">
                      ${sessionCostUsd.toFixed(2)} USD
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={20}
                    step={0.5}
                    value={sessionCostUsd}
                    onChange={(e) =>
                      setSessionCostUsd(Number(e.target.value))
                    }
                    className="w-full accent-zinc-950 h-1 bg-zinc-150 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-[10px] text-zinc-400 block mt-0.5">
                    Ecosystem thresholds trigger SYN escalation once limits
                    are exceeded.
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-sans mb-1.5">
                    <span className="text-zinc-600">Custom baseline drift</span>
                    <span className="font-mono text-zinc-950 font-semibold">
                      {forceCustomDrift.toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={0.5}
                    step={0.01}
                    value={forceCustomDrift}
                    onChange={(e) =>
                      setForceCustomDrift(Number(e.target.value))
                    }
                    className="w-full accent-zinc-950 h-1 bg-zinc-150 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 min-h-[100px] flex flex-col justify-end">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                Compliance System Trace
              </span>

              {errors.length === 0 && warnings.length === 0 ? (
                <div className="bg-zinc-50 border border-zinc-150/60 p-3 rounded flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-zinc-600 font-sans">
                    <strong>All checks passed.</strong> The current YAML
                    structure aligns seamlessly with optimal design patterns.
                    No vector bloat or MCP conflicts found.
                  </p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[160px] overflow-y-auto">
                  {errors.map((err, idx) => (
                    <div
                      key={`err-${idx}`}
                      className="bg-red-50 border border-red-200 text-red-800 text-[11px] font-mono p-2.5 rounded flex items-start gap-2 select-text"
                    >
                      <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span>{err}</span>
                    </div>
                  ))}
                  {warnings.map((warn, idx) => (
                    <div
                      key={`warn-${idx}`}
                      className="bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono p-2.5 rounded flex items-start gap-2 select-text"
                    >
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{warn}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Hidden usage to avoid unused-import warnings in strict tsc runs */}
      <span className="hidden">
        <RefreshCw />
      </span>
    </div>
  );
}
