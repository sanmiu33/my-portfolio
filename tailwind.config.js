/** @type {import('tailwindcss').Config} */
// TailwindCSS 全局配置：深色主题色值、统一圆角与动效
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // 深色主题核心色值（见 AGENTS.md 样式规范）
      colors: {
        night: '#0B0F1A', // 页面背景
        ink: '#E6EAF2', // 主文字颜色
        accent: '#3B82F6', // 强调色
        success: '#22C55E', // 成功
        danger: '#EF4444', // 危险
      },
      // 统一过渡动效
      transitionProperty: {
        default: 'all',
      },
    },
  },
  plugins: [],
}
