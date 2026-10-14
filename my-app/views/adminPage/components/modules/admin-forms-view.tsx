"use client";

import { FileText, Save, CheckCircle2 } from "lucide-react";

export function AdminFormsView() {
  const forms = [
    { id: 1, name: "Biểu mẫu Yêu cầu tư vấn kiến trúc", responses: 8, sheetSync: "Đã đồng bộ Google Sheets", lastSubmit: "14/10/2026 - 08:15" },
    { id: 2, name: "Biểu mẫu Tải Hồ sơ năng lực (Profile PDF)", responses: 24, sheetSync: "Đã đồng bộ Google Sheets", lastSubmit: "13/10/2026 - 19:40" },
    { id: 3, name: "Biểu mẫu Đăng ký nhận bản tin di sản", responses: 45, sheetSync: "Đã đồng bộ Google Sheets", lastSubmit: "12/10/2026 - 11:20" },
  ];

  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif" }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#f3e9db] shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#f7f5f1] text-[#a21f1f] flex items-center justify-center border border-[#f3e9db]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1E1917]">Hệ thống: Quản lý Biểu mẫu (Forms)</h1>
            <p className="text-xs text-stone-600 mt-0.5">
              Cấu hình các trường nhập liệu form và kết nối đồng bộ dữ liệu khách hàng
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#f3e9db] shadow-xs p-6 space-y-4">
        {forms.map((f) => (
          <div key={f.id} className="p-4 rounded-xl bg-[#f7f5f1] border border-[#f3e9db] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <h3 className="font-bold text-[#1E1917] text-xs sm:text-sm">{f.name}</h3>
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600">
                <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {f.sheetSync}
                </span>
                <span>•</span>
                <span>Lần gửi gần nhất: {f.lastSubmit}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-white border border-[#f3e9db] font-bold text-xs text-[#a21f1f]">
                {f.responses} phản hồi
              </span>
              <button
                type="button"
                onClick={() => alert(`Xem chi tiết biểu mẫu: ${f.name}`)}
                className="px-3 py-1 rounded-lg bg-[#a21f1f] text-white font-bold text-xs hover:bg-[#851619]"
              >
                Cấu hình
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

