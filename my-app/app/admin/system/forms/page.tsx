import { Metadata } from "next";
import { AdminFormsView } from "@/views/adminPage/components/modules/admin-forms-view";

export const metadata: Metadata = {
  title: "Hệ Thống: Quản Lý Biểu Mẫu | Quản Trị LÀ VIỆT",
  description: "Cấu hình biểu mẫu và đồng bộ dữ liệu",
};

export default function AdminFormsPage() {
  return <AdminFormsView />;
}
