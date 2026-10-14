"use client";

import { FolderKanban, Plus, Search, Filter, Edit, Trash2, MapPin } from "lucide-react";

export function AdminProjectsView() {
  const projects = [
    {
      id: 1,
      name: "Grand Heritage Luxury Resort",
      category: "Khách sạn & Resort 5*",
      location: "Phú Quốc, Kiên Giang",
      scale: "240 m² sơn mài đại sảnh",
      status: "Đã hoàn thành",
    },
    {
      id: 2,
      name: "Đại Sảnh Trung Tâm Hội Nghị Quốc Tế",
      category: "Công trình ngoại giao",
      location: "Tây Hồ, Hà Nội",
      scale: "180 m² bình phong 16 tấm",
      status: "Đang triển khai",
    },
    {
      id: 3,
      name: "Phòng Khánh Tiết Dinh Thự Palm Hill",
      category: "Dinh thự tư nhân",
      location: "Thảo Điền, TP. Hồ Chí Minh",
      scale: "95 m² vách trần dát vàng",
      status: "Đã bàn giao",
    },
  ];

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#EAE2D5] shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#FAF1EC] text-[#5A0B0E] flex items-center justify-center">
            <FolderKanban className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1E1917]">Quản lý Dự án tiêu biểu</h1>
            <p className="text-xs text-[#695D56] mt-0.5">
              Hệ thống 24 công trình kiến trúc resort 5 sao, đại sảnh ngoại giao và dinh thự
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert("Mở form thêm dự án mới")}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#5A0B0E] hover:bg-[#721217] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm dự án mới</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm dự án theo tên công trình, địa điểm, quy mô..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#EAE2D5] text-xs font-medium text-[#1E1917] focus:outline-none focus:border-[#5A0B0E]"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="px-4 py-2.5 rounded-xl bg-white border border-[#EAE2D5] text-xs font-semibold text-stone-700 flex items-center gap-2 hover:bg-stone-50"
          >
            <Filter className="w-4 h-4 text-stone-500" />
            <span>Phân loại dự án</span>
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-2xl border border-[#EAE2D5] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF6F0] border-b border-[#EAE2D5] text-[#695D56] font-bold uppercase tracking-wider">
                <th className="py-3.5 px-5">Tên công trình</th>
                <th className="py-3.5 px-4">Hạng mục</th>
                <th className="py-3.5 px-4">Địa điểm</th>
                <th className="py-3.5 px-4">Quy mô bề mặt</th>
                <th className="py-3.5 px-4">Tiến độ</th>
                <th className="py-3.5 px-5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE2D5]/70 font-medium text-[#2A2421]">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold text-[#1E1917]">{proj.name}</div>
                    <div className="text-[10px] text-stone-400">#DA-00{proj.id}</div>
                  </td>
                  <td className="py-4 px-4 text-[#695D56]">{proj.category}</td>
                  <td className="py-4 px-4 text-stone-600 inline-flex items-center gap-1 mt-3">
                    <MapPin className="w-3.5 h-3.5 text-[#9A1C1F]" />
                    {proj.location}
                  </td>
                  <td className="py-4 px-4 font-semibold text-[#1E1917]">{proj.scale}</td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {proj.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        title="Chỉnh sửa dự án"
                        className="p-1.5 rounded-lg text-stone-500 hover:text-[#5A0B0E] hover:bg-stone-100 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        title="Xóa dự án"
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

