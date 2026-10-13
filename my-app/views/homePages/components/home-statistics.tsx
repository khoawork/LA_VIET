const stats = [
  {
    num: "15+",
    label: "Năm kiến tạo & gìn giữ",
    desc: "Hành trình phục dựng và ứng dụng sơn mài vào đời sống kiến trúc đương đại.",
    tag: "Kinh nghiệm",
  },
  {
    num: "120+",
    label: "Tác phẩm & Công trình",
    desc: "Hiện diện tại các khách sạn 5 sao, trung tâm văn hóa và tư dinh thượng lưu.",
    tag: "Dự án lớn",
  },
  {
    num: "45+",
    label: "Đối tác chiến lược",
    desc: "Các tập đoàn bất động sản, viện kiến trúc và bảo tàng nghệ thuật uy tín.",
    tag: "Hợp tác",
  },
  {
    num: "98%",
    label: "Đánh giá xuất sắc",
    desc: "Mức độ hài lòng tuyệt đối từ các chuyên gia phê bình nghệ thuật và chủ đầu tư.",
    tag: "Chất lượng",
  },
];

export function HomeStatistics() {
  return (
    <section className="w-full py-20 lg:py-28 px-6 sm:px-10 lg:px-16 xl:px-24">
      <div className="w-full grid lg:grid-cols-12 gap-8 items-end mb-14">
        <div className="lg:col-span-6 space-y-2">
          <span className="text-xs font-bold tracking-[0.22em] text-[#9A221A] uppercase">
            Thành tựu phát triển
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#231F20] tracking-tight">
            NHỮNG CON SỐ ẤN TƯỢNG
          </h2>
        </div>
        <div className="lg:col-span-6">
          <p className="text-sm sm:text-base text-[#68625B] leading-relaxed">
            Mỗi tác phẩm là sự kết tinh của hàng chục công đoạn tỉ mỉ kéo dài nhiều tháng, hội tụ tinh hoa bàn tay nghệ nhân và niềm tự hào di sản văn hóa Việt Nam.
          </p>
        </div>
      </div>

      {/* 4 Stat Cards Grid */}
      <div className="w-full grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.num}
            className="p-8 rounded-2xl bg-white border border-[#E8E2D5] shadow-sm hover:border-[#9A221A]/40 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl sm:text-5xl font-serif font-black text-[#9A221A] tracking-tight">
                {stat.num}
              </span>
              <span className="text-[10px] font-semibold text-[#9A221A] bg-[#9A221A]/10 px-2 py-0.5 rounded-full">
                {stat.tag}
              </span>
            </div>
            <h3 className="text-base font-serif font-bold text-[#231F20] mb-2 group-hover:text-[#9A221A] transition-colors">
              {stat.label}
            </h3>
            <p className="text-xs text-[#78716C] leading-relaxed">
              {stat.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

