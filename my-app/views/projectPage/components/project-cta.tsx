import Link from "next/link";

export function ProjectCta() {
  return (
    <section className="mb-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#690E12] via-[#851619] to-[#600C10] text-white p-8 sm:p-10 lg:p-12 shadow-2xl">
        {/* Subtle decorative glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Left info column */}
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-200/90">
              <svg className="w-4 h-4 fill-current text-rose-300" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span>TƯ VẤN KIẾN TRÚC SƯ & GIÁM ĐỐC DỰ ÁN</span>
            </div>

            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight uppercase leading-snug">
              BẠN CẦN GIẢI PHÁP SƠN MÀI CHO CÔNG TRÌNH ĐẲNG CẤP?
            </h2>

            <p className="text-xs sm:text-sm text-rose-100/80 leading-relaxed max-w-xl">
              Đội ngũ chuyên gia kỹ thuật và nghệ nhân của Là Việt sẵn sàng tiếp nhận bản vẽ thiết kế, tư vấn quy cách kỹ thuật và cung cấp tài liệu năng lực hoàn chỉnh trong vòng 24 giờ.
            </p>
          </div>

          {/* Right action buttons column */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3.5 shrink-0">
            {/* Hotline Button */}
            <a
              href="tel:+84903123456"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-white hover:bg-rose-50 text-[#851619] font-bold text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-[0.98]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <span>HOTLINE: +84 (0) 903 123 456</span>
            </a>

            {/* Download Profile PDF Button */}
            <a
              href="#tai-ho-so-nang-luc"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-colors active:scale-[0.98]"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>TẢI HỒ SƠ NĂNG LỰC (PDF)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

