# 🦞 OpenClaw 指挥中心

<div align="center">

**你的 AI 代理任务中枢**

[![CI](https://github.com/jontsai/openclaw-command-center/actions/workflows/ci.yml/badge.svg)](https://github.com/jontsai/openclaw-command-center/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org)
[![ClawHub](https://img.shields.io/badge/ClawHub-command--center-blue)](https://www.clawhub.ai/jontsai/command-center)

🌐 **Language / 语言**：
**[English](./README.md)** · **简体中文（当前）**

[功能特性](#功能特性) • [快速开始](#快速开始) • [安全](#-安全) • [配置](#配置)

</div>

---

## 为什么需要 Command Center？

你的 AI 代理是 24/7 运行的，你需要随时知道它们在干什么。

Command Center 为 OpenClaw 提供**实时可视化总览**：会话、成本、系统健康、定时任务，一屏统一查看。

### ⚡ 快

- **单一 API 调用**：统一 state 接口，不用 16+ 次请求
- **2 秒级更新**：SSE 实时推送，不靠高频轮询
- **5 秒缓存**：高负载下更稳
- **开箱即用**：无构建步骤、无编译

### 🪶 轻

- **用户侧零依赖**（只需 Node.js）
- **整体体积小**（前后端合计约 200KB）
- **无 webpack/vite/bundler**
- **无 React/Vue/Angular**（原生 JS）

### 📱 自适应

- 桌面/手机都能用
- 深色主题，长时间看更舒服
- 数据自动刷新，无需手动 F5

### 🔒 安全（最重要）

| 特性 | 说明 |
| ---- | ---- |
| 认证模式 | Token / Tailscale / Cloudflare Access / IP 白名单 |
| 无外部遥测 | 100% 本地运行，无外部数据上报 |
| 默认 localhost | 默认绑定 `127.0.0.1` |
| 默认只读 | 先看后控，避免误操作暴露风险 |
| UI 不显示密钥 | API key / token 不会出现在前端 |

```bash
# 安全部署示例（Tailscale）
DASHBOARD_AUTH_MODE=tailscale node lib/server.js
```

---

## 功能特性

| 功能 | 说明 |
| ---- | ---- |
| 📊 会话监控 | 实时查看活跃 AI 会话 |
| ⛽ LLM 油量面板 | Token 用量、成本、额度 |
| 💻 系统状态 | CPU / 内存 / 磁盘 / 温度 |
| ⏰ Cron 任务 | 查看和管理定时任务 |
| 🧠 Cerebro 话题 | 自动话题归类与追踪 |
| 👥 操作者视图 | 谁在与代理交互 |
| 📝 记忆浏览 | 浏览记忆文件 |
| 🔒 隐私控制 | 演示时隐藏敏感信息 |
| 💰 成本拆解 | 按模型细分成本 |

---

## 快速开始

```bash
npx clawhub@latest install command-center
cd skills/command-center
node lib/server.js
```

默认访问：**http://localhost:3333**

<details>
<summary>可选：Git clone 方式</summary>

```bash
git clone https://github.com/jontsai/openclaw-command-center
cd openclaw-command-center
node lib/server.js
```

</details>

---

## 配置

### 常用环境变量

| 变量 | 说明 | 默认 |
| ---- | ---- | ---- |
| `PORT` | 服务端口 | `3333` |
| `OPENCLAW_WORKSPACE` | 工作目录 | 自动探测 |
| `OPENCLAW_PROFILE` | profile 名称 | (none) |

### 认证模式

| 模式 | 场景 |
| ---- | ---- |
| `none` | 本地开发 |
| `token` | 远程访问 |
| `tailscale` | 团队内网 |
| `cloudflare` | 公网部署 |
| `allowlist` | IP 白名单 |

---

## API

| 接口 | 说明 |
| ---- | ---- |
| `GET /api/state` | 全量看板数据（统一入口） |
| `GET /api/events` | SSE 实时数据流 |
| `GET /api/health` | 健康检查 |
| `GET /api/sessions` | 会话数据 |
| `GET /api/jobs` | 定时任务数据 |

---

## 更多中文文档

- 详细说明：[`docs/README.zh-CN.md`](./docs/README.zh-CN.md)
- 贡献指南：[`CONTRIBUTING.zh-CN.md`](./CONTRIBUTING.zh-CN.md)
- 行为准则：[`CODE_OF_CONDUCT.zh-CN.md`](./CODE_OF_CONDUCT.zh-CN.md)
- 架构概览：[`docs/architecture/OVERVIEW.zh-CN.md`](./docs/architecture/OVERVIEW.zh-CN.md)

---

## 许可证

MIT © [Jonathan Tsai](https://github.com/jontsai)

---

<div align="center">

**[ClawHub 安装](https://www.clawhub.ai/jontsai/command-center)** · **[OpenClaw](https://github.com/openclaw/openclaw)** · **[Discord](https://discord.gg/clawd)**

</div>
