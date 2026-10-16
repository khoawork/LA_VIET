import type { NewsArticlesSectionType } from "@/views/newPages/types/pagenew.type";

interface NewsArticlesTabProps {
  data: NewsArticlesSectionType;
  onChange: (data: NewsArticlesSectionType) => void;
}

export function NewsArticlesTab({ data, onChange }: NewsArticlesTabProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-[#EAE2D5] shadow-xs space-y-6">
      <div className="border-b border-[#EAE2D5] pb-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#9A1C1F]">
          Section 3: Cấu hình Lưới Bài viết &amp; Bộ lọc
        </h2>
        <p className="text-xs text-[#695D56] mt-1">
          Tùy chỉnh tiêu đề khu vực danh sách bài viết mới nhất và phân trang
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Dòng Eyebrow phía trên tiêu đề
          </label>
          <input
            type="text"
            value={data.eyebrow}
            onChange={(e) => onChange({ ...data, eyebrow: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] text-xs text-[#9A1C1F] font-bold"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Tiêu đề khu vực bài viết mới nhất
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] text-xs font-bold text-[#1E1917]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Nhãn sắp xếp
          </label>
          <input
            type="text"
            value={data.sortLabel}
            onChange={(e) => onChange({ ...data, sortLabel: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl border border-[#EAE2D5] text-xs text-[#1E1917]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Số bài viết hiển thị mỗi trang
          </label>
          <input
            type="number"
            min={1}
            max={50}
            value={data.itemsPerPage}
            onChange={(e) =>
              onChange({
                ...data,
                itemsPerPage: Number(e.target.value) || 6,
              })
            }
            className="w-full px-3.5 py-2 rounded-xl border border-[#EAE2D5] text-xs text-[#1E1917]"
          />
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-[#1E1917]">
            Thông báo khi không có bài viết trong danh mục
          </label>
          <input
            type="text"
            value={data.emptyText}
            onChange={(e) => onChange({ ...data, emptyText: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] text-xs text-[#695D56]"
          />
        </div>
      </div>
    </div>
  );
}

