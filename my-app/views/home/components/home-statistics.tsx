import { Landmark, Ruler, Handshake, Star, Sparkles } from "lucide-react";

const statsData = [
  {
    category: "THỜI GIAN HÌNH THÀNH",
    stat: "15+",
    title: "Năm kiến tạo & gìn giữ",
    desc: "Kế thừa phương pháp sơn hom truyền thống, phát triển quy chuẩn thích ứng khí hậu hiện đại.",
    icon: Landmark,
  },
  {
    category: "QUY MÔ CÔNG TRÌNH",
    stat: "120+",
    title: "Tác phẩm & Công trình",
    desc: "Các vách ngăn phù điêu, tranh đại sảnh và đồ nội thất nghệ thuật liên ngành hoàn thiện bàn giao.",
    icon: Ruler,
  },
  {
    category: "MẠNG LƯỚI HỢP TÁC",
    stat: "45+",
    title: "Đối tác chiến lược",
    desc: "Tập đoàn khách sạn, công ty tư vấn kiến trúc hàng đầu và các nhà sưu tập tư nhân quốc tế.",
    icon: Handshake,
  },
  {
    category: "CHẤT LƯỢNG KHẮT KHE",
    stat: "98%",
    title: "Đánh giá xuất sắc",
    desc: "Tỉ lệ hài lòng tuyệt đối từ các chuyên gia bảo tồn mỹ thuật và kiến trúc sư trưởng dự án.",
    icon: Star,
  },
];

export function HomeStatistics() {
  return (
    <section className="w-full py-12 lg:py-16 bg-[#F3E9DA] border-b border-[#E5DAC9]">
      <div className="w-full max-w-[1280px] mx-auto px-6 space-y-10">
        {/* Section Heading Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#B71C1C]" />
              <span className="text-[#B71C1C] text-[12px] font-bold uppercase tracking-[1.2px] leading-4">
                NĂNG LỰC THỰC CHỨNG
              </span>
            </div>
            <h2 className="text-[#2B1F1A] text-2xl sm:text-3xl lg:text-[32px] font-bold uppercase leading-10">
              NHỮNG CON SỐ ẤN TƯỢNG
            </h2>
          </div>

          <p className="text-[#685950] text-[15px] sm:text-[16px] leading-[26px] max-w-[448px] font-normal">
            Hơn một thập kỷ gìn giữ tinh túy mộc và sơn, Là Việt chuyển hóa di sản thành các tuyệt tác quy mô lớn với độ bền vững tuyệt đối.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.category}
                className="p-6 bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] outline outline-1 outline-[#E5DAC9] -outline-offset-1 flex flex-col justify-between min-h-[268px] hover:shadow-md transition-shadow"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[#B71C1C] text-[12px] font-semibold uppercase tracking-[1.2px]">
                    {item.category}
                  </span>
                  <div className="w-8 h-8 bg-[#FAF0D9]/60 outline outline-1 outline-[#D4AF37]/30 -outline-offset-1 flex items-center justify-center text-[#B71C1C]">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Stat & Gold Line */}
                <div className="my-3 space-y-1">
                  <span className="text-[#B71C1C] text-3xl sm:text-[36px] font-bold leading-[44px] block">
                    {item.stat}
                  </span>
                  <div className="w-12 h-[2px] bg-[#D4AF37]" />
                </div>

                {/* Title & Description */}
                <div className="space-y-1">
                  <h3 className="text-[#2B1F1A] text-[18px] sm:text-[20px] font-semibold leading-7">
                    {item.title}
                  </h3>
                  <p className="text-[#685950] text-[13px] sm:text-[14px] leading-[22px] tracking-[0.14px]">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
