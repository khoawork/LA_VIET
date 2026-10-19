import { Metadata } from "next";
import { AdminLogin } from "@/views/adminPage/components/admin-login";

export const metadata: Metadata = {
  title: "Đăng Nhập Quản Trị | LÀ VIỆT",
  description: "Cổng đăng nhập hệ thống quản lý nội dung và di sản Là Việt",
};

export default function AdminLoginPage() {
  return <AdminLogin />;
}
