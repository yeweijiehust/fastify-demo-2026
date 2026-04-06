# Step 06 - README 与运行时说明补充

日期：`2026-04-05`

## 这一步做了什么

这一阶段主要解决一个容易混淆的问题：

- `bun run dev` 在当前项目里，到底算不算 Bun runtime？

结论是：

- 不应简单等同为“纯 Bun runtime”
- 在当前项目里，更准确的理解是“Bun 调度脚本，但实际 CLI 仍然走 Node”

## 判断依据

### 1. Bun 官方文档

根据 Bun 官方 `bun run` 文档：

- `bun run` 默认会尊重本地 CLI 的 `node` shebang
- 只有显式加 `--bun` 时，才会强制用 Bun runtime 执行对应 CLI

这意味着：

- `bun run dev`

并不会天然把所有脚本都切成 Bun runtime。

### 2. 当前项目中的 `tsx`

当前安装的 `tsx` 入口文件第一行是：

```js
#!/usr/bin/env node
```

所以当前脚本：

```json
"dev": "tsx watch src/index.ts"
```

在 `bun run dev` 下，Bun 会去调度这个脚本，但 `tsx` 本身仍然按 Node CLI 方式执行。

## 本步实施内容

- 新增项目级 `README.md`
- 在 README 中明确写清：
  - Bun 只负责包管理
  - Node.js 仍然是项目运行时
  - 推荐使用 `npm run ...` 执行脚本
- 保留对 `bun run dev` 行为的解释，避免后续团队误解

## 当前推荐工作流

```bash
bun install
npm run dev
npm run test
npm run typecheck
```

## 为什么仍然推荐 `npm run`

虽然当前项目里执行 `bun run dev` 大概率仍会落到 Node CLI 上，但继续推荐：

- `npm run dev`
- `npm run test`
- `npm run typecheck`

有两个好处：

- 表意更明确，不会让读代码的人误以为项目已经迁移到 Bun runtime
- 能严格遵守“只用 Bun 包管理，不用 Bun runtime”这一团队约定
