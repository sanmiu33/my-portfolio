// src/layouts/AdminLayout.tsx
import { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../api/auth';

interface NavItem {
  to: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { to: '/admin', label: '仪表盘', icon: '📊' },
  { to: '/admin/posts', label: '文章管理', icon: '📝' },
  { to: '/admin/settings', label: '设置', icon: '⚙️' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  // 判断 NavLink 是否精确匹配（用于仪表盘根路径）
  const isExact = (to: string) => to === '/admin';

  return (
    <div
      className="flex min-h-screen"
      style={{ backgroundColor: '#0B0F1A', color: '#E6EAF2' }}
    >
      {/* 移动端遮罩 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 侧边栏 */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          backgroundColor: '#0F1424',
          borderColor: 'rgba(255,255,255,0.06)',
        }}
      >
        {/* Logo */}
        <div
          className="flex h-16 items-center gap-3 border-b px-6"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <span className="text-xl">🚀</span>
          <span className="text-lg font-bold tracking-wide">管理后台</span>
        </div>

        {/* 导航 */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navItems.map((item) => {
            const active = isExact(item.to)
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={isExact(item.to)}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
                style={{
                  backgroundColor: active
                    ? 'rgba(59,130,246,0.15)'
                    : 'transparent',
                  color: active ? '#3B82F6' : '#B8C0CC',
                }}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* 底部：返回前台 + 退出 */}
        <div
          className="space-y-1 border-t p-4"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <NavLink
            to="/"
            className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors hover:bg-white/5"
            style={{ color: '#B8C0CC' }}
          >
            <span className="text-base">🏠</span>
            <span>返回前台</span>
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors hover:bg-red-500/10"
            style={{ color: '#F87171' }}
          >
            <span className="text-base">🚪</span>
            <span>退出登录</span>
          </button>
        </div>
      </aside>

      {/* 主内容区 */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* 顶部栏 */}
        <header
          className="flex h-16 items-center justify-between border-b px-4 lg:px-8"
          style={{
            backgroundColor: 'rgba(15,20,36,0.8)',
            borderColor: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* 移动端菜单按钮 */}
          <button
            className="rounded-lg p-2 transition-colors hover:bg-white/5 lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="打开菜单"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* 面包屑 / 标题占位 */}
          <div className="hidden text-sm lg:block" style={{ color: '#8A94A6' }}>
            后台管理 /{' '}
            {navItems.find((i) =>
              isExact(i.to)
                ? location.pathname === i.to
                : location.pathname.startsWith(i.to)
            )?.label ?? ''}
          </div>

          {/* 右侧：用户信息 */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-medium">admin</div>
              <div className="text-xs" style={{ color: '#6B7280' }}>
                管理员
              </div>
            </div>
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold"
              style={{ backgroundColor: '#3B82F6', color: '#FFFFFF' }}
            >
              A
            </div>
          </div>
        </header>

        {/* 页面内容 */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}