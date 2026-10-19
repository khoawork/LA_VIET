"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  Home,
  Info,
  Package,
  FolderKanban,
  Newspaper,
  Mail,
  Database,
  Users,
  History,
  Menu as MenuIcon,
  FileText,
  LayoutTemplate,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { ADMIN_NAV_SECTIONS, ADMIN_USER } from "../services/admin.services";

interface AdminSidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function AdminSidebar({
  collapsed = false,
  onToggleCollapse,
  mobileOpen = false,
  onCloseMobile,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<{
    fullname: string;
    role: string;
    avatar?: string | null;
  } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.data?.user) {
          setCurrentUser(data.data.user);
        }
      })
      .catch(() => {});
  }, []);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    router.push("/admin/login");
    router.refresh();
  }

  const getIcon = (iconName: string) => {
    const props = { className: "w-4 h-4 shrink-0" };
    switch (iconName) {
      case "LayoutGrid":
        return <LayoutGrid {...props} />;
      case "Home":
        return <Home {...props} />;
      case "Info":
        return <Info {...props} />;
      case "Package":
        return <Package {...props} />;
      case "FolderKanban":
        return <FolderKanban {...props} />;
      case "Newspaper":
        return <Newspaper {...props} />;
      case "Mail":
        return <Mail {...props} />;
      case "Database":
        return <Database {...props} />;
      case "Users":
        return <Users {...props} />;
      case "History":
        return <History {...props} />;
      case "Menu":
        return <MenuIcon {...props} />;
      case "FileText":
        return <FileText {...props} />;
      case "LayoutTemplate":
        return <LayoutTemplate {...props} />;
      default:
        return <LayoutGrid {...props} />;
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container with Image 2 Palette: #a21f1f */}
      <aside
        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-[#a21f1f] text-white transition-all duration-300 border-r border-[#851619] shadow-xl ${
          collapsed ? "w-20" : "w-72"
        } ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header / Logo */}
        <div className="h-20 flex items-center justify-between px-5 border-b border-[#851619] shrink-0 bg-[#8f1a1a]">
          <Link href="/admin/dashboard" className="flex items-center gap-3 overflow-hidden">
            {/* Lacquer Brand Seal Icon using #d1a25b */}
            <div className="w-10 h-10 rounded-full bg-[#d1a25b] text-[#a21f1f] flex items-center justify-center font-black text-sm shrink-0 shadow-md border-2 border-white/20">
              LV
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-sm tracking-wide uppercase truncate leading-tight text-white">
                  LÀ VIỆT
                </span>
                <span className="text-[10px] text-[#f3e9db] uppercase tracking-widest font-semibold mt-0.5">
                  KHU VỰC QUẢN TRỊ
                </span>
              </div>
            )}
          </Link>

          {/* Collapse Button */}
          <button
            type="button"
            onClick={onToggleCollapse}
            title={collapsed ? "Mở rộng thanh menu" : "Thu gọn thanh menu"}
            className="hidden lg:flex w-8 h-8 rounded-lg bg-black/20 hover:bg-black/30 text-[#f3e9db] items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft
              className={`w-4 h-4 transition-transform duration-300 ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto py-5 px-3 space-y-6 scrollbar-thin scrollbar-thumb-white/20">
          {ADMIN_NAV_SECTIONS.map((section) => (
            <div key={section.title} className="space-y-1">
              {!collapsed && (
                <div className="px-3 pb-2 text-[11px] font-bold tracking-widest uppercase text-[#f3e9db]/85">
                  {section.title}
                </div>
              )}

              <nav className="space-y-1">
                {section.items
                  .filter((item) => {
                    // Chỉ có ADMIN mới thấy tab Tài khoản & Phân quyền, các role khác không thấy
                    if (item.href === "/admin/system/users") {
                      return currentUser?.role === "ADMIN";
                    }
                    return true;
                  })
                  .map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.id === "dashboard" &&
                      (pathname === "/admin" || pathname === "/admin/dashboard"));

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                        isActive
                          ? "bg-black/25 text-white shadow-sm font-bold border-l-4 border-[#d1a25b]"
                          : "text-white/90 hover:bg-black/15 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {getIcon(item.icon)}
                        {!collapsed && <span className="truncate">{item.label}</span>}
                      </div>

                      {!collapsed && item.badge && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            isActive
                              ? "bg-[#d1a25b] text-[#5A0B0E]"
                              : "bg-black/20 text-[#f3e9db] border border-white/10"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom User Profile Card */}
        <div className="p-3 border-t border-[#851619] shrink-0 bg-[#851619]">
          <div className="flex items-center justify-between gap-3 p-2 rounded-xl">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-[#d1a25b] text-[#5A0B0E] flex items-center justify-center font-bold text-sm shrink-0 shadow-inner">
                {currentUser?.fullname
                  ? currentUser.fullname.slice(0, 1).toUpperCase()
                  : ADMIN_USER.avatarText}
              </div>
              {!collapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-white truncate leading-tight">
                    {currentUser?.fullname || ADMIN_USER.name}
                  </span>
                  <span className="text-[10px] text-[#f3e9db] font-medium uppercase tracking-wider truncate">
                    {currentUser?.role === "ADMIN"
                      ? "Quản Trị Viên (Admin)"
                      : currentUser?.role === "MANAGER"
                      ? "Quản Lý (Manager)"
                      : ADMIN_USER.role}
                  </span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleLogout}
              title="Đăng xuất khỏi trang quản trị"
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-black/20 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
