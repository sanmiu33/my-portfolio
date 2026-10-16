/**
 * 首页项目展示模块：响应式卡片网格
 * <640px 单列 / 640~1024px 两列 / >1024px 三列
 */
import { PROJECTS } from '../../data/seed';
import ProjectCard from '../../components/ProjectCard';
import SectionTitle from '../../components/SectionTitle';

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-16">
      <SectionTitle title="项目" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
