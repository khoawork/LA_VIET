"use client";

import { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon, Trash2, Loader2, CheckCircle2 } from "lucide-react";

interface AboutImageUploaderProps {
  label?: string;
  description?: string;
  value: string;
  onChange: (value: string) => void;
  folder?: string;
}

export function AboutImageUploader({
  label = "Hình ảnh xưởng chế tác",
  description = "Tải ảnh từ máy tính hoặc nhập đường dẫn (URL) ảnh",
  value,
  onChange,
  folder = "La_Viet_About",
}: AboutImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    try {
      setUploading(true);
      setUploadSuccess(false);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json().catch(() => null);

      if (res.ok && json?.success && json?.data?.url) {
        onChange(json.data.url);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      } else {
        // Fallback đọc base64 nếu API upload có vấn đề
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target?.result as string;
          if (base64) {
            onChange(base64);
            setUploadSuccess(true);
            setTimeout(() => setUploadSuccess(false), 3000);
          }
        };
        reader.readAsDataURL(file);
      }
    } catch {
      // Fallback base64
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        if (base64) {
          onChange(base64);
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 3000);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3 p-4 rounded-xl border border-[#e2d3bf] bg-[#FAF8F5]/80">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <label className="block text-xs font-bold text-[#1E1917] uppercase tracking-wide">
            {label}
          </label>
          {description && (
            <p className="text-[11px] text-stone-500 mt-0.5">{description}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml,image/jpg"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file);
              e.target.value = "";
            }}
          />

          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#9A1C1F] hover:bg-[#801417] active:scale-95 text-white text-xs font-semibold tracking-wider transition-all shadow-xs cursor-pointer disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Đang tải lên...</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Tải ảnh lên từ máy</span>
              </>
            )}
          </button>

          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-stone-300 hover:bg-stone-100 text-stone-600 text-xs font-medium transition-colors cursor-pointer"
              title="Gỡ ảnh"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
              <span className="hidden sm:inline">Gỡ ảnh</span>
            </button>
          )}
        </div>
      </div>

      {/* Preview Thumbnail & Direct URL */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* Preview Thumbnail */}
        <div className="sm:col-span-4 lg:col-span-3">
          <div className="w-full h-28 rounded-lg border border-[#e2d3bf] bg-white flex items-center justify-center p-1.5 relative overflow-hidden group shadow-2xs">
            {value ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={value}
                alt="Workshop preview"
                className="w-full h-full object-cover rounded transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-stone-400 gap-1">
                <ImageIcon className="w-6 h-6 stroke-1" />
                <span className="text-[10px] font-medium">Chưa có ảnh</span>
              </div>
            )}
          </div>
        </div>

        {/* Input link trực tiếp */}
        <div className="sm:col-span-8 lg:col-span-9 space-y-1">
          <label className="text-[11px] font-semibold text-stone-600">
            Đường dẫn ảnh (URL hoặc tệp tải lên):
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... hoặc tải trực tiếp từ máy tính"
            className="w-full h-9 px-3 rounded-lg border border-[#e2d3bf] bg-white text-xs font-mono text-stone-700 focus:border-[#9A1C1F] focus:outline-none"
          />
          {uploadSuccess && (
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Đã tải ảnh lên và cập nhật thành công!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

