import { useTheme } from '../context/ThemeContext';
import { statuzRows } from '../data';

interface Props {
  onClose: () => void;
}

export default function TokenInspector({ onClose }: Props) {
  const { config } = useTheme();

  return (
    <div className="h-full flex flex-col">
      <div className="px-5 py-4 border-b border-zinc-200 flex items-center justify-between">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
            Token Inspector
          </div>
          <div className="font-display text-base text-zinc-900 mt-1">System variables</div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="h-8 w-8 flex items-center justify-center rounded-xs border border-zinc-200 hover:border-zinc-400 text-zinc-600"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
        <section>
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-2">
            current theme
          </div>
          <div className="font-mono text-xs text-zinc-700 bg-zinc-50 border border-zinc-200 rounded-xs p-3 leading-relaxed">
            <div>theme: {config.theme}</div>
            <div>accent: {config.accent}</div>
            <div>radius: {config.radius}px</div>
            <div>density: {config.density}</div>
          </div>
        </section>

        <section>
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-2">
            status.variables
          </div>
          <table className="w-full text-xs font-mono">
            <tbody>
              {statuzRows.map(row => (
                <tr key={row.field} className="border-b border-zinc-100 last:border-b-0">
                  <td className="py-2 pr-3 text-zinc-500">{row.field}</td>
                  <td className="py-2 text-zinc-800">{row.value}</td>
                  <td className="py-2 text-right text-[10px] uppercase tracking-wider text-zinc-400">
                    {row.source}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-2">
            tokens.imports
          </div>
          <div className="font-mono text-[11px] text-zinc-600 bg-zinc-50 border border-zinc-200 rounded-xs p-3 leading-relaxed">
            <div>--font-sans: Inter</div>
            <div>--font-display: Space Grotesk</div>
            <div>--font-mono: JetBrains Mono</div>
            <div>--color-brand-black: #050505</div>
            <div>--color-brand-gray: #8A8A93</div>
          </div>
        </section>
      </div>
    </div>
  );
}
