# fastify-latest-demo

一个面向 2026 实践的 Fastify 学习型 demo。

当前项目约定：

- 使用 `Bun` 做包管理
- 使用 `Node.js` 作为运行时
- 不使用 Bun runtime 跑应用代码

## Runtime 约定

这个项目里：

- `bun install` 用于安装依赖和维护锁文件
- `npm run dev`
- `npm run test`
- `npm run typecheck`

用于执行项目脚本

如果你执行：

```bash
bun run dev
```

在当前项目里，它通常仍然会把 `tsx` 交给 `node` 执行，而不是强制改成 Bun runtime。

原因有两层：

1. Bun 官方文档说明：`bun run` 默认会尊重本地 CLI 的 `node` shebang，只有显式加 `--bun` 才会改用 Bun runtime。
2. 当前安装的 `tsx` 入口文件 [node_modules/tsx/dist/cli.mjs](d:/code/fastify-latest-demo/node_modules/tsx/dist/cli.mjs) 第一行就是：

```js
#!/usr/bin/env node
```

所以更准确的说法是：

- `bun run dev` 是由 Bun 调度脚本
- 但当前脚本实际启动的 CLI 仍然是 Node 语义
- 因此应用进程本身仍然属于 Node 工具链

为了避免团队误解，当前推荐工作流仍然是：

```bash
bun install
npm run dev
npm run test
npm run typecheck
```

## 快速开始

要求：

- `Node.js 22+`
- `Bun 1.3+`

安装依赖：

```bash
bun install
```

开发启动：

```bash
npm run dev
```

测试：

```bash
npm run test
```

类型检查：

```bash
npm run typecheck
```

## 当前能力

当前项目已经具备：

- `GET /`
- `GET /health`
- `GET /ready`
- `GET /docs`
- `GET /docs/json`
- `GET /api/v1/system/echo/:name`
- `POST /api/v1/system/todos`
- `GET /api/v1/system/todos/:id`
- 统一 `404` 返回
- 环境变量 schema 校验
- Swagger 文档
- TypeBox schema-first 示例
- Vitest 测试

## 目录说明

```txt
docs/
  fastify-2026-plan.md
  steps/
src/
  app.ts
  config/
  core/
  modules/
  plugins/
  routes/
  schemas/
  types/
tests/
```

## 开发记录

每一步实施记录都在 [docs/steps](d:/code/fastify-latest-demo/docs/steps) 下，包括：

- MVP 骨架
- 安装与验证
- 最小可维护版本
- 基础设施层加固
- 包管理器切换到 Bun

## 参考

- Bun `bun run` 官方文档：https://bun.sh/docs/cli/run
- Bun 总览文档：https://bun.sh/docs
- Fastify 文档：https://fastify.dev/docs/latest/
