# Statuz Website — Content Consolidation & Social Publishing Plan

> 目标：修复 18 个结构性问题 + 打通 npm 与社交链接，使网站成为可生产发布的 Statuz 协议入口。

---

## Part 0 — Research Conclusion

**已知状态**：
- `e:\ceaserzhao\github projects\statuz-website` 是一个 Vite + React + TypeScript + Tailwind v4 的交互式文档站点
- 代码库有 24 个源文件（`src/`），包含 7 个核心 section 组件、4 个工具组件、1 个 Context、1 个数据文件、1 个类型文件
- `e:\ceaserzhao\github projects\statuz` 是真实协议仓库（v0.5.1 stable），内含 CLI + TS SDK + Python SDK + MCP server + VS Code extension
- 网站当前版本 `0.5.0`（package.json）vs 协议 `0.5.1`（data.ts）— **版本漂移**
- `lucide-react`、`motion` 已安装但**零使用**
- `index.html` 中 `og:image: /statuz-logo.svg` 实际存在于 `public/`
- 类型重复：`types.ts::Layer` 与 `data.ts::Layer` 定义不同、`types.ts` 中 `QuizAnswer/StatuzRow` 从未被引用
- `ErrorBoundary` 实际上是 no-op 透传
- `ThemeContext`（Provider + useTheme hook）定义了但**无消费方**，导致 DesignSystemWizard 的主题切换完全是内部状态
- 全站 GitHub 链接指向 `github.com/statuz-protocol/statuz`（正确），但**缺失 npm、文档、Issue 等其他链接**
- `CommandTerminal` 中的命令与真实 CLI 已基本对齐；但 `clear` 走特殊分支，不在 `COMMANDS` map
- `package.json::description` 仍使用旧标签 "Situated Alignment Runtime"（应改为 "Situated Alignment Ecosystem"）

---

## Part 1 — Files & Modules to be Modified

| 序号 | 文件 | 修改类型 | 目的 |
|------|------|----------|------|
| 1 | `src/types.ts` | 删除 + 精简 | 移除死类型；将 `ThemeConfig/ThemeKey` 迁移到 Context 同文件；让 `Layer` 定义只在 `data.ts` 中存在 |
| 2 | `src/context/ThemeContext.tsx` | 修改 | 让 `density` 字段与 `types.ts` 对齐；增加类型 guard 导出 `isThemeKey`、`themeKeyLabel` |
| 3 | `src/components/ErrorBoundary.tsx` | 重写 | 从 no-op 改为真实 class ErrorBoundary：捕获错误 + 渲染可读回退 UI + `section` prop 被使用 |
| 4 | `src/data.ts` | 修改 | 新增 `repository` 字段下拆分 `repoUrl`, `npmPrefix`, `npmUrls`, `docsUrls`；新增 `npm`, `github`, `issues` 常量 |
| 5 | `src/sections/HeroSection.tsx` | 修改 | Hero 右侧的 live status 卡片从硬编码改为解析 `defaultStatuzYaml` 前几行 |
| 6 | `src/sections/TopInfoBar.tsx` | 修改 | 增加 npm 徽标/链接；更新为 `v{siteMeta.version}` |
| 7 | `src/sections/NavigationBar.tsx` | 修改 | Nav logo SVG 改为使用 CSS 变量/`currentColor` 而非硬编码 `#0a0a0a`；nav items 增加链接到 GitHub repo/issues/npm |
| 8 | `src/sections/FooterSection.tsx` | 重写 | 把 maintainer 硬编码改为 `siteMeta.*`；增加 4 个新的列：*npm packages*、*github*、*issues*、*docs* |
| 9 | `src/sections/RoadmapSection.tsx` | 修改 | 左侧 summary cards 从硬编码范围改为**基于 roadmap 数据自动计算** |
| 10 | `src/components/TokenInspector.tsx` | 修改 | 把 `Oasis Company`、`milestone: beta-v0.5.0` 改为 `siteMeta.*`；**删除无法验证的假数据**（session.id, agent.id, envelope, tools.enabled） |
| 11 | `src/components/DesignSystemWizard.tsx` | 修改 | 接入 `useTheme()`；让 theme/accent/radius/density 真正改变全局 —— 或**删除组件**并从 App 移除（静态设计展示更合适） |
| 12 | `src/components/CommandTerminal.tsx` | 修改 | `clear` 进入 `COMMANDS` map 统一处理；帮助文本列出它 |
| 13 | `src/main.tsx` | 修改 | 非空断言 `!` 改为带错误消息的 guard |
| 14 | `src/App.tsx` | 修改 | 增加 Escape 键关闭 TokenInspector；避免重复关闭逻辑 |
| 15 | `src/index.css` | 修改 | 删除 `.line-draw` 和 `@keyframes draw`（未使用）或**在 Logo 中真正使用** |
| 16 | `src/components/YamlSandbox.tsx` | 标注 | 在解析预览中标注 "lightweight preview"（不引入 js-yaml） |
| 17 | `index.html` | 修改 | `<title>` / `<meta description>` / `<meta og:title>` / `<meta og:description>` / `<meta twitter:description>` 全部统一为 "Situated Alignment Ecosystem" 文案 |
| 18 | `package.json` | 修改 | 升级 `version` 至 `0.5.1`；更新 `description`；移除 `lucide-react` 依赖（零使用） |

