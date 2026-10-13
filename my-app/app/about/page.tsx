import { Metadata } from "next";
import { AboutView } from "@/views/about";

export const metadata: Metadata = {
  title: "Về Chúng Tôi | LÀ VIỆT - Sơn Mài Hội Hoạ Liên Ngành",
  description:
    "Hành trình tôn vinh di sản sơn mài trong không gian đương đại. Công ty TNHH Ứng dụng Liên ngành Sơn mài Hội hoạ Là Việt.",
};

export default function AboutPage() {
  return <AboutView />;
}