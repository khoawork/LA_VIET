"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import { ImagePreview } from "./image-preview";

interface Props {
  label: string;
  value: string;
  onChange: (url: string) => void;
  fit?: "cover" | "contain";
}

export function ImageUrlUploadField({ label, value, onChange, fit }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [localPreview, setLocalPreview] = useState("");
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!localPreview) return;
    return () => URL.revokeObjectURL(localPreview);
  }, [localPreview]);

  async function upload(file: File) {
    setUploading(true);
    setError("");
    setLocalPreview(URL.createObjectURL(file));
    const body = new FormData();
    body.append("file", file);

    try {
      const response = await fetch("/api/upload", { method: "POST", body });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success || !result?.data?.url) {
        throw new Error(result?.message || "Không thể tải ảnh lên.");
      }
      onChangeRef.current(result.data.url);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Không thể tải ảnh lên.");
    } finally {
      setLocalPreview("");
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="admin-field-label text-sm font-semibold text-[#1E1917]">{label}</span>
        <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#d9c7ae] bg-[#FAF8F5] px-3 py-1.5 text-sm font-semibold text-[#9A1C1F] hover:bg-[#FAF1EC]">
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
          {uploading ? "Đang tải ảnh..." : "Chọn ảnh từ máy"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
            disabled={uploading}
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void upload(file);
              event.target.value = "";
            }}
          />
        </label>
      </div>
      <input
        type="text"
        aria-label={`${label} bằng URL`}
        value={value}
        disabled={uploading}
        onChange={(event) => {
          setError("");
          onChange(event.target.value);
        }}
        placeholder="Nhập URL ảnh hoặc chọn ảnh từ máy"
        className="w-full rounded-xl border border-[#d9c7ae] bg-white px-3.5 py-2.5 text-base font-normal text-[#1E1917] focus:border-[#9A1C1F] focus:outline-none"
      />
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <ImagePreview src={localPreview || value} alt={`Xem trước ${label.toLowerCase()}`} fit={fit} />
    </div>
  );
}
