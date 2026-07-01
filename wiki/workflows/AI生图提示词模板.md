---
title: "AI 生图提示词模板"
date: 2026-06-11
tags:
  - 工作流
  - 提示词
  - AI作图
  - 模板
---

# AI 生图提示词模板

> 本页沉淀美工部门常用 GPT 作图提示词结构。使用前先填写 [[wiki/templates/AI作图任务标准输入表]]，再由 Codex 根据产品资料、规范和模板生成最终提示词。

---

## 精准命令结构（核心原则）

> 以下 5 条原则来自 786 冰激凌水滴化妆包（6 轮拉链纠错）和 773 God Bless 拉旗（产品母版锁定）的实际经验。**直接决定了出图是一次过还是反复返工。**

### 原则 1：参考图 > 文字描述

❌ 模糊：「产品是一个鼓鼓的化妆包，有拉链」
✅ 精准：「产品外观以实拍图为准。拉链位置、朝向、数量、包身形状全部按实拍图还原。」

AI 对「鼓鼓的」「小巧的」「精致的」这类形容词的理解和人类不同。**物理特征必须用实拍图定义，而不是文字。**

### 原则 2：正向物理约束 > 否定词

❌ 否定：「不要双拉链，不要拉链朝上，不要包太瘦」
✅ 正向：「包顶部有 1 条拉链，拉链头在左上角向下垂。包宽高比约 4:3。」

否定词 AI 经常忽略（尤其是 image2 模型），物理参数 AI 更难出错。

### 原则 3：分步结构 > 长篇大论

```
[任务] → [参考图声明] → [物理约束] → [布局] → [风格] → [禁止项]
```

每段聚焦一个主题，AI 更容易理解优先级——**外观约束最优先，其次布局，最次风格**。不分段时 image2 模型容易把风格要求误解为比物理特征更重要。

### 原则 4：「以实拍图为准」必须写在最前面

```markdown
## 产品实拍图优先指令（最高优先级）
本任务的唯一产品外观依据是附带的实拍图。
实拍图决定：产品颜色、材质、结构、形状、配件、数量、包装和标签。
如果参考图与实拍图在产品外观上冲突，以实拍图为准。
```

这条在 786 的拉链修复中起了决定性作用——加了这条之后 AI 不再自己发明拉链样式。

### 原则 5：迭代时说「改什么」不说「重做」

```
## 需要保留
- 产品外形、颜色、结构（不变）
- 当前构图大方向

## 需要修改
- [具体问题1]
- [具体问题2]

## 禁止
- 不要重新设计整体方向
- 不要改变已确认的部分
```

每次修改只说改什么，避免 AI 把已经做对的部分也改掉了。

---

## 通用提示词骨架

```markdown
你是一名资深亚马逊电商视觉设计师，请根据以下产品资料生成[图片类型]。

产品信息：
- 产品名称：
- 所属店铺：
- 材质：
- 颜色：
- 尺寸：
- 结构：
- 包装内容：
- 必须保持不变的细节：

图片目标：
- 用途：
- 目标站点：
- 图片比例：
- 输出尺寸：
- 需要张数：

画面要求：
- 店铺/品牌风格：
- 构图：
- 背景：
- 光影：
- 风格：
- 是否有人物/模特：
- 必须展示的卖点：

文案要求：
- 是否需要英文文案：
- 标题：
- 卖点短语：
- 实拍文字/字母道具：
- 禁止使用的词：

平台与合规要求：
- 遵守亚马逊图片规范
- 不要出现水印、官方认证标识、无授权商标
- 不要套用竞品构图
- 不要添加产品不存在的配件
- 准确代表实际销售商品，不改变实物颜色、材质、结构、数量和尺寸比例
- 美化只限于清洁背景、基础修图、光线校正和合理摆放，不做幻想化升级

输出：
- 生成多个方案
- 每张图保持产品外形、颜色、结构一致
```

## 实拍文字道具约束

当产品包含实拍字母、吊牌、拉旗、贴纸、包装文字或其他固定文案道具时，不要让模型自由生成文字，应把它当作“产品结构”来还原。

提示词必须写清：

```markdown
文字/字母道具必须参考实拍图还原，不得重新设计。
逐字保留：[逐字列出文案或字母件]。
如有装饰符号或结尾挂件，也必须单独保留：[说明挂件位置和造型]。
装饰符号不能替代任何字母。
如果文字难以保证准确，应缩小或弱化文字区域，但不能错拼、少字、乱加字。
```

质检必须检查：

