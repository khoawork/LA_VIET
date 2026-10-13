import Link from "next/link";
import Image from "next/image";

const articles = [
  {
    id: 1,
    tag: "Triển lãm & Sự kiện",
    tagColor: "bg-[#9A221A] text-white",
    img: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=800&q=80",
    date: "12 Tháng 10, 2026",
    title: "Không gian triển lãm ứng dụng sơn mài trong kiến trúc hiện đại",
    desc: "Triển lãm chuyên đề quy tụ hơn 50 tác phẩm cỡ lớn, mở ra góc nhìn đa chiều về khả năng thích ứng của chất liệu truyền thống.",
  },
  {
    id: 2,
    tag: "Kỹ thuật nghệ thuật",
    tagColor: "bg-[#C49B3E] text-white",
    img: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=800&q=80",
    date: "05 Tháng 10, 2026",
    title: "Kỹ thuật mài đa tầng và chất liệu vàng bạc trong sơn mài",
    desc: "Tìm hiểu bí quyết làm nên độ sâu hun hút của từng thớ sơn khi kết hợp lá vàng quỳ kiên nhẫn qua từng công đoạn mài nước.",
  },
  {
    id: 3,
    tag: "Dự án tiêu biểu",
    tagColor: "bg-[#9A221A] text-white",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    date: "28 Tháng 09, 2026",
    title: "Bàn giao tác phẩm sơn mài lớn ngành tài chính tập đoàn đa quốc gia",
    desc: "Công trình bích họa sơn mài trải rộng 3 tầng sảnh chính, khẳng định bản sắc văn hóa doanh nghiệp giao hòa cùng tinh thần hiện đại.",
  },
];

export function HomeNews() {
  return (
    <section id="tin-tuc" className="w-full py-20 lg:py-28 bg-white border-y border-[#E8E2D5] px-6 sm:px-10 lg:px-16 xl:px-24">
      <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <span className="text-xs font-bold tracking-[0.22em] text-[#9A221A] uppercase">
            Góc nhìn di sản
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#231F20] tracking-tight">
            TIN TỨC MỚI NHẤT
          </h2>
        </div>
        <Link
          href="/projects"
          className="text-xs font-bold uppercase tracking-[0.16em] text-[#9A221A] hover:underline flex items-center gap-1.5"
        >
          Xem tất cả tin tức <span>→</span>
        </Link>
      </div>

      {/* 3 Articles Grid */}
      <div className="w-full grid md:grid-cols-3 gap-8">
        {articles.map((art) => (
          <article
            key={art.id}
            className="group flex flex-col bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#E8E2D5] hover:border-[#9A221A]/40 transition-all shadow-sm hover:shadow-md"
          >
            <div className="relative aspect-[16/10] overflow-hidden w-full">
              <Image
                src={art.img}
                alt={art.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span
                className={`absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${art.tagColor}`}
              >
                {art.tag}
              </span>
            </div>

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-[#78716C]">
                  {art.date}
                </span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#231F20] group-hover:text-[#9A221A] transition-colors leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#68625B] leading-relaxed line-clamp-3">
                  {art.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8E2D5]/70 flex items-center justify-between text-xs font-bold text-[#9A221A]">
                <span className="hover:underline">Đọc tiếp →</span>
                <span className="text-[#A8A29E] font-normal">➦ Chia sẻ</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

