import { Metadata } from "next";
import { AdminContactView } from "@/views/adminPage";

export const metadata: Metadata = {
  title: "Quản Lý Liên Hệ | Quản Trị LÀ VIỆT",
  description: "Quản lý hộp thư và yêu cầu tư vấn từ khách hàng",
};

export default function AdminContactPage() {
  return <AdminContactView />;
}

