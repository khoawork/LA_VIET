"use client";

import { ShieldCheck } from "lucide-react";
import { AdminStats } from "./admin-stats";
import { AdminContentGrid } from "./admin-content-grid";
import { AdminActivityLogs } from "./admin-activity-logs";
import { ADMIN_USER } from "../services/admin.services";

export function AdminDashboard() {
  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif" }} className="space-y-6 sm:space-y-8">
      {/* Greeting Banner with rectangular gradient block (Đen - Đỏ) as specified in Image 2 */}
      <section className="rounded-2xl border border-[#f3e9db] p-6 sm:p-8 shadow-md relative overflow-hidden bg-gradient-to-r from-black via-[#380b0d] to-[#a21f1f] text-white">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#d1a25b]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d1a25b]">
              <span>— KHÔNG GIAN QUẢN TRỊ</span>
            </div>
            {/* Đề mục lớn nhất dùng gradient đen - đỏ như chỉ định */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl  tracking-tight text-white drop-shadow-sm">
              Chào mừng, {ADMIN_USER.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#f3e9db]/90 leading-relaxed font-normal">
              Theo dõi nội dung, tác phẩm và các yêu cầu tư vấn gửi đến hệ sinh thái Là Việt.
            </p>
          </div>

          {/* Role Badge with #d1a25b and #f3e9db */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-[#d1a25b]/40 text-[#f3e9db] text-xs font-bold tracking-wide shrink-0 self-start md:self-center shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#d1a25b]" />
            <span>Vai trò: {ADMIN_USER.name}</span>
          </div>
        </div>
      </section>

      {/* 4 Core Website Stats Cards */}
      <section>
        <AdminStats />
      </section>

      {/* Bottom Split: Content Grid (left) + Activity Logs (right) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8">
          <AdminContentGrid />
        </div>
        <div className="lg:col-span-4">
          <AdminActivityLogs />
        </div>
      </section>
    </div>
  );
}
