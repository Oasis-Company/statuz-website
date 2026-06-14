import { siteMeta } from '../data';

interface Props {
  onClose: () => void;
}

export default function TokenInspector({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-ink/20 backdrop-blur-sm" />
      <aside
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md h-full bg-white shadow-xl border-l hairline animate-in slide-in-from-right"
      >
        <div className="px-6 py-5 border-b hairline flex items-center justify-between">
          <div>
            <div className="label">Token Inspector</div>
            <div className="mt-1 font-display text-lg text-ink">System Variables</div>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 flex items-center justify-center rounded-sm border hairline text-ink-60 hover:text-ink"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
          <section>
            <div className="label">protocol</div>
            <div className="mt-3 border hairline rounded-sm p-4 bg-ink-05 mono text-[0.82rem] text-ink-80 leading-7">
              <div>
                <span className="text-ink-40">protocol</span> &nbsp;statuz/v1
              </div>
              <div>
                <span className="text-ink-40">site</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;{siteMeta.name}
              </div>
              <div>
                <span className="text-ink-40">version</span> &nbsp;&nbsp;{siteMeta.version}
              </div>
              <div>
                <span className="text-ink-40">maintainer</span>&nbsp;{siteMeta.maintainer}
              </div>
              <div>
                <span className="text-ink-40">company</span> &nbsp;&nbsp;Oasis Company
              </div>
            </div>
          </section>

          <section>
            <div className="label">live status</div>
            <div className="mt-3 border hairline rounded-sm overflow-hidden">
              {[
                ['session.id', 'sess_8F2a...e1'],
                ['agent.id', 'agent_ceaserzhao'],
                ['envelope', 'research/docs, web:read'],
                ['tools.enabled', 'browser, files, planner'],
                ['calibration.p50', '0.72 ± 0.04'],
                ['human.contract', 'deploy-statuz-website'],
                ['milestone', 'beta-v0.5.0'],
                ['last.turn', '631ms ago'],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-[130px_1fr] gap-3 px-4 py-2 text-[0.82rem] mono border-b hairline last:border-b-0"
                >
                  <span className="text-ink-40">{k}</span>
                  <span className="text-ink-80 truncate">{v}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="label">typography & tokens</div>
            <div className="mt-3 border hairline rounded-sm p-4 bg-ink-05 mono text-[0.82rem] text-ink-80 leading-7">
              <div>
                <span className="text-ink-40">font.sans</span>&nbsp;&nbsp;&nbsp; Inter
              </div>
              <div>
                <span className="text-ink-40">font.display</span>&nbsp; Space Grotesk
              </div>
              <div>
                <span className="text-ink-40">font.serif</span>&nbsp;&nbsp;&nbsp; Newsreader
              </div>
              <div>
                <span className="text-ink-40">font.mono</span>&nbsp;&nbsp;&nbsp;&nbsp; JetBrains Mono
              </div>
              <div className="border-t hairline mt-3 pt-3">
                <span className="text-ink-40">palette</span>&nbsp;&nbsp;&nbsp;&nbsp; ink · paper · hairline
              </div>
              <div>
                <span className="text-ink-40">radius</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; small · 2–4px
              </div>
              <div>
                <span className="text-ink-40">motion</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; draw-in ·
                slide-in-from-right
              </div>
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}
