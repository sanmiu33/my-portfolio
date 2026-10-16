---
title: 用 CSS Grid 打造响应式布局
date: 2026-09-15
tags:
  - CSS
  - 布局
summary: 一个技巧实现自适应多列卡片网格，告别手写断点媒体查询。
---

## auto-fit 与 minmax 的魔法

想让卡片网格在宽屏三列、平板两列、手机单列之间自动切换？
其实一条 CSS 就够了：

```css
.card-grid {
  display: grid;
  /* 每列最小 280px，剩余空间均分 */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
```

## 它是怎么工作的

1. `minmax(280px, 1fr)` 表示每列至少 280px，最多平分剩余空间
2. `auto-fit` 会根据容器宽度自动计算能放下几列
3. 空间不足时列数自动减少，完全不需要媒体查询

## 带侧边栏的页面骨架

Grid 也能轻松处理"内容 + 侧边栏"的经典布局：

```css
.page-layout {
  display: grid;
  grid-template-columns: 1fr 240px;
  gap: 2rem;
}

/* 小屏时侧边栏移到下方 */
@media (max-width: 1024px) {
  .page-layout {
    grid-template-columns: 1fr;
  }
}
```

## 与 Tailwind 的结合

在 TailwindCSS 中可以用任意值语法直接套用同样的思路：

```html
<div class="grid grid-cols-[1fr_240px] gap-8 max-lg:grid-cols-1">
  <main>内容区</main>
  <aside>侧边栏</aside>
</div>
```

## 总结

| 方案 | 适用场景 |
| ---- | -------- |
| `auto-fit + minmax` | 卡片瀑布流、等宽网格 |
| 显式断点 | 需要精确控制列数时 |

> 布局优先考虑 Grid，再考虑 Flex，两者互补而非替代。
