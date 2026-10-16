/**
 * 根组件：集中配置所有路由
 * 前台使用 MainLayout 布局，后台 /admin 使用独立的 AdminLayout 布局
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Starfield from './components/Starfield';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import BlogList from './pages/Blog';
import BlogDetail from './pages/Blog/Detail';
import ProjectList from './pages/Projects';
import ProjectDetail from './pages/Projects/Detail';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Settings from './pages/admin/Settings';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      {/* 全局星空背景：固定铺满视口，置于所有页面内容底层 */}
      <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <Starfield />
      </div>
      <Routes>
        {/* 前台路由：统一套用前台布局 */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Route>

        {/* 后台登录页：不套 AdminLayout，也不需要守卫 */}
        <Route path="/admin/login" element={<Login />} />

        {/* 后台受保护区域：用 ProtectedRoute 包裹 AdminLayout */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* /admin 默认渲染仪表盘 */}
          <Route index element={<Dashboard />} />
          {/* 站点设置：可修改前台个人信息 */}
          <Route path="settings" element={<Settings />} />
          {/* 文章管理暂不做，保留注释 */}
          {/* <Route path="posts" element={<PostList />} /> */}
        </Route>

        {/* 404 兜底路由 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}