"use client";

import { Package, Plus, Search, Filter, Edit, Trash2 } from "lucide-react";

export function AdminProductsView({ embedded = false }: { embedded?: boolean }) {
  const products = [
    {
      id: 1,
      name: "Đại Bình Phong Cửu Long Khởi Sắc",
      category: "Bình phong & Vách ngăn",
      dimensions: "3200 x 2400 mm",
      price: "Liên hệ giám tuyển",
      status: "Sẵn sàng trưng bày",
    },
    {
      id: 2,
      name: "Vách Ốp Sơn Mài Hoa Sen Dát Vàng",
      category: "Vách trang trí sảnh",
      dimensions: "4500 x 2800 mm",
      price: "Bespoke",
      status: "Đang thi công",
    },
    {
      id: 3,
      name: "Tủ Khảm Trai Then Đen Cổ Điển",
      category: "Nội thất sơn mài",
      dimensions: "1800 x 900 x 500 mm",
      price: "Độc bản 01/01",
      status: "Sẵn sàng trưng bày",
    },
    {
      id: 4,
      name: "Tranh Sơn Mài Non Sông Gấm Vóc",
      category: "Tranh hội hoạ hàn lâm",
      dimensions: "2000 x 1200 mm",
      price: "Bảo tàng tuyển chọn",
      status: "Đã bàn giao",
    },
  ];

  return (
    <div className="space-y-6">
      {/* View Header */}
      {!embedded && <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#EAE2D5] shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#FAF1EC] text-[#5A0B0E] flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1E1917]">Quản lý Sản phẩm</h1>
            <p className="text-xs text-[#695D56] mt-0.5">
              Danh sách 32 tác phẩm sơn mài, bình phong, đại vách và nội thất độc bản
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert("Mở form thêm sản phẩm mới")}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#a21f1f] hover:bg-[#851619] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo sản phẩm mới</span>
        </button>
      </div>}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm tác phẩm theo tên, danh mục, quy cách..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#EAE2D5] text-xs font-medium text-[#1E1917] focus:outline-none focus:border-[#5A0B0E]"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="px-4 py-2.5 rounded-xl bg-white border border-[#EAE2D5] text-xs font-semibold text-stone-700 flex items-center gap-2 hover:bg-stone-50"
          >
            <Filter className="w-4 h-4 text-stone-500" />
            <span>Tất cả danh mục</span>
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-[#EAE2D5] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF6F0] border-b border-[#EAE2D5] text-[#695D56] font-bold uppercase tracking-wider">
                <th className="py-3.5 px-5">Mã &amp; Tác phẩm</th>
                <th className="py-3.5 px-4">Danh mục</th>
                <th className="py-3.5 px-4">Kích thước</th>
                <th className="py-3.5 px-4">Định giá / Hạng mục</th>
                <th className="py-3.5 px-4">Trạng thái</th>
                <th className="py-3.5 px-5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE2D5]/70 font-medium text-[#2A2421]">
              {products.map((item) => (
                <tr key={item.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold text-[#1E1917]">{item.name}</div>
                    <div className="text-[10px] text-stone-400">#SP-00{item.id}</div>
                  </td>
                  <td className="py-4 px-4 text-[#695D56]">{item.category}</td>
                  <td className="py-4 px-4 text-stone-600">{item.dimensions}</td>
                  <td className="py-4 px-4 text-[#9A1C1F] font-semibold">{item.price}</td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        title="Chỉnh sửa tác phẩm"
                        className="p-1.5 rounded-lg text-stone-500 hover:text-[#5A0B0E] hover:bg-stone-100 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        title="Xóa tác phẩm"
                        className="p-1.5 rounded-lg text-stone-500 hover:text-red-700 hover:bg-stone-100 transition-colors"
                      >
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
    </div>
  );
}

