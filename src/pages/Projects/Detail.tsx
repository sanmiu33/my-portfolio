/**
 * 项目详情页：展示单个项目完整信息
 */
import { useParams } from 'react-router-dom';

export default function ProjectDetail() {
  // 从路由获取项目 id
  const { id } = useParams<{ id: string }>();

  return (
    <section className="mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-2xl font-bold">项目详情</h1>
      <p className="opacity-60">id: {id ?? '未知'}，详情内容将在后续步骤实现</p>
    </section>
  );
}
