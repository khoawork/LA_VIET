import { Metadata } from "next";
import { Suspense } from "react";
import { AdminLogin } from "@/views/adminPage/components/admin-login";

export const metadata: Metadata = {
  title: "Đăng Nhập Quản Trị | LÀ VIỆT",
  description: "Cổng đăng nhập hệ thống quản lý nội dung và di sản Là Việt",
};

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 bg-[#a21f1f] flex items-center justify-center text-white text-sm font-bold">
          Đang tải trang đăng nhập...
        </div>
      }
    >
      <AdminLogin />
    </Suspense>
  );
}
