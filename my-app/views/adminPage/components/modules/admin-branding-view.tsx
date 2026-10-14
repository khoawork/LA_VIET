"use client";

import { LayoutTemplate, Save, Image as ImageIcon } from "lucide-react";

export function AdminBrandingView() {
  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif" }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#f3e9db] shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#f7f5f1] text-[#a21f1f] flex items-center justify-center border border-[#f3e9db]">
            <LayoutTemplate className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1E1917]">Hệ thống: Logo &amp; Chân trang (Footer)</h1>
            <p className="text-xs text-stone-600 mt-0.5">
              Cập nhật biểu tượng ấn triện, logo thương hiệu, thông tin bản quyền và hotline chân trang
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert("Đã lưu cấu hình Logo & Footer thành công!")}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#a21f1f] hover:bg-[#851619] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Lưu cấu hình</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#f3e9db] shadow-xs p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#4A423D]">
              Tên tổ chức / Thương hiệu
            </label>
            <input
              type="text"
              defaultValue="LÀ VIỆT - SƠN MÀI HỘI HOẠ LIÊN NGÀNH"
              className="w-full px-4 py-2.5 rounded-xl border border-[#f3e9db] bg-[#f7f5f1] text-xs font-bold text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#4A423D]">
              Hotline tư vấn dự án
            </label>
            <input
              type="text"
              defaultValue="+84 (0) 903 123 456"
              className="w-full px-4 py-2.5 rounded-xl border border-[#f3e9db] bg-[#f7f5f1] text-xs font-bold text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#4A423D]">
              Email liên hệ chính
            </label>
            <input
              type="text"
              defaultValue="contact@laviet.vn"
              className="w-full px-4 py-2.5 rounded-xl border border-[#f3e9db] bg-[#f7f5f1] text-xs font-bold text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#4A423D]">
              Dòng chữ bản quyền Footer
            </label>
            <input
              type="text"
              defaultValue="© 2026 LÀ VIỆT. All rights reserved. Bản quyền thuộc về Công ty TNHH Ứng dụng Liên ngành Sơn mài Hội hoạ Là Việt."
              className="w-full px-4 py-2.5 rounded-xl border border-[#f3e9db] bg-[#f7f5f1] text-xs font-medium text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

