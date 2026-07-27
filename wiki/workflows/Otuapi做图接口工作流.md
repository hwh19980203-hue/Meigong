---
title: "Otuapi 做图接口工作流"
date: 2026-06-17
type: workflow
tags: [AI作图, Codex, otuapi, MCP]
---

# Otuapi 做图接口工作流

## 用途

黑伞美工知识库已把 otuapi 的图片接口接入 Codex，作为日常作图、测试图、主图草稿、A+ 图草稿和参考图改图的本地工具。

## 调用方式

- 文生图或带参考图生成：调用 `otuapi_image.generate_image`（image2 和 Banana 模型均支持 `images` 参考图参数）
- 参考图改图：调用 `otuapi_image.edit_image`
- 默认模型：`image2`
- 生成资产目录：`raw/assets/generated/`
- 正式交付目录：`output/imagegen/[编号-产品名]/`
- 常用尺寸：`1024x1024`、`1024x1792`、`1792x1024`

## 模型路由

- `image2`：默认走 OpenAI 兼容图片接口，生成图使用 `/v1/images/generations`，改图使用 `/v1/images/edits`。
- `nano_banana_2`、`nano_banana_pro-*`：固定走异步任务接口 `POST /v1/videos`，随后轮询 `GET /v1/videos/{task_id}`，拿到结果 `url` 后下载保存到 `raw/assets/generated/`。
- `gemini-3-pro-image-preview`、`gemini-3.1-flash-image-preview`：固定走 Gemini 原生同步接口 `/v1beta/models/{model}:generateContent`。
- 常规调用时 `api_format` 保持 `auto`，只需要传 `model: "nano_banana_2"` 即可触发 Banana 路径。
- `nano_banana_2` 的参考图仍通过 `images` 参数传入；`size` 会自动转换成接口需要的 `aspect_ratio`。
- Codex MCP 工具 schema 在启动时加载。修改 `tools/otuapi-image-mcp/` 后，已经打开的另一个窗口需要重启 Codex 或重载 MCP 才能看到新参数。

## 密钥与配置

- Codex MCP 配置位于 `C:\Users\Q\.codex\config.toml`
- 密钥变量名：`OTUAPI_API_KEY`
- 密钥保存在用户环境变量或 `C:\Users\Q\.codex\.env`
- 不要把密钥写入 Wiki、产品页、案例页或仓库文件

## 标准流程

1. 用户提出作图需求。
2. Codex 先读取相关产品页、案例页、规范页或模板页，补齐产品事实、所属店铺、平台规范和视觉要求。
3. Codex 生成清晰提示词，必要时说明尺寸和输出用途。
4. Codex 调用 `otuapi_image` 生成或改图。**无论使用 `image2` 还是 `nano_banana_*` 模型，都必须先读取产品页的实拍参考图，通过 `images` 参数传入 API 作为产品外观依据**，不得仅靠文字描述让模型想象产品形状和纹理。
5. 如果已有通过确认的首图或实拍母版，先抠出并锁定产品主体；A+、场景图和广告图不得整图重绘产品。
6. AI 只生成不含产品的背景或非产品元素，再将锁定产品通过分层合成放入场景。
7. API 原图、修改版本、抠图资产和总览图保存到 `raw/assets/generated/`。
8. Codex 将衍生图与产品母版并排检查：轮廓、比例、边缘、孔位、材质、图案和连接方式必须一致；只检查文字与数量不算通过。
9. 质检通过后，按交付尺寸和清晰命名把终版复制到 `output/imagegen/[编号-产品名]/`。该目录只保留可直接交付的最终图片。
10. Wiki 产品页和案例页引用 `raw/assets/generated/` 中的稳定资产，同时记录正式交付目录路径。
11. 更新对应 `wiki/cases/`、`wiki/products/`、`wiki/index.md` 和 `wiki/log.md`，再向用户提供生成资产目录和正式交付目录。

## 成本止损规则

> [!warning] 连续失败必须停
> 同一张图同一目标下，如果连续 2 次 API 结果都明显偏离产品实物、核心版式或用户明确要求，立即停止继续调用接口，先复盘失败原因并请用户确认替代方案。

- 明显偏离包括：产品外形漂移、图案结构错误、数量或排列错误、角度和构图脱离用户认可版本、抠图/拼版质量明显不具备交付价值。
- 失败稿只可保存在 `raw/assets/generated/` 作为过程记录，不得复制到 `output/imagegen/`，不得在产品页或案例页标为最终版。
- 停止后必须向用户说明：已尝试的模型或接口、失败点、为什么继续生成会浪费 token/API 额度、可行替代路径。
- 用户明确说“别生成了 / 停止 / 不要继续”时，立即停止所有外部接口调用和自动拼版处理。
- 对产品一致性要求高的任务，优先在第一次失败后改为人工 PS、固定母版分层合成或补拍实物，不应继续让模型整图重绘产品。

## 产品母版锁定规则

> [!important] 强制规则
> 已有用户确认首图、白底图或实拍图时，产品主体必须作为不可重绘资产处理。otuapi 可用于生成背景或进行产品外区域编辑，但不得以“参考图改图”的方式重新生成整个产品。

- 允许：整体缩放、旋转、透视放置、合理阴影和环境反光。
- 禁止：改变产品内部像素、重新生成轮廓、重画文字、改变边缘和孔位。
- 尺寸图、材质图、步骤图优先使用同一母版的局部裁切。
- 如果工具无法保持产品像素不变，停止生成并改用合成流程。
- 产品母版对照未通过时，不得进入正式交付目录。

## 双层目录职责

| 目录 | 保存内容 | 使用对象 |
|------|----------|----------|
| `raw/assets/generated/` | API 原图、修改版本、总览图、知识库嵌入图、历史成果 | Codex、Obsidian、复盘与再次修改 |
| `output/imagegen/[编号-产品名]/` | 质检通过、尺寸正确、命名清晰的终版图片 | 运营、美工、开发和正式交付 |

> [!important] 引用原则
> Wiki 不直接嵌入 `output/` 图片。交付目录可能因业务需要重新整理或重命名，知识库应继续引用 `raw/assets/generated/` 中的稳定文件。

## 参见

- [[wiki/workflows/Codex调用GPT作图工作流]]
- [[wiki/workflows/AI生图提示词模板]]
- [[wiki/templates/AI作图任务标准输入表]]
