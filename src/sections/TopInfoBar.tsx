export default function TopInfoBar() {
  return (
    <div className="bg-ink text-white">
      <div
        className="mx-auto px-4 py-2 flex items-center justify-between text-[0.7rem] mono leading-none"
        style={{ maxWidth: 1200 }}
      >
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-white" />
          <span>Statuz Beta v0.5.0 — Situated Alignment Runtime</span>
        </div>
        <p className="hidden md:block opacity-70">
          maintainer: ceaserzhao · Oasis Company · Apache-2.0
        </p>
        <span className="opacity-70 hidden sm:inline">protocol: statuz/v1</span>
      </div>
    </div>
  );
}
