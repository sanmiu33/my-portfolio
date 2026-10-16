/**
 * 项目展示模块：按分类分组的技能卡片网格
 */
import { Code2, Server, Wrench, Sparkles, type LucideIcon } from 'lucide-react';
import { SKILLS } from '../../data/seed';
import SkillBar from '../../components/SkillBar';
import SectionTitle from '../../components/SectionTitle';

/** 分类对应的图标（保持声明顺序：前端 / 后端 / 工具 / 其他） */
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  前端: Code2,
  后端: Server,
  工具: Wrench,
  其他: Sparkles,
};

/** 分类显示顺序 */
const CATEGORY_ORDER = ['前端', '后端', '工具', '其他'];

export default function Skills() {
  // 按分类分组，保证分类顺序稳定
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    icon: CATEGORY_ICONS[category] ?? Sparkles,
    skills: SKILLS.filter((s) => s.category === category),
  })).filter((group) => group.skills.length > 0);

  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-16">
      <SectionTitle title="技能" />

      <div className="grid gap-6 md:grid-cols-2">
        {grouped.map(({ category, icon: Icon, skills }) => (
          <div
            key={category}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 ease-in-out hover:border-accent/40"
          >
            <div className="mb-5 flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15">
                <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
              </span>
              <h3 className="font-semibold">{category}</h3>
            </div>
            <div className="space-y-4">
              {skills.map((skill) => (
                <SkillBar key={skill.id} name={skill.name} level={skill.level} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
