import Link from "next/link";

export function HomeCta() {
  return (
    <section id="tu-van" className="w-full pb-24 px-6 sm:px-10 lg:px-16 xl:px-24">
      <div className="w-full rounded-3xl bg-white border-2 border-[#9A221A]/20 p-8 sm:p-12 lg:p-16 shadow-lg">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="text-xs font-bold tracking-[0.22em] text-[#9A221A] uppercase">
              Giải pháp độc bản
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl  font-black text-[#231F20] tracking-tight">
              KHỞI TẠO DỰ ÁN SƠN MÀI CHO KHÔNG GIAN CỦA BẠN
            </h2>
            <p className="text-sm sm:text-base text-[#68625B] leading-relaxed max-w-3xl">
              Liên hệ với đội ngũ chuyên gia của chúng tôi để được tư vấn các giải pháp thiết kế nghệ thuật độc bản, từ tranh treo phòng khánh tiết đến các bức đại bích họa kiến trúc.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-end">
            <Link
              href="/projects"
              className="px-8 py-4 rounded-xl bg-[#9A221A] hover:bg-[#821B14] text-white text-xs font-bold uppercase tracking-[0.14em] text-center transition-all shadow-md hover:shadow-lg"
            >
              Gửi yêu cầu tư vấn
            </Link>
            <Link
              href="/projects"
              className="px-8 py-4 rounded-xl bg-[#FAF7F2] hover:bg-[#EFE8DC] text-[#231F20] border border-[#DCD5C7] text-xs font-bold uppercase tracking-[0.14em] text-center transition-colors"
            >
              Tải Profile Năng Lực
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

