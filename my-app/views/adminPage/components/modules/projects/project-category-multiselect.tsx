import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ProjectCategory } from "../../../types/projects/project-data.type";

interface Props {
  categories: ProjectCategory[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
  index: number;
}

export function ProjectCategoryMultiselect({
  categories,
  selectedIds,
  onChange,
  index,
}: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedNames = categories
    .filter((category) => selectedIds.includes(category.id))
    .map((category) => category.name);
  const summary =
    selectedIds.length === 0
      ? "Tất cả danh mục"
      : selectedNames.length > 0
        ? selectedNames.join(", ")
        : `${selectedIds.length} danh mục đã chọn`;

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative min-w-0 text-[#1E1917]">
      <span className="admin-field-label block text-sm font-semibold leading-5">Danh mục áp dụng</span>
      <button
        type="button"
        aria-label={`Danh mục áp dụng cho nhóm lọc ${index + 1}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="mt-1.5 flex h-10 w-full cursor-pointer items-center justify-between gap-2 rounded-xl border border-[#EAE2D5] bg-white px-3.5 text-left text-base font-normal leading-6 text-[#1E1917] transition-colors hover:border-[#9A1C1F]/40 hover:bg-[#FAF8F5] focus:border-[#9A1C1F] focus:outline-none"
      >
        <span className="min-w-0 truncate">{summary}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-[#695D56] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={`Chọn danh mục áp dụng cho nhóm lọc ${index + 1}`}
          className="absolute inset-x-0 top-full z-40 mt-1 max-h-56 overflow-y-auto rounded-xl border border-[#EAE2D5] bg-white p-2 text-base font-normal leading-6 shadow-lg"
        >
          {categories.map((category) => (
            <label
              key={category.id}
              className="project-category-option flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 font-normal hover:bg-[#FAF8F5]"
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(category.id)}
                onChange={(event) =>
                  onChange(
                    event.target.checked
                      ? [...selectedIds, category.id]
                      : selectedIds.filter((id) => id !== category.id),
                  )
                }
                className="accent-[#9A1C1F]"
              />
              <span>{category.name}</span>
            </label>
          ))}
          {categories.length === 0 && (
            <p className="px-2.5 py-2 font-normal text-[#695D56]">
              Chưa có danh mục dự án.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
