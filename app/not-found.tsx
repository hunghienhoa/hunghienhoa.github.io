import Link from "next/link";
import { GlassCard } from "@/components/shared";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#f7f9ff_0%,#eef2ff_45%,#f8fafc_100%)] px-4 dark:bg-[linear-gradient(180deg,#020617_0%,#0f172a_42%,#030712_100%)]">
      <GlassCard className="max-w-xl space-y-4 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">404</p>
        <h1 className="text-4xl font-semibold tracking-[-0.05em] text-slate-950 dark:text-white">Không tìm thấy nội dung</h1>
        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
          Trang bạn đang tìm có thể đã được di chuyển hoặc chưa có dữ liệu mẫu tương ứng.
        </p>
        <Link
          href="/"
          className="inline-flex rounded-full bg-[linear-gradient(135deg,#3b82f6,#8b5cf6)] px-5 py-3 text-sm font-semibold text-white shadow-lg"
        >
          Quay về trang chủ
        </Link>
      </GlassCard>
    </div>
  );
}
