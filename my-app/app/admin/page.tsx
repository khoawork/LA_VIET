import { Metadata } from "next";
import { AdminDashboardView } from "@/views/adminPage";

export const metadata: Metadata = {
  title: "Bảng Điều Khiển Quản Trị | LÀ VIỆT",
  description: "Khu vực quản trị nội dung và hệ thống Là Việt",
};

export default function AdminRootPage() {
  return <AdminDashboardView />;
}

