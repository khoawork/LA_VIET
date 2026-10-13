import Link from "next/link";
import { Home, ChevronRight, Sparkles } from "lucide-react";

export function AboutHero() {
  return (
    <section className="w-full bg-[#FAF7F2] border-b border-[#E5DAC9]">
      {/* Breadcrumb Bar */}
      <div className="w-full bg-white border-b border-[#E5DAC9]/60 px-6 lg:px-12 py-2.5">
        <div className="w-full max-w-[1280px] mx-auto flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide">
          <Link
            href="/home"
            className="flex items-center gap-1.5 text-stone-700 hover:text-red-800 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>TRANG CHỦ</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-red-800">VỀ CHÚNG TÔI</span>
        </div>
      </div>

      {/* Hero Section Container */}
      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-12 py-12 lg:py-16 relative overflow-hidden">
        {/* Subtle Ambient Glows */}
        <div className="w-96 h-96 -top-20 right-0 absolute bg-red-800/5 rounded-full blur-[48px] pointer-events-none" />
        <div className="w-80 h-80 bottom-10 left-1/3 absolute bg-yellow-800/5 rounded-full blur-[32px] pointer-events-none" />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
          {/* Left: Heading & Description */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="flex flex-col tracking-tight text-4xl sm:text-5xl lg:text-6xl font-semibold uppercase leading-tight sm:leading-[64px]">
              <span className="text-stone-900">HÀNH TRÌNH TÔN VINH</span>
              <span className="text-red-800 my-1">DI SẢN SƠN MÀI</span>
              <span className="text-stone-900">TRONG KHÔNG GIAN ĐƯƠNG ĐẠI</span>
            </h1>

            <p className="text-stone-700 text-base sm:text-lg leading-7 font-normal max-w-2xl">
              Công ty TNHH Ứng dụng Liên ngành Sơn mài Hội hoạ Là Việt kết hợp nền tảng nhựa mủ sơn ta Phú Thọ nguyên bản cùng các thành tựu vật liệu mới, tạo lập cầu nối giữa di sản hội hoạ hàn lâm và thực tiễn kiến trúc quy mô lớn.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <div className="w-2 h-2 bg-stone-700/30 rounded-full" />
              <div className="w-2 h-2 bg-stone-700/30 rounded-full" />
            </div>
          </div>

          {/* Right: Seal Stamp Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md border border-[#E5DAC9]/60 relative group">
              <div className="relative aspect-square w-full bg-[#FAF0D9]/60 rounded-sm p-4 flex flex-col justify-center items-center overflow-hidden border border-[#E5DAC9]">
                {/* Traditional Lacquer Seal Stamp Graphic */}
                <div className="w-36 h-36 rounded-lg border-4 border-red-800 bg-red-800/5 flex flex-col items-center justify-center text-red-800 p-3 rotate-[-1deg] group-hover:rotate-0 transition-transform duration-500 shadow-sm">
                  <div className="border border-red-800 w-full h-full flex flex-col items-center justify-center font-serif font-black text-3xl tracking-tighter leading-none">
                    <span>LÀ</span>
                    <span>VIỆT</span>
                  </div>
                </div>

                {/* Badge Bottom Right */}
                <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-white/90 rounded-xs shadow-sm border border-[#E5DAC9]/60 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-red-800" />
                  <span className="text-stone-700 text-[11px] font-normal uppercase tracking-wide">
                    ẤN TRIỆN LÀ VIỆT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
