"use client";

import { useState, useEffect, useRef } from "react";
import { X, Loader2, Maximize2, AlertTriangle, RotateCcw, Volume2, Sparkles } from "lucide-react";

export interface NewsFeaturedModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
}

export function NewsFeaturedModal({
  isOpen,
  onClose,
  imageUrl,
  title,
}: NewsFeaturedModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [loadingText, setLoadingText] = useState<string>("Đang kết nối máy chủ ảnh chất lượng cao...");
  const [isJolting, setIsJolting] = useState<boolean>(false);
  const [showFlash, setShowFlash] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Phát âm thanh giựt mình dạng synth shock effect (không phụ thuộc file audio bên ngoài)
  const playShockSound = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      // Giảm tần số nhanh chóng từ cao xuống trầm tạo hiệu ứng nổ giựt (jolt boom)
      osc.frequency.setValueAtTime(380, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } catch {
      // Bỏ qua nếu trình duyệt chặn autoplay audio
    }
  };

  // Khởi động chu kỳ loading 3s mỗi khi mở modal
  const startLoadingCycle = () => {
    setIsLoading(true);
    setProgress(0);
    setIsJolting(false);
    setShowFlash(false);
    setLoadingText("Đang kết nối máy chủ ảnh chất lượng cao 4K...");

    const startTime = typeof performance !== "undefined" ? performance.now() : 0;
    const duration = 3000; // 3 giây loading

    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);

    progressIntervalRef.current = setInterval(() => {
      const now = typeof performance !== "undefined" ? performance.now() : 0;
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed < 1000) {
        setLoadingText("Đang kết nối máy chủ ảnh chất lượng cao 4K...");
      } else if (elapsed < 2000) {
        setLoadingText("Đang giải mã dữ liệu độ sâu và tương phản (HDR)...");
      } else {
        setLoadingText("⚠️ Chuẩn bị hiển thị toàn màn hình... 3... 2... 1!");
      }
    }, 50);

    timerRef.current = setTimeout(() => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      setProgress(100);
      setIsLoading(false);

      // Kích hoạt hiệu ứng Flash + Rung giựt toàn màn hình (Jumpscare Jolt)
      setShowFlash(true);
      setIsJolting(true);
      playShockSound();

      // Tắt flash sau 250ms
      setTimeout(() => setShowFlash(false), 250);
      // Tắt rung lắc sau 700ms
      setTimeout(() => setIsJolting(false), 700);
    }, duration);
  };

  useEffect(() => {
    if (isOpen) {
      startLoadingCycle();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    }

    return () => {
      document.body.style.overflow = "unset";
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isOpen]);

  // Hỗ trợ phím ESC để đóng modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md select-none overflow-hidden animate-in fade-in duration-200">
      {/* Flash sáng chớp mắt khi giựt ảnh */}
      {showFlash && (
        <div className="fixed inset-0 z-[10001] bg-white pointer-events-none transition-opacity duration-200 opacity-90" />
      )}

      {/* Nút đóng (ESC / X) */}
      <div className="fixed top-5 right-5 z-[10002] flex items-center gap-3">
        {!isLoading && (
          <button
            type="button"
            onClick={startLoadingCycle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md transition-all border border-white/20 hover:scale-105 active:scale-95 cursor-pointer"
            title="Thử lại hiệu ứng 3s"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Thử lại (3s)</span>
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          className="p-2.5 rounded-full bg-black/60 hover:bg-red-600 text-white backdrop-blur-md transition-all border border-white/20 hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
          title="Đóng (ESC)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* GIAI ĐOẠN 1: LOADING 3 GIÂY ĐẦY HỒI HỘP */}
      {isLoading && (
        <div className="max-w-md w-full mx-4 p-8 rounded-2xl bg-[#141211]/90 border border-[#3A3330] shadow-2xl text-center space-y-6">
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            {/* Vòng quay ngoài */}
            <div className="absolute inset-0 rounded-full border-4 border-stone-800 border-t-[#9A1C1F] animate-spin" />
            <Loader2 className="w-8 h-8 text-[#9A1C1F] animate-spin" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9A1C1F]/20 text-[#ff6b6e] text-[11px] font-bold uppercase tracking-widest border border-[#9A1C1F]/40">
              <Sparkles className="w-3 h-3" />
              <span>Chờ tải ảnh tiêu điểm</span>
            </div>
            <h3 className="text-white text-base font-bold tracking-tight">
              Đang tải hình ảnh độ phân giải gốc
            </h3>
            <p className="text-stone-400 text-xs min-h-[32px] transition-all">
              {loadingText}
            </p>
          </div>

          {/* Thanh Tiến trình (Progress Bar 0% -> 100%) */}
          <div className="space-y-2">
            <div className="w-full h-2.5 bg-stone-800 rounded-full overflow-hidden border border-stone-700/60 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#9A1C1F] via-[#E63946] to-amber-500 rounded-full transition-all duration-75 shadow-[0_0_12px_rgba(230,57,70,0.6)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] text-stone-500 font-mono">
              <span>Thời gian chờ: 3s</span>
              <span className="text-[#ff6b6e] font-bold">{progress}%</span>
            </div>
          </div>
        </div>
      )}

      {/* GIAI ĐOẠN 2: HIỆU ỨNG GIỰT TOÀN MÀN HÌNH HÙ USER (JUMPSCARE JOLT) */}
      {!isLoading && (
        <div
          className={`relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden transition-transform duration-75 ${
            isJolting
              ? "scale-[1.18] rotate-[-2deg] filter contrast-150 brightness-125"
              : "scale-100 rotate-0 filter contrast-100 brightness-100"
          }`}
          style={{
            animation: isJolting
              ? "joltShake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both"
              : undefined,
          }}
        >
          {/* CSS Animation Keyframes được inject cục bộ */}
          <style jsx>{`
            @keyframes joltShake {
              0% {
                transform: scale(0.2) rotate(0deg);
                filter: contrast(200%) brightness(180%);
              }
              15% {
                transform: scale(1.35) rotate(4deg) translate(-10px, 8px);
                filter: contrast(180%) brightness(140%);
              }
              30% {
                transform: scale(0.92) rotate(-5deg) translate(12px, -10px);
              }
              45% {
                transform: scale(1.18) rotate(3deg) translate(-8px, 6px);
              }
              60% {
                transform: scale(0.98) rotate(-2deg) translate(5px, -4px);
              }
              75% {
                transform: scale(1.06) rotate(1deg) translate(-3px, 2px);
              }
              100% {
                transform: scale(1) rotate(0deg) translate(0, 0);
              }
            }
          `}</style>

          {/* Ảnh toàn màn hình bung ra cực đại */}
          <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-6">
            <img
              src={imageUrl || "https://placehold.co/1200x800?text=Featured+Image"}
              alt={title}
              className={`max-w-full max-h-full object-contain rounded-xl shadow-[0_0_50px_rgba(154,28,31,0.5)] border-2 border-[#9A1C1F]/80 transition-all duration-300 ${
                isJolting ? "shadow-[0_0_90px_rgba(255,50,50,0.9)]" : ""
              }`}
            />

            {/* Banner hù dọa / giựt tít độc đáo ở phía dưới */}
            <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-black/80 backdrop-blur-xl border border-red-500/40 rounded-2xl p-4 sm:p-5 shadow-2xl text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-md">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>BÙNG NỔ THỊ GIÁC TOÀN MÀN HÌNH</span>
              </div>
              <h2 className="text-white text-sm sm:text-base font-black uppercase tracking-tight line-clamp-1">
                {title}
              </h2>
              <p className="text-stone-300 text-[11px] sm:text-xs">
                Chế độ xem phóng to chi tiết tranh sơn mài Là Việt • Nhấn <kbd className="px-1.5 py-0.5 bg-stone-700 text-white rounded text-[10px]">ESC</kbd> hoặc nút X góc trên để đóng
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