**共 18 个文件** — 完全映射前文审计结果。

---

## Part 2 — Detailed Modification Steps

### Step 1 — 数据文件（`data.ts`）增加 npm 链接字段
```
siteMeta:
  + repository: "github.com/statuz-protocol/statuz"
  + repoUrl: "https://github.com/statuz-protocol/statuz"
  + npmPrefix: "@statuz/statuz"
  + npmBase: "https://www.npmjs.com/package/@statuz"
  + issuesUrl: "https://github.com/statuz-protocol/statuz/issues"

toolchain 每项增加 npmUrl 字段：
  CLI → https://www.npmjs.com/package/@statuz/cli
  TS SDK → https://www.npmjs.com/package/@statuz/sdk-ts
  MCP Server → https://www.npmjs.com/package/@statuz/mcp-server
  Super Package → https://www.npmjs.com/package/@statuz/statuz
  VS Code Extension → https://marketplace.visualstudio.com/items?itemName=statuz.statuz-vscode
  Python SDK → pypi.org/project/statuz-sdk-py (非 npm，单独处理)
```

### Step 2 — `types.ts` 清理
- 删除 `Layer` 接口（与 `data.ts::Layer` 字段不同；实际仅 `data.ts` 的版本被使用）
- 删除 `QuizAnswer`、`StatuzRow`（零引用）
- 保留 `ThemeConfig`、`ThemeKey`、`density` —— 原地不动，后续步骤由 `ThemeContext.tsx` 直接引用

### Step 3 — `ErrorBoundary.tsx` 重写
- 改为 class 组件
- `static getDerivedStateFromError()` + `componentDidCatch()`
- 回退 UI：mono 字体的 `statuz error · {section}` banner，附一个 "refresh page" 按钮
- `section` prop 必须被用来标注哪个 section 崩溃

### Step 4 — TopInfoBar & NavigationBar 接入社交链接
- TopInfoBar 右侧增加: `github · issues · npm` 三个短链接（用 `siteMeta.repoUrl` / `siteMeta.issuesUrl` / `siteMeta.npmBase`）
- NavigationBar 的 GitHub 按钮保留为 `siteMeta.repoUrl`，但增加一个 `npm` 徽标 按钮（显示 `@statuz/statuz`）

### Step 5 — Hero 右侧 live status 卡片动态化
- 不做全量 YAML 解析；只提取前 6 个 key=value 行作为展示
- 用正则 `^\s*([\w.]+)\s*:\s*(.+)` 从 `defaultStatuzYaml` 前 12 行匹配
- 这样一旦 `data.ts` 更改，Hero 卡片自动跟随

### Step 6 — Roadmap summary cards 自动化
- 计算 `roadmap` 数组按 `state` 分组（stable/draft/in-progress/planned）
- 对每个分组取 `items` 数和 `version` 范围
- 左侧卡片的 "stable: 0.1 – 0.4" 等文本改为 `minVersion – maxVersion` 动态计算

### Step 7 — Footer 重写为 6 列
- 现状列：about / protocol / project / maintainer
- 新增列：**npm packages**、**github**、**issues**、**docs**（从 `siteMeta` 派生）
- 保持 mono 字体与线性视觉

### Step 8 — ThemeContext 消费方打通
- DesignSystemWizard 改为：
  - `const { config, update } = useTheme()`
  - 点击主题 → `update({ theme })`
  - 滑块 → `update({ radius })`
  - 颜色 → `update({ accent })`
- CSS 变量绑定：在 `ThemeProvider` 内已注入 `--accent`/`--radius`，但全站没有使用它们 —— 需要在关键位置（如按钮 hover 颜色、border-radius）替换
- `font-mono` 在 mono 主题下全局字体已实现

