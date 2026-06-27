import { AdminDashboard } from "@/components/admin-shell";
import { createPageMetadata } from "@/lib/metadata";
import { getAdminSections, getAllApps, getDashboardMetrics } from "@/services/catalog-service";

export const metadata = createPageMetadata("Admin Dashboard", "Bảng quản trị ứng dụng, nội dung và analytics.", "/admin");

export default async function AdminPage() {
  const [metrics, sections, apps] = await Promise.all([getDashboardMetrics(), getAdminSections(), getAllApps()]);

  return <AdminDashboard metrics={metrics} sections={sections} apps={apps} />;
}
