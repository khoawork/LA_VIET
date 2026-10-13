import Image from "next/image";
import {
  Beaker,
  Hotel,
  Landmark,
  Building,
  Building2,
  Factory,
  Quote,
} from "lucide-react";

export function AboutPartners() {
  const partners = [
    {
      name: "SƠN HOA VIỆT",
      role: "ĐỐI TÁC R&D KỸ THUẬT",
      icon: Beaker,
      color: "text-red-800 bg-red-800/10",
    },
    {
      name: "VINPEARL RESORTS",
      role: "KHÔNG GIAN VĂN HOÁ ĐẠI SẢNH",
      icon: Hotel,
      color: "text-yellow-800 bg-yellow-800/10",
    },
    {
      name: "BẢO TÀNG MỸ THUẬT",
      role: "GIÁM ĐỊNH & PHỤC CHẾ",
      icon: Landmark,
      color: "text-zinc-600 bg-zinc-600/10",
    },
    {
      name: "PARK HYATT SAIGON",
      role: "BESPOKE SUITE ARTWORKS",
      icon: Building,
      color: "text-red-800 bg-red-800/10",
    },
    {
      name: "MASTERISE HOMES",
      role: "VÁCH TRANG TRÍ SẢNH VIP",
      icon: Building2,
      color: "text-yellow-800 bg-yellow-800/10",
    },
    {
      name: "AA CORPORATION",
      role: "GIA CÔNG BỀ MẶT NỘI THẤT",
      icon: Factory,
      color: "text-zinc-600 bg-zinc-600/10",
    },
  ];

  return (
    <section className="w-full bg-yellow-50/70 border-b border-[#E5DAC9]/60 py-12 lg:py-16">
      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-12 flex flex-col gap-8">
        {/* Section Header */}
        <div className="flex flex-col gap-1">
          <span className="text-red-800 text-xs font-semibold uppercase leading-4 tracking-wider">
            HỢP TÁC &amp; BẢO CHỨNG
          </span>
          <h2 className="text-stone-900 text-2xl sm:text-3xl font-semibold uppercase leading-snug sm:leading-10">
            ĐỐI TÁC CHIẾN LƯỢC &amp; KHÁCH HÀNG DOANH NGHIỆP
          </h2>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {partners.map((partner, idx) => {
            const Icon = partner.icon;
            return (
              <div
                key={idx}
                className="h-32 p-4 bg-white rounded-sm shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#E5DAC9]/40 flex flex-col justify-center items-center text-center gap-1.5 transition-transform hover:-translate-y-0.5"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${partner.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-stone-900 text-xs sm:text-sm font-semibold uppercase leading-tight tracking-tight">
                  {partner.name}
                </div>
                <div className="text-stone-600 text-[10px] sm:text-xs font-normal uppercase leading-tight">
                  {partner.role}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quote Testimonial Card */}
        <div className="p-6 sm:p-8 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#E5DAC9]/50 flex flex-col sm:flex-row items-center sm:items-start gap-6 relative">
          <Quote className="w-12 h-12 text-red-800/10 absolute right-6 top-6 pointer-events-none hidden sm:block" />

          <div className="w-20 h-20 bg-orange-100 rounded-xl overflow-hidden relative shrink-0 border border-[#E5DAC9]">
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
              alt="Hội đồng Cố vấn Thẩm mỹ Sơn mài Việt Nam"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 flex flex-col gap-2 text-center sm:text-left">
            <blockquote className="text-stone-900 text-base sm:text-lg font-medium leading-relaxed">
              “Sơn mài không thể chỉ dừng lại là món quà lưu niệm hay bức tranh đóng khung trên
              tường. Là Việt đang biến sơn mài thành ngôn ngữ của kiến trúc tầm vóc quốc gia.”
            </blockquote>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <span className="text-red-800 text-xs sm:text-sm font-semibold uppercase leading-5 tracking-tight">
                HỘI ĐỒNG CỐ VẤN THẨM MỸ SƠN MÀI VIỆT NAM
              </span>
              <span className="text-stone-900/40 text-base leading-none">•</span>
              <span className="text-stone-700 text-xs sm:text-sm font-normal leading-5 tracking-tight">
                Đánh giá chuyên môn niên khoá 2024
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