### Step 9 — CommandTerminal `clear` 统一
- `COMMANDS.clear = { help: 'clear the terminal', run: () => '' }`
- run 返回空字符串 —— 但在 `run()` 函数处理：若 cmd === 'clear' 直接清空 history 且不 append 任何行；否则走原逻辑
- help 列表自动显示 `clear`

### Step 10 — `index.html` 元数据统一
- `<title>`: `Statuz — Situated Alignment Ecosystem`
- `<meta name="description">`: `{subtitle}` 从 data.ts 文本
- `<meta property="og:title">`: 同上
- `<meta property="og:description">`: `Memory lets an AI remember the past. Statuz lets an AI understand where it stands, what matters now, and when human direction must be renewed.`
- `<meta name="twitter:title">`: 同上 title
- `<meta name="twitter:description">`: 统一为简短 slogan
- 增加 `<meta property="og:url">`: `https://statuz-protocol.github.io/statuz/`（假设）

### Step 11 — package.json 整理
- `"version": "0.5.1"`（与 data.ts 同步）
- `"description"` 更新为 "Statuz — Situated Alignment Ecosystem. Interactive documentation and live sandbox for the Statuz protocol."
- 移除 `"lucide-react"`（无使用证据）
- 保留 `"motion"` —— 虽然当前无直接使用，但 `animate-in`/`slide-in-from-right` 类在 TokenInspector 出现（Tailwind motion 插件类）。**验证这一点**：如果这是 Tailwind v4 的 motion 插件类，则保留；如果不是，则移除
- `"lint"` 与 `"typecheck"` 保持 `tsc --noEmit`
- 增加 `"format": "prettier --write \"src/**/*.{ts,tsx,css}\""`（如未来需要）

### Step 12 — main.tsx 防御性 root
```ts
const rootEl = document.getElementById('root');
if (!rootEl) {
  console.error('[statuz-website] #root element not found');
  // 直接在 body 内渲染一个错误 banner
} else {
  createRoot(rootEl).render(...);
}
```

### Step 13 — App.tsx Escape 键
```ts
useEffect(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && inspectorOpen) setInspectorOpen(false);
  };
  window.addEventListener('keydown', onKey);
  return () => window.removeEventListener('keydown', onKey);
}, [inspectorOpen]);
```
且移除 TokenInspector 外部的重复包装 div（当前在 App.tsx L83-L92 和 TokenInspector L9-L11 有两套几乎一样的 backdrop）— **选一处，保留一个**。

### Step 14 — index.css 清理
- 删除 `.line-draw` 和 `@keyframes draw`（零使用证据）
- 或**如果保留 Logo SVG 的 stroke 动画**（改用 CSS 变量绑定），则在 Logo 中真正使用它

### Step 15 — TokenInspector 内容真实化
- 移除：`session.id`, `agent.id`, `envelope`, `tools.enabled`, `calibration.p50`（无来源）
- 保留并填充：`protocol`, `site`, `version`, `maintainer`, `company`, `human.contract`（改为 `statuz-website`）、`milestone`（改为 `v{siteMeta.version}`）、`last.turn`（改为 `just now` 或构建时间）

---

## Part 3 — Dependencies & Considerations

- **npm package URLs**：`@statuz/cli`、`@statuz/sdk-ts`、`@statuz/mcp-server`、`@statuz/statuz` 必须真实存在于 npmjs.com。**风险**：若包未发布，链接将 404 —— 在 Footer/TopInfoBar 显示前需人工确认。PyPI (`statuz-sdk-py`) 与 VS Code Marketplace 同理。
- **GitHub org 确认**：`statuz-protocol` 必须是真实 org；目前仓库链接与 package.json 描述一致，风险低。
- **Tailwind v4 与 motion**：`motion: "^12.23.24"` 的目的是 Tailwind v4 的 motion 插件（`animate-in`、`slide-in-from-right` 等类）。**验证**：`vite.config.ts` 是否注册了 motion 插件？如果不是，则这些动画类不会生效，需要补注册或降级为手写 CSS。
- **Hero 右侧 live status 的 "dynamic" 实现**：避免循环依赖。方案：解析 `defaultStatuzYaml` 的前 N 行 —— 这是纯同步操作，不引入任何运行时依赖。
- **Roadmap summary cards 的自动计算**：需要定义 `version` 字段的排序规则（`"0.4.1"` vs `"0.4"`）— 用 `semver.lt` 太重；用自定义 `versionToTuple` 即可。
- **DesignSystemWizard 的"主题生效"**：需要在至少 3~5 个关键视觉元素（按钮、边框、卡片 radius）中真正消费 `--accent` 与 `--radius`，否则用户会困惑"我改了什么都没发生"。**风险最高的改动**，但一旦打通将显著提高网站可信度。
- **ErrorBoundary 的 class 组件写法**：React 19 中 class component 仍然支持，但未来会逐步让函数组件 + hooks 更主流。选择 class 是因为目前 hooks 版 ErrorBoundary 不可用（`use` 钩子还没到这一步）。这是标准做法。

