const partners = [
  "TẬP ĐOÀN BẤT ĐỘNG SẢN A",
  "TỔ HỢP NGHỈ DƯỠNG B",
  "BẢO TÀNG MỸ THUẬT C",
  "KHÁCH SẠN 5 SAO D",
  "VIỆN THIẾT KẾ KIẾN TRÚC E",
];

export function HomePartners() {
  return (
    <section className="w-full py-20 lg:py-28 px-6 sm:px-10 lg:px-16 xl:px-24">
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <span className="text-xs font-bold tracking-[0.22em] text-[#9A221A] uppercase">
          Mạng lưới đối tác
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl  font-black text-[#231F20] tracking-tight">
          ĐỐI TÁC CHIẾN LƯỢC &amp; DOANH NGHIỆP ĐỒNG HÀNH
        </h2>
        <p className="text-xs sm:text-sm text-[#68625B] leading-relaxed">
          Được tín nhiệm bởi các tổ chức nghệ thuật, tập đoàn bất động sản và khách sạn nghỉ dưỡng hàng đầu.
        </p>
      </div>

      {/* 5 Partner Cards */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {partners.map((partner, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-white border border-[#E8E2D5] flex items-center justify-center text-center text-xs font-bold text-[#68625B] hover:text-[#9A221A] hover:border-[#9A221A]/30 transition-all shadow-sm min-h-[100px]"
          >
            {partner}
          </div>
        ))}
      </div>

      {/* Testimonial Banner */}
      <div className="w-full mt-12 p-8 sm:p-10 rounded-2xl bg-white border border-[#E8E2D5] flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-[#9A221A] text-white flex items-center justify-center text-3xl shrink-0 shadow-sm">
          “
        </div>
        <div className="space-y-1.5 text-center md:text-left flex-1">
          <p className="text-sm sm:text-base italic text-[#44403C] leading-relaxed">
            &quot;Sơn mài Lã Việt mang đến chiều sâu văn hóa và đẳng cấp vượt bậc cho không gian sảnh chính của chúng tôi. Kỹ thuật chế tác thủ công tinh xảo của các nghệ nhân thực sự chinh phục mọi ánh nhìn.&quot;
          </p>
          <span className="text-xs font-bold text-[#9A221A] tracking-wider uppercase block pt-1">
            — Giám đốc Sáng tạo, Tổ hợp Nghỉ dưỡng Quốc tế
          </span>
        </div>
      </div>
    </section>
  );
}

