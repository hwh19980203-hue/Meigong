# 操作日志

> 本文件是**追加型**的 Chronological Log，记录知识库的所有操作。
> 每条记录以 `## [YYYY-MM-DD] 操作类型 | 标题` 开头，方便使用 grep 等工具检索。

---

<!-- LLM 在此追加新记录 -->

## [2026-06-30] lint | 第三次知识库健康检查 + 架构修复

### 发现问题
- AGENTS.md 与 CLAUDE.md 两份模式文档内容不一致（双版本）
- 图片引用路径约定 `![[raw/assets/xxx.png]]` 与实际使用不符
- `wiki/entities/` 空置，核心店铺和人物无集中页面
- 产品和案例索引未按编号排序
- 787 提示词页命名 `-作图提示词` 与 786 的 `-A+图片提示词` 不统一
- 784 产品页存在但未收入索引
- 787 产品页所属店铺仍为"待补充"（应为 UK-Aruatu）
- 欢迎.md 目录结构过时

### 修复内容
- AGENTS.md：新增"核心原则：产品外观以实拍图为准"区块，更新图片引用路径约定为三种实际路径
- CLAUDE.md：精简为入口页，指向 AGENTS.md 作为唯一模式标准
- 欢迎.md：更新为实际目录结构，新增实拍图核心原则
- 索引排序：wiki/index.md、wiki/products/index.md、wiki/cases/index.md 统一按编号排序
- 索引补录：新增 784 产品页到产品索引
- 实体页创建：WOODOUNAI、AOTIAN-HF、LeoMora、马艳丽
- 文件重命名：787-英国纸扇-作图提示词.md → 787-英国纸扇-提示词.md（统一后缀）
- 修复 787 产品页：所属店铺 UK-Aruatu，回链提示词页
- 更新 wiki/index.md：新增实体索引条目

- 创建 [[wiki/analyses/2026-06-29-AI作图周报]]
- 统计窗口：2026-06-22 至 2026-06-29
- 结论：本周严格新增完成套图 1 套（786 主图 7 张）；返工闭环任务 1 套（773 A+ v3/v4）
- 节奏判断：严格口径约 4 套/月，含返工闭环约 8 套/月，均低于月均 15 套目标
- 主要缺口：773/786 双评分与开发合规确认缺失，786 缺生产记录结构，782/787 店铺字段待补齐，784/786 prompt 或视觉策略结构仍需完善
- 更新 [[wiki/index]] 的分析区条目

## [2026-06-25] complete | 786 冰激凌水滴化妆包 7 张主图全部完成

### 首图（ST）
- 模型：otuapi `image2`（Banana 不可用，回退 image2）
- 最终版本：v6（经过 6+ 轮拉链迭代）
- 关键纠错：双拉链→单左上角拉链→朝下垂→拉链大小和包宽度调整
- 拉链实拍图补充：导入 `786-real-zipper-1.jpg` 和 `786-real-zipper-2.jpg` 到 `raw/cases/786-马艳丽/`
- 稳定资产：`raw/assets/generated/786-main-image-v6.png`
- 交付：`output/imagegen/786-冰激凌水滴化妆包/主图/786-ST-main-1600.png`

### 6 张附图
| 图片 | 生成资产 | 交付文件 |
|------|---------|---------|
| 02 颜色数量尺寸 | `786-image-02-colors-size.png` | `附图/786-02-colors-size.png` |
| 03 CCT场景 | `786-image-03-cct-scene.png` | `附图/786-03-cct-scene.png` |
| 04 细节图 XJT | `786-image-04-details.png` | `附图/786-04-details.png` |
| 05 场景图1 | `786-image-05-scene-table.png` | `附图/786-05-scene-table.png` |
| 06 4格分镜 | `786-image-06-4panel-scene.png` | `附图/786-06-4panel-scene.png` |
| 07 场景图3 | `786-image-07-scene-gift.png` | `附图/786-07-scene-gift.png` |

### 其他维护
- Word 样图命名修复：word-2~8 → word-1~7（重新从 docx 提取确认 7 张图片）
- 原始文档修复（PowerShell 级联替换导致的全部 word-7→word-1 损坏）
- AGENTS.md 和 Otuapi 工作流更新：强制所有模型传递参考图
- 更新 [[wiki/cases/786-冰激凌水滴化妆包]]、[[wiki/products/786-冰激凌水滴化妆包]]、[[wiki/index]]、[[wiki/cases/index]]

## [2026-06-25] update | 固化 otuapi Banana 图片接口路径

- 将 `tools/otuapi-image-mcp/` 从 `tools/` 忽略规则中放出，准备作为项目内固定 MCP 工具维护；`node_modules/` 继续忽略。
- 固化 `nano_banana_2`、`nano_banana_pro-*` 路由：`POST /v1/videos` 创建异步任务，`GET /v1/videos/{task_id}` 轮询并下载结果图。
- 保留 `gemini-3-pro-image-preview`、`gemini-3.1-flash-image-preview` 的 `/v1beta/models/{model}:generateContent` 同步路径。
- 记录跨窗口使用要求：另一个已打开的 Codex 窗口需要重启或重载 MCP，才能看到 `model`、`api_format` 等新参数。

## [2026-06-25] update | 从飞书总表补齐 786 作图基础信息

- 读取飞书 `新品进度总表 / 新品开发总表` 编号 `786`，记录 `recvgW5tByIeUp`
- 提取字段：SKU `US02-MYL-XLH-FBA-034`、ASIN `B0GZP37NYT`、站点 `US`、品牌/店铺 `WOODOUNAI`、关键词 `12 Pcs Ice Cream Drip Makeup Bags`、材质 `布`、尺寸重量、包装、首批数量、安审 `可以下单`
- 更新 [[wiki/products/786-冰激凌水滴化妆包]]：补齐飞书字段、来源记录、关键词链接和参考图附件 token
- 更新 [[wiki/cases/786-冰激凌水滴化妆包]]、[[wiki/products/index]]、[[wiki/cases/index]] 和 [[wiki/index]]

## [2026-06-23] regenerate | 按本地提示词重做 773 A+ 02–05

