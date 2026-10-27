"use client";

import {
  Search,
  Loader2,
  Newspaper,
  Plus,
  Calendar,
  ExternalLink,
  Trash2,
} from "lucide-react";
import type { NewsItemData } from "./news-articles-management";
import type { NewsCategoryData } from "./news-categories-management";

interface NewsArticlesTableProps {
  newsList: NewsItemData[];
  categories: NewsCategoryData[];
  loading: boolean;
  searchKeyword: string;
  selectedCategoryId: string;
  onSearchChange: (keyword: string) => void;
  onCategoryFilterChange: (catId: string) => void;
  onDeleteNews: (id: number, title: string) => void;
  onOpenCreateNews: () => void;
}

export function NewsArticlesTable({
  newsList,
  categories,
  loading,
  searchKeyword,
  selectedCategoryId,
  onSearchChange,
  onCategoryFilterChange,
  onDeleteNews,
  onOpenCreateNews,
}: NewsArticlesTableProps) {
  return (
    <div className="space-y-4">
      {/* Thanh tìm kiếm & Dropdown lọc */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm kiếm bài viết theo tiêu đề, tác giả, mô tả tóm tắt..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#f3e9db] text-xs font-normal text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
          />
        </div>

        <select
          value={selectedCategoryId}
          onChange={(e) => onCategoryFilterChange(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-white border border-[#f3e9db] text-xs font-normal text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
        >
          <option value="">Tất cả chuyên mục</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c._count?.news ?? 0} bài)
            </option>
          ))}
        </select>
      </div>

      {/* Bảng danh sách bài viết tin tức */}
      <div className="bg-white rounded-2xl border border-[#f3e9db] shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs font-semibold text-stone-500 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-[#a21f1f]" />
            <span>Đang tải danh sách bài viết tin tức...</span>
          </div>
        ) : newsList.length === 0 ? (
          <div className="py-20 text-center text-xs text-stone-500 flex flex-col items-center justify-center gap-3">
            <Newspaper className="w-8 h-8 text-stone-300" />
            <p>Không tìm thấy bài viết nào phù hợp.</p>
            <button
              type="button"
              onClick={onOpenCreateNews}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#a21f1f] text-white text-xs font-bold cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tạo bài viết mới</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#f7f5f1] border-b border-[#f3e9db] text-stone-700 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-5">Bài viết</th>
                  <th className="py-3.5 px-4">Chuyên mục</th>
                  <th className="py-3.5 px-4">Tác giả / Ban chủ trì</th>
                  <th className="py-3.5 px-4">Ngày xuất bản</th>
                  <th className="py-3.5 px-5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3e9db] font-medium text-[#1E1917]">
                {newsList.map((item) => (
                  <tr key={item.id} className="hover:bg-[#f7f5f1]/50 transition-colors">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-11 object-cover rounded-xl border border-[#f3e9db] shrink-0 shadow-2xs"
                        />
                        <div className="min-w-0 max-w-md">
                          <span className="font-bold text-[#1E1917] block truncate text-xs hover:text-[#a21f1f] transition-colors">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-stone-400 font-mono block truncate mt-0.5">
                            /{item.slug}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF1EC] text-[#9A1C1F] border border-[#F0DCD6]">
                        {item.category?.name || `Chuyên mục #${item.categoryId}`}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-stone-600 font-semibold">
                      {item.preside || "Là Việt"}
                    </td>
                    <td className="py-4 px-4 text-stone-500 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        <span>{new Date(item.date).toLocaleDateString("vi-VN")}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <a
                          href={`/news`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                          title="Xem trên trang tin tức"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          type="button"
                          onClick={() => onDeleteNews(item.id, item.name)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Xóa bài viết"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

