import type { Metadata } from "next";
import { AdminCategoriesView } from "@/views/adminPage";

export const metadata: Metadata = {
  title: "Hệ Thống: Danh Mục Dữ Liệu | Quản Trị LÀ VIỆT",
  description: "Quản lý danh mục dữ liệu hệ thống Là Việt",
};

export default function AdminCategoriesPage() {
  return <AdminCategoriesView />;
}
