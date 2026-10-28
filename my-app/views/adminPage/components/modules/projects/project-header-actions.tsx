import { FolderKanban, Loader2, Save } from "lucide-react";

interface Props {
  saving: boolean;
  onSave: () => void;
}

export function ProjectHeaderActions({ saving, onSave }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#d9c7ae] bg-white p-6 shadow-xs">
      <div className="flex items-center gap-3.5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FAF1EC] text-[#5A0B0E]">
          <FolderKanban className="h-5 w-5" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-bold text-[#1E1917]">
              Nội dung trang Dự án
            </h2>
          </div>
          <p className="mt-0.5 text-xs text-[#695D56]">
            Chỉnh từng section của trang Dự án bằng biểu mẫu.
          </p>
        </div>
      </div>
      <button
        type="button"
        disabled={saving}
        onClick={onSave}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#a21f1f] hover:bg-[#851619] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
        {saving ? "Đang lưu..." : "Lưu thay đổi"}
      </button>
    </div>
  );
}
