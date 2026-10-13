import Link from "next/link";
import { Calendar, Download, Sparkles } from "lucide-react";

export function HomeCta() {
  return (
    <section id="tu-van" className="w-full py-12 lg:py-16 bg-[#FAF5ED]">
      <div className="w-full max-w-[1280px] mx-auto px-6">
        {/* White Card Container with Red Accent Stripe */}
        <div className="relative p-8 sm:p-10 lg:p-12 bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] outline outline-1 outline-[#E5DAC9] -outline-offset-1 overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Left Vertical Accent Line */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#B71C1C]" />

          {/* Left Content */}
          <div className="max-w-[672px] space-y-2 pl-2">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B71C1C]" />
              <span className="text-[#B71C1C] text-[12px] font-bold uppercase tracking-[1.2px] leading-4 block">
                TƯ VẤN GIÁM TUYỂN ĐỘC BẢN
              </span>
            </div>
            <h2 className="text-[#2B1F1A] text-2xl sm:text-3xl lg:text-[32px] font-bold uppercase leading-tight sm:leading-10">
              KHỞI TẠO DỰ ÁN SƠN MÀI CHO KHÔNG GIAN CỦA BẠN
            </h2>
            <p className="text-[#685950] text-[15px] sm:text-[16px] leading-[26px] font-normal pt-1">
              Liên hệ với đội ngũ nghệ nhân và chuyên gia tư vấn kiến trúc của Là Việt để lên phương án thiết kế mẫu thử thực tế và quy trình thi công chuyên biệt.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Link
              href="#tu-van"
              className="px-6 py-3.5 bg-[#B71C1C] text-white text-[14px] font-semibold uppercase tracking-[0.7px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] text-center hover:bg-[#91000A] transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>ĐẶT LỊCH KHẢO SÁT</span>
            </Link>
            <Link
              href="/products"
              className="px-6 py-3.5 bg-[#F3E9DA] text-[#2B1F1A] text-[14px] font-semibold uppercase tracking-[0.7px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] outline outline-1 outline-[#E5DAC9] -outline-offset-1 text-center hover:bg-[#eae0cf] transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>TẢI HỒ SƠ NĂNG LỰC (PDF)</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
