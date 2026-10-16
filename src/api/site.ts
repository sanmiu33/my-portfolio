/**
 * 站点数据 API（localStorage 持久化）
 * 后台修改 → 存 localStorage → 前台 seed.ts 读取
 */
import type {
    Profile,
    Skill,
    Project,
    TimelineEvent,
    Education,
  } from '../types';
  
  const STORAGE_KEY = 'admin_site_data';
  
  /** 站点数据结构 */
  export interface SiteData {
    profile: Profile;
    resumeUrl: string;
    experiences: TimelineEvent[];
    education: Education[];
    skills: Skill[];
    projects: Project[];
  }
  
  /** 默认数据（初始值，来自原 seed.ts） */
  export const DEFAULT_SITE_DATA: SiteData = {
    profile: {
      name: '纸',
      title: '前端开发工程师',
      avatar: '',
      intro: '热爱构建简洁优雅的 Web 应用，专注于 React 生态与交互动效。',
      email: 'zhi@example.com',
      socials: [
        { platform: 'GitHub', url: 'https://github.com/zhi' },
        { platform: 'Twitter', url: 'https://twitter.com/zhi' },
        { platform: 'Bilibili', url: 'https://space.bilibili.com/zhi' },
      ],
    },
    resumeUrl: '/resume.pdf',
    experiences: [
      {
        period: '2025 - 至今',
        title: '前端开发实习 · 某互联网公司',
        description:
          '参与官网与内部管理系统的开发，负责通用组件封装与首屏性能优化。',
      },
      {
        period: '2024 - 2025',
        title: '自由开发者',
        description:
          '为客户交付多个响应式网站与小程序，积累了完整的项目交付经验。',
      },
      {
        period: '2023 - 2024',
        title: '系统学习前端',
        description:
          '深入学习 React / TypeScript / TailwindCSS，完成多个个人项目并开源。',
      },
    ],
    education: [
      {
        school: '某某大学',
        degree: '计算机科学与技术 · 本科',
        period: '2021 - 2025',
        description: '主修数据结构、操作系统、计算机网络等核心课程。',
      },
    ],
    skills: [
      { id: 's1', name: 'React', category: '前端', level: 90 },
      { id: 's2', name: 'TypeScript', category: '前端', level: 85 },
      { id: 's3', name: 'TailwindCSS', category: '前端', level: 85 },
      { id: 's4', name: 'Vue', category: '前端', level: 70 },
      { id: 's5', name: 'Node.js', category: '后端', level: 70 },
      { id: 's6', name: 'Express', category: '后端', level: 65 },
      { id: 's7', name: 'MySQL', category: '后端', level: 60 },
      { id: 's8', name: 'Git', category: '工具', level: 85 },
      { id: 's9', name: 'Vite', category: '工具', level: 80 },
      { id: 's10', name: 'Figma', category: '工具', level: 65 },
      { id: 's11', name: 'Linux', category: '其他', level: 60 },
      { id: 's12', name: 'Nginx', category: '其他', level: 55 },
    ],
    projects: [
      {
        id: 'p1',
        title: '个人作品集网站',
        description: '深色主题的个人展示网站，包含博客、项目展示与后台管理系统。',
        cover: '',
        tags: ['React', 'TypeScript', 'TailwindCSS'],
        demoUrl: 'https://example.com',
        repoUrl: 'https://github.com/zhi/portfolio',
        date: '2026-10-01',
      },
      {
        id: 'p2',
        title: '组件库文档站',
        description: '为团队内部组件库搭建的文档站，支持在线演示与 API 查询。',
        cover: '',
        tags: ['Vite', 'Markdown', 'Vitest'],
        demoUrl: 'https://example.com',
        date: '2026-06-15',
      },
      {
        id: 'p3',
        title: '天气可视化面板',
        description: '基于公开天气 API 的数据可视化面板，支持多城市对比与趋势图表。',
        cover: '',
        tags: ['React', 'ECharts', 'REST API'],
        repoUrl: 'https://github.com/zhi/weather-board',
        date: '2026-03-20',
      },
    ],
  };
  
  /** 读取全部站点数据 */
  export function getSiteData(): SiteData {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SITE_DATA;
    try {
      const parsed = JSON.parse(raw) as Partial<SiteData>;
      // 合并默认值，避免旧数据缺字段
      return {
        ...DEFAULT_SITE_DATA,
        ...parsed,
        profile: { ...DEFAULT_SITE_DATA.profile, ...parsed.profile },
      };
    } catch {
      return DEFAULT_SITE_DATA;
    }
  }
  
  /** 保存全部站点数据 */
  export function saveSiteData(data: SiteData): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
  
  /** 重置为默认数据 */
  export function resetSiteData(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
  
  /** 单独更新 profile（常用） */
  export function updateProfile(profile: Partial<Profile>): void {
    const data = getSiteData();
    saveSiteData({ ...data, profile: { ...data.profile, ...profile } });
  }