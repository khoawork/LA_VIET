import type { HomePartnersSectionType } from "../types/pagehome.type";
import { DEFAULT_PAGE_HOME_PROPS } from "../types/pagehome.type";

interface HomePartnersProps {
  data?: HomePartnersSectionType;
}

export function HomePartners({ data = DEFAULT_PAGE_HOME_PROPS.partners }: HomePartnersProps) {
  const partnersList = data.partners && data.partners.length > 0
    ? data.partners
    : DEFAULT_PAGE_HOME_PROPS.partners.partners;

  return (
    <section className="w-full py-20 lg:py-28 px-6 sm:px-10 lg:px-16 xl:px-24">
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <span className="text-xs font-bold tracking-[0.22em] text-[#9A221A] uppercase">
          {data.tagline}
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#231F20] tracking-tight">
          {data.title}
        </h2>
        <p className="text-xs sm:text-sm text-[#68625B] leading-relaxed">
          {data.description}
        </p>
      </div>

      {/* 5 Partner Cards */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {partnersList.map((partner, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-white border border-[#E8E2D5] flex items-center justify-center text-center text-xs font-bold text-[#68625B] hover:text-[#9A221A] hover:border-[#9A221A]/30 transition-all shadow-sm min-h-[100px]"
          >
            {partner}
          </div>
        ))}
      </div>

      {/* Testimonial Banner */}
      <div className="w-full mt-12 p-8 sm:p-10 rounded-2xl bg-white border border-[#E8E2D5] flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-[#9A221A] text-white flex items-center justify-center text-3xl shrink-0 shadow-sm">
          “
        </div>
        <div className="space-y-1.5 text-center md:text-left flex-1">
          <p className="text-sm sm:text-base italic text-[#44403C] leading-relaxed">
            &quot;{data.testimonial?.quote}&quot;
          </p>
          <span className="text-xs font-bold text-[#9A221A] tracking-wider uppercase block pt-1">
            {data.testimonial?.author}
          </span>
        </div>
      </div>
    </section>
  );
}
