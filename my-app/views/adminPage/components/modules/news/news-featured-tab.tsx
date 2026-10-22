import { ImagePlus, Plus, Trash2 } from "lucide-react";
import type { NewsFeaturedSectionType } from "@/views/newPages/types/pagenew.type";

interface NewsFeaturedTabProps {
  data: NewsFeaturedSectionType;
  onChange: (data: NewsFeaturedSectionType) => void;
}

export function NewsFeaturedTab({ data, onChange }: NewsFeaturedTabProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-[#EAE2D5] shadow-xs space-y-6">
      <div className="border-b border-[#EAE2D5] pb-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#9A1C1F]">
          Section 2: Bài viết Tiêu điểm Nghiên cứu (Spotlight)
        </h2>
        <p className="text-xs text-[#695D56] mt-1">
          Khối banner lớn nổi bật dành riêng cho công trình chuyên luận hoặc nghiên cứu quan trọng nhất
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-[#1E1917]">
            Tiêu đề bài viết tiêu điểm
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] text-xs font-semibold text-[#1E1917] focus:outline-none focus:border-[#9A1C1F]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Huy hiệu đỏ (Badge)
          </label>
          <input
            type="text"
            value={data.specialBadge}
            onChange={(e) => onChange({ ...data, specialBadge: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl border border-[#EAE2D5] text-xs text-[#1E1917]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Số kỳ phát hành
          </label>
          <input
            type="text"
            value={data.issueNumber}
            onChange={(e) => onChange({ ...data, issueNumber: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl border border-[#EAE2D5] text-xs text-[#1E1917]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Huy hiệu kiểm định viện vật liệu
          </label>
          <input
            type="text"
            value={data.verifiedBadge}
            onChange={(e) => onChange({ ...data, verifiedBadge: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl border border-[#EAE2D5] text-xs text-[#1E1917]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Tác giả / Ban nghiên cứu
          </label>
          <input
            type="text"
            value={data.author}
            onChange={(e) => onChange({ ...data, author: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl border border-[#EAE2D5] text-xs text-[#1E1917]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Ngày xuất bản
          </label>
          <input
            type="text"
            value={data.publishedDate}
            onChange={(e) => onChange({ ...data, publishedDate: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl border border-[#EAE2D5] text-xs text-[#1E1917]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Thời gian đọc
          </label>
          <input
            type="text"
            value={data.readTime}
            onChange={(e) => onChange({ ...data, readTime: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl border border-[#EAE2D5] text-xs text-[#1E1917]"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <label className="text-xs font-bold text-[#1E1917]">
              Hình ảnh bìa bài viết tiêu điểm
            </label>
            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#9A1C1F]/10 text-[#9A1C1F] hover:bg-[#9A1C1F]/20 text-xs font-bold cursor-pointer transition-colors">
              <ImagePlus className="w-4 h-4" />
              Chọn ảnh từ máy
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => {
                    if (typeof reader.result === "string") {
                      onChange({ ...data, imageUrl: reader.result });
                    }
                  };
                  reader.readAsDataURL(file);
                  e.target.value = "";
                }}
              />
            </label>
          </div>
          <input
            type="text"
            value={data.imageUrl}
            onChange={(e) => onChange({ ...data, imageUrl: e.target.value })}
            placeholder="https://... hoặc chọn ảnh từ máy"
            aria-label="URL hình ảnh bìa bài viết tiêu điểm"
            className="w-full px-3.5 py-2 rounded-xl border border-[#EAE2D5] text-xs text-[#1E1917]"
          />
          {data.imageUrl.trim() && (
            // URL đang được nhập có thể chưa hoàn chỉnh; ảnh xem trước không cần bộ tối ưu Next.js.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.imageUrl.trim()}
              alt="Xem trước ảnh bìa bài viết tiêu điểm"
              className="w-full max-w-xs aspect-video object-cover rounded-lg border border-[#EAE2D5]"
            />
          )}
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-[#1E1917]">
            Tóm tắt nội dung bài viết tiêu điểm
          </label>
          <textarea
            rows={3}
            value={data.description}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] text-xs text-[#5C544E] leading-relaxed"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Đường dẫn liên kết (Slug)
          </label>
          <input
            type="text"
            value={data.slug}
            onChange={(e) => onChange({ ...data, slug: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl border border-[#EAE2D5] text-xs text-[#1E1917]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Chữ hiển thị trên nút đọc
          </label>
          <input
            type="text"
            value={data.buttonText}
            onChange={(e) => onChange({ ...data, buttonText: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl border border-[#EAE2D5] text-xs text-[#1E1917]"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-[#EAE2D5]">
        <div className="flex items-center justify-between gap-3 mb-3">
          <h3 className="text-xs font-bold uppercase text-[#1E1917]">
            Ô chỉ số kỹ thuật ({data.highlightStats.length})
          </h3>
          <button
            type="button"
            onClick={() => onChange({
              ...data,
              highlightStats: [
                ...data.highlightStats,
                { label: "", value: "", accentColor: "text-[#9A1C1F]" },
              ],
            })}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#9A1C1F] hover:bg-[#851619] text-white text-xs font-bold transition-colors"
          >
            <Plus className="w-4 h-4" />
            Thêm ô
          </button>
        </div>
        {data.highlightStats.length === 0 && (
          <p className="text-xs text-[#695D56] mb-3">Chưa có ô chỉ số kỹ thuật nào.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.highlightStats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-[#EAE2D5] bg-[#FAF8F5] space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-[#9A1C1F]">
                  Vị trí #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => onChange({
                    ...data,
                    highlightStats: data.highlightStats.filter((_, index) => index !== idx),
                  })}
                  aria-label={`Xóa ô chỉ số kỹ thuật vị trí ${idx + 1}`}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#9A1C1F] hover:underline"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Xóa
                </button>
              </div>
              <label className="text-[11px] font-bold text-[#695D56] block">
                Nhãn chỉ số #{idx + 1}
              </label>
              <input
                type="text"
                value={stat.label}
                onChange={(e) => {
                  const newStats = [...data.highlightStats];
                  newStats[idx] = { ...newStats[idx], label: e.target.value };
                  onChange({ ...data, highlightStats: newStats });
                }}
                className="w-full px-3 py-1.5 rounded-lg border border-[#EAE2D5] text-xs font-semibold bg-white"
              />
              <label className="text-[11px] font-bold text-[#695D56] block">
                Giá trị kết quả
              </label>
              <input
                type="text"
                value={stat.value}
                onChange={(e) => {
                  const newStats = [...data.highlightStats];
                  newStats[idx] = { ...newStats[idx], value: e.target.value };
                  onChange({ ...data, highlightStats: newStats });
                }}
                className="w-full px-3 py-1.5 rounded-lg border border-[#EAE2D5] text-xs font-bold text-[#9A1C1F] bg-white"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

