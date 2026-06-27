import Link from "next/link";
import { notFound } from "next/navigation";
import { AppArtwork, GlassCard, JsonLd, SectionHeader, TagPill } from "@/components/shared";
import { SiteShell } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/metadata";
import { getAppsByCategory, getCategories } from "@/services/catalog-service";
import type { CategorySlug } from "@/types";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  return createPageMetadata(`Danh mục ${slug}`, `Danh sách ứng dụng thuộc danh mục ${slug}.`, `/category/${slug}`);
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const apps = await getAppsByCategory(slug as CategorySlug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: category.name,
          description: category.description,
        }}
      />
      <SiteShell title={category.name} subtitle={category.description}>
        <div className="space-y-6">
          <GlassCard className="space-y-4">
            <SectionHeader title={category.name} eyebrow="Danh mục" />
            <p className="max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">{category.description}</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((item) => (
                <Link key={item.id} href={`/category/${item.slug}`}>
                  <TagPill active={item.slug === category.slug}>{item.name}</TagPill>
                </Link>
              ))}
            </div>
          </GlassCard>

          <div className="grid gap-4">
            {apps.map((app) => (
              <Link
                key={app.id}
                href={`/apps/${app.slug}`}
                className="rounded-[2rem] border border-white/65 bg-white/88 p-4 shadow-[0_20px_55px_-28px_rgba(15,23,42,0.28)] backdrop-blur-xl transition hover:-translate-y-1 dark:border-white/10 dark:bg-[#111827]/88"
              >
                <div className="flex items-center gap-4">
                  <AppArtwork label={app.iconLabel} gradient={app.gradient} size="md" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-xl font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">{app.name}</h3>
                      {app.premium ? <TagPill active>Premium</TagPill> : null}
                    </div>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{app.shortDescription}</p>
                    <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
                      <span>{app.developer.name}</span>
                      <span>•</span>
                      <span>{app.version}</span>
                      <span>•</span>
                      <span>{app.views} lượt xem</span>
                    </div>
                  </div>
                  <div className="rounded-full bg-[linear-gradient(135deg,#2563eb,#0ea5e9)] px-5 py-2 text-sm font-semibold text-white shadow-lg">
                    NHẬN
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </SiteShell>
    </>
  );
}
