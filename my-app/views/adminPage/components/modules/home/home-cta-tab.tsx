"use client";

import { Megaphone } from "lucide-react";
import type { HomeCtaSectionType } from "@/views/homePage/types/pagehome.type";

interface HomeCtaTabProps {
  data: HomeCtaSectionType;
  onChange: (updated: HomeCtaSectionType) => void;
}

export function HomeCtaTab({ data, onChange }: HomeCtaTabProps) {
  return (
    <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#f3e9db] shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#f3e9db]">
        <div className="flex items-center gap-2.5">
          <Megaphone className="w-5 h-5 text-[#a21f1f]" />
          <div>
            <h2 className="text-base font-bold text-[#1E1917]">
              Khối Kêu gọi hành động (CTA Section)
            </h2>
            <p className="text-xs text-stone-500">
              Khối thúc đẩy khách hàng gửi yêu cầu tư vấn hoặc tải hồ sơ năng lực
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
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
            Tiêu đề chính CTA
          </label>
          <textarea
            rows={2}
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#f3e9db] text-xs font-bold text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Đoạn nội dung khuyến khích liên hệ
          </label>
          <textarea
            rows={3}
            value={data.description}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#f3e9db] text-xs text-stone-600 leading-relaxed focus:outline-none focus:border-[#a21f1f]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Nút chính */}
          <div className="p-4 rounded-xl border border-[#f3e9db] bg-[#FAF8F5]/60 space-y-2">
            <span className="text-xs font-bold text-[#a21f1f] block uppercase tracking-wider">
              Nút chính (Tư vấn)
            </span>
            <input
              type="text"
              placeholder="Chữ trên nút..."
              value={data.primaryButton?.text}
              onChange={(e) =>
                onChange({
                  ...data,
                  primaryButton: {
                    ...data.primaryButton,
                    text: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 rounded-lg border border-[#f3e9db] text-xs font-semibold bg-white"
            />
            <input
              type="text"
              placeholder="Đường dẫn URL..."
              value={data.primaryButton?.href}
              onChange={(e) =>
                onChange({
                  ...data,
                  primaryButton: {
                    ...data.primaryButton,
                    href: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-1.5 rounded-lg border border-[#f3e9db] text-xs font-mono text-stone-500 bg-white"
            />
          </div>

          {/* Nút phụ */}
          <div className="p-4 rounded-xl border border-[#f3e9db] bg-[#FAF8F5]/60 space-y-2">
            <span className="text-xs font-bold text-stone-700 block uppercase tracking-wider">
              Nút phụ (Hồ sơ năng lực)
            </span>
            <input
              type="text"
              placeholder="Chữ trên nút..."
              value={data.secondaryButton?.text}
              onChange={(e) =>
                onChange({
                  ...data,
                  secondaryButton: {
                    ...data.secondaryButton,
                    text: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 rounded-lg border border-[#f3e9db] text-xs font-semibold bg-white"
            />
            <input
              type="text"
              placeholder="Đường dẫn URL..."
              value={data.secondaryButton?.href}
              onChange={(e) =>
                onChange({
                  ...data,
                  secondaryButton: {
                    ...data.secondaryButton,
                    href: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-1.5 rounded-lg border border-[#f3e9db] text-xs font-mono text-stone-500 bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

