"use client";

import { BarChart3 } from "lucide-react";
import type { HomeStatisticsSectionType } from "@/views/homePage/types/pagehome.type";

interface HomeStatisticsTabProps {
  data: HomeStatisticsSectionType;
  onChange: (updated: HomeStatisticsSectionType) => void;
}

export function HomeStatisticsTab({ data, onChange }: HomeStatisticsTabProps) {
  const handleStatChange = (
    index: number,
    field: "num" | "label" | "desc" | "tag",
    value: string,
  ) => {
    const updatedStats = [...data.stats];
    updatedStats[index] = {
      ...updatedStats[index],
      [field]: value,
    };
    onChange({ ...data, stats: updatedStats });
  };

  return (
    <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#f3e9db] shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#f3e9db]">
        <div className="flex items-center gap-2.5">
          <BarChart3 className="w-5 h-5 text-[#a21f1f]" />
          <div>
            <h2 className="text-base font-bold text-[#1E1917]">
              Khối Thống kê (Statistics Section)
            </h2>
            <p className="text-xs text-stone-500">
              Các chỉ số ấn tượng khẳng định vị thế và uy tín thương hiệu
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1E1917]">
              Dòng tiêu đề phụ (Tagline)
            </label>
            <input
              type="text"
              value={data.tagline}
              onChange={(e) => onChange({ ...data, tagline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#f3e9db] text-xs font-medium text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1E1917]">
              Tiêu đề chính
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => onChange({ ...data, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#f3e9db] text-xs font-bold text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Đoạn mô tả phụ bên phải
          </label>
          <textarea
            rows={3}
            value={data.description}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#f3e9db] text-xs text-stone-600 leading-relaxed focus:outline-none focus:border-[#a21f1f]"
          />
        </div>

        {/* 4 Thẻ chỉ số */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold text-[#1E1917] block">
            4 Thẻ chỉ số thành tựu
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.stats?.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-[#f3e9db] bg-[#FAF8F5]/60 space-y-2.5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="space-y-1 flex-1">
                    <label className="text-[10px] font-bold text-stone-500 uppercase">
                      Chỉ số (Số lớn)
                    </label>
                    <input
                      type="text"
                      value={stat.num}
                      onChange={(e) =>
                        handleStatChange(idx, "num", e.target.value)
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-[#f3e9db] text-sm font-black text-[#a21f1f] bg-white"
                    />
                  </div>

                  <div className="space-y-1 flex-1">
                    <label className="text-[10px] font-bold text-stone-500 uppercase">
                      Huy hiệu (Tag)
                    </label>
                    <input
                      type="text"
                      value={stat.tag}
                      onChange={(e) =>
                        handleStatChange(idx, "tag", e.target.value)
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-[#f3e9db] text-xs font-bold bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-stone-500 uppercase">
                    Tên tiêu đề chỉ số
                  </label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) =>
                      handleStatChange(idx, "label", e.target.value)
                    }
                    className="w-full px-2.5 py-1.5 rounded-lg border border-[#f3e9db] text-xs font-bold text-[#1E1917] bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-stone-500 uppercase">
                    Mô tả chi tiết
                  </label>
                  <textarea
                    rows={2}
                    value={stat.desc}
                    onChange={(e) =>
                      handleStatChange(idx, "desc", e.target.value)
                    }
                    className="w-full px-2.5 py-1.5 rounded-lg border border-[#f3e9db] text-xs text-stone-600 bg-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

