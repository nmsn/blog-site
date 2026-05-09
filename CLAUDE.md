# Blog Site

基于 Tailwind Next.js Starter Blog 的个人博客项目。

## 技术栈

- Next.js (App Router) + React Server Components
- Tailwind CSS
- content-collections 管理 MDX 内容
- pliny 提供 MDX 增强组件

## 写博客文章

文章存放在 `data/blog/` 下，格式为 `.mdx`。

### 写作前必读

参考 `.claude/mdx-component-reference.md`，其中包含：

- 所有可用的 Frontmatter 字段（layout、authors、images 等）
- 可用的 MDX 组件（TOCInline、Image、LinkPreview、ThemeSwitchDemo 等）
- 代码块增强语法（文件名、行高亮、行号、diff）
- Markdown 扩展语法（脚注、任务列表、删除线、GitHub Alert、学术引用）
- 布局选项（PostLayout、PostSimple、PostBanner）

### Frontmatter 最小模板

```yaml
---
title: '文章标题'
date: 'YYYY-MM-DD'
tags: ['tag1', 'tag2']
draft: false
summary: '文章摘要'
---
```

### 注意事项

- 中文文章的作者是项目所有者，英文模板文章已设为 draft
- 图片放在 `public/static/images/` 下
- 生产环境自动过滤 `draft: true` 的文章
