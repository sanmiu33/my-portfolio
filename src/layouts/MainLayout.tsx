/**
 * 前台布局：顶部导航栏 + 内容区 + 页脚
 * 前台所有页面统一在此布局内渲染
 */
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {/* 内容区：路由出口，flex-1 撑满剩余高度 */}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
