"use client";

import { Handshake } from "lucide-react";
import type { HomePartnersSectionType } from "@/views/homePage/types/pagehome.type";

interface HomePartnersTabProps {
  data: HomePartnersSectionType;
  onChange: (updated: HomePartnersSectionType) => void;
}

export function HomePartnersTab({ data, onChange }: HomePartnersTabProps) {
  const handlePartnerChange = (
    index: number,
    field: "name" | "subtitle",
    val: string,
  ) => {
    const updated = [...data.partners];
    updated[index] = { ...updated[index], [field]: val };
    onChange({ ...data, partners: updated });
  };

  const addPartner = () => {
    onChange({
      ...data,
      partners: [...data.partners, { name: "", subtitle: "" }],
    });
  };

  const removePartner = (index: number) => {
    const updated = data.partners.filter((_, i) => i !== index);
    onChange({ ...data, partners: updated });
  };

  return (
    <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#f3e9db] shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#f3e9db]">
        <div className="flex items-center gap-2.5">
          <Handshake className="w-5 h-5 text-[#a21f1f]" />
          <div>
            <h2 className="text-base font-bold text-[#1E1917]">
              Khối Đối tác &amp; Đánh giá (Partners &amp; Testimonial)
            </h2>
            <p className="text-xs text-stone-500">
              Quản lý danh sách đối tác chiến lược và trích dẫn đánh giá của chuyên gia
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
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#f3e9db] text-xs font-normal text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
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
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#f3e9db] text-xs font-normal text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Đoạn mô tả ngắn
          </label>
          <textarea
            rows={2}
            value={data.description}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#f3e9db] text-xs text-stone-600 leading-relaxed focus:outline-none focus:border-[#a21f1f]"
          />
        </div>

        {/* Danh sách Đối tác */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1E1917]">
              Danh sách đối tác chiến lược ({data.partners?.length || 0})
            </span>
            <button
              type="button"
              onClick={addPartner}
              className="px-3 py-1 rounded-lg bg-[#FAF1EC] text-[#9A1C1F] text-xs font-bold hover:bg-[#F0DCD6] cursor-pointer"
            >
              + Thêm đối tác
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.partners?.map((partner, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-[#f3e9db] bg-[#FAF8F5]/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#a21f1f]">
                    Vị trí #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removePartner(idx)}
                    aria-label={`Xóa đối tác vị trí ${idx + 1}`}
                    className="text-[11px] font-semibold text-[#a21f1f] hover:underline"
                  >
                    Xóa
                  </button>
                </div>
                <label className="block space-y-1">
                  <span className="text-[10px] font-bold text-stone-500 uppercase">Tên đối tác</span>
                  <input
                    type="text"
                    value={partner.name}
                    onChange={(e) => handlePartnerChange(idx, "name", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#f3e9db] text-xs font-normal text-stone-700 bg-white"
                  />
                </label>
                <label className="block space-y-1">
                  <span className="text-[10px] font-bold text-stone-500 uppercase">Dòng mô tả</span>
                  <input
                    type="text"
                    value={partner.subtitle}
                    onChange={(e) => handlePartnerChange(idx, "subtitle", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#f3e9db] text-xs text-stone-600 bg-white"
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Trích dẫn Đánh giá (Testimonial) */}
        <div className="p-4 rounded-xl border border-[#f3e9db] bg-[#FAF8F5]/60 space-y-3 pt-3">
          <span className="text-xs font-bold text-[#a21f1f] block uppercase tracking-wider">
            Trích dẫn đánh giá (Testimonial)
          </span>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-stone-600">
              Lời trích dẫn
            </label>
            <textarea
              rows={3}
              value={data.testimonial?.quote}
              onChange={(e) =>
                onChange({
                  ...data,
                  testimonial: {
                    ...data.testimonial,
                    quote: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 rounded-lg border border-[#f3e9db] text-xs italic text-stone-700 bg-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-stone-600">
              Tác giả nhận xét / Chức danh
            </label>
            <input
              type="text"
              value={data.testimonial?.author}
              onChange={(e) =>
                onChange({
                  ...data,
                  testimonial: {
                    ...data.testimonial,
                    author: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 rounded-lg border border-[#f3e9db] text-xs font-normal text-[#1E1917] bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

