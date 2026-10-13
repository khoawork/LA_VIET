import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function HomeHero() {
  return (
    <section className="relative w-full bg-[#FAF5ED] border-b border-[#E5DAC9] overflow-hidden">
      {/* Background Image Layer with Blend and Gradient */}
      <div className="absolute inset-0 opacity-25 mix-blend-multiply pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1920&q=80"
          alt="Không gian trưng bày sơn mài Là Việt"
          fill
          priority
          className="object-cover object-right"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#FAF5ED_0%,rgba(250,245,237,0.85)_50%,rgba(250,245,237,0)_100%)] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 py-16 lg:pt-24 lg:pb-20 flex flex-col justify-between min-h-[760px]">
        {/* Top & Middle Content */}
        <div className="max-w-[896px]">
          {/* Accent Line */}
          <div className="w-8 h-[2px] bg-[#B71C1C] mb-6" />

          {/* Heading */}
          <h1 className="flex flex-col tracking-tight mb-6">
            <span className="text-[#2B1F1A] text-3xl sm:text-4xl lg:text-[52px] font-bold uppercase leading-tight sm:leading-[58px]">
              NÂNG TẦM NGHỆ THUẬT
            </span>
            <span className="text-[#B71C1C] text-3xl sm:text-4xl lg:text-[52px] font-bold uppercase underline leading-tight sm:leading-[58px] my-1">
              SƠN MÀI TRUYỀN THỐNG
            </span>
            <span className="text-[#2B1F1A] text-3xl sm:text-4xl lg:text-[52px] font-bold uppercase leading-tight sm:leading-[58px]">
              TRONG KHÔNG GIAN ĐƯƠNG ĐẠI
            </span>
          </h1>

          {/* Description */}
          <p className="text-[#685950] text-base sm:text-[18px] leading-[29px] max-w-[672px] mb-8 font-normal">
            Là Việt định hình bước chuyển dịch tiên phong của chất liệu sơn ta truyền thống từ tranh giá vẽ sang các ứng dụng phù điêu, mảng tường kiến trúc và cấu kiện nghệ thuật không gian chuẩn mực quốc tế, trường tồn cùng thời gian.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/products"
              className="px-6 py-3.5 bg-[#B71C1C] text-white text-[14px] font-semibold uppercase tracking-[0.7px] shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),0px_4px_6px_-1px_rgba(0,0,0,0.1)] flex items-center gap-2 hover:bg-[#91000A] transition-colors group"
            >
              <span>KHÁM PHÁ BỘ SƯU TẬP</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="px-6 py-3.5 bg-white text-[#2B1F1A] text-[14px] font-semibold uppercase tracking-[0.7px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] outline outline-1 outline-[#E5DAC9] -outline-offset-1 flex items-center gap-2 hover:bg-[#FAF5ED] transition-colors group"
            >
              <span>TÌM HIỂU VỀ LÀ VIỆT</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Bottom Floating Stats Card */}
        <div className="w-full mt-14 bg-white/90 backdrop-blur-[6px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] outline outline-1 outline-[#E5DAC9] -outline-offset-1 p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E5DAC9]/60">
          {/* Item 1 */}
          <div className="flex flex-col justify-start">
            <span className="text-[#685950] text-[12px] font-semibold uppercase tracking-[0.6px] leading-4 block">
              CHẤT LIỆU GỐC
            </span>
            <span className="text-[#2B1F1A] text-[20px] font-semibold leading-7 mt-1 block">
              Sơn Ta Phú Thọ
            </span>
          </div>

          {/* Item 2 */}
          <div className="sm:pl-4 pt-4 sm:pt-0 flex flex-col justify-start">
            <span className="text-[#685950] text-[12px] font-semibold uppercase tracking-[0.6px] leading-4 block">
              KỸ THUẬT TẠO TÁC
            </span>
            <span className="text-[#2B1F1A] text-[20px] font-semibold leading-7 mt-1 block">
              Mài đa tầng &amp; Dát quỳ
            </span>
          </div>

          {/* Item 3 */}
          <div className="sm:pl-4 pt-4 sm:pt-0 flex flex-col justify-start">
            <span className="text-[#685950] text-[12px] font-semibold uppercase tracking-[0.6px] leading-4 block">
              ỨNG DỤNG TIÊU BIỂU
            </span>
            <span className="text-[#2B1F1A] text-[20px] font-semibold leading-7 mt-1 block">
              Đại sảnh &amp; Resort 5*
            </span>
          </div>

          {/* Item 4 */}
          <div className="sm:pl-4 pt-4 sm:pt-0 flex flex-col justify-start">
            <span className="text-[#685950] text-[12px] font-semibold uppercase tracking-[0.6px] leading-4 block">
              CHỨNG NHẬN KIỂM ĐỊNH
            </span>
            <span className="text-[#B71C1C] text-[20px] font-bold leading-7 mt-1 block">
              Di sản Độc bản
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
