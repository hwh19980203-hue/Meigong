---
title: "飞书 CLI 接入配置"
date: 2026-06-16
tags:
  - 工作流
  - 飞书
  - CLI
  - AI作图
---

# 飞书 CLI 接入配置

> 本页记录当前工作区接入飞书 CLI 的安装状态、命令路径和后续授权步骤。目标是让 Codex 后续能按产品编号读取飞书需求记录，再生成作图 Brief 和 GPT 提示词。

## 当前状态

已安装飞书官方 CLI：

```powershell
.\.codex\tools\lark-cli-bin\lark-cli.exe --version
```

当前版本：

```text
lark-cli version 1.0.54
```

安装位置：

```text
D:\idea\小火龙的美工\美工\.codex\tools\lark-cli-bin\lark-cli.exe
```

二进制来源：

```text
@larksuite/cli 1.0.54
lark-cli-1.0.54-windows-amd64.zip
```

SHA256 已校验：

```text
CE247DD2DCD548F5DFA834433856DEB06C2BD2E46516966FADF3FDE9179B3F6A
```

## 当前连接状态

飞书应用配置和用户登录授权已完成。

检查命令：

```powershell
$env:USERPROFILE = "D:\idea\小火龙的美工\美工\.codex\lark-home"
$env:HOME = "D:\idea\小火龙的美工\美工\.codex\lark-home"
.\.codex\tools\lark-cli-bin\lark-cli.exe auth status
```

当前结果：

```text
bot identity: ready
user identity: ready
```

当前配置文件位于工作区本地目录：

```text
D:\idea\小火龙的美工\美工\.codex\lark-home\.lark-cli\
```

`.codex/` 已加入 `.gitignore`，避免本地凭证和授权 token 被误提交。

## 推荐配置方式

由于当前终端环境不能稳定保持 `config init --new` 的网页等待流程，推荐使用飞书开放平台已有应用的 App ID / App Secret 进行非交互配置。

配置命令格式：

```powershell
"你的 App Secret" | .\.codex\tools\lark-cli-bin\lark-cli.exe config init --app-id "你的 App ID" --app-secret-stdin --brand feishu --lang zh
```

注意：

- App Secret 属于敏感信息，优先由用户在本机终端输入，不建议写入知识库
- 配置完成后，再执行登录授权
- 登录时建议按作图需求读取范围授权 `base`、`docs`、`drive`、`wiki`

## 登录授权

如 token 过期或换账号，配置 App 后执行：

```powershell
.\.codex\tools\lark-cli-bin\lark-cli.exe auth login --domain base,docs,drive,wiki --no-wait --json
```

该命令会返回授权链接和 device code。用户打开链接完成授权后，再执行：

```powershell
.\.codex\tools\lark-cli-bin\lark-cli.exe auth login --device-code "上一步返回的 device_code"
```

最后检查：

```powershell
.\.codex\tools\lark-cli-bin\lark-cli.exe auth status
```

## 已验证读取

飞书 Wiki 链接已成功解析为多维表格：

| 项目 | 内容 |
|------|------|
| 标题 | 新品进度总表（更新时间2024.08.11） |
| Wiki node token | CXxdwRjp4iAeBmks0T4crBwgn0d |
| Base token | K2Lab76d1abTDDsQt0BcEpwFnFg |
| 主表 | 新品开发总表 |
| 主表 table id | tblInFIlWeYyZjde |

已验证按编号读取 `784`，并下载参考图到：

```text
raw/feishu/784/image.png
```

## 作图读取入口

固定飞书需求记录链接：

```text
https://uikz7wcmjbd.feishu.cn/wiki/CXxdwRjp4iAeBmks0T4crBwgn0d?from=from_copylink
```

后续作图任务应先读 [[wiki/workflows/飞书多维表格到AI作图需求流转]]，再读取本页确认 CLI 状态。

## 参见

- [[wiki/workflows/飞书多维表格到AI作图需求流转]]
- [[wiki/products/784-波西米亚风木质笔筒]]
- [[wiki/templates/AI作图需求缺口补充表]]
- [[wiki/templates/AI作图任务标准输入表]]