- 是否少字母、错字、断字或多字
- 字母顺序是否和实拍一致
- 装饰挂件是否存在且位置正确
- 装饰挂件是否误替代了字母

示例：新娘派对装饰的金色拉旗必须是 `Bride to Be` + 结尾独立钻戒挂件；`Bride` 不能少 `e`，`Be` 后的钻戒挂件不能丢，也不能替代任何字母。

## 固定数量与固定位置结构约束

当产品由可数的字母片、符号片、挂件、配件或多组套装组成时，只写“数量正确”不够，必须同时定义总数、分组数量、逐项顺序和符号位置。

提示词必须写清：

```markdown
固定结构必须逐项还原，不得省略、合并或用装饰件替代。
- 每组总件数：[数量]
- 分组结构：[上层/下层/左侧/右侧等]
- 从左到右顺序：[逐项列出]
- 固定符号位置：[符号必须位于哪些字母或部件两侧]
- 多套合计数量：[数量]
- 禁止：少件、多件、错位、把蝴蝶结等装饰件当作符号件
```

质检必须同时检查：

- 单组总件数和多组合计数是否正确
- 每个字母、符号和配件是否位于指定位置
- 装饰件是否误替代了产品结构件
- 总数正确但局部顺序或分组错误的情况

示例：God Bless 拉旗每套必须是上层 `十字架 + G + O + D + 十字架`（5 片），下层 `十字架 + B + L + E + S + S + 十字架`（7 片），合计 12 片、4 个十字架；两套合计 24 片、8 个十字架。蝴蝶结位于绳端，不能替代十字架旗片。

## 亚马逊真实性约束

亚马逊商品图的第一目标是准确代表所售商品。AI 可以帮助清洁、摆放和增强可读性，但不能把产品变成“更高级但不真实”的版本。

提示词必须写清：

```markdown
Use a realistic product-composite style.
Accurately match the photographed product colors, materials, shapes, proportions, and included item counts.
Retouch only for cleanliness, lighting, and presentation.
Do not beautify into a different product.
Do not add props or accessories that are not included in the package.
Do not change paper, fabric, foil, balloon, or printed-text materials into more premium materials.
```

质检必须检查：

- 颜色是否和实拍一致
- 形状/结构是否和实拍一致
- 数量是否和包装清单一致
- 材质是否被 AI “升级”成不真实效果
- 场景道具是否会让买家误以为包含在套装内

## 产品实拍图优先约束

AI 出图必须以产品实拍图为唯一产品外观依据。此约束优先级高于所有构图、风格和场景要求。

提示词必须写清：

```markdown
## 产品实拍图优先指令
本任务的唯一产品外观依据是附带的实拍图（Reference Photos）。
实拍图决定：产品颜色、材质、结构、形状、配件、数量、包装和标签。
参考图/竞品图（Reference Images）仅用于构图、氛围、场景和风格参考。
如果参考图与实拍图在产品外观上冲突，以实拍图为准。
不要为了贴近参考图的视觉效果而改变产品的实际外观。
```

Codex 生成提示词时必须遵守的规则：

1. 如果实拍图与参考图在产品颜色/材质/结构/数量上冲突，以实拍图为准
2. 如果实拍图显示了某个部件（如白色塑料手柄），但参考图中该部件是另一种材质（如木色），按实拍图还原
3. 如果实拍图显示产品是纯白色，但参考图中产品有花纹，按实拍图还原
4. 美工质检时，必须打开实拍图逐图比对，不能凭记忆或参考图判断

## 白底主图模板

```markdown
产品精修，[产品名称]置于纯净的纯白背景上，正视图或轻微 45 度视角。
精准还原产品材质、颜色、尺寸比例和结构细节。
清除指纹、灰尘、褶皱和瑕疵，让产品看起来干净、真实、有质感。
不得添加任何未包含在包装内的配件。
不得出现文字、水印、边框、徽章、Amazon Choice、Best Seller 等官方标识。
图片比例 1:1，建议 2000×2000 px。
```

## 附图/卖点图模板

```markdown
为[产品名称]生成亚马逊附图，主题为[核心卖点]。
画面需要突出[具体功能/材质/尺寸/使用效果]。
使用清晰的信息层级：主标题、短卖点、局部放大/箭头标注。
英文文案必须拼写正确，文字区域清晰可读。
产品形态、颜色和结构必须与参考图一致，不要新增不存在的部件。
整体风格真实、干净、适合亚马逊 Listing。
```

## A+ 模块图模板

