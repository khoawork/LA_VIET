import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#FAF6F0] border-t border-[#EAE2D5] text-[#2A2421] pt-14 pb-8 transition-colors">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Main 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
          {/* Column 1: Thương hiệu, giới thiệu & Mạng xã hội */}
          <div className="md:col-span-12 lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex flex-col group select-none">
              <span className="font-serif font-bold text-xl sm:text-2xl text-[#1E1917] tracking-wider uppercase leading-tight group-hover:text-[#9A1C1F] transition-colors">
                LÀ VIỆT
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-[#695D56] font-medium uppercase mt-0.5">
                SƠN MÀI HỘI HOẠ LIÊN NGÀNH
              </span>
            </Link>

            <p className="text-xs sm:text-[13px] text-[#5C544E] leading-relaxed max-w-sm">
              Kế thừa tinh hoa thủ công truyền thống Việt Nam kết hợp tư duy thiết kế đương đại, Là Việt định hình không gian văn hoá và tác phẩm sơn mài chuẩn mực hàn lâm.
            </p>

            <div className="pt-2">
              <h4 className="text-xs font-bold text-[#1E1917] tracking-wider uppercase mb-3">
                KẾT NỐI VỚI CHÚNG TÔI
              </h4>
              <div className="flex items-center gap-2.5">
                {/* 1. Website / Globe */}
                <a
                  href="#"
                  aria-label="Website"
                  className="w-8 h-8 rounded bg-[#EFE8DC] text-[#423A35] hover:bg-[#9A1C1F] hover:text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                </a>

                {/* 2. Instagram / Camera */}
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded bg-[#EFE8DC] text-[#423A35] hover:bg-[#9A1C1F] hover:text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                {/* 3. Youtube / Video Player */}
                <a
                  href="#"
                  aria-label="Youtube"
                  className="w-8 h-8 rounded bg-[#EFE8DC] text-[#423A35] hover:bg-[#9A1C1F] hover:text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <rect x="2" y="4" width="20" height="16" rx="3" ry="3" />
                    <polygon points="10 9 15 12 10 15 10 9" fill="currentColor" stroke="none" />
                  </svg>
                </a>

                {/* 4. Share */}
                <a
                  href="#"
                  aria-label="Chia sẻ"
                  className="w-8 h-8 rounded bg-[#EFE8DC] text-[#423A35] hover:bg-[#9A1C1F] hover:text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Hệ thống văn phòng giao dịch */}
          <div className="md:col-span-6 lg:col-span-5 space-y-4">
            <h4 className="text-xs sm:text-sm font-bold text-[#1E1917] tracking-wider uppercase">
              HỆ THỐNG VĂN PHÒNG GIAO DỊCH
            </h4>

            <div className="space-y-4">
              {/* VPGD 1 */}
              <div className="flex items-start gap-2.5">
                <span className="text-[#9A1C1F] mt-0.5 shrink-0">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </span>
                <div>
                  <h5 className="font-bold text-xs sm:text-[13px] text-[#1E1917] uppercase tracking-wide">
                    VPGD 1 - TP. HỒ CHÍ MINH
                  </h5>
                  <p className="text-xs sm:text-[13px] text-[#5C544E] mt-0.5 leading-snug">
                    229 Phạm Văn Đồng, Phường 1, Quận Gò Vấp, TP. Hồ Chí Minh
                  </p>
                </div>
              </div>

              {/* VPGD 2 */}
              <div className="flex items-start gap-2.5">
                <span className="text-[#9A1C1F] mt-0.5 shrink-0">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </span>
                <div>
                  <h5 className="font-bold text-xs sm:text-[13px] text-[#1E1917] uppercase tracking-wide">
                    VPGD 2 - BÌNH DƯƠNG
                  </h5>
                  <p className="text-xs sm:text-[13px] text-[#5C544E] mt-0.5 leading-snug">
                    184/29 Đường An Phú 18, khu phố Bình Phước B, Phường An Phú, TP. Thuận An, Tỉnh Bình Dương
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Thông tin liên hệ */}
          <div className="md:col-span-6 lg:col-span-3 space-y-4">
            <h4 className="text-xs sm:text-sm font-bold text-[#1E1917] tracking-wider uppercase">
              THÔNG TIN LIÊN HỆ
            </h4>

            <div className="space-y-2.5 text-xs sm:text-[13px] text-[#5C544E]">
              {/* Phone */}
              <div className="flex items-center gap-2.5">
                <span className="text-[#9A1C1F] shrink-0">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </span>
                <a
                  href="tel:+84903123456"
                  className="hover:text-[#9A1C1F] transition-colors"
                >
                  +84 (0) 903 123 456
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5">
                <span className="text-[#9A1C1F] shrink-0">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </span>
                <a
                  href="mailto:contact@sonmailaviet.vn"
                  className="hover:text-[#9A1C1F] transition-colors"
                >
                  contact@sonmailaviet.vn
                </a>
              </div>

              {/* Time */}
              <div className="flex items-center gap-2.5">
                <span className="text-[#9A1C1F] shrink-0">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                  </svg>
                </span>
                <span>08:30 - 18:00 (Thứ 2 - Thứ 7)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policy Links */}
        <div className="border-t border-[#EAE2D5] mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs text-[#695D56]">
          <p>© 2026 CÔNG TY TNHH ỨNG DỤNG LIÊN NGÀNH SƠN MÀI HỘI HOẠ LÀ VIỆT. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link
              href="#chinh-sach-bao-mat"
              className="hover:text-[#9A1C1F] transition-colors"
            >
              Chính sách bảo mật
            </Link>
            <Link
              href="#dieu-khoan-su-dung"
              className="hover:text-[#9A1C1F] transition-colors"
            >
              Điều khoản sử dụng
            </Link>
            <Link
              href="#bao-ton-bao-hanh"
              className="hover:text-[#9A1C1F] transition-colors"
            >
              Bảo tồn & Bảo hành
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export { Footer };

