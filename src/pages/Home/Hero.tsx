/**
 * 首页 Hero 区域：头像、姓名职位、一句话介绍与 CTA 按钮
 * CTA：看项目（锚点到 #projects）、下载简历、联系我（锚点到 #contact）
 */
import { User, Download, FolderKanban, Mail } from 'lucide-react';
import { PROFILE, RESUME_URL } from '../../data/seed';

export default function Hero() {
  return (
    <section
      id="hero"
      className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-20 text-center sm:py-28"
    >
      {/* 头像占位：渐变圆 + User 图标（后续可替换为真实头像图片） */}
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-accent/40 to-indigo-500/20 ring-2 ring-accent/40">
        <User className="h-12 w-12 text-accent" aria-hidden="true" />
      </div>

      <h1 className="text-4xl font-bold sm:text-5xl">你好，我是 {PROFILE.name}</h1>
      <p className="text-lg font-medium text-accent">{PROFILE.title}</p>
      <p className="max-w-xl opacity-70">{PROFILE.intro}</p>

      {/* CTA 按钮组：统一动效，hover 轻微上浮 */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#projects"
          className="flex items-center gap-2 rounded-xl bg-accent px-6 py-2.5 font-medium transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg hover:shadow-accent/25"
        >
          <FolderKanban className="h-4 w-4" aria-hidden="true" />
          看项目
        </a>
        <a
          href={RESUME_URL}
          download
          className="flex items-center gap-2 rounded-xl border border-white/20 px-6 py-2.5 font-medium transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:border-accent hover:text-accent"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          下载简历
        </a>
        <a
          href="#contact"
          className="flex items-center gap-2 rounded-xl px-6 py-2.5 font-medium opacity-80 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:text-accent hover:opacity-100"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          联系我
        </a>
      </div>
    </section>
  );
}
