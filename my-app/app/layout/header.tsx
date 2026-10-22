"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MenuItemType } from "@/shared/schema/menu.schema";
import {
  AlertCircle,
  Eye,
  EyeOff,
  LayoutDashboard,
  Loader2,
  Lock,
  LogOut,
  Mail,
  ShieldCheck,
  X,
} from "lucide-react";

interface CurrentUser {
  id: number;
  email: string;
  fullname: string;
  role: "ADMIN" | "MANAGER" | "USER";
  avatar?: string | null;
}

interface HeaderNavLink {
  label: string;
  href: string;
}

function HeaderNavLinks({
  links,
  pathname,
  mobile = false,
  onNavigate,
}: {
  links: HeaderNavLink[];
  pathname: string | null;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const currentPath = pathname?.replace(/\/+$/, "") || "/";

  return links.map((link) => {
    const linkPath = link.href.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
    const active = pathname !== null && (
      currentPath === linkPath ||
      (linkPath !== "/" && currentPath.startsWith(`${linkPath}/`))
    );

    return (
      <Link
        key={`${link.href}-${link.label}`}
        href={link.href}
        onClick={onNavigate}
        aria-current={active ? "page" : undefined}
        className={mobile
          ? `border-b-2 py-1 transition-colors ${active
              ? "border-[#B71C1C] font-bold text-[#B71C1C]"
              : "border-[#EAE2D5]/50 hover:text-[#B71C1C]"}`
          : `border-b-[3px] py-1.5 uppercase transition-colors ${active
              ? "border-[#B71C1C] font-semibold text-[#B71C1C]"
              : "border-transparent hover:text-[#B71C1C]"}`}
      >
        {link.label}
      </Link>
    );
  });
}

function PathAwareNavLinks(props: Omit<Parameters<typeof HeaderNavLinks>[0], "pathname">) {
  const pathname = usePathname();
  return <HeaderNavLinks {...props} pathname={pathname} />;
}

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<HeaderNavLink[]>([]);
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
  // Trạng thái tài khoản người dùng
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Trạng thái Form đăng nhập trong Modal
  const [loginEmail, setLoginEmail] = useState("admin@laviet.vn");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Kiểm tra trạng thái đăng nhập khi load trang
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.data?.user) {
          setUser(data.data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null));
  }, []);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Xử lý click nút icon User
  function handleUserButtonClick() {
    if (user) {
      setIsMenuOpen((prev) => !prev);
    } else {
      setLoginError(null);
      setIsLoginModalOpen(true);
    }
  }

  // Xử lý submit đăng nhập nhanh
  async function handleQuickLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const result = await res.json().catch(() => null);

      if (res.ok && result?.success) {
        setUser(result.data.user);
        setIsLoginModalOpen(false);
        setLoginPassword("");
        // Tự động chuyển hướng vào Dashboard
        router.push("/admin/dashboard");
      } else {
        setLoginError(
          result?.message ||
            "Email hoặc mật khẩu không chính xác. Vui lòng thử lại."
        );
      }
    } catch {
      setLoginError("Lỗi kết nối máy chủ xác thực.");
    } finally {
      setIsLoggingIn(false);
    }
  }

  // Xử lý đăng xuất
  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    setUser(null);
    setIsMenuOpen(false);
    router.refresh();
  }



  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF6F0] border-b border-[#EAE2D5] transition-all">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 min-h-20 py-2 flex items-center justify-between relative">
        {/* Brand / Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-3 select-none">
          {brand.logo && (
            <span className="flex shrink-0 self-stretch items-center border-r-2 border-[#E5D7C4] pr-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={brand.logo}
                alt={brand.company || "Logo"}
                className="h-12 w-12 object-contain sm:h-14 sm:w-14"
              />
            </span>
          )}
          <span className="min-w-0">
            <strong className="block text-[22px] font-bold uppercase leading-none tracking-wide text-[#B91F1F] transition-colors group-hover:text-[#981919] sm:text-[25px]">
              {brand.company || "LÀ VIỆT"}
            </strong>
            <span className="mt-1 block whitespace-nowrap text-[12px] font-semibold uppercase leading-none tracking-wide text-[#6D6058] sm:text-[13px]">
              {brand.tagline || "SƠN MÀI HỘI HOẠ LIÊN NGÀNH"}
            </span>
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-7 2xl:gap-9 text-[15px] 2xl:text-base font-medium tracking-wider text-[#4A423D]">
          <Suspense fallback={<HeaderNavLinks links={navLinks} pathname={null} />}>
            <PathAwareNavLinks links={navLinks} />
          </Suspense>
        </nav>

        {/* Action Group */}
        <div className="hidden sm:flex items-center gap-3 relative" ref={dropdownRef}>
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-md bg-[#a21f1f] hover:bg-[#831618] active:scale-[0.98] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
          >
            YÊU CẦU TƯ VẤN
          </Link>

          <button
            type="button"
            onClick={handleUserButtonClick}
            aria-label="Tài khoản cá nhân"
            title={user ? `Tài khoản: ${user.fullname} (${user.role})` : "Đăng nhập quản trị"}
            className="w-9 h-9 rounded-full bg-[#a21f1f] hover:bg-[#831618] active:scale-95 text-white flex items-center justify-center transition-all shadow-sm cursor-pointer relative"
          >
            {/* User SVG Icon */}
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>

            {/* Chấm xanh hiển thị trạng thái đã đăng nhập */}
            {user && (
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#FAF6F0] rounded-full" />
            )}
          </button>

          {/* Dropdown Menu khi ĐÃ đăng nhập */}
          {user && isMenuOpen && (
            <div className="absolute right-0 top-12 w-72 rounded-2xl bg-white border border-[#EAE2D5] shadow-xl p-4 space-y-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center gap-3 border-b border-[#EAE2D5]/70 pb-3">
                <div className="w-10 h-10 rounded-full bg-[#a21f1f] text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
                  {user.fullname.slice(0, 1).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-[#1E1917] truncate leading-tight">
                    {user.fullname}
                  </p>
                  <p className="text-[11px] text-stone-500 truncate mt-0.5">
                    {user.email}
                  </p>
                  <div className="mt-1">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        user.role === "ADMIN"
                          ? "bg-red-100 text-red-800 border border-red-200"
                          : "bg-amber-100 text-amber-800 border border-amber-200"
                      }`}
                    >
                      {user.role === "ADMIN" ? "Quản Trị Viên (Admin)" : "Quản Lý (Manager)"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <Link
                  href="/admin/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#1E1917] hover:bg-[#FAF8F5] hover:text-[#9A1C1F] transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4 text-[#9A1C1F]" />
                  <span>Vào Bảng Quản trị (Admin)</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile / Tablet Toggle Hamburger */}
        <div className="flex xl:hidden items-center gap-2">
          <button
            type="button"
            onClick={handleUserButtonClick}
            aria-label="Tài khoản cá nhân"
            className="sm:hidden w-8 h-8 rounded-full bg-[#a21f1f] text-white flex items-center justify-center relative"
          >
            <svg
              className="w-3.5 h-3.5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
            {user && (
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#FAF6F0] rounded-full" />
            )}
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
          <nav className="flex flex-col space-y-3 text-base font-semibold tracking-wider text-[#4A423D]">
            <Suspense fallback={<HeaderNavLinks links={navLinks} pathname={null} mobile onNavigate={() => setMobileMenuOpen(false)} />}>
              <PathAwareNavLinks links={navLinks} mobile onNavigate={() => setMobileMenuOpen(false)} />
            </Suspense>
          </nav>

          <div className="pt-2 space-y-2">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-block text-center py-2.5 rounded-md bg-[#a21f1f] text-white text-xs font-semibold uppercase tracking-wider"
            >
              YÊU CẦU TƯ VẤN
            </Link>

            {user ? (
              <Link
                href="/admin/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-block text-center py-2 rounded-md border border-[#a21f1f] text-[#a21f1f] text-xs font-bold uppercase tracking-wider"
              >
                VÀO BẢNG QUẢN TRỊ ({user.role})
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="w-full inline-block text-center py-2 rounded-md border border-[#a21f1f] text-[#a21f1f] text-xs font-bold uppercase tracking-wider"
              >
                ĐĂNG NHẬP QUẢN TRỊ
              </button>
            )}
          </div>
        </div>
      )}

      {/* MODAL ĐĂNG NHẬP NHANH KHI BẤM NÚT ICON USER */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-[#FAF8F5] border border-[#EAE2D5] p-6 sm:p-8 shadow-2xl space-y-5">
            {/* Nút đóng modal */}
            <button
              type="button"
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Modal */}
            <div className="text-center space-y-2 pt-1">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-[#a21f1f] text-[#d1a25b] flex items-center justify-center font-black text-xl shadow-md border border-[#d1a25b]/60">
                LV
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tight text-[#1E1917]">
                Đăng Nhập Quản Trị
              </h3>
              <p className="text-xs text-stone-500">
                Khu vực xác thực dành cho Quản trị viên (Admin & Manager)
              </p>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                <span className="leading-relaxed">{loginError}</span>
              </div>
            )}

            {/* Form đăng nhập */}
            <form onSubmit={handleQuickLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">
                  Gmail / Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="admin@laviet.vn"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#EAE2D5] bg-white text-xs text-[#1E1917] focus:border-[#9A1C1F] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">
                  Mật khẩu
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Nhập mật khẩu..."
                    className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-[#EAE2D5] bg-white text-xs text-[#1E1917] focus:border-[#9A1C1F] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 rounded-xl bg-[#a21f1f] hover:bg-[#851619] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoggingIn ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : null}
                <span>{isLoggingIn ? "Đang xác thực..." : "Đăng nhập ngay"}</span>
              </button>
            </form>

            <div className="pt-2 border-t border-[#EAE2D5] flex items-center justify-between text-[11px] text-stone-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Bảo mật JWT &amp; HttpOnly Cookie
              </span>
              <Link
                href="/admin/login"
                onClick={() => setIsLoginModalOpen(false)}
                className="text-[#9A1C1F] font-bold hover:underline"
              >
                Mở trang login &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
export { Header };

