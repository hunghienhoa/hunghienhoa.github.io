import { notFound } from "next/navigation";
import { AdminSectionView } from "@/components/admin-shell";
import { createPageMetadata } from "@/lib/metadata";
import { getAdminSection, getAdminSections, getAllApps, getCategories, getDevelopers } from "@/services/catalog-service";

type AdminSectionPageProps = {
  params: Promise<{ section: string }>;
};

export async function generateStaticParams() {
  const sections = await getAdminSections();
  return sections.map((section) => ({ section: section.slug }));
}

export async function generateMetadata({ params }: AdminSectionPageProps) {
  const { section } = await params;
  return createPageMetadata(`Admin ${section}`, `Quản trị mục ${section}.`, `/admin/${section}`);
}

export default async function AdminSectionPage({ params }: AdminSectionPageProps) {
  const { section } = await params;
  const [currentSection, apps, categories, developers] = await Promise.all([
    getAdminSection(section),
    getAllApps(),
    getCategories(),
    getDevelopers(),
  ]);

  if (!currentSection) {
    notFound();
  }

  return <AdminSectionView section={currentSection} apps={apps} categories={categories} developers={developers} />;
}
