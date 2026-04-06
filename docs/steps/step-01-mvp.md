# Step 01 - MVP 骨架实现记录

日期：`2026-04-05`

## 这一步做了什么

这一阶段实现了项目的最小可运行版本（MVP），目标是做到“小而精”，只保留后续扩展最需要的骨架。

已完成内容：

- 初始化 `package.json`
- 建立 `TypeScript + ESM` 工程配置
- 增加 `Biome`、`Vitest`、`tsup`、`tsx`
- 建立 Fastify 最小应用骨架
- 增加根路由 `GET /`
- 增加健康检查路由 `GET /health`
- 增加基础环境配置读取
- 增加优雅关闭入口
- 增加 1 份集成测试文件
- 补充 `.env.example` 与 `.gitignore`

## 为什么这一步这样收敛

这一步刻意没有接入数据库、Redis、Swagger、JWT、Prisma、上传等能力，原因是当前目标是先得到一个最小、清晰、可启动、可测试的 Fastify 基础骨架。

如果一开始就把完整技术栈全部接进来，会带来几个问题：

- 学习焦点被分散
- 初始化成本偏高
- 很难判断后续问题来自 Fastify 还是来自外围依赖
- MVP 会失去“最小实现”的意义

所以当前版本只保留三类核心能力：

- 启动应用
- 暴露最小路由
- 提供测试与工程化基础

## 本步新增文件

- `package.json`
- `tsconfig.json`
- `tsup.config.ts`
- `vitest.config.ts`
- `biome.json`
- `.gitignore`
- `.env.example`
- `src/config/env.ts`
- `src/routes/health.ts`
- `src/app.ts`
- `src/server.ts`
- `src/index.ts`
- `tests/app.test.ts`

## 当前 MVP 的边界

当前已经具备：

- 可作为 Fastify 项目起点
- 可直接继续接模块
- 支持本地开发、构建、测试脚本
- 具备应用入口与优雅关闭结构

当前还不包括：

- Swagger / OpenAPI
- 数据库
- Prisma
- Redis
- JWT 鉴权
- 文件上传
- Docker
- CI
- 统一错误模型

## 当前目录结构

```txt
fastify-latest-demo/
  docs/
    fastify-2026-plan.md
    steps/
      step-01-mvp.md
  src/
    app.ts
    index.ts
    server.ts
    config/
      env.ts
    routes/
      health.ts
  tests/
    app.test.ts
  .env.example
  .gitignore
  biome.json
  package.json
  tsconfig.json
  tsup.config.ts
  vitest.config.ts
```

## 运行方式

安装依赖后可以执行：

```bash
bun install
npm run dev
```

测试：

```bash
npm run test
```

构建：

```bash
npm run build
```

## 验证说明

这一轮主要完成了代码与配置骨架的落盘。

当前还没有执行实际安装与测试，原因是仓库内此时还没有安装依赖。因此这一步的验证状态是：

- 已完成文件结构与脚本准备
- 已完成最小路由与测试代码编写
- 未执行 `bun install`
- 未执行 `npm run test`
- 未执行 `npm run dev`

等下一步你让我继续时，我可以直接进入依赖安装和本地启动验证。

## 下一步建议

MVP 完成后，下一步建议进入“基础增强版”而不是直接上全部模块。

推荐 Step 02 做这些：

- 接入 Swagger
- 增加统一错误处理
- 增加 `/ready` 路由
- 抽出插件注册结构

这样项目仍然很轻，但会更像一个正式后端服务。
