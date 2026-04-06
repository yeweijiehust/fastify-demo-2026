# Step 07 - TypeBox 与第一个业务模块

日期：`2026-04-06`

## 这一步做了什么

这一阶段回到主线，正式引入了 `TypeBox`，并实现了第一个真正的 schema-first 业务模块。

已完成内容：

- 接入 `@sinclair/typebox`
- 接入 `@fastify/type-provider-typebox`
- 新增 `system` 模块
- 增加 `params + query` 校验示例
- 增加 `body` 校验示例
- 增加一个最小的内存 `todo` 业务示例
- 为校验失败补充 `400` 级别测试
- 确认 Swagger 文档包含新增业务接口

## 为什么这一步放在现在

到 Step 04 为止，项目的基础骨架已经比较稳了，但还缺少一个真正体现 Fastify 风格的“业务模块样板”。

这一步的目标不是马上接数据库，而是先把下面这套工作流走通：

- schema-first
- 类型推导
- params 校验
- query 校验
- body 校验
- OpenAPI 文档同步生成

这正是 Fastify + TypeBox 最值得学习的一段。

## 本步新增的业务接口

模块前缀：

- `/api/v1/system`

新增接口：

- `GET /api/v1/system/echo/:name`
- `POST /api/v1/system/todos`
- `GET /api/v1/system/todos/:id`

## 接口说明

### `GET /api/v1/system/echo/:name`

用于演示：

- path params 校验
- querystring 校验

支持参数：

- `name`
- `uppercase`
- `repeat`

### `POST /api/v1/system/todos`

用于演示：

- request body 校验
- 201 返回
- 最小业务创建流程

当前数据存储方式：

- 内存数组

这是刻意的取舍，目的是先把 schema-first 的 API 工作流建立起来，而不是过早引入数据库复杂度。

### `GET /api/v1/system/todos/:id`

用于演示：

- params 校验
- query 校验
- 基础读取接口

## 为什么仍然用内存数据

这一步没有直接上 Prisma 或 PostgreSQL，原因是：

- 当前重点是把 Fastify 的 schema 与类型流转跑通
- 如果现在就接数据库，会把注意力分散到 migration、连接、模型设计上

所以当前这个 `todo` 模块应理解为：

- “第一个业务模块样板”

而不是最终的数据层方案。

## 测试覆盖

本步新增了这些验证：

- 成功访问 `GET /api/v1/system/echo/:name`
- 成功创建 todo
- 成功读取 todo
- body 校验失败返回 `400`
- query 校验失败返回 `400`
- Swagger 文档包含新增业务路由

## 实际验证结果

这一步已经实际完成：

- `bun install`
- `npm run test`
- `npm run typecheck`
- 本地启动验证

验证结果：

- `9/9` 测试通过
- `tsc --noEmit` 通过
- `GET /api/v1/system/echo/fastify?uppercase=true&repeat=2` 返回 `200`
- `/docs/json` 返回 `200`

## 本步中途发现并修复的问题

`GET /api/v1/system/todos/:id` 的 handler 中存在一个类型边界问题：

- 代码里会返回 `404`
- 但最初 response schema 只声明了 `200`

这会导致：

- 运行时没问题
- `typecheck` 失败

修复方式：

- 为该路由补充显式的 `404 response schema`

这也让 TypeScript 约束和 OpenAPI 描述重新保持一致。

## 当前状态

到这一步为止，项目已经具备：

- 稳定的基础骨架
- schema-first 路由写法
- TypeBox 类型与 schema 一体化写法
- 业务模块组织的第一版样板

## 下一步建议

推荐 Step 08 进入“模块化增强版”，优先做：

- 抽离 `system` 模块中的 schema 到独立文件
- 增加统一的业务错误类
- 为模块补 service 层
- 开始准备接数据库前的目录形态
