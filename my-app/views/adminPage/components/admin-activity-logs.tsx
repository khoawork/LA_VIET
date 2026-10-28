import Link from "next/link";
import { History, ArrowRight, Clock } from "lucide-react";
import { ADMIN_RECENT_LOGS } from "../services/admin.services";

export function AdminActivityLogs() {
  return (
    <div
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      className="bg-white rounded-2xl border border-[#e2d3bf] p-6 shadow-xs flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#e2d3bf]">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-[#a21f1f]" />
            <h2 className="text-base font-bold text-[#1E1917]">
              Nhật ký chỉnh sửa gần đây
            </h2>
          </div>
          <Link
            href="/admin/system/logs"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#a21f1f] hover:underline"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Logs List */}
        <div className="space-y-3.5">
          {ADMIN_RECENT_LOGS.map((log) => (
            <div
              key={log.id}
              className="p-3.5 rounded-xl bg-[#f7f5f1] border border-[#e2d3bf] hover:bg-white hover:border-[#a21f1f]/40 transition-all space-y-1"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#a21f1f]">{log.author}</span>
                <span className="text-[11px] text-stone-500 font-medium inline-flex items-center gap-1">
                  <Clock className="w-3 h-3 text-stone-400" />
                  {log.time}
                </span>
              </div>
              <p className="text-xs text-stone-800 leading-relaxed font-medium">
                {log.action}
              </p>
              {log.target && (
                <div className="pt-1">
                  <span className="inline-block text-[10px] font-bold text-[#a21f1f] bg-white px-2 py-0.5 rounded-md border border-[#e2d3bf]">
                    {log.target}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* System Status Footer */}
      <div className="mt-6 pt-4 border-t border-[#e2d3bf] flex items-center justify-between text-xs text-stone-600">
        <span className="inline-flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Máy chủ hoạt động bình thường
        </span>
        <span className="font-bold text-[#d1a25b]">v1.0.0</span>
      </div>
    </div>
  );
}
