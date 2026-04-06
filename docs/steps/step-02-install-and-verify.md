# Step 02 - 安装依赖并验证启动

日期：`2026-04-05`

## 这一步做了什么

这一阶段最初完成了 MVP 的实际依赖安装、测试验证和本地启动验证。

已完成内容：

- 检查运行环境中的 `node`、`npm`、`corepack`
- 当时使用 `corepack pnpm install` 安装依赖
- 当时生成锁文件 `pnpm-lock.yaml`
- 当时运行 `corepack pnpm test`
- 当时启动本地开发服务 `corepack pnpm dev`
- 实际请求 `GET /`
- 实际请求 `GET /health`
- 确认服务可监听在本机 `3000` 端口

## 环境检查结果

本机实际环境：

- `Node.js 24.11.1`
- `npm 11.6.2`
- `corepack 0.34.2`

这和项目当前规划基线一致，可以继续作为后续开发环境使用。

## 实际安装结果

本次安装后的关键版本如下：

- `fastify 5.8.4`
- `@biomejs/biome 2.4.10`
- `@types/node 24.12.2`
- `tsup 8.5.1`
- `tsx 4.21.0`
- `typescript 5.9.3`
- `vitest 3.2.4`

在当时的执行环境下，还将 `package.json` 中的：

- `packageManager`

更新为：

- `pnpm@10.33.0`

这样仓库声明与当前推荐的 pnpm 10 主线更一致。

## 测试结果

当时执行：

```bash
corepack pnpm test
```

结果：

- `1` 个测试文件通过
- `2` 个测试用例通过

通过的接口：

- `GET /`
- `GET /health`

## 启动验证结果

执行开发服务后，服务成功监听：

- `http://127.0.0.1:3000`

随后实际请求结果如下。

### `GET /`

状态码：

- `200`

响应体：

```json
{
  "success": true,
  "data": {
    "name": "fastify-latest-demo",
    "version": "0.1.0"
  }
}
```

### `GET /health`

状态码：

- `200`

响应体：

```json
{
  "success": true,
  "data": {
    "status": "ok"
  }
}
```

## 这一步遇到的问题

### 1. 当时系统中没有直接可用的 `pnpm`

最开始直接执行 `pnpm install` 失败，因为命令不存在。  
后续改为通过 `corepack pnpm` 使用 pnpm。

### 2. 沙箱限制导致安装和测试需要提权

出现过两类限制：

- `corepack` 需要写入用户目录缓存
- `vitest/vite/esbuild` 在加载配置时需要拉起子进程

因此本步中的安装、测试、启动验证最终都使用了提权方式执行。

这不是项目代码错误，而是当前执行环境的限制。

## 当前项目状态

到这一步为止，项目已经具备：

- 依赖可正常安装
- 测试可通过
- 服务可本地启动
- 根路由和健康检查路由可访问

当前仍然没有接入：

- Swagger
- 统一错误处理
- `/ready`
- 数据库
- Redis
- JWT

## 当前目录新增变化

这一阶段新增或产生了这些结果：

- `pnpm-lock.yaml`
- `node_modules/`（本地安装产物）
- `docs/steps/step-02-install-and-verify.md`

## 下一步建议

建议进入 Step 03：基础增强版。

推荐只做四件事，继续保持“小步快跑”：

- 接入 Swagger
- 增加统一错误处理
- 增加 `GET /ready`
- 把路由注册整理成更清晰的插件结构

这样仍然很轻，但已经从“最小可运行”进入“最小可维护”。
