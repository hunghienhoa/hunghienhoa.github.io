import type { Metadata } from "next";

const siteName = "Nebula IPA";
const siteUrl = "https://nebula-ipa.example";
const defaultDescription =
  "Kho ứng dụng IPA với giao diện mobile-first lấy cảm hứng từ phong cách cửa hàng ứng dụng hiện đại, có dark mode, SEO metadata và trải nghiệm tải xuống mượt mà.";

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | IPA Library`,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  openGraph: {
    type: "website",
    title: `${siteName} | IPA Library`,
    description: defaultDescription,
    siteName,
    images: [
      {
        url: "/og-cover.svg",
        width: 1200,
        height: 630,
        alt: "Nebula IPA preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | IPA Library`,
    description: defaultDescription,
    images: ["/og-cover.svg"],
  },
  keywords: [
    "IPA library",
    "Next.js 15",
    "React 19",
    "App Store inspired design",
    "Dark mode",
    "Sideloadly",
  ],
  category: "technology",
};

export function createPageMetadata(title: string, description: string, path = "/"): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      images: ["/og-cover.svg"],
    },
    twitter: {
      title,
      description,
      images: ["/og-cover.svg"],
    },
  };
}
