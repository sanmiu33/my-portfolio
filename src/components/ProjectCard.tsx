/**
 * 项目卡片：封面占位图、描述、技术标签、链接
 * hover 时卡片抬升并显示强调色阴影
 */
import { ExternalLink, FolderGit2 } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  /** 用于从预置渐变色中取色，保证封面占位色不重复 */
  index?: number;
}

/** 封面占位渐变色列表（循环取用） */
const COVER_GRADIENTS = [
  'from-blue-500/30 to-indigo-500/10',
  'from-emerald-500/30 to-teal-500/10',
  'from-purple-500/30 to-fuchsia-500/10',
  'from-amber-500/30 to-orange-500/10',
  'from-rose-500/30 to-pink-500/10',
  'from-cyan-500/30 to-sky-500/10',
];

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const gradient = COVER_GRADIENTS[index % COVER_GRADIENTS.length];

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10">
      {/* 封面：暂无图片资源，使用渐变占位（接入后台后替换为真实封面） */}
      <div
        className={`flex aspect-video items-center justify-center bg-gradient-to-br ${gradient}`}
      >
        <FolderGit2
          className="h-12 w-12 text-ink/40 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:text-ink/60"
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="flex-1 text-sm leading-relaxed opacity-70">
          {project.description}
        </p>

        {/* 技术标签 */}
        <ul className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs text-accent"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* 链接区：按数据有无展示 */}
        <div className="mt-1 flex items-center gap-4 border-t border-white/10 pt-3 text-sm">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 opacity-70 transition-all duration-300 ease-in-out hover:text-accent hover:opacity-100"
              aria-label={`查看 ${project.title} 的源代码`}
            >
              <GithubIcon className="h-4 w-4" />
              源码
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 opacity-70 transition-all duration-300 ease-in-out hover:text-accent hover:opacity-100"
              aria-label={`查看 ${project.title} 的在线演示`}
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              演示
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
