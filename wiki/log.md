# 操作日志

> 本文件是**追加型**的 Chronological Log，记录知识库的所有操作。
> 每条记录以 `## [YYYY-MM-DD] 操作类型 | 标题` 开头，方便使用 grep 等工具检索。

---

<!-- LLM 在此追加新记录 -->

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
