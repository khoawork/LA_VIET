"use client";

import { BarChart3, Plus, Trash2 } from "lucide-react";
import type { HomeStatisticsSectionType } from "@/views/homePage/types/pagehome.type";
import { STAT_ICON_OPTIONS, StatIcon } from "@/views/homePage/components/home-statistics";

interface HomeStatisticsTabProps {
  data: HomeStatisticsSectionType;
  onChange: (updated: HomeStatisticsSectionType) => void;
}

export function HomeStatisticsTab({ data, onChange }: HomeStatisticsTabProps) {
  const handleStatChange = (
    index: number,
    field: "num" | "label" | "desc" | "tag" | "icon",
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

        {/* Thẻ chỉ số */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-bold text-[#1E1917]">
              Thẻ chỉ số thành tựu
            </span>
            <button
              type="button"
              onClick={() =>
                onChange({
                  ...data,
                  stats: [
                    ...data.stats,
                    { num: "", label: "", desc: "", tag: "", icon: "calendar" },
                  ],
                })
              }
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#a21f1f] text-white text-[11px] font-bold hover:bg-[#821B14]"
            >
              <Plus className="w-3.5 h-3.5" />
              Thêm thẻ
            </button>
          </div>

          {data.stats.length === 0 && (
            <p className="text-xs text-stone-500">Chưa có thẻ chỉ số nào.</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-[#f3e9db] bg-[#FAF8F5]/60 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#a21f1f]">
                    Vị trí #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      onChange({
                        ...data,
                        stats: data.stats.filter((_, index) => index !== idx),
                      })
                    }
                    aria-label={`Xóa thẻ chỉ số vị trí ${idx + 1}`}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#a21f1f] hover:underline"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Xóa
                  </button>
                </div>
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
                      Tag phía bên trái
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
                    Icon hiển thị
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      aria-label={`Icon thẻ chỉ số vị trí ${idx + 1}`}
                      value={stat.icon ?? STAT_ICON_OPTIONS[idx % 4].value}
                      onChange={(e) =>
                        handleStatChange(idx, "icon", e.target.value)
                      }
                      className="flex-1 min-w-0 px-2.5 py-1.5 rounded-lg border border-[#f3e9db] text-xs bg-white"
                    >
                      {STAT_ICON_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <span className="w-8 h-8 shrink-0 flex items-center justify-center border border-[#EEDCA9] bg-[#FFF8E8] text-[#B91C1C]">
                      <StatIcon value={stat.icon} index={idx} className="w-4 h-4" />
                    </span>
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
                    rows={3}
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

