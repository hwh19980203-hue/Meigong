---
title: "Nano Banana Pro 亚马逊套图提示词模板"
source: "https://cloud.tencent.cn/developer/article/2626733"
date: 2026-06-24
type: article
tags: [Nano Banana, 提示词模板, 亚马逊主图, A+配图, AI生图]
---

# Nano Banana Pro 亚马逊套图提示词模板

> 来源：腾讯云开发者社区文章《一张随手拍，让Nano banana pro批量生成亚马逊商品套图（附完整提示词）》。同内容也见于 AMZ123 和什么值得买。文章提供 7 种提示词模板可直接复用。

## 核心方法论

上传一张随手拍作为参考图 + 选用对应场景的提示词模板 → 批量生成全套合规亚马逊商品图。模板中保留产品外观描述的空位，而将背景、构图、光影、风格等交由 AI 按指令生成，实现"一图多用、批量产出"。

## 7 大类型提示词模板

详见 [[wiki/workflows/AI生图提示词模板#Nano Banana 七大提示词模板（来源）]]。

## 工具链与定价

批量化生产流水线：源头 API（grsai.ai）→ 批量生图工具（image.grsai.ai）→ 建立"图片生成流水线"

| 模型 | 单价 |
|------|------|
| Nano Banana | ¥0.022/张 |
| Nano Banana Pro | ¥0.09/张 |
| Gpt-image-1.5 | ¥0.02/张 |

## 参考链接

- https://cloud.tencent.cn/developer/article/2626733
- https://www.amz123.com/t/DGzxOFoL
- https://post.smzdm.com/p/al46r3ne/