- 根据用户反馈保留 A+ 01 英雄氛围图
- 重新读取 [[wiki/products/773-两套God Bless拉旗装饰#2026-06-17 A+ 图片提示词方案]]
- A+ 02 按套装内容提示词重排：双套产品、24 片旗片、8 个十字架、8 个蝴蝶结及标准英文标签
- A+ 03 按材质细节提示词重排：完整产品 + 单张纸、预打孔、粉色绳子、粉色蝴蝶结四项真实细节
- A+ 04 按安装提示词重排：`Thread / Tie / Hang` 三步骤
- A+ 05 重新生成不含产品的单一宗教庆典背景，再合成锁定产品母版
- 替换 `output/imagegen/773-两套God Bless拉旗装饰/A+/` 中的 02–05，01 保持不变
- 更新 [[wiki/products/773-两套God Bless拉旗装饰]]、[[wiki/cases/773-两套God Bless拉旗装饰]] 和文件清单

## [2026-06-22] regenerate | 按产品母版锁定规则重做 773 A+ 五图

- 使用用户确认首图建立透明单套与双套产品母版：`raw/assets/generated/773-god-bless-locked-master/`
- 产品母版通过透明背景验证，白色旗片内部、粉色边缘、孔位、绳子、蝴蝶结、字母和十字架均保留
- 调用 otuapi `image2` 仅生成 A+ 01、05 的无产品背景，提示词明确禁止拉旗、文字、十字架和悬挂装饰
- A+ 01、05 使用锁定产品母版与 AI 背景分层合成
- A+ 02、03、04 使用产品母版及原图局部切片进行确定性排版，未调用 AI 重绘产品
- 完成 5 张 `970×600` A+ v3 图片，并替换 `output/imagegen/773-两套God Bless拉旗装饰/A+/` 中的暂停交付版本
- 更新 [[wiki/analyses/2026-06-22-773-A+产品变形失误复盘]]、[[wiki/products/773-两套God Bless拉旗装饰]]、[[wiki/cases/773-两套God Bless拉旗装饰]] 及各级索引

## [2026-06-22] retrospective | 记录 773 A+ 产品变形失误并建立硬门禁

- 创建 [[wiki/analyses/2026-06-22-773-A+产品变形失误复盘]]
- 确认失误：A+ 采用整图生成/改图，虽然字母与数量正确，但旗片轮廓、比例、波浪边、尖角、孔位和十字架造型相对首图发生漂移
- 修正 [[wiki/cases/773-两套God Bless拉旗装饰]]：主图保留为产品母版，当前 A+ 标记为产品外形不合格并暂停交付
- 更新 [[wiki/concepts/AI出图失真防治清单]]：新增“衍生图累计变形”和 773 实战案例
- 更新 [[wiki/workflows/Otuapi做图接口工作流]]：强制使用“固定产品抠图 + AI 无产品背景 + 分层合成”
- 更新 [[wiki/standards/设计交付规范]]：新增产品母版一致性一票否决门禁
- 更新 `AGENTS.md`：后续所有 A+、场景图和广告图必须锁定已确认产品母版
- 更新 [[wiki/index]] 的专题分析索引

## [2026-06-21] deliver | 完成 773 v2 主图与 A+ 返工交付

- 使用 otuapi `image2` 按参考图改图，完成 7 张主图和 5 张 A+ v2 终版
- 固定结构：每套上层 `十字架 + GOD + 十字架`、下层 `十字架 + BLESS + 十字架`，每套 12 片、4 个十字架；两套 24 片、8 个十字架
- A+ 02 额外返工两轮：先修正 `GOD` 两侧十字架，再补齐两套合计 8 个蝴蝶结
- 主图生成资产：`raw/assets/generated/773-god-bless-v2/`
- A+ 生成资产：`raw/assets/generated/773-god-bless-a-plus-v2/`
- 主图正式交付：`output/imagegen/773-两套God Bless拉旗装饰/主图/`（7 张 `1600×1600` PNG）
- A+ 正式交付：`output/imagegen/773-两套God Bless拉旗装饰/A+/`（5 张 `970×600` PNG）
- 更新 [[wiki/products/773-两套God Bless拉旗装饰]]、[[wiki/cases/773-两套God Bless拉旗装饰]]、[[wiki/workflows/AI生图提示词模板]]、[[wiki/index]]、[[wiki/products/index]] 和 [[wiki/cases/index]]
- 评分与开发合规确认仍待产品开发补充

## [2026-06-21] resume | 恢复 773 未完成返工

- 根据旧线程索引、知识库日志和交付目录恢复 773 上次中断状态
- 核实 `output/imagegen/773-两套God Bless拉旗装饰/A+/00-待重做说明.txt`：旧主图和旧 A+ 均缺少 `GOD` 两侧十字架，不可正式交付
- 将 [[wiki/products/773-两套God Bless拉旗装饰]]、[[wiki/cases/773-两套God Bless拉旗装饰]] 及各级索引从“已完成/定版”纠正为“返工中”
- 向 [[wiki/workflows/AI生图提示词模板]] 增加“固定数量与固定位置结构约束”，沉淀逐项顺序、分组数量和符号位置质检规则
- 调用 otuapi `image2` 尝试生成 A+ 01 校准样张，接口在 5 分钟处超时且未落盘；后续需继续重做 7 张主图和 5 张 A+，通过数量与位置质检后再进入正式交付目录

## [2026-06-21] monitor | AI 作图周生产监控

- 创建 [[wiki/analyses/2026-06-21-AI作图周报]]
- 统计窗口：2026-06-15 至 2026-06-21
- 结论：本周实际新完成套图 1 套（773），当前节奏低于月均 15 套目标
- 发现主要缺口：评分字段缺失、开发确认字段缺失、782/787 产品页信息不完整、773 优秀经验尚未上升到模板/工作流层
- 更新 [[wiki/index]] 的分析区条目

## [2026-06-18] correction | 修正 773 十字架数量与完整排版

- 人工复核确认每套正确排版：上层 `十字架 + GOD + 十字架`，下层 `十字架 + BLESS + 十字架`
- 每套共 12 片旗片，其中 4 个十字架旗片；两套合计 24 片旗片、8 个十字架旗片
- 更新 [[wiki/products/773-两套God Bless拉旗装饰]] 的产品事实、最终约束和 5 条 A+ 提示词
- 更新 [[wiki/cases/773-两套God Bless拉旗装饰]]，将缺少 `GOD` 两侧十字架的旧主图和旧 A+ 标记为失效待重做
- 原图片保留作历史记录和修改底图，不删除、不覆盖

## [2026-06-18] update | 启用 AI 作图双层保存与交付结构

- 生成资产统一保存到 `raw/assets/generated/`：包含 API 原图、修改版本、总览图和知识库长期引用资产
- 正式交付统一保存到 `output/imagegen/[编号-产品名]/`：只保留质检通过、尺寸正确、命名清晰的终版图片
- Wiki 继续引用 `raw/assets/generated/`，同时在产品页和案例页记录正式交付目录，避免交付文件调整后造成知识库断链
- 更新 `AGENTS.md`、[[wiki/workflows/Otuapi做图接口工作流]] 和 [[wiki/standards/设计交付规范]]
- 已将 773 的 5 张 A+ 终版复制到 `output/imagegen/773-两套God Bless拉旗装饰/A+/`

## [2026-06-18] generate | 生成并归档 773 A+ 五图

- 按 [[wiki/products/773-两套God Bless拉旗装饰#2026-06-17 A+ 图片提示词方案]] 中更新后的 5 条提示词调用 otuapi `image2`
- 生成 5 张 `1792×1024` 原始图，并输出完整保留内容的 `970×600` A+ 交付版
- 成果目录：`raw/assets/generated/773-god-bless-a-plus/`
- 质检确认：`GOD / BLESS` 顺序正确、无错误 `A` 字母旗片、材质标签为 `Single Paper Sheet`、粉色绳子与粉色蝴蝶结正确、旗片无明显变形
- 更新 [[wiki/products/773-两套God Bless拉旗装饰]]、[[wiki/cases/773-两套God Bless拉旗装饰]]、[[wiki/index]]、[[wiki/products/index]] 和 [[wiki/cases/index]]

## [2026-06-25] ingest | 摄入 786-冰激凌水滴化妆包

- 创建原始资料目录 `raw/cases/786-马艳丽/`
- 摄入开发文档：`786-马艳丽产品文档.docx` + 提取文本 `786_extracted.txt`
- 摄入 6 张实拍图（`786-real-1~6.jpg`）和 7 张 Word 样图（`786-word-1~7.png`）
- 创建原始文档：[[raw/cases/786-马艳丽/786-冰激凌水滴化妆包.md]]
- 创建产品页：[[wiki/products/786-冰激凌水滴化妆包]] — 冰激凌水滴6色化妆包（6色×2=12个/套），开发：马艳丽
- 创建案例页：[[wiki/cases/786-冰激凌水滴化妆包]] — 7 张主图
- 更新 [[wiki/index]]、[[wiki/products/index]] 和 [[wiki/cases/index]]

## [2026-06-24] update | 摄入 Nano Banana 七大模板 + EvolveAMZ 框架

- 创建 [[wiki/sources/2026-06-24-Nano Banana Pro亚马逊套图提示词模板]] — 7 大类型提示词模板（参考腾讯云开发者社区 / AMZ123 / 什么值得买）
- 创建 [[wiki/sources/2026-06-24-AI电商摄影EvolveAMZ2026指南]] — 提示词六大要素、五步迭代工作流、合规红线（参考 EvolveAMZ）
- 更新 [[wiki/workflows/AI生图提示词模板]]：新增"Nano Banana 七大提示词模板"章节，7 套模板中英对照可直接复用；新增"EvolveAMZ 提示词精炼框架"章节
- 更新 [[wiki/workflows/AI生图提示词模板]]：新增"Banana（Nano Banana）提示词风格参考"章节，与 image2 风格对照，以 773 首图为对比示例
- 更新 [[wiki/index]]：添加 2 条新来源条目

## [2026-06-23] update | 记录亚马逊图片类型策略框架

- 更新 [[wiki/concepts/AI生成电商主图]]：新增"亚马逊图片类型策略框架"章节
- 框架定义：主图→抢点击（吸引力）、附图→建理解（功能痛点）、A+→强信任（品牌背书）、视频→促行动（催化下单）

## [2026-06-25] update | 强制参考图传递规则

- **问题发现**：Codex 调用 `generate_image` 时未传入实拍参考图，仅靠文字描述让 AI 想象产品外观，导致 773 A+ 产品形状漂移
- **更新 [[AGENTS.md]]**：在"作图接口约定"新增"参考图强制传递"规则 — `generate_image` 调用时 `images` 参数为必传项，Codex 必须从产品页读取实拍图传入 API
- **更新 [[wiki/workflows/Otuapi做图接口工作流]]**：步骤 4 增加"必须先读取产品页实拍参考图，通过 `images` 参数传入 API"的强制要求
- **明确范围**：补充说明 `images` 参考图参数对所有模型生效——`image2`（`/v1/images/generations`）、`nano_banana_*`（`/v1/videos`）和 `gemini-*`（`generateContent`）均支持参考图输入

## [2026-06-17] update | 记录 773 A+ 五图提示词方案

- 更新 [[wiki/products/773-两套God Bless拉旗装饰]]：新增“2026-06-17 A+ 图片提示词方案”
- 记录 5 张 A+ 图提示词：英雄氛围图、套装内容图、材质细节图、易安装步骤图、多场景适用图
- 统一 A+ 约束：单张纸质旗片、粉色绳子、粉色蝴蝶结、禁止 `Double-Layer Paper`、禁止 `A` 字母旗片、保持 `GOD / BLESS` 拼写正确

## [2026-06-17] update | 归档 773 image2 最终 7 张成果

- 归档最终成果清单：`raw/assets/generated/773-god-bless/latest-01-07-final-api-corrected.txt`
- 归档成果总览：`raw/assets/generated/773-god-bless/20260617-773-god-bless-final-contact-sheet-api-corrected.png`
- 更新 [[wiki/cases/773-两套God Bless拉旗装饰]]：新增“2026-06-17 AI 出图成果”章节，嵌入 7 张最终图并记录质检要点
- 更新 [[wiki/products/773-两套God Bless拉旗装饰]]：新增 image2 出图成果记录，明确最终约束：单张纸质旗片、粉色绳子、图 2 删除错误 `A` 旗片、图 2/3 使用 `Single Paper Sheet`
- 同步更新 [[wiki/index]]、[[wiki/products/index]] 和 [[wiki/cases/index]]

## [2026-06-17] update | 补充 773 自动预填字段

- 更新 [[wiki/products/773-两套God Bless拉旗装饰]]：同步编号、SKU、ASIN `B0GZNVZ6YH`、站点 `US`、店铺 `AOTIAN-HF`、核心关键词、材质、做法、双面印刷特性、尺寸重量、包装信息、安审状态以及“是否作图/是否作 A+”字段
- 更新 [[wiki/cases/773-两套God Bless拉旗装饰]]：补齐店铺 `AOTIAN-HF`、ASIN `B0GZNVZ6YH`，并按本次表格记录作图/A+ 状态为 `空`
- 同步更新 [[wiki/index]] 与 [[wiki/cases/index]] 中的 773 案例条目

## [2026-06-17] update | 修正 773 GOD/BLESS 排版与 G 字母比例

- 根据用户提供的首图参考和 `20260617-123821.267-8.jpg` 实拍 G 字母，重跑 773 粉白款 7 张套图
- 修正规则：上方为 `GOD`，下方为左十字架 + `BLESS` + 右十字架；`G` 必须为正常大写衬线字母，比例与 `O/D` 一致，不得变形、过大或写成错误形态
- 检查过程中发现第 6 张两套组合图第一次重跑漏了一个 `S`，已改为“一套完整挂起 + 第二套平铺配件”的提示词策略，降低 AI 漏字风险
- 更新 [[wiki/products/773-两套God Bless拉旗装饰]]：新增“2026-06-17 修正版提示词规则”

## [2026-06-17] update | 记录 773 粉白款 7 张套图 AI 提示词

- 更新 [[wiki/products/773-两套God Bless拉旗装饰]]：新增“AI 作图提示词记录”
- 记录 7 张图提示词：首图 ST、尺寸数量图 CCT、细节图、场景图 1、场景图 2、两套组合场景图、完整派对背景图
- 统一产品约束：粉白双层纸质旗片、粉色字母/十字架、粉色蝴蝶结、白色绳子，禁止金色、金属质感和不符合实拍图的元素

## [2026-06-16] update | 确认 773 颜色以案例页粉白款为准

- 根据用户指示查看 [[wiki/cases/773-两套God Bless拉旗装饰]]
- 案例页明确图片清单：首图为“两套拉旗共四条 + 粉色字母/十字架 + 粉色蝴蝶结配件组合展示”，细节图为“粉白双层纸质旗片材质、粉色字母印刷、纸片边缘、穿孔位置和绳子质感”
- 更新 [[wiki/products/773-两套God Bless拉旗装饰]]：将“颜色冲突待确认”改为“颜色依据”，确认后续作图按粉白款执行；开发文档中“金色十字架/金色字母”的旧文字描述不再作为作图依据

## [2026-06-16] update | 补充 773 飞书字段并修正实拍颜色依据

- 飞书 `新品开发总表` 查询编号 `773`：SKU `08US-FBA-ZLM-XLH-001`，ASIN `B0GZNVZ6YH`，店铺 `AOTIAN-HF`，关键词 `God Bless Banner`
- 读取开发文档：`D:\黑伞美工知识库\773-两套God Bless拉旗装饰.md`
- 查看实拍图文件夹：`D:\黑伞美工知识库\773-两套God Bless拉旗装饰_images\`，共 9 张 JPG
- 更新 [[wiki/products/773-两套God Bless拉旗装饰]]：补充飞书字段、当前开发文档路径、实拍图路径、实拍产品特征和作图注意点
- 标记冲突：开发文档文字提到“金色十字架/金色字母”，但当前实拍图显示为粉白双层纸质旗片、粉色字母/十字架和粉色蝴蝶结；后续作图默认以实拍粉白款为准，金色版本需开发另补实拍图
- 更新 [[wiki/products/index]] 和 [[wiki/index]] 中 773 产品描述

## [2026-06-16] fix | 重命名 773 图片为简洁文件名 + 嵌入到图片任务区

- 重命名 17 张图片：去掉文件名中的多小数点（`20260617-123821.267-1.jpg` → `773-st-1.jpg`），避免 Obsidian 解析异常
- 重命名 Word 样图：`image2.jpeg`~`image9.png` → `773-word-*.png`
- 重构 [[wiki/products/773-两套God Bless拉旗装饰]]：图片任务区每张图下面直接嵌入对应的实拍参考图和 Word 样图
- 更新 [[wiki/cases/773-两套God Bless拉旗装饰]]：嵌入全部 7 张样图
- 同步更新 raw 原始 Markdown 中的所有图片引用路径

## [2026-06-16] update | 补充 773 Word 原始开发文档和 8 张嵌入样图

- 从 `C:\Users\Q\Downloads\773两套God Bless拉旗装饰.docx` 提取 8 张嵌入样图（image2.jpeg ~ image9.png）和自动提取文本（773_extracted.txt）
- 复制 Word 文档和提取文本到 `raw/cases/773-两套God Bless拉旗装饰/`
- 更新原始 Markdown 文档：修复图片路径（从子目录改为同级引用），每张图新增 Word 样图补充折叠区
- 更新 [[wiki/products/773-两套God Bless拉旗装饰]]：新增来源资料章节
- 更新 [[wiki/cases/773-两套God Bless拉旗装饰]]：新增 Word 文档和提取文本引用

## [2026-06-16] ingest | 773-两套God Bless拉旗装饰

- 摄入来源：`D:\黑伞美工知识库\773-两套God Bless拉旗装饰.md` + 9 张实拍/参考图片
- 复制原始资料到 `raw/cases/773-两套God Bless拉旗装饰/`
- 创建产品页面：[[wiki/products/773-两套God Bless拉旗装饰]] — 两套 God Bless 拉旗装饰（定制产品），含金色十字架和字母"I"配件，7 张主图（不含 A+），美国站
- 创建案例页面：[[wiki/cases/773-两套God Bless拉旗装饰]]
- 更新 [[wiki/index]]、[[wiki/products/index]]、[[wiki/cases/index]]

## [2026-06-15] update | 强化实拍图采集和处理规则：以实拍图为准

- 更新 [[wiki/workflows/飞书多维表格到AI作图需求流转]]：在"产品实拍图处理规则"中新增"总则：实拍图采集以实物为准"，明确采集/核对/使用/质检四个阶段必须以实际产品实物为准
- 更新 [[wiki/workflows/AI生图提示词模板]]：新增"产品实拍图优先约束"章节，定义实拍图优先指令和 Codex 出图规则
- 更新 [[wiki/templates/AI作图需求缺口补充表]]：顶部标记核心原则"产品实拍图是唯一产品外观依据"，美工判断区新增实拍图确认为实际销售产品实物字段和优先级确认字段
- 核心规则：产品实拍图是 AI 作图唯一的产品外观依据，参考图仅用于构图和场景参考，冲突时以实拍图为准

## [2026-06-15] create | AI出图失真防治清单

- 创建 [[wiki/concepts/AI出图失真防治清单]]，总结 AI 生图产品失真的 5 大类型（颜色/材质/结构/文字/脑补）和三层防治策略
- 沉淀 782 新娘派对 `Bride to Be` 拉旗字母丢失和 787 英国纸扇材质混淆两个实战案例
- 含：否定式提示词模板、颜色约束、实拍图还原指令、逐轮质检流程、失真优先级矩阵
- 更新 [[wiki/index]] 的概念区

## [2026-06-15] update | 修正 787 英国纸扇实拍图来源

- 用户确认 `C:\Users\Q\Downloads\新建文件夹` 中的图片传错产品，不再作为 787 作图依据
- 新实拍图路径：`C:\Users\Q\Downloads\新建文件夹\新建文件夹`
- 新实拍图包含 11 张素材：8 张 JPG、3 张 PNG
- 修正 787 真实产品外观：全白圆形折叠纸扇、白色褶皱扇面、白色塑料手柄、白色塑料锁扣/卡扣，无木色扇骨、无米金色手柄、无镂空花纹
- 更新 [[wiki/workflows/飞书多维表格到AI作图需求流转]] 的 787 实拍图观察，要求后续主图、尺寸图、细节图和场景图均以新路径实拍图为准

## [2026-06-15] update | 区分 Word 参考说明与实拍产品依据

- 查看 787 产品实拍图文件夹：`C:\Users\Q\Downloads\新建文件夹`
- 文件夹包含 9 张产品素材：7 张 JPG、1 张 WEBP、1 张 PNG，覆盖折叠状态、包装袋/系绳、半展开和完全展开状态
- 明确流程规则：Word 文档用于提供参考图片和每张图制作说明；产品实拍图用于确认真实颜色、材质、结构、数量、包装和配件
- 更新 [[wiki/workflows/飞书多维表格到AI作图需求流转]]：新增“产品实拍图处理规则”，要求 GPT 作图必须按实拍产品还原，参考图只作为构图和场景参考
- 更新 [[wiki/templates/AI作图需求缺口补充表]]：新增实拍图位置、是否为实际销售产品、Word 文档位置、实拍图是否足够还原、参考图与实拍产品是否冲突等字段

## [2026-06-15] update | 支持 Word 格式开发图片文档进入 AI 作图流程

- 查看开发提交的 Word 文档：`C:\Users\Q\Downloads\787-英国纸扇-范晓云 (5).docx`
- 抽取结果：正文 25 段、嵌入图片 7 张，包含首图、尺寸图、细节图、使用图和 3 张场景图的美工要求
- 对照飞书 `新品开发总表` 编号 `787`：SKU `05US-FBA-FXY-XLH-002`，ASIN `B0GZNX63CF`，站点 `UK`，品牌 `UK-Aruatu`
- 更新 [[wiki/workflows/飞书多维表格到AI作图需求流转]]：新增 Word 开发文档处理规则和 787 文档观察
- 更新 [[wiki/templates/AI作图需求缺口补充表]]：说明开发给 Word / 飞书文档 / Markdown 时，Codex 先自动抽取，再生成缺口补充项

## [2026-06-15] create | 飞书多维表格到 AI 作图需求流转

- 查看 782 案例的产品图片文档：`D:\BaiduNetdiskDownload\黑伞美工历史完成图片库\782\782-张苏皖新娘派对装饰产品图片文档 .md`
- 解压并读取本地 `.base` 快照：`D:\BaiduNetdiskDownload\黑伞美工历史完成图片库\782\新品进度总表（更新时间2024.08.11） 副本.base`
- 定位 `新品开发总表` 中编号 `782` / SKU `03US-FBA-ZSW-XLH-052` / ASIN `B0GZMW4DNR` 的记录
- 创建 [[wiki/workflows/飞书多维表格到AI作图需求流转]]，定义“飞书总表自动预填产品事实 → 开发补充图片表达缺口 → 美工补充视觉判断 → Codex 生成 Brief 和提示词”的流程
- 创建 [[wiki/templates/AI作图需求缺口补充表]]，用于开发只补总表没有的信息，美工再补 AI 出图策略和精修判断
- 更新 [[wiki/workflows/AI作图业务流程落地方案]]、[[wiki/templates/index]] 和 [[wiki/index]]

## [2026-06-15] update | 增加亚马逊商品图实拍保真规则

- 更新 [[wiki/products/782-新娘派对装饰]]：新增“实拍保真规则”，要求绶带、字母、钻戒挂件和钻石戒指气球按用户实拍图还原
- 更新 [[wiki/workflows/AI生图提示词模板]]：新增“亚马逊真实性约束”，明确 AI 美化只能用于清洁背景、光线校正和展示优化，不能改变产品颜色、材质、结构、数量和包装内容
- 背景依据：亚马逊官方图片指南要求商品图准确代表所售商品；本次返工发现过度美化会导致绶带颜色、字样、钻石气球原型偏离实物

## [2026-06-15] lint | 第二次知识库健康检查

- 创建 [[wiki/analyses/2026-06-15-第二次知识库健康检查]]
- 覆盖范围：wiki/ 全部 35 个页面、CLAUDE.md、AGENTS.md
- 确认结果：无断链、无孤儿页面、无内容矛盾
- 已验证：第一次健康检查的 P1/P2 问题已全部修复
- 发现小问题：CLAUDE.md 缺少 analyses/ 目录、782 案例字段待补充、骨架模板未填充
- 更新 CLAUDE.md：补齐 analyses/ 目录
- 更新 [[wiki/index]]：分析区新增第二次健康检查条目

## [2026-06-15] create | AI作图业务流程落地方案

- 创建 [[wiki/workflows/AI作图业务流程落地方案]]
- 明确公司级 AI 作图责任链：产品开发提交需求 → 美工审核并操作 Codex → Codex 调用 GPT → 美工精修 → 产品开发合规确认 → 交付归档
- 新增每套图 5 分评分机制：美工与产品开发分别评分，综合评分 4 分以上判定为优秀经验
- 新增每周 Codex 监控规则：检查套图产出、评分缺失、优秀案例、低分复盘、产品页和案例页经验回写
- 新增月度指标：月完成套图数 ≥ 15 套、平均交付周期、AI 初稿可用率、返工次数、优秀经验数、合规退回次数等
- 更新 [[wiki/index]] 的工作流索引

## [2026-06-15] ingest | 782-新娘派对装饰案例

- 摄入来源：`D:\BaiduNetdiskDownload\黑伞美工历史完成图片库\782`
- 复制原始案例包到 `raw/cases/782-新娘派对装饰/`
- 摄入内容：开发需求 Markdown 文档、7 张主图、5 张 A+ 图、自动提取需求文本、成果图总览
- 创建案例页面：[[wiki/cases/782-新娘派对装饰]]
- 更新产品页面：[[wiki/products/782-新娘派对装饰]]，补充历史完成图案例与资源路径
- 更新 [[wiki/cases/index]]、[[wiki/products/index]] 和 [[wiki/index]]

## [2026-06-12] update | 修正 782 新娘派对装饰字母拉旗规则

- 更新 [[wiki/products/782-新娘派对装饰]]：新增“字母拉旗专项规则”，明确 `Bride to Be` 必须完整，`Be` 后必须保留实拍款独立钻戒挂件
- 更新 [[wiki/workflows/AI生图提示词模板]]：新增“实拍文字道具约束”，要求固定文案道具按实拍图逐字还原，装饰挂件不能替代字母
- 返工原因：AI 生图曾出现 `Bride` 少 `e`，以及 `Be` 后结尾钻戒挂件丢失的问题

## [2026-06-07] init | 知识库初始化

- 根据 [[LLM]] 文档初始化知识库
- 创建目录结构：`raw/`、`wiki/`、`wiki/entities/`、`wiki/concepts/`、`wiki/sources/`
- 创建 `CLAUDE.md` 模式文档
- 创建 `wiki/index.md` 索引和 `wiki/log.md` 日志

## [2026-06-07] create | 图片管理与LLM配合指南

- 创建 [[wiki/concepts/图片管理与LLM配合指南]]，总结图片管理的最佳实践
- 涵盖：Obsidian 图片能力、LLM 读取图片方式、目录结构建议、推荐工具、工作流

## [2026-06-10] ingest | AI三分钟生成亚马逊主图

- 摄入来源：[[raw/articles/2026-06-09-AI三分钟生成亚马逊主图]]
- 原始出处：知无不言跨境电商社区（[链接](https://www.wearesellers.com/article/paid/449)）
- 下载 25 张示例图片到 `raw/assets/`（ai-main-img-01~25）
- 创建资料摘要：[[wiki/sources/2026-06-09-AI三分钟生成亚马逊主图]]
- 创建概念页面：[[wiki/concepts/AI生成电商主图]]
- 涵盖：一句话出图、产品精修、精品出图、竞品复刻、PSD导出、图片检查、场景一致性、真实感增强、AI局限性

## [2026-06-10] ingest | AI生成内容侵权风险

- 摄入来源：[[raw/articles/2026-06-10-AI生成内容侵权风险]]
- 原始出处：知无不言跨境电商社区 — 巧豚豚 WOOT（[链接](https://www.wearesellers.com/question/119106)）
- 下载 1 张示例图片到 `raw/assets/`（ai-infringement-01.jpg）
- 创建资料摘要：[[wiki/sources/2026-06-10-AI生成内容侵权风险]]
- 创建概念页面：[[wiki/concepts/AI内容侵权风险与合规]]
- 更新工作流文档：在 [[wiki/workflows/AI驱动美工工作流]] 中嵌入合规审查阶段（第三阶段），更新流程图、检查清单、职责表和 FAQ

## [2026-06-10] create | AI驱动美工工作流

- 创建 [[wiki/workflows/AI驱动美工工作流]]，定义美工部门 AI + 人工协作模式

## [2026-06-10] ingest | 亚马逊图片设计知识库

- 摄入来源：[[raw/sources/图片设计知识库/图片设计知识库]]（飞书知识库同步）
- 同步 6 个文档 + 19 张示例图片到 `raw/sources/` 和 `raw/assets/`（design-kb-000~018）
- 创建资料摘要：[[wiki/sources/2026-06-10-亚马逊图片设计知识库]]
- 创建规范页面：[[wiki/standards/亚马逊主图规范]]、[[wiki/standards/A+页面设计规范]]

## [2026-06-10] refactor | 交付独立为规范文档

- 创建 [[wiki/standards/设计交付规范]]，将交付标准从工作流中独立出来
- 更新 [[wiki/workflows/AI驱动美工工作流]]，第五阶段改为引用交付规范
- 交付规范覆盖：终质检清单、格式标准、命名规范（ASIN-模块-版本）、归档结构
- 涵盖：图片构成、首图 8 项规范、5 种附图类型、基础 A+ 5 种模块规格、高级 A+ 功能
- 涵盖：全流程图、四阶段工作流（需求→AI产出→人工精修→交付）、AI/人工职责对照表
- 涵盖：四种需求类型流程（新品/A+/紧急广告/竞品分析）、提示词模板库、团队角色定义
- 关键指标：AI 承担约 80% 工作量，人工 20%（审核+精修），单套图从 2-3 天缩至 2-4 小时

## [2026-06-11] restructure | 知识库优化：补齐模板/案例/产品 + 标准输入表 + 回写机制

- 根据 [[raw/articles/和GPT的沟通]] 的 GPT 建议，对知识库进行结构化升级
- **新增目录**：`wiki/templates/`、`wiki/cases/`、`wiki/products/`
- **新建模板页**：
  - [[wiki/templates/index]] — 模板库索引
  - [[wiki/templates/PSD主图模板]] — 主图 PSD 模板（骨架，待填充）
  - [[wiki/templates/A+模板-基础型]] — 基础型 A+ 模板（骨架，待填充）
  - [[wiki/templates/广告素材模板]] — 广告素材模板（骨架，待填充）
- **新建案例页**：
  - [[wiki/cases/index]] — 案例库索引
- **新建产品页**：
  - [[wiki/products/index]] — 产品知识库索引
  - [[wiki/products/782-新娘派对装饰]] — 从 raw 摄入的新娘派对装饰产品知识
  - [[wiki/products/787-英国纸扇]] — 从 raw 摄入的英国站纸扇产品知识
- **新建标准输入表**：`wiki/workflows/AI作图任务标准输入表.md` — 早期标准输入表，后续已删除并迁移到 [[wiki/templates/AI作图任务标准输入表]]
- **更新工作流**：[[wiki/workflows/AI驱动美工工作流]] — 新增标准输入表引用、第六阶段"知识回写"机制、更新全流程图、迭代优化指标
- **模式文档**：`CLAUDE.md` 目录结构新增 `templates/`、`cases/`、`products/` 三个目录
- **索引更新**：`wiki/index.md` 新增模板、案例、产品三大板块

## [2026-06-11] create | Codex调用GPT作图工作流与正式输入表

- 创建 [[wiki/workflows/Codex调用GPT作图工作流]]，定义 Obsidian 知识库、Codex、GPT 画图和美工之间的职责边界
- 创建 [[wiki/templates/AI作图任务标准输入表]]，作为运营/产品/美工提交 AI 作图需求的正式模板
- 更新 [[wiki/index]]：工作流区新增 Codex 调用 GPT 流程，模板区新增正式输入表
- 当时保留早期 `wiki/workflows/AI作图任务标准输入表.md` 作为历史版本；后续已按用户要求删除
- 核心原则：先标准化输入，再由 Codex 读取知识库生成 Brief 和 GPT 提示词，最后由美工完成质检与精修

## [2026-06-11] lint | 知识库健康检查

- 创建 [[wiki/analyses/2026-06-11-知识库健康检查]]，记录本次知识库体检结果
- 发现 P1 问题：`AGENTS.md` 目录结构落后、`AI作图任务标准输入表` 存在双版本、部分工作流链接仍指向旧版或目录链接
- 发现 P2 问题：[[wiki/concepts/提示词工程]]、`wiki/concepts/亚马逊图片合规.md`、[[wiki/workflows/AI生图提示词模板]] 尚未落地或需重定向
- 判断：无严重逻辑错误；主要是快速迭代后产生的小型结构债，建议按报告中的 P1/P2 顺序修复

## [2026-06-11] refactor | 修复知识库结构债

- 删除早期版本 `wiki/workflows/AI作图任务标准输入表.md`，统一使用正式模板 [[wiki/templates/AI作图任务标准输入表]]
- 更新 `AGENTS.md`：补齐 `templates/`、`cases/`、`products/`、`analyses/` 目录和对应命名规范
- 更新 [[wiki/workflows/AI驱动美工工作流]]：修正标准输入表链接、目录链接和提示词模板链接
- 创建 [[wiki/concepts/提示词工程]] 和 [[wiki/workflows/AI生图提示词模板]]
- 将 [[wiki/sources/2026-06-10-AI生成内容侵权风险]] 中的待创建合规链接统一指向 [[wiki/concepts/AI内容侵权风险与合规]]

## [2026-06-11] ingest | 768-波西米亚教室装饰案例

- 摄入来源：`D:\BaiduNetdiskDownload\黑伞美工历史完成图片库\768`
- 复制原始案例包到 `raw/cases/768-波西米亚教室装饰/`
- 摄入内容：开发需求 Word 文档、7 张主图、5 张 A+ 图、自动提取需求文本、成果图总览
- 创建案例页面：[[wiki/cases/768-波西米亚教室装饰]]
- 创建产品页面：[[wiki/products/768-波西米亚教室装饰]]
- 更新 [[wiki/cases/index]]、[[wiki/products/index]] 和 [[wiki/index]]

## [2026-06-11] update | 增加所属店铺字段

- 在 [[wiki/templates/AI作图任务标准输入表]] 中新增“所属店铺”字段，并加入必填项说明
- 更新 [[wiki/workflows/Codex调用GPT作图工作流]] 和 [[wiki/workflows/AI生图提示词模板]]，要求生成 Brief 和提示词时考虑店铺风格
- 更新现有产品页和案例页，统一加入“所属店铺：待补充”
- 更新 `AGENTS.md`，将“所属店铺”列为产品页、案例页和作图输入表的固定字段

## [2026-06-11] update | 补充 768 产品信息

- 更新 [[wiki/products/768-波西米亚教室装饰]]：目标站点 `US`、所属店铺 `WOODOUNAI`、实际上架 ASIN `BOGXXMLZ3S`、内部评价 `还行`、返工记录 `无`
- 同步更新 [[wiki/cases/768-波西米亚教室装饰]] 的案例字段
- 更新 [[wiki/index]]、[[wiki/products/index]]、[[wiki/cases/index]] 中的 768 条目描述

## [2026-06-11] ingest | 历史完成图片库剩余案例

- 摄入来源：`D:\BaiduNetdiskDownload\黑伞美工历史完成图片库`
- 复制剩余 3 个项目到 `raw/cases/`：764、771、777
- 每个项目均包含：开发需求 Word 文档、7 张主图、5 张 A+ 图、自动提取需求文本、成果图总览
- 创建案例页面：[[wiki/cases/764-适合女孩旅行的凉毛巾]]、[[wiki/cases/771-女生储物柜整理器]]、[[wiki/cases/777-高尔夫球派对装饰品]]
- 创建产品页面：[[wiki/products/764-适合女孩旅行的凉毛巾]]、[[wiki/products/771-女生储物柜整理器]]、[[wiki/products/777-高尔夫球派对装饰品]]
- 更新 [[wiki/cases/index]]、[[wiki/products/index]] 和 [[wiki/index]]

## [2026-06-11] update | 补充 764/771/777 产品信息

- 更新 [[wiki/products/764-适合女孩旅行的凉毛巾]] 与 [[wiki/cases/764-适合女孩旅行的凉毛巾]]：店铺 `LeoMora`、ASIN `B0GXDJ2WCM`、内部评价 `一般`、返工 `无`
- 更新 [[wiki/products/771-女生储物柜整理器]] 与 [[wiki/cases/771-女生储物柜整理器]]：店铺 `LeoMora`、ASIN `B0GXCPK4LX`、内部评价 `一般`、返工 `无`
- 更新 [[wiki/products/777-高尔夫球派对装饰品]] 与 [[wiki/cases/777-高尔夫球派对装饰品]]：店铺 `AOTIAN-HF`、ASIN `B0GYX9LNNB`、内部评价 `一般`、返工 `无`
- 同步更新 [[wiki/index]]、[[wiki/products/index]]、[[wiki/cases/index]]

## [2026-06-17] update | otuapi 做图接口接入

- 在 `C:\Users\Q\.codex\config.toml` 中配置 `otuapi_image` MCP server，供 Codex 调用 otuapi 图片接口。
- 在用户环境变量和 `C:\Users\Q\.codex\.env` 中保存 `OTUAPI_API_KEY`，不写入知识库页面。
- 更新 `tools/otuapi-image-mcp/server.mjs`，支持从 `C:\Users\Q\.codex\.env` 读取密钥。
- 更新 `AGENTS.md`，将 otuapi 作为黑伞美工作图请求的首选工具。
- 创建 [[wiki/workflows/Otuapi做图接口工作流]]，记录调用方式、保存目录和密钥管理规则。
- 已完成真实接口测试，输出测试图到 `raw/assets/generated/`。

## [2026-06-25] imagegen | 生成 786 冰激凌水滴化妆包首图

- 使用 6 张实拍参考图生成 786 首图草稿：12个化妆包、6色各2个、4×3 白底排列。
- 按用户要求将空包表现为柔软鼓鼓的饱满状态，并检查每个包只保留单条拉链和单个拉链头。
- 稳定资产：`raw/assets/generated/786-冰激凌水滴化妆包/20260625082638-786-st-image2-puffy-main-1600.png`
- 交付文件：`output/imagegen/786-冰激凌水滴化妆包/786-main-puffy-1600.png`
- 更新 [[wiki/products/786-冰激凌水滴化妆包]] 与 [[wiki/cases/786-冰激凌水滴化妆包]]。

## [2026-06-25] imagegen | 更新 786 首图为更明显鼓包效果

- 参考用户补充的单包样图，将 12 个化妆包统一改为更厚底、更圆角、更有内部填充感的鼓包效果。
- 保持 4×3 排列、6色各2个、冰激凌水滴图案、华夫格下半部分和每个包单拉链头不变。
- 新版稳定资产：`raw/assets/generated/786-冰激凌水滴化妆包/20260625085032-786-st-extra-puffy-main-1600.png`
- 新版交付文件：`output/imagegen/786-冰激凌水滴化妆包/786-main-extra-puffy-1600.png`

## [2026-06-25] imagegen | 补充 786 新版实拍并重生成首图

- 新增新版鼓包实拍图：`raw/cases/786-马艳丽/786-real-7-updated-puffy-purple.jpg`，作为真实站立包身、弧形上沿、底部厚度和布纹的主参考。
- 基于新版实拍优化首图提示词，明确 Image 2 为“新版真实产品形态主参考”，避免只按文字或旧图想象鼓包效果。
- 新版稳定资产：`raw/assets/generated/786-冰激凌水滴化妆包/20260625090517-786-st-new-real-puffy-main-1600.png`
- 新版交付文件：`output/imagegen/786-冰激凌水滴化妆包/786-main-new-real-puffy-1600.png`
- 提示词归档：`raw/assets/generated/786-冰激凌水滴化妆包/20260625090517-786-st-new-real-puffy-main-prompt.txt`

## [2026-06-25] imagegen | 按正确形状布局参考完善 786 首图

- 参考 `raw/assets/generated/786-main-image-shape-correct.png` 的立体包身、4×3布局、底部支撑感和拉链向下摆的感觉，重新生成 786 首图。
- 在提示词中明确排除参考图里的错误拉链数量，并要求每个包只保留单条拉链和单个金属拉链头。
- 同时修正参考图纹路不清晰的问题，要求华夫格纹、布纹、冰激凌水滴和 sprinkle 图案保持清晰连续。
- 稳定资产：`raw/assets/generated/786-冰激凌水滴化妆包/20260625091610-786-st-shape-layout-zipper-down-main-1600.png`
- 交付文件：`output/imagegen/786-冰激凌水滴化妆包/786-main-shape-layout-zipper-down-1600.png`
- 提示词归档：`raw/assets/generated/786-冰激凌水滴化妆包/20260625091610-786-st-shape-layout-zipper-down-main-prompt.txt`

## [2026-06-25] update | 锁定 786 v6 首图并生成 A+ 提示词

- 按用户指定，将 `raw/assets/generated/786-main-image-v6.png` 作为 786 当前锁定首图。
- 整理 A+ 用锁定母版：`raw/assets/generated/786-冰激凌水滴化妆包/786-main-image-v6-locked-master-1600.png`
- 创建 [[wiki/products/786-冰激凌水滴化妆包-A+图片提示词]]，包含 A+01-A+06 六张模块图提示词。
- 归档可复制提示词：`raw/assets/generated/786-冰激凌水滴化妆包/786-a-plus-prompts-v1.md`
