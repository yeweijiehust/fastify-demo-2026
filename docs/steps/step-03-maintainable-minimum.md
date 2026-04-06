# Step 03 - 最小可维护版本

日期：`2026-04-05`

## 这一步做了什么

这一阶段把项目从“最小可运行”推进到了“最小可维护”。

已完成内容：

- 接入 Swagger 与 Swagger UI
- 新增 `GET /ready`
- 增加统一错误处理
- 把路由注册整理为 `routes/index.ts`
- 给系统路由补充 OpenAPI schema
- 增加 Swagger 与 `/ready` 的测试覆盖
- 修正 Fastify 插件作用域，确保 Swagger 能正确收集实际路由

## 为什么这一步这样做

在 MVP 阶段之后，最值得优先补齐的不是数据库或鉴权，而是这些“会影响维护体验”的基础能力：

- 文档
- 可观测的健康状态
- 基础错误格式
- 更清晰的注册结构

这样做的收益很高：

- 后续加接口时可以自动进文档
- 运维和调试能区分存活与就绪
- 错误输出开始具备统一格式
- 项目结构更容易继续扩展

## 本步代码结构调整

新增了插件层：

- `src/plugins/swagger.ts`
- `src/plugins/error-handler.ts`

新增了路由组织层：

- `src/routes/index.ts`
- `src/routes/root.ts`
- `src/routes/ready.ts`

保留并升级了：

- `src/routes/health.ts`

## 新增接口

### `GET /ready`

用于 readiness probe，返回：

```json
{
  "success": true,
  "data": {
    "status": "ready"
  }
}
```

### Swagger

接入后默认提供：

- UI：`/docs`
- OpenAPI JSON：`/docs/json`

并且当前已经确认文档中实际包含：

- `/`
- `/health`
- `/ready`

## 统一错误处理策略

当前版本实现的是一个非常轻量的统一错误处理器：

- 记录错误日志
- 对 4xx 返回 `REQUEST_ERROR`
- 对 5xx 返回 `INTERNAL_SERVER_ERROR`
- 对 5xx 隐藏内部错误细节

这一步还没有引入自定义错误类体系，原因是当前项目仍处在基础骨架阶段，没必要过早设计复杂错误模型。

## 测试增强

本步增加验证：

- `GET /ready`
- `GET /docs/json`
- Swagger 文档中是否真实包含系统路由 path

这样可以确保：

- readiness 路由可用
- Swagger 文档实际生成成功
- Swagger 不是“空文档”

## 本步中途发现并修复的问题

第一次接入 Swagger 后，`/docs/json` 虽然返回了 `200`，但 `paths` 是空对象。

原因是：

- Fastify 插件默认有封装作用域
- Swagger 插件如果在被封装的上下文中注册，可能无法看到同级上下文中的路由

修复方式：

- 引入 `fastify-plugin`
- 将 Swagger 插件和错误处理插件提升为应用根上下文插件

这是一个很典型的 Fastify 插件边界问题，也说明这一步的验证是有价值的，避免了“接口能跑但文档是空的”这种假成功。

## 当前项目状态

到这一步为止，项目已经具备：

- 最小可运行
- 最小可测试
- 最小可文档化
- 最小可维护
- 文档路由与实际接口保持一致

## 实际验证结果

这一步已经实际完成：

- 依赖安装
- 自动测试通过
- 本地启动验证通过
- `/docs/json` 返回 `200`
- `/docs/json` 中包含 `/`、`/health`、`/ready`

## 下一步建议

推荐 Step 04 进入“应用基础设施版”，优先做：

- 引入 `@fastify/env`
- 统一配置 schema 校验
- 增加 `not found` 处理
- 提取响应 schema 复用

这一轮仍然不碰数据库，继续把基础层做稳。
