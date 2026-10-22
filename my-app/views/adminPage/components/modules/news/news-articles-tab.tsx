"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import type { NewsArticlesSectionType } from "@/views/newPages/types/pagenew.type";

interface NewsArticlesTabProps {
  data: NewsArticlesSectionType;
  onChange: (data: NewsArticlesSectionType) => void;
}

export function NewsArticlesTab({ data, onChange }: NewsArticlesTabProps) {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    async function loadCategories() {
      try {
        const response = await fetch("/api/news/cates", { signal: controller.signal });
        const result = await response.json();
        if (response.ok && result.success && Array.isArray(result.data) && !controller.signal.aborted) {
          setCategories(result.data);
        }
      } catch {
        // Bộ lọc vẫn hiển thị các ID đã lưu khi danh mục tạm thời không tải được.
      }
    }
    loadCategories();
    return () => controller.abort();
  }, []);

  const updateGroup = (index: number, changes: Partial<NewsArticlesSectionType["filterGroups"][number]>) => {
    onChange({
      ...data,
      filterGroups: data.filterGroups.map((group, groupIndex) =>
        groupIndex === index ? { ...group, ...changes } : group,
      ),
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-[#EAE2D5] shadow-xs space-y-6">
      <div className="border-b border-[#EAE2D5] pb-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#9A1C1F]">
          Section 3: Cấu hình Lưới Bài viết &amp; Bộ lọc
        </h2>
        <p className="text-xs text-[#695D56] mt-1">
          Tùy chỉnh tiêu đề và các nhóm lọc theo danh mục tin tức
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Dòng Eyebrow phía trên tiêu đề
          </label>
          <input
            type="text"
            value={data.eyebrow}
            onChange={(e) => onChange({ ...data, eyebrow: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] text-xs text-[#9A1C1F] font-bold"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Tiêu đề khu vực bài viết mới nhất
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] text-xs font-bold text-[#1E1917]"
          />
        </div>

      </div>

      <div className="space-y-4 border-t border-[#EAE2D5] pt-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xs font-bold uppercase text-[#1E1917]">
            Nhóm lọc bài viết ({data.filterGroups.length})
          </h3>
          <button
            type="button"
            onClick={() => onChange({
              ...data,
              filterGroups: [...data.filterGroups, { name: "", categories: [] }],
            })}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#EAE2D5] px-3 py-2 text-xs font-bold text-[#9A1C1F] transition-colors hover:bg-[#FAF1EC]"
          >
            <Plus className="h-4 w-4" /> Thêm nhóm lọc
          </button>
        </div>

        {data.filterGroups.map((group, index) => {
          const selectedNames = categories
            .filter((category) => group.categories.includes(category.id))
            .map((category) => category.name);
          const summary = group.categories.length === 0
            ? "Tất cả danh mục"
            : selectedNames.length > 0
              ? selectedNames.join(", ")
              : `${group.categories.length} danh mục đã chọn`;

          return (
            <div key={index} className="rounded-xl border border-[#EAE2D5] bg-[#FAF8F5] p-4">
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-[#9A1C1F]">Vị trí #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => onChange({
                    ...data,
                    filterGroups: data.filterGroups.filter((_, groupIndex) => groupIndex !== index),
                  })}
                  aria-label={`Xóa nhóm lọc vị trí ${index + 1}`}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#9A1C1F] hover:underline"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Xóa
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-1.5 text-xs font-bold text-[#1E1917]">
                  <span>Tên hiển thị</span>
                  <input
                    type="text"
                    value={group.name}
                    onChange={(event) => updateGroup(index, { name: event.target.value })}
                    placeholder="Ví dụ: Nghiên cứu & Kỹ thuật"
                    className="w-full rounded-xl border border-[#EAE2D5] bg-white px-3.5 py-2.5 font-normal focus:border-[#9A1C1F] focus:outline-none"
                  />
                </label>
                <div className="text-xs font-bold text-[#1E1917]">
                  <span>Danh mục áp dụng</span>
                  <details className="relative mt-1.5 group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-xl border border-[#EAE2D5] bg-white px-3.5 py-2.5 font-normal hover:border-[#9A1C1F]/40 hover:bg-[#FAF8F5]">
                      <span className="min-w-0 truncate">{summary}</span>
                      <ChevronDown className="h-4 w-4 shrink-0 text-[#695D56] transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="absolute left-0 top-full z-20 mt-2 max-h-56 w-full overflow-y-auto rounded-xl border border-[#EAE2D5] bg-white p-2 shadow-lg">
                      <button
                        type="button"
                        onClick={() => updateGroup(index, { categories: [] })}
                        className="w-full rounded-lg px-2.5 py-2 text-left font-normal hover:bg-[#FAF1EC]"
                      >
                        Tất cả danh mục
                      </button>
                      {categories.map((category) => (
                        <label key={category.id} className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 font-normal hover:bg-[#FAF8F5]">
                          <input
                            type="checkbox"
                            checked={group.categories.includes(category.id)}
                            onChange={(event) => updateGroup(index, {
                              categories: event.target.checked
                                ? [...group.categories, category.id]
                                : group.categories.filter((id) => id !== category.id),
                            })}
                            className="accent-[#9A1C1F]"
                          />
                          <span>{category.name}</span>
                        </label>
                      ))}
                      {categories.length === 0 && (
                        <p className="px-2.5 py-2 font-normal text-[#695D56]">Chưa có chuyên mục tin tức.</p>
                      )}
                    </div>
                  </details>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

