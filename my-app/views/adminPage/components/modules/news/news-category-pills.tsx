"use client";

import { Tag, Plus } from "lucide-react";
import type { NewsCategoryData } from "./news-categories-management";

interface NewsCategoryPillsProps {
  categories: NewsCategoryData[];
  selectedCategoryId: string;
  totalArticlesCount: number;
  onSelectCategory: (categoryId: string) => void;
  onOpenCreateCategory: () => void;
}

export function NewsCategoryPills({
  categories,
  selectedCategoryId,
  totalArticlesCount,
  onSelectCategory,
  onOpenCreateCategory,
}: NewsCategoryPillsProps) {
  return (
    <div className="bg-white p-3.5 rounded-2xl border border-[#f3e9db] shadow-xs">
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 scrollbar-thin">
        <div className="flex items-center gap-2 min-w-max">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider pl-1 pr-2">
            Chuyên mục:
          </span>

          {/* Pill: Tất cả */}
          <button
            type="button"
            onClick={() => onSelectCategory("")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategoryId === ""
                ? "bg-[#a21f1f] text-white shadow-xs"
                : "bg-[#f7f5f1] text-stone-700 hover:bg-[#ede5d8]"
            }`}
          >
            <span>Tất cả</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                selectedCategoryId === ""
                  ? "bg-white/20 text-white"
                  : "bg-stone-200 text-stone-700"
              }`}
            >
              {totalArticlesCount}
            </span>
          </button>

          {/* Các Pills danh mục động */}
          {categories.map((c) => {
            const isSelected = selectedCategoryId === String(c.id);
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onSelectCategory(isSelected ? "" : String(c.id))}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#a21f1f] text-white shadow-xs"
                    : "bg-[#f7f5f1] text-stone-700 hover:bg-[#ede5d8]"
                }`}
              >
                <Tag className="w-3.5 h-3.5 opacity-70" />
                <span>{c.name}</span>
                {c._count?.news !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-stone-200 text-stone-700"
                    }`}
                  >
                    {c._count.news}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onOpenCreateCategory}
          className="text-xs font-bold text-[#a21f1f] hover:text-[#851619] inline-flex items-center gap-1 min-w-max cursor-pointer px-2"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Thêm chuyên mục</span>
        </button>
      </div>
    </div>
  );
}

