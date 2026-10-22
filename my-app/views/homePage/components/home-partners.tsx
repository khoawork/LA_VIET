import type { HomePartnersSectionType } from "../types/pagehome.type";

interface HomePartnersProps {
  data: HomePartnersSectionType;
}

export function HomePartners({ data }: HomePartnersProps) {
  const partnersList = data.partners;

  return (
    <section className="w-full bg-[#f3e9da] pt-8 pb-6 lg:pt-10 lg:pb-8 px-6 sm:px-10 lg:px-16 xl:px-24">
      <div className="text-center max-w-3xl mx-auto mb-6 space-y-3">
        <span className="block text-xs font-bold tracking-[0.22em] text-[#9A221A] uppercase">
          {data.tagline}
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#231F20] tracking-tight">
          {data.title}
        </h2>
        <p className="text-xs sm:text-sm text-[#68625B] leading-relaxed">
          {data.description}
        </p>
      </div>

      <div className="w-full flex flex-wrap justify-center">
        {partnersList.map((partner, i) => (
          <div key={i} className="w-1/2 sm:w-1/3 lg:w-1/5 p-1">
            <div className="h-full p-4 bg-white border border-[#E8E2D5] flex flex-col items-center justify-center text-center hover:border-[#9A221A]/30 transition-all shadow-sm min-h-[90px]">
              <span className="text-xs font-bold text-[#231F20] uppercase">
                {partner.name}
              </span>
              {partner.subtitle && (
                <span className="text-[10px] font-semibold text-[#68625B] uppercase mt-1">
                  {partner.subtitle}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {(data.testimonial.quote || data.testimonial.author) && (
        <div className="w-full max-w-5xl mx-auto mt-7 p-6 sm:p-7 bg-white border border-[#E8E2D5] flex flex-col md:flex-row items-center gap-5 shadow-sm">
          <div className="w-14 h-14 bg-[#9A221A] text-white flex items-center justify-center text-3xl shrink-0 shadow-sm">
            “
          </div>
          <div className="space-y-1.5 text-center md:text-left flex-1">
            {data.testimonial.quote && (
              <p className="text-sm sm:text-base italic text-[#44403C] leading-relaxed">
                &quot;{data.testimonial.quote}&quot;
              </p>
            )}
            <span className="text-xs font-bold text-[#9A221A] tracking-wider uppercase block pt-1">
              {data.testimonial.author}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
