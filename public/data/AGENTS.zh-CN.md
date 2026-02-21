# public/data/ — 用户特定数据

以下文件**不要提交到仓库**，它们包含用户私有数据：

| 文件 | 用途 | 模板 |
| --- | --- | --- |
| `operators.json` | 从会话推断的操作者信息 | `operators.json.example` |
| `privacy-settings.json` | 演示时隐藏项的隐私设置 | `privacy-settings.json.example` |

## 为什么不能提交？

这些文件在运行时生成，可能包含：

- 用户 ID 与用户名
- 会话数量与活跃信息
- 隐私偏好（隐藏了什么）

提交它们会导致用户数据泄露。

## 新环境初始化

可用 `.example` 模板初始化：

```bash
cp operators.json.example operators.json
cp privacy-settings.json.example privacy-settings.json
```

首次运行后，面板会自动填充这些文件。
