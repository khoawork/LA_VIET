import Link from "next/link";
import {
  Globe,
  MessageCircle,
  Share2,
  Send,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

export function AboutFooter() {
  const socials = [
    { name: "Website", icon: Globe, href: "#" },
    { name: "Tin nhắn", icon: MessageCircle, href: "#" },
    { name: "Chia sẻ", icon: Share2, href: "#" },
    { name: "Liên hệ", icon: Send, href: "#" },
  ];

  return (
    <footer className="w-full bg-[#FAF0D9]/80 border-t border-[#E5DAC9] shadow-[0px_-1px_6px_0px_rgba(43,31,26,0.03)]">
      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-12 pt-12 pb-8 flex flex-col gap-10">
        {/* Main 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: Brand & Social (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm border border-[#E5DAC9] bg-white shadow-sm flex items-center justify-center text-[#B71C1C] font-serif font-black text-xs shrink-0">
                <span className="border border-[#B71C1C] px-1 py-0.5">LV</span>
              </div>
              <div className="flex flex-col">
                <span className="text-stone-900 text-xl font-medium uppercase leading-tight">
                  LÀ VIỆT
                </span>
                <span className="text-stone-700 text-xs font-semibold uppercase leading-4 tracking-wider mt-0.5">
                  SƠN MÀI HỘI HOẠ LIÊN NGÀNH
                </span>
              </div>
            </div>

            <p className="text-stone-700 text-sm font-normal leading-6 tracking-tight max-w-sm">
              Kế thừa tinh hoa thủ công truyền thống Việt Nam kết hợp tư duy thiết kế đương đại, Là
              Việt định hình không gian văn hoá và tác phẩm sơn mài chuẩn mực hàn lâm.
            </p>

            <div className="flex flex-col gap-2 pt-2">
              <span className="text-stone-700 text-xs font-semibold uppercase leading-4 tracking-wide">
                KẾT NỐI VỚI CHÚNG TÔI
              </span>
              <div className="flex items-center gap-2">
                {socials.map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <Link
                      key={idx}
                      href={s.href}
                      aria-label={s.name}
                      className="w-9 h-9 bg-orange-100 hover:bg-red-800 text-stone-800 hover:text-white transition-colors rounded-xs flex justify-center items-center border border-[#E5DAC9]/60 shadow-xs"
                    >
                      <Icon className="w-4 h-4" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Hệ thống văn phòng giao dịch (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="text-stone-900 text-sm font-medium uppercase leading-5 tracking-wide">
              HỆ THỐNG VĂN PHÒNG GIAO DỊCH
            </span>

            <div className="flex flex-col gap-4">
              {/* VPGD 1 */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-800 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-stone-900 text-sm font-medium leading-5 tracking-tight">
                    VPGD 1 - TP. HỒ CHÍ MINH
                  </span>
                  <span className="text-stone-700 text-sm font-normal leading-5 tracking-tight mt-0.5">
                    229 Phạm Văn Đồng, Phường 1, Quận Gò Vấp, TP. Hồ Chí Minh
                  </span>
                </div>
              </div>

              {/* VPGD 2 */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-800 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-stone-900 text-sm font-medium leading-5 tracking-tight">
                    VPGD 2 - BÌNH DƯƠNG
                  </span>
                  <span className="text-stone-700 text-sm font-normal leading-5 tracking-tight mt-0.5">
                    184/29 Đường An Phú 18, khu phố Bình Phước B, Phường An Phú, TP. Thuận An, Tỉnh
                    Bình Dương
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Thông tin liên hệ (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <span className="text-stone-900 text-sm font-medium uppercase leading-5 tracking-wide">
              THÔNG TIN LIÊN HỆ
            </span>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-800 shrink-0" />
                <span className="text-stone-700 text-sm font-normal leading-5 tracking-tight">
                  +84 (0) 903 123 456
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-800 shrink-0" />
                <span className="text-stone-700 text-sm font-normal leading-5 tracking-tight">
                  contact@sonmailaviet.vn
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-red-800 shrink-0" />
                <span className="text-stone-700 text-sm font-normal leading-5 tracking-tight">
                  08:30 - 18:00 (Thứ 2 - Thứ 7)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal Links */}
        <div className="pt-6 border-t border-[#E5DAC9] flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="text-stone-700 text-xs sm:text-sm font-normal leading-5 tracking-tight">
            © 2026 CÔNG TY TNHH ỨNG DỤNG LIÊN NGÀNH SƠN MÀI HỘI HOẠ LÀ VIỆT. All rights reserved.
          </div>

          <div className="flex items-center gap-6 text-stone-700 text-xs sm:text-sm font-normal leading-5 tracking-tight">
            <Link href="#" className="hover:text-red-800 transition-colors">
              Chính sách bảo mật
            </Link>
            <Link href="#" className="hover:text-red-800 transition-colors">
              Điều khoản sử dụng
            </Link>
            <Link href="#" className="hover:text-red-800 transition-colors">
              Bảo tồn &amp; Bảo hành
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
