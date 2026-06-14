# Statuz Website — 内容完善 + 可交互架构图计划

> 版本：v0.5.1-content-plan · 基于源代码审计

---

## 0. 关键发现（Critical Findings）

| # | 发现 | 影响 | 优先级 |
|---|------|------|--------|
| 0.1 | **`CalibrationQuizSection` 已编写但从未在 `App.tsx` 中使用！** 完整的 3-question quiz 组件已存在但完全被遗漏 | 已写功能无法被用户访问 | 🔴 BLOCKER |
| 0.2 | **没有任何架构可视化** — 5 层 stack 只有文本描述；没有数据流图、没有关系箭头图 | 用户无法直观理解「5 层如何协作」 | 🔴 HIGH |
| 0.3 | **缺少实际内容 section** — 没有「快速开始」、没有「文件结构可视化」、没有「真实示例 YAML」、没有「谁在使用」 | 网站更像 brochure 而非文档站 | 🔴 HIGH |
| 0.4 | **各 section 左侧 intro 模式化重复** — Problem / Layer / YAML / Principles 等每个 section 都用同样的"label + h2 + p"模式，阅读体验单调 | 🟡 MEDIUM |
| 0.5 | **`HeroSection` 的"live status card"是静态的** — 只解析 YAML 前几行展示，没有 pulse/更新/任何交互 | 🟡 MEDIUM |
| 0.6 | **`LayerExplorer` 只有文本** — 用户切换 layer 时只能看到文字卡片，没有"这个层如何与其他层通信"的图示 | 🟡 MEDIUM |

---

## 1. 内容架构总览（Information Architecture）

```
TopInfoBar ── github / npm / issues / docs 链接  ✓ 已有
NavigationBar ── 锚点导航                         ✓ 已有
┌──────────────────────────────────────────────────────┐
│  HeroSection        ── 定位 + 动态 status card      │ 需增强
│  ─────────────────────────────────────────────────   │
│  ProblemSection     ── 4 个故障模式                 │ 需增强：加入示例
│  ─────────────────────────────────────────────────   │
│  ✨ ArchitectureSection  ✨  ── 新！可交互5层架构图  │ 🆕 新增
│  ─────────────────────────────────────────────────   │
│  LayerStackSection  ── 5 层详情 (点击切换)           │ 需增强：加入关系图
│  ─────────────────────────────────────────────────   │
│  ✨ FileStructureSection  ✨  ── 新！.statuz/ 目录可视化 │ 🆕 新增
│  ─────────────────────────────────────────────────   │
│  YamlSandboxSection ── YAML 编辑器                   │ 需增强：真实 schema 校验
│  ─────────────────────────────────────────────────   │
│  CliTerminalSection ── 模拟终端                      │ 需增强：更多真实命令
│  ─────────────────────────────────────────────────   │
│  ComparisonSection  ── vs Memory/MCP/etc             │ 需增强：图示化
│  ─────────────────────────────────────────────────   │
│  PrinciplesSection  ── 6 原则                       │ 可保留
│  ─────────────────────────────────────────────────   │
│  ✨ CalibrationQuizSection  ✨  ── 已写但未接入！   │ ⚠️  需要接入
│  ─────────────────────────────────────────────────   │
│  RoadmapSection     ── 0.1 → 1.0 路线图              │ ✓ 已有
└──────────────────────────────────────────────────────┘
FooterSection ── 6 列链接                             ✓ 已有
```

---

## 2. 详细修改项

### 2.1 `App.tsx` — 接入 CalibrationQuizSection + 新 section

**当前问题：**
- CalibrationQuizSection 已 import 可用，但未在 main 中使用
- 缺少架构图、文件结构、快速开始等核心内容

**修改：**
```tsx
// 在 NavigationBar 的锚点导航中新增锚点
// 在 ErrorBoundary 包裹的 section 列表中新增:
//   1. ArchitectureSection (可交互架构图)
//   2. FileStructureSection (.statuz/ 目录可视化)
//   3. CalibrationQuizSection (已存在但未接入)
```

---

### 2.2 ✨ 新增 `ArchitectureSection.tsx` — 可交互 5 层架构图

