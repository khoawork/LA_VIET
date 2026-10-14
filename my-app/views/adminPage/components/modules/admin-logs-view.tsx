"use client";

import { History, Clock, Filter } from "lucide-react";
import { ADMIN_RECENT_LOGS } from "../../services/admin.services";

export function AdminLogsView() {
  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif" }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#f3e9db] shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#f7f5f1] text-[#a21f1f] flex items-center justify-center border border-[#f3e9db]">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1E1917]">Hệ thống: Nhật ký hoạt động</h1>
            <p className="text-xs text-stone-600 mt-0.5">
              Toàn bộ dòng lịch sử thao tác chỉnh sửa, tạo mới và cập nhật dữ liệu của ban quản trị
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#f3e9db] shadow-xs p-6 space-y-4">
        {ADMIN_RECENT_LOGS.map((log) => (
          <div key={log.id} className="p-4 rounded-xl bg-[#f7f5f1] border border-[#f3e9db] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#a21f1f] text-xs">{log.author}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-[#f3e9db] text-stone-700 font-semibold">
                  {log.target}
                </span>
              </div>
              <p className="text-xs text-stone-800 font-medium">{log.action}</p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs text-stone-500 font-medium shrink-0">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>{log.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

