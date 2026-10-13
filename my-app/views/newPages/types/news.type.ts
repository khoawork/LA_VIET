export type NewsCategory =
  | "all"
  | "research-material"
  | "events-exhibition"
  | "project-diary"
  | "interdisciplinary-cooperation";

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  category: NewsCategory;
  categoryLabel: string;
  tagBadge: string;
  author: string;
  publishedDate: string;
  readTime: string;
  description: string;
  imageUrl: string;
}

export interface FeaturedNewsItem extends NewsItem {
  specialBadge: string;
  issueNumber: string;
  verifiedBadge?: string;
  highlightStats?: Array<{
    label: string;
    value: string;
    accentColor?: string;
  }>;
}

export interface NewsStat {
  id: string;
  value: string;
  label: string;
  description: string;
  color: string;
}

