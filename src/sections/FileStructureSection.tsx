import DirectoryTree from '../components/DirectoryTree';
import { fileStructure } from '../data';

export default function FileStructureSection() {
  return (
    <section id="files" className="border-b hairline">
      <div className="mx-auto px-4 py-24" style={{ maxWidth: 1200 }}>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <div className="label">File Structure</div>
            <h2 className="mt-4 font-display font-medium text-[2rem] sm:text-[2.3rem] leading-tight text-ink">
              A file for every occasion.
            </h2>
            <p className="mt-4 text-ink-60 text-base leading-relaxed">
              Every file under <code className="mono bg-ink-05 px-1">.statuz/</code> has a clear purpose, an owner, and a cadence. Nothing is implicitly inferred from anything else. 
            </p>
            <p className="mt-3 text-ink-60 text-base leading-relaxed">
              The directory on the right is a complete project example — expand any directory to see a short description, who updates it, and how often.
            </p>
            <div className="mt-8 border hairline rounded-sm p-5 bg-white">
              <div className="label">key files</div>
              <div className="mt-3 space-y-2 text-sm text-ink-80">
                <div><span className="mono text-xs text-ink-400">▸ </span>
                  <code className="mono">.statuz/statuz.yaml</code> — core status
                </div>
                <div><span className="mono text-xs text-ink-400">▸ </span>
                  <code className="mono">.statuz/niche/manifest.yaml</code> — niche declaration
                </div>
                <div><span className="mono text-xs text-ink-400">▸ </span>
                  <code className="mono">.statuz/niche/syn/resolution-*.yaml</code> — human decisions
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <DirectoryTree tree={fileStructure} />
          </div>
        </div>
      </div>
    </section>
  );
}
