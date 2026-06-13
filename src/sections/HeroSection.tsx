import { siteMeta } from '../data';

export default function HeroSection() {
  return (
    <section id="top" className="pt-12 pb-20 border-b border-zinc-200">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8">
          <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-500">
            {siteMeta.name} · {siteMeta.tagline}
          </div>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl text-zinc-950 tracking-tight leading-[1.05]">
            Agents that keep their promises —
            <span className="block text-zinc-500 font-sans font-light">
              recorded, versioned, and anchored to human intent.
            </span>
          </h1>

          <p className="mt-8 text-zinc-600 text-base sm:text-lg max-w-2xl leading-relaxed">
            Statuz is an open protocol and toolchain optimizing agent status recovery, ecological
            boundaries, calibration drift detection, and human strategic synchronization contracts.
            It treats agents not as black boxes, but as <em className="not-italic text-zinc-900">observables</em>.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#sandbox"
              className="inline-flex items-center gap-2 text-sm font-mono text-white bg-zinc-950 hover:bg-zinc-800 rounded-sm px-4 py-2.5 transition-colors"
            >
              open sandbox →
            </a>
            <a
              href="#stack"
              className="inline-flex items-center gap-2 text-sm font-mono text-zinc-800 border border-zinc-200 hover:border-zinc-400 rounded-sm px-4 py-2.5 transition-colors"
            >
              read the stack
            </a>
            <span className="text-[11px] font-mono text-zinc-500 ml-1 hidden sm:inline">
              beta · v{siteMeta.version}
            </span>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <div className="rounded-sm border border-zinc-200 overflow-hidden">
            <div className="bg-zinc-950 text-zinc-100 px-4 py-3 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider">
              <span>session · live</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                streaming
              </span>
            </div>
            <div className="font-mono text-[12.5px] text-zinc-800 bg-white px-4 py-4 leading-7">
              <div><span className="text-zinc-400">protocol</span>      statuz/v1</div>
              <div><span className="text-zinc-400">session.id</span>    sess_8F2a...e1</div>
              <div><span className="text-zinc-400">agent.id</span>      agent_ceaserzhao</div>
              <div><span className="text-zinc-400">envelope</span>      research/docs,web:read</div>
              <div><span className="text-zinc-400">tools</span>         browser, files, planner</div>
              <div><span className="text-zinc-400">calib.p50</span>     0.72 ± 0.04</div>
              <div><span className="text-zinc-400">contract</span>      deploy-statuz-website</div>
              <div><span className="text-zinc-400">milestone</span>     beta-v0.5.0</div>
              <div className="mt-2 border-t border-zinc-100 pt-2 text-zinc-500">
                last.turn · 631ms ago
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
