import { useEffect, useState } from 'react';
import type { CliCommand, ThemeConfig } from '../types';
import { CLI_COMMANDS } from '../data';
import { Terminal, Clipboard, Check, RefreshCw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface Props {
  themeConfig?: ThemeConfig;
}

export default function CommandTerminal({
  themeConfig: propConfig,
}: Props) {
  const ctx = useTheme();
  const config = propConfig ?? ctx.config;
  const [activeCmdIdx, setActiveCmdIdx] = useState<number>(0);
  const activeCommand: CliCommand = CLI_COMMANDS[activeCmdIdx];

  const [simLines, setSimLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const runSimulation = (): void => {
    setIsTyping(true);
    setSimLines([]);
    let lineIdx = 0;
    const lines = activeCommand.outputSim;
    const interval = setInterval(() => {
      if (lineIdx < lines.length) {
        setSimLines((prev) => [...prev, lines[lineIdx]]);
        lineIdx++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 450);
  };

  useEffect(() => {
    runSimulation();
    // Intentionally don't re-run on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCmdIdx]);

  const copyToClipboard = (): void => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(activeCommand.name);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      <div className="lg:col-span-4 flex flex-col gap-2.5 justify-between">
        <div className="space-y-2">
          <label className="text-xs font-mono text-zinc-400 tracking-wider uppercase block mb-1">
            CLI Toolchain Operations
          </label>

          {CLI_COMMANDS.map((cmd, idx) => {
            const isSel = idx === activeCmdIdx;
            return (
              <button
                key={cmd.name}
                onClick={() => {
                  if (!isTyping) {
                    setActiveCmdIdx(idx);
                  }
                }}
                disabled={isTyping}
                className={`w-full text-left p-3.5 border transition-all text-xs font-mono flex items-center justify-between ${
                  isSel
                    ? 'bg-zinc-950 text-white border-zinc-950 font-semibold'
                    : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400 disabled:opacity-55'
                }`}
                style={{
                  borderRadius: config.radius === 'none' ? '0' : '0.25rem',
                }}
              >
                <span>$ {cmd.name}</span>
                <span className="text-[10px] text-zinc-400 font-light">
                  {cmd.name === 'statuz resume'
                    ? 'Layer 1 Core'
                    : cmd.name === 'statuz validate'
                      ? 'Drift Check'
                      : 'Protocol'}
                </span>
              </button>
            );
          })}
        </div>

        <div
          className="bg-zinc-50 border border-zinc-150 p-4 font-sans mt-4"
          style={{
            borderRadius: config.radius === 'none' ? '0' : '0.375rem',
          }}
        >
          <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5 flex items-center justify-between">
            <span>Syntax Specifications</span>
            <span className="text-[10px] text-emerald-600 font-medium">
              NPM Published
            </span>
          </h4>
          <p className="text-xs text-zinc-700 leading-relaxed font-sans mb-3">
            {activeCommand.description}
          </p>

          <div className="space-y-1.5 pt-2.5 border-t border-zinc-200/60">
            <span className="text-[10.5px] font-mono text-zinc-400 block uppercase">
              Supported flags:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeCommand.args.map((arg) => (
                <span
                  key={arg}
                  className="px-1.5 py-0.5 bg-zinc-200/60 font-mono text-[10px] text-zinc-800 rounded-none border border-zinc-200"
                >
                  {arg}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-8 flex flex-col min-h-[340px]">
        <div className="bg-zinc-900 border border-zinc-800 px-4 py-3 rounded-t-lg flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono text-zinc-400 ml-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-zinc-500" />
              cli-sandbox://sh - {activeCommand.name}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={copyToClipboard}
              className="p-1 text-zinc-455 hover:text-zinc-200 cursor-copy transition-colors"
              title="Copy shell command"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Clipboard className="w-3.5 h-3.5" />
              )}
            </button>
            <button
              onClick={runSimulation}
              disabled={isTyping}
              className="p-1 text-zinc-455 hover:text-zinc-200 transition-colors disabled:opacity-30 cursor-pointer"
              title="Re-run terminal diagnostics simulation"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isTyping ? 'animate-spin' : ''}`}
              />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-zinc-950 p-5 font-mono text-xs text-zinc-150 leading-relaxed border-x border-b border-zinc-800 rounded-b-lg overflow-y-auto max-h-[380px] flex flex-col justify-between shadow-inner">
          <div className="space-y-1.5 select-text">
            <div className="flex items-center gap-2 text-zinc-400 mb-3 border-b border-zinc-900 pb-2">
              <span className="text-purple-400 font-bold">~</span>
              <span className="text-cyan-400">@statuz/playground</span>
              <span className="text-zinc-500">$</span>
              <span className="text-zinc-50 font-semibold">
                {activeCommand.name}
              </span>
              {!isTyping && (
                <span className="inline-block w-1.5 h-4 bg-zinc-400 animate-pulse ml-0.5" />
              )}
            </div>

            {simLines.map((line, idx) => {
              if (!line) return null;
              let lineClass = 'text-zinc-300';
              if (
                line.includes('✔') ||
                line.toLowerCase().includes('created') ||
                line.toLowerCase().includes('successfully')
              ) {
                lineClass = 'text-emerald-400 font-medium';
              } else if (
                line.includes('✖') ||
                line.includes('Violation') ||
                line.includes('SYN')
              ) {
                lineClass = 'text-red-400 font-semibold';
              } else if (line.includes('⚠') || line.includes('Drift')) {
                lineClass = 'text-amber-400';
              } else if (line.includes('●')) {
                lineClass = 'text-sky-300';
              } else if (line.startsWith('───')) {
                lineClass = 'text-zinc-500 font-light';
              } else if (
                line.includes('Who:') ||
                line.includes('Current Goal:') ||
                line.includes('Completed Progress:') ||
                line.includes('Checkpoint:') ||
                line.includes('Next Step:')
              ) {
                lineClass = 'text-zinc-100 font-light pl-2';
              } else if (line.includes('⚿') || line.includes('cli-')) {
                lineClass = 'text-zinc-400 italic';
              }
              return (
                <div
                  key={idx}
                  className={`${lineClass} transition-all duration-300 transform translate-x-0`}
                >
                  {line}
                </div>
              );
            })}
          </div>

          {isTyping && (
            <div className="flex items-center gap-2 text-zinc-500 italic text-[11px] font-mono mt-4 pt-2 border-t border-zinc-900/40">
              <span className="inline-block w-2.5 h-2.5 border-t-2 border-r-2 border-zinc-500 rounded-full animate-spin" />
              Agent status streaming trace outputs...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
