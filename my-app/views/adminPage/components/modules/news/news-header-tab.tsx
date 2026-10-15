import type { NewsHeaderSectionType } from "@/views/newPages/types/pagenew.type";

interface NewsHeaderTabProps {
  data: NewsHeaderSectionType;
  onChange: (data: NewsHeaderSectionType) => void;
}

export function NewsHeaderTab({ data, onChange }: NewsHeaderTabProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-[#EAE2D5] shadow-xs space-y-6">
      <div className="border-b border-[#EAE2D5] pb-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#9A1C1F]">
          Section 1: Tiêu đề trang &amp; Điều hướng
        </h2>
        <p className="text-xs text-[#695D56] mt-1">
          Phần đầu trang gồm đường kẻ đỏ nhận diện, tiêu đề trang H1 và đoạn mô tả giới thiệu
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-[#1E1917]">
            Tiêu đề chính trang web (H1)
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] text-xs font-semibold text-[#1E1917] focus:outline-none focus:border-[#9A1C1F]"
          />
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-[#1E1917]">
            Đoạn giới thiệu / Mô tả chuyên mục
          </label>
          <textarea
            rows={3}
            value={data.description}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] text-xs text-[#5C544E] leading-relaxed focus:outline-none focus:border-[#9A1C1F]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Màu sắc nhận diện (Mã Hex)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={data.accentColor}
              onChange={(e) => onChange({ ...data, accentColor: e.target.value })}
              className="w-9 h-9 rounded-lg border border-[#EAE2D5] cursor-pointer"
            />
            <input
              type="text"
              value={data.accentColor}
              onChange={(e) => onChange({ ...data, accentColor: e.target.value })}
              className="flex-1 px-3 py-2 rounded-xl border border-[#EAE2D5] text-xs text-[#1E1917]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Tên trang trên Breadcrumb
          </label>
          <input
            type="text"
            value={data.breadcrumb.currentPageText}
            onChange={(e) =>
              onChange({
                ...data,
                breadcrumb: {
                  ...data.breadcrumb,
                  currentPageText: e.target.value,
                },
              })
            }
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] text-xs text-[#1E1917] focus:outline-none focus:border-[#9A1C1F]"
          />
        </div>
      </div>
    </div>
  );
}

