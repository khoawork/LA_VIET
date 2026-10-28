"use client";

import { Sparkles, Layers, Image as ImageIcon, Plus, Trash2 } from "lucide-react";
import type { HomeHeroSectionType } from "@/views/homePage/types/pagehome.type";
import { ImagePreview } from "../image-preview";

interface HomeHeroTabProps {
  data: HomeHeroSectionType;
  onChange: (updated: HomeHeroSectionType) => void;
}

export function HomeHeroTab({ data, onChange }: HomeHeroTabProps) {
  const handleCollectionChange = (
    index: number,
    field: "title" | "desc",
    value: string,
  ) => {
    const updatedCollections = [...data.collections];
    updatedCollections[index] = {
      ...updatedCollections[index],
      [field]: value,
    };
    onChange({ ...data, collections: updatedCollections });
  };

  return (
    <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2d3bf] shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#e2d3bf]">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-[#a21f1f]" />
          <div>
            <h2 className="text-base font-bold text-[#1E1917]">
              Biểu ngữ chính (Hero Section)
            </h2>
            <p className="text-xs text-stone-500">
              Khối tiêu điểm đầu trang giới thiệu tuyên ngôn thương hiệu và dải thông tin nổi bật
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          Đang hiển thị
        </span>
      </div>

      <div className="space-y-4">
        {/* Highlight Word */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Từ khóa gạch chân nổi bật
          </label>
          <input
            type="text"
            value={data.highlightWord}
            onChange={(e) => onChange({ ...data, highlightWord: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2d3bf] text-xs font-normal text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
          />
        </div>

        {/* Tiêu đề chính */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Tiêu đề chính Hero
          </label>
          <textarea
            rows={3}
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2d3bf] text-xs font-normal text-[#1E1917] leading-relaxed focus:outline-none focus:border-[#a21f1f]"
          />
        </div>

        {/* Đoạn mô tả */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Mô tả sứ mệnh thương hiệu
          </label>
          <textarea
            rows={3}
            value={data.description}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2d3bf] text-xs text-stone-600 leading-relaxed focus:outline-none focus:border-[#a21f1f]"
          />
        </div>

        {/* Nút hành động */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-[#e2d3bf] bg-[#FAF8F5]/60 space-y-2">
            <span className="text-xs font-bold text-[#a21f1f] block uppercase tracking-wider">
              Nút chính (Primary CTA)
            </span>
            <input
              type="text"
              placeholder="Chữ trên nút..."
              value={data.primaryButton?.text}
              onChange={(e) =>
                onChange({
                  ...data,
                  primaryButton: {
                    ...data.primaryButton,
                    text: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 rounded-lg border border-[#e2d3bf] text-xs font-normal bg-white"
            />
            <input
              type="text"
              placeholder="Liên kết URL..."
              value={data.primaryButton?.href}
              onChange={(e) =>
                onChange({
                  ...data,
                  primaryButton: {
                    ...data.primaryButton,
                    href: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-1.5 rounded-lg border border-[#e2d3bf] text-xs text-stone-500 font-mono bg-white"
            />
          </div>

          <div className="p-4 rounded-xl border border-[#e2d3bf] bg-[#FAF8F5]/60 space-y-2">
            <span className="text-xs font-bold text-stone-700 block uppercase tracking-wider">
              Nút phụ (Secondary CTA)
            </span>
            <input
              type="text"
              placeholder="Chữ trên nút..."
              value={data.secondaryButton?.text}
              onChange={(e) =>
                onChange({
                  ...data,
                  secondaryButton: {
                    ...data.secondaryButton,
                    text: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 rounded-lg border border-[#e2d3bf] text-xs font-normal bg-white"
            />
            <input
              type="text"
              placeholder="Liên kết URL..."
              value={data.secondaryButton?.href}
              onChange={(e) =>
                onChange({
                  ...data,
                  secondaryButton: {
                    ...data.secondaryButton,
                    href: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-1.5 rounded-lg border border-[#e2d3bf] text-xs text-stone-500 font-mono bg-white"
            />
          </div>
        </div>

        {/* Hình ảnh Hero */}
        <div className="p-4 rounded-xl border border-[#e2d3bf] bg-[#FAF8F5]/60 space-y-3">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#a21f1f]" />
            <span className="text-xs font-bold text-[#1E1917]">
              Hình ảnh minh họa Hero
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-semibold text-stone-600">
                Hình ảnh Hero (URL hoặc tải từ máy tính)
              </label>
              <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#a21f1f]/10 text-[#a21f1f] hover:bg-[#a21f1f]/20 text-[11px] font-bold cursor-pointer transition-colors">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Chọn ảnh từ máy</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        const base64 = ev.target?.result as string;
                        if (base64) {
                          onChange({
                            ...data,
                            image: { src: base64 },
                          });
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>
            <input
              type="text"
              value={data.image?.src}
              onChange={(e) =>
                onChange({
                  ...data,
                  image: { src: e.target.value },
                })
              }
              placeholder="https://... hoặc chọn file từ máy"
              className="w-full px-3 py-2 rounded-lg border border-[#e2d3bf] text-xs font-mono bg-white truncate"
            />
            <ImagePreview src={data.image?.src ?? ""} alt="Xem trước ảnh Hero" />
          </div>
        </div>

        {/* Dải thông tin nổi bật */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#a21f1f]" />
              <span className="text-xs font-bold text-[#1E1917]">
                Dải thông tin nổi bật
              </span>
            </div>
            <button
              type="button"
              onClick={() =>
                onChange({
                  ...data,
                  collections: [...data.collections, { title: "", desc: "" }],
                })
              }
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#a21f1f] text-white text-[11px] font-bold hover:bg-[#821B14]"
            >
              <Plus className="w-3.5 h-3.5" />
              Thêm mục
            </button>
          </div>

          {data.collections.length === 0 && (
            <p className="text-xs text-stone-500">
              Chưa có mục nào trong dải thông tin.
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.collections.map((col, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-[#e2d3bf] bg-[#FAF8F5]/60 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#a21f1f]">
                    Vị trí #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      onChange({
                        ...data,
                        collections: data.collections.filter(
                          (_, index) => index !== idx,
                        ),
                      })
                    }
                    aria-label={`Xóa mục vị trí ${idx + 1}`}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#a21f1f] hover:underline"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Xóa
                  </button>
                </div>
                <label className="block space-y-1">
                  <span className="text-[11px] font-semibold text-stone-600">
                    Nhãn phía trên
                  </span>
                  <input
                    type="text"
                    placeholder="Ví dụ: CHẤT LIỆU GỐC"
                    value={col.desc}
                    onChange={(e) =>
                      handleCollectionChange(idx, "desc", e.target.value)
                    }
                    className="w-full px-2.5 py-1.5 rounded-lg border border-[#e2d3bf] text-xs text-stone-600 bg-white"
                  />
                </label>
                <label className="block space-y-1">
                  <span className="text-[11px] font-semibold text-stone-600">
                    Nội dung phía dưới
                  </span>
                  <input
                    type="text"
                    placeholder="Ví dụ: Sơn Ta Phú Thọ"
                    value={col.title}
                    onChange={(e) =>
                      handleCollectionChange(idx, "title", e.target.value)
                    }
                    className="w-full px-2.5 py-1.5 rounded-lg border border-[#e2d3bf] text-xs font-normal bg-white"
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

