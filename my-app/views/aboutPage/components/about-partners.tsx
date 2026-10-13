import Image from "next/image";
import { Beaker, Hotel, Landmark, Building, Building2, Factory, Quote } from "lucide-react";
import { ABOUT_PARTNERS, ABOUT_TESTIMONIAL } from "../services/about.services";

export function AboutPartners() {
  const getPartnerIcon = (category: string) => {
    switch (category) {
      case "technology":
        return <Beaker className="w-4 h-4 text-[#9A1C1F]" />;
      case "hospitality":
        return <Hotel className="w-4 h-4 text-[#96671E]" />;
      case "heritage":
        return <Landmark className="w-4 h-4 text-[#4A423D]" />;
      case "real-estate":
        return <Building2 className="w-4 h-4 text-[#96671E]" />;
      case "interior":
        return <Factory className="w-4 h-4 text-[#4A423D]" />;
      default:
        return <Building className="w-4 h-4 text-[#9A1C1F]" />;
    }
  };

  return (
    <section className="mb-10 sm:mb-12">
      <div className="flex flex-col gap-8">
        {/* Section Header */}
        <div className="flex flex-col gap-1">
          <span className="text-[#9A1C1F] text-xs font-bold uppercase tracking-[0.2em]">
            HỢP TÁC &amp; BẢO CHỨNG
          </span>
          <h2 className="text-[#1E1917] text-2xl sm:text-3xl font-bold uppercase leading-snug">
            ĐỐI TÁC CHIẾN LƯỢC &amp; KHÁCH HÀNG DOANH NGHIỆP
          </h2>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {ABOUT_PARTNERS.map((partner, idx) => (
            <div
              key={idx}
              className="h-32 p-4 bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-[#EAE2D5] flex flex-col justify-center items-center text-center gap-1.5 transition-transform hover:-translate-y-1 hover:shadow-md"
            >
              <div className="w-9 h-9 rounded-full bg-[#FAF7F2] flex items-center justify-center mb-1 border border-[#EAE2D5]/60">
                {getPartnerIcon(partner.category)}
              </div>
              <div className="text-[#1E1917] text-xs font-bold uppercase tracking-tight">
                {partner.name}
              </div>
              <div className="text-[#695D56] text-[10px] font-medium uppercase leading-tight">
                {partner.role}
              </div>
            </div>
          ))}
        </div>

        {/* Quote Testimonial Card */}
        <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-[#EAE2D5] flex flex-col sm:flex-row items-center sm:items-start gap-6 relative">
          <Quote className="w-12 h-12 text-[#9A1C1F]/10 absolute right-6 top-6 pointer-events-none hidden sm:block" />

          <div className="w-20 h-20 rounded-2xl overflow-hidden relative shrink-0 border border-[#EAE2D5] shadow-xs">
            <Image
              src={ABOUT_TESTIMONIAL.avatar}
              alt={ABOUT_TESTIMONIAL.organization}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 flex flex-col gap-2 text-center sm:text-left">
            <blockquote className="text-[#1E1917] text-base sm:text-lg font-medium leading-relaxed italic">
              {ABOUT_TESTIMONIAL.quote}
            </blockquote>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
              <span className="text-[#9A1C1F] text-xs sm:text-sm font-bold uppercase tracking-wider">
                {ABOUT_TESTIMONIAL.organization}
              </span>
              <span className="text-[#EAE2D5] text-base leading-none">•</span>
              <span className="text-[#695D56] text-xs sm:text-sm font-normal">
                {ABOUT_TESTIMONIAL.note}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
