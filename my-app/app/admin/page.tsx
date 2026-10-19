import { Metadata } from "next";
import { AdminDashboard } from "@/views/adminPage/components/admin-dashboard";

export const metadata: Metadata = {
  title: "Bảng Điều Khiển Quản Trị | LÀ VIỆT",
  description: "Khu vực quản trị nội dung và hệ thống Là Việt",
};

export default function AdminRootPage() {
  return <AdminDashboard />;
}
