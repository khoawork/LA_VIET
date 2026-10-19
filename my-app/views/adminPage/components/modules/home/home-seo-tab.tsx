"use client";

import { Globe } from "lucide-react";
import type { HomeSeoSectionType } from "@/views/homePage/types/pagehome.type";

interface HomeSeoTabProps {
  data: HomeSeoSectionType;
  onChange: (updated: HomeSeoSectionType) => void;
}

export function HomeSeoTab({ data, onChange }: HomeSeoTabProps) {
  return (
    <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#f3e9db] shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#f3e9db]">
        <div className="flex items-center gap-2.5">
          <Globe className="w-5 h-5 text-[#a21f1f]" />
          <div>
            <h2 className="text-base font-bold text-[#1E1917]">
              Cấu hình SEO &amp; Meta Trang chủ
            </h2>
            <p className="text-xs text-stone-500">
              Tối ưu hóa công cụ tìm kiếm Google và thẻ hiển thị mạng xã hội Open Graph
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Tiêu đề trang (Meta Title)
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#f3e9db] text-xs font-semibold text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
          />
          <span className="text-[10px] text-stone-400">
            Khuyến nghị từ 50-60 ký tự. Hiện tại: {data.title?.length || 0} ký tự.
          </span>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Mô tả tìm kiếm (Meta Description)
          </label>
          <textarea
            rows={3}
            value={data.description}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#f3e9db] text-xs text-stone-600 leading-relaxed focus:outline-none focus:border-[#a21f1f]"
          />
          <span className="text-[10px] text-stone-400">
            Khuyến nghị từ 150-160 ký tự. Hiện tại: {data.description?.length || 0} ký tự.
          </span>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Từ khóa SEO (Keywords)
          </label>
          <input
            type="text"
            placeholder="sơn mài, Là Việt, nghệ thuật..."
            value={data.keywords}
            onChange={(e) => onChange({ ...data, keywords: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#f3e9db] text-xs text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Ảnh chia sẻ mạng xã hội (OG Image URL)
          </label>
          <input
            type="text"
            value={data.ogImage}
            onChange={(e) => onChange({ ...data, ogImage: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#f3e9db] text-xs font-mono text-stone-600 focus:outline-none focus:border-[#a21f1f]"
          />
        </div>
      </div>
    </div>
  );
}

