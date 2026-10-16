import { LayoutTemplate, Loader2, Save } from "lucide-react";

interface Props {
  hasSettings: boolean;
  saving: boolean;
  onSave: () => void;
}

export function BrandingHeader({ hasSettings, saving, onSave }: Props) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#EAE2D5] bg-white p-6 shadow-xs">
      <div className="flex items-center gap-3.5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FAF1EC] text-[#9A1C1F]">
          <LayoutTemplate className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#1E1917]">Logo &amp; chân trang</h1>
          <p className="mt-0.5 text-xs text-[#695D56]">
            Chỉnh sửa cấu hình thương hiệu và nội dung footer.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={saving}
          onClick={onSave}
          className="inline-flex items-center gap-2 rounded-xl bg-[#9A1C1F] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#7D1619] disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Đang lưu..." : hasSettings ? "Lưu tab đang chọn" : "Tạo cấu hình"}
        </button>
      </div>
    </header>
  );
}
