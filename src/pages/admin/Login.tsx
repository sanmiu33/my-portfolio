// src/pages/admin/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { login } from '../../api/auth';

// 表单校验规则
const loginSchema = z.object({
  username: z.string().min(1, '请输入账号'),
  password: z.string().min(1, '请输入密码'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError('');

    // 模拟一点延迟，体验更好
    await new Promise((r) => setTimeout(r, 300));

    const result = login(data.username, data.password);

    if (result.success) {
      navigate('/admin', { replace: true });
    } else {
      setServerError(result.message || '登录失败，请重试');
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ backgroundColor: '#0B0F1A', color: '#E6EAF2' }}
    >
      <div className="w-full max-w-md">
        {/* 标题 */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">后台管理</h1>
          <p className="mt-2 text-sm" style={{ color: '#8A94A6' }}>
            请登录以继续
          </p>
        </div>

        {/* 登录卡片 */}
        <div
          className="rounded-2xl border p-8 shadow-2xl backdrop-blur-sm"
          style={{
            backgroundColor: 'rgba(255,255,255,0.03)',
            borderColor: 'rgba(255,255,255,0.08)',
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {/* 账号 */}
            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-sm font-medium"
                style={{ color: '#B8C0CC' }}
              >
                账号
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                placeholder="请输入账号"
                {...register('username')}
                className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderColor: errors.username
                    ? '#EF4444'
                    : 'rgba(255,255,255,0.12)',
                  color: '#E6EAF2',
                }}
              />
              {errors.username && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* 密码 */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium"
                style={{ color: '#B8C0CC' }}
              >
                密码
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="请输入密码"
                {...register('password')}
                className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderColor: errors.password
                    ? '#EF4444'
                    : 'rgba(255,255,255,0.12)',
                  color: '#E6EAF2',
                }}
              />
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* 服务端错误 */}
            {serverError && (
              <div
                className="rounded-lg border px-4 py-2.5 text-sm"
                style={{
                  backgroundColor: 'rgba(239,68,68,0.1)',
                  borderColor: 'rgba(239,68,68,0.3)',
                  color: '#FCA5A5',
                }}
                role="alert"
              >
                {serverError}
              </div>
            )}

            {/* 提交按钮 */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 disabled:cursor-not-allowed disabled:opacity-60"
              style={{ backgroundColor: '#3B82F6', color: '#FFFFFF' }}
            >
              {isSubmitting ? '登录中…' : '登录'}
            </button>
          </form>

          {/* 提示 */}
          <p className="mt-6 text-center text-xs" style={{ color: '#6B7280' }}>
            默认账号：admin / 123456
          </p>
        </div>
      </div>
    </div>
  );
}