import { Metadata } from "next";
import { AdminBrandingView } from "@/views/adminPage/components/modules/admin-branding-view";

export const metadata: Metadata = {
  title: "Hệ Thống: Logo & Footer | Quản Trị LÀ VIỆT",
  description: "Cấu hình thương hiệu và chân trang website",
};

export default function AdminBrandingPage() {
  return <AdminBrandingView />;
}
