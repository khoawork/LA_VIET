"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Sun, Moon, ExternalLink, ChevronRight, Bell } from "lucide-react";

interface AdminHeaderProps {
  onOpenMobileSidebar?: () => void;
  breadcrumb?: string;
}

export function AdminHeader({
  onOpenMobileSidebar,
  breadcrumb = "Bảng điều khiển",
}: AdminHeaderProps) {
  const [isDark, setIsDark] = useState(false);

  return (
    <header
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      className="sticky top-0 z-30 h-16 w-full bg-white/95 backdrop-blur-md border-b border-[#f3e9db] px-4 sm:px-8 flex items-center justify-between"
    >
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-[#a21f1f] hover:bg-[#f7f5f1] transition-colors"
          aria-label="Mở menu quản trị"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav className="flex items-center gap-2 text-xs font-semibold text-stone-600">
          <span className="hover:text-[#a21f1f] transition-colors">Quản trị</span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-[#a21f1f] font-bold">{breadcrumb}</span>
        </nav>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <button
          type="button"
          aria-label="Thông báo"
          className="relative p-2 rounded-full text-stone-600 hover:text-[#a21f1f] hover:bg-[#f7f5f1] transition-colors cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#a21f1f]" />
        </button>

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-full border border-[#f3e9db] text-stone-700 hover:bg-[#f7f5f1] transition-colors cursor-pointer"
          title={isDark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-[#d1a25b]" />
          ) : (
            <Moon className="w-4 h-4 text-stone-700" />
          )}
        </button>

        {/* View Public Website Link */}
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#f3e9db] bg-[#f7f5f1] hover:border-[#a21f1f] hover:text-white hover:bg-[#a21f1f] text-stone-800 text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
        >
          <span>Xem website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </header>
  );
}
