/**
 * 个人介绍模块：简介、经历时间线、教育背景
 * 时间线为垂直布局：左侧竖线 + 节点圆点
 */
import { EXPERIENCES, EDUCATION, PROFILE } from '../../data/seed';
import SectionTitle from '../../components/SectionTitle';

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-16">
      <SectionTitle title="关于我" />

      <div className="grid gap-12 lg:grid-cols-2">
        {/* 左侧：简介 + 经历时间线 */}
        <div>
          <p className="mb-8 leading-relaxed opacity-80">{PROFILE.intro} 目前正在
            寻找前端相关的工作机会，欢迎通过下方联系方式与我交流。</p>

          <h3 className="mb-6 text-lg font-semibold">经历</h3>
          {/* 垂直时间线：border-l 作连线，节点圆点定位在竖线上 */}
          <ol className="relative ml-1 space-y-8 border-l border-white/15 pl-6">
            {EXPERIENCES.map((event) => (
              <li key={event.title} className="relative">
                {/* 时间线节点 */}
                <span
                  className="absolute -left-[30px] top-1.5 h-3 w-3 rounded-full bg-accent ring-4 ring-accent/20"
                  aria-hidden="true"
                />
                <p className="text-sm font-medium text-accent">{event.period}</p>
                <h4 className="mt-1 font-semibold">{event.title}</h4>
                <p className="mt-1 text-sm leading-relaxed opacity-70">
                  {event.description}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* 右侧：教育背景 */}
        <div>
          <h3 className="mb-6 text-lg font-semibold">教育背景</h3>
          <ol className="relative ml-1 space-y-8 border-l border-white/15 pl-6">
            {EDUCATION.map((edu) => (
              <li key={edu.school} className="relative">
                <span
                  className="absolute -left-[30px] top-1.5 h-3 w-3 rounded-full bg-success ring-4 ring-success/20"
                  aria-hidden="true"
                />
                <p className="text-sm font-medium text-success">{edu.period}</p>
                <h4 className="mt-1 font-semibold">{edu.school}</h4>
                <p className="text-sm opacity-70">{edu.degree}</p>
                {edu.description && (
                  <p className="mt-1 text-sm leading-relaxed opacity-70">
                    {edu.description}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
