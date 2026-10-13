import Image from "next/image";
import { Crown, Building2, Palette, FlaskConical, Compass, ShieldCheck } from "lucide-react";
import { ORG_LEADERS, ORG_DIVISIONS } from "../services/about.services";

export function AboutOrganization() {
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
        return null;
    }
  };

  return (
    <section className="mb-10 sm:mb-12">
      <div className="flex flex-col gap-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[#9A1C1F] text-xs font-bold uppercase tracking-[0.2em] block">
            CẤU TRÚC TỔ CHỨC
          </span>
          <h2 className="text-[#1E1917] text-2xl sm:text-3xl font-bold uppercase leading-snug">
            SƠ ĐỒ BỘ MÁY QUẢN TRỊ &amp; SÁNG TÁC
          </h2>
          <p className="text-[#5C544E] text-xs sm:text-sm font-normal leading-relaxed">
            Mô hình kết hợp nhuần nhuyễn giữa Viện thẩm mỹ giám tuyển nghệ thuật, nhà xưởng nghệ nhân truyền thống và phòng thí nghiệm vật liệu ứng dụng.
          </p>
        </div>

        {/* Tree Container */}
        <div className="w-full bg-[#FAF7F2] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-[#EAE2D5] p-6 lg:p-10 flex flex-col items-center">
          {/* Level 1: Chủ tịch HĐQT */}
          {ORG_LEADERS[0] && (
            <div className="w-full max-w-lg p-5 bg-white rounded-2xl shadow-sm border border-[#EAE2D5] flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden relative border-2 border-[#9A1C1F]/30 shadow-xs">
                <Image
                  src={ORG_LEADERS[0].avatar}
                  alt={ORG_LEADERS[0].name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left gap-1">
                <span className="px-2.5 py-0.5 bg-[#9A1C1F] text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
                  {ORG_LEADERS[0].role}
                </span>
                <h3 className="text-[#1E1917] text-lg font-bold uppercase mt-1">
                  {ORG_LEADERS[0].name}
                </h3>
                <p className="text-[#5C544E] text-xs font-normal leading-relaxed">
                  {ORG_LEADERS[0].bio}
                </p>
                <div className="pt-2">
                  <span className="px-2.5 py-1 bg-[#FAF1EC] text-[#9A1C1F] text-xs font-semibold uppercase rounded-md inline-flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5 text-[#9A1C1F]" />
                    {ORG_LEADERS[0].tag}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Vertical Connecting Line 1 */}
          <div className="w-0.5 h-7 bg-[#EAE2D5]" />

          {/* Level 2: Tổng Giám Đốc */}
          {ORG_LEADERS[1] && (
            <div className="w-full max-w-lg p-5 bg-white rounded-2xl shadow-sm border border-[#EAE2D5] flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden relative border-2 border-[#96671E]/30 shadow-xs">
                <Image
                  src={ORG_LEADERS[1].avatar}
                  alt={ORG_LEADERS[1].name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left gap-1">
                <span className="px-2.5 py-0.5 bg-[#96671E] text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
                  {ORG_LEADERS[1].role}
                </span>
                <h3 className="text-[#9A1C1F] text-lg font-bold uppercase mt-1">
                  {ORG_LEADERS[1].name}
                </h3>
                <p className="text-[#5C544E] text-xs font-normal leading-relaxed">
                  {ORG_LEADERS[1].bio}
                </p>
                <div className="pt-2">
                  <span className="px-2.5 py-1 bg-[#F9F5EC] text-[#96671E] text-xs font-semibold uppercase rounded-md inline-flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#96671E]" />
                    {ORG_LEADERS[1].tag}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Vertical Connecting Line 2 */}
          <div className="w-0.5 h-7 bg-[#EAE2D5]" />

          {/* Horizontal Connecting Branch */}
          <div className="w-full max-w-4xl h-0.5 bg-[#EAE2D5] hidden lg:block" />

          {/* Level 3: 4 Khối Ban Giám Đốc */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-4 lg:pt-0">
            {ORG_DIVISIONS.map((div) => (
              <div key={div.code} className="flex flex-col items-center">
                <div className="w-0.5 h-6 bg-[#EAE2D5] hidden lg:block" />
                <div className={`w-full h-full p-5 bg-white rounded-2xl shadow-sm border-t-2 ${div.accentBorder} border-x border-b border-[#EAE2D5] flex flex-col justify-between min-h-[280px]`}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="w-8 h-8 bg-[#FAF1EC] rounded-lg flex justify-center items-center">
                        {getDivisionIcon(div.code)}
                      </div>
                      <span className="px-2 py-0.5 bg-[#FAF7F2] text-[#695D56] text-[11px] font-bold uppercase tracking-wider rounded-md">
                        {div.code}
                      </span>
                    </div>

                    <h4 className="text-[#1E1917] text-sm font-bold uppercase leading-snug">
                      {div.title}
                    </h4>

                    <p className="text-[#5C544E] text-xs font-normal leading-relaxed">
                      {div.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#EAE2D5]/70 flex items-center gap-1.5 text-[#695D56] text-xs font-semibold">
                    <span>{div.focus}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
