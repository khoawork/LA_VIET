import { ArrowUpRight, CheckCircle2, Globe, Sparkles, ShieldCheck } from "lucide-react";
import type { AboutValuesSectionType } from "@/shared/schema/pages/about-product.schema";

interface AboutValuesProps {
  data: AboutValuesSectionType;
}

export function AboutValues({ data }: AboutValuesProps) {
  const items = data.items ?? [];

  if (items.length === 0) return null;

  const getIcon = (id: string) => {
    switch (id) {
      case "vision":
        return <Globe className="w-5 h-5 text-[#9A1C1F]" />;
      case "mission":
        return <Sparkles className="w-5 h-5 text-[#96671E]" />;
      case "core-values":
        return <ShieldCheck className="w-5 h-5 text-[#4A423D]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#9A1C1F]" />;
    }
  };

  return (
    <section className="mb-10 sm:mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((val) => (
          <div
            key={val.id}
            className="p-6 sm:p-7 relative bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between border border-[#EAE2D5]/90 overflow-hidden hover:shadow-md transition-shadow min-h-[380px]"
          >
            {/* Top gradient accent line */}
            <div
              className={`w-full h-1.5 left-0 top-0 absolute bg-gradient-to-r ${
                val.gradient || "from-[#9A1C1F] via-[#9A1C1F]/80 to-transparent"
              }`}
            />

            <div className="flex flex-col gap-4">
              <div className="w-11 h-11 bg-[#FAF1EC] rounded-xl flex justify-center items-center shadow-xs">
                {getIcon(val.id)}
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[#695D56] text-xs font-bold uppercase tracking-wider">
                  {val.category}
                </span>
                <h3 className="text-[#1E1917] text-lg sm:text-xl font-bold uppercase leading-snug">
                  {val.title}
                </h3>
              </div>

              <p className="text-[#5C544E] text-xs sm:text-sm font-normal leading-relaxed">
                {val.description}
              </p>

              {val.pillars && val.pillars.length > 0 && (
                <div className="flex flex-col gap-2 pt-1">
                  {val.pillars.map((pillar, idx) => (
                    <div key={idx} className="inline-flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#9A1C1F] shrink-0 mt-0.5" />
                      <p className="text-[#5C544E] text-xs leading-relaxed">
                        {pillar}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-6 inline-flex justify-between items-center border-t border-[#EAE2D5]/70 mt-4">
              <span
                className={`text-xs font-bold uppercase tracking-wider ${
                  val.accentColor || "text-[#9A1C1F]"
                }`}
              >
                {val.tag}
              </span>
              <ArrowUpRight
                className={`w-4 h-4 ${val.accentColor || "text-[#9A1C1F]"}`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
