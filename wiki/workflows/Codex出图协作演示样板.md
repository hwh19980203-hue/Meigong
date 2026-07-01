---
title: "Codex 出图协作演示样板"
date: 2026-07-01
tags: [工作流, 培训, Codex, AI作图, 演示]
---

# Codex 出图协作演示样板
## 真实启动口令

培训时可以先演示这一句：

```text
做 786
```

然后再进入下一步：

- 我去飞书读基础信息
- 你给开发文档
- 你给实拍图
- 我开始整理 prompt

这样才是你们真实的起手方式。

## 用途

这份文档不是理论说明，而是一份培训演示稿。

目标是让同事直接看懂一轮真实协作是怎么跑的：

1. 飞书自动读取基础信息
2. 美工补视觉意图
3. Codex / Claude 生成第一版提示词
4. 模型出第一轮图
5. 美工给结构化反馈
6. Codex / Claude 生成第二轮提示词

## 演示任务

本次用 [[wiki/cases/786-冰激凌水滴化妆包]] 做样板。

演示任务：

> 给 786 冰激凌水滴化妆包做一张新的 A+ 英雄图。

目标：

- 突出 12 件装
- 突出甜品风格和礼品感
- 保持产品外形完全一致

---

## 第一步：飞书自动读取基础信息

这一步不需要美工手填。

系统从飞书多维表格和知识库自动带出基础事实：

```text
产品编号：786
产品名：冰激凌水滴化妆包
店铺：WOODOUNAI
站点：US
ASIN：B0GZP37NYT
SKU：US02-MYL-XLH-FBA-034
是否已有历史案例：有
是否已有锁定母版：有
锁定母版路径：raw/assets/generated/786-冰激凌水滴化妆包/786-main-image-v6-locked-master-1600.png
产品页：wiki/products/786-冰激凌水滴化妆包
案例页：wiki/cases/786-冰激凌水滴化妆包
实拍图：raw/cases/786-马艳丽/786-real-1~7.jpg
```

这一层的意义：

- 不让美工重复填产品编号、店铺、站点
- 不让基础事实每次都靠人工口述
- 让 Codex / Claude 的提示词建立在固定事实源上

---

## 第二步：美工填写输入卡

美工只补视觉意图，不写 prompt。

### 美工填写示例

```text
任务类型：
A+ 图

这张图主要卖什么：
12个装、颜色可爱、适合礼品和日常收纳

这张图主要解决什么问题：
让买家一眼感觉这套产品适合送人，也能看出是多色套装

参考图角色：
主体参考图：786-main-image-v6-locked-master-1600.png
细节参考图：786-real-1~7.jpg
氛围参考图：甜品风礼品桌面参考图

不可变约束：
- 产品外形不能变
- 12个数量不能错
- 6色各2个不能错
- 每个包只能有1条拉链和1个拉链头
- 图案、颜色、底部华夫格不能变
- 不允许出现包装盒、手、logo、额外配件

这轮重点：
- 做 A+ 英雄图
- 更有礼品感和甜品氛围
- 产品主体不能漂
```

### 这一层的关键

美工不是在写 prompt，而是在回答 5 件事：

1. 这是什么图
2. 主要卖什么
3. 哪张图负责产品外形
4. 哪些地方不能变
5. 这轮重点改什么

---

## 第三步：Codex / Claude 先输出任务理解

收到输入后，不直接开始乱写图，先整理任务理解。

### 任务理解示例

```text
这是 786 产品的 A+ 英雄图，不是主图。
目标是强化“12件装 + 可爱甜品风 + 礼品感”。
产品主体必须严格沿用锁定母版，不能重绘。
允许优化的是背景氛围、场景构图和文案表达。
```

### 为什么先做这一步

因为很多返工不是 prompt 技术不够，而是任务理解一开始就偏了。

---

## 第四步：Codex / Claude 判断模型

### 模型判断示例

```text
这张图优先可以用 Banana 做第一轮氛围探索，
但产品主体不能交给模型自由重画。

更稳的方式：
锁定母版 + Banana 负责背景氛围 + 后续必要时分层合成。
```

### 判断逻辑

- A+ 英雄图偏氛围探索，适合 Banana
- 但 786 产品一致性要求很高，不能让模型重画主体
- 所以模型选型和产品锁定要同时成立

---

## 第五步：Codex / Claude 生成第一版 Prompt

下面是一版合格的第一轮 prompt 样板。

