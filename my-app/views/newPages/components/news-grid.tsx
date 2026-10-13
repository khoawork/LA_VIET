"use client";

import { useState } from "react";
import { NewsCategory } from "../types/news.type";
import { NEWS_ARTICLES } from "../services/news.services";
import { NewsFilters } from "./news-filters";
import { NewsCard } from "./news-card";

export function NewsGrid() {
  const [selectedCategory, setSelectedCategory] =
    useState<NewsCategory>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredArticles =
    selectedCategory === "all"
      ? NEWS_ARTICLES
      : NEWS_ARTICLES.filter((a) => a.category === selectedCategory);

  return (
    <section className="mb-20">
      {/* Category Filter Tabs */}
      <NewsFilters
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
          <span className="font-bold text-[#9A1C1F] bg-[#FAF3E8] px-3 py-1.5 rounded-lg border border-[#EFE2D0] cursor-pointer">
            Mới nhất ▾
          </span>
        </div>
      </div>

      {/* 6 Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredArticles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#EAE2D5] text-[#695D56]">
          <p className="text-sm">Hiện chưa có bài viết nào trong chuyên mục này.</p>
        </div>
      )}

      {/* Pagination Bar */}
      <div className="mt-12 flex items-center justify-center gap-2 text-xs font-semibold">
        {/* Prev Button */}
        <button
          type="button"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="w-9 h-9 rounded-lg bg-[#EFE8DC] text-[#423A35] hover:bg-[#E5DDCF] disabled:opacity-40 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Trang trước"
        >
          ‹
        </button>

        {/* Page numbers */}
        {[1, 2, 3].map((page) => (
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

        <span className="w-8 text-center text-[#695D56]">...</span>

        <button
          type="button"
          onClick={() => setCurrentPage(8)}
          className={`w-9 h-9 rounded-lg transition-colors cursor-pointer ${
            currentPage === 8
              ? "bg-[#9A1C1F] text-white shadow-sm"
              : "bg-[#EFE8DC] text-[#423A35] hover:bg-[#E5DDCF]"
          }`}
        >
          8
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => setCurrentPage((p) => Math.min(8, p + 1))}
          disabled={currentPage === 8}
          className="w-9 h-9 rounded-lg bg-[#EFE8DC] text-[#423A35] hover:bg-[#E5DDCF] disabled:opacity-40 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Trang sau"
        >
          ›
        </button>
      </div>
    </section>
  );
}

