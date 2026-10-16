"use client";

import { Edit, Loader2, CheckCircle2, X, AlertCircle } from "lucide-react";
import type { NewsCategoryData } from "./news-categories-management";

interface NewsEditCategoryModalProps {
  isOpen: boolean;
  category: NewsCategoryData | null;
  submitting: boolean;
  error: string | null;
  onClose: () => void;
  onChangeName: (name: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function NewsEditCategoryModal({
  isOpen,
  category,
  submitting,
  error,
  onClose,
  onChangeName,
  onSubmit,
}: NewsEditCategoryModalProps) {
  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#EAE2D5] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-[#EAE2D5] bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <Edit className="w-5 h-5 text-[#a21f1f]" />
            <h3 className="font-bold text-sm text-[#1E1917] uppercase tracking-wide">
              Chỉnh sửa chuyên mục #{category.id}
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

        <form onSubmit={onSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 text-rose-800 text-xs font-semibold flex items-center gap-2 border border-rose-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1E1917]">
              Tên chuyên mục <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={category.name}
              onChange={(e) => onChangeName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] text-xs font-semibold text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
              autoFocus
            />
          </div>

          <div className="pt-4 border-t border-[#EAE2D5] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#EAE2D5] text-xs font-bold text-stone-600 hover:bg-stone-50 cursor-pointer"
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
                <CheckCircle2 className="w-4 h-4" />
              )}
              <span>{submitting ? "Đang lưu..." : "Lưu thay đổi"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

