import { siteMeta, toolchain } from '../data';

export default function FooterSection() {
  return (
    <footer className="py-16">
      <div className="mx-auto px-4 grid grid-cols-12 gap-8 text-sm" style={{ maxWidth: 1200 }}>
        <div className="col-span-12 md:col-span-4">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-zinc-950" />
            <span className="font-display text-zinc-950 text-lg">statuz</span>
            <span className="font-mono text-[11px] text-zinc-400">v{siteMeta.version}</span>
          </div>
          <p className="mt-4 text-zinc-600 max-w-prose leading-relaxed">
            {siteMeta.fullTagline}
          </p>
          <div className="mt-4 text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
            maintainer · {siteMeta.maintainer} · {siteMeta.company}
          </div>
        </div>

        <div className="col-span-6 md:col-span-2">
          <div className="label">protocol</div>
          <ul className="mt-3 space-y-2 text-zinc-700">
            <li><a href="#stack" className="hover:text-zinc-950">layer stack</a></li>
            <li><a href="#sandbox" className="hover:text-zinc-950">yaml sandbox</a></li>
            <li><a href="#terminal" className="hover:text-zinc-950">command terminal</a></li>
            <li><a href="#compare" className="hover:text-zinc-950">comparison</a></li>
          </ul>
        </div>

        <div className="col-span-6 md:col-span-2">
          <div className="label">npm packages</div>
          <ul className="mt-3 space-y-2 text-zinc-700">
            {toolchain.filter((t) => t.registry === 'npm').slice(0, 4).map((t) => (
              <li key={t.package}>
                <a href={t.url} target="_blank" rel="noreferrer" className="hover:text-zinc-950">
                  {t.package} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-6 md:col-span-2">
          <div className="label">project</div>
          <ul className="mt-3 space-y-2 text-zinc-700">
            <li><a href={siteMeta.repoUrl} target="_blank" rel="noreferrer" className="hover:text-zinc-950">github ↗</a></li>
            <li><a href={siteMeta.issuesUrl} target="_blank" rel="noreferrer" className="hover:text-zinc-950">issues ↗</a></li>
            <li><a href={siteMeta.npmUrl} target="_blank" rel="noreferrer" className="hover:text-zinc-950">npm ↗</a></li>
            <li><a href="#principles" className="hover:text-zinc-950">principles</a></li>
            <li><a href="#roadmap" className="hover:text-zinc-950">roadmap</a></li>
          </ul>
        </div>

        <div className="col-span-6 md:col-span-2">
          <div className="label">legal</div>
          <div className="mt-3 text-zinc-700 leading-6 text-[0.85rem]">
            Released under the
            {' '}
            <a href={siteMeta.repoUrl + '/blob/main/LICENSE'} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-zinc-950">
              {siteMeta.license}
            </a>
            .
            <br />
            Protocol version: statuz/v1
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 pt-5 border-t border-zinc-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] font-mono text-zinc-500" style={{ maxWidth: 1200, paddingInline: '1rem' }}>
        <span>© {new Date().getFullYear()} Statuz · Situated Alignment Ecosystem</span>
        <span>protocol: statuz/v1 · live session</span>
      </div>
    </footer>
  );
}
