import React, { useState, useEffect } from 'react';
import { YamlPreset, ThemeConfig } from '../types';
import { YAML_PRESETS } from '../data';
import { AlertCircle, CheckCircle, HelpCircle, Code, Play, RefreshCw, Layers } from 'lucide-react';

interface Props {
  themeConfig: ThemeConfig;
}

export default function YamlSandbox({ themeConfig }: Props) {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('preset1');
  const activePreset = YAML_PRESETS.find((p) => p.id === selectedPresetId) || YAML_PRESETS[0];

  // Store editable YAML state
  const [yamlText, setYamlText] = useState<string>('');
  
  // Track alignment values for the live dynamic gauges
  const [fileMedsCount, setFileMedsCount] = useState<number>(0);
  const [sessionCostUsd, setSessionCostUsd] = useState<number>(1.20);
  const [forceCustomDrift, setForceCustomDrift] = useState<number>(0.05);

  // Synchronize state when selected preset changes
  useEffect(() => {
    setYamlText(activePreset.yaml);
    
    // Set some defaults based on preset
    if (activePreset.id === 'preset1') {
      setFileMedsCount(0);
      setSessionCostUsd(1.20);
    } else if (activePreset.id === 'preset2') {
      setFileMedsCount(1);
      setSessionCostUsd(2.40);
    } else {
      setFileMedsCount(4);
      setSessionCostUsd(14.50);
    }
  }, [selectedPresetId]);

  // Validation output parser
  const getValidationReport = () => {
    const safeYaml = yamlText || '';
    const lines = safeYaml.split('\n');
    const warnings: string[] = [];
    const errors: string[] = [];
    let isMemoryPolluted = false;
    let isMcpReplaced = false;
    let isYamlSyntaxBad = false;

    // Checks
    // Check for memory terms
    if (
      safeYaml.toLowerCase().includes('vector_db') ||
      safeYaml.toLowerCase().includes('vector_database') ||
      safeYaml.toLowerCase().includes('vector_store') ||
      safeYaml.toLowerCase().includes('embedding_dimension') ||
      safeYaml.toLowerCase().includes('long_term_memory')
    ) {
      isMemoryPolluted = true;
    }

    // Check for MCP replacement attempts
    if (
      safeYaml.toLowerCase().includes('mcp_replacement') ||
      safeYaml.toLowerCase().includes('replace_mcp')
    ) {
      isMcpReplaced = true;
    }

    // Basic indentation brackets checker for YAML
    let bracketCount = 0;
    for (let char of yamlText) {
      if (char === '{' || char === '[') bracketCount++;
      if (char === '}' || char === ']') bracketCount--;
    }
    if (bracketCount !== 0) {
      isYamlSyntaxBad = true;
    }

    if (isYamlSyntaxBad) {
      errors.push('YAML-SYNTAX-ERROR: Direct JSON bracket nesting is unbalanced. Statuz prefers strict plain tabbed YAML structures for clean agent streams.');
    }

    if (isMemoryPolluted) {
      warnings.push('CRITICAL MISALIGNMENT: Statuz is strictly designed for Situated Runtime Alignment, NOT as a memory vector storage. Embedding arrays pollute runtime context.');
    }

    if (isMcpReplaced) {
      warnings.push('SPECIFICATION VIOLATION: Statuz is a layer above the transport layer. It complements Model Context Protocol (MCP) rather than replacing it.');
    }

    // Dynamic Drift score calculation based on variables
    let computedDrift = forceCustomDrift;
    
    // Add weights from sliders
    if (fileMedsCount > 2) computedDrift += 0.25;
    if (sessionCostUsd > 10.00) computedDrift += 0.40;
    if (activePreset.id === 'preset3') computedDrift += 0.35;
    if (isMemoryPolluted) computedDrift += 0.20;

    computedDrift = Math.min(Math.max(computedDrift, 0.02), 1.00);

    let statusLabel = 'ALIGNED';
    let statusColor = '#10b981'; // Green
    let statusDesc = 'Agent operates safely within its ecological niche boundaries.';

    if (computedDrift >= 0.20 && computedDrift < 0.50) {
      statusLabel = 'CALIBRATION_WARNING';
      statusColor = '#f97316'; // Orange
      statusDesc = 'Minor behavioral drift observed. Calibration layer is monitoring path pings.';
    } else if (computedDrift >= 0.50) {
      statusLabel = 'SYN_ESCALATION_TRIGGERED';
      statusColor = '#ef4444'; // Red
      statusDesc = 'DRIFT THRESHOLD BREACHED. Auto-execution HALTED. Requesting immediate Human Strategic Sync authorization.';
    }

    return {
      warnings,
      errors,
      driftScore: computedDrift,
      statusLabel,
      statusColor,
      statusDesc,
      isValid: errors.length === 0,
    };
  };

  const report = getValidationReport();

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
            style={{ borderRadius: themeConfig.radius === 'none' ? '0' : '0.25rem' }}
          >
            {preset.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
        {/* Editor Box */}
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
            <strong className="text-zinc-700">Sandbox Protip:</strong> Try typing <code className="bg-zinc-200 px-1 font-mono text-[11px] rounded">vector_db: true</code> inside the editor on the left to see the verification parser trigger a customized design constraint warning on the right!
          </div>
        </div>

        {/* Validation and Metrics Board */}
        <div className="xl:col-span-5 flex flex-col">
          <div
            className="border border-zinc-200 bg-white p-5 md:p-6 flex flex-col justify-between h-full shadow-sm"
            style={{ borderRadius: themeConfig.radius === 'none' ? '0' : '0.5rem' }}
          >
            {/* Status Dial */}
            <div>
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block mb-4">
                Real-Time Validation Engine
              </span>

              {/* Status block with matching color */}
              <div 
                className="p-4 border border-zinc-150/80 mb-5 relative overflow-hidden transition-all duration-300"
                style={{ 
                  borderRadius: themeConfig.radius === 'none' ? '0' : '0.375rem',
                  borderLeft: `4px solid ${report.statusColor}`
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold tracking-wider" style={{ color: report.statusColor }}>
                    {report.statusLabel}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    Drift: {(report.driftScore * 100).toFixed(0)}%
                  </span>
                </div>
                
                {/* Visual line loading indicator mimicking continuous alignment thread */}
                <div className="w-full h-1.5 bg-zinc-100 rounded-full my-2 overflow-hidden">
                  <div 
                    className="h-full transition-all duration-500 rounded-full"
                    style={{ 
                      width: `${report.driftScore * 100}%`,
                      backgroundColor: report.statusColor 
                    }}
                  />
                </div>

                <p className="text-xs text-zinc-650 mt-1 leading-relaxed font-sans">
                  {report.statusDesc}
                </p>
              </div>

              {/* Interactive sliders to simulate drift variables */}
              <div className="space-y-4 mb-6 border-b border-zinc-100 pb-5">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
                  Simulate Runtime Variables
                </span>

                {/* Slider 1: Write boundary violations */}
                <div>
                  <div className="flex justify-between text-xs font-sans mb-1.5">
                    <span className="text-zinc-600 flex items-center gap-1">Unapproved File Updates</span>
                    <span className="font-mono text-zinc-900 font-semibold">{fileMedsCount} paths</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={fileMedsCount}
                    onChange={(e) => setFileMedsCount(parseInt(e.target.value))}
                    className="w-full accent-zinc-950 h-1 bg-zinc-150 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-[10px] text-zinc-400 block mt-0.5">
                    Modifying files outside declared niche bounds increments drift vectors.
                  </span>
                </div>

                {/* Slider 2: API cost */}
                <div>
                  <div className="flex justify-between text-xs font-sans mb-1.5">
                    <span className="text-zinc-600">Model Session spend rate</span>
                    <span className="font-mono text-zinc-950 font-semibold">${sessionCostUsd.toFixed(2)} USD</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="0.5"
                    value={sessionCostUsd}
                    onChange={(e) => setSessionCostUsd(parseFloat(e.target.value))}
                    className="w-full accent-zinc-950 h-1 bg-zinc-150 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-[10px] text-zinc-400 block mt-0.5">
                    Ecosystem thresholds trigger SYN escalation once limits are exceeded.
                  </span>
                </div>
              </div>
            </div>

            {/* Validation logs list */}
            <div className="flex-1 min-h-[100px] flex flex-col justify-end">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                Compliance System Trace
              </span>

              {report.isValid && report.warnings.length === 0 ? (
                <div className="bg-zinc-50 border border-zinc-150/60 p-3 rounded flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-zinc-600 font-sans">
                    <strong>All checks passed.</strong> The current YAML structure aligns seamlessly with optimal design patterns. No vector bloat or MCP conflicts found.
                  </p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[160px] overflow-y-auto">
                  {report.errors.map((err, idx) => (
                    <div key={idx} className="bg-red-50 border border-red-200 text-red-800 text-[11px] font-mono p-2.5 rounded flex items-start gap-2 select-text">
                      <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span>{err}</span>
                    </div>
                  ))}
                  {report.warnings.map((warn, idx) => (
                    <div key={idx} className="bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono p-2.5 rounded flex items-start gap-2 select-text">
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
    </div>
  );
}
