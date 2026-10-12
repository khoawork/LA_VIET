import Link from "next/link";

export function HomeHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8E2D5]">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 h-20 flex items-center justify-between">
        {/* Logo Brand */}
        <Link href="/home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded border border-[#9A221A] flex items-center justify-center bg-[#9A221A]/5 text-[#9A221A] font-serif font-bold text-xl tracking-tighter">
            LV
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-black tracking-[0.2em] text-lg text-[#231F20] leading-none">
              LÃ VIỆT
            </span>
            <span className="text-[10px] tracking-[0.3em] text-[#9A221A] font-medium uppercase mt-1">
              Sơn mài truyền thống
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12 text-xs font-semibold uppercase tracking-[0.16em]">
          <Link
            href="/home"
            className="text-[#9A221A] border-b-2 border-[#9A221A] pb-1 transition-colors"
          >
            Trang chủ
          </Link>
          <Link
            href="/projects"
            className="text-[#68625B] hover:text-[#9A221A] transition-colors pb-1"
          >
            Về chúng tôi
          </Link>
          <Link
            href="/projects"
            className="text-[#68625B] hover:text-[#9A221A] transition-colors pb-1"
          >
            Dự án
          </Link>
          <Link
            href="#tin-tuc"
            className="text-[#68625B] hover:text-[#9A221A] transition-colors pb-1"
          >
            Tin tức
          </Link>
          <Link
            href="#lien-he"
            className="text-[#68625B] hover:text-[#9A221A] transition-colors pb-1"
          >
            Liên hệ
          </Link>
        </nav>

        {/* Action CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="#tu-van"
            className="px-5 py-2.5 rounded-full bg-[#9A221A] hover:bg-[#821B14] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
          >
            Tư vấn dự án
          </Link>
          <button
            aria-label="Tài khoản"
            className="w-9 h-9 rounded-full border border-[#DCD5C7] flex items-center justify-center text-[#68625B] hover:text-[#231F20] hover:border-[#9A221A] transition-colors text-xs"
          >
            👤
          </button>
        </div>
      </div>
    </header>
  );
}

