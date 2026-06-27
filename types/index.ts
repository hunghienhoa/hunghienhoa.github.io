export type CategorySlug =
  | "games"
  | "apps"
  | "tweaks"
  | "utilities"
  | "jailbreak"
  | "entertainment"
  | "productivity"
  | "social";

export type Category = {
  id: string;
  name: string;
  slug: CategorySlug;
  description: string;
  accent: string;
};

export type Developer = {
  id: string;
  name: string;
  slug: string;
  verified: boolean;
  website: string;
};

export type Version = {
  id: string;
  label: string;
  iosRequirement: string;
  fileSize: string;
  latest: boolean;
  changelog: string[];
};

export type DownloadLink = {
  id: string;
  type: "sideloadly" | "ipa";
  label: string;
  description: string;
  url: string;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  headline: string;
  content: string;
  timeAgo: string;
};

export type Comment = {
  id: string;
  author: string;
  content: string;
  timeAgo: string;
  avatarColor: string;
};

export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  timeAgo: string;
};

export type AppRecord = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: CategorySlug;
  tags: string[];
  premium: boolean;
  featured: boolean;
  trending: boolean;
  rating: number;
  ratingCount: number;
  version: string;
  size: string;
  updatedAt: string;
  views: string;
  downloads: string;
  gradient: [string, string];
  iconLabel: string;
  developer: Developer;
  versions: Version[];
  downloadLinks: DownloadLink[];
  hackFeatures: string[];
  timeline: Array<{
    step: string;
    title: string;
    description: string;
    icon: "download" | "link" | "shield" | "sparkles";
  }>;
  comments: Comment[];
  reviews: Review[];
  screenshots: string[];
  compatibility: string[];
};

export type DashboardMetric = {
  id: string;
  label: string;
  value: string;
  trend: string;
};

export type AdminSection = {
  slug:
    | "apps"
    | "categories"
    | "developers"
    | "versions"
    | "downloads"
    | "comments"
    | "banner"
    | "featured"
    | "trending"
    | "analytics";
  title: string;
  description: string;
};
