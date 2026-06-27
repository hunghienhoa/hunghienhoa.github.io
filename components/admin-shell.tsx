import Link from "next/link";
import { BarChart3, FolderKanban, LayoutPanelTop, MessageSquare, PackageSearch, Star } from "lucide-react";
import type { AdminSection, AppRecord, Category, DashboardMetric, Developer } from "@/types";
import { GlassCard, SectionHeader, TagPill } from "@/components/shared";

const sectionIcons = {
  apps: PackageSearch,
  categories: FolderKanban,
  developers: Star,
  versions: LayoutPanelTop,
  downloads: BarChart3,
  comments: MessageSquare,
  banner: LayoutPanelTop,
  featured: Star,
  trending: BarChart3,
  analytics: BarChart3,
} as const;

export function AdminDashboard({
  metrics,
  sections,
  apps,
}: {
  metrics: DashboardMetric[];
  sections: AdminSection[];
  apps: AppRecord[];
}) {
  return (
    <div className="space-y-6">
      <div className="rounded-[2.25rem] border border-white/70 bg-[linear-gradient(135deg,rgba(37,99,235,0.9),rgba(139,92,246,0.9))] p-6 text-white shadow-[0_30px_80px_-35px_rgba(37,99,235,0.8)]">
        <p className="text-sm uppercase tracking-[0.22em] text-white/70">Admin</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.06em]">Dashboard</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/80">
          Bảng quản trị cho phép quản lý apps, categories, developers, versions, downloads, comments, banner, featured, trending và analytics mà không cần hệ thống xác thực người dùng.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <GlassCard key={metric.id} className="space-y-2">
            <p className="text-sm text-slate-500 dark:text-slate-400">{metric.label}</p>
            <p className="text-3xl font-semibold tracking-[-0.05em] text-slate-950 dark:text-white">{metric.value}</p>
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-300">{metric.trend}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <GlassCard className="space-y-4">
          <SectionHeader title="Điều hướng quản trị" />
          <div className="grid gap-3">
            {sections.map((section) => {
              const Icon = sectionIcons[section.slug];
              return (
                <Link
                  key={section.slug}
                  href={`/admin/${section.slug}`}
                  className="flex items-start gap-3 rounded-[1.5rem] border border-slate-200/80 bg-slate-50/90 px-4 py-4 transition hover:border-sky-400/30 hover:bg-sky-50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-sky-500/10"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-[1.2rem] bg-[linear-gradient(135deg,#3b82f6,#8b5cf6)] text-white">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-slate-950 dark:text-white">{section.title}</p>
                    <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">{section.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </GlassCard>

        <GlassCard className="space-y-4">
          <SectionHeader title="Ứng dụng đang nổi bật" />
          <div className="space-y-3">
            {apps.slice(0, 4).map((app) => (
              <div
                key={app.id}
                className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">{app.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{app.developer.name} • {app.version}</p>
                  </div>
                  <div className="flex gap-2">
                    {app.featured ? <TagPill active>Featured</TagPill> : null}
                    {app.trending ? <TagPill active>Trending</TagPill> : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

export function AdminSectionView({
  section,
  apps,
  categories,
  developers,
}: {
  section: AdminSection;
  apps: AppRecord[];
  categories: Category[];
  developers: Developer[];
}) {
  const Icon = sectionIcons[section.slug];

  return (
    <div className="space-y-6">
      <GlassCard className="space-y-3">
        <div className="flex items-start gap-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-[1.5rem] bg-[linear-gradient(135deg,#3b82f6,#8b5cf6)] text-white shadow-lg">
            <Icon className="size-6" />
          </span>
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Admin Section</p>
            <h1 className="mt-1 text-4xl font-semibold tracking-[-0.06em] text-slate-950 dark:text-white">{section.title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">{section.description}</p>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <GlassCard className="space-y-4">
          <SectionHeader title="Bảng dữ liệu mẫu" />
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-slate-400">
                <tr>
                  <th className="px-3 py-2 font-medium">Tên</th>
                  <th className="px-3 py-2 font-medium">Category</th>
                  <th className="px-3 py-2 font-medium">Developer</th>
                  <th className="px-3 py-2 font-medium">Version</th>
                  <th className="px-3 py-2 font-medium">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {apps.map((app) => (
                  <tr key={app.id} className="border-t border-slate-200/80 dark:border-white/[0.06]">
                    <td className="px-3 py-3 font-medium text-slate-950 dark:text-white">{app.name}</td>
                    <td className="px-3 py-3 text-slate-500 dark:text-slate-400">{app.category}</td>
                    <td className="px-3 py-3 text-slate-500 dark:text-slate-400">{app.developer.name}</td>
                    <td className="px-3 py-3 text-slate-500 dark:text-slate-400">{app.version}</td>
                    <td className="px-3 py-3">
                      <div className="flex gap-2">
                        {app.featured ? <TagPill active>Featured</TagPill> : null}
                        {app.trending ? <TagPill active>Trending</TagPill> : <TagPill>Draft</TagPill>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="space-y-4">
            <SectionHeader title="Categories" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <TagPill key={category.id}>{category.name}</TagPill>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="space-y-4">
            <SectionHeader title="Developers" />
            <div className="space-y-3">
              {developers.map((developer) => (
                <div
                  key={developer.id}
                  className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/90 px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <p className="font-semibold text-slate-950 dark:text-white">{developer.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{developer.website}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
