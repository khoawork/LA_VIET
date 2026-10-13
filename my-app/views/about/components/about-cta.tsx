import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export function AboutCta() {
  return (
    <section className="w-full relative bg-red-800 overflow-hidden py-12 lg:py-16">
      {/* Background Gradient & Glows */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-800 to-red-800 opacity-95" />
      <div className="w-96 h-96 -right-10 top-0 absolute bg-amber-200/10 rounded-full blur-[48px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row justify-between items-center gap-8">
        {/* Left Column: Heading & Description */}
        <div className="max-w-2xl flex flex-col gap-2 text-center lg:text-left">
          <span className="text-red-200 text-xs font-semibold uppercase leading-4 tracking-wider">
            KHỞI TẠO TÁC PHẨM ĐỘC BẢN
          </span>
          <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold uppercase leading-tight sm:leading-10">
            ĐỒNG HÀNH KIẾN TẠO DỰ ÁN CÙNG
            <br />
            LÀ VIỆT
          </h2>
          <p className="text-white/80 text-sm sm:text-base font-normal leading-6 mt-1">
            Hãy liên hệ với đội ngũ giám tuyển và kỹ sư chuyên môn của chúng tôi để đưa tinh hoa
            sơn mài hội hoạ vào không gian kiến trúc của bạn.
          </p>
        </div>

        {/* Right Column: CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
          <Link
            href="/home#lien-he"
            className="px-6 py-3 bg-white hover:bg-stone-100 text-red-800 text-xs sm:text-sm font-semibold uppercase leading-5 tracking-wide rounded-xs shadow-md transition-all flex items-center gap-2 group"
          >
            <span>ĐẶT LỊCH TƯ VẤN CHUYÊN GIA</span>
            <ArrowRight className="w-4 h-4 text-red-800 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/products"
            className="px-6 py-3 border border-white/40 hover:border-white text-white text-xs sm:text-sm font-semibold uppercase leading-5 tracking-wide rounded-xs transition-all flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-white" />
            <span>XEM CATALOGUE DỰ ÁN</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
