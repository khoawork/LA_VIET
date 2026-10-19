import { Sparkles, Award } from "lucide-react";
import type { AboutHeroSectionType } from "@/shared/schema/pages/about-product.schema";

interface AboutHeroProps {
  data?: AboutHeroSectionType;
}

export function AboutHero({ data }: AboutHeroProps) {
  const badge = data?.badge || "SƠN MÀI HỘI HOẠ LIÊN NGÀNH";
  const heading =
    data?.heading ||
    "HÀNH TRÌNH TÔN VINH DI SẢN SƠN MÀI TRONG KHÔNG GIAN ĐƯƠNG ĐẠI";
  const description =
    data?.description ||
    "Công ty TNHH Ứng dụng Liên ngành Sơn mài Hội hoạ Là Việt kết hợp nền tảng nhựa mủ sơn ta Phú Thọ nguyên bản cùng các thành tựu vật liệu mới, tạo lập cầu nối giữa di sản hội hoạ hàn lâm và thực tiễn kiến trúc quy mô lớn.";
  const sealSubtitle = data?.imageSubtitle || "ẤN TRIỆN LÀ VIỆT";
  const sealTitle = data?.imageTitle || "LÀ VIỆT";

  return (
    <section className="relative overflow-hidden bg-white rounded-2xl border border-[#EAE2D5]/90 p-8 sm:p-10 lg:p-12 shadow-[0_2px_8px_rgba(0,0,0,0.02)] mb-8 sm:mb-10">
      {/* Subtle Ambient Glows */}
      <div className="w-96 h-96 -top-20 -right-20 absolute bg-[#9A1C1F]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="w-80 h-80 bottom-0 left-1/3 absolute bg-[#96671E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
        {/* Left Column: Heading & Mission Narrative */}
        <div className="lg:col-span-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF1EC] border border-[#F2C2BB]/40 text-[#9A1C1F] text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>{badge}</span>
          </div>

          <h1 className="flex flex-col tracking-tight text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-[#1E1917] leading-tight sm:leading-[1.15]">
            <span>{heading}</span>
          </h1>

          <p className="text-[#5C544E] text-base sm:text-lg leading-relaxed font-normal max-w-3xl">
            {description}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <span className="h-1 w-12 rounded-full bg-[#9A1C1F]" />
            <span className="h-1 w-4 rounded-full bg-[#96671E]" />
            <span className="h-1 w-2 rounded-full bg-[#EAE2D5]" />
          </div>
        </div>

        {/* Right Column: Seal Stamp Card */}
        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <div className="w-full max-w-xs p-5 bg-[#FAF7F2] rounded-2xl shadow-sm border border-[#EAE2D5] relative group">
            <div className="relative aspect-square w-full bg-[#FAF0D9]/80 rounded-xl p-5 flex flex-col justify-center items-center overflow-hidden border border-[#E5DAC9]/80">
              {/* Traditional Lacquer Seal Stamp Graphic */}
              <div className="w-36 h-36 rounded-xl border-4 border-[#9A1C1F] bg-[#9A1C1F]/5 flex flex-col items-center justify-center text-[#9A1C1F] p-3 -rotate-1 group-hover:rotate-0 transition-transform duration-500 shadow-sm">
                <div className="border border-[#9A1C1F] w-full h-full flex flex-col items-center justify-center font-sans  text-3xl tracking-tighter leading-none select-none">
                  {sealTitle.split(" ").map((word, i) => (
                    <span key={i}>{word}</span>
                  ))}
                </div>
              </div>

              {/* Badge Bottom Right */}
              <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-white/95 rounded-md shadow-xs border border-[#E5DAC9] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#9A1C1F]" />
                <span className="text-[#695D56] text-[11px] font-bold uppercase tracking-wider">
                  {sealSubtitle}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
