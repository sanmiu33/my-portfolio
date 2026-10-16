// src/api/auth.ts
/**
 * 模拟认证 API
 * 默认账号：admin / 123456
 */

const TOKEN_KEY = 'admin_token';
const TOKEN_EXPIRY_KEY = 'admin_token_expiry';
const EXPIRY_HOURS = 24;

export interface LoginResult {
  success: boolean;
  token?: string;
  message?: string;
}

/**
 * 登录
 */
export function login(username: string, password: string): LoginResult {
  // 模拟校验
  if (username === 'admin' && password === '123456') {
    const token = 'fake-token-' + Date.now();
    const expiry = Date.now() + EXPIRY_HOURS * 60 * 60 * 1000;

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(TOKEN_EXPIRY_KEY, String(expiry));

    return { success: true, token };
  }

  return { success: false, message: '账号或密码错误' };
}

/**
 * 登出
 */
export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
}

/**
 * 检查是否已认证（token 存在且未过期）
 */
export function isAuthenticated(): boolean {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);

  if (!token || !expiry) return false;

  const expiryTime = Number(expiry);
  if (Number.isNaN(expiryTime) || Date.now() > expiryTime) {
    // 已过期，清理
    logout();
    return false;
  }

  return true;
}

/**
 * 获取当前 token（可选）
 */
export function getToken(): string | null {
  if (!isAuthenticated()) return null;
  return localStorage.getItem(TOKEN_KEY);
}