import Link from "next/link";
import {
  Globe,
  MessageCircle,
  Share2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export function HomeFooter() {
  const socialLinks = [
    { name: "Website", icon: Globe, href: "#" },
    { name: "Tin nhắn", icon: MessageCircle, href: "#" },
    { name: "Chia sẻ", icon: Share2, href: "#" },
    { name: "Email", icon: Mail, href: "mailto:contact@sonmailaviet.vn" },
  ];

  return (
    <footer
      id="lien-he"
      className="w-full bg-[#F3E9DA] border-t border-[#E5DAC9]"
    >
      <div className="w-full max-w-[1280px] mx-auto px-6 py-10 lg:py-12 space-y-10">
        {/* Main Grid: Left Brand & Right Offices */}
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left Column: Brand & Social */}
          <div className="lg:col-span-5 space-y-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-[2px] border border-[#E5DAC9] bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] flex items-center justify-center text-[#B71C1C] font-serif font-black text-xs shrink-0">
                <span className="border border-[#B71C1C] px-1 py-0.5">LV</span>
              </div>
              <div className="pl-2 border-l border-[#E5DAC9] flex flex-col justify-center">
                <span className="text-[#B71C1C] text-[20px] font-bold uppercase tracking-[1px] leading-none">
                  LÀ VIỆT
                </span>
                <span className="text-[#685950] text-[12px] font-semibold uppercase tracking-[1.2px] leading-none mt-1">
                  SƠN MÀI HỘI HOẠ LIÊN NGÀNH
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-[#685950] text-[15px] sm:text-[16px] leading-[26px] max-w-md font-normal">
              Tiên phong kết nối nghệ thuật sơn mài truyền thống Việt Nam với tư duy kiến trúc và nghệ thuật đương đại, kiến tạo không gian sống và các tác phẩm hội hoạ độc bản mang tầm vóc di sản.
            </p>

            {/* Social Links */}
            <div className="pt-2 space-y-2">
              <span className="text-[#B71C1C] text-[12px] font-bold uppercase tracking-[1.2px] block">
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
                      className="w-9 h-9 bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] outline outline-1 outline-[#E5DAC9] -outline-offset-1 flex items-center justify-center text-[#2B1F1A] hover:text-white hover:bg-[#B71C1C] transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Offices */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-[#2B1F1A] text-[20px] font-bold leading-7 pb-1 border-b border-[#E5DAC9]">
              Thông tin liên hệ &amp; Văn phòng
            </h3>

            <div className="grid sm:grid-cols-2 gap-3">
              {/* Office 1 */}
              <div className="p-3 bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] outline outline-1 outline-[#E5DAC9] -outline-offset-1 space-y-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B71C1C]" />
                  <span className="text-[#B71C1C] text-[13px] font-bold uppercase tracking-[0.65px] leading-[18px]">
                    VPGD 1 - TP. HỒ CHÍ MINH
                  </span>
                </div>
                <p className="text-[#2B1F1A] text-[14px] leading-[22px] tracking-[0.14px] pl-5">
                  229 Phạm Văn Đồng, Phường 1, Quận Gò Vấp, TP. Hồ Chí Minh
                </p>
              </div>

              {/* Office 2 */}
              <div className="p-3 bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] outline outline-1 outline-[#E5DAC9] -outline-offset-1 space-y-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B71C1C]" />
                  <span className="text-[#B71C1C] text-[13px] font-bold uppercase tracking-[0.65px] leading-[18px]">
                    VPGD 2 - BÌNH DƯƠNG
                  </span>
                </div>
                <p className="text-[#2B1F1A] text-[14px] leading-[22px] tracking-[0.14px] pl-5">
                  184/29 Đường An Phú 18, khu phố Bình Phước B, Phường An Phú, TP. Thuận An, Tỉnh Bình Dương
                </p>
              </div>

              {/* Hotline */}
              <div className="p-3 bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] outline outline-1 outline-[#E5DAC9] -outline-offset-1 space-y-1">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#B71C1C]" />
                  <span className="text-[#B71C1C] text-[13px] font-bold uppercase tracking-[0.65px] leading-[18px]">
                    ĐƯỜNG DÂY NÓNG
                  </span>
                </div>
                <p className="text-[#2B1F1A] text-[16px] font-semibold leading-6 font-mono pl-5">
                  +84 (0) 903 123 456
                </p>
              </div>

              {/* Email */}
              <div className="p-3 bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] outline outline-1 outline-[#E5DAC9] -outline-offset-1 space-y-1">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#B71C1C]" />
                  <span className="text-[#B71C1C] text-[13px] font-bold uppercase tracking-[0.65px] leading-[18px]">
                    THƯ ĐIỆN TỬ
                  </span>
                </div>
                <p className="text-[#2B1F1A] text-[16px] font-semibold leading-6 font-mono truncate pl-5">
                  contact@sonmailaviet.vn
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-4 border-t border-[#E5DAC9] flex flex-col sm:flex-row items-center justify-between text-[#685950] text-[13px] sm:text-[14px] leading-5 gap-3">
          <p>© 2026 CÔNG TY TNHH ỨNG DỤNG LIÊN NGÀNH SƠN MÀI HỘI HOẠ LÀ VIỆT. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[12px] font-semibold uppercase tracking-[0.6px]">
            <Link href="#" className="hover:text-[#B71C1C]">
              CHÍNH SÁCH BẢO MẬT
            </Link>
            <span className="text-[#D8CBBA]">/</span>
            <Link href="#" className="hover:text-[#B71C1C]">
              ĐIỀU KHOẢN SỬ DỤNG
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
