"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PagePaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  className?: string;
}

export function PagePagination({
  page,
  totalPages,
  onPageChange,
  disabled = false,
  className = "",
}: PagePaginationProps) {
  const [draft, setDraft] = useState<string | null>(null);
  const lastPage = Math.max(1, totalPages);
  const currentPage = Math.min(Math.max(1, page), lastPage);

  function commitPage() {
    if (draft === null) return;
    const requestedPage = Number(draft);
    setDraft(null);
    if (!draft || !Number.isSafeInteger(requestedPage)) return;
    const nextPage = Math.min(Math.max(1, requestedPage), lastPage);
    if (nextPage !== currentPage) onPageChange(nextPage);
  }

  return (
    <nav aria-label="Phân trang" className={`flex shrink-0 items-center justify-center gap-2 sm:gap-3 ${className}`}>
      <button
        type="button"
        aria-label="Trang trước"
        disabled={disabled || currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-[#EAE2D5] bg-white text-[#1E1917] transition-colors hover:border-[#a21f1f] hover:bg-[#FAF1EC] hover:text-[#a21f1f] disabled:cursor-not-allowed disabled:opacity-40 sm:h-10 sm:w-10"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="flex h-9 items-center gap-2 rounded-2xl border border-[#EAE2D5] bg-white px-2 text-sm font-semibold text-[#1E1917] sm:h-10 sm:px-2.5">
        <input
          aria-label={`Nhập số trang từ 1 đến ${lastPage}`}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          disabled={disabled}
          value={draft ?? String(currentPage)}
          onFocus={(event) => event.currentTarget.select()}
          onChange={(event) => {
            const value = event.target.value;
            if (/^\d{0,6}$/.test(value)) setDraft(value);
          }}
          onBlur={commitPage}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              event.currentTarget.blur();
            } else if (event.key === "Escape") {
              setDraft(null);
            }
          }}
          className="h-6 w-12 rounded-lg border border-[#EAE2D5] bg-white text-center font-bold text-[#a21f1f] outline-none focus:border-[#a21f1f] disabled:opacity-50 sm:h-7"
        />
        <span aria-hidden="true" className="text-stone-400">/</span>
        <span aria-label={`Tổng ${lastPage} trang`} className="min-w-5 text-center">{lastPage}</span>
      </div>

      <button
        type="button"
        aria-label="Trang sau"
        disabled={disabled || currentPage >= lastPage}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-[#EAE2D5] bg-white text-[#1E1917] transition-colors hover:border-[#a21f1f] hover:bg-[#FAF1EC] hover:text-[#a21f1f] disabled:cursor-not-allowed disabled:opacity-40 sm:h-10 sm:w-10"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  );
}
