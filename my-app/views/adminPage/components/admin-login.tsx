"use client";

import { useState } from "react";
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
} from "lucide-react";

export function AdminLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard";

  const [email, setEmail] = useState("admin@laviet.vn");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#a21f1f] p-4 sm:p-6 overflow-y-auto"
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
        <div className="bg-[#f7f5f1] rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#f3e9db]">
          {/* Brand Seal Header */}
          <div className="text-center space-y-3 mb-8">
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
            <div className="mb-5 flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
              <div className="flex-1 leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#f3e9db] bg-white text-sm text-[#1E1917] placeholder-stone-400 focus:outline-none focus:border-[#a21f1f] focus:ring-2 focus:ring-[#a21f1f]/20 transition-all font-medium"
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
                  placeholder="Nhập mật khẩu"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#f3e9db] bg-white text-sm text-[#1E1917] placeholder-stone-400 focus:outline-none focus:border-[#a21f1f] focus:ring-2 focus:ring-[#a21f1f]/20 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-600 cursor-pointer"
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
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-[#a21f1f] hover:bg-[#851619] active:scale-[0.99] text-white font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
              <span>{isLoading ? "ĐANG XÁC THỰC..." : "ĐĂNG NHẬP"}</span>
            </button>
          </form>



          {/* Security Note */}
          <div className="mt-6 pt-4 border-t border-[#f3e9db] flex items-center justify-center gap-2 text-[11px] text-stone-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Khu vực bảo mật nội bộ dành riêng cho Quản trị viên</span>
          </div>
        </div>
      </div>
    </div>
  );
}
