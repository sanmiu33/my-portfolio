/**
 * 联系模块：邮箱复制、社交链接、留言表单
 * 表单使用 react-hook-form + zod 校验
 */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Copy, Check, Globe, Send, Loader2 } from 'lucide-react';
import { GithubIcon, TwitterIcon } from '../../components/BrandIcons';
import { PROFILE } from '../../data/seed';
import SectionTitle from '../../components/SectionTitle';

/** 表单校验规则 */
const contactSchema = z.object({
  name: z.string().min(2, '姓名至少 2 个字符'),
  email: z.email('请输入有效的邮箱地址'),
  message: z.string().min(10, '留言至少 10 个字符'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

/** 表单提交状态 */
type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

/** 社交平台对应的图标（lucide 已移除品牌图标，使用内联 SVG 组件） */
const SOCIAL_ICONS: Record<string, (props: { className?: string }) => JSX.Element> = {
  GitHub: GithubIcon,
  Twitter: TwitterIcon,
};

export default function Contact() {
  // 邮箱是否已复制（2 秒后恢复）
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  /** 复制邮箱到剪贴板，附带旧浏览器降级方案 */
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
    } catch {
      // clipboard API 不可用时降级为 execCommand
      const textarea = document.createElement('textarea');
      textarea.value = PROFILE.email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  /** 模拟提交（第四步接入 API 层后替换为真实请求） */
  const onSubmit = async (values: ContactFormValues) => {
    setStatus('sending');
    try {
      // 模拟网络延迟
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log('表单数据：', values);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-16">
      <SectionTitle title="联系我" />

      <div className="grid gap-10 lg:grid-cols-2">
        {/* 左侧：邮箱 + 社交链接 */}
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 font-semibold">邮箱</h3>
            <button
              type="button"
              onClick={copyEmail}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-all duration-300 ease-in-out hover:border-accent/50"
              aria-live="polite"
            >
              <span>{PROFILE.email}</span>
              {copied ? (
                <span className="flex items-center gap-1 text-sm text-success">
                  <Check className="h-4 w-4" aria-hidden="true" />
                  已复制
                </span>
              ) : (
                <Copy className="h-4 w-4 opacity-60" aria-hidden="true" />
              )}
            </button>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">社交媒体</h3>
            <ul className="flex gap-3">
              {PROFILE.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.platform] ?? Globe;
                return (
                  <li key={social.platform}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                      aria-label={social.platform}
                      title={social.platform}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* 右侧：留言表单 */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <div>
            <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium">
              姓名
            </label>
            <input
              id="contact-name"
              type="text"
              placeholder="你的称呼"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 outline-none transition-all duration-300 ease-in-out placeholder:text-ink/30 focus:border-accent"
              {...register('name')}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-danger" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium">
              邮箱
            </label>
            <input
              id="contact-email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 outline-none transition-all duration-300 ease-in-out placeholder:text-ink/30 focus:border-accent"
              {...register('email')}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-danger" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium">
              留言
            </label>
            <textarea
              id="contact-message"
              rows={4}
              placeholder="想对我说点什么…"
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 outline-none transition-all duration-300 ease-in-out placeholder:text-ink/30 focus:border-accent"
              {...register('message')}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-danger" role="alert">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* 提交反馈：aria-live 保证读屏软件可感知 */}
          <div aria-live="polite">
            {status === 'success' && (
              <p className="rounded-xl bg-success/15 px-4 py-2.5 text-sm text-success">
                发送成功，我会尽快回复你！
              </p>
            )}
            {status === 'error' && (
              <p className="rounded-xl bg-danger/15 px-4 py-2.5 text-sm text-danger">
                发送失败，请稍后重试。
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="flex items-center gap-2 rounded-xl bg-accent px-6 py-2.5 font-medium transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg hover:shadow-accent/25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {status === 'sending' ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="h-4 w-4" aria-hidden="true" />
            )}
            {status === 'sending' ? '发送中…' : '发送'}
          </button>
        </form>
      </div>
    </section>
  );
}
