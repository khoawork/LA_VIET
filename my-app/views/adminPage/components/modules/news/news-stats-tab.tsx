import type { NewsStatsSectionType } from "@/views/newPages/types/pagenew.type";

interface NewsStatsTabProps {
  data: NewsStatsSectionType;
  onChange: (data: NewsStatsSectionType) => void;
}

export function NewsStatsTab({ data, onChange }: NewsStatsTabProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-[#d9c7ae] shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-[#d9c7ae] pb-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#9A1C1F]">
            Section 4: {data.items.length} Khối Chỉ số Khảo cứu &amp; Kiểm nghiệm
          </h2>
          <p className="text-xs text-[#695D56] mt-1">
            Các số liệu chứng thực năng lực kỹ nghệ và nghiên cứu học thuật của Là Việt
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {data.items.map((stat, idx) => (
          <div
            key={stat.id || idx}
            className="p-4 rounded-xl border border-[#d9c7ae] bg-[#FAF8F5] space-y-3"
          >
            <div className="flex items-center justify-between text-xs font-bold text-[#9A1C1F]">
              <span>Khối chỉ số #{idx + 1}</span>
              <span className="text-[10px] text-[#A89F95]">ID: {stat.id}</span>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)_minmax(0,1.4fr)] lg:items-start">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#695D56] block">
                  Con số ấn tượng
                </label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => {
                    const newItems = [...data.items];
                    newItems[idx] = { ...newItems[idx], value: e.target.value };
                    onChange({ items: newItems });
                  }}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#d9c7ae] text-sm font-normal text-[#9A1C1F] bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#695D56] block">
                  Tên nhãn chỉ số
                </label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => {
                    const newItems = [...data.items];
                    newItems[idx] = { ...newItems[idx], label: e.target.value };
                    onChange({ items: newItems });
                  }}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#d9c7ae] text-xs font-normal text-[#1E1917] bg-white"
                />
              </div>

              <div className="space-y-1 md:col-span-2 lg:col-span-1">
                <label className="text-[11px] font-bold text-[#695D56] block">
                  Đoạn mô tả ngắn
                </label>
                <textarea
                  rows={2}
                  value={stat.description}
                  onChange={(e) => {
                    const newItems = [...data.items];
                    newItems[idx] = {
                      ...newItems[idx],
                      description: e.target.value,
                    };
                    onChange({ items: newItems });
                  }}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#d9c7ae] text-xs text-[#5C544E] bg-white"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

