import { useState } from 'react';
import type { Layer, ThemeConfig } from '../types';
import { LAYERS } from '../data';
import {
  HelpCircle,
  CheckCircle2,
  ShieldAlert,
  GitCommit,
  Compass,
  Layers,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface Props {
  themeConfig?: ThemeConfig;
}

function getLayerIcon(id: string, color: string) {
  switch (id) {
    case 'layer1':
      return <CheckCircle2 className="w-4 h-4" style={{ color }} />;
    case 'layer2':
      return <Compass className="w-4 h-4" style={{ color }} />;
    case 'layer3':
      return <ShieldAlert className="w-4 h-4" style={{ color }} />;
    case 'layer4':
      return <GitCommit className="w-4 h-4" style={{ color }} />;
    default:
      return <Layers className="w-4 h-4" style={{ color }} />;
  }
}

export default function LayerExplorer({
  themeConfig: propConfig,
}: Props) {
  const ctx = useTheme();
  const config = propConfig ?? ctx.config;
  const [selectedLayerId, setSelectedLayerId] = useState<string>(LAYERS[0].id);
  const activeLayer: Layer =
    LAYERS.find((l) => l.id === selectedLayerId) ?? LAYERS[0];

  const borderRadius =
    config.radius === 'none' ? '0' : config.radius === 'sm' ? '0.275rem' : '0.5rem';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-5 flex flex-col gap-3">
        <label className="text-xs font-mono text-zinc-400 tracking-widest uppercase mb-1">
          The 5-Layer Stack Hierarchy
        </label>

        <div className="relative">
          <div className="absolute left-[21px] top-4 bottom-4 w-[2px] bg-zinc-200 -z-10" />

          {LAYERS.map((layer) => {
            const isSelected = layer.id === selectedLayerId;
            return (
              <button
                key={layer.id}
                onClick={() => setSelectedLayerId(layer.id)}
                className={`w-full text-left p-4 mb-3 rounded-none relative flex gap-4 transition-all duration-300 group z-10 border ${
                  isSelected
                    ? 'bg-zinc-50 border-zinc-900 shadow-sm'
                    : 'bg-white border-zinc-100 hover:border-zinc-300'
                }`}
                style={{ borderRadius }}
              >
                {isSelected && (
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1"
                    style={{ backgroundColor: config.highlightColor }}
                  />
                )}

                <div
                  className={`w-10 h-10 shrink-0 border rounded-full flex items-center justify-center transition-all ${
                    isSelected ? 'bg-white shadow' : 'bg-zinc-50 group-hover:bg-white'
                  }`}
                  style={{
                    borderColor: isSelected ? config.highlightColor : 'rgba(0,0,0,0.06)',
                  }}
                >
                  {getLayerIcon(
                    layer.id,
                    isSelected ? config.highlightColor : '#a1a1aa',
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className={`font-display text-sm font-semibold tracking-tight transition-all duration-200 ${
                        isSelected ? 'text-zinc-950' : 'text-zinc-600 group-hover:text-zinc-900'
                      }`}
                    >
                      {layer.name.replace('Layer ', 'L')}
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-400 font-medium shrink-0">
                      {layer.status === 'Stable' ? 'v0.5 Stable' : 'v0.5 Draft'}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-1 group-hover:text-zinc-500 font-sans">
                    {layer.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-7">
        <div
          className="border border-zinc-200 bg-white p-6 md:p-8 flex flex-col relative transition-all shadow-sm"
          style={{
            borderRadius:
              config.radius === 'none' ? '0' : config.radius === 'sm' ? '0.375rem' : '0.85rem',
          }}
        >
          <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-zinc-950 text-white font-mono text-[9px] uppercase px-2.5 py-1 tracking-widest leading-none">
            {activeLayer.status}
          </div>

          <div className="mb-6">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 inline-block mb-1">
              Active Layer Detail
            </span>
            <h3 className="font-display text-xl font-bold tracking-tight text-zinc-900">
              {activeLayer.name}
            </h3>
            <p className="text-zinc-600 text-sm mt-3 leading-relaxed font-sans">
              {activeLayer.description}
            </p>
          </div>

          <div className="bg-zinc-50 p-4 border-l-2 border-zinc-900 mb-6 flex align-start gap-3">
            <HelpCircle className="w-5 h-5 shrink-0 text-zinc-500 mt-0.5" />
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                Core Diagnostic Question Answered:
              </p>
              <p className="text-sm font-sans font-medium text-zinc-900 mt-0.5">
                &quot;{activeLayer.answers}&quot;
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div>
              <p className="text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wider">
                Semantic Declarations:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {activeLayer.primitives.map((prim) => (
                  <span
                    key={prim}
                    className="px-2.5 py-1 bg-zinc-100 text-zinc-800 text-[11px] font-mono rounded-none border border-zinc-200/50 hover:bg-zinc-200 transition-all cursor-default"
                  >
                    {prim}
                  </span>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-150/60">
                <p className="text-[10px] text-zinc-400 leading-relaxed font-sans">
                  These primitive tokens comprise the structured API/YAML
                  contract used by the toolchain.
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Schema Syntax preview
                </span>
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full bg-zinc-200"
                  style={{ backgroundColor: config.highlightColor }}
                />
              </div>

              <div className="relative group">
                <pre className="bg-zinc-950 text-emerald-400 text-[11px] font-mono p-4 rounded-md overflow-x-auto max-h-[190px] border border-zinc-800 scrollbar-thin shadow-inner select-all">
                  <code>{activeLayer.yamlSample}</code>
                </pre>

                <span className="absolute bottom-2 right-2 text-[9px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  Interactive Preview
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
