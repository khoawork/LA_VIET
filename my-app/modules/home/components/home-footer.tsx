export function HomeFooter() {
  return (
    <footer id="lien-he" className="w-full bg-[#EFE8DC] border-t border-[#DDD3C2] pt-16 pb-12 px-6 sm:px-10 lg:px-16 xl:px-24">
      <div className="w-full space-y-12">
        <div className="grid md:grid-cols-12 gap-10 xl:gap-16">
          {/* Brand column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded border border-[#9A221A] flex items-center justify-center bg-[#9A221A]/10 text-[#9A221A] font-serif font-bold text-xl">
                LV
              </div>
              <div>
                <span className="font-serif font-black tracking-[0.2em] text-lg text-[#231F20] leading-none">
                  LÃ VIỆT
                </span>
                <span className="text-[10px] tracking-[0.3em] text-[#9A221A] font-medium uppercase block mt-0.5">
                  Sơn mài truyền thống
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#68625B] leading-relaxed max-w-md">
              Bảo tồn và phát huy tinh hoa sơn mài truyền thống Việt Nam. Kiến tạo các tác phẩm độc bản và giải pháp nghệ thuật không gian đẳng cấp quốc tế.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 pt-2">
              {["FB", "IG", "YT", "LI"].map((item) => (
                <span
                  key={item}
                  className="w-9 h-9 rounded-full border border-[#D5C9B5] bg-white/70 flex items-center justify-center text-[10px] font-bold text-[#68625B] hover:text-[#9A221A] hover:border-[#9A221A] cursor-pointer transition-colors shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Contact info columns */}
          <div className="md:col-span-7">
            <h3 className="text-sm font-serif font-bold uppercase tracking-[0.16em] text-[#231F20] mb-4">
              Thông tin liên hệ &amp; Văn phòng
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-white/70 border border-[#DCD3C0] space-y-1">
                <span className="font-bold text-[#9A221A] uppercase tracking-wider block text-[10px]">
                  Trụ sở &amp; Trưng bày
                </span>
                <p className="text-[#44403C]">
                  Số 188 Đường Cổ Loa, Quận Ba Đình, Hà Nội
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/70 border border-[#DCD3C0] space-y-1">
                <span className="font-bold text-[#9A221A] uppercase tracking-wider block text-[10px]">
                  Xưởng chế tác
                </span>
                <p className="text-[#44403C]">
                  Làng nghề Chuyên Mỹ, Phú Xuyên, Hà Nội
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/70 border border-[#DCD3C0] space-y-1">
                <span className="font-bold text-[#9A221A] uppercase tracking-wider block text-[10px]">
                  Hotline &amp; Tư vấn
                </span>
                <p className="text-[#44403C] font-mono font-semibold">
                  (+84) 912 345 678
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/70 border border-[#DCD3C0] space-y-1">
                <span className="font-bold text-[#9A221A] uppercase tracking-wider block text-[10px]">
                  Email dự án
                </span>
                <p className="text-[#44403C] font-mono">
                  contact@lavietsonmai.vn
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="border-t border-[#DDD3C2] pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#78716C] gap-3">
          <p>© 2026 LÃ VIỆT SƠN MÀI. Giữ toàn bộ bản quyền.</p>
          <p>Thiết kế &amp; Phát triển bởi Đội ngũ Công nghệ Lã Việt</p>
        </div>
      </div>
    </footer>
  );
}

