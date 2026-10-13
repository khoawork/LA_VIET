import Image from "next/image";
import {
  Crown,
  Building2,
  Palette,
  FlaskConical,
  Compass,
  ShieldCheck,
} from "lucide-react";

export function AboutOrganization() {
  return (
    <section className="w-full bg-orange-50 border-b border-[#E5DAC9]/60 py-12 lg:py-16">
      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-12 flex flex-col gap-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-red-800 text-xs font-semibold uppercase leading-4 tracking-wider">
            CẤU TRÚC TỔ CHỨC
          </div>
          <h2 className="text-stone-900 text-2xl sm:text-3xl font-semibold uppercase leading-tight sm:leading-10">
            SƠ ĐỒ BỘ MÁY QUẢN TRỊ &amp; SÁNG TÁC
          </h2>
          <p className="text-stone-700 text-sm sm:text-base font-normal leading-6">
            Mô hình kết hợp nhuần nhuyễn giữa Viện thẩm mỹ giám tuyển nghệ thuật, nhà xưởng nghệ
            nhân truyền thống và phòng thí nghiệm vật liệu ứng dụng.
          </p>
        </div>

        {/* Tree Container */}
        <div className="w-full bg-yellow-50 rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#E5DAC9]/60 p-6 lg:p-10 flex flex-col items-center">
          {/* Level 1: Chủ tịch HĐQT & Sáng Lập */}
          <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-md outline outline-1 outline-offset-[-1px] outline-red-800/20 flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="w-28 h-28 shrink-0 p-1 bg-yellow-50 rounded-xl shadow-sm outline outline-2 outline-offset-[-2px] outline-red-800/30 overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                alt="Chủ tịch HĐQT Ông Nguyễn Văn Phan"
                fill
                className="object-cover rounded-xl"
              />
            </div>
            <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left gap-1.5">
              <span className="px-2 py-0.5 bg-red-700 text-white text-[11px] font-semibold uppercase leading-5 tracking-wide rounded-xs">
                CHỦ TỊCH HĐQT &amp; SÁNG LẬP
              </span>
              <h3 className="text-stone-900 text-lg sm:text-xl font-bold uppercase leading-7">
                ÔNG NGUYỄN VĂN PHAN
              </h3>
              <p className="text-stone-700 text-xs font-normal leading-relaxed">
                Định hướng chiến lược tối cao, bảo tồn và phát huy giá trị di sản văn hóa sơn mài
                thuần Việt trong kỷ nguyên mới.
              </p>
              <div className="pt-2">
                <span className="px-2 py-0.5 bg-orange-100 text-red-800 text-xs font-medium uppercase leading-6 rounded-xs inline-flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-red-800" />
                  HỘI ĐỒNG QUẢN TRỊ
                </span>
              </div>
            </div>
          </div>

          {/* Vertical Connecting Line 1 */}
          <div className="w-0.5 h-8 bg-red-200" />

          {/* Level 2: Tổng Giám Đốc Điều Hành */}
          <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-md outline outline-1 outline-offset-[-1px] outline-yellow-500/30 flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="w-28 h-28 shrink-0 p-1 bg-yellow-50 rounded-xl shadow-sm outline outline-2 outline-offset-[-2px] outline-yellow-800/40 overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
                alt="Tổng Giám đốc KTS. Phan Văn Thìn Thọ"
                fill
                className="object-cover rounded-xl"
              />
            </div>
            <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left gap-1.5">
              <span className="px-2 py-0.5 bg-yellow-600 text-white text-[11px] font-semibold uppercase leading-5 tracking-wide rounded-xs">
                TỔNG GIÁM ĐỐC ĐIỀU HÀNH
              </span>
              <h3 className="text-red-800 text-lg sm:text-xl font-bold uppercase leading-7">
                KTS. PHAN VĂN THÌN THỌ
              </h3>
              <p className="text-stone-700 text-xs font-normal leading-relaxed">
                Điều hành tổng thể, tiên phong phát triển các giải pháp kiến trúc, công nghệ bề mặt
                &amp; hội họa liên ngành đỉnh cao.
              </p>
              <div className="pt-2">
                <span className="px-2 py-0.5 bg-orange-100 text-yellow-800 text-xs font-medium uppercase leading-6 rounded-xs inline-flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-yellow-800" />
                  CEO &amp; GIÁM ĐỐC NGHỆ THUẬT
                </span>
              </div>
            </div>
          </div>

          {/* Vertical Connecting Line 2 */}
          <div className="w-0.5 h-8 bg-red-200" />

          {/* Horizontal Connecting Branch */}
          <div className="w-full max-w-4xl h-0.5 bg-red-200 hidden lg:block" />

          {/* Level 3: 4 Khối Ban Giám Đốc */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 lg:pt-0">
            {/* Khối 01 */}
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-6 bg-red-200 hidden lg:block" />
              <div className="w-full h-full p-5 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border-t-2 border-red-800 border-x border-b border-[#E5DAC9]/50 flex flex-col justify-between min-h-[290px]">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="w-8 h-8 bg-red-800/10 rounded-xs flex justify-center items-center">
                      <Palette className="w-4 h-4 text-red-800" />
                    </div>
                    <span className="px-2 py-0.5 bg-orange-100 text-stone-700 text-xs font-semibold uppercase leading-6 rounded-xs">
                      KHỐI 01
                    </span>
                  </div>
                  <h4 className="text-stone-900 text-base font-semibold uppercase leading-snug">
                    GIÁM ĐỐC NGHỆ THUẬT &amp; SÁNG TÁC
                  </h4>
                  <p className="text-stone-700 text-sm font-normal leading-6 tracking-tight">
                    Artistic Director — Chủ trì xưởng chế tác hội họa khổ lớn, nghệ nhân bậc thầy
                    sơn thếp, đắp nổi mài phẳng và cẩn xà cừ.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E5DAC9]/40 flex items-center gap-1.5 text-red-800 text-xs font-medium leading-6">
                  <Palette className="w-3.5 h-3.5 text-red-800" />
                  Atelier &amp; Master Artisans
                </div>
              </div>
            </div>

            {/* Khối 02 */}
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-6 bg-red-200 hidden lg:block" />
              <div className="w-full h-full p-5 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border-t-2 border-yellow-800 border-x border-b border-[#E5DAC9]/50 flex flex-col justify-between min-h-[290px]">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="w-8 h-8 bg-yellow-800/10 rounded-xs flex justify-center items-center">
                      <FlaskConical className="w-4 h-4 text-yellow-800" />
                    </div>
                    <span className="px-2 py-0.5 bg-orange-100 text-stone-700 text-xs font-semibold uppercase leading-6 rounded-xs">
                      KHỐI 02
                    </span>
                  </div>
                  <h4 className="text-stone-900 text-base font-semibold uppercase leading-snug">
                    GIÁM ĐỐC R&amp;D VẬT LIỆU MỚI
                  </h4>
                  <p className="text-stone-700 text-sm font-normal leading-6 tracking-tight">
                    R&amp;D Director — Kỹ thuật sơn công nghệ liên ngành phối hợp chuyên sâu cùng Sơn
                    Hoa Việt, thử nghiệm bám dính và kháng thời tiết.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E5DAC9]/40 flex items-center gap-1.5 text-yellow-800 text-xs font-medium leading-6">
                  <FlaskConical className="w-3.5 h-3.5 text-yellow-800" />
                  High-tech Lab &amp; Chemical Testing
                </div>
              </div>
            </div>

            {/* Khối 03 */}
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-6 bg-red-200 hidden lg:block" />
              <div className="w-full h-full p-5 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border-t-2 border-zinc-600 border-x border-b border-[#E5DAC9]/50 flex flex-col justify-between min-h-[290px]">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="w-8 h-8 bg-zinc-600/10 rounded-xs flex justify-center items-center">
                      <Compass className="w-4 h-4 text-zinc-600" />
                    </div>
                    <span className="px-2 py-0.5 bg-orange-100 text-stone-700 text-xs font-semibold uppercase leading-6 rounded-xs">
                      KHỐI 03
                    </span>
                  </div>
                  <h4 className="text-stone-900 text-base font-semibold uppercase leading-snug">
                    GIÁM ĐỐC TƯ VẤN DỰ ÁN KIẾN TRÚC
                  </h4>
                  <p className="text-stone-700 text-sm font-normal leading-6 tracking-tight">
                    Architectural Project Director — Tư vấn giải pháp nội thất bespoke cho dinh thự,
                    khách sạn resort 5 sao và không gian ngoại giao.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E5DAC9]/40 flex items-center gap-1.5 text-zinc-600 text-xs font-medium leading-6">
                  <Compass className="w-3.5 h-3.5 text-zinc-600" />
                  Bespoke Architectural Studio
                </div>
              </div>
            </div>

            {/* Khối 04 */}
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-6 bg-red-200 hidden lg:block" />
              <div className="w-full h-full p-5 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border-t-2 border-red-700 border-x border-b border-[#E5DAC9]/50 flex flex-col justify-between min-h-[290px]">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="w-8 h-8 bg-red-800/10 rounded-xs flex justify-center items-center">
                      <ShieldCheck className="w-4 h-4 text-red-800" />
                    </div>
                    <span className="px-2 py-0.5 bg-orange-100 text-stone-700 text-xs font-semibold uppercase leading-6 rounded-xs">
                      KHỐI 04
                    </span>
                  </div>
                  <h4 className="text-stone-900 text-base font-semibold uppercase leading-snug">
                    GIÁM ĐỐC THI CÔNG &amp; BẢO TỒN DI SẢN
                  </h4>
                  <p className="text-stone-700 text-sm font-normal leading-6 tracking-tight">
                    Execution &amp; Heritage Director — Quản trị thi công công trình quy mô lớn,
                    kiểm soát vi khí hậu và bảo dưỡng phục hồi định kỳ tác phẩm.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E5DAC9]/40 flex items-center gap-1.5 text-red-800 text-xs font-medium leading-6">
                  <ShieldCheck className="w-3.5 h-3.5 text-red-800" />
                  Execution &amp; Archival Maintenance
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
