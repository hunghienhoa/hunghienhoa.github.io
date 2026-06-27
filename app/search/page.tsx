import { SearchClient } from "@/components/search-client";
import { JsonLd } from "@/components/shared";
import { SiteShell } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/metadata";
import { getAllApps, getCategories } from "@/services/catalog-service";

export const metadata = createPageMetadata(
  "Tìm kiếm",
  "Tìm app IPA theo tên, developer và category với giao diện live search mobile-first.",
  "/search",
);

export default async function SearchPage() {
  const [apps, categories] = await Promise.all([getAllApps(), getCategories()]);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SearchResultsPage",
          name: "Tìm kiếm ứng dụng IPA",
          description: "Trang tìm kiếm ứng dụng, developer và category.",
        }}
      />
      <SiteShell title="Tìm kiếm" subtitle="Live search theo app, developer và category">
        <SearchClient apps={apps} categories={categories} />
      </SiteShell>
    </>
  );
}
