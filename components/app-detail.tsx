import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CalendarDays, ChevronRight, Download, Eye, MoreHorizontal, ShieldCheck, Smartphone } from "lucide-react";
import type { AppRecord } from "@/types";
import { AppArtwork, GlassCard, SectionHeader, Stars, TagPill } from "@/components/shared";

const iconMap = {
  download: Download,
  link: Smartphone,
  shield: ShieldCheck,
  sparkles: ChevronRight,
} as const;

export function AppDetailContent({
  app,
  relatedApps,
  interactions,
}: {
  app: AppRecord;
  relatedApps: AppRecord[];
  interactions: ReactNode;
}) {
  const latestVersion = app.versions.find((version) => version.latest) ?? app.versions[0];

  return (
    <div className="space-y-6">
      <GlassCard className="overflow-hidden p-5 sm:p-7">
        <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
          <AppArtwork label={app.iconLabel} gradient={app.gradient} size="lg" />

          <div className="space-y-5">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                {app.tags.map((tag) => (
                  <TagPill key={tag}>{tag}</TagPill>
                ))}
              </div>
              <div>
                <h1 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 dark:text-white sm:text-5xl">{app.name}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                  <span>Phiên bản {app.version}</span>
                  <span>•</span>
                  <span>{app.developer.name}</span>
                  <span>•</span>
                  <span>{app.category}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Stars rating={app.rating} />
                <span className="text-sm text-slate-500 dark:text-slate-400">{app.rating} từ {app.ratingCount.toLocaleString("vi-VN")} đánh giá</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="ripple-button rounded-full bg-[linear-gradient(135deg,#8b5cf6,#6366f1)] px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_18px_44px_-18px_rgba(124,58,237,0.8)] transition hover:-translate-y-0.5"
              >
                CÀI ĐẶT
              </button>
              <button
                type="button"
                className="ripple-button rounded-full bg-[linear-gradient(135deg,#2563eb,#0ea5e9)] px-5 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_18px_44px_-18px_rgba(37,99,235,0.8)] transition hover:-translate-y-0.5"
              >
                Download
              </button>
              <button
                type="button"
                className="grid size-12 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:text-sky-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                aria-label="More"
              >
                <MoreHorizontal className="size-5" />
              </button>
            </div>

            <div className="grid gap-4 rounded-[1.75rem] border border-slate-200/80 bg-slate-50/90 p-4 sm:grid-cols-3 dark:border-white/10 dark:bg-white/[0.03]">
              <StatItem icon={<Smartphone className="size-4" />} label="Kích thước" value={app.size} />
              <StatItem icon={<CalendarDays className="size-4" />} label="Cập nhật" value={app.updatedAt} />
              <StatItem icon={<Eye className="size-4" />} label="Lượt xem" value={app.views} />
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
        <div className="space-y-6">
          <GlassCard className="space-y-4">
            <SectionHeader title="✨ Mô tả ứng dụng" />
            <p className="text-base leading-8 text-slate-600 dark:text-slate-300">{app.description}</p>
            <div className="flex flex-wrap gap-2">
              {app.compatibility.map((item) => (
                <TagPill key={item}>{item}</TagPill>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="space-y-4">
            <p className="text-2xl font-semibold tracking-[-0.04em] text-rose-600">Hack Features</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {app.hackFeatures.map((feature) => (
                <div
                  key={feature}
                  className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/85 px-4 py-3 text-sm font-medium text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200"
                >
                  {feature}
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="space-y-5" id="download-ipa">
            <SectionHeader title="Tải xuống & Cài đặt IPA" eyebrow="Download center" />
            <div className="grid gap-3 sm:grid-cols-2">
              <SpecCard label="Version" value={latestVersion.label} />
              <SpecCard label="iOS Requirement" value={latestVersion.iosRequirement} />
              <SpecCard label="File Size" value={latestVersion.fileSize} />
              <SpecCard label="Latest Version" value={latestVersion.latest ? "Mới nhất" : "Ổn định"} />
            </div>
            <div className="grid gap-3">
              {app.downloadLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  className="ripple-button flex items-center justify-between gap-4 rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(135deg,rgba(37,99,235,0.08),rgba(14,165,233,0.08))] px-5 py-4 text-left transition hover:border-sky-400/30 hover:bg-[linear-gradient(135deg,rgba(37,99,235,0.12),rgba(124,58,237,0.12))] dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <div>
                    <p className="text-base font-semibold text-slate-950 dark:text-white">{link.label}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{link.description}</p>
                  </div>
                  <ChevronRight className="size-5 text-sky-600 dark:text-sky-300" />
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="space-y-5" id="install-sideloadly">
            <SectionHeader title="Hướng dẫn cài đặt" eyebrow="Timeline" />
            <div className="space-y-4">
              {app.timeline.map((item, index) => {
                const TimelineIcon = iconMap[item.icon];

                return (
                  <div key={item.step} className="grid grid-cols-[auto_1fr] gap-4">
                    <div className="flex flex-col items-center">
                      <div className="grid size-12 place-items-center rounded-[1.35rem] bg-[linear-gradient(135deg,#3b82f6,#8b5cf6)] text-white shadow-lg">
                        <TimelineIcon className="size-5" />
                      </div>
                      {index !== app.timeline.length - 1 ? (
                        <div className="mt-2 h-full w-px bg-[linear-gradient(180deg,rgba(59,130,246,0.35),rgba(168,85,247,0.1))]" />
                      ) : null}
                    </div>
                    <div className="pb-6">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-300">{item.step}</p>
                      <h3 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {interactions}
        </div>

        <aside className="space-y-6">
          <GlassCard className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Screenshots</p>
            <div className="grid gap-3">
              {app.screenshots.map((screenshot, index) => (
                <div key={screenshot} className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-slate-50 dark:border-white/10 dark:bg-white/[0.03]">
                  <Image
                    src={screenshot}
                    alt={`${app.name} preview ${index + 1}`}
                    width={900}
                    height={520}
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 380px"
                  />
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="space-y-4">
            <SectionHeader title="Phiên bản" />
            <div className="space-y-3">
              {app.versions.map((version) => (
                <div
                  key={version.id}
                  className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-slate-950 dark:text-white">{version.label}</p>
                    {version.latest ? (
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-200">
                        Mới nhất
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {version.iosRequirement} • {version.fileSize}
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {version.changelog.map((line) => (
                      <li key={line}>• {line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="space-y-4">
            <SectionHeader title="Liên quan" />
            <div className="space-y-3">
              {relatedApps.map((relatedApp) => (
                <Link key={relatedApp.id} href={`/apps/${relatedApp.slug}`} className="flex items-center gap-3 rounded-[1.5rem] px-1 py-2 transition hover:bg-slate-50 dark:hover:bg-white/[0.03]">
                  <AppArtwork label={relatedApp.iconLabel} gradient={relatedApp.gradient} size="sm" />
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-950 dark:text-white">{relatedApp.name}</p>
                    <p className="truncate text-sm text-slate-500 dark:text-slate-400">{relatedApp.shortDescription}</p>
                  </div>
                </Link>
              ))}
            </div>
          </GlassCard>
        </aside>
      </div>
    </div>
  );
}

function StatItem({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-slate-400 dark:text-slate-500">{icon}</div>
      <p className="text-2xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white">{value}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  );
}

function SpecCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/[0.03]">
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">{value}</p>
    </div>
  );
}
