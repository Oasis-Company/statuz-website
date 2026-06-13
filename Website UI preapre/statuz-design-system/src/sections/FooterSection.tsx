import { Heart } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer className="border-t border-zinc-150 mt-16 pt-8 bg-zinc-50/50">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="text-zinc-950 font-display font-extrabold tracking-tight">
              Statuz
            </span>
            <span>© 2026 Oasis Company. All rights reserved.</span>
          </div>
          <div className="flex gap-4 uppercase font-mono text-[10px] mt-2 md:mt-0 tracking-wider">
            <a
              href="https://github.com/Oasis-Company/statuz/blob/main/LICENSE"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-900 transition-colors"
            >
              Apache 2.0 License
            </a>
            <a
              href="https://github.com/Oasis-Company/statuz/blob/main/SPEC.md"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-900 transition-colors"
            >
              Protocol Spec Document
            </a>
            <a
              href="https://github.com/Oasis-Company/statuz"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-900 transition-colors"
            >
              Source Code Repo
            </a>
          </div>
        </div>

        <p className="text-[10px] text-zinc-400 max-w-2xl mx-auto font-sans leading-relaxed">
          Statuz is an independent open protocol initiated by ceaserzhao.
          Every component rendered above is a high-fidelity design
          specification representation managed locally by our active
          developer core.
        </p>

        <div className="text-[11px] font-mono text-zinc-400 flex items-center justify-center gap-1.5 pt-4">
          <span>Crafted with pure black lines &amp; unbroken continuity</span>
          <Heart className="w-3 h-3 text-[red] fill-[red]" />
        </div>
      </div>
    </footer>
  );
}
