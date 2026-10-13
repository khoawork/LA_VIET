import Link from "next/link";
import { User } from "lucide-react";

export function AboutHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E5DAC9] shadow-[0px_1px_8px_0px_rgba(43,31,26,0.06)]">
      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/home" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-sm border border-[#E5DAC9] bg-white shadow-sm flex items-center justify-center text-[#B71C1C] font-serif font-black text-xs shrink-0">
            <span className="border border-[#B71C1C] px-1 py-0.5">LV</span>
          </div>
          <div className="pl-2 border-l border-[#E5DAC9] flex flex-col justify-center">
            <span className="text-stone-900 text-xl font-medium uppercase tracking-tight leading-none">
              LÀ VIỆT
            </span>
            <span className="text-stone-700 text-xs font-semibold uppercase tracking-wider leading-none mt-1">
              SƠN MÀI HỘI HOẠ LIÊN NGÀNH
            </span>
          </div>
        </Link>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium tracking-tight">
          <Link
            href="/home"
            className="text-stone-700 hover:text-red-800 py-2 transition-colors uppercase"
          >
            TRANG CHỦ
          </Link>
          <Link
            href="/about"
            className="text-red-800 font-bold border-b-2 border-red-800 py-2 transition-colors uppercase"
          >
            VỀ CHÚNG TÔI
          </Link>
          <Link
            href="/products"
            className="text-stone-700 hover:text-red-800 py-2 transition-colors uppercase"
          >
            SẢN PHẨM
          </Link>
          <Link
            href="/projects"
            className="text-stone-700 hover:text-red-800 py-2 transition-colors uppercase"
          >
            DỰ ÁN
          </Link>
          <Link
            href="/home#tin-tuc"
            className="text-stone-700 hover:text-red-800 py-2 transition-colors uppercase"
          >
            TIN TỨC
          </Link>
          <Link
            href="/home#lien-he"
            className="text-stone-700 hover:text-red-800 py-2 transition-colors uppercase"
          >
            LIÊN HỆ
          </Link>
        </nav>

        {/* Header Action Button & Profile */}
        <div className="flex items-center gap-4">
          <Link
            href="/home#tu-van"
            className="px-6 py-2 bg-red-700 hover:bg-red-800 text-white text-sm font-medium uppercase tracking-wide rounded-xs shadow-[0px_1px_4px_0px_rgba(183,28,28,0.20)] transition-colors"
          >
            YÊU CẦU TƯ VẤN
          </Link>
          <button
            aria-label="Tài khoản"
            className="w-8 h-8 bg-red-800 rounded-xl flex items-center justify-center text-white hover:bg-red-900 transition-colors shadow-sm"
          >
            <User className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
