import { Metadata } from "next";
import { AdminContactView } from "@/views/adminPage/components/modules/admin-contact-view";

export const metadata: Metadata = {
  title: "Quản Lý Liên Hệ | Quản Trị LÀ VIỆT",
  description: "Chỉnh sửa nội dung trang Liên hệ",
};

export default function AdminContactPage() {
  return <AdminContactView />;
}