**定位：** Hero 之后、Problem 之前（即用户刚理解了"是什么"，立刻看到"如何构建"）

**核心交互：交互式竖向架构图**
```
┌────────────────────────────────────────────────────────────┐
│  left: 5-layer list       |    right: 关系/数据流图         │
│  ┌──────────────────┐     │                                │
│  │  66 — Arrow Maps◀│     │  [点击某层 → 在右侧展开它的     │
│  ├──────────────────┤     │   输入/输出/触发关系]           │
│  │  SYN             │     │                                │
│  ├──────────────────┤     │  示例 (点击 Calibration):       │
│  │  Calibration   ● │     │                                │
│  ├──────────────────┤     │     reads niche manifest       │
│  │  niche           │     │          ↓                     │
│  ├──────────────────┤     │   measures drift (task/collab/  │
│  │  Statuz Core     │     │   boundary)                    │
│  └──────────────────┘     │          ↓                     │
│                           │   if exceeds threshold →        │
│                           │   trigger SYN request           │
│                           │                                │
└────────────────────────────────────────────────────────────┘
```

**技术实现要点：**
- 新组件 `src/components/ArchitectureDiagram.tsx`
- 使用 SVG + React state（不需要外部图表库）
- 左侧：5 个堆叠的卡片，默认选中 'core'
- 右侧：根据选中层展示不同的数据流描述（文字 + SVG 箭头图）
- 每个层有自己的 mini-diagram：节点 / 输入 / 输出 / 触发条件
- 动画：箭头绘制动画（`stroke-dasharray` + `stroke-dashoffset`）
- 完全 monochrome（黑白），符合视觉规范

**在 `data.ts` 中新增数据结构：**
```typescript
export interface ArchitectureFlow {
  layerId: string;
  inputs: string[];        // 从哪里读取
  outputs: string[];       // 产出什么
  triggers: string[];      // 触发什么给上层
  relationships: string[]; // 与其他层的关系描述
}
```

---

### 2.3 ✨ 新增 `FileStructureSection.tsx` — .statuz/ 目录可视化

**定位：** LayerStack 之后、YamlSandbox 之前（用户理解了 5 层概念后，立刻看到文件在哪里）

**核心交互：可折叠的目录树**
```
.statuz/
├── statuz.yaml                          ← 默认核心，必学第一个
├── agents/
│   ├── dev-agent.yaml                    ← (可选) 多 agent
│   └── qa-agent.yaml
├── niche/
│   ├── manifest.yaml                     ← niche 声明
│   ├── signals/
│   │   ├── signal-2026-06-14.yaml        ← 信号记录
│   │   └── ...
│   ├── assessments/                      ← 信号→评估
│   ├── outcomes/                         ← 评估→结果
│   ├── calibration/                      ← 漂移检测
│   └── syn/
│       ├── request-001.yaml              ← 人类治理请求
│       └── resolution-001.yaml           ← 决策记录
└── schemas/
    ├── statuz.schema.json
    └── niche.schema.json
```

**技术实现要点：**
- 新组件 `src/components/DirectoryTree.tsx`
- 树状结构，可折叠展开（每个节点有 state）
- 点击文件节点 → 在右侧面板显示该文件的用途说明
- 重要文件（如 `statuz.yaml`, `niche/manifest.yaml`）默认高亮展开
- 每个文件有 meta：用途、频率、谁写它（agent / human）

**在 `data.ts` 中新增数据结构：**
```typescript
export interface FileNode {
  name: string;
  type: 'dir' | 'file';
  purpose?: string;        // 人类可读的用途
  whoUpdates?: 'agent' | 'human' | 'both';
  cadence?: string;
  children?: FileNode[];
  highlighted?: boolean;
}
```

---

### 2.4 `LayerStackSection` + `LayerExplorer` — 增强关系可视化

**当前：** 点击左侧 layer，右侧只显示文本卡片

**修改：** 为每个 layer 增加「迷你关系图」，在当前文本下方追加
```
[core] 的迷你图:
  ┌──────────────────────────────────┐
  │  agent turn → writes checkpoint   │
  │  ↓                                 │
  │  statuz.yaml                       │
  │  ↓                                 │
  │  resume brief → next agent reads   │
  └──────────────────────────────────┘
```

