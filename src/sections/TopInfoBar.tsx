import { siteMeta } from '../data';

export default function TopInfoBar() {
  return (
    <div className="bg-ink text-white">
      <div
        className="mx-auto px-4 py-2 flex items-center justify-between text-[0.7rem] mono leading-none"
        style={{ maxWidth: 1200 }}
      >
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-white" />
          <span>Statuz v{siteMeta.version} — {siteMeta.tagline}</span>
        </div>
        <nav className="hidden md:flex items-center gap-4 text-white/70">
          <a href={siteMeta.repoUrl} target="_blank" rel="noreferrer" className="hover:text-white">
            github
          </a>
          <a href={siteMeta.issuesUrl} target="_blank" rel="noreferrer" className="hover:text-white">
            issues
          </a>
          <a href={siteMeta.npmUrl} target="_blank" rel="noreferrer" className="hover:text-white">
            npm · {siteMeta.npmPackage}
          </a>
        </nav>
        <span className="opacity-70 hidden sm:inline">protocol: statuz/v1</span>
      </div>
    </div>
  );
}
