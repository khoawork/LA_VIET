"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PagePaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  className?: string;
}

function visiblePages(page: number, totalPages: number): Array<number | "ellipsis"> {
  if (totalPages <= 6) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  if (page <= 3) return [1, 2, 3, "ellipsis", totalPages];
  if (page >= totalPages - 2) {
    return [1, "ellipsis", totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages];
}

export function PagePagination({
  page,
  totalPages,
  onPageChange,
  disabled = false,
  className = "",
}: PagePaginationProps) {
  const lastPage = Math.max(1, totalPages);
  const currentPage = Math.min(Math.max(1, page), lastPage);
  const items = visiblePages(currentPage, lastPage);
  const buttonClass =
    "flex h-7 w-7 shrink-0 items-center justify-center rounded-sm text-[11px] font-semibold transition-colors disabled:cursor-not-allowed sm:h-9 sm:w-9";
  const inactiveClass = "bg-[#F3EADB] text-[#251E1A] hover:bg-[#E8DAC4] disabled:opacity-40";

  return (
    <nav
      aria-label="Phân trang"
      className={`flex flex-wrap items-center justify-center gap-1 sm:gap-[5px] ${className}`}
    >
      <button
        type="button"
        aria-label="Trang trước"
        disabled={disabled || currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`${buttonClass} ${inactiveClass}`}
      >
        <ChevronLeft className="h-3.5 w-3.5" />
      </button>

      {items.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center text-[11px] text-[#907B69] sm:h-9 sm:w-9"
          >
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            aria-label={`Trang ${item}`}
            aria-current={item === currentPage ? "page" : undefined}
            disabled={disabled || item === currentPage}
            onClick={() => onPageChange(item)}
            className={`${buttonClass} ${
              item === currentPage
                ? "bg-[#B71C1C] text-white hover:bg-[#9A1C1F]"
                : inactiveClass
            }`}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        aria-label="Trang sau"
        disabled={disabled || currentPage >= lastPage}
        onClick={() => onPageChange(currentPage + 1)}
        className={`${buttonClass} ${inactiveClass}`}
      >
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </nav>
  );
}
