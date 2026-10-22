"use client";

import { usePathname } from "next/navigation";
import { AdminLayout } from "@/views/adminPage/components/admin-layout";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return <AdminLayout>{children}</AdminLayout>;
}
