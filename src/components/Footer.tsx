/**
 * 页脚组件：展示版权与社交信息（后续步骤补充完整内容）
 */
export default function Footer() {
  return (
    <footer className="border-t border-white/10 p-6 text-center text-sm opacity-60">
      © {new Date().getFullYear()} 纸 · 个人作品集
    </footer>
  );
}
