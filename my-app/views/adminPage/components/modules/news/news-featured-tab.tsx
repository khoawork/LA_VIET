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

        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-[#1E1917]">
            Đường dẫn hình ảnh bìa (Image URL)
          </label>
          <input
            type="text"
            value={data.imageUrl}
            onChange={(e) => onChange({ ...data, imageUrl: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl border border-[#EAE2D5] text-xs text-[#1E1917]"
          />
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

      {/* 2 Stat Boxes Highlight */}
      <div className="pt-4 border-t border-[#EAE2D5]">
        <h3 className="text-xs font-bold uppercase text-[#1E1917] mb-3">
          2 Ô Chỉ số Kỹ thuật Nổi bật trong Bài viết Tiêu điểm
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.highlightStats?.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-[#EAE2D5] bg-[#FAF8F5] space-y-2"
            >
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

