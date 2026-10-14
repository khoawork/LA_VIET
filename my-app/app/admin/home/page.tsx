import { Metadata } from "next";
import { AdminHomeView } from "@/views/adminPage";

export const metadata: Metadata = {
  title: "Quản Lý Trang Chủ | Quản Trị LÀ VIỆT",
  description: "Tùy chỉnh nội dung trang chủ Là Việt",
};

export default function AdminHomePage() {
  return <AdminHomeView />;
}

