/**
 * 404 页面：路由未匹配时的兜底页面
 */
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="opacity-60">页面不存在或已被移除</p>
      <Link
        to="/"
        className="rounded-xl bg-accent px-6 py-2 transition-all duration-300 ease-in-out hover:opacity-80"
      >
        返回首页
      </Link>
    </section>
  );
}
