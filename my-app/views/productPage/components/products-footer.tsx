import Link from "next/link";
import {
  Globe,
  MessageCircle,
  Share2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export function ProductsFooter() {
  const socialLinks = [
    { name: "Website", icon: Globe, href: "#" },
    { name: "Tin nhắn", icon: MessageCircle, href: "#" },
    { name: "Chia sẻ", icon: Share2, href: "#" },
    { name: "Email", icon: Mail, href: "mailto:contact@sonmailaviet.vn" },
  ];

  return (
    <footer className="w-full bg-[#FAF6EE] border-t border-[#E5DCD0]">
      <div className="w-full max-w-[1280px] mx-auto px-6 py-10 space-y-10">
        {/* Main Columns */}
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Brand Left Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-[2px] border border-[#E5DCD0] bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] flex items-center justify-center text-[#B71C1C] font-serif font-black text-xs shrink-0">
                <span className="border border-[#B71C1C] px-1 py-0.5">LV</span>
              </div>
              <div className="pl-2 border-l border-[#E5DCD0] flex flex-col justify-center">
                <span className="text-[#B71C1C] text-[16px] font-bold uppercase tracking-[0.8px] leading-none">
                  LÀ VIỆT
                </span>
                <span className="text-[#78665E] text-[10px] font-medium uppercase tracking-[1px] leading-none mt-1">
                  SƠN MÀI HỘI HOẠ LIÊN NGÀNH
                </span>
              </div>
            </div>

            <p className="text-[#61524D] text-[14px] leading-5 font-normal max-w-md">
              Tiên phong kết nối nghệ thuật sơn mài truyền thống Việt Nam với tư duy kiến trúc và nghệ thuật đương đại, kiến tạo không gian sống và các tác phẩm hội hoạ độc bản mang tầm vóc di sản.
            </p>

            {/* Social Links */}
            <div className="pt-2 space-y-2">
              <span className="text-[#B71C1C] text-[11px] font-bold uppercase tracking-[1.1px] block">
                KẾT NỐI VỚI CHÚNG TÔI
              </span>
              <div className="flex items-center gap-2">
                {socialLinks.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      aria-label={item.name}
                      className="w-9 h-9 bg-white outline outline-1 outline-[#D9CEBE] -outline-offset-1 flex items-center justify-center text-xs text-[#61524D] hover:bg-[#B71C1C] hover:text-white transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Right Column */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-[#2B1F1A] text-[16px] font-bold uppercase leading-6 pb-1 border-b border-[#E5DCD0]">
              THÔNG TIN LIÊN HỆ &amp; VĂN PHÒNG
            </h3>

            <div className="grid sm:grid-cols-2 gap-3">
              {/* Office 1 */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B71C1C]" />
                  <span className="text-[#B71C1C] text-[12px] font-bold uppercase tracking-[0.6px]">
                    VPGD 1 - TP. HỒ CHÍ MINH
                  </span>
                </div>
                <p className="text-[#61524D] text-[14px] leading-[22.75px] pl-5">
                  229 Phạm Văn Đồng, Phường 1, Quận Gò Vấp, TP. Hồ Chí Minh
                </p>
              </div>

              {/* Office 2 */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B71C1C]" />
                  <span className="text-[#B71C1C] text-[12px] font-bold uppercase tracking-[0.6px]">
                    VPGD 2 - BÌNH DƯƠNG
                  </span>
                </div>
                <p className="text-[#61524D] text-[14px] leading-[22.75px] pl-5">
                  184/29 Đường An Phú 18, khu phố Bình Phước B, Phường An Phú, TP. Thuận An, Tỉnh Bình Dương
                </p>
              </div>

              {/* Hotline */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#B71C1C]" />
                  <span className="text-[#B71C1C] text-[12px] font-bold uppercase tracking-[0.6px]">
                    ĐƯỜNG DÂY NÓNG
                  </span>
                </div>
                <p className="text-[#2B1F1A] text-[14px] font-semibold leading-5 font-mono pl-5">
                  +84 (0) 903 123 456
                </p>
              </div>

              {/* Email */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#B71C1C]" />
                  <span className="text-[#B71C1C] text-[12px] font-bold uppercase tracking-[0.6px]">
                    THƯ ĐIỆN TỬ
                  </span>
                </div>
                <p className="text-[#2B1F1A] text-[14px] font-semibold leading-5 font-mono truncate pl-5">
                  contact@sonmailaviet.vn
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-4 border-t border-[#E5DCD0] flex flex-col sm:flex-row items-center justify-between text-[#78665E] text-[12px] gap-3">
          <p>© 2026 CÔNG TY TNHH ỨNG DỤNG LIÊN NGÀNH SƠN MÀI HỘI HOẠ LÀ VIỆT. All rights reserved.</p>
          <div className="flex items-center gap-4 font-medium uppercase tracking-[0.6px]">
            <Link href="#" className="hover:text-[#B71C1C]">
              CHÍNH SÁCH BẢO MẬT
            </Link>
            <span className="text-[#D9CEBE]">/</span>
            <Link href="#" className="hover:text-[#B71C1C]">
              ĐIỀU KHOẢN SỬ DỤNG
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
