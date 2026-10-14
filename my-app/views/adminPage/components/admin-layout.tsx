"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "./admin-sidebar";
import { AdminHeader } from "./admin-header";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Xác định tiêu đề breadcrumb theo trang đang chọn
  const getBreadcrumbTitle = () => {
    // 6 trang nội dung website
    if (pathname.includes("/admin/home")) return "Quản lý Trang chủ";
    if (pathname.includes("/admin/about")) return "Quản lý Về chúng tôi";
    if (pathname.includes("/admin/products")) return "Quản lý Sản phẩm";
    if (pathname.includes("/admin/project")) return "Quản lý Dự án";
    if (pathname.includes("/admin/news")) return "Quản lý Tin tức";
    if (pathname.includes("/admin/contact")) return "Quản lý Liên hệ";

    // 6 trang thuộc mục HỆ THỐNG
    if (pathname.includes("/admin/system/categories")) return "Hệ thống: Danh mục dữ liệu";
    if (pathname.includes("/admin/system/users")) return "Hệ thống: Tài khoản & Phân quyền";
    if (pathname.includes("/admin/system/logs")) return "Hệ thống: Nhật ký hoạt động";
    if (pathname.includes("/admin/system/menu")) return "Hệ thống: Menu & Điều hướng";
    if (pathname.includes("/admin/system/forms")) return "Hệ thống: Quản lý Biểu mẫu";
    if (pathname.includes("/admin/system/branding")) return "Hệ thống: Logo & Footer";

    return "Bảng điều khiển";
  };

  return (
    <div
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      className="fixed inset-0 z-50 flex overflow-hidden bg-[#f7f5f1] text-[#1E1917]"
    >
      {/* Sidebar cố định bên trái (màu #a21f1f) - Không bị tải lại khi chọn nav con */}
      <AdminSidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Khu vực nội dung bên phải - Tự động thay đổi theo nav con */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-72"
        }`}
      >
        <AdminHeader
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          breadcrumb={getBreadcrumbTitle()}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#f7f5f1]">
          {children}
        </main>
      </div>
    </div>
  );
}
