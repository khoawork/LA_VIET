import Image from "next/image";
import { Crown, Building2, Palette, FlaskConical, Compass, ShieldCheck } from "lucide-react";
import type { AboutOrganizationSectionType } from "@/shared/schema/pages/about-product.schema";

interface AboutOrganizationProps {
  data: AboutOrganizationSectionType;
}

export function AboutOrganization({ data }: AboutOrganizationProps) {
  const { badge, heading, description } = data;
  const leaders = data.leaders ?? [];
  const divisions = data.divisions ?? [];

  if (leaders.length === 0 && divisions.length === 0) return null;

  const getDivisionIcon = (code: string) => {
    switch (code) {
      case "KHỐI 01":
        return <Palette className="w-4 h-4 text-[#9A1C1F]" />;
      case "KHỐI 02":
        return <FlaskConical className="w-4 h-4 text-[#96671E]" />;
      case "KHỐI 03":
        return <Compass className="w-4 h-4 text-[#4A423D]" />;
      case "KHỐI 04":
        return <ShieldCheck className="w-4 h-4 text-[#9A1C1F]" />;
      default:
        return <Palette className="w-4 h-4 text-[#9A1C1F]" />;
    }
  };

  return (
    <section className="mb-10 sm:mb-12">
      <div className="flex flex-col gap-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[#9A1C1F] text-xs font-bold uppercase tracking-[0.2em] block">
            {badge}
          </span>
          <h2 className="text-[#1E1917] text-2xl sm:text-3xl font-bold uppercase leading-snug">
            {heading}
          </h2>
          <p className="text-[#5C544E] text-xs sm:text-sm font-normal leading-relaxed">
            {description}
          </p>
        </div>

        {/* Tree Container */}
        <div className="w-full bg-[#FAF7F2] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-[#EAE2D5] p-6 lg:p-10 flex flex-col items-center">
          {/* Level 1: Chủ tịch HĐQT */}
          {leaders[0] && (
            <div className="w-full max-w-lg p-5 bg-white rounded-2xl shadow-sm border border-[#EAE2D5] flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden relative border-2 border-[#9A1C1F]/30 shadow-xs">
                {leaders[0].avatar ? (
                  <Image
                    src={leaders[0].avatar}
                    alt={leaders[0].name}
                    fill
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left gap-1">
                <span className="px-2.5 py-0.5 bg-[#9A1C1F] text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
                  {leaders[0].role}
                </span>
                <h3 className="text-[#1E1917] text-lg font-bold uppercase mt-1">
                  {leaders[0].name}
                </h3>
                <p className="text-[#5C544E] text-xs font-normal leading-relaxed">
                  {leaders[0].bio}
                </p>
                <div className="pt-2">
                  <span className="px-2.5 py-1 bg-[#FAF1EC] text-[#9A1C1F] text-xs font-semibold uppercase rounded-md inline-flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5 text-[#9A1C1F]" />
                    {leaders[0].tag}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Vertical Connecting Line 1 */}
          {leaders.length > 1 && <div className="w-0.5 h-7 bg-[#EAE2D5]" />}

          {/* Level 2: Tổng Giám Đốc */}
          {leaders[1] && (
            <div className="w-full max-w-lg p-5 bg-white rounded-2xl shadow-sm border border-[#EAE2D5] flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden relative border-2 border-[#96671E]/30 shadow-xs">
                {leaders[1].avatar ? (
                  <Image
                    src={leaders[1].avatar}
                    alt={leaders[1].name}
                    fill
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left gap-1">
                <span className="px-2.5 py-0.5 bg-[#96671E] text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
                  {leaders[1].role}
                </span>
                <h3 className="text-[#9A1C1F] text-lg font-bold uppercase mt-1">
                  {leaders[1].name}
                </h3>
                <p className="text-[#5C544E] text-xs font-normal leading-relaxed">
                  {leaders[1].bio}
                </p>
                <div className="pt-2">
                  <span className="px-2.5 py-1 bg-[#F9F5EC] text-[#96671E] text-xs font-semibold uppercase rounded-md inline-flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#96671E]" />
                    {leaders[1].tag}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Vertical Connecting Line 2 */}
          {leaders.length > 0 && divisions.length > 0 && <div className="w-0.5 h-7 bg-[#EAE2D5]" />}

          {/* Level 3: 4 Khối chức năng */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full pt-2">
            {divisions.map((div, idx) => (
              <div
                key={div.code || idx}
                className={`p-5 bg-white rounded-2xl shadow-xs border border-[#EAE2D5] border-t-4 ${
                  div.accentBorder || "border-t-[#9A1C1F]"
                } flex flex-col justify-between gap-3`}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9A1C1F]">
                      {div.code}
                    </span>
                    {getDivisionIcon(div.code)}
                  </div>

                  <h4 className="text-[#1E1917] text-sm font-bold uppercase leading-snug">
                    {div.title}
                  </h4>
                  <span className="text-[11px] text-[#8C827A] italic font-medium -mt-1 block">
                    {div.subtitle}
                  </span>

                  <p className="text-[#5C544E] text-xs font-normal leading-relaxed">
                    {div.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EAE2D5]/70">
                  <span className="text-[10px] font-semibold text-[#695D56] uppercase tracking-wider block">
                    {div.focus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
