# Step 05 - 包管理器切换到 Bun

日期：`2026-04-05`

## 这一步要解决什么

这一阶段的目标是把项目从 `pnpm` 切换到 `Bun` 作为包管理器，但仍然保持：

- 运行时继续使用 Node.js
- 服务启动方式不切换到 Bun runtime
- 构建、测试、类型检查继续沿用现有工具链

也就是说，这一步只替换“依赖安装与锁文件管理”，不替换运行时。

## 当前决策

本项目包管理器切换为：

- `bun@1.3.11`

这是当前机器上实际可用的 Bun 版本。

## 计划中的调整

- 将 `package.json` 的 `packageManager` 改为 `bun@1.3.11`
- 使用 `bun install` 生成 Bun 锁文件
- 清理旧的 `pnpm-lock.yaml`
- 验证安装后项目的测试、类型检查、启动是否正常
- 同步修正文档中的安装命令

## 命令约定

切换后建议这样使用：

```bash
bun install
npm run dev
npm run test
npm run typecheck
```

这里刻意保留 `npm run ...`，是为了满足“只用 Bun 的包管理器功能，不使用 Bun runtime 执行项目脚本”这个约束。

## 实际执行结果

这一轮已经实际完成：

- 找到本机 Bun 可执行文件：`C:\Users\海绵\.bun\bin\bun`
- 确认版本：`1.3.11`
- 将 `package.json` 的 `packageManager` 改为 `bun@1.3.11`
- 执行 `bun install`
- 生成 `bun.lock`
- 删除旧的 `pnpm-lock.yaml`
- 使用 `npm run test` 验证测试
- 使用 `npm run typecheck` 验证类型检查
- 使用 `npm run dev` 验证启动

## 验证结果

验证结果如下：

- `bun.lock` 已生成
- `pnpm-lock.yaml` 已删除
- `npm run test` 通过，`5/5` 测试通过
- `npm run typecheck` 通过
- `npm run dev` 启动后，`GET /` 返回 `200`

## 这一步的取舍

这次切换没有把脚本改成 `bun run ...`，原因是你明确要求：

- 只使用 Bun 的包管理能力
- 不使用 Bun 的其他功能

所以当前推荐工作流是：

```bash
bun install
npm run dev
npm run test
npm run typecheck
```

这能同时满足：

- 锁文件与依赖管理切到 Bun
- 项目运行仍然基于 Node 生态

## 兼容性结论

基于这次实际验证，可以确认当前项目已经成功完成：

- `pnpm -> Bun` 包管理器迁移

并且以下能力没有受影响：

- Fastify 应用启动
- Swagger 文档访问
- Vitest 测试
- TypeScript 类型检查
