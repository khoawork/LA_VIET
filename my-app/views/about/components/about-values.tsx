import { Globe, Sparkles, ShieldCheck, CheckCircle2, ArrowUpRight } from "lucide-react";

export function AboutValues() {
  return (
    <section className="w-full bg-orange-50 border-b border-[#E5DAC9]/60 pb-12 pt-2">
      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Tầm nhìn */}
          <div className="p-6 relative bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col justify-between border border-[#E5DAC9]/50 overflow-hidden min-h-[380px]">
            {/* Top gradient accent line */}
            <div className="w-full h-1.5 left-0 top-0 absolute bg-gradient-to-r from-red-800 via-red-800/80 to-red-800/0" />

            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-sm flex justify-center items-center">
                <Globe className="w-6 h-6 text-red-800" />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-stone-700 text-xs font-semibold uppercase leading-4 tracking-wider">
                  TẦM NHÌN ĐƯƠNG ĐẠI
                </span>
                <h3 className="text-stone-900 text-xl font-medium uppercase leading-7">
                  TỔ HỢP SƠN MÀI HÀNG ĐẦU KHU VỰC
                </h3>
              </div>

              <p className="text-stone-700 text-sm font-normal leading-6 tracking-tight">
                Trở thành tổ hợp sáng tạo sơn mài hội họa liên ngành tiên phong tại Đông Nam Á, thiết lập tiêu chuẩn thẩm mỹ mới trong không gian kiến trúc toàn cầu thông qua sự kết hợp tinh tế giữa nghệ thuật thị giác và công nghệ công trình.
              </p>
            </div>

            <div className="pt-6 inline-flex justify-between items-center border-t border-[#E5DAC9]/40 mt-4">
              <span className="text-red-800 text-xs font-semibold uppercase leading-4 tracking-wide">
                ĐỊNH VỊ KHU VỰC &amp; TOÀN CẦU
              </span>
              <ArrowUpRight className="w-4 h-4 text-red-800" />
            </div>
          </div>

          {/* Card 2: Sứ mệnh */}
          <div className="p-6 relative bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col justify-between border border-[#E5DAC9]/50 overflow-hidden min-h-[380px]">
            {/* Top gradient accent line */}
            <div className="w-full h-1.5 left-0 top-0 absolute bg-gradient-to-r from-yellow-500 via-yellow-800 to-yellow-800/0" />

            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-sm flex justify-center items-center">
                <Sparkles className="w-6 h-6 text-yellow-800" />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-stone-700 text-xs font-semibold uppercase tracking-wider">
                  SỨ MỆNH KHỞI SINH
                </span>
                <h3 className="text-stone-900 text-xl font-medium uppercase leading-7">
                  BẢO CHỨNG DI SẢN TRONG ĐỜI SỐNG
                </h3>
              </div>

              <p className="text-stone-700 text-sm font-normal leading-6 tracking-tight">
                Tuyệt đối tôn trọng và gìn giữ quy trình thủ công 12–20 công đoạn nghiêm ngặt; đồng thời không ngừng khai mở các cấu trúc vật liệu lai ghép để chất liệu sơn mài hòa nhịp sinh động cùng phong cách sống hiện đại.
              </p>
            </div>

            <div className="pt-6 inline-flex justify-between items-center border-t border-[#E5DAC9]/40 mt-4">
              <span className="text-yellow-800 text-xs font-semibold uppercase leading-4 tracking-wide">
                BẢO TỒN &amp; TIẾN HOÁ VẬT LIỆU
              </span>
              <ArrowUpRight className="w-4 h-4 text-yellow-800" />
            </div>
          </div>

          {/* Card 3: Giá trị cốt lõi */}
          <div className="p-6 relative bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col justify-between border border-[#E5DAC9]/50 overflow-hidden min-h-[380px]">
            {/* Top gradient accent line */}
            <div className="w-full h-1.5 left-0 top-0 absolute bg-gradient-to-r from-zinc-600 via-zinc-600 to-zinc-600/0" />

            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-sm flex justify-center items-center">
                <ShieldCheck className="w-6 h-6 text-zinc-600" />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-stone-700 text-xs font-semibold uppercase tracking-wider">
                  GIÁ TRỊ CỐT LÕI
                </span>
                <h3 className="text-stone-900 text-xl font-medium uppercase leading-7">
                  4 TRỤ CỘT BỀN VỮNG
                </h3>
              </div>

              {/* 4 Pillars */}
              <div className="flex flex-col gap-2 pt-1">
                <div className="inline-flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-800 shrink-0 mt-0.5" />
                  <p className="text-stone-700 text-sm leading-5 tracking-tight">
                    <strong className="font-bold text-stone-900">Mastery Craft:</strong> Tinh hoa kỹ xảo thủ công sơn ta chuẩn mực.
                  </p>
                </div>

                <div className="inline-flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-800 shrink-0 mt-0.5" />
                  <p className="text-stone-700 text-sm leading-5 tracking-tight">
                    <strong className="font-bold text-stone-900">Interdisciplinary:</strong> Ứng dụng liên ngành vật liệu và kiến trúc.
                  </p>
                </div>

                <div className="inline-flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-800 shrink-0 mt-0.5" />
                  <p className="text-stone-700 text-sm leading-5 tracking-tight">
                    <strong className="font-bold text-stone-900">Bespoke Heritage:</strong> Độc bản hóa từng không gian danh giá.
                  </p>
                </div>

                <div className="inline-flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-800 shrink-0 mt-0.5" />
                  <p className="text-stone-700 text-sm leading-5 tracking-tight">
                    <strong className="font-bold text-stone-900">Timeless Quality:</strong> Độ bền truyền đời cùng năm tháng.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 inline-flex justify-between items-center border-t border-[#E5DAC9]/40 mt-4">
              <span className="text-zinc-600 text-xs font-semibold uppercase leading-4 tracking-wide">
                TIÊU CHUẨN THẨM MỸ KHẮT KHE
              </span>
              <ArrowUpRight className="w-4 h-4 text-zinc-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
