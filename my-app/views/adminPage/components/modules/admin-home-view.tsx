"use client";

import { Home, Save, Sparkles, Image as ImageIcon, Eye } from "lucide-react";

export function AdminHomeView() {
  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#EAE2D5] shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#FAF1EC] text-[#5A0B0E] flex items-center justify-center">
            <Home className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1E1917]">Quản lý Trang chủ</h1>
            <p className="text-xs text-[#695D56] mt-0.5">
              Tùy chỉnh biểu ngữ Hero, các khối giới thiệu tiêu điểm và sản phẩm nổi bật
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert("Đã lưu cấu hình Trang chủ thành công!")}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#5A0B0E] hover:bg-[#721217] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Lưu thay đổi</span>
        </button>
      </div>

      {/* Hero Banner Section Form */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#EAE2D5] shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#EAE2D5]">
          <h2 className="text-base font-bold text-[#1E1917] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#E5A93C]" />
            Khối Biểu Ngữ Chính (Hero Section)
          </h2>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Đang hiển thị
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#4A423D]">
              Tiêu đề chính (Heading 1)
            </label>
            <input
              type="text"
              defaultValue="HÀNH TRÌNH TÔN VINH DI SẢN SƠN MÀI TRONG KHÔNG GIAN ĐƯƠNG ĐẠI"
              className="w-full px-4 py-2.5 rounded-xl border border-[#EAE2D5] bg-[#FAF6F0]/40 text-sm text-[#1E1917] font-medium focus:outline-none focus:border-[#5A0B0E]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#4A423D]">
              Mô tả ngắn (Lead Paragraph)
            </label>
            <textarea
              rows={3}
              defaultValue="Kế thừa nền tảng nhựa mủ sơn ta Phú Thọ nguyên bản cùng các thành tựu vật liệu mới, tạo lập cầu nối giữa di sản hội hoạ hàn lâm và thực tiễn kiến trúc quy mô lớn."
              className="w-full px-4 py-2.5 rounded-xl border border-[#EAE2D5] bg-[#FAF6F0]/40 text-sm text-[#1E1917] font-medium focus:outline-none focus:border-[#5A0B0E]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#4A423D]">
              Ảnh nền Hero (URL hoặc tải lên)
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                defaultValue="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1600&q=80"
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#EAE2D5] bg-[#FAF6F0]/40 text-sm text-[#1E1917] font-medium focus:outline-none focus:border-[#5A0B0E]"
              />
              <button
                type="button"
                className="px-4 py-2.5 rounded-xl border border-[#EAE2D5] hover:bg-stone-50 text-xs font-semibold flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4 text-stone-500" />
                <span>Chọn ảnh</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

