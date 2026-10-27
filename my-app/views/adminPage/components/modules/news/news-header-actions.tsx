import {
  Newspaper,
  Save,
  Loader2,
} from "lucide-react";

interface NewsHeaderActionsProps {
  saving: boolean;
  onSave: () => void;
}

export function NewsHeaderActions({
  saving,
  onSave,
}: NewsHeaderActionsProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#EAE2D5] shadow-xs">
      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-[#FAF1EC] text-[#5A0B0E] flex items-center justify-center shrink-0">
          <Newspaper className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#1E1917]">
              Nội dung Trang Tin Tức (CMS)
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FAF1EC] text-[#9A1C1F] border border-[#F0DCD6]">
              SLUG: news
            </span>
          </div>
          <p className="text-xs text-[#695D56] mt-0.5">
            Chỉnh sửa trực quan toàn bộ các khối nội dung, bài viết tiêu điểm, thống kê và cấu hình hiển thị
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#9A1C1F] hover:bg-[#7D1619] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer disabled:opacity-50"
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

