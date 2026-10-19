"use client";

import { Newspaper } from "lucide-react";
import type { HomeNewsSectionType } from "@/views/homePage/types/pagehome.type";

interface HomeNewsTabProps {
  data: HomeNewsSectionType;
  onChange: (updated: HomeNewsSectionType) => void;
}

export function HomeNewsTab({ data, onChange }: HomeNewsTabProps) {
  const handleArticleChange = (
    index: number,
    field: "title" | "desc" | "tag" | "date" | "img",
    val: string,
  ) => {
    const updated = [...data.articles];
    updated[index] = { ...updated[index], [field]: val };
    onChange({ ...data, articles: updated });
  };

  return (
    <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#f3e9db] shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#f3e9db]">
        <div className="flex items-center gap-2.5">
          <Newspaper className="w-5 h-5 text-[#a21f1f]" />
          <div>
            <h2 className="text-base font-bold text-[#1E1917]">
              Khối Tin tức nổi bật trên Trang chủ
            </h2>
            <p className="text-xs text-stone-500">
              Cấu hình 3 bài viết tiêu biểu hiển thị trên trang chủ
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1E1917]">
              Dòng tiêu đề phụ (Tagline)
            </label>
            <input
              type="text"
              value={data.tagline}
              onChange={(e) => onChange({ ...data, tagline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#f3e9db] text-xs font-medium text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1E1917]">
              Tiêu đề chính
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => onChange({ ...data, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#f3e9db] text-xs font-bold text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1E1917]">
              Chữ liên kết xem tất cả
            </label>
            <input
              type="text"
              value={data.link?.text}
              onChange={(e) =>
                onChange({
                  ...data,
                  link: { ...data.link, text: e.target.value },
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#f3e9db] text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1E1917]">
              Đường dẫn liên kết (URL)
            </label>
            <input
              type="text"
              value={data.link?.href}
              onChange={(e) =>
                onChange({
                  ...data,
                  link: { ...data.link, href: e.target.value },
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#f3e9db] text-xs font-mono"
            />
          </div>
        </div>

        {/* 3 Bài viết */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold text-[#1E1917] block">
            3 Bài viết hiển thị nổi bật
          </span>

          <div className="space-y-3">
            {data.articles?.map((art, idx) => (
              <div
                key={art.id || idx}
                className="p-4 rounded-xl border border-[#f3e9db] bg-[#FAF8F5]/60 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#a21f1f]">
                    Bài viết #{idx + 1}
                  </span>
                  <input
                    type="text"
                    placeholder="Chuyên mục tag..."
                    value={art.tag}
                    onChange={(e) =>
                      handleArticleChange(idx, "tag", e.target.value)
                    }
                    className="w-48 px-2 py-1 rounded border border-[#f3e9db] text-[10px] font-bold bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Tiêu đề bài viết..."
                    value={art.title}
                    onChange={(e) =>
                      handleArticleChange(idx, "title", e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[#f3e9db] text-xs font-bold bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Ngày hiển thị (ví dụ: 12 Tháng 10, 2026)..."
                    value={art.date}
                    onChange={(e) =>
                      handleArticleChange(idx, "date", e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[#f3e9db] text-xs bg-white"
                  />
                </div>

                <input
                  type="text"
                  placeholder="URL Hình ảnh..."
                  value={art.img}
                  onChange={(e) =>
                    handleArticleChange(idx, "img", e.target.value)
                  }
                  className="w-full px-3 py-1.5 rounded-lg border border-[#f3e9db] text-xs font-mono bg-white"
                />

                <textarea
                  rows={2}
                  placeholder="Mô tả tóm tắt..."
                  value={art.desc}
                  onChange={(e) =>
                    handleArticleChange(idx, "desc", e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#f3e9db] text-xs text-stone-600 bg-white"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

