import Image from "next/image";
import { Layers, Palette } from "lucide-react";
import type { AboutTechnologySectionType } from "@/shared/schema/pages/about-product.schema";
import { FormattedColorText } from "@/shared/components/formatted-color-text";

interface AboutTechnologyProps {
  data: AboutTechnologySectionType;
}

export function AboutTechnology({ data }: AboutTechnologyProps) {
  const badge = data.badge;
  const heading = data.heading ?? "";
  const description =
    data.description || [data.description1, data.description2].filter(Boolean).join("\n\n");
  const stats = data.stats ?? [];
  const workshopImage = data.workshop?.image;
  const workshopBadge = data.workshop?.badge;
  const workshopCaption = data.workshop?.caption;

  if (!badge && !heading && !description && !workshopImage && stats.length === 0) return null;

  return (
    <section className="mb-10 sm:mb-12">
      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Workshop Image */}
        {workshopImage && <div className="lg:col-span-5 min-h-[380px] lg:min-h-[500px] relative bg-stone-900 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-end border border-[#EAE2D5]/80">
          <Image
            src={workshopImage}
            alt={workshopBadge || heading}
            fill
            className="object-cover"
          />
          {(workshopBadge || workshopCaption) && <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-6 sm:p-8 flex flex-col justify-end">
            {workshopBadge && <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Palette className="w-4 h-4 text-amber-300" />
              <span>{workshopBadge}</span>
            </div>}
            {workshopCaption && <div className="text-white text-base sm:text-lg font-medium leading-relaxed mt-1">
              {workshopCaption}
            </div>}
          </div>}
        </div>}

        {/* Right Column: Narrative & Stats */}
        <div className={`${workshopImage ? "lg:col-span-7" : "lg:col-span-12"} p-6 sm:p-8 lg:p-10 bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between gap-6 border border-[#EAE2D5]/90`}>
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 text-[#9A1C1F]">
              <Layers className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                {badge}
              </span>
            </div>

            <h2 className="text-[#1E1917] text-2xl sm:text-3xl font-bold uppercase leading-tight">
              <FormattedColorText text={heading} as="span" />
            </h2>

            <div className="text-[#5C544E] text-sm sm:text-base font-normal leading-relaxed whitespace-pre-line space-y-3">
              <FormattedColorText text={description} as="div" />
            </div>
          </div>

          {/* 4 Stats */}
          {stats.length > 0 && <div className="p-5 bg-[#FAF7F2] rounded-xl grid grid-cols-2 sm:grid-cols-4 gap-4 border border-[#EAE2D5]">
            {stats.map((stat, idx) => (
              <div key={stat.id || idx} className="flex flex-col justify-start items-start">
                <div className="flex items-baseline">
                  <span
                    className={`text-3xl sm:text-4xl  tracking-tight leading-none ${
                      stat.accentColor || "text-[#9A1C1F]"
                    }`}
                  >
                    {stat.value}
                  </span>
                  {stat.unit && (
                    <span className="text-xl sm:text-2xl font-bold ml-0.5 text-[#9A1C1F]">
                      {stat.unit}
                    </span>
                  )}
                </div>
                <div className="pt-2 text-[#695D56] text-[11px] font-bold uppercase tracking-wider leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>}
        </div>
      </div>
    </section>
  );
}
