"use client";

import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
}

export function ImagePreview({ src, alt, fit = "cover" }: Props) {
  const [failedSrc, setFailedSrc] = useState("");
  const imageUrl = src.trim();

  if (!imageUrl) return null;

  return (
    <div className="flex h-36 w-full max-w-xs items-center justify-center overflow-hidden rounded-xl border border-[#d9c7ae] bg-[#FAF8F5]">
      {failedSrc === imageUrl ? (
        <p className="px-4 text-center text-sm text-[#695D56]">
          Không thể xem trước ảnh từ đường dẫn này.
        </p>
      ) : (
        // URL đang nhập và ảnh tạm từ máy không cần bộ tối ưu Next.js.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={alt}
          onError={() => setFailedSrc(imageUrl)}
          className={`h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
        />
      )}
    </div>
  );
}
