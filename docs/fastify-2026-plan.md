# Fastify 2026 Demo 项目规划

## 1. 项目目标

这个项目的目标不是只做一个最小 Hello World，而是做一个适合学习、演示、继续扩展的 **Fastify 2026 最新实践 demo**。  
它需要同时满足这几件事：

- 使用 2026 年仍然推荐的稳定技术基线
- 覆盖后端常见能力：配置、日志、校验、鉴权、数据库、缓存、文件上传、任务、文档、测试、监控、限流、安全
- 结构清晰，方便后续继续增加模块
- 既适合学习 Fastify，也适合作为真实项目脚手架雏形

## 2. 规划基线

规划时间基线：`2026-04-05`

本规划优先参考：

- Fastify 官方最新文档与 LTS 页面
- Node.js 官方 Release 页面
- npm 上 Fastify 生态与常用工具链当前稳定主线

当前建议基线：

- `Node.js 24.x`
  - 2026 年处于 Active LTS，适合作为默认开发运行时
- 兼容 `Node.js 22.x`
  - 作为上一代 LTS，适合保守部署环境
- `Fastify 5.x`
  - 使用最新稳定主线，而不是继续从 v4 起步
- `TypeScript 5.x`
- 包管理器优先 `bun`

## 3. 技术选型

### 3.1 运行时与语言

| 类别 | 选择 | 说明 |
| --- | --- | --- |
| Runtime | Node.js 24 LTS | 2026 年默认首选 |
| Language | TypeScript | Fastify + Schema 驱动开发更顺手 |
| Module | ESM | 新项目优先使用 ESM |
| Package Manager | bun | 安装快、锁文件简单，适合单仓项目起步 |

### 3.2 Web 与 API 主栈

| 类别 | 选择 | 说明 |
| --- | --- | --- |
| HTTP Framework | Fastify 5 | 当前主线 |
| Schema | JSON Schema | Fastify 原生能力核心 |
| Type Provider | `@fastify/type-provider-typebox` | 官方生态里最顺手的 TS + Schema 组合之一 |
| Schema Builder | `@sinclair/typebox` | 和 Fastify schema/type 推导配合自然 |
| API Docs | `@fastify/swagger` + `@fastify/swagger-ui` | 自动生成 OpenAPI 文档 |

### 3.3 数据与状态

| 类别 | 选择 | 说明 |
| --- | --- | --- |
| Database | PostgreSQL | 2026 年仍是后端 demo 的首选主库 |
| ORM | Prisma ORM | 学习成本低、生态成熟、迁移体验好 |
| Cache / Queue 基础 | Redis | 适合缓存、限流、任务去重等能力 |
| Object Storage | 本地文件系统起步，后续兼容 S3 | demo 阶段先易后难 |

### 3.4 工程化

| 类别 | 选择 | 说明 |
| --- | --- | --- |
| Dev Runner | `tsx` | 本地 TypeScript 开发体验好 |
| Build | `tsup` | 简洁、够用，适合 API 服务 |
| Test | `vitest` | 开发体验好，适合单元/集成测试 |
| Lint + Format | `@biomejs/biome` | 2026 年新项目可优先简化 ESLint + Prettier 组合 |
| Git Hooks | `simple-git-hooks` + `lint-staged` | 保持提交质量 |

### 3.5 观测与安全

| 类别 | 选择 | 说明 |
| --- | --- | --- |
| Logging | Pino | Fastify 默认最佳搭档 |
| Request ID | Fastify 内建 + 日志串联 | 方便排障 |
| Health/Pressure | `@fastify/under-pressure` | 暴露健康检查与背压能力 |
| Security Headers | `@fastify/helmet` | 常规安全头 |
| CORS | `@fastify/cors` | 控制跨域策略 |
| Rate Limit | `@fastify/rate-limit` | 演示接口保护 |
| Cookie | `@fastify/cookie` | 鉴权/会话场景常见基础 |
| JWT | `@fastify/jwt` | 演示标准 Bearer Auth |
| Multipart | `@fastify/multipart` | 文件上传 |

## 4. 推荐依赖清单

下面先给出推荐库清单，后续初始化时再执行安装。

### 4.0 版本策略

为了兼顾“跟上 2026 当前稳定主线”和“避免 demo 频繁被小版本变动干扰”，建议遵循下面的版本策略：

