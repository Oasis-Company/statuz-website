import { useState } from 'react';
import type { FileNode } from '../data';

interface TreeNodeProps {
  node: FileNode;
  depth: number;
  key?: string;
}

function TreeNode({ node, depth }: TreeNodeProps) {
  const [open, setOpen] = useState<boolean>(depth < 1 || node.highlighted === true);

  const hasChildren = node.children && node.children.length > 0;
  const indent = { paddingLeft: `${depth * 16 + 8}px` };

  if (node.type === 'file') {
    return (
      <div style={indent} className="py-1.5 border-b hairline last:border-b-0">
        <div className="flex items-baseline gap-3">
          <span className="mono text-xs text-ink-40 w-1.5">·</span>
          <span className={`mono text-sm ${node.highlighted ? 'text-ink font-medium' : 'text-ink-80'}`}>
            {node.name}
          </span>
          {node.cadence && (
            <span className="mono text-xs text-ink-40 hidden md:inline">
              {node.cadence}
            </span>
          )}
          {node.whoUpdates && (
            <span className={`mono text-xs ${node.whoUpdates === 'human' ? 'text-ink' : 'text-ink-40'} hidden md:inline`}>
              [{node.whoUpdates}]
            </span>
          )}
        </div>
        {node.purpose && (
          <div className="mt-0.5 ml-4 text-sm text-ink-60 leading-relaxed max-w-2xl">
            {node.purpose}
          </div>
        )}
      </div>
    );
  }

  // directory
  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        style={indent}
        className="w-full text-left py-1.5 border-b hairline hover:bg-ink-05 transition-colors"
      >
        <div className="flex items-baseline gap-3">
          <span className="mono text-xs text-ink-40 w-1.5">{open ? '▾' : '▸'}</span>
          <span className={`mono text-sm ${node.highlighted ? 'text-ink font-medium' : 'text-ink-80'}`}>
            {node.name}/
          </span>
          {node.purpose && (
            <span className="text-xs text-ink-40 hidden md:inline">
              {node.purpose}
            </span>
          )}
        </div>
      </button>

      {open && hasChildren && (
        <div>
          {node.children!.map((child, idx) => (
            <TreeNode key={`${child.name}-${idx}`} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

interface Props {
  tree: FileNode[];
}

export default function DirectoryTree({ tree }: Props) {
  return (
    <div className="border hairline rounded-sm overflow-hidden bg-white">
      <div className="bg-ink text-white px-5 py-3 flex items-center justify-between text-xs mono">
        <span>filesystem · click directories to expand</span>
        <span className="hidden md:flex items-center gap-4 text-white/55">
          <span>cadence</span>
          <span>who updates</span>
        </span>
      </div>

      <div>
        {tree.map((node, idx) => (
          <TreeNode key={`${node.name}-${idx}`} node={node} depth={0} />
        ))}
      </div>

      <div className="bg-ink-05 px-5 py-3 border-t hairline text-xs text-ink-60 mono">
        legend: [human] = human-governed · [agent] = agent-written · [both] = collaborative
      </div>
    </div>
  );
}
