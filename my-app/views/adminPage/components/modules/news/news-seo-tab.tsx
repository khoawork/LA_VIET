import type { NewsSeoSectionType } from "@/views/newPages/types/pagenew.type";

interface NewsSeoTabProps {
  data?: NewsSeoSectionType;
  onChange: (data: NewsSeoSectionType) => void;
}

export function NewsSeoTab({ data, onChange }: NewsSeoTabProps) {
  const seo = data ?? {
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    ogImage: "",
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-[#d9c7ae] shadow-xs space-y-6">
      <div className="border-b border-[#d9c7ae] pb-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#9A1C1F]">
          Section 6: Cấu hình SEO &amp; Chia sẻ mạng xã hội
        </h2>
        <p className="text-xs text-[#695D56] mt-1">
          Thẻ tiêu đề và mô tả tìm kiếm Google cho trang Tin tức
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-[#1E1917]">
            Thẻ Tiêu đề SEO (Meta Title)
          </label>
          <input
            type="text"
            value={seo.metaTitle}
            onChange={(e) =>
              onChange({
                ...seo,
                metaTitle: e.target.value,
              })
            }
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#d9c7ae] text-xs font-normal text-[#1E1917]"
          />
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-[#1E1917]">
            Thẻ Mô tả SEO (Meta Description)
          </label>
          <textarea
            rows={3}
            value={seo.metaDescription}
            onChange={(e) =>
              onChange({
                ...seo,
                metaDescription: e.target.value,
              })
            }
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#d9c7ae] text-xs text-[#5C544E] leading-relaxed"
          />
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-[#1E1917]">
            Từ khóa tìm kiếm (Keywords)
          </label>
          <input
            type="text"
            value={seo.keywords}
            onChange={(e) =>
              onChange({
                ...seo,
                keywords: e.target.value,
              })
            }
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#d9c7ae] text-xs text-[#1E1917]"
          />
        </div>
      </div>
    </div>
  );
}

