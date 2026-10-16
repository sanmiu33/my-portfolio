/**
 * 通用模块标题：统一的编号 + 标题样式
 */
interface SectionTitleProps {
  title: string;
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <h2 className="mb-10 flex items-center gap-3 text-2xl font-bold">
      <span className="h-6 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      {title}
    </h2>
  );
}
