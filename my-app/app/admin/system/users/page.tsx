import { Metadata } from "next";
import { AdminUsersView } from "@/views/adminPage";

export const metadata: Metadata = {
  title: "Hệ Thống: Tài Khoản & Phân Quyền | Quản Trị LÀ VIỆT",
  description: "Quản trị danh sách nhân sự và phân quyền quản trị",
};

export default function AdminUsersPage() {
  return <AdminUsersView />;
}

