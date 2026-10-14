"use client";

import { Menu, Save, GripVertical, Plus } from "lucide-react";

export function AdminMenuView() {
  const menuItems = [
    { id: 1, label: "TRANG CHỦ", path: "/", status: "Hiển thị" },
    { id: 2, label: "VỀ CHÚNG TÔI", path: "/about", status: "Hiển thị" },
    { id: 3, label: "SẢN PHẨM", path: "/products", status: "Hiển thị" },
    { id: 4, label: "DỰ ÁN", path: "/project", status: "Hiển thị" },
    { id: 5, label: "TIN TỨC", path: "/news", status: "Hiển thị" },
    { id: 6, label: "LIÊN HỆ", path: "/contact", status: "Hiển thị" },
  ];

  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif" }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#f3e9db] shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#f7f5f1] text-[#a21f1f] flex items-center justify-center border border-[#f3e9db]">
            <Menu className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1E1917]">Hệ thống: Menu &amp; Điều hướng</h1>
            <p className="text-xs text-stone-600 mt-0.5">
              Sắp xếp thứ tự và cấu hình các mục trên thanh điều hướng Header website Là Việt
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert("Đã lưu thứ tự menu điều hướng!")}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#a21f1f] hover:bg-[#851619] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Lưu thứ tự</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#f3e9db] shadow-xs p-6 space-y-3">
        {menuItems.map((item, index) => (
          <div
            key={item.id}
            className="p-3.5 rounded-xl bg-[#f7f5f1] border border-[#f3e9db] flex items-center justify-between gap-4 hover:border-[#a21f1f]/40 transition-all cursor-move"
          >
            <div className="flex items-center gap-3">
              <GripVertical className="w-4 h-4 text-stone-400" />
              <span className="w-6 h-6 rounded-full bg-white border border-[#f3e9db] flex items-center justify-center text-xs font-bold text-[#a21f1f]">
                {index + 1}
              </span>
              <span className="text-xs font-bold text-[#1E1917]">{item.label}</span>
              <span className="text-[11px] text-stone-500 font-mono">({item.path})</span>
            </div>

            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

