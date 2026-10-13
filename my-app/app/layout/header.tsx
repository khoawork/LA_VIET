"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "TRANG CHỦ", href: "/" },
    { label: "VỀ CHÚNG TÔI", href: "/about" },
    { label: "SẢN PHẨM", href: "#san-pham" },
    { label: "DỰ ÁN", href: "/project" },
    { label: "TIN TỨC", href: "#tin-tuc" },
    { label: "LIÊN HỆ", href: "#lien-he" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF6F0] border-b border-[#EAE2D5] transition-all">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex flex-col group select-none">
          <span className="font-serif font-bold text-xl sm:text-2xl text-[#1E1917] tracking-wider uppercase leading-tight group-hover:text-[#9A1C1F] transition-colors">
            LÀ VIỆT
          </span>
          <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-[#695D56] font-medium uppercase mt-0.5">
            SƠN MÀI HỘI HOẠ LIÊN NGÀNH
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-7 2xl:gap-9 text-[13px] font-medium tracking-wider text-[#4A423D]">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-[#9A1C1F] transition-colors uppercase py-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Group */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="#tu-van"
            className="px-5 py-2.5 rounded-md bg-[#9A1C1F] hover:bg-[#831618] active:scale-[0.98] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
          >
            YÊU CẦU TƯ VẤN
          </Link>

          <button
            type="button"
            aria-label="Tài khoản cá nhân"
            className="w-9 h-9 rounded-full bg-[#9A1C1F] hover:bg-[#831618] text-white flex items-center justify-center transition-all shadow-sm cursor-pointer"
          >
            {/* User SVG Icon */}
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </button>
        </div>

        {/* Mobile / Tablet Toggle Hamburger */}
        <div className="flex xl:hidden items-center gap-2">
          <button
            type="button"
            aria-label="Tài khoản cá nhân"
            className="sm:hidden w-8 h-8 rounded-full bg-[#9A1C1F] text-white flex items-center justify-center"
          >
            <svg
              className="w-3.5 h-3.5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-lg text-[#2A2421] hover:bg-[#EFE8DC] transition-colors"
          >
            {mobileMenuOpen ? (
              <svg
                className="w-6 h-6 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FAF6F0] border-t border-[#EAE2D5] px-6 py-5 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 text-sm font-semibold tracking-wider text-[#4A423D]">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#9A1C1F] py-1 border-b border-[#EAE2D5]/50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-2">
            <Link
              href="#tu-van"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-block text-center py-2.5 rounded-md bg-[#9A1C1F] text-white text-xs font-semibold uppercase tracking-wider"
            >
              YÊU CẦU TƯ VẤN
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
export { Header };

