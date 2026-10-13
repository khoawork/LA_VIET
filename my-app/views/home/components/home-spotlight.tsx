import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, Layers } from "lucide-react";

const stages = [
  { step: "CÔNG ĐOẠN 01", name: "Hom - Kẹp Vải Cổ Truyền" },
  { step: "CÔNG ĐOẠN 02", name: "Vẽ Lớp & Dát Vàng Quỳ" },
  { step: "CÔNG ĐOẠN 03", name: "Mài Nước Đa Tầng" },
  { step: "CÔNG ĐOẠN 04", name: "Quang Dầu & Đánh Bóng" },
];

export function HomeSpotlight() {
  return (
    <section className="w-full py-12 lg:py-16 bg-[#FAF5ED] border-b border-[#E5DAC9]">
      <div className="w-full max-w-[1280px] mx-auto px-6">
        {/* White Card Wrapper */}
        <div className="p-8 sm:p-10 lg:p-12 bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] outline outline-1 outline-[#E5DAC9] -outline-offset-1 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left Column: Image with floating badge */}
          <div className="relative w-full">
            <div className="relative w-full aspect-[4/3] bg-[#F3E9DA] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] outline outline-1 outline-[#E5DAC9] -outline-offset-1 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80"
                alt="Nghệ nhân Là Việt thi công sơn mài"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating Badge */}
            <div className="sm:absolute -bottom-5 sm:right-6 mt-4 sm:mt-0 p-4 bg-[#B71C1C] outline outline-1 outline-[#91000A] -outline-offset-1 shadow-lg flex items-center gap-3">
              <div className="w-9 h-9 p-1 bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] flex items-center justify-center font-serif font-black text-[#B71C1C] text-xs">
                LV
              </div>
              <div className="flex flex-col">
                <span className="text-white text-[12px] font-bold uppercase tracking-[0.6px] leading-4">
                  BẢO CHỨNG SƠN MÀI
                </span>
                <span className="text-[#FAF0D9] text-[12px] font-medium tracking-[0.6px] leading-4">
                  100% Sơn Ta Chuẩn Thổ
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & 4 Stages */}
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#B71C1C]" />
                <span className="text-[#B71C1C] text-[12px] font-bold uppercase tracking-[1.2px]">
                  KỸ NGHỆ CHẾ TÁC
                </span>
              </div>
              <h2 className="text-[#2B1F1A] text-2xl sm:text-3xl lg:text-[32px] font-bold uppercase leading-tight sm:leading-10">
                LIÊN NGÀNH NGHỆ THUẬT: TỪ SƠN HOM ĐẾN KIẾN TRÚC KHÔNG GIAN
              </h2>
            </div>

            <p className="text-[#685950] text-[15px] sm:text-[16px] leading-[26px] font-normal">
              Mỗi tác phẩm của Là Việt trải qua từ 15 đến 20 công đoạn mài ủ khắt khe kéo dài từ 3 đến 6 tháng. Sự kết hợp giữa nhựa cây sơn tự nhiên, quỳ vàng 9999, quỳ bạc, vỏ trứng và các chất nền hợp kim nhẹ cho phép tranh sơn mài mở rộng quy mô trên những mặt tiền vòm cong và không gian đón tiếp sang trọng.
            </p>

            {/* 4 Process Stages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {stages.map((stg) => (
                <div
                  key={stg.step}
                  className="p-3 bg-[#F3E9DA] outline outline-1 outline-[#E5DAC9] -outline-offset-1 space-y-0.5 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#B71C1C] text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.6px] leading-4 block">
                      {stg.step}
                    </span>
                    <Layers className="w-3.5 h-3.5 text-[#B71C1C]/60" />
                  </div>
                  <span className="text-[#2B1F1A] text-[15px] sm:text-[16px] font-semibold leading-6 block">
                    {stg.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Link */}
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[#B71C1C] text-[14px] font-semibold uppercase tracking-[0.7px] hover:underline group"
              >
                <span>KHÁM PHÁ QUY TRÌNH XƯỞNG SẢN XUẤT</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
