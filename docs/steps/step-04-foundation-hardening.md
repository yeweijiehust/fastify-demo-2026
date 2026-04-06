# Step 04 - 基础设施层加固

日期：`2026-04-05`

## 这一步做了什么

这一阶段继续保持项目轻量，但把最核心的基础设施层补稳了。

已完成内容：

- 接入 `@fastify/env`
- 为环境变量增加 schema 校验
- 将配置统一挂到 `app.config`
- 为 Fastify 增加类型声明扩展
- 新增统一 `404 not found` 处理
- 抽取可复用的成功响应 schema
- 调整 Swagger 信息从配置读取
- 为 `404` 增加测试覆盖
- 完成 `typecheck` 验证

## 为什么现在做这些

到 Step 03 为止，项目已经能跑、能测、能生成文档，但还有几个隐患：

- 配置读取仍然比较分散
- 环境变量缺少统一 schema
- 不存在路由时还没有统一业务格式
- 各个路由的响应 schema 有重复

这些问题现在不大，但一旦继续加模块，很快就会变成维护成本。

所以 Step 04 的目标不是加更多功能，而是把“做新功能前的地基”打好。

## 本步新增与调整的文件

- `src/plugins/env.ts`
- `src/plugins/not-found.ts`
- `src/schemas/response.ts`
- `src/types/fastify.d.ts`
- `src/config/env.ts`

并更新了：

- `src/app.ts`
- `src/server.ts`
- `src/plugins/swagger.ts`
- `src/routes/root.ts`
- `src/routes/health.ts`
- `src/routes/ready.ts`
- `tests/app.test.ts`

## 配置层改造

这一轮把配置从“手动读取 `process.env`”调整成了：

- 由 `@fastify/env` 在应用启动时统一解析
- 使用 JSON Schema 校验和默认值
- 最终挂到 `app.config`

这样带来的好处：

- 配置来源集中
- 默认值明确
- 缺失或错误配置更早暴露
- 后续插件和路由都能走同一种访问方式

## 响应 schema 复用

为了避免每个路由都手写同样的：

- `success`
- `data`

结构，这一步新增了共享响应 schema 构造函数。

当前先抽的是成功响应，已经用于：

- `/`
- `/health`
- `/ready`

这是一个很小的抽象，但很有利于后续继续加接口。

## 404 处理

新增了统一的 not found 处理器。

访问不存在路由时，当前返回：

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Route not found"
  }
}
```

这样错误格式开始更一致，后续接业务模块时不需要再为未知路由单独处理。

## 当前状态

到这一步为止，项目已经具备：

- 最小可运行
- 最小可测试
- 最小可文档化
- 最小可维护
- 统一配置入口
- 统一 404 边界
- 基础响应 schema 复用

## 实际验证结果

这一步已经实际完成：

- 当时执行 `corepack pnpm install`
- 当时执行 `corepack pnpm test`
- 当时执行 `corepack pnpm typecheck`
- 本地启动验证

验证结果：

- `5/5` 测试通过
- `tsc --noEmit` 通过
- `GET /` 返回 `200`
- `GET /docs/json` 返回 `200`
- `GET /missing` 返回 `404`

## 本步中途发现并修复的问题

### 1. `@fastify/env` 代码已接入，但依赖声明最初漏写

修复方式：

- 补充 `package.json`
- 重新执行安装

### 2. 错误处理器里的 `error` 在 TypeScript 中是 `unknown`

运行测试时不会立刻暴露，但在 `typecheck` 时会报错。

修复方式：

- 为错误对象增加最小类型归一化
- 显式处理 `statusCode` 和 `validation`

这个修复很重要，因为它保证了 Step 04 不只是“跑得起来”，而是类型层面也成立。

## 下一步建议

推荐 Step 05 开始进入第一个真正的业务模块，但仍保持轻量。

建议优先做：

- 引入 `TypeBox`
- 做一个 `system` 或 `posts` 的最小 CRUD 风格模块
- 加 querystring / params / body 校验示例
- 补充一个 400 级别的校验失败测试
