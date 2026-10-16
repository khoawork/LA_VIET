import { Metadata } from "next";
import { AdminUsersView } from "@/views/adminPage/components/modules/admin-users-view";

export const metadata: Metadata = {
  title: "Hệ Thống: Tài Khoản & Phân Quyền | Quản Trị LÀ VIỆT",
  description: "Quản trị danh sách nhân sự và phân quyền quản trị",
};

export default function AdminUsersPage() {
  return <AdminUsersView />;
}
