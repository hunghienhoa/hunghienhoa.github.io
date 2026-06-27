import Link from "next/link";
import type { ReactNode } from "react";
import { getAdminSections } from "@/services/catalog-service";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const sections = await getAdminSections();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.16),_transparent_30%),linear-gradient(180deg,#f7f9ff_0%,#eef2ff_45%,#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.18),_transparent_30%),linear-gradient(180deg,#020617_0%,#0f172a_42%,#030712_100%)]">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[280px_1fr]">
        <aside className="glass-surface rounded-[2rem] p-5">
          <Link href="/" className="inline-flex rounded-full bg-[linear-gradient(135deg,#3b82f6,#8b5cf6)] px-4 py-2 text-sm font-semibold text-white shadow-lg">
            ← Về trang chủ
          </Link>
          <div className="mt-6">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Navigation</p>
            <div className="mt-4 grid gap-2">
              <Link
                href="/admin"
                className="rounded-[1.3rem] px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-sky-50 hover:text-sky-600 dark:text-slate-200 dark:hover:bg-white/5"
              >
                Dashboard
              </Link>
              {sections.map((section) => (
                <Link
                  key={section.slug}
                  href={`/admin/${section.slug}`}
                  className="rounded-[1.3rem] px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-sky-50 hover:text-sky-600 dark:text-slate-200 dark:hover:bg-white/5"
                >
                  {section.title}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <main className="glass-surface rounded-[2rem] p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
