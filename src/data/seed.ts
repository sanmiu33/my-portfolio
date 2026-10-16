/**
 * 前台数据出口：从 localStorage 读取，读不到用默认值
 * 后台在 /admin/settings 修改后，前台自动生效（刷新后）
 */
import { getSiteData, DEFAULT_SITE_DATA } from '../api/site';

// ⚠️ 注意：这些导出改成 getter，因为 localStorage 可能变化
// 但为了不破坏现有组件的 `import { PROFILE }` 用法，
// 我们用「每次调用重新读取」的方式：
// 组件在渲染时读取的永远是最新值

const data = getSiteData();

/** 个人信息（运行时读取） */
export const PROFILE = getSiteData().profile;

/** 简历地址 */
export const RESUME_URL = data.resumeUrl;

/** 经历时间线 */
export const EXPERIENCES = data.experiences;

/** 教育背景 */
export const EDUCATION = data.education;

/** 技能列表 */
export const SKILLS = data.skills;

/** 项目列表 */
export const PROJECTS = data.projects;

// 兜底：如果组件需要"重新读取最新数据"，可调用这个
export function reloadSeed() {
  return getSiteData();
}

export { DEFAULT_SITE_DATA };