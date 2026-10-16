/**
 * 博客详情页：渲染单篇 Markdown 文章
 * 第三步将实现代码高亮与目录（TOC）
 */
import { useParams } from 'react-router-dom';

export default function BlogDetail() {
  // 从路由获取文章 slug
  const { slug } = useParams<{ slug: string }>();

  return (
    <section className="mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-2xl font-bold">文章详情</h1>
      <p className="opacity-60">slug: {slug ?? '未知'}，正文渲染将在后续步骤实现</p>
    </section>
  );
}
