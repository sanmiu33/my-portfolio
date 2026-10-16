/**
 * 星空背景组件：Canvas 绘制粒子星空
 * - 粒子缓慢漂移 + 闪烁，鼠标移动产生视差
 * - 桌面端 150 颗粒子，移动端（<768px）降到 50 颗，保证帧率 ≥ 50fps
 * - 尊重 prefers-reduced-motion：关闭闪烁/漂移/视差，只绘制静态星空
 */
import { useEffect, useRef } from 'react';

/** 粒子数据结构 */
interface Particle {
  x: number;
  y: number;
  radius: number; // 半径，越大的星星越稀少且带强调色
  baseAlpha: number; // 基础透明度
  twinkleSpeed: number; // 闪烁速度
  phase: number; // 闪烁相位（错开各粒子的闪烁节奏）
  depth: number; // 视差深度 0~1，越深移动幅度越大
  vx: number; // 水平漂移速度
  vy: number; // 垂直漂移速度
}

const DESKTOP_COUNT = 150; // 桌面端粒子数量
const MOBILE_COUNT = 50; // 移动端粒子数量
const MOBILE_BREAKPOINT = 768; // 移动端宽度断点
const PARALLAX_RANGE = 24; // 鼠标视差最大偏移量（px）

/** 根据当前窗口宽度返回应有的粒子数量 */
function getParticleCount(): number {
  return window.innerWidth < MOBILE_BREAKPOINT ? MOBILE_COUNT : DESKTOP_COUNT;
}

/** 在画布范围内随机生成一批粒子 */
function createParticles(count: number, width: number, height: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.4 + 0.4,
    baseAlpha: Math.random() * 0.5 + 0.25,
    twinkleSpeed: Math.random() * 0.8 + 0.2,
    phase: Math.random() * Math.PI * 2,
    depth: Math.random() * 0.8 + 0.2,
    vx: (Math.random() - 0.5) * 0.05,
    vy: (Math.random() - 0.5) * 0.05,
  }));
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let rafId = 0;
    let width = 0;
    let height = 0;
    // 鼠标位置归一化到 -0.5 ~ 0.5
    const mouse = { x: 0, y: 0 };

    // 读取用户"减少动画"偏好，并监听变化
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduceMotion = motionQuery.matches;

    /** 绘制一帧：reduceMotion 时各参数退化为静态值 */
    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const t = time / 1000;
      for (const p of particles) {
        if (!reduceMotion) {
          // 缓慢漂移，超出边界后从另一侧环绕
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x += width;
          if (p.x > width) p.x -= width;
          if (p.y < 0) p.y += height;
          if (p.y > height) p.y -= height;
        }
        // 闪烁系数：0.6 ~ 1.0 之间正弦波动
        const twinkle = reduceMotion ? 1 : 0.6 + 0.4 * Math.sin(t * p.twinkleSpeed + p.phase);
        const alpha = Math.min(p.baseAlpha * twinkle + 0.05, 1);
        // 深度越大的粒子受鼠标视差影响越明显
        const px = p.x + mouse.x * p.depth * PARALLAX_RANGE;
        const py = p.y + mouse.y * p.depth * PARALLAX_RANGE;
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        // 少量大星星使用强调色，其余为主文字色
        ctx.fillStyle =
          p.radius > 1.5
            ? `rgba(59, 130, 246, ${alpha})`
            : `rgba(230, 234, 242, ${alpha})`;
        ctx.fill();
      }
    };

    /** 动画循环入口 */
    const frame = (time: number) => {
      draw(time);
      rafId = requestAnimationFrame(frame);
    };

    /** 根据是否需要减少动画，启动或停止动画循环 */
    const syncLoop = () => {
      cancelAnimationFrame(rafId);
      if (reduceMotion) {
        // 静态模式：只绘制一帧，不循环
        draw(performance.now());
      } else {
        rafId = requestAnimationFrame(frame);
      }
    };

    /** 处理窗口尺寸变化：重设画布分辨率与粒子数量 */
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = getParticleCount();
      // 粒子数量随断点变化时才重建，避免丢失已有状态
      if (particles.length !== count) {
        particles = createParticles(count, width, height);
      }
      if (reduceMotion) draw(performance.now());
    };

    /** 处理鼠标移动：更新视差偏移量 */
    const handleMouseMove = (e: MouseEvent) => {
      if (reduceMotion) return;
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
    };

    /** 处理"减少动画"偏好变化 */
    const handleMotionChange = () => {
      reduceMotion = motionQuery.matches;
      syncLoop();
    };

    // 初始化并绑定事件
    handleResize();
    syncLoop();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    motionQuery.addEventListener('change', handleMotionChange);

    // 组件卸载时清理，避免内存泄漏
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      // 纯装饰性背景，对读屏软件隐藏
      aria-hidden="true"
    />
  );
}
