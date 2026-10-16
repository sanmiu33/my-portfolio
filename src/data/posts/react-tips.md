---
title: React 性能优化的五个小技巧
date: 2026-09-28
tags:
  - React
  - TypeScript
summary: 从渲染优化到状态管理，分享五个立即可用的 React 性能优化技巧。
---

## 1. 用 React.memo 避免无关重渲染

当组件的 props 没有变化时，`React.memo` 可以跳过重新渲染：

```tsx
interface UserCardProps {
  name: string;
  age: number;
}

// 仅在 name 或 age 变化时重新渲染
const UserCard = memo(function UserCard({ name, age }: UserCardProps) {
  return (
    <div>
      {name} - {age}
    </div>
  );
});
```

## 2. 正确使用 useMemo 与 useCallback

计算开销大或引用需要稳定的场景才值得使用，不要为了优化而优化：

```tsx
// 只有依赖变化时才重新计算
const sortedList = useMemo(
  () => [...list].sort((a, b) => a.score - b.score),
  [list],
);

// 传递给 memo 子组件的回调保持引用稳定
const handleDelete = useCallback((id: string) => {
  setItems((prev) => prev.filter((item) => item.id !== id));
}, []);
```

## 3. 列表渲染必须提供稳定的 key

不要用数组索引当 key，尤其是列表会增删排序时：

```tsx
// 错误示范：key 用了 index
{items.map((item, index) => (
  <li key={index}>{item.name}</li>
))}

// 正确示范：key 使用唯一 id
{items.map((item) => (
  <li key={item.id}>{item.name}</li>
))}
```

## 4. 拆分过大的状态

把不相关的状态拆开，避免一次更新触发整棵子树重渲染：

```tsx
// 把频繁变化的状态单独管理
const [keyword, setKeyword] = useState('');
const [page, setPage] = useState(1);
```

## 5. 路由级懒加载

配合 `React.lazy` 与 `Suspense`，按需加载页面代码：

```tsx
const Blog = lazy(() => import('./pages/Blog'));

<Suspense fallback={<p>加载中…</p>}>
  <Blog />
</Suspense>
```

## 小结

性能优化的第一步永远是**测量**：先用 React DevTools Profiler
找到真正的瓶颈，再针对性地优化，避免过早优化。