```markdown
为[产品名称]生成 A+ 页面模块图。
模块类型：[英雄图/卖点图/细节图/对比图/尺寸图/场景图/品牌图]。
画面风格：[品牌调性]，背景为[场景]。
突出卖点：[卖点1]、[卖点2]、[卖点3]。
如包含英文文案，需简短、准确、有层级。
构图需预留文字区域，避免文字压住产品主体。
遵守 A+ 页面规范，图片清晰、真实、无侵权元素。
```

## 广告素材模板

```markdown
为[产品名称]生成亚马逊广告素材。
广告类型：[Sponsored Brands / Sponsored Display / 站外广告]。
核心转化目标：[点击/促销/新品曝光/品牌认知]。
画面需要在 1 秒内传达：[核心卖点或优惠信息]。
产品主体清晰，背景简洁，视觉对比强。
文案短促有力，避免夸大承诺和商标侵权词。
输出 3 个不同构图方案，方便美工选择。
```

## 修改提示词模板

```markdown
请基于上一版继续修改，不要重新设计整体方向。

需要保留：
- 产品外形、颜色、结构
- 当前构图的大方向
- 已确认的文案

需要修改：
- [问题1]
- [问题2]
- [问题3]

禁止：
- 不要新增产品不存在的配件
- 不要改变产品比例
- 不要使用竞品相似背景或构图
```

## Nano Banana 七大提示词模板（来源）

> 以下模板来自 [[wiki/sources/2026-06-24-Nano Banana Pro亚马逊套图提示词模板]]，适用于 Google Nano Banana / Nano Banana Pro 模型。核心方法：**上传实拍图作为参考 + 选对应模板 → 批量出图**。模板中的产品外观描述需根据实际产品替换。

### 1. 主图（白底图）

```text
Generate a professional Amazon main image. Using the precise appearance of the product from the reference image, a realistic rendering is performed, preserving true colors, proportions, and details. The product is placed in the center of the frame, occupying at least 85% of the space, against a pure white background (RGB 255,255,255). Professional studio lighting is used, with soft, natural shadows, high-brightness illumination, and sharp global focus. No additional props, text, logos, or elements are included. The result is a clean, minimalist, business e-commerce style with ultra-high detail and 4K resolution.
```

### 2. 生活方式图（场景图）

```text
Generate an Amazon lifestyle image based on the provided reference image. The image automatically infers the most suitable target users, environment, and benefit presentation method based on product appearance and typical uses. The product must be clearly visible and centered, with natural lighting, realistic proportions and shadows, a comfortable or efficient atmosphere, an overall realistic style, high detail, no text overlays, and a professional Amazon A+ content style.
```

### 3. 信息图（卖点概览）

```text
Based on the product in the reference image, generate an Amazon product infographic. Analyze the product's usage scenarios and core functional technologies, and generate a key selling point using a large title in the top white space. Use minimalist arrows to label 2-3 brief material features of the product, leaving natural white space for adding text/labels. The style should be modern and minimalist, with a soft, light gradient background. Use soft studio lighting to eliminate shadows, and achieve 8K resolution for photorealistic results.
```

### 4. 多角度图

```text
Based on the product in the reference image, generate one image each: front view, side view, back view, and top view. White background, professional lighting, and photos must be taken strictly according to the proportions shown in the attached image. No modifications to the product design are permitted.
```

### 5. 材质工艺图

```text
Generate a detailed Amazon infographic based on the product in the reference image, focusing on materials and craftsmanship. The product is centrally positioned and rendered realistically. Key craftsmanship features are automatically analyzed and highlighted based on visible textures, surface finishes, structural details, seams, and materials. Include zoom-in images, arrows, or labels, along with concise descriptive text. Clean layout, subtle icons, white background, and ultra-sharp text and details create a professional product presentation style.
```

### 6. 尺寸参数图

```text
Generates an Amazon-compatible size chart based on the product in the reference image. The product is centered, and parameters such as height, width, depth, weight, and capacity are automatically and concisely labeled based on visible or logical dimensions. Features a minimalist background, sharp lines, and a readable sans-serif font; realistic rendering; high precision; and an e-commerce optimized style.
```

### 7. 多场景网格图

```text
Generate an Amazon infographic grid based on the products in the reference images, showcasing multiple real-world usage scenarios for the products in the attached reference photos. Automatically identify 4-6 suitable life scenarios and corresponding benefits based on product type and appearance. Arrange small, realistic scene images in a grid or collage format, with each scene subtly overlaid with brief text describing the benefits or context.
```

## EvolveAMZ 提示词精炼框架（来源）

