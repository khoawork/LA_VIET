"use client";

import { Mail, Search, Filter, Phone, MapPin, Eye, CheckCircle2 } from "lucide-react";

export function AdminContactView() {
  const inquiries = [
    {
      id: 1,
      sender: "Ông Trần Hải Nam",
      organization: "Tập đoàn Phát triển Resort Heritage",
      email: "nam.tran@heritage-group.vn",
      phone: "+84 908 123 456",
      topic: "Tư vấn vách ngăn sơn mài thông tầng đại sảnh 32m",
      date: "14/10/2026 - 08:15",
      isUnread: true,
    },
    {
      id: 2,
      sender: "Bà Lê Thuỳ Trang",
      organization: "Khu Biệt Thự Thảo Điền",
      email: "thuytrang.le@gmail.com",
      phone: "+84 912 888 999",
      topic: "Đặt hàng bình phong 16 tấm chủ đề Hoa Sen dát vàng",
      date: "13/10/2026 - 15:30",
      isUnread: false,
    },
    {
      id: 3,
      sender: "KTS. Vũ Hoàng Minh",
      organization: "Công ty Thiết kế Kiến trúc A+ Studio",
      email: "minh.vu@aplus-architects.com",
      phone: "+84 933 555 777",
      topic: "Yêu cầu tài liệu năng lực và mẫu thử bề mặt vật liệu mới",
      date: "12/10/2026 - 10:20",
      isUnread: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#EAE2D5] shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#FAF1EC] text-[#5A0B0E] flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1E1917]">Quản lý Liên hệ &amp; Yêu cầu tư vấn</h1>
            <p className="text-xs text-[#695D56] mt-0.5">
              Tiếp nhận, xử lý phản hồi và đặt lịch tư vấn từ khách hàng doanh nghiệp &amp; cá nhân
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 text-[#9A1C1F] border border-rose-200 text-xs font-bold">
          <span>04 yêu cầu chưa xử lý</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm người gửi, đơn vị, email, số điện thoại..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#EAE2D5] text-xs font-medium text-[#1E1917] focus:outline-none focus:border-[#5A0B0E]"
          />
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-2xl border border-[#EAE2D5] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF6F0] border-b border-[#EAE2D5] text-[#695D56] font-bold uppercase tracking-wider">
                <th className="py-3.5 px-5">Người gửi &amp; Đơn vị</th>
                <th className="py-3.5 px-4">Thông tin liên lạc</th>
                <th className="py-3.5 px-4">Nội dung yêu cầu</th>
                <th className="py-3.5 px-4">Thời gian nhận</th>
                <th className="py-3.5 px-4">Trạng thái</th>
                <th className="py-3.5 px-5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE2D5]/70 font-medium text-[#2A2421]">
              {inquiries.map((inq) => (
                <tr
                  key={inq.id}
                  className={`hover:bg-stone-50/70 transition-colors ${
                    inq.isUnread ? "bg-amber-50/30 font-semibold" : ""
                  }`}
                >
                  <td className="py-4 px-5">
                    <div className="font-bold text-[#1E1917] flex items-center gap-1.5">
                      {inq.isUnread && (
                        <span className="w-2 h-2 rounded-full bg-[#9A1C1F] shrink-0" />
                      )}
                      <span>{inq.sender}</span>
                    </div>
                    <div className="text-[10px] text-stone-500 mt-0.5">{inq.organization}</div>
                  </td>
                  <td className="py-4 px-4 text-stone-600">
                    <div>{inq.email}</div>
                    <div className="text-[10px] text-stone-400 mt-0.5 inline-flex items-center gap-1">
                      <Phone className="w-3 h-3 text-stone-400" />
                      {inq.phone}
                    </div>
                  </td>
                  <td className="py-4 px-4 max-w-xs">
                    <p className="text-stone-700 line-clamp-2">{inq.topic}</p>
                  </td>
                  <td className="py-4 px-4 text-stone-500 text-[11px] whitespace-nowrap">
                    {inq.date}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        inq.isUnread
                          ? "bg-rose-50 text-[#9A1C1F] border-rose-200"
                          : "bg-emerald-50 text-emerald-700 border-emerald-200"
                      }`}
                    >
                      {inq.isUnread ? "Chưa phản hồi" : "Đã liên hệ"}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`Xem chi tiết thư từ ${inq.sender}`)}
                      className="px-3 py-1.5 rounded-lg border border-[#EAE2D5] hover:bg-stone-50 text-[11px] font-bold text-[#5A0B0E] transition-colors"
                    >
                      Xem chi tiết
                    </button>
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

