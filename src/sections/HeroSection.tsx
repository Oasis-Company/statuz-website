import { siteMeta } from '../data';

export default function HeroSection() {
  return (
    <section id="top" className="border-b hairline">
      <div className="mx-auto px-4 pt-20 pb-24" style={{ maxWidth: 1200 }}>
        <div className="label">{siteMeta.tagline} · {siteMeta.name}</div>

        <h1 className="mt-6 font-display font-medium tracking-tight text-[2.75rem] sm:text-[3.4rem] leading-[1.02] text-ink max-w-3xl">
          Memory lets an AI remember the past.
          <span className="block text-ink-40 font-sans font-light mt-3 text-[1.8rem] sm:text-[2.2rem]">
            Statuz lets an AI understand where it stands, what matters now, and when human direction must be renewed.
          </span>
        </h1>

        <div className="mt-14 grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-ink-60 text-[1.05rem] leading-relaxed max-w-2xl">
              Statuz is an open protocol and toolchain for expressing who an agent is, what it is doing, what
              progress has been made, what else in the project ecosystem it relates to, and — the thing that
              makes it different — where it stands in relation to a human principal's intent.
            </p>
            <p className="mt-4 text-ink-60 text-[1.05rem] leading-relaxed max-w-2xl">
              It is not a vector database. It is not MCP. It is not a task manager. It is the compact,
              versioned, human-auditable runtime status that every agent workflow eventually needs.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/statuz-protocol/statuz"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm mono text-white bg-ink hover:bg-ink-80 rounded-sm px-5 py-3 transition-colors"
              >
                start on github ↗
              </a>
              <a
                href="#stack"
                className="inline-flex items-center gap-2 text-sm mono text-ink border hairline hover:bg-ink-05 rounded-sm px-5 py-3 transition-colors"
              >
                read the layer stack
              </a>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <div className="border hairline rounded-sm">
              <div className="bg-ink text-white px-5 py-3 flex items-center justify-between text-[0.7rem] mono">
                <span>session · statuz/v1</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" /> live
                </span>
              </div>
              <div className="mono text-[0.78rem] leading-7 text-ink-80 bg-ink-05/40 px-5 py-5">
                <div><span className="text-ink-40">statuz_version</span>      0.1</div>
                <div><span className="text-ink-40">agent_name</span>          dev-agent</div>
                <div><span className="text-ink-40">project</span>             statuz-website</div>
                <div><span className="text-ink-40">organization</span>        Oasis Company</div>
                <div><span className="text-ink-40">phase</span>               implementation</div>
                <div><span className="text-ink-40">task</span>                roll out niche and SYN sections</div>
                <div><span className="text-ink-40">status</span>              in_progress</div>
                <div><span className="text-ink-40">last_checkpoint</span>     copy edited · ready to rebuild</div>
                <div><span className="text-ink-40">next_action</span>         npm run build, then deploy</div>
                <div className="mt-3 pt-3 border-t hairline text-ink-40">turn · 00:06:31 ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
