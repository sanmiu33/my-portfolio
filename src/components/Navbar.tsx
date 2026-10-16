/**
 * 前台导航栏：吸顶 + 毛玻璃效果
 * 后续步骤将补充移动端汉堡菜单
 */
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 border-b border-white/10 bg-night/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link to="/" className="text-lg font-bold">
          纸的博客
        </Link>
        <ul className="flex gap-6 text-sm">
          <li>
            <Link to="/" className="transition-all duration-300 ease-in-out hover:text-accent">
              首页
            </Link>
          </li>
          <li>
            <Link to="/projects" className="transition-all duration-300 ease-in-out hover:text-accent">
              项目
            </Link>
          </li>
          <li>
            <Link to="/blog" className="transition-all duration-300 ease-in-out hover:text-accent">
              博客
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
