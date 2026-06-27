import Link from "next/link";
import { ArrowRight, Flame, Sparkles } from "lucide-react";
import type { AppRecord, Category, NewsItem } from "@/types";
import { AppArtwork, GlassCard, LinkLikeButton, SectionHeader, Stars, TagPill } from "@/components/shared";
import { cn } from "@/lib/utils";

function AppStoreRow({ app }: { app: AppRecord }) {
  return (
    <Link
      href={`/apps/${app.slug}`}
      className="group grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-[1.75rem] px-1 py-3 transition hover:bg-slate-50/85 dark:hover:bg-white/[0.03]"
    >
      <AppArtwork label={app.iconLabel} gradient={app.gradient} size="sm" />
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-lg font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">{app.name}</h3>
          {app.trending ? (
            <span className="inline-flex rounded-full bg-orange-100 px-2 py-0.5 text-[11px] font-semibold text-orange-600 dark:bg-orange-500/15 dark:text-orange-200">
              HOT
            </span>
          ) : null}
        </div>
        <p className="truncate text-sm text-slate-500 dark:text-slate-400">{app.shortDescription}</p>
        <div className="mt-2 flex items-center gap-2">
          <Stars rating={app.rating} />
          <span className="text-xs text-slate-400 dark:text-slate-500">{app.developer.name}</span>
        </div>
      </div>
      <button
        type="button"
        className={cn(
          "ripple-button min-w-24 rounded-full px-4 py-2 text-sm font-semibold tracking-wide text-white shadow-[0_10px_30px_-14px_rgba(37,99,235,0.85)] transition group-hover:scale-[1.02]",
          app.premium
            ? "bg-[linear-gradient(135deg,#fb923c,#f59e0b)]"
            : "bg-[linear-gradient(135deg,#2563eb,#38bdf8)]",
        )}
      >
        {app.premium ? "PREMIUM" : "NHẬN"}
      </button>
    </Link>
  );
}

export function CategoryStrip({ categories }: { categories: Category[] }) {
  return (
    <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
      {categories.map((category, index) => (
        <Link key={category.id} href={`/category/${category.slug}`} className="shrink-0">
          <TagPill active={index === 0}>{category.name}</TagPill>
        </Link>
      ))}
    </div>
  );
}

export function FeaturedSection({ apps }: { apps: AppRecord[] }) {
  return (
    <section className="space-y-4">
      <SectionHeader title="Trò chơi nổi bật" eyebrow="Curated collection" />
      <GlassCard className="space-y-1 p-4 sm:p-5">
        {apps.map((app, index) => (
          <div key={app.id} className={cn(index !== apps.length - 1 && "border-b border-slate-200/80 pb-2 dark:border-white/[0.06]")}>
            <AppStoreRow app={app} />
          </div>
        ))}
      </GlassCard>
    </section>
  );
}

export function WhatsNewSection({ apps, newsFeed }: { apps: AppRecord[]; newsFeed: NewsItem[] }) {
  return (
    <section className="space-y-4">
      <SectionHeader
        title="Có gì mới"
        eyebrow="Mới phát hành"
        action={
          <Link href="/search">
            <LinkLikeButton>Xem tất cả</LinkLikeButton>
          </Link>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <GlassCard className="space-y-1 p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-lg font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">Ứng dụng mới và cập nhật</p>
            <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-500/15 dark:text-sky-200">
              Live
            </span>
          </div>

          {apps.map((app, index) => (
            <div key={app.id} className={cn(index !== apps.length - 1 && "border-b border-slate-200/80 pb-2 dark:border-white/[0.06]")}>
              <AppStoreRow app={app} />
            </div>
          ))}
        </GlassCard>

        <div className="space-y-4">
          {newsFeed.map((news) => (
            <GlassCard key={news.id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-11 place-items-center rounded-[1.3rem] bg-[linear-gradient(135deg,#8b5cf6,#3b82f6)] text-white">
                  {news.id === "news-1" ? <Flame className="size-5" /> : <Sparkles className="size-5" />}
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">{news.timeAgo}</span>
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">{news.title}</h3>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{news.excerpt}</p>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-sky-600 dark:text-sky-300">
                Đọc thêm
                <ArrowRight className="size-4" />
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
