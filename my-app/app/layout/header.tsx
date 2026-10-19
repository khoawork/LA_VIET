"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DEFAULT_MENU_ITEMS, type MenuItemType } from "@/shared/schema/menu.schema";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<{ label: string; href: string }[]>(
    DEFAULT_MENU_ITEMS.map((item) => ({ label: item.label, href: item.path }))
  );
  const [brand, setBrand] = useState<{ logo?: string; company?: string; tagline?: string }>({
    company: "LÀ VIỆT",
    tagline: "SƠN MÀI HỘI HOẠ LIÊN NGÀNH",
  });

  useEffect(() => {
    // 1. Fetch dynamic navigation menu
    fetch("/api/menu")
      .then((res) => res.json())
      .then((json) => {
        if (json?.success && Array.isArray(json?.data) && json.data.length > 0) {
          const visible = json.data
            .filter((item: MenuItemType) => item.status !== "Ẩn")
            .map((item: MenuItemType) => ({
              label: item.label,
              href: item.path,
            }));
          setNavLinks(visible);
        }
      })
      .catch(() => {});

    // 2. Fetch brand info (logo, name, tagline)
    fetch("/api/site-settings/brand")
      .then((res) => res.json())
      .then((json) => {
        if (json && (json.company || json.logo)) {
          setBrand({
            logo: json.logo,
            company: json.company,
            tagline: json.tagline,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF6F0] border-b border-[#EAE2D5] transition-all">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 group select-none">
          {brand.logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={brand.logo}
              alt={brand.company || "Logo"}
              className="h-10 w-10 sm:h-11 sm:w-11 object-contain shrink-0"
            />
          )}
          <div className="flex flex-col">
            <span className="font-bold text-xl sm:text-2xl text-[#1E1917] tracking-wider uppercase leading-tight group-hover:text-[#9A1C1F] transition-colors">
              {brand.company || "LÀ VIỆT"}
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-[#695D56] font-medium uppercase mt-0.5">
              {brand.tagline || "SƠN MÀI HỘI HOẠ LIÊN NGÀNH"}
            </span>
          </div>
        </Link>

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
            href="/contact"
            className="px-5 py-2.5 rounded-md bg-[#a21f1f] hover:bg-[#831618] active:scale-[0.98] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
          >
            YÊU CẦU TƯ VẤN
          </Link>

          <button
            type="button"
            aria-label="Tài khoản cá nhân"
            className="w-9 h-9 rounded-full bg-[#a21f1f] hover:bg-[#831618] text-white flex items-center justify-center transition-all shadow-sm cursor-pointer"
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
            className="sm:hidden w-8 h-8 rounded-full bg-[#a21f1f] text-white flex items-center justify-center"
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
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-block text-center py-2.5 rounded-md bg-[#a21f1f] text-white text-xs font-semibold uppercase tracking-wider"
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

