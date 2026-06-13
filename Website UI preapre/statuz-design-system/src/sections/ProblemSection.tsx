import { useTheme } from '../context/ThemeContext';

export default function ProblemSection() {
  const { config } = useTheme();
  const borderRadius = config.radius === 'none' ? '0' : '0.75rem';

  return (
    <section className="mb-16">
      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-950 text-zinc-100 p-8 md:p-12 relative overflow-hidden"
        style={{ borderRadius }}
      >
        <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-r from-transparent to-zinc-700" />
        <div className="absolute bottom-0 left-0 w-24 h-[1px] bg-gradient-to-r from-zinc-700 to-transparent" />

        <div className="lg:col-span-6 space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-[#ef4444] uppercase font-bold block">
            The Fragmentation Threat
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-none">
            AI Agents are ecologically blind after context resets.
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed font-sans">
            Every time your LLM agent restarts, receives a new API routing
            request, or experiences a task handoff, it suffers a complete cold
            amnesia. Typical memory systems try to dump thousands of dry
            vector embedding history tokens back into context—polluting
            context windows, bloating billing APIs, and slowing runtime
            parameters down.
          </p>

          <div className="space-y-2 pt-2">
            {[
              {
                title: 'Session Fragmentation',
                desc: 'Fast failures picking up active state pipelines.',
              },
              {
                title: 'Ecological Blindness',
                desc: 'Agents cannot locate downstream or upstream boundaries.',
              },
              {
                title: 'Strategic Drift',
                desc: 'Inability to evaluate if an action violates guidelines until too late.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-2.5 text-xs"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ef4444] mt-1.5" />
                <p className="text-zinc-300">
                  <strong>{item.title}:</strong> {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 border border-zinc-800 bg-zinc-900 p-5 rounded-xl font-mono text-[11px] space-y-4 shadow-2xl">
          <span className="text-zinc-500 uppercase font-bold text-[10px] tracking-wider block border-b border-zinc-800 pb-2">
            Memory system vs. Statuz Alignment State
          </span>

          <div>
            <div className="flex items-center justify-between text-zinc-400 mb-1.5">
              <span className="text-red-400">
                $ Typical Memory Dump (Unhandles State)
              </span>
              <span>12,000 Tokens Bloat</span>
            </div>
            <div className="bg-zinc-950 p-3 rounded text-zinc-500 max-h-[85px] overflow-hidden truncate whitespace-pre-line text-left leading-relaxed">
              ... USER: &quot;What are you doing again?&quot;
              <br />
              ASSISTANT (vector retrieval): &quot;Based on 47 previous
              session logs, you queried about CSS styling trends in 2024.
              Then you initiated an Express router debug. Let me list the
              entire transaction stack...&quot;
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-zinc-400 mb-1.5">
              <span className="text-emerald-400">
                $ Statuz State Recovery (.statuz/statuz.yaml)
              </span>
              <span>142 Words (Minimal)</span>
            </div>
            <div className="bg-zinc-950 p-3 rounded text-zinc-100 border border-emerald-900/40 text-left select-all">
              <span className="text-zinc-550 italic">
                # sub-millisecond recover loop
              </span>
              <br />
              identity: &quot;helper-04&quot;
              <br />
              goal: &quot;Migrate styling from custom CSS to Tailwind v4
              utilities&quot;
              <br />
              progress: {'{'} completed_files: 14, current_target:
              &quot;src/components/Navigation.tsx&quot; {'}'}
              <br />
              next_action: &quot;Parse src/components/Navigation.tsx for
              inline classes&quot;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
