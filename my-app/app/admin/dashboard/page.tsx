import { Metadata } from "next";
import { AdminDashboardView } from "@/views/adminPage";

export const metadata: Metadata = {
  title: "Bảng Điều Khiển Quản Trị | LÀ VIỆT",
  description: "Theo dõi nội dung, tác phẩm và yêu cầu gửi đến Là Việt",
};

export default function AdminDashboardPage() {
  return <AdminDashboardView />;
}

