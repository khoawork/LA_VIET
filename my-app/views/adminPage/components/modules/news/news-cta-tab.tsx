import type { NewsCtaSectionType } from "@/views/newPages/types/pagenew.type";

interface NewsCtaTabProps {
  data: NewsCtaSectionType;
  onChange: (data: NewsCtaSectionType) => void;
}

export function NewsCtaTab({ data, onChange }: NewsCtaTabProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-[#d9c7ae] shadow-xs space-y-6">
      <div className="border-b border-[#d9c7ae] pb-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#9A1C1F]">
          Section 5: Khối Kêu gọi Hợp tác &amp; Đăng ký Chuyên san
        </h2>
        <p className="text-xs text-[#695D56] mt-1">
          Banner màu đỏ son chuyển sắc ở chân trang tin tức
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Huy hiệu nhỏ trên tiêu đề (Badge)
          </label>
          <input
            type="text"
            value={data.badge}
            onChange={(e) => onChange({ ...data, badge: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl border border-[#d9c7ae] text-xs text-[#9A1C1F] font-normal"
          />
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-[#1E1917]">
            Tiêu đề banner CTA
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#d9c7ae] text-xs font-normal text-[#1E1917]"
          />
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-[#1E1917]">
            Nội dung mô tả mời hợp tác
          </label>
          <textarea
            rows={3}
            value={data.description}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#d9c7ae] text-xs text-[#5C544E] leading-relaxed"
          />
        </div>

        {/* Nút chính */}
        <div className="p-4 rounded-xl border border-[#d9c7ae] bg-[#FAF8F5] space-y-2">
          <span className="text-xs font-bold text-[#9A1C1F] block">
            Nút hành động chính (Primary Button)
          </span>
          <div className="space-y-1">
            <label className="text-[11px] text-[#695D56]">Tên hiển thị</label>
            <input
              type="text"
              value={data.primaryButton.text}
              onChange={(e) =>
                onChange({
                  ...data,
                  primaryButton: {
                    ...data.primaryButton,
                    text: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-1.5 rounded-lg border border-[#d9c7ae] text-xs bg-white font-normal"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-[#695D56]">Đường dẫn liên kết</label>
            <input
              type="text"
              value={data.primaryButton.link}
              onChange={(e) =>
                onChange({
                  ...data,
                  primaryButton: {
                    ...data.primaryButton,
                    link: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-1.5 rounded-lg border border-[#d9c7ae] text-xs bg-white"
            />
          </div>
        </div>

        {/* Nút phụ */}
        <div className="p-4 rounded-xl border border-[#d9c7ae] bg-[#FAF8F5] space-y-2">
          <span className="text-xs font-bold text-[#695D56] block">
            Nút hành động phụ (Secondary Button)
          </span>
          <div className="space-y-1">
            <label className="text-[11px] text-[#695D56]">Tên hiển thị</label>
            <input
              type="text"
              value={data.secondaryButton.text}
              onChange={(e) =>
                onChange({
                  ...data,
                  secondaryButton: {
                    ...data.secondaryButton,
                    text: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-1.5 rounded-lg border border-[#d9c7ae] text-xs bg-white font-normal"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-[#695D56]">Đường dẫn liên kết</label>
            <input
              type="text"
              value={data.secondaryButton.link}
              onChange={(e) =>
                onChange({
                  ...data,
                  secondaryButton: {
                    ...data.secondaryButton,
                    link: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-1.5 rounded-lg border border-[#d9c7ae] text-xs bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

