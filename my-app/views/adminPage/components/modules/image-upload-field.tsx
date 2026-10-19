"use client";

import { useEffect, useState } from "react";
import { ImagePlus } from "lucide-react";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  file: File | null;
  onUrlChange: (url: string) => void;
  onFileChange: (file: File | null) => void;
  required?: boolean;
}

export function ImageUploadField({
  label,
  value,
  file,
  onUrlChange,
  onFileChange,
  required = true,
}: ImageUploadFieldProps) {
  const [preview, setPreview] = useState<{ file: File; url: string } | null>(
    null,
  );

  useEffect(() => {
    if (!preview) return;
    return () => URL.revokeObjectURL(preview.url);
  }, [preview]);

  const previewUrl = preview?.file === file ? preview.url : null;

  return (
    <div className="space-y-1.5 text-sm font-semibold text-[#1E1917]">
      <span>
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="url"
          aria-label={`${label} bằng URL`}
          required={required && !file}
          disabled={Boolean(file)}
          value={value}
          onChange={(event) => {
            onUrlChange(event.target.value);
            onFileChange(null);
            setPreview(null);
          }}
          placeholder="Nhập URL ảnh hoặc chọn ảnh từ máy"
          className="min-w-0 flex-1 rounded-xl border border-[#EAE2D5] px-3.5 py-2.5 text-sm font-normal text-[#1E1917] focus:border-[#9A1C1F] focus:outline-none disabled:bg-stone-50 disabled:text-stone-500"
        />
        <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#EAE2D5] bg-[#FAF8F5] px-4 py-2.5 text-sm font-semibold text-[#9A1C1F] hover:bg-[#FAF1EC]">
          <ImagePlus className="h-4 w-4" /> Chọn ảnh
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
            className="sr-only"
            onChange={(event) => {
              const selectedFile = event.target.files?.[0] ?? null;
              setPreview(
                selectedFile
                  ? {
                      file: selectedFile,
                      url: URL.createObjectURL(selectedFile),
                    }
                  : null,
              );
              onFileChange(selectedFile);
              event.target.value = "";
            }}
          />
        </label>
      </div>
      {file && (
        <div className="space-y-2">
          {previewUrl && (
            <div className="flex h-36 w-full max-w-56 items-center justify-center overflow-hidden rounded-xl border border-[#EAE2D5] bg-[#FAF8F5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt={`Xem trước ${label.toLowerCase()}`}
                className="h-full w-full object-contain"
              />
            </div>
          )}
          <p className="flex items-center gap-2 text-sm font-normal text-stone-600">
            <span className="min-w-0 truncate">
              Đã chọn: {file.name}. Ảnh sẽ tải lên khi lưu.
            </span>
            <button
              type="button"
              onClick={() => {
                onFileChange(null);
                setPreview(null);
              }}
              className="shrink-0 text-[#9A1C1F] underline hover:text-[#7d171a]"
            >
              Bỏ chọn
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