| 包 | 推荐跟随版本线 | 备注 |
| --- | --- | --- |
| `fastify` | `5.6.x` 附近的最新稳定版 | 当前主线 |
| `@fastify/swagger` | `9.x` | 对应 Fastify 5 生态 |
| `@fastify/type-provider-typebox` | `5.x` | 与 Fastify 5 对齐 |
| `@fastify/jwt` | `10.x` | Fastify 5 兼容线 |
| `pino` | `9.x` | 当前稳定主线 |
| `vitest` | `3.2.x` | 当前稳定版，先不追 beta |
| `tsx` | `4.20.x` | 当前稳定主线 |
| `@biomejs/biome` | `2.2.x` | 当前稳定主线 |
| `prisma` / `@prisma/client` | `6.x` 同一 minor | 两者必须锁定在同一小版本线 |

建议初始化时：

- 核心框架类依赖优先锁 `major.minor.patch`
- Fastify 官方插件尽量跟随与 Fastify 5 对应的兼容主版本
- Prisma 相关包必须同版本线安装，避免 CLI 与 Client 不匹配

### 4.1 核心生产依赖

```txt
fastify
fastify-plugin
@fastify/autoload
@fastify/swagger
@fastify/swagger-ui
@fastify/sensible
@fastify/env
@fastify/cors
@fastify/helmet
@fastify/rate-limit
@fastify/cookie
@fastify/jwt
@fastify/multipart
@fastify/under-pressure
@fastify/type-provider-typebox
@sinclair/typebox
pino
pino-pretty
zod
argon2
prisma
@prisma/client
ioredis
```

说明：

- `zod` 不是主 schema 方案，但可用于 `.env`、少量应用层输入校验或外部适配
- 主 API schema 仍建议以 Fastify 的 JSON Schema / TypeBox 为核心
- 如果后面我们希望“更贴近 Fastify 原生”，也可以把 `zod` 去掉

### 4.2 开发依赖

```txt
typescript
tsx
tsup
vitest
@vitest/coverage-v8
supertest
@types/node
@biomejs/biome
lint-staged
simple-git-hooks
dotenv-cli
cross-env
```

说明：

- Fastify 集成测试也可以直接基于 `app.inject()`；保留 `supertest` 主要是为了在个别 HTTP 场景中更顺手
- 如果希望依赖更少，后面可以去掉 `supertest`

## 5. 功能范围

这个 demo 建议覆盖以下后端能力。

### 5.1 基础能力

- 应用启动与优雅关闭
- 环境变量管理
- 分环境配置
- 统一日志
- 全局错误处理
- 请求追踪 ID
- 健康检查与就绪检查

### 5.2 API 能力

- 路由自动加载
- 路由版本化
- OpenAPI / Swagger 文档
- 统一响应格式
- 分页、过滤、排序
- Schema 校验与序列化
- 文件上传接口

### 5.3 鉴权与安全

- JWT 登录/刷新机制
- RBAC 角色权限示例
- 管理员路由保护
- CORS 配置
- Helmet 安全头
- 限流
- 输入校验

### 5.4 数据能力

- PostgreSQL 持久化
- Prisma schema 与 migration
- 通用 Repository / Service 边界
- Redis 缓存
- 幂等键示例
- 软删除与审计字段

### 5.5 工程与质量

- 单元测试
- 集成测试
- 测试数据库隔离
- 代码规范
- 提交前检查
- Docker 化
- CI 工作流

## 6. 建议做成的业务模块

为了同时覆盖足够多的 Fastify 能力，demo 不建议只做“用户表 CRUD”。  
推荐做一个 **轻量内容管理 + 用户系统 + 文件上传** 的综合后端。

建议模块如下：

- `auth`
  - 注册、登录、刷新 token、获取当前用户
- `users`
  - 用户资料、角色、启停用
- `posts`
  - 文章 CRUD、分页、发布状态
- `uploads`
  - 本地上传、文件元数据
- `admin`
  - 管理端受保护接口
- `health`
  - 健康检查、就绪检查、版本信息
- `system`
  - 配置回显、运行状态、演示用限流接口

这样能比较完整地覆盖：

- 公共路由与私有路由
- 鉴权与权限
- 数据库与缓存
- 上传
- 文档
- 错误处理
- 测试

## 7. 项目结构设计

推荐采用 **按领域分层 + Fastify 插件化组织** 的结构。

