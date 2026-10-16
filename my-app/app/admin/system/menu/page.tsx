import { Metadata } from "next";
import { AdminMenuView } from "@/views/adminPage/components/modules/admin-menu-view";

export const metadata: Metadata = {
  title: "Hệ Thống: Menu & Điều Hướng | Quản Trị LÀ VIỆT",
  description: "Cấu hình thanh điều hướng Header website",
};

export default function AdminMenuPage() {
  return <AdminMenuView />;
}
