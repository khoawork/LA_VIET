"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { PagePagination } from "@/shared/components/page-pagination";
import { NewsItem } from "../types/news.type";
import type { NewsArticlesSectionType } from "../types/pagenew.type";
import { NewsFilters } from "./news-filters";
import { NewsCard } from "./news-card";

interface NewsApiItem {
  id: number;
  name: string;
  slug: string;
  categoryId: number;
  category?: { name: string } | null;
  preside: string;
  date: string | null;
  reading: string;
  description: string;
  image: string;
}

export function NewsGrid({ data }: { data: NewsArticlesSectionType }) {
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const groups = data.filterGroups.length > 0
    ? data.filterGroups
    : [{ name: "TẤT CẢ BẢN TIN", categories: [] }];
  const selectedGroup = groups[selectedFilter] ?? groups[0];
  const categoryIds = selectedGroup.categories.join(",");

  // 2. Tải danh sách bài viết từ database qua API
  useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true);
        let url = `/api/news?page=${currentPage}&limit=10`;
        if (categoryIds) {
          url += `&categoryIds=${categoryIds}`;
        }
        const res = await fetch(url);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const mapped: NewsItem[] = json.data.map((item: NewsApiItem) => ({
            id: String(item.id),
            title: item.name,
            slug: item.slug,
            category: String(item.categoryId) as `${number}`,
            categoryLabel: item.category?.name || "Tin tức",
            tagBadge: item.category?.name?.toUpperCase() || "TIN TỨC",
            author: item.preside || "Là Việt",
            publishedDate: item.date
              ? new Date(item.date).toLocaleDateString("vi-VN")
              : "15/10/2025",
            readTime: item.reading || "5 phút đọc",
            description: item.description,
            imageUrl: item.image,
          }));
          setArticles(mapped);
          if (json.meta?.totalPages) {
            setTotalPages(json.meta.totalPages);
          }
        }
      } catch (err) {
        console.error("Lỗi tải bài viết tin tức:", err);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, [currentPage, categoryIds]);

  return (
    <section className="mb-14 sm:mb-16">
      {/* Category Filter Tabs */}
      <NewsFilters
        categories={groups.map((group, index) => ({ id: index, label: group.name }))}
        selectedCategory={selectedFilter}
        onSelectCategory={(index) => {
          setSelectedFilter(Number(index));
          setCurrentPage(1);
        }}
      />

      {/* Grid Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#9A1C1F] uppercase block mb-1">
            {data.eyebrow}
          </span>
          <h2 className="font-bold text-xl sm:text-2xl text-[#1E1917] tracking-tight uppercase">
            {data.title}
          </h2>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center gap-3 bg-white rounded-2xl border border-[#EAE2D5]">
          <Loader2 className="w-7 h-7 text-[#9A1C1F] animate-spin" />
          <p className="text-xs font-semibold text-[#695D56]">
            Đang tải dữ liệu bài viết mới nhất...
          </p>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#EAE2D5] text-[#695D56]">
          <p className="text-sm">Hiện chưa có bài viết nào trong chuyên mục này.</p>
        </div>
      ) : (
        /* Articles Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      )}

      {/* Pagination Bar */}
      {!loading && totalPages > 1 && (
        <PagePagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          className="mt-12"
        />
      )}
    </section>
  );
}