> 以下内容来自 [[wiki/sources/2026-06-24-AI电商摄影EvolveAMZ2026指南]]。核心原则：**模糊的提示词产生通用图像**，必须精确到摄影术语。

### 提示词六大要素

有效提示词应同时包含以下 6 个维度：

```text
[摄影风格] + [光线描述] + [构图细节] + [环境背景] + [材质纹理] + [氛围调性]
```

示例对比：
```
❌ "nice photo of product in kitchen"
✅ "Product photo on marble kitchen counter, soft natural morning lighting,
    shallow depth of field, overhead 45-degree angle, premium minimalist aesthetic"
```

### 五步迭代工作流

1. **生成初稿** — 每次 4-8 个变体
2. **分析效果** — 评估产品准确性、背景质量
3. **精炼提示词** — 针对性强化弱点
4. **跨工具测试** — 同一提示词在不同工具间比较
5. **终版精修** — 选最优产出，PS 微调

### 合规红线

> 产品准确性是唯一不能打破的规则。AI 应围绕实拍构建环境，而非凭空生成产品。

## Banana（Nano Banana）提示词风格参考

> 当使用 Google Nano Banana（Gemini 系）模型出图时，提示词风格与 image2/传统模型不同。Banana 采用推理引导架构（Plan→Evaluate→Improve），更擅长理解结构化指令，文字渲染更准确，可传入参考图保持主体一致性。

### 与 image2 提示词的风格对比

| 维度 | image2 风格（当前模板） | Banana 风格 |
|------|-----------------------|-------------|
| **长度** | 长文本，事无巨细 | 可缩短 30-50%，结构更精炼 |
| **否定词** | 大量 `No xxx, no xxx` | 正向指令即可，模型会推理规避 |
| **文字** | 反复强调拼写正确 | 正常描述即可，自检文字准确性 |
| **布局** | 全写在一段里 | 可拆成步骤 / 分块描述 |
| **参考图** | 靠文字「match real photos」 | 直接传参考图（最多 14 张） |
| **主体一致** | 每次独立拼人品 | 参考图锁定，多图更稳定 |

### 对照示例：773 God Bless 首图 ST

**image2 风格（当前）：**
```text
Amazon listing image 1 of 7, corrected main image, square 1:1, pure white background. Product-only composition. Use the exact corrected layout: top curved strand spells "GOD" with three pennant flags; bottom curved strand has a pink cross flag on the far left, then "BLESS" across five flags, then a pink cross flag on the far right. All letters must be present and correctly ordered: G O D / B L E S S. The letter G must be a normal uppercase serif G, same height and weight as O and D, with correct proportions like the real photographed G, not oversized, not distorted, not lowercase, not a spiral. Product must match real photos: double-layer paper pennant flags, white front layer, pink scalloped back layer, pink printed uppercase serif letters, pink cross flags, pink bows, small punched holes, white string. Pink bows at the upper string ends. No extra labels, no added numbers, no marketing text, only the actual product letters on the banner. No gold, no metallic finish, no glitter, no orange UI buttons, no watermark. Bright soft studio lighting, crisp edges, realistic Amazon product photography, 1600x1600 style.
```
（约 160 词，大量否定约束 + 文字防呆）

**Banana 风格（参考图传入实拍）：**
```text
Generate Amazon main image for God Bless banner set, square 1:1, pure white background.

Product appearance is defined by the reference photos:
- White paper pennant flag as main body
- Pink scalloped decorative border around the white center
- Pink serif letters on the white front only
- Pink cross flags, pink string, pink bows
- Small punched holes at top corners

Layout (must match reference photo exactly):
Top row: G — O — D (3 flags)
Bottom row: Cross — B — L — E — S — S — Cross (7 flags)

Use the real product reference photos as the sole appearance guide.
Clean Amazon product photography style, soft studio lighting.
```
（约 100 词，正向指令 + 参考图驱动）

### Banana 提示词写作要点

```markdown
1. 结构化分段：任务 → 产品外观 → 布局 → 风格，每段聚焦一个主题
2. 正向指令优先：说「要什么」而非「不要什么」
3. 参考图定外观：传入实拍图，用「Product appearance is defined by reference photos」
4. 文字正常写：不需要额外拼写校验，Banana 自检文字准确性
5. 布局可直接描述：不需要反复强调禁止事项，模型会推理
```

- [[wiki/concepts/提示词工程]]
- [[wiki/concepts/AI生成电商主图]]
- [[wiki/workflows/Codex调用GPT作图工作流]]
- [[wiki/templates/AI作图任务标准输入表]]
