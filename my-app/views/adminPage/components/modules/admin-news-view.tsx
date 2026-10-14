"use client";

import { Newspaper, Plus, Search, Filter, Edit, Trash2, Calendar, Eye } from "lucide-react";

export function AdminNewsView() {
  const newsList = [
    {
      id: 1,
      title: "Khai mở sơn mài liên ngành: Cầu nối giữa hội họa hàn lâm và kiến trúc",
      category: "Nghiên cứu văn hoá",
      author: "Ban Biên Tập",
      date: "12/10/2026",
      views: "1.4K",
      status: "Đã xuất bản",
    },
    {
      id: 2,
      title: "Bảo tồn kỹ thuật ủ ẩm mùn cưa và mài nước truyền thống vùng Phú Thọ",
      category: "Kỹ thuật di sản",
      author: "Nghệ nhân Phan Văn",
      date: "08/10/2026",
      views: "2.1K",
      status: "Đã xuất bản",
    },
    {
      id: 3,
      title: "Triển lãm 'Hồn Đất Thếp Vàng': Hành trình tôn vinh chất liệu sơn ta",
      category: "Sự kiện & Triển lãm",
      author: "Hội đồng Giám tuyển",
      date: "01/10/2026",
      views: "950",
      status: "Bản nháp",
    },
  ];

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#EAE2D5] shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#FAF1EC] text-[#5A0B0E] flex items-center justify-center">
            <Newspaper className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1E1917]">Quản lý Tin tức &amp; Bài viết</h1>
            <p className="text-xs text-[#695D56] mt-0.5">
              Soạn thảo, duyệt bài nghiên cứu di sản sơn mài, hoạt động triển lãm và sự kiện
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert("Mở form viết bài mới")}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#5A0B0E] hover:bg-[#721217] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Viết bài mới</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm bài viết theo tiêu đề, tác giả, chuyên mục..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#EAE2D5] text-xs font-medium text-[#1E1917] focus:outline-none focus:border-[#5A0B0E]"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="px-4 py-2.5 rounded-xl bg-white border border-[#EAE2D5] text-xs font-semibold text-stone-700 flex items-center gap-2 hover:bg-stone-50"
          >
            <Filter className="w-4 h-4 text-stone-500" />
            <span>Tất cả chuyên mục</span>
          </button>
        </div>
      </div>

      {/* News Table */}
      <div className="bg-white rounded-2xl border border-[#EAE2D5] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF6F0] border-b border-[#EAE2D5] text-[#695D56] font-bold uppercase tracking-wider">
                <th className="py-3.5 px-5">Bài viết</th>
                <th className="py-3.5 px-4">Chuyên mục</th>
                <th className="py-3.5 px-4">Tác giả</th>
                <th className="py-3.5 px-4">Ngày đăng</th>
                <th className="py-3.5 px-4">Lượt xem</th>
                <th className="py-3.5 px-4">Trạng thái</th>
                <th className="py-3.5 px-5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE2D5]/70 font-medium text-[#2A2421]">
              {newsList.map((news) => (
                <tr key={news.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold text-[#1E1917] max-w-md line-clamp-1">
                      {news.title}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[#695D56]">{news.category}</td>
                  <td className="py-4 px-4 text-stone-600">{news.author}</td>
                  <td className="py-4 px-4 text-stone-600 inline-flex items-center gap-1 mt-4">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    {news.date}
                  </td>
                  <td className="py-4 px-4 text-stone-600">
                    <span className="inline-flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-stone-400" />
                      {news.views}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        news.status === "Đã xuất bản"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-stone-100 text-stone-700 border-stone-200"
                      }`}
                    >
                      {news.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        title="Chỉnh sửa bài viết"
                        className="p-1.5 rounded-lg text-stone-500 hover:text-[#5A0B0E] hover:bg-stone-100 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        title="Xóa bài viết"
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