```text
Create an Amazon A+ hero banner for a 12-piece ice cream drip makeup bag set.

Input image roles:
- Image 1 is the locked product master and must be used as the exact product appearance source.
- Images 2-7 are real product references for pouch shape, zipper detail, fabric texture, waffle-cone print, frosting drips, and sprinkle pattern.
- Atmosphere references are for dessert-party mood only, not product appearance.

Canvas:
Final crop 970x600 px.
Wide horizontal A+ hero layout.

Scene:
Bright pastel dessert-party tabletop scene with soft gift-like atmosphere.
Use clean sweet color accents, subtle tabletop props, and gentle studio lighting.
Keep the product group as the hero in the center or lower-center area.

Text:
Main headline only:
"Sweet Storage for Every Day"

Subheadline:
"12 cute makeup bags for gifts, travel, and daily essentials"

Product rules:
Preserve the exact product identity:
12 bags total, 6 colors, 2 bags per design.
Each pouch must have exactly one zipper and one metal zipper pull.
Keep pouch shape, rounded structure, base support, waffle-cone lower print, white melting layer, frosting drips, sprinkles, and woven texture consistent with the locked master.

Avoid:
No logo, no packaging, no hands, no extra accessories, no changed pouch shape, no second zipper, no new colors, no fake gift box implied as included.
```

### 这版 prompt 为什么算合格

因为它具备这些关键结构：

- 任务类型明确
- 参考图角色明确
- 画布尺寸明确
- 场景目标明确
- 文案要求简短
- 产品硬约束明确
- Avoid 明确

---

## 第六步：假设第一轮图出现的问题

培训时不要假装 AI 一次就完美。

真实流程里，第一轮图更可能是：

- 氛围对了
- 但产品不够饱满
- 个别包像双拉链
- 产品主体和锁定母版不够一致

这才是最常见、最值得演示的情况。

---

## 第七步：美工给结构化反馈

### 错误反馈示例

```text
再高级一点，再改改。
```

问题：

- 没说哪部分是对的
- 没说哪部分错了
- 没说这轮只改什么

### 正确反馈示例

```text
保留不动：
- 整体甜品氛围
- 画面配色
- A+ 英雄图构图方向

当前错误：
- 个别包看起来像双拉链
- 包身不够饱满
- 底部支撑感弱
- 产品主体和锁定母版不够一致

这轮只改：
1. 所有包统一改回单拉链
2. 包身更饱满，底部更有支撑感
3. 保持其他构图和氛围不动
```

### 这一步的意义

这决定了第二轮 prompt 是“局部修正”，还是“整张图重新漂掉”。

---

## 第八步：Codex / Claude 生成第二轮 Prompt

### 第二轮 Prompt 示例

```text
Revise the current A+ hero image.

Keep unchanged:
- overall dessert-party atmosphere
- pastel color palette
- current composition direction

Fix only these points:
1. every pouch must show exactly one zipper and one metal zipper pull
2. make each pouch look more softly filled and more supported at the base
3. align the pouch shape more closely with the locked master reference

Do not change:
- product quantity
- color order
- printed artwork
- overall composition
- background mood
```

### 第二轮 prompt 的关键

它不是重写整张图，而是：

- 保留正确部分
- 只修错误部分
- 锁住不允许变化的区域

这就是为什么“结构化反馈”会直接影响出图效率。

---

## 第九步：这一轮流程里，每个人实际做了什么

### 飞书

- 提供产品基础事实

### 美工

- 补视觉意图
- 指定参考图角色
- 判断哪里错了
- 指定这轮只改什么

### Codex / Claude

- 整理任务理解
- 判断模型
- 生成第一轮 prompt
- 根据反馈生成第二轮 prompt

### GPT / Banana

- 负责出图，不负责判断“这图能不能交”

---

## 第十步：培训时要让同事记住什么

这一整轮流程，真正要学会的不是 prompt 文笔，而是以下 4 句话：

1. 先把参考图角色说清楚
2. 先把不能变的地方说清楚
3. 第一轮先看大方向，不追终稿
4. 第二轮反馈必须写成“保留 / 错误 / 本轮只改什么”

---

## 最后总结

这套流程为什么比“美工直接喊一句改一下”更高效？

因为它把工作分工彻底拆清楚了：

- 飞书负责事实
- 美工负责视觉判断
- Codex / Claude 负责写 prompt
- 模型负责出图

所以它不是让所有人都去学 prompt，  
而是让每个人只做自己最应该做的那一部分。

## 参见

- [[wiki/templates/AI提示词输入卡-飞书自动读取版]]
- [[wiki/templates/Codex出图指令模板]]
- [[wiki/workflows/黑伞美工-Codex出图协作手册]]
- [[wiki/cases/786-冰激凌水滴化妆包]]
