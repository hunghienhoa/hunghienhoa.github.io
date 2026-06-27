import { JsonLd } from "@/components/shared";
import { CategoryStrip, FeaturedSection, WhatsNewSection } from "@/components/home-sections";
import { SiteShell } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/metadata";
import { getCategories, getFeaturedApps, getNewApps, getNewsFeed } from "@/services/catalog-service";

export const metadata = createPageMetadata(
  "Nebula IPA",
  "Trang chủ kho IPA với bố cục mobile-first, dark mode, phần nổi bật và danh sách ứng dụng mới theo phong cách App Store hiện đại.",
);

export default async function Home() {
  const [categories, featuredApps, newApps, newsFeed] = await Promise.all([
    getCategories(),
    getFeaturedApps(),
    getNewApps(),
    getNewsFeed(),
  ]);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Nebula IPA",
          description: "Kho IPA lấy cảm hứng từ App Store với mục trò chơi nổi bật và ứng dụng mới.",
        }}
      />
      <SiteShell title="Trò chơi" subtitle="Kho IPA được tuyển chọn">
        <div className="space-y-8">
          <CategoryStrip categories={categories} />
          <FeaturedSection apps={featuredApps} />
          <WhatsNewSection apps={newApps} newsFeed={newsFeed} />
        </div>
      </SiteShell>
    </>
  );
}
