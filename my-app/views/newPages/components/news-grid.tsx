"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { NewsItem } from "../types/news.type";
import { NewsFilters, type FilterCategoryItem } from "./news-filters";
import { NewsCard } from "./news-card";

export function NewsGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string | number>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categories, setCategories] = useState<FilterCategoryItem[]>([
    { id: "all", label: "TẤT CẢ BẢN TIN" },
  ]);
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);

  // 1. Tải danh mục chuyên mục động từ API
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/news/cates");
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const dynamicCats: FilterCategoryItem[] = [
            { id: "all", label: "TẤT CẢ BẢN TIN" },
            ...json.data.map((c: { id: number; name: string }) => ({
              id: c.id,
              label: c.name.toUpperCase(),
            })),
          ];
          setCategories(dynamicCats);
        }
      } catch (err) {
        console.error("Lỗi tải danh mục tin tức:", err);
      }
    }
    loadCategories();
  }, []);

  // 2. Tải danh sách bài viết từ database qua API
  useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true);
        let url = `/api/news?page=${currentPage}&limit=6`;
        if (selectedCategory && selectedCategory !== "all") {
          url += `&categoryId=${selectedCategory}`;
        }
        const res = await fetch(url);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const mapped: NewsItem[] = json.data.map((item: any) => ({
            id: String(item.id),
            title: item.name,
            slug: item.slug,
            category: String(item.categoryId),
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
  }, [currentPage, selectedCategory]);

  return (
    <section className="mb-14 sm:mb-16">
      {/* Category Filter Tabs */}
      <NewsFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setCurrentPage(1);
        }}
      />

      {/* Grid Header: Eyebrow + Title + Sort Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#9A1C1F] uppercase block mb-1">
            DÒNG SỰ KIỆN &amp; HỒ SƠ KỸ THUẬT
          </span>
          <h2 className="font-bold text-xl sm:text-2xl text-[#1E1917] tracking-tight uppercase">
            CÁC BÀI VIẾT VÀ BÁO CÁO MỚI NHẤT
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#695D56] self-start sm:self-auto">
          <span>Sắp xếp theo:</span>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 font-bold text-[#9A1C1F] bg-[#FAF3E8] px-3 py-1.5 rounded-lg border border-[#EFE2D0] cursor-pointer"
          >
            <span>Mới nhất</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
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
        <div className="mt-12 flex items-center justify-center gap-2 text-xs font-semibold">
          {/* Prev Button */}
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-9 h-9 rounded-lg bg-[#EFE8DC] text-[#423A35] hover:bg-[#E5DDCF] disabled:opacity-40 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Trang trước"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-lg transition-colors cursor-pointer ${
                currentPage === page
                  ? "bg-[#9A1C1F] text-white shadow-sm"
                  : "bg-[#EFE8DC] text-[#423A35] hover:bg-[#E5DDCF]"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-9 h-9 rounded-lg bg-[#EFE8DC] text-[#423A35] hover:bg-[#E5DDCF] disabled:opacity-40 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Trang sau"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}
