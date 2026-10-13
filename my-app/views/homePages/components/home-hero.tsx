import Link from "next/link";
import Image from "next/image";

const collections = [
  {
    idx: "BỘ SƯU TẬP 01",
    title: "Sơn Ta Phố Trúc",
    desc: "Kỹ thuật vóc truyền thống",
  },
  {
    idx: "BỘ SƯU TẬP 02",
    title: "Nhịp Điệu Đương Đại",
    desc: "Vàng quỳ & Bạc dát đa tầng",
  },
  {
    idx: "BỘ SƯU TẬP 03",
    title: "Đại Ngàn & Sương Mù",
    desc: "Chất liệu vỏ trai & Vỏ trứng",
  },
  {
    idx: "BỘ SƯU TẬP 04",
    title: "Quyến Rũ Biển",
    desc: "Sắc son then kinh điển",
  },
];

export function HomeHero() {
  return (
    <section className="relative w-full border-b border-[#E8E2D5] bg-[#FAF7F2] overflow-hidden">
      {/* Hero Main Area */}
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 pt-16 pb-14 lg:pt-24 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-12 xl:gap-20 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-7">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] text-[#9A221A] uppercase">
              <span className="w-8 h-[2px] bg-[#9A221A]" />
              Khát vọng sơn mài Việt
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-[#231F20] leading-[1.12]">
              NÂNG TẦM NGHỆ THUẬT{" "}
              <span className="text-[#9A221A] underline decoration-[#9A221A]/30 underline-offset-8">
                SƠN MÀI TRUYỀN THỐNG
              </span>{" "}
              TRONG KHÔNG GIAN ĐƯƠNG ĐẠI
            </h1>

            <p className="text-[#68625B] text-base sm:text-lg leading-relaxed max-w-3xl font-light">
              Lã Việt định vị sứ mệnh bảo tồn và phát triển tinh hoa nghệ thuật sơn mài truyền thống Việt Nam; kết hợp nhuần nhuyễn chiều sâu văn hóa bản địa cùng ngôn ngữ kiến trúc và thiết kế đương đại.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/projects"
                className="px-8 py-4 rounded-full bg-[#9A221A] hover:bg-[#821B14] text-white text-xs font-bold uppercase tracking-[0.14em] transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                Khám phá bộ sưu tập <span>→</span>
              </Link>
              <Link
                href="#tu-van"
                className="px-8 py-4 rounded-full bg-white hover:bg-[#F2ECE1] text-[#231F20] border border-[#DCD5C7] text-xs font-bold uppercase tracking-[0.14em] transition-colors"
              >
                Tư vấn dự án
              </Link>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#E5DDD0] shadow-2xl bg-white aspect-[4/3] lg:aspect-[5/4] w-full">
              <Image
                src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80"
                alt="Không gian triển lãm sơn mài Lã Việt"
                fill
                priority
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#E6C687] font-semibold">
                  Không gian trưng bày
                </span>
                <p className="text-sm sm:text-base font-bold mt-1">
                  Đại sảnh Nhà Hát Đương Đại &amp; Bích Họa Sơn Mài
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Collections Ribbon (Full-width 4 columns) */}
      <div className="w-full border-t border-[#E8E2D5] bg-white">
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#E8E2D5]">
          {collections.map((col) => (
            <div
              key={col.idx}
              className="p-6 sm:p-8 hover:bg-[#FAF7F2] transition-colors group cursor-pointer"
            >
              <span className="text-[10px] font-mono font-bold tracking-wider text-[#9A221A] block">
                {col.idx}
              </span>
              <h4 className="text-sm sm:text-base font-bold text-[#231F20] mt-1 group-hover:text-[#9A221A] transition-colors">
                {col.title}
              </h4>
              <p className="text-xs text-[#78716C] mt-1">{col.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

