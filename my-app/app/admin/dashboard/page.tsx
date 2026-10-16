import { Metadata } from "next";
import { AdminDashboard } from "@/views/adminPage/components/admin-dashboard";

export const metadata: Metadata = {
  title: "Bảng Điều Khiển Quản Trị | LÀ VIỆT",
  description: "Theo dõi nội dung, tác phẩm và yêu cầu gửi đến Là Việt",
};

export default function AdminDashboardPage() {
  return <AdminDashboard />;
}
