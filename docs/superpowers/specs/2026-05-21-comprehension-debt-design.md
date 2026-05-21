# 认知债：AI 时代被低估的开发成本

## Spec

**日期**：2026-05-21
**作者**：nmsn
**状态**：approved

---

## 标题

`认知债：AI 时代被低估的开发成本`

---

## Frontmatter

```yaml
---
title: '认知债：AI 时代被低估的开发成本'
date: '2026-05-21'
tags: ['AI', 'engineering', 'frontend']
draft: false
summary: '当 AI 能比人类更快生成代码，却无法替代人类理解代码时，"认知债"就成了团队最隐蔽的债务形式。'
---
```

---

## 结构

### 1. 开场场景

一个虚构但真实的前端项目片段：团队在三个月内用 AI 辅助完成了功能迭代，测试覆盖率保持在 80% 以上，CI 全绿，PR 吞吐量翻倍。第四个月，一位资深工程师试图重构状态管理层时，发现没有人能解释为什么某些状态被放在 Context 而非组件本地——代码是 AI 写的，设计决策的上下文已经丢失。

目标：制造认知冲突，让读者意识到"速度"不等于"理解"。

### 2. 什么是认知债

引用 Addy Osmani 的核心定义：

> Comprehension debt is the **growing gap** between how much code exists in your system and **how much of it any human being genuinely understands**.

引入 Margaret-Anne Storey 的学生团队案例（原文 week-seven wall），说明这不是理论问题，是实际发生的工程困境。

### 3. 关键数据

Anthropic 研究数据：

- AI 辅助完成任务的开发者 vs 对照组，理解测试得分：50% vs 67%（差 17%）
- 调试能力下降最显著
- 关键结论：\*\*"被动委托"（"just make it work"）比"主动探索"（question-driven）对技能发展的损害大得多

### 4. 速度不对称问题

核心论点：AI 生成代码的速度远超人类审查速度，这打破了传统的 code review 作为质量把关的逻辑。

前端场景映射：

- 一个 Junior 工程师用 AI 一天生成了 500 行组件代码
- Senior 工程师即使全力 review，也只能看到表面正确性（语法、格式），无法在一天内理解所有上下文

### 5. 为什么测试不够

Addy 的论证在前端的映射：

- 测试覆盖的是"已知行为"，AI 生成代码时引入的新边界情况往往不在测试意图内
- 当 AI 修改实现并同步更新测试时，测试已经失去独立验证的能力

### 6. 实践建议

以下建议针对前端团队：

- **每次 PR 必须包含"context"说明**：为什么这样设计而非那样
- **定期架构盲区复盘**：每月一次，团队一起过"没人能解释清楚"的代码区域
- **区分 AI 使用模式**：把 AI 用于概念探索（tradeoff 分析）vs 代码委托（code generation delegation），两者效果截然不同
- **维护"系统地图"**：高层级架构图/状态流转图，作为团队共同认知的锚点

### 7. 结语

引用 Addy 原文：

> Making code cheap to generate doesn’t make understanding cheap to skip. The comprehension work is the job.

AI 处理的是翻译工作。理解代码的上下文、决策依据、隐含假设——这些仍然是工程师的职责。

---

## 技术细节

- 布局：`PostLayout`（默认）
- 无需额外 MDX 组件
- 无图片（引用原文的 Anthropic 图表但不内嵌，可考虑添加外链）
- 可添加 `LinkPreview` 组件引用原文链接

---

## 风格

- 语言：中文（简体中文）
- 语气：正式但有现场感，多用"我们"而非"你"
- 目标读者：中文技术社区的工程师，尤其是使用 AI 辅助工具的前端开发者