**修改文件：**
- `src/components/LayerExplorer.tsx` — 在当前内容底部追加 SVG 迷你图
- `src/data.ts` — 为 `Layer` 接口增加 `diagram` 字段（或者在 Explorer 中硬编码 5 个图示）

---

### 2.5 `HeroSection` — "live status" 增强

**当前：** 解析 YAML 前几行展示静态卡片

**修改（轻量级）：**
- 给卡片增加微小 pulse 动画（1 像素边框呼吸）
- 在卡片底部增加 "parsing · statuz/v{version} · {ts}" 时间戳
- 在卡片中显示完整的 session 元信息（不只是前几行）

**修改文件：**
- `src/sections/HeroSection.tsx` — 修改右侧卡片

---

### 2.6 `YamlSandboxSection` — 真实 schema 校验反馈

**当前：** 只能解析 top-level scalar rows，label 里说"轻量预览"

**修改：**
- 在右侧观察面板增加"schema 行"（即使不做真正的 JSON Schema 验证，也可以展示「真实 validator 会检查这些字段」的概念）
- 增加一个「常见错误」面板：用户修改 YAML 时，如果删除了必填字段（如 `identity`、`current_state.phase`），显示友好的提示
- 不需要真正的 JSON Schema 验证（避免引入新依赖），只需做轻量级结构检查

**修改文件：**
- `src/components/YamlSandbox.tsx` — 增强解析 + 增加结构校验提示

---

### 2.7 `CliTerminalSection` — 增强真实感

**当前：** `init / validate / resume / clear / help / syn request`，输出是硬编码文本

**修改：**
- 增加 `statuz status` 命令 —— 从 `defaultStatuzYaml` 动态解析并展示
- 增加 `statuz ls` 命令 —— 列出 .statuz/ 目录结构
- 为 `validate` 增加两种模式：如果 YAML 正常 → "valid ✓"；如果用户在 sandbox 中删除了必填字段 → 指向 YamlSandbox 演示
- 增加命令的 example 参数提示（`help` 输出中增加 "try: statuz resume --format=brief"）

**修改文件：**
- `src/components/CommandTerminal.tsx` — 新增命令定义

---

### 2.8 `ComparisonSection` — 图示化对比

**当前：** 纯文本表格

**修改（轻量级）：**
- 给每个 axis 增加一个 SVG 迷你 icon（不使用外部图标库）
  - vs Memory → "clock / past" 图示
  - vs MCP → "plug / connect" 图示
  - vs Skills → "package" 图示
  - vs Documentation → "book" 图示
  - vs Task Management → "todo list" 图示
- 保持黑白风格，图标是线条型（stroke），不填充

**修改文件：**
- `src/sections/ComparisonSection.tsx` — 为每行增加 SVG icon

---

### 2.9 `NavigationBar` — 新增锚点 + npm 按钮高亮

**当前：** 顶部导航 + 右侧「Token Inspector」按钮

**修改：**
- 增加新 section 的锚点链接：Architecture、Files、Calibration
- 将 npm 按钮从文字链接升级为更显眼的按钮（和 github 同级别）

**修改文件：**
- `src/sections/NavigationBar.tsx` — 增加锚点

---

### 2.10 `data.ts` — 新增内容数据

**新增接口 + 数据：**
- `ArchitectureFlow`（5 层数据流）
- `FileNode`（.statuz/ 目录树）
- `CalibrationExample`（漂移示例，供 CalibrationQuiz 展示）

**扩展现有接口：**
- `Layer` → 增加 `miniDiagram` 字段（或在 Explorer 中硬编码图示）

---

