import { Metadata } from "next";
import { AdminProductsView } from "@/views/adminPage/components/modules/admin-products-view";

export const metadata: Metadata = {
  title: "Quản Lý Sản Phẩm | Quản Trị LÀ VIỆT",
  description: "Quản lý 32 tác phẩm sơn mài, bình phong, đại vách Là Việt",
};

export default function AdminProductsPage() {
  return <AdminProductsView />;
}
