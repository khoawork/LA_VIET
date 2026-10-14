import { Metadata } from "next";
import { AdminNewsView } from "@/views/adminPage";

export const metadata: Metadata = {
  title: "Quản Lý Tin Tức | Quản Trị LÀ VIỆT",
  description: "Quản lý bài viết nghiên cứu di sản sơn mài, triển lãm và hoạt động",
};

export default function AdminNewsPage() {
  return <AdminNewsView />;
}

