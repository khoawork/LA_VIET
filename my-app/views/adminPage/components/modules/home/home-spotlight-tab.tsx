"use client";

import { Award, Image as ImageIcon, Plus, Trash2 } from "lucide-react";
import type { HomeSpotlightSectionType } from "@/views/homePage/types/pagehome.type";
import { ImagePreview } from "../image-preview";

interface HomeSpotlightTabProps {
  data: HomeSpotlightSectionType;
  onChange: (updated: HomeSpotlightSectionType) => void;
}

export function HomeSpotlightTab({ data, onChange }: HomeSpotlightTabProps) {
  const handleInfoBoxChange = (
    index: number,
    field: "label" | "value",
    val: string,
  ) => {
    const updated = [...data.infoBoxes];
    updated[index] = { ...updated[index], [field]: val };
    onChange({ ...data, infoBoxes: updated });
  };

  return (
    <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2d3bf] shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#e2d3bf]">
        <div className="flex items-center gap-2.5">
          <Award className="w-5 h-5 text-[#a21f1f]" />
          <div>
            <h2 className="text-base font-bold text-[#1E1917]">
              Tiêu điểm dự án (Spotlight Section)
            </h2>
            <p className="text-xs text-stone-500">
              Khối giới thiệu dự án tiêu biểu, nghệ nhân chủ trì và quy trình chế tác
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
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2d3bf] text-xs font-normal text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#1E1917]">
                Ảnh tiêu điểm (URL hoặc từ máy)
              </label>
              <label className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-[#a21f1f]/10 text-[#a21f1f] hover:bg-[#a21f1f]/20 text-[10px] font-bold cursor-pointer transition-colors">
                <ImageIcon className="w-3 h-3" />
                <span>Chọn ảnh</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        const base64 = ev.target?.result as string;
                        if (base64) {
                          onChange({ ...data, image: base64 });
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>
            <input
              type="text"
              value={data.image}
              onChange={(e) => onChange({ ...data, image: e.target.value })}
              placeholder="https://... hoặc chọn file từ máy tính"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2d3bf] text-xs font-mono bg-white focus:outline-none focus:border-[#a21f1f] truncate"
            />
            <ImagePreview src={data.image} alt="Xem trước ảnh tiêu điểm" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Tiêu đề chính tiêu điểm
          </label>
          <textarea
            rows={2}
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2d3bf] text-xs font-normal text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Đoạn nội dung diễn giải
          </label>
          <textarea
            rows={4}
            value={data.description}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2d3bf] text-xs text-stone-600 leading-relaxed focus:outline-none focus:border-[#a21f1f]"
          />
        </div>

        {/* Con dấu thương hiệu (Seal) */}
        <div className="p-4 rounded-xl border border-[#e2d3bf] bg-[#FAF8F5]/60 space-y-3">
          <span className="text-xs font-bold text-[#a21f1f] block uppercase tracking-wider">
            Con dấu thương hiệu (Seal Stamp)
          </span>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <label className="text-[10px] font-bold text-stone-500 uppercase">
                Logo con dấu
              </label>
              <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#a21f1f]/10 text-[#a21f1f] hover:bg-[#a21f1f]/20 text-[10px] font-bold cursor-pointer">
                <ImageIcon className="w-3 h-3" />
                Chọn logo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        const base64 = ev.target?.result as string;
                        if (base64) {
                          onChange({
                            ...data,
                            seal: { ...data.seal, logo: base64 },
                          });
                        }
                      };
                      reader.readAsDataURL(file);
                      e.target.value = "";
                    }
                  }}
                />
              </label>
            </div>
            <label className="block space-y-1">
              <span className="text-[10px] font-bold text-stone-500 uppercase">
                URL logo
              </span>
              <input
                type="text"
                value={data.seal.logo}
                onChange={(e) =>
                  onChange({
                    ...data,
                    seal: { ...data.seal, logo: e.target.value },
                  })
                }
                placeholder="https://... hoặc chọn logo từ máy"
                className="w-full px-2.5 py-1.5 rounded-lg border border-[#e2d3bf] text-xs font-mono bg-white truncate"
              />
            </label>
            <div className="flex items-center gap-3">
              {data.seal.logo ? (
                // URL đang nhập có thể thuộc máy chủ ảnh bất kỳ.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.seal.logo}
                  alt="Logo con dấu"
                  className="w-10 h-10 object-contain bg-white border border-[#e2d3bf]"
                />
              ) : (
                <span className="text-xs text-stone-500">Chưa chọn logo.</span>
              )}
              {data.seal.logo && (
                <button
                  type="button"
                  onClick={() =>
                    onChange({ ...data, seal: { ...data.seal, logo: "" } })
                  }
                  className="text-[11px] font-semibold text-[#a21f1f] hover:underline"
                >
                  Xóa logo
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-stone-500 uppercase">
                Dòng 1
              </label>
              <input
                type="text"
                value={data.seal?.line1}
                onChange={(e) =>
                  onChange({
                    ...data,
                    seal: { ...data.seal, line1: e.target.value },
                  })
                }
                className="w-full px-2.5 py-1.5 rounded-lg border border-[#e2d3bf] text-xs bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-stone-500 uppercase">
                Dòng 2
              </label>
              <input
                type="text"
                value={data.seal?.line2}
                onChange={(e) =>
                  onChange({
                    ...data,
                    seal: { ...data.seal, line2: e.target.value },
                  })
                }
                className="w-full px-2.5 py-1.5 rounded-lg border border-[#e2d3bf] text-xs bg-white"
              />
            </div>
          </div>
        </div>

        {/* Khối thông tin chi tiết */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-bold text-[#1E1917]">
              Khối thông số kỹ thuật &amp; nghệ nhân
            </span>
            <button
              type="button"
              onClick={() =>
                onChange({
                  ...data,
                  infoBoxes: [...data.infoBoxes, { label: "", value: "" }],
                })
              }
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#a21f1f] text-white text-[11px] font-bold hover:bg-[#821B14]"
            >
              <Plus className="w-3.5 h-3.5" />
              Thêm khối
            </button>
          </div>

          {data.infoBoxes.length === 0 && (
            <p className="text-xs text-stone-500">Chưa có khối thông tin nào.</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.infoBoxes.map((box, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-[#e2d3bf] bg-[#FAF8F5]/60 space-y-1.5"
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
                        infoBoxes: data.infoBoxes.filter((_, index) => index !== idx),
                      })
                    }
                    aria-label={`Xóa khối thông tin vị trí ${idx + 1}`}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#a21f1f] hover:underline"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Xóa
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Nhãn (ví dụ: Nghệ nhân chính)..."
                  aria-label={`Nhãn khối thông tin vị trí ${idx + 1}`}
                  value={box.label}
                  onChange={(e) =>
                    handleInfoBoxChange(idx, "label", e.target.value)
                  }
                  className="w-full px-2.5 py-1 rounded border border-[#e2d3bf] text-[10px] font-normal text-[#a21f1f] uppercase bg-white"
                />
                <input
                  type="text"
                  placeholder="Giá trị..."
                  aria-label={`Giá trị khối thông tin vị trí ${idx + 1}`}
                  value={box.value}
                  onChange={(e) =>
                    handleInfoBoxChange(idx, "value", e.target.value)
                  }
                  className="w-full px-2.5 py-1.5 rounded-lg border border-[#e2d3bf] text-xs font-normal text-[#1E1917] bg-white"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Liên kết dưới */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-stone-600">
              Chữ liên kết
            </label>
            <input
              type="text"
              value={data.link?.text}
              onChange={(e) =>
                onChange({
                  ...data,
                  link: { ...data.link, text: e.target.value },
                })
              }
              className="w-full px-3 py-2 rounded-lg border border-[#e2d3bf] text-xs bg-white"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-stone-600">
              URL liên kết
            </label>
            <input
              type="text"
              value={data.link?.href}
              onChange={(e) =>
                onChange({
                  ...data,
                  link: { ...data.link, href: e.target.value },
                })
              }
              className="w-full px-3 py-2 rounded-lg border border-[#e2d3bf] text-xs font-mono bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

