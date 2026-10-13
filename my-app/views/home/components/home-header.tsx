import Link from "next/link";
import { User } from "lucide-react";

export function HomeHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#F3E9DA]/95 backdrop-blur-md border-b border-[#E5DAC9] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
      <div className="w-full max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-[2px] border border-[#E5DAC9] bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] flex items-center justify-center text-[#B71C1C] font-serif font-black text-xs tracking-tighter shrink-0">
            <span className="border border-[#B71C1C] px-1 py-0.5">LV</span>
          </div>
          <div className="pl-2 border-l border-[#E5DAC9] flex flex-col justify-center">
            <span className="font-bold uppercase tracking-[1px] text-xl text-[#B71C1C] leading-none">
              LÀ VIỆT
            </span>
            <span className="text-[12px] font-semibold uppercase tracking-[1.2px] text-[#685950] leading-none mt-1">
              SƠN MÀI HỘI HOẠ LIÊN NGÀNH
            </span>
          </div>
        </Link>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center gap-6 text-[14px] uppercase tracking-[0.7px]">
          <Link
            href="/home"
            className="text-[#B71C1C] font-bold border-b-2 border-[#B71C1C] py-2 transition-colors"
          >
            TRANG CHỦ
          </Link>
          <Link
            href="/about"
            className="text-[#2B1F1A] font-semibold hover:text-[#B71C1C] py-2 transition-colors"
          >
            VỀ CHÚNG TÔI
          </Link>
          <Link
            href="/products"
            className="text-[#2B1F1A] font-semibold hover:text-[#B71C1C] py-2 transition-colors"
          >
            SẢN PHẨM
          </Link>
          <Link
            href="/projects"
            className="text-[#2B1F1A] font-semibold hover:text-[#B71C1C] py-2 transition-colors"
          >
            DỰ ÁN
          </Link>
          <Link
            href="/home#tin-tuc"
            className="text-[#2B1F1A] font-semibold hover:text-[#B71C1C] py-2 transition-colors"
          >
            TIN TỨC
          </Link>
          <Link
            href="/home#lien-he"
            className="text-[#2B1F1A] font-semibold hover:text-[#B71C1C] py-2 transition-colors"
          >
            LIÊN HỆ
          </Link>
        </nav>

        {/* Header Action Button & Profile */}
        <div className="flex items-center gap-4">
          <Link
            href="/home#tu-van"
            className="px-4 py-2.5 bg-[#B71C1C] text-white text-[14px] font-semibold uppercase tracking-[0.7px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] outline outline-1 outline-[#B71C1C] -outline-offset-1 hover:bg-[#91000A] transition-colors"
          >
            YÊU CẦU TƯ VẤN
          </Link>
          <button
            aria-label="Tài khoản"
            className="w-9 h-9 bg-[#E5DAC9] rounded-[12px] outline outline-1 outline-[#E5DAC9] -outline-offset-1 flex items-center justify-center text-[#2B1F1A] hover:bg-[#d8ccba] transition-colors"
          >
            <User className="w-4 h-4 text-[#2B1F1A]" />
          </button>
        </div>
      </div>
    </header>
  );
}
