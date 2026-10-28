"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  ArrowLeft,
  AlertCircle,
  Loader2,
  KeyRound,
} from "lucide-react";

export function AdminLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard";

  const [email, setEmail] = useState("admin@laviet.vn");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSsoLoading, setIsSsoLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 1. Tự động bắt mã Authorization Code từ SSO Hub khi Keycloak redirect về
  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      setIsSsoLoading(true);
      setErrorMessage(null);
      const redirectUri = window.location.origin + window.location.pathname;

      fetch("/api/auth/sso-callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, redirectUri }),
      })
        .then(async (res) => {
          const result = await res.json().catch(() => null);
          if (res.ok && result?.success) {
            router.push(callbackUrl);
            router.refresh();
          } else {
            setErrorMessage(result?.message || "Xác thực SSO thất bại.");
          }
        })
        .catch(() => {
          setErrorMessage("Không thể kết nối đến máy chủ SSO.");
        })
        .finally(() => {
          setIsSsoLoading(false);
        });
    }
  }, [searchParams, router, callbackUrl]);

  // 2. Chuyển hướng sang SSO Hub Keycloak
  const handleSSORedirect = () => {
    setIsSsoLoading(true);
    const redirectUri = window.location.origin + window.location.pathname;
    const keycloakBaseUrl =
      process.env.NEXT_PUBLIC_KEYCLOAK_URL || "http://localhost:8888";
    const clientId = "app-b";

    const authUrl = `${keycloakBaseUrl}/realms/sso-platform/protocol/openid-connect/auth?client_id=${encodeURIComponent(
      clientId
    )}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=openid profile email`;

    window.location.href = authUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        router.push(callbackUrl);
        router.refresh();
      } else {
        setErrorMessage(
          result?.message ||
            "Email hoặc mật khẩu không chính xác. Vui lòng thử lại."
        );
      }
    } catch {
      setErrorMessage(
        "Không thể kết nối đến máy chủ xác thực. Vui lòng kiểm tra đường truyền."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      className="admin-form-values fixed inset-0 z-50 flex items-center justify-center bg-[#a21f1f] p-4 sm:p-6 overflow-y-auto"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d1a25b]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-black/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Back to website button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#f3e9db] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại trang chủ website</span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-[#f7f5f1] rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#e2d3bf]">
          {/* Brand Seal Header */}
          <div className="text-center space-y-3 mb-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#a21f1f] text-[#d1a25b] flex items-center justify-center font-black text-2xl shadow-lg border-2 border-[#d1a25b]/60">
              LV
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight uppercase bg-gradient-to-r from-black to-[#a21f1f] bg-clip-text text-transparent">
                ĐĂNG NHẬP QUẢN TRỊ
              </h1>
              <p className="text-xs text-stone-600 font-semibold mt-1">
                Hệ thống quản lý nội dung &amp; di sản LÀ VIỆT
              </p>
            </div>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="mb-5 flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs font-semibold animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
              <div className="flex-1 leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {/* NÚT ĐĂNG NHẬP SSO HUB (NỔI BẬT) */}
          <div className="mb-6">
            <button
              type="button"
              onClick={handleSSORedirect}
              disabled={isSsoLoading || isLoading}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[#d1a25b] to-[#b88c47] hover:from-[#dfb36e] hover:to-[#c69a54] text-[#1E1917] shadow-lg shadow-[#d1a25b]/30 flex items-center justify-center gap-2.5 transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
            >
              {isSsoLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#1E1917]" />
                  <span>Đang kết nối SSO Hub...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4 text-[#1E1917]" />
                  <span>ĐĂNG NHẬP VỚI SSO HUB</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-stone-500 mt-2">
              Dùng chung tài khoản với Trung Tâm Công Nghiệp Sáng Tạo
            </p>
          </div>

          {/* Dải phân cách */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#d9c7ae]" />
            </div>
            <div className="relative flex justify-center text-[10px]">
              <span className="bg-[#f7f5f1] px-3 font-bold uppercase tracking-wider text-stone-400">
                HOẶC TÀI KHOẢN CỤC BỘ
              </span>
            </div>
          </div>

          {/* Form đăng nhập cục bộ */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-stone-700"
              >
                Tài khoản Gmail / Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@laviet.vn"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e2d3bf] bg-white text-sm text-[#1E1917] placeholder-stone-400 focus:outline-none focus:border-[#a21f1f] focus:ring-2 focus:ring-[#a21f1f]/20 transition-all font-normal"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold uppercase tracking-wider text-stone-700"
                >
                  Mật khẩu
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(
                      "Vui lòng liên hệ quản trị viên cấp cao để được cấp lại mật khẩu."
                    );
                  }}
                  className="text-xs font-bold text-[#a21f1f] hover:underline"
                >
                  Quên mật khẩu?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#e2d3bf] bg-white text-sm text-[#1E1917] placeholder-stone-400 focus:outline-none focus:border-[#a21f1f] focus:ring-2 focus:ring-[#a21f1f]/20 transition-all font-normal"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isSsoLoading}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#a21f1f] hover:bg-[#831618] text-white shadow-lg shadow-[#a21f1f]/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Đang xác thực...</span>
                </>
              ) : (
                <>
                  <span>ĐĂNG NHẬP HỆ THỐNG</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-6 pt-5 border-t border-[#e2d3bf] text-center">
            <p className="text-[11px] font-bold text-stone-500 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#a21f1f]" />
              Bảo mật định danh cấp Doanh nghiệp
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
