export default function TopInfoBar() {
  return (
    <div className="bg-zinc-950 text-white py-2 px-4 text-center text-xs font-mono select-none tracking-tight flex items-center justify-between relative z-40">
      <div className="flex items-center gap-1.5 leading-none">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Statuz Beta v0.5.0 Calibration Console</span>
      </div>
      <p className="hidden md:block opacity-60 text-[11px]">
        Maintainer: ceaserzhao (Oasis Company) | License: Apache-2.0
      </p>
      <span className="text-[11px] opacity-70">calibrated · 631ms ago</span>
    </div>
  );
}
