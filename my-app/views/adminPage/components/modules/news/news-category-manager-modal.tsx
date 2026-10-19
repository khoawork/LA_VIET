"use client";

import { Tag, Plus, Edit, Trash2, X } from "lucide-react";
import type { NewsCategoryData } from "./news-categories-management";

interface NewsCategoryManagerModalProps {
  isOpen: boolean;
  categories: NewsCategoryData[];
  onClose: () => void;
  onOpenCreateCategory: () => void;
  onOpenEditCategory: (cat: NewsCategoryData) => void;
  onDeleteCategory: (id: number, name: string) => void;
}

export function NewsCategoryManagerModal({
  isOpen,
  categories,
  onClose,
  onOpenCreateCategory,
  onOpenEditCategory,
  onDeleteCategory,
}: NewsCategoryManagerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#EAE2D5] overflow-hidden flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between p-5 border-b border-[#EAE2D5] bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <Tag className="w-5 h-5 text-[#9A1C1F]" />
            <div>
              <h3 className="font-bold text-sm text-[#1E1917] uppercase tracking-wide">
                Quản lý danh sách chuyên mục
              </h3>
              <p className="text-[11px] text-stone-500">
                Tổng cộng có {categories.length} chuyên mục phân loại bài viết
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-700">
              Danh sách chuyên mục đang hoạt động
            </span>
            <button
              type="button"
              onClick={onOpenCreateCategory}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#a21f1f] text-white text-xs font-bold cursor-pointer hover:bg-[#851619] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm chuyên mục mới</span>
            </button>
          </div>

          <div className="border border-[#f3e9db] rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#f7f5f1] border-b border-[#f3e9db] text-stone-700 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Mã</th>
                  <th className="py-3 px-4">Tên chuyên mục</th>
                  <th className="py-3 px-4 text-center">Số bài viết</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3e9db]">
                {categories.map((c) => (
                  <tr key={c.id} className="hover:bg-[#f7f5f1]/50">
                    <td className="py-3 px-4 text-stone-400 font-mono">#{c.id}</td>
                    <td className="py-3 px-4 font-bold text-[#1E1917]">{c.name}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF1EC] text-[#9A1C1F]">
                        {c._count?.news ?? 0} bài
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onOpenEditCategory(c)}
                          className="p-1 rounded-md text-stone-500 hover:text-[#a21f1f] hover:bg-stone-100 cursor-pointer"
                          title="Chỉnh sửa tên chuyên mục"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteCategory(c.id, c.name)}
                          className="p-1 rounded-md text-stone-400 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                          title="Xóa chuyên mục"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-4 border-t border-[#EAE2D5] bg-[#FAF8F5] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-200 text-stone-800 text-xs font-bold hover:bg-stone-300 cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

