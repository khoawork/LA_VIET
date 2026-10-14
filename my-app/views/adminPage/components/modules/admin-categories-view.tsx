"use client";

import { Database, Plus, Search, Edit, Trash2 } from "lucide-react";

export function AdminCategoriesView() {
  const categories = [
    { id: 1, name: "Bình phong & Đại vách sơn mài", type: "Sản phẩm", itemCount: 12, slug: "binh-phong-dai-vach" },
    { id: 2, name: "Tranh sơn mài khổ lớn", type: "Sản phẩm", itemCount: 8, slug: "tranh-son-mai" },
    { id: 3, name: "Nội thất dát vàng thủ công", type: "Sản phẩm", itemCount: 12, slug: "noi-that-dat-vang" },
    { id: 4, name: "Khách sạn & Resort 5 sao", type: "Dự án", itemCount: 10, slug: "khach-san-resort" },
    { id: 5, name: "Đại sảnh & Công trình ngoại giao", type: "Dự án", itemCount: 6, slug: "dai-sanh-ngoai-giao" },
    { id: 6, name: "Nghiên cứu văn hoá & Di sản", type: "Tin tức", itemCount: 9, slug: "nghien-cuu-van-hoa" },
  ];

  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif" }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#f3e9db] shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#f7f5f1] text-[#a21f1f] flex items-center justify-center border border-[#f3e9db]">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1E1917]">Hệ thống: Danh mục dữ liệu</h1>
            <p className="text-xs text-stone-600 mt-0.5">
              Quản lý phân loại danh mục sản phẩm, dự án và chuyên mục tin tức
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert("Thêm danh mục dữ liệu mới")}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#a21f1f] hover:bg-[#851619] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo danh mục mới</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm danh mục theo tên, loại dữ liệu, slug..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#f3e9db] text-xs font-medium text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#f3e9db] shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#f7f5f1] border-b border-[#f3e9db] text-stone-700 font-bold uppercase tracking-wider">
              <th className="py-3.5 px-5">Tên danh mục</th>
              <th className="py-3.5 px-4">Loại phân hệ</th>
              <th className="py-3.5 px-4">Đường dẫn (Slug)</th>
              <th className="py-3.5 px-4">Số lượng mục</th>
              <th className="py-3.5 px-5 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f3e9db] font-medium text-[#1E1917]">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-[#f7f5f1]/50 transition-colors">
                <td className="py-4 px-5 font-bold text-[#1E1917]">{cat.name}</td>
                <td className="py-4 px-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#f7f5f1] text-[#a21f1f] border border-[#f3e9db]">
                    {cat.type}
                  </span>
                </td>
                <td className="py-4 px-4 text-stone-500 font-mono text-[11px]">{cat.slug}</td>
                <td className="py-4 px-4 font-bold text-stone-800">{cat.itemCount} bản ghi</td>
                <td className="py-4 px-5 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button type="button" className="p-1.5 rounded-lg text-stone-500 hover:text-[#a21f1f]">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-1.5 rounded-lg text-stone-500 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