## 3. 修改文件总览（Files Touched）

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/App.tsx` | ✏️ 修改 | 接入 CalibrationQuizSection + 新增 2 个 section |
| `src/sections/NavigationBar.tsx` | ✏️ 修改 | 增加 Architecture / Files / Calibration 锚点 + 高亮 npm 按钮 |
| `src/sections/HeroSection.tsx` | ✏️ 修改 | 增强 live status 卡片 |
| `src/sections/ArchitectureSection.tsx` | 🆕 新增 | 可交互 5 层架构图 |
| `src/sections/FileStructureSection.tsx` | 🆕 新增 | .statuz/ 目录可视化 |
| `src/components/ArchitectureDiagram.tsx` | 🆕 新增 | 架构图主组件（SVG + state） |
| `src/components/DirectoryTree.tsx` | 🆕 新增 | 目录树组件 |
| `src/components/LayerExplorer.tsx` | ✏️ 修改 | 每个 layer 底部增加迷你关系图 |
| `src/components/YamlSandbox.tsx` | ✏️ 修改 | 增强解析 + 结构校验提示 |
| `src/components/CommandTerminal.tsx` | ✏️ 修改 | 新增 `status` / `ls` 命令 |
| `src/sections/ComparisonSection.tsx` | ✏️ 修改 | 每行增加 SVG icon |
| `src/data.ts` | ✏️ 修改 | 新增 ArchitectureFlow / FileNode 接口 + 数据 |

**总计：** 4 个新文件 + 8 个修改文件 = **12 个文件**

---

## 4. 依赖与约束

| 约束 | 说明 |
|------|------|
| **No 新 npm 依赖** | 所有图示用原生 SVG + React state 实现，不引入图表库 |
| **严格 monochrome** | 所有新增 UI 保持黑白风格，不使用 color |
| **不破坏现有视觉** | 新增 section 遵循现有 label + h2 + content 的布局模式 |
| **build 体积控制** | SVG 图组件不超过 ~20KB gzip |
| **无障碍** | 所有可点击元素有清晰 focus 样式；SVG 有 aria-label |

---

## 5. 风险与应对

| 风险 | 说明 | 应对 |
|------|------|------|
| 5.1 | SVG 箭头动画在某些浏览器表现不一致 | 使用 CSS transition 而非 requestAnimationFrame；提供 fallback 静态图 |
| 5.2 | CalibrationQuiz 组件接入后与其他 section 的 scroll 锚点冲突 | 检查 NavigationBar 的锚点 ID 是否与新 section 的 id 属性匹配 |
| 5.3 | 新增数据内容可能与真实 0.5.1 协议不一致 | 所有文本内容基于 `data.ts` 中已有的真实 schema 描述；在 PR 前人工核对 |
| 5.4 | 新 section 过多导致页面过长 | 每个新 section 高度控制在 2-3 屏以内；Architecture 作为核心但高度聚焦 |

---

## 6. 验证清单（Post-Implementation Check）

- [ ] `npm run build` 通过（无 TS 错误）
- [ ] `npm run lint` 通过
- [ ] 所有现有 section 的行为未改变（Problem / Yaml / CLI / Comparison / Principles / Roadmap / Footer 都正常）
- [ ] CalibrationQuizSection 正确显示并可交互
- [ ] ArchitectureSection 的 5 层点击切换正常，SVG 箭头动画可见
- [ ] FileStructureSection 的目录树可折叠展开
- [ ] NavigationBar 锚点点击跳转到正确位置
- [ ] HeroSection 的 live card 有 pulse 动画
- [ ] 所有新增内容的语言风格与现有 section 一致（英文，monospace label）
- [ ] 无彩色，只有黑白 + 灰度

---

## 7. 实施顺序（Execution Order）

```
Step 1: 紧急修复 — 接入 CalibrationQuizSection 到 App.tsx
Step 2: data.ts — 定义新接口 + 写入架构/文件数据
Step 3: 新增 ArchitectureDiagram 组件
Step 4: 新增 ArchitectureSection
Step 5: 新增 DirectoryTree 组件
Step 6: 新增 FileStructureSection
Step 7: LayerExplorer 增强 — 迷你关系图
Step 8: HeroSection 增强 — live card pulse
Step 9: YamlSandbox 增强 — 结构校验提示
Step 10: CommandTerminal 增强 — 新增 status/ls 命令
Step 11: ComparisonSection — SVG icon
Step 12: NavigationBar — 新增锚点 + npm 按钮高亮
Step 13: lint + build 验证
```
