"use client";

import { Info, Save, Users, Award, ShieldCheck } from "lucide-react";

export function AdminAboutView() {
  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#EAE2D5] shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#FAF1EC] text-[#5A0B0E] flex items-center justify-center">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1E1917]">Quản lý Về chúng tôi</h1>
            <p className="text-xs text-[#695D56] mt-0.5">
              Chỉnh sửa thông điệp sứ mệnh, tầm nhìn, 4 giá trị cốt lõi và ban lãnh đạo
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert("Đã lưu nội dung Về chúng tôi thành công!")}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#5A0B0E] hover:bg-[#721217] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Lưu thay đổi</span>
        </button>
      </div>

      {/* 3 Pillars Editor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-[#EAE2D5] shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#9A1C1F]">
            <Award className="w-4 h-4" />
            Tầm nhìn đương đại
          </div>
          <input
            type="text"
            defaultValue="TỔ HỢP SƠN MÀI HÀNG ĐẦU KHU VỰC"
            className="w-full px-3 py-2 rounded-lg border border-[#EAE2D5] text-xs font-bold text-[#1E1917]"
          />
          <textarea
            rows={4}
            defaultValue="Trở thành tổ hợp sáng tạo sơn mài hội họa liên ngành tiên phong tại Đông Nam Á..."
            className="w-full px-3 py-2 rounded-lg border border-[#EAE2D5] text-xs text-[#695D56]"
          />
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EAE2D5] shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#96671E]">
            <ShieldCheck className="w-4 h-4" />
            Sứ mệnh khởi sinh
          </div>
          <input
            type="text"
            defaultValue="BẢO CHỨNG DI SẢN TRONG ĐỜI SỐNG"
            className="w-full px-3 py-2 rounded-lg border border-[#EAE2D5] text-xs font-bold text-[#1E1917]"
          />
          <textarea
            rows={4}
            defaultValue="Tuyệt đối tôn trọng và gìn giữ quy trình thủ công 12–20 công đoạn nghiêm ngặt..."
            className="w-full px-3 py-2 rounded-lg border border-[#EAE2D5] text-xs text-[#695D56]"
          />
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EAE2D5] shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#4A423D]">
            <Users className="w-4 h-4" />
            Giá trị cốt lõi
          </div>
          <input
            type="text"
            defaultValue="4 TRỤ CỘT BỀN VỮNG"
            className="w-full px-3 py-2 rounded-lg border border-[#EAE2D5] text-xs font-bold text-[#1E1917]"
          />
          <textarea
            rows={4}
            defaultValue="Mastery Craft, Interdisciplinary, Bespoke Heritage, Timeless Quality..."
            className="w-full px-3 py-2 rounded-lg border border-[#EAE2D5] text-xs text-[#695D56]"
          />
        </div>
      </div>
    </div>
  );
}