---

## Part 4 — Risk Handling

| 风险 | 概率 | 影响 | 处理策略 |
|------|------|------|----------|
| npm 包 URL 404 | 中 | 中（损坏用户信任） | 在 data.ts 中为每个包设置 `published: boolean`；未发布的包不渲染链接 |
| Tailwind v4 motion 插件未注册 → `animate-in` 类无效 | 高 | 低（视觉效果弱） | 在 `vite.config.ts` 确认 motion 插件；若无效则改为手写 CSS transition |
| DesignSystemWizard 改动过大 → 主题切换在低版本浏览器错位 | 中 | 中 | 用 CSS 变量而非 style 属性；fallback 到 ink/paper 固定色 |
| Hero "live status" 正则与 YAML 结构脱节 | 低 | 低 | 保留 `try/catch`，解析失败时回退到默认 |
| package.json 移除 `lucide-react` 可能打破未知使用 | 低 | 低 | grep 已确认零引用；安全 |
| ErrorBoundary class 写法在未来迁移 React 19 → hooks | 低 | 低 | class component 写法是目前唯一可用的错误边界写法 |

---

## Part 5 — Verification / Acceptance Criteria

1. `npm run lint` → exit 0（无类型错误）
2. `npm run build` → exit 0 且构建产物 < 300KB gzip
3. 在浏览器中打开：
   - Hero 右侧 live status 显示 `statuz_version: 0.1`、`agent_name: dev-agent` 等（与 data.ts 一致）
   - Footer 有 **github**、**npm**、**issues**、**docs** 四个新的链接列
   - TopInfoBar 展示 `v0.5.1`（而非 `v0.5.0`）
   - Roadmap summary cards 显示正确版本范围（应包含 0.4.1 Hardening）
   - DesignSystemWizard 切换主题 → 视觉元素响应（若保留组件）
   - TokenInspector 不展示 `session.id`、`agent.id` 等无法验证的字段
   - 点击 Nav GitHub / npm 按钮 → 跳到正确的 URL
4. 故意在一个 section 中抛错误 → ErrorBoundary 渲染 `statuz error · {section}` 回退 banner
5. 终端命令 `help` → 列出包括 `clear` 在内的所有命令
6. 按 Escape → TokenInspector 关闭
7. 验证 `package.json::version`、`data.ts::siteMeta.version`、`index.html` meta 均为 0.5.1（或至少一致）

---

## Part 6 — Change-by-Change Checklist

- [ ] 01 data.ts 新增 npm / github / issues / docs URL 字段
- [ ] 02 data.ts toolchain 项加入 npmUrl / vsxUrl / pypiUrl
- [ ] 03 types.ts 删除 Layer / QuizAnswer / StatuzRow
- [ ] 04 ErrorBoundary 重写为真实 class component
- [ ] 05 package.json 升级到 0.5.1，更新 description
- [ ] 06 package.json 移除 lucide-react（无使用证据）
- [ ] 07 package.json 评估是否移除 / 保留 motion
- [ ] 08 index.html 元数据统一为 "Situated Alignment Ecosystem"
- [ ] 09 main.tsx root 防御性检查
- [ ] 10 TopInfoBar 接入 siteMeta + 添加 npm / issues 链接
- [ ] 11 NavigationBar logo SVG 使用 currentColor + npm 按钮
- [ ] 12 HeroSection 右侧 live status 从 defaultStatuzYaml 动态解析
- [ ] 13 RoadmapSection summary cards 自动从 roadmap 计算
- [ ] 14 FooterSection 重写为 6 列（含 npm / github / issues / docs）
- [ ] 15 DesignSystemWizard 接入 useTheme 或简化为静态展示
- [ ] 16 ThemeContext 在全站真正注入 CSS 变量到可见位置
- [ ] 17 CommandTerminal clear 进入 COMMANDS map
- [ ] 18 App.tsx Escape 键关闭 TokenInspector + 去重 backdrop
- [ ] 19 TokenInspector 移除无法验证的假数据字段
- [ ] 20 index.css 清理 line-draw / @keyframes draw（或真正使用）
- [ ] 21 YamlSandbox 标注 lightweight preview
- [ ] 22 验证：lint → 0 错误
- [ ] 23 验证：build → gzip < 300KB
- [ ] 24 验证：浏览器手动测试链接跳转
