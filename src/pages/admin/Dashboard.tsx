import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">仪表盘</h1>
        <p className="mt-1 text-sm" style={{ color: '#8A94A6' }}>
          欢迎回来，这里是站点概览。
        </p>
      </div>

      <div
        className="rounded-xl border p-6"
        style={{
          backgroundColor: 'rgba(255,255,255,0.03)',
          borderColor: 'rgba(255,255,255,0.08)',
        }}
      >
        <h2 className="text-lg font-semibold">快捷操作</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/admin/settings"
            className="rounded-lg px-4 py-2 text-sm font-medium"
            style={{ backgroundColor: '#3B82F6', color: '#fff' }}
          >
            修改站点信息
          </Link>
          <Link
            to="/"
            className="rounded-lg border px-4 py-2 text-sm font-medium"
            style={{ borderColor: 'rgba(255,255,255,0.15)', color: '#E6EAF2' }}
          >
            查看前台
          </Link>
        </div>
      </div>
    </div>
  );
}