```txt
fastify-latest-demo/
  docs/
    fastify-2026-plan.md
  prisma/
    schema.prisma
    migrations/
    seed.ts
  src/
    app.ts
    server.ts
    index.ts
    config/
      env.ts
      app-config.ts
    core/
      errors/
        app-error.ts
        error-codes.ts
      http/
        reply.ts
        pagination.ts
      utils/
        crypto.ts
        time.ts
    plugins/
      app/
        env.ts
        logger.ts
        sensible.ts
        swagger.ts
        security.ts
        auth.ts
        prisma.ts
        redis.ts
        under-pressure.ts
      routes/
        index.ts
    modules/
      auth/
        auth.controller.ts
        auth.service.ts
        auth.schema.ts
        auth.repository.ts
        auth.route.ts
      users/
        user.controller.ts
        user.service.ts
        user.schema.ts
        user.repository.ts
        user.route.ts
      posts/
        post.controller.ts
        post.service.ts
        post.schema.ts
        post.repository.ts
        post.route.ts
      uploads/
        upload.controller.ts
        upload.service.ts
        upload.schema.ts
        upload.route.ts
      health/
        health.route.ts
    hooks/
      on-request.ts
      on-response.ts
    guards/
      auth.guard.ts
      role.guard.ts
    types/
      fastify.d.ts
    tests/
      helpers/
        build-test-app.ts
      integration/
      unit/
    scripts/
      clean.ts
    jobs/
      example.job.ts
  .env.example
  .gitignore
  biome.json
  docker-compose.yml
  Dockerfile
  package.json
  bun.lock
  tsconfig.json
  tsup.config.ts
  vitest.config.ts
```

## 8. 配置文件规划

### 8.1 `package.json`

需要包含：

- `type: "module"`
- `engines.node`
- `packageManager`
- scripts

建议脚本：

```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsup src/index.ts --format esm --dts",
    "start": "node dist/index.js",
    "typecheck": "tsc --noEmit",
    "lint": "biome check .",
    "format": "biome check . --write",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:deploy": "prisma migrate deploy",
    "prisma:seed": "tsx prisma/seed.ts"
  }
}
```

### 8.2 `tsconfig.json`

建议：

- `target: ES2022` 或更高
- `module: NodeNext`
- `moduleResolution: NodeNext`
- `strict: true`
- `noUncheckedIndexedAccess: true`
- `exactOptionalPropertyTypes: true`
- `baseUrl` + 适量路径别名

### 8.3 `biome.json`

建议作为唯一的格式化和大部分 lint 工具：

- 开启 import 排序
- 打开推荐规则
- 对测试目录适度放宽

### 8.4 `vitest.config.ts`

建议：

- `environment: "node"`
- 打开 coverage
- 为集成测试提供全局 setup

### 8.5 `.env.example`

最少包括：

```env
NODE_ENV=development
PORT=3000
HOST=0.0.0.0
LOG_LEVEL=info
APP_NAME=fastify-latest-demo
APP_VERSION=0.1.0
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/fastify_demo
REDIS_URL=redis://localhost:6379
JWT_ACCESS_SECRET=change-me-access
JWT_REFRESH_SECRET=change-me-refresh
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
UPLOAD_DIR=./storage/uploads
CORS_ORIGIN=http://localhost:3000
```

### 8.6 `docker-compose.yml`

第一阶段建议只编排：

- `postgres`
- `redis`

第二阶段再考虑：

- `app`
- `adminer` 或 `pgadmin`

## 9. Fastify 内部组织最佳实践

### 9.1 应用创建方式

建议拆成三层：

- `app.ts`
  - 只负责创建 Fastify 实例与注册插件
- `server.ts`
  - 负责启动与关闭流程
- `index.ts`
  - 作为进程入口

这样测试时可以直接构建 `app`，避免测试里真实监听端口。

### 9.2 插件优先

Fastify 的核心优势之一就是插件体系，demo 应尽量把横切能力插件化：

- env 插件
- prisma 插件
- redis 插件
- jwt / auth 插件
- swagger 插件
- security 插件

### 9.3 Schema First

每个模块建议至少包含：

- `*.schema.ts`
- `*.route.ts`
- `*.service.ts`

路由层负责：

- schema
- preHandler
- handler 绑定

Service 层负责：

- 业务逻辑
- 事务编排
- 对 repository 的协调

### 9.4 不要把所有逻辑都塞进 route

坏味道：

- route 文件超过几百行
- handler 里直接写数据库操作
- 重复响应结构

推荐原则：

- route 负责 HTTP 边界
- service 负责业务
- repository 负责数据库访问

## 10. API 设计约定

建议统一约定如下：

- 路由前缀：`/api/v1`
- OpenAPI 文档：`/docs`
- 健康检查：`/health`
- 就绪检查：`/ready`

响应格式建议：

```json
{
  "success": true,
  "data": {},
  "meta": {}
}
```

错误格式建议：

```json
{
  "success": false,
  "error": {
    "code": "AUTH_INVALID_TOKEN",
    "message": "Invalid token"
  }
}
```

