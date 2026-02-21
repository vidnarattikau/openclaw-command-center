# OpenClaw 指挥中心 — 架构总览

> _“主宰通过 Overlord 看见一切。”_

## 概述

OpenClaw Command Center 是一个实时监控与管理 AI 助手编排的控制台。它提供会话、Token 用量、成本、定时任务与系统状态的统一可视化。

## 核心架构原则

### 1) DRY（不重复）

- 共享组件抽成可复用 partial/module
- 侧边栏、样式与公共逻辑保持单一事实来源
- 配置集中管理

### 2) 实时优先

- 使用 SSE 推送实时更新
- 连接正常时不依赖轮询
- SSE 不可用时可降级

### 3) 零构建步骤

- 纯 HTML/CSS/JS
- 无编译、无打包、无转译
- 静态文件可直接运行
- 通过 `fetch()` 动态加载共享片段

### 4) 渐进增强

- 无 JS 可提供基础功能
- 有 JS 提供增强体验（实时更新、交互优化）
- 原生移动端自适应

### 5) 主题一致性

- Starcraft/Zerg 主题风格统一
- 默认深色视觉
- 命名风格保持一致

## 系统组件（简化）

```text
Browser
├─ index.html（主面板）
├─ jobs.html（AI 任务页）
├─ /partials/sidebar.html（共享侧边栏）
└─ /js/sidebar.js（加载侧边栏 + SSE 徽章）

Server
└─ lib/server.js
   ├─ HTTP + API
   ├─ SSE 事件广播
   └─ 静态文件服务

Data Sources
├─ OpenClaw Gateway API
├─ Jobs Scheduler API
└─ Linear API（可选）
```

## 前端架构

### 页面

| 页面 | 作用 | 主要区域 |
| --- | --- | --- |
| `index.html` | 主面板 | 系统状态 / LLM 用量 / 会话 / Cron / 记忆 / Cerebro / 操作者 |
| `jobs.html` | AI 任务管理 | 任务卡片、运行/暂停、历史记录 |

### 共享组件

| 组件 | 位置 | 作用 |
| --- | --- | --- |
| Sidebar | `/partials/sidebar.html` | 导航 + 实时统计徽章 |
| Sidebar JS | `/js/sidebar.js` | 片段加载、SSE 连接、导航状态 |
| 样式 | `/css/dashboard.css` | 全局共享视觉 |
| morphdom | `/js/lib/morphdom.min.js` | 高效 DOM 差量更新 |

### 状态管理

- **SSE 驱动**：服务端推状态
- **本地状态**：组件内部闭包状态
- **持久化**：`localStorage`（如侧边栏折叠状态）

## 后端架构

### 服务端（`lib/server.js`）

- Express HTTP 服务
- `/api/*` 接口
- `/api/events` SSE 推送
- 静态资源分发

### 数据来源

| 来源 | 集成方式 | 用途 |
| --- | --- | --- |
| OpenClaw Gateway | REST | 会话、Token、系统状态 |
| Jobs Scheduler | REST | 任务定义与运行历史 |
| Linear | GraphQL | 议题追踪（可选） |

### 配置（`lib/config.js`）

- 自动探测 OpenClaw 路径
- 支持多配置来源
- 支持环境变量覆盖

## API（核心）

| 接口 | 方法 | 说明 |
| --- | --- | --- |
| `/api/events` | GET (SSE) | 实时状态流 |
| `/api/state` | GET | 当前完整状态快照 |
| `/api/sessions` | GET | 会话列表 |
| `/api/jobs` | GET | 任务定义 |
| `/api/jobs/:id/run` | POST | 触发任务 |
| `/api/jobs/:id/pause` | POST | 暂停任务 |
| `/api/jobs/:id/resume` | POST | 恢复任务 |
| `/api/jobs/:id/history` | GET | 任务历史 |

## 关键设计决策（ADR 摘要）

### ADR-001：侧边栏用 fetch 加载

- 结论：采用 `fetch()` 加载 `/partials/sidebar.html`
- 理由：保持零构建；静态服务可直接跑；共享组件单一来源

### ADR-002：实时通信采用 SSE

- 结论：SSE 替代 WebSocket
- 理由：更简单、可自动重连、代理兼容更好、满足单向推送场景

### ADR-003：DOM 更新采用 morphdom

- 结论：引入 morphdom 做差量 patch
- 理由：轻量、无框架、可保留焦点/滚动/表单状态

## 性能关注点

1. SSE 连接集中复用
2. 共享片段懒加载，减少首屏阻塞
3. DOM 差量更新，避免整页重绘
4. 高频更新做节流/批量渲染

## 安全关注点

1. 前端不暴露密钥
2. API 输入校验
3. 默认同源与本地访问
4. 公网部署建议加认证与限流

## 后续方向

1. 更多可复用组件（stats、modal 等）
2. 插件化扩展区域
3. 多 OpenClaw 实例统一监控
4. 历史趋势分析（Token/成本）
