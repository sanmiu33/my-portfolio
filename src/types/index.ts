/**
 * 全局类型定义
 * 集中管理项目中的核心数据模型，供 API 层、组件和页面使用
 */

/** 个人信息 */
export interface Profile {
  name: string;
  title: string; // 职位，如"前端开发工程师"
  avatar: string; // 头像图片地址
  intro: string; // 一句话介绍
  email: string;
  socials: SocialLink[];
}

/** 社交链接 */
export interface SocialLink {
  platform: string; // 平台名，如 GitHub
  url: string;
}

/** 技能 */
export interface Skill {
  id: string;
  name: string;
  category: string; // 分类，如"前端基础"
  level: number; // 熟练度 0-100
}

/** 项目 */
export interface Project {
  id: string;
  title: string;
  description: string;
  cover: string; // 封面图地址
  tags: string[]; // 技术标签
  demoUrl?: string; // 演示链接
  repoUrl?: string; // 仓库链接
  date: string; // ISO 日期字符串
}

/** 博客文章元信息（不含正文） */
export interface PostMeta {
  slug: string; // 对应 data/posts 下的 md 文件名（不含扩展名）
  title: string;
  summary: string; // 摘要
  tags: string[];
  date: string; // ISO 日期字符串
}

/** 站点设置 */
export interface SiteSettings {
  siteName: string;
  accentColor: string;
  footerText: string;
}

/** 时间线事件（个人经历） */
export interface TimelineEvent {
  period: string; // 时间段，如"2024 - 至今"
  title: string; // 经历标题
  description: string; // 简要描述
}

/** 教育背景 */
export interface Education {
  school: string;
  degree: string; // 学历与专业
  period: string; // 时间段
  description?: string;
}
