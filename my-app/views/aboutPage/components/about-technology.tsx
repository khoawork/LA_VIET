import Image from "next/image";
import { Layers, Palette } from "lucide-react";
import { ABOUT_STATS } from "../services/about.services";
import type { AboutTechnologySectionType } from "@/shared/schema/pages/about-product.schema";

interface AboutTechnologyProps {
  data?: AboutTechnologySectionType;
}

export function AboutTechnology({ data }: AboutTechnologyProps) {
  const badge = data?.badge || "KHÁI LƯỢC HỘI HOẠ LIÊN NGÀNH";
  const heading = data?.heading || "TỪ NHỰA CÂY PHÚ THỌ ĐẾN CÔNG NGHỆ BỀ MẶT HIỆN ĐẠI";
  const desc1 =
    data?.description1 ||
    "Là Việt được hình thành từ trăn trở giải phóng sơn mài khỏi khuôn khổ tranh treo tường thuần tuý. Chúng tôi kế thừa tinh hoa nhựa mủ sơn tự nhiên thu hoạch từ vùng gò đồi Phú Thọ – chất liệu có độ sâu quang học và tính cảm xúc mà không hoá chất nào thay thế được.";
  const desc2 =
    data?.description2 ||
    "Thông qua liên minh chiến lược công nghệ cùng Sơn Hoa Việt, Là Việt mở rộng giới hạn của sơn mài truyền thống lên các vật liệu kiến trúc hiện đại: nhôm tấm hàng không, sợi thuỷ tinh đúc khổ lớn, đá tự nhiên và thép chịu nhiệt, đáp ứng các tiêu chuẩn khắt khe về phòng chống trầy xước, chịu ẩm và kháng tia UV trong nội ngoại thất công trình hạng sang.";
  const stats = data?.stats && data.stats.length > 0 ? data.stats : ABOUT_STATS;
  const workshopImage =
    data?.workshop?.image ||
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80";
  const workshopBadge = data?.workshop?.badge || "XƯỞNG CHẾ TÁC HỘI HỌA";
  const workshopCaption =
    data?.workshop?.caption || "Bảo tồn kỹ thuật ủ ẩm mùn cưa và mài nước truyền thống";

  return (
    <section className="mb-10 sm:mb-12">
      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Workshop Image */}
        <div className="lg:col-span-5 min-h-[380px] lg:min-h-[500px] relative bg-stone-900 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-end border border-[#EAE2D5]/80">
          <Image
            src={workshopImage}
            alt="Xưởng chế tác hội họa sơn mài Là Việt"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-6 sm:p-8 flex flex-col justify-end">
            <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Palette className="w-4 h-4 text-amber-300" />
              <span>{workshopBadge}</span>
            </div>
            <div className="text-white text-base sm:text-lg font-medium leading-relaxed mt-1">
              {workshopCaption}
            </div>
          </div>
        </div>

        {/* Right Column: Narrative & Stats */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between gap-6 border border-[#EAE2D5]/90">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 text-[#9A1C1F]">
              <Layers className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                {badge}
              </span>
            </div>

            <h2 className="text-[#1E1917] text-2xl sm:text-3xl font-bold uppercase leading-tight">
              {heading}
            </h2>

            <p className="text-[#5C544E] text-sm sm:text-base font-normal leading-relaxed">
              {desc1}
            </p>

            <p className="text-[#5C544E] text-sm sm:text-base font-normal leading-relaxed">
              {desc2}
            </p>
          </div>

          {/* 4 Stats */}
          <div className="p-5 bg-[#FAF7F2] rounded-xl grid grid-cols-2 sm:grid-cols-4 gap-4 border border-[#EAE2D5]">
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
          </div>
        </div>
      </div>
    </section>
  );
}
