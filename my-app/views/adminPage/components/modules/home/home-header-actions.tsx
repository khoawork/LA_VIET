"use client";

import { Home, Save, RotateCcw, Loader2 } from "lucide-react";

interface HomeHeaderActionsProps {
  saving: boolean;
  onSave: () => void;
  onReset: () => void;
}

export function HomeHeaderActions({
  saving,
  onSave,
  onReset,
}: HomeHeaderActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#f3e9db] shadow-xs">
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-xl bg-[#FAF1EC] text-[#9A1C1F] flex items-center justify-center border border-[#F0DCD6] shadow-xs">
          <Home className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#1E1917]">Quản trị Trang chủ</h1>
          <p className="text-xs text-stone-600 mt-0.5">
            Tùy biến toàn bộ 6 Sections giao diện Trang chủ: Hero, Thống kê, Tiêu điểm, Tin tức, Đối tác &amp; CTA
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 self-start sm:self-auto">
        <button
          type="button"
          onClick={onReset}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#f3e9db] bg-[#FAF8F5] hover:bg-[#ede5d8] text-stone-700 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
        >
          <RotateCcw className="w-4 h-4 text-stone-500" />
          <span>Khôi phục mặc định</span>
        </button>

        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#a21f1f] hover:bg-[#851619] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{saving ? "Đang lưu..." : "Lưu thay đổi"}</span>
        </button>
      </div>
    </div>
  );
}

