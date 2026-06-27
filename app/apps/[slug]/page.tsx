import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { AppDetailContent } from "@/components/app-detail";
import { GlassCard, JsonLd } from "@/components/shared";
import { SiteShell } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/metadata";
import { getAllApps, getAppBySlug, getRelatedApps } from "@/services/catalog-service";

const CommentsSection = dynamic(
  () => import("@/components/comments-section").then((module) => module.CommentsSection),
  {
    loading: () => <GlassCard className="h-80 animate-pulse" />,
  },
);

type AppDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function expandCompactNumber(value: string) {
  const normalized = value.trim().toUpperCase();
  if (normalized.endsWith("K")) return Math.round(Number.parseFloat(normalized) * 1_000);
  if (normalized.endsWith("M")) return Math.round(Number.parseFloat(normalized) * 1_000_000);
  return Number.parseInt(normalized, 10);
}

export async function generateStaticParams() {
  const apps = await getAllApps();
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: AppDetailPageProps) {
  const { slug } = await params;
  const app = await getAppBySlug(slug);

  if (!app) {
    return createPageMetadata("Ứng dụng", "Không tìm thấy ứng dụng.");
  }

  return createPageMetadata(app.name, app.shortDescription, `/apps/${app.slug}`);
}

export default async function AppDetailPage({ params }: AppDetailPageProps) {
  const { slug } = await params;
  const app = await getAppBySlug(slug);

  if (!app) {
    notFound();
  }

  const relatedApps = await getRelatedApps(app.slug, app.category);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: app.name,
          operatingSystem: "iOS",
          applicationCategory: app.category,
          description: app.description,
          softwareVersion: app.version,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: app.rating,
            ratingCount: app.ratingCount,
          },
        }}
      />
      <SiteShell title={app.name} subtitle={app.developer.name}>
        <AppDetailContent
          app={app}
          relatedApps={relatedApps}
          interactions={
            <CommentsSection
              appName={app.name}
              appSlug={app.slug}
              gradient={app.gradient}
              iconLabel={app.iconLabel}
              initialComments={app.comments}
              initialReviews={app.reviews}
              initialDownloads={expandCompactNumber(app.downloads)}
              initialViews={expandCompactNumber(app.views)}
            />
          }
        />
      </SiteShell>
    </>
  );
}
