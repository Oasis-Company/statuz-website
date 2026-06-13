import { siteMeta } from '../data';

export default function FooterSection() {
  return (
    <footer className="py-12">
      <div className="grid grid-cols-12 gap-4 text-sm">
        <div className="col-span-12 md:col-span-5">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-zinc-950" />
            <span className="font-display text-zinc-950">statuz</span>
            <span className="font-mono text-[11px] text-zinc-400">v{siteMeta.version}</span>
          </div>
          <p className="mt-3 text-zinc-600 max-w-prose">
            An open protocol and toolchain optimizing agent status recovery, ecological boundaries,
            calibration drift detection, and human strategic synchronization contracts.
          </p>
        </div>

        <div className="col-span-6 md:col-span-3">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">protocol</div>
          <ul className="mt-3 space-y-2 text-zinc-700">
            <li><a href="#stack" className="hover:text-zinc-950">layer stack</a></li>
            <li><a href="#sandbox" className="hover:text-zinc-950">yaml sandbox</a></li>
            <li><a href="#terminal" className="hover:text-zinc-950">command terminal</a></li>
          </ul>
        </div>

        <div className="col-span-6 md:col-span-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">project</div>
          <ul className="mt-3 space-y-2 text-zinc-700">
            <li><a href="#principles" className="hover:text-zinc-950">principles</a></li>
            <li><a href="#roadmap" className="hover:text-zinc-950">roadmap</a></li>
            <li><a href="#compare" className="hover:text-zinc-950">comparison</a></li>
          </ul>
        </div>

        <div className="col-span-12 md:col-span-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">maintainer</div>
          <div className="mt-3 text-zinc-700 leading-6">
            ceaserzhao
            <br />
            Oasis Company
            <br />
            Apache-2.0
          </div>
        </div>
      </div>

      <div className="mt-10 pt-5 border-t border-zinc-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] font-mono text-zinc-500">
        <span>© {new Date().getFullYear()} Statuz · Situated Alignment Runtime</span>
        <span>protocol: statuz/v1 · calibrated: 631ms ago</span>
      </div>
    </footer>
  );
}
