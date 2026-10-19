import { Metadata } from "next";
import { AdminProjectsView } from "@/views/adminPage/components/modules/admin-projects-view";

export const metadata: Metadata = {
  title: "Quản Lý Dự Án | Quản Trị LÀ VIỆT",
  description: "Quản lý danh sách 24 công trình resort, đại sảnh, dinh thự tiêu biểu",
};

export default function AdminProjectPage() {
  return <AdminProjectsView />;
}
