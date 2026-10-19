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
      className="sticky top-0 z-30 flex h-14 w-full items-center justify-between gap-2 border-b border-[#f3e9db] bg-white/95 px-2 backdrop-blur-md sm:h-16 sm:px-8"
    >
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex min-w-0 flex-1 items-center gap-1 sm:gap-3">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="shrink-0 rounded-lg p-2 text-[#a21f1f] transition-colors hover:bg-[#f7f5f1] lg:hidden"
          aria-label="Mở menu quản trị"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav className="flex min-w-0 items-center gap-2 text-xs font-semibold text-stone-600">
          <span className="hidden whitespace-nowrap transition-colors hover:text-[#a21f1f] sm:inline">Quản trị</span>
          <ChevronRight className="hidden h-3.5 w-3.5 shrink-0 text-stone-400 sm:block" />
          <span className="block min-w-0 truncate font-bold text-[#a21f1f]">{breadcrumb}</span>
        </nav>
      </div>

      {/* Right: Actions */}
      <div className="flex shrink-0 items-center gap-1 sm:gap-3">
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
          aria-label="Xem website"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-[#f3e9db] bg-[#f7f5f1] px-2 py-1.5 text-xs font-bold uppercase tracking-wider text-stone-800 shadow-xs transition-all hover:border-[#a21f1f] hover:bg-[#a21f1f] hover:text-white sm:px-3.5"
        >
          <span className="hidden sm:inline">Xem website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </header>
  );
}
