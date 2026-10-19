import { HomeView } from "@/views/homePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LÀ VIỆT | Sơn Mài Hội Họa Liên Ngành",
  description:
    "Nâng tầm nghệ thuật sơn mài truyền thống trong không gian đương đại. Bích họa sơn mài khổ lớn, vách trang trí kiến trúc và nội thất cao cấp.",
};

export default function HomePage() {
  return <HomeView />;
}