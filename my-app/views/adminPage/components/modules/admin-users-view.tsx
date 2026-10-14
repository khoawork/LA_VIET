"use client";

import { Users, Plus, ShieldCheck, Mail, Lock } from "lucide-react";

export function AdminUsersView() {
  const users = [
    { id: 1, name: "Nguyễn Văn Phan", email: "admin@laviet.vn", role: "Quản trị viên tối cao (Super Admin)", status: "Đang hoạt động" },
    { id: 2, name: "Phan Văn Thìn Thọ", email: "ceo@laviet.vn", role: "Giám đốc nghệ thuật (Editor-in-Chief)", status: "Đang hoạt động" },
    { id: 3, name: "Ban Biên Tập Di Sản", email: "editor@laviet.vn", role: "Biên tập viên nội dung", status: "Đang hoạt động" },
  ];

  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif" }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#f3e9db] shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#f7f5f1] text-[#a21f1f] flex items-center justify-center border border-[#f3e9db]">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1E1917]">Hệ thống: Tài khoản &amp; Phân quyền</h1>
            <p className="text-xs text-stone-600 mt-0.5">
              Quản trị danh sách nhân sự nội bộ và phân quyền truy cập hệ thống
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert("Mở form tạo tài khoản mới")}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#a21f1f] hover:bg-[#851619] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm tài khoản</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#f3e9db] shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#f7f5f1] border-b border-[#f3e9db] text-stone-700 font-bold uppercase tracking-wider">
              <th className="py-3.5 px-5">Tên người dùng</th>
              <th className="py-3.5 px-4">Email đăng nhập</th>
              <th className="py-3.5 px-4">Vai trò quản trị</th>
              <th className="py-3.5 px-4">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f3e9db] font-medium text-[#1E1917]">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-[#f7f5f1]/50 transition-colors">
                <td className="py-4 px-5 font-bold text-[#1E1917]">{u.name}</td>
                <td className="py-4 px-4 text-stone-600">{u.email}</td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#f7f5f1] text-[#a21f1f] border border-[#f3e9db] font-bold text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {u.role}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {u.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

