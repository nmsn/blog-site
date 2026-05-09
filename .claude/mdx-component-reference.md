# MDX 组件与语法参考

博客中可用的所有 MDX 组件和特殊语法，供写作时参考。

## Frontmatter 字段

```yaml
---
title: '文章标题' # 必填
date: '2025-01-01' # 必填
tags: ['tag1', 'tag2'] # 必填（可为空数组）
draft: false # 可选，true 时生产环境不显示
summary: '文章摘要' # 可选
lastmod: '2025-01-02' # 可选，最后修改日期
images: ['/static/images/xxx.jpg'] # 可选，社交分享卡片图片
authors: ['default'] # 可选，对应 data/authors/*.mdx 文件名
layout: PostLayout # 可选，PostLayout（默认）/ PostSimple / PostBanner
bibliography: references.bib # 可选，学术引用数据文件
canonicalUrl: 'https://...' # 可选，SEO 规范链接
---
```

## 目录组件 TOCInline

在文章任意位置插入目录：

```jsx
// 基础用法 — 显示所有 h2/h3 标题
<TOCInline toc={props.toc} />

// 排除某个标题
<TOCInline toc={props.toc} exclude="Introduction" />

// 只显示到 h2
<TOCInline toc={props.toc} toHeading={2} />

// 可折叠目录
<TOCInline toc={props.toc} asDisclosure />
```

## 图片

Markdown 语法的图片会被自动转换为 Next.js Image 组件：

```md
![alt text](/static/images/photo.jpg)
```

也可以直接使用 Image 组件（需指定宽高）：

```jsx
<Image alt="description" src="/static/images/photo.jpg" width={800} height={400} />
```

## 图片网格布局

在 MDX 中使用 JSX 实现响应式图片网格：

```jsx
<div className="-mx-2 flex flex-wrap overflow-hidden xl:-mx-2">
  <div className="my-1 w-full overflow-hidden px-2 xl:w-1/2">
    ![Image 1](/static/images/photo1.jpg)
  </div>
  <div className="my-1 w-full overflow-hidden px-2 xl:w-1/2">
    ![Image 2](/static/images/photo2.jpg)
  </div>
</div>
```

## 链接预览 LinkPreview

```jsx
<LinkPreview url="https://example.com" />
```

## 主题切换演示 ThemeSwitchDemo

```jsx
<ThemeSwitchDemo />
```

## 邮件订阅表单

```jsx
<BlogNewsletterForm title="喜欢这篇文章？" />
```

## 代码块增强

### 带文件名的代码块

在语言标识后加 `:filename`：

````
```js:utils.js
export function hello() {
  return 'world'
}
```
````

### 行高亮

用花括号指定高亮行号：

````
```js {1,3-4}
const a = 1
const b = 2
const c = 3
const d = 4
```
````

### 行号

添加 `showLineNumbers`：

````
```js showLineNumbers
const x = 1
```
````

### Diff 语法

用 `diff-` 前缀标识语言，`+`/`-` 标记增删行：

````
```diff-js
-   old: value
+   new: value
```
````

## Markdown 扩展语法

### 脚注

```md
这里有一个脚注[^1]。

[^1]: 这是脚注内容。
```

### 任务列表

```md
- [x] 已完成的事项
- [ ] 待办事项
```

### 删除线

```md
~~被删除的文字~~
```

### GitHub Alert

```md
> [!NOTE]
> 提示信息

> [!CAUTION]
> 警告信息
```

### 学术引用（需配置 bibliography）

```md
标准引用 [@Nash1950]
行内引用 @Nash1951
多引用 [see @Nash1950; @Nash1951, page 50]
```

## 视频

```jsx
<video controls>
  <source src="/static/videos/demo.webm" type="video/webm" />
</video>
```

## 布局选项

通过 frontmatter 的 `layout` 字段切换：

| 布局         | 说明                                 |
| ------------ | ------------------------------------ |
| `PostLayout` | 默认布局，标准博客文章样式           |
| `PostSimple` | 简洁布局，无侧边栏                   |
| `PostBanner` | 大图 Banner 布局，适合图片展示类文章 |
