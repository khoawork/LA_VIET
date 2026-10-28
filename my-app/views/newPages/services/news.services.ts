import {
  NewsCategory,
  NewsItem,
  FeaturedNewsItem,
  NewsStat,
} from "../types/news.type";

export const NEWS_CATEGORIES = [
  { id: "all" as NewsCategory, label: "TẤT CẢ BẢN TIN" },
  {
    id: "research-material" as NewsCategory,
    label: "NGHIÊN CỨU KỸ NGHỆ & VẬT LIỆU",
  },
  {
    id: "events-exhibition" as NewsCategory,
    label: "SỰ KIỆN & TRIỂN LÃM NGHỆ THUẬT",
  },
  { id: "project-diary" as NewsCategory, label: "NHẬT KÝ CÔNG TRÌNH" },
  {
    id: "interdisciplinary-cooperation" as NewsCategory,
    label: "HỢP TÁC LIÊN NGÀNH SƠN MÀI",
  },
];

export const FEATURED_NEWS: FeaturedNewsItem = {
  id: "",
  title: "",
  slug: "",
  category: "all",
  categoryLabel: "",
  specialBadge: "",
  issueNumber: "",
  author: "",
  publishedDate: "",
  readTime: "",
  verifiedBadge: "",
  description: "",
  imageUrl: "",
  tagBadge: "",
  highlightStats: [],
};

export const NEWS_STATS: NewsStat[] = [];

export const NEWS_ARTICLES: NewsItem[] = [];
