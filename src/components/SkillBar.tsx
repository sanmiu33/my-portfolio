/**
 * 技能进度条：进入视口后从 0 动画到目标熟练度
 */
import { useEffect, useRef, useState } from 'react';

interface SkillBarProps {
  name: string;
  level: number; // 熟练度 0-100
}

export default function SkillBar({ name, level }: SkillBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  // 是否已进入视口，控制进度条宽度动画
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    // 首次进入视口时触发动画，之后停止观察
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={barRef}>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="opacity-60">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-accent transition-all duration-700 ease-in-out"
          style={{ width: visible ? `${level}%` : '0%' }}
          role="progressbar"
          aria-valuenow={level}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${name} 熟练度`}
        />
      </div>
    </div>
  );
}
