"use client";

import { usePathname } from "next/navigation";
import { AdminLayout } from "@/views/adminPage";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Màn hình đăng nhập hiển thị toàn màn hình, không kèm sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Khung layout cố định sidebar bên trái, chỉ hoán đổi nội dung bên phải khi chọn nav con
  return <AdminLayout>{children}</AdminLayout>;
}

