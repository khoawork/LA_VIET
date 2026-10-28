"use client";

import { Newspaper, Settings2, Plus } from "lucide-react";

interface NewsCategoryHeaderProps {
  articlesCount: number;
  categoriesCount: number;
  onOpenCategoryManager: () => void;
  onOpenCreateCategory: () => void;
  onOpenCreateNews: () => void;
}

export function NewsCategoryHeader({
  articlesCount,
  categoriesCount,
  onOpenCategoryManager,
  onOpenCreateCategory,
  onOpenCreateNews,
}: NewsCategoryHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#e2d3bf] shadow-xs">
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-xl bg-[#FAF1EC] text-[#9A1C1F] flex items-center justify-center border border-[#e4c4b9] shadow-xs">
          <Newspaper className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold text-[#1E1917]">Bài viết tin tức</h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF1EC] text-[#9A1C1F] border border-[#e4c4b9]">
              {articlesCount} bài viết
            </span>
          </div>
          <p className="text-xs text-stone-600 mt-0.5">
            Quản lý toàn bộ bài viết nghiên cứu di sản sơn mài, tác giả và chuyên mục phân loại
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
        <button
          type="button"
          onClick={onOpenCategoryManager}
          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#f7f5f1] hover:bg-[#ede5d8] text-stone-800 border border-[#e2d3bf] text-xs font-bold transition-all cursor-pointer shadow-xs"
          title="Xem danh sách và quản lý các chuyên mục bài viết"
        >
          <Settings2 className="w-4 h-4 text-[#9A1C1F]" />
          <span>Quản lý chuyên mục ({categoriesCount})</span>
        </button>

        <button
          type="button"
          onClick={onOpenCreateCategory}
          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#FAF1EC] hover:bg-[#F0DCD6] text-[#9A1C1F] border border-[#e4c4b9] text-xs font-bold transition-all cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm chuyên mục</span>
        </button>

        <button
          type="button"
          onClick={onOpenCreateNews}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#a21f1f] hover:bg-[#851619] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo bài viết mới</span>
        </button>
      </div>
    </div>
  );
}

