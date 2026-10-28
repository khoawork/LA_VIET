"use client";

import { Newspaper, Loader2, Plus, X, AlertCircle } from "lucide-react";
import type { NewsCategoryData } from "./news-categories-management";
import { ImageUrlUploadField } from "../image-url-upload-field";

interface NewsCreateArticleModalProps {
  isOpen: boolean;
  categories: NewsCategoryData[];
  formData: {
    name: string;
    image: string;
    categoryId: number;
    preside: string;
    presideIcon: string;
    date: string;
    description: string;
    button: string;
    reading: string;
  };
  submitting: boolean;
  error: string | null;
  onClose: () => void;
  onChange: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function NewsCreateArticleModal({
  isOpen,
  categories,
  formData,
  submitting,
  error,
  onClose,
  onChange,
  onSubmit,
}: NewsCreateArticleModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#d9c7ae] overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-5 border-b border-[#d9c7ae] bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <Newspaper className="w-5 h-5 text-[#9A1C1F]" />
            <h3 className="font-bold text-sm text-[#1E1917] uppercase tracking-wide">
              Tạo bài viết tin tức mới
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4 overflow-y-auto">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 text-rose-800 text-xs font-semibold flex items-center gap-2 border border-rose-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1E1917]">
              Tiêu đề bài viết <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ví dụ: Kỹ thuật dát vàng quỳ trên tranh sơn mài..."
              value={formData.name}
              onChange={(e) => onChange({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#d9c7ae] text-xs font-normal text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1E1917]">
                Chuyên mục <span className="text-red-600">*</span>
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) =>
                  onChange({ ...formData, categoryId: Number(e.target.value) })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#d9c7ae] text-xs font-normal text-[#1E1917] bg-white focus:outline-none focus:border-[#a21f1f]"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1E1917]">
                Tác giả / Ban chủ trì
              </label>
              <input
                type="text"
                value={formData.preside}
                onChange={(e) => onChange({ ...formData, preside: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#d9c7ae] text-xs text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1E1917]">Ngày xuất bản</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => onChange({ ...formData, date: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#d9c7ae] text-xs text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1E1917]">Thời gian đọc</label>
              <input
                type="text"
                value={formData.reading}
                onChange={(e) => onChange({ ...formData, reading: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#d9c7ae] text-xs text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
              />
            </div>
          </div>

          <ImageUrlUploadField
            label="Hình ảnh bài viết"
            value={formData.image}
            onChange={(image) => onChange({ ...formData, image })}
          />

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1E1917]">
              Mô tả tóm tắt nội dung <span className="text-red-600">*</span>
            </label>
            <textarea
              rows={4}
              required
              placeholder="Nhập đoạn trích tóm tắt bài viết..."
              value={formData.description}
              onChange={(e) => onChange({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#d9c7ae] text-xs text-[#5C544E] leading-relaxed focus:outline-none focus:border-[#a21f1f]"
            />
          </div>

          <div className="pt-4 border-t border-[#d9c7ae] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#d9c7ae] text-xs font-bold text-stone-600 hover:bg-stone-50 cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#a21f1f] hover:bg-[#851619] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              <span>{submitting ? "Đang lưu..." : "Xác nhận tạo bài viết"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

