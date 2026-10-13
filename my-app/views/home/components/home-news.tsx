import Image from "next/image";
import Link from "next/link";
import { Newspaper, ArrowRight, Calendar, Bookmark } from "lucide-react";

const newsItems = [
  {
    id: "1",
    tag: "SỰ KIỆN & TRIỂN LÃM",
    tagBg: "bg-[#B71C1C]",
    date: "15/10/2025",
    author: "Ban Truyền Thông",
    title: "Không gian triển lãm ứng dụng sơn mài trong kiến trúc hiện đại",
    excerpt:
      "Là Việt giới thiệu chuỗi sắp đặt quy mô thực tế kết hợp giữa vật liệu bê tông trần, kính cường lực và các tấm vách sơn mài phủ vàng bạc khổ lớn, định...",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    tag: "NGHIÊN CỨU & KỸ THUẬT",
    tagBg: "bg-[#D4AF37]",
    date: "08/10/2025",
    author: "Nghệ nhân Là Việt",
    title:
      "Kỹ thuật mài đa tầng và chất liệu vàng bạc trong tạo hình sơn mài mới",
    excerpt:
      "Khám phá quá trình ứng dụng vàng quỳ 9999 kết hợp bạc xay mịn cùng nhựa sơn ta chín ép, tạo nên hiệu ứng chiều sâu vô tận dưới sự biến thiên của…",
    image:
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    tag: "DỰ ÁN HỢP TÁC",
    tagBg: "bg-[#B71C1C]",
    date: "28/09/2025",
    author: "Ban Dự Án",
    title:
      "Bàn giao tác phẩm sơn mài liên ngành tại sảnh tập đoàn đa quốc gia",
    excerpt:
      "Hoàn tất lắp dựng tác phẩm phù điêu sơn mài kích thước 4x12m sau 7 tháng sáng tác và thi công kỹ thuật cao, đáp ứng các tiêu chuẩn phòng cháy và...",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
];

export function HomeNews() {
  return (
    <section id="tin-tuc" className="w-full py-12 lg:py-16 bg-[#F7F5F0] border-b border-[#E5DAC9]">
      <div className="w-full max-w-[1280px] mx-auto px-6 space-y-10">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-1.5">
              <Newspaper className="w-4 h-4 text-[#B71C1C]" />
              <span className="text-[#B71C1C] text-[12px] font-bold uppercase tracking-[1.2px] leading-4">
                THÔNG TIN &amp; NGHIÊN CỨU
              </span>
            </div>
            <h2 className="text-[#2B1F1A] text-2xl sm:text-3xl lg:text-[32px] font-bold uppercase leading-10">
              TIN TỨC MỚI NHẤT
            </h2>
            <p className="text-[#685950] text-[15px] sm:text-[16px] leading-[26px]">
              Ghi nhận các chuyển động nghệ thuật, công bố nghiên cứu chất liệu và hoạt động dự án liên ngành của Là Việt.
            </p>
          </div>

          <Link
            href="#tin-tuc"
            className="px-4 py-2.5 bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] outline outline-1 outline-[#E5DAC9] -outline-offset-1 text-[#B71C1C] text-[14px] font-semibold uppercase tracking-[0.7px] flex items-center gap-2 hover:bg-[#FAF5ED] transition-colors shrink-0 group"
          >
            <span>XEM TẤT CẢ TIN TỨC</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((news) => (
            <article
              key={news.id}
              className="bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] outline outline-1 outline-[#E5DAC9] -outline-offset-1 flex flex-col justify-between overflow-hidden group hover:shadow-md transition-shadow"
            >
              {/* Image with Tag */}
              <div className="relative aspect-[16/10] bg-[#F3E9DA] overflow-hidden">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className={`absolute top-2 left-2 px-2 py-1 ${news.tagBg} text-white text-[12px] font-semibold uppercase tracking-[0.6px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]`}
                >
                  {news.tag}
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Meta */}
                  <div className="flex items-center gap-2 text-[#685950] text-[12px] font-semibold leading-4 tracking-[0.6px]">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{news.date}</span>
                    </div>
                    <span>•</span>
                    <span>{news.author}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-[#2B1F1A] text-[18px] sm:text-[20px] font-bold leading-[27.5px] group-hover:text-[#B71C1C] transition-colors line-clamp-2">
                    {news.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-[#685950] text-[14px] leading-[22.75px] tracking-[0.14px] line-clamp-3">
                    {news.excerpt}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-[#E5DAC9]/50 flex items-center justify-between">
                  <span className="text-[#B71C1C] text-[12px] font-bold uppercase tracking-[1.2px] flex items-center gap-1.5 group-hover:underline">
                    <span>ĐỌC BÀI VIẾT</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <Bookmark className="w-4 h-4 text-[#D8CBBA] hover:text-[#B71C1C] transition-colors cursor-pointer" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