分页参数建议：

- `page`
- `pageSize`
- `sortBy`
- `sortOrder`

## 11. 数据库设计建议

第一版建议至少包含这些表：

- `users`
- `roles`
- `user_roles`
- `posts`
- `files`
- `refresh_tokens`

通用字段建议：

- `id`
- `created_at`
- `updated_at`
- `deleted_at`

用户表建议字段：

- `email`
- `password_hash`
- `nickname`
- `status`

文章表建议字段：

- `title`
- `summary`
- `content`
- `status`
- `author_id`

文件表建议字段：

- `original_name`
- `mime_type`
- `size`
- `path`
- `uploaded_by`

## 12. 测试策略

建议拆成三层：

### 12.1 单元测试

- service
- utils
- guard

### 12.2 集成测试

- 使用 `app.inject()`
- 覆盖主要路由
- 覆盖鉴权、错误处理、分页、上传

### 12.3 端到端近似测试

- 基于测试数据库
- 跑完整登录与 CRUD 流程

建议覆盖的关键场景：

- 用户注册/登录成功
- 非法 token 拒绝访问
- 管理员与普通用户权限差异
- 文章分页
- 文件上传限制
- 限流触发
- 数据校验失败

## 13. 安全与稳定性

建议至少包含：

- Helmet
- CORS 白名单
- Rate Limit
- JWT Access / Refresh 分离
- 密码哈希使用 `argon2` 或 `bcrypt`
- 上传文件大小与 MIME 限制
- 统一错误脱敏
- Graceful shutdown

这里推荐优先使用：

- `argon2`

原因：

- 现代密码哈希方案更合适
- 在新项目里通常比 `bcrypt` 更值得优先考虑

## 14. 可观测性

建议第一阶段就具备：

- 结构化日志
- request id
- 启动日志
- 错误日志
- 健康检查

第二阶段加入：

- 指标导出
- OpenTelemetry tracing

为了控制复杂度，第一版不强行上完整 OTel，只在规划中预留。

## 15. 迭代路线

### M1. 工程骨架

- 初始化 Node + TypeScript + bun
- 建立 Fastify app/server/index
- 接入 Biome / Vitest / tsup
- 接入 env、logger、swagger、health

### M2. 数据层

- 接入 PostgreSQL + Prisma
- 建立基础实体
- 跑 migration 与 seed

### M3. 鉴权层

- 注册、登录、刷新 token
- JWT 鉴权
- RBAC

### M4. 业务模块

- users
- posts
- uploads

### M5. 稳定性与质量

- Redis
- rate limit
- under-pressure
- 完整测试
- Docker / CI

## 16. 初始化时建议的安装顺序

1. 初始化 `package.json`、`tsconfig.json`、Biome、Vitest
2. 搭建 `src/app.ts`、`src/server.ts`、`src/index.ts`
3. 接入 `@fastify/env`、日志、Swagger、错误处理
4. 接入 Prisma + PostgreSQL
5. 接入 JWT + Cookie + Auth
6. 做 `users/posts/uploads` 模块
7. 加 Redis、限流、健康检查、Docker、CI

## 17. 这一版方案的取舍

### 当前明确选择

- 选 `Fastify 5`
- 选 `Node.js 24` 作为默认运行时
- 选 `TypeScript + ESM`
- 选 `TypeBox` 作为 API schema 主方案
- 选 `Prisma + PostgreSQL`
- 选 `Redis`
- 选 `Vitest`
- 选 `Biome`

### 当前暂不引入

- 微服务拆分
- Kafka / RabbitMQ
- 完整 OpenTelemetry 平台接入
- CQRS / Event Sourcing
- 多租户
- Kubernetes 部署

原因：

- 学习 demo 第一阶段更重要的是把 Fastify 的核心能力完整走通
- 不宜过早引入重型基础设施，避免 demo 变成运维项目

## 18. 下一步建议

下一步最合理的是直接进入 **项目初始化阶段**，按这个规划创建：

- `package.json`
- `tsconfig.json`
- `biome.json`
- `vitest.config.ts`
- `src/` 基础骨架
- `docker-compose.yml`
- `.env.example`

如果你同意，我下一步就可以继续把这个 demo 的第一版工程骨架直接搭出来。

## 19. 参考决策备注

本规划基于 2026-04-05 当天核对的公开资料整理，核心判断包括：

- Fastify 当前建议从 v5 主线起步
- Node.js 24 适合作为默认运行时基线
- 新项目可优先采用 `bun + TypeScript + ESM + Biome + Vitest`
- Fastify 项目仍然适合使用插件化组织和 schema-first 设计
