# Step 08 - 模块模板化与业务错误类

日期：`2026-04-06`

## 这一步做了什么

这一阶段把第一个业务模块从“单文件演示版”整理成了“后续可以复制的模块模板”。

已完成内容：

- 新增统一业务错误类 `AppError`
- 将 `system` 模块拆分为：
  - `system.schema.ts`
  - `system.service.ts`
  - `system.route.ts`
- 将业务查询与创建逻辑移入 service 层
- 将 TypeBox schema 抽离到独立 schema 文件
- 在错误处理中支持识别 `AppError`
- 增加 `todo not found` 的业务错误测试
- 完成模块拆分后的启动、测试与类型检查验证

## 为什么现在做这个拆分

Step 07 已经证明了：

- TypeBox 可用
- schema-first 工作流可用
- 第一个业务模块可行

但如果继续把后续模块都写成“一个 route 文件塞所有东西”，很快就会出现这些问题：

- schema 和业务逻辑混在一起
- 代码复用困难
- 很难演化到数据库层

所以 Step 08 的目标是：

- 先把“模块模板”固定下来

这样后面新增模块时，就不是重新摸索，而是直接复制结构。

## 新的模块结构

当前 `system` 模块已经拆成：

```txt
src/modules/system/
  system.route.ts
  system.schema.ts
  system.service.ts
```

职责边界如下：

- `route`
  - Fastify 路由注册
  - schema 挂载
  - HTTP 与业务层衔接
- `schema`
  - TypeBox schema
  - response schema
- `service`
  - 业务逻辑
  - 内存数据操作
  - 抛出业务错误

## AppError 的作用

这一步新增了：

- `src/core/errors/app-error.ts`

它用于承载真正的业务错误，例如：

- `TODO_NOT_FOUND`

这样带来的好处是：

- route 层不需要手写各种 `reply.status(...).send(...)`
- 业务错误可以通过异常统一抛出
- 全局错误处理器负责把它转换成统一响应格式

这也是后续接数据库、鉴权、权限校验时非常有用的基础设施。

## 当前收益

到这一步为止，项目已经不仅仅是“能跑的 demo”，而是开始具备：

- 可复制的模块模板
- 更清晰的职责分层
- 业务错误与校验错误的分流能力

## 实际验证结果

这一步已经实际完成：

- `npm run test`
- `npm run typecheck`
- 本地启动验证

验证结果：

- `10/10` 测试通过
- `tsc --noEmit` 通过
- `GET /api/v1/system/echo/fastify?uppercase=true&repeat=2` 返回 `200`
- `GET /api/v1/system/todos/99999` 返回 `404`

## 本步中途发现并修复的问题

拆分 service 之后，`echoName` 的输入类型遇到了：

- `exactOptionalPropertyTypes`

带来的约束问题。

原因是：

- route 层把 `undefined` 显式传给了 service
- service 层原本使用的是可选属性写法

修复方式：

- 将 `repeat` 和 `uppercase` 的输入类型改为显式接受 `undefined`

这个调整让 route 层和 service 层的类型边界重新一致。

## 下一步建议

推荐 Step 09 开始接入真正的数据层，但仍然保持节奏稳一点。

建议优先做：

- Prisma 初始化
- PostgreSQL docker-compose
- 把 `todo` 从内存数据切到数据库
- 补一组最小 migration 与 seed
