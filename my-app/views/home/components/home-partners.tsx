import {
  Building2,
  Hotel,
  Landmark,
  Building,
  Compass,
  Quote,
} from "lucide-react";

const partners = [
  { name: "DOANH NGHIỆP A", category: "TẬP ĐOÀN BẤT ĐỘNG SẢN", icon: Building2 },
  { name: "TẬP ĐOÀN B", category: "KHÁCH SẠN NGHỈ DƯỠNG", icon: Hotel },
  { name: "BẢO TÀNG C", category: "DI SẢN MỸ THUẬT", icon: Landmark },
  { name: "KHÁCH SẠN 5 SAO D", category: "CHUỖI BOUTIQUE QUỐC TẾ", icon: Building },
  { name: "VIỆN THIẾT KẾ E", category: "KIẾN TRÚC & NỘI THẤT", icon: Compass },
];

export function HomePartners() {
  return (
    <section className="w-full py-12 lg:py-16 bg-[#F3E9DA] border-b border-[#E5DAC9]">
      <div className="w-full max-w-[1280px] mx-auto px-6 space-y-10">
        {/* Header Center */}
        <div className="max-w-[768px] mx-auto text-center space-y-1">
          <span className="text-[#B71C1C] text-[12px] font-bold uppercase tracking-[1.2px] leading-4 block">
            MẠNG LƯỚI BẢO TRỢ &amp; PHÁT TRIỂN
          </span>
          <h2 className="text-[#2B1F1A] text-2xl sm:text-3xl lg:text-[32px] font-bold uppercase leading-tight sm:leading-10">
            ĐỐI TÁC CHIẾN LƯỢC &amp; DOANH NGHIỆP ĐỒNG HÀNH
          </h2>
          <p className="text-[#685950] text-[15px] sm:text-[16px] leading-[26px] pt-1">
            Là Việt vinh dự đồng hành cùng các tập đoàn kiến trúc, viện nghiên cứu văn hóa và các tổ hợp nghỉ dưỡng thượng lưu trong việc tôn vinh bản sắc dân tộc.
          </p>
        </div>

        {/* 5 Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {partners.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.name}
                className="p-6 bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] outline outline-1 outline-[#E5DAC9] -outline-offset-1 flex flex-col justify-center items-center text-center min-h-[110px] hover:shadow-md transition-shadow group"
              >
                <div className="w-8 h-8 rounded-full bg-red-800/10 flex items-center justify-center mb-2 text-[#B71C1C] group-hover:bg-[#B71C1C] group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-[#2B1F1A] text-[14px] font-bold uppercase tracking-[1.4px] leading-5">
                  {p.name}
                </h3>
                <p className="text-[#685950] text-[12px] font-semibold uppercase tracking-[0.6px] leading-4 mt-1">
                  {p.category}
                </p>
              </div>
            );
          })}
        </div>

        {/* Testimonial Box */}
        <div className="max-w-[896px] mx-auto p-6 bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] outline outline-1 outline-[#E5DAC9] -outline-offset-1 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-[#B71C1C] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] flex items-center justify-center text-white shrink-0">
            <Quote className="w-8 h-8" />
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <p className="text-[#2B1F1A] text-[15px] sm:text-[16px] italic leading-[26px]">
              “Sự phối hợp giữa tư duy thiết kế cấu trúc hiện đại và chất liệu sơn mài thủ công Là Việt đã tạo nên những dấu ấn độc bản chưa từng có cho các sảnh tiếp đón chuẩn ngoại giao quốc tế.”
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-[13px]">
              <span className="text-[#B71C1C] font-bold uppercase tracking-[0.52px]">
                TS. KIẾN TRÚC SƯ TRƯỞNG
              </span>
              <span className="text-[#D8CBBA]">•</span>
              <span className="text-[#685950] font-normal">
                Hội Đồng Cố Vấn Không Gian Di Sản
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
