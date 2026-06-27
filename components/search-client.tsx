"use client";

import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import type { AppRecord, Category } from "@/types";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { AppArtwork, EmptyState, GlassCard, SectionHeader, TagPill } from "@/components/shared";

type SearchClientProps = {
  apps: AppRecord[];
  categories: Category[];
};

export function SearchClient({ apps, categories }: SearchClientProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { visibleCount, sentinelRef } = useInfiniteScroll(4, 4);

  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      const normalizedQuery = query.trim().toLowerCase();
      const matchesQuery =
        !normalizedQuery ||
        `${app.name} ${app.developer.name} ${app.category} ${app.shortDescription}`.toLowerCase().includes(normalizedQuery);
      const matchesCategory = activeCategory === "all" || app.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [activeCategory, apps, query]);

  const visibleApps = filteredApps.slice(0, visibleCount);

  return (
    <div className="space-y-6">
      <GlassCard className="space-y-5">
        <SectionHeader title="Tìm kiếm" eyebrow="Live Search" />
        <div className="flex flex-col gap-3">
          <label className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm theo tên app, developer và category"
              className="h-14 w-full rounded-[1.6rem] border border-slate-200 bg-white pl-12 pr-4 text-sm outline-none transition focus:border-sky-400 dark:border-white/10 dark:bg-slate-950 dark:text-white"
            />
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:text-sky-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            >
              <SlidersHorizontal className="size-4" />
              Tất cả
            </button>
            {categories.map((category) => (
              <button key={category.id} type="button" onClick={() => setActiveCategory(category.slug)}>
                <TagPill active={activeCategory === category.slug}>{category.name}</TagPill>
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      {visibleApps.length === 0 ? (
        <EmptyState title="Không tìm thấy kết quả" description="Thử nhập tên khác, đổi category hoặc tìm theo developer để xem thêm ứng dụng mẫu." />
      ) : (
        <div className="grid gap-4">
          {visibleApps.map((app) => (
            <Link
              key={app.id}
              href={`/apps/${app.slug}`}
              className="group rounded-[2rem] border border-white/65 bg-white/88 p-4 shadow-[0_20px_55px_-28px_rgba(15,23,42,0.28)] backdrop-blur-xl transition hover:-translate-y-1 dark:border-white/10 dark:bg-[#111827]/88"
            >
              <div className="flex items-center gap-4">
                <AppArtwork label={app.iconLabel} gradient={app.gradient} size="md" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-xl font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">{app.name}</h3>
                    <TagPill>{app.category}</TagPill>
                  </div>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{app.shortDescription}</p>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
                    <span>{app.developer.name}</span>
                    <span>•</span>
                    <span>{app.version}</span>
                    <span>•</span>
                    <span>{app.downloads} tải</span>
                  </div>
                </div>
                <div className="rounded-full bg-[linear-gradient(135deg,#2563eb,#8b5cf6)] px-5 py-2 text-sm font-semibold text-white shadow-lg">
                  NHẬN
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div ref={sentinelRef} className="h-8" />
    </div>
  );
}
