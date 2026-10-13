import Image from "next/image";
import { Layers, History, Building, Users, ShieldCheck, Palette } from "lucide-react";

export function AboutTechnology() {
  return (
    <section className="w-full bg-orange-50 border-b border-[#E5DAC9]/60 py-10 lg:py-14">
      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Narrative & Stats */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col justify-between gap-6 border border-[#E5DAC9]/50">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2">
                <Layers className="w-4 h-4 text-red-800" />
                <span className="text-red-800 text-xs font-semibold uppercase leading-4 tracking-wider">
                  KHÁI LƯỢC HỘI HOẠ LIÊN NGÀNH
                </span>
              </div>

              <h2 className="text-stone-900 text-2xl sm:text-3xl font-semibold uppercase leading-tight sm:leading-10">
                TỪ NHỰA CÂY PHÚ THỌ ĐẾN CÔNG NGHỆ
                <br />
                BỀ MẶT HIỆN ĐẠI
              </h2>

              <p className="text-stone-700 text-sm sm:text-base font-normal leading-6">
                Là Việt được hình thành từ trăn trở giải phóng sơn mài khỏi khuôn khổ tranh treo
                tường thuần tuý. Chúng tôi kế thừa tinh hoa nhựa mủ sơn tự nhiên thu hoạch từ
                vùng gò đồi Phú Thọ – chất liệu có độ sâu quang học và tính cảm xúc mà không
                hoá chất nào thay thế được.
              </p>

              <p className="text-stone-700 text-sm sm:text-base font-normal leading-6">
                Thông qua liên minh chiến lược công nghệ cùng Sơn Hoa Việt, Là Việt mở rộng giới
                hạn của sơn mài truyền thống lên các vật liệu kiến trúc hiện đại: nhôm tấm hàng
                không, sợi thuỷ tinh đúc khổ lớn, đá tự nhiên và thép chịu nhiệt, đáp ứng các tiêu
                chuẩn khắt khe về phòng chống trầy xước, chịu ẩm và kháng tia UV trong nội ngoại
                thất công trình hạng sang.
              </p>
            </div>

            {/* 4 Stats in Yellow Box */}
            <div className="p-4 bg-yellow-50 rounded-sm grid grid-cols-2 sm:grid-cols-4 gap-4 border border-[#E5DAC9]/60">
              <div className="flex flex-col justify-start items-start">
                <History className="w-5 h-5 text-red-800/80 mb-1" />
                <div className="text-red-800 text-3xl sm:text-4xl font-bold leading-9">
                  20+
                </div>
                <div className="pt-1 text-stone-700 text-xs font-semibold uppercase leading-4 tracking-wide">
                  NĂM TÍCH LUỸ NGHỀ
                </div>
              </div>

              <div className="flex flex-col justify-start items-start">
                <Building className="w-5 h-5 text-red-800/80 mb-1" />
                <div className="text-red-800 text-3xl sm:text-4xl font-bold leading-9">
                  120+
                </div>
                <div className="pt-1 text-stone-700 text-xs font-semibold uppercase leading-4 tracking-wide">
                  DỰ ÁN QUY MÔ LỚN
                </div>
              </div>

              <div className="flex flex-col justify-start items-start">
                <Users className="w-5 h-5 text-red-800/80 mb-1" />
                <div className="text-red-800 text-3xl sm:text-4xl font-bold leading-9">
                  40+
                </div>
                <div className="pt-1 text-stone-700 text-xs font-semibold uppercase leading-4 tracking-wide">
                  NGHỆ NHÂN CƠ HỮU
                </div>
              </div>

              <div className="flex flex-col justify-start items-start">
                <ShieldCheck className="w-5 h-5 text-red-800/80 mb-1" />
                <div className="text-red-800 text-3xl sm:text-4xl font-bold leading-9">
                  100%
                </div>
                <div className="pt-1 text-stone-700 text-xs font-semibold uppercase leading-4 tracking-wide">
                  SƠN TA CHÍNH GỐC
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Workshop Image */}
          <div className="lg:col-span-5 min-h-[380px] lg:min-h-[506px] relative bg-stone-900 rounded-lg shadow-md overflow-hidden flex flex-col justify-end">
            <Image
              src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80"
              alt="Xưởng chế tác hội họa sơn mài Là Việt"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/30 to-transparent p-6 flex flex-col justify-end">
              <div className="flex items-center gap-1.5 text-amber-200 text-xs font-semibold uppercase leading-4 tracking-wider">
                <Palette className="w-4 h-4 text-amber-200" />
                <span>XƯỞNG CHẾ TÁC HỘI HỌA</span>
              </div>
              <div className="text-orange-100 text-base sm:text-lg font-medium leading-6 mt-1">
                Bảo tồn kỹ thuật ủ ẩm mùn cưa và mài nước
                <br />
                truyền thống
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
