import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getSiteData, saveSiteData, resetSiteData } from '../../api/site';

const settingsSchema = z.object({
  name: z.string().min(1, '请输入名字'),
  title: z.string().min(1, '请输入职位'),
  intro: z.string().min(1, '请输入简介'),
  email: z.string().email('邮箱格式不正确'),
  avatar: z.string(),
  resumeUrl: z.string(),
  socials: z.array(
    z.object({
      platform: z.string().min(1, '平台名必填'),
      url: z.string().url('请输入合法 URL'),
    })
  ),
});

type FormData = z.infer<typeof settingsSchema>;

export default function Settings() {
  const [saved, setSaved] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: '',
      title: '',
      intro: '',
      email: '',
      avatar: '',
      resumeUrl: '',
      socials: [],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'socials' });

  useEffect(() => {
    const { profile, resumeUrl } = getSiteData();
    reset({
      name: profile.name,
      title: profile.title,
      intro: profile.intro,
      email: profile.email,
      avatar: profile.avatar ?? '',
      resumeUrl,
      socials: profile.socials,
    });
  }, [reset]);

  const onSubmit = (data: FormData) => {
    const site = getSiteData();
    saveSiteData({
      ...site,
      resumeUrl: data.resumeUrl,
      profile: {
        ...site.profile,
        name: data.name,
        title: data.title,
        intro: data.intro,
        email: data.email,
        avatar: data.avatar,
        socials: data.socials,
      },
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (!window.confirm('确定重置为默认数据吗？所有改动都会丢失。')) return;
    resetSiteData();
    const { profile, resumeUrl } = getSiteData();
    reset({
      name: profile.name,
      title: profile.title,
      intro: profile.intro,
      email: profile.email,
      avatar: profile.avatar ?? '',
      resumeUrl,
      socials: profile.socials,
    });
  };

  const fieldClass =
    'w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30';
  const inputStyle = {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderColor: 'rgba(255,255,255,0.12)',
    color: '#E6EAF2',
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">站点设置</h1>
          <p className="mt-1 text-sm" style={{ color: '#8A94A6' }}>
            修改前台首页展示的个人信息，保存后刷新前台生效
          </p>
        </div>
        <button
          onClick={handleReset}
          className="rounded-lg border px-4 py-2 text-sm"
          style={{
            borderColor: 'rgba(255,255,255,0.15)',
            color: '#B8C0CC',
          }}
        >
          重置默认
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* 基本信息 */}
        <Section title="基本信息">
          <Field label="名字" error={errors.name?.message}>
            <input {...register('name')} className={fieldClass} style={inputStyle} />
          </Field>
          <Field label="职位 / 头衔" error={errors.title?.message}>
            <input {...register('title')} className={fieldClass} style={inputStyle} />
          </Field>
          <Field label="一句话简介" error={errors.intro?.message}>
            <textarea
              {...register('intro')}
              rows={3}
              className={fieldClass}
              style={inputStyle}
            />
          </Field>
        </Section>

        {/* 联系方式 */}
        <Section title="联系方式">
          <Field label="邮箱" error={errors.email?.message}>
            <input
              {...register('email')}
              className={fieldClass}
              style={inputStyle}
            />
          </Field>
          <Field label="头像 URL（可选）" error={errors.avatar?.message}>
            <input
              {...register('avatar')}
              placeholder="https://..."
              className={fieldClass}
              style={inputStyle}
            />
          </Field>
          <Field label="简历下载地址" error={errors.resumeUrl?.message}>
            <input
              {...register('resumeUrl')}
              placeholder="/resume.pdf"
              className={fieldClass}
              style={inputStyle}
            />
          </Field>
        </Section>

        {/* 社交链接 */}
        <Section title="社交链接">
          {fields.map((f, i) => (
            <div key={f.id} className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_2fr_auto]">
              <input
                {...register(`socials.${i}.platform`)}
                placeholder="平台（GitHub）"
                className={fieldClass}
                style={inputStyle}
              />
              <input
                {...register(`socials.${i}.url`)}
                placeholder="https://..."
                className={fieldClass}
                style={inputStyle}
              />
              <button
                type="button"
                onClick={() => remove(i)}
                className="rounded-lg border px-3 text-sm"
                style={{
                  borderColor: 'rgba(239,68,68,0.3)',
                  color: '#F87171',
                }}
              >
                删除
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ platform: '', url: '' })}
            className="mt-2 rounded-lg border px-4 py-2 text-sm"
            style={{
              borderColor: 'rgba(255,255,255,0.15)',
              color: '#B8C0CC',
            }}
          >
            + 添加社交链接
          </button>
        </Section>

        {/* 保存 */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {saved && (
            <span className="text-sm" style={{ color: '#34D399' }}>
              ✓ 已保存
            </span>
          )}
          <button
            type="submit"
            className="rounded-lg px-6 py-2.5 text-sm font-semibold"
            style={{ backgroundColor: '#3B82F6', color: '#fff' }}
          >
            保存设置
          </button>
        </div>
      </form>
    </div>
  );
}

/* 小组件 */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="space-y-4 rounded-xl border p-6"
      style={{
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
    >
      <h2 className="text-sm font-semibold" style={{ color: '#B8C0CC' }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}