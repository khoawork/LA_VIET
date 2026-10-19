"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";

interface CategoryOption {
  id: number;
  name: string;
}

interface CategoryFilterSelectProps {
  label: string;
  value: string;
  options: CategoryOption[];
  onChange: (value: string) => void;
  emptyLabel?: string;
  includeEmpty?: boolean;
  fullWidth?: boolean;
}

export function CategoryFilterSelect({
  label,
  value,
  options,
  onChange,
  emptyLabel = "Tất cả",
  includeEmpty = true,
  fullWidth = false,
}: CategoryFilterSelectProps) {
  const listId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    maxHeight: 0,
  });
  const selectedName =
    options.find((option) => String(option.id) === value)?.name ?? emptyLabel;

  function showMenu() {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const width = Math.min(rect.width, window.innerWidth - 16);
    const below = window.innerHeight - rect.bottom - 8;
    const above = rect.top - 8;
    const desiredHeight = Math.min(240, (options.length + Number(includeEmpty)) * 42 + 8);
    const openAbove = below < Math.min(desiredHeight, 160) && above > below;
    const maxHeight = Math.min(desiredHeight, Math.max(48, openAbove ? above : below));
    setPosition({
      top: openAbove ? Math.max(8, rect.top - maxHeight - 4) : rect.bottom + 4,
      left: Math.max(8, Math.min(rect.left, window.innerWidth - width - 8)),
      width,
      maxHeight,
    });
    setOpen(true);
  }

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !triggerRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      )
        setOpen(false);
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const items =
          menuRef.current?.querySelectorAll<HTMLButtonElement>(
            '[role="option"]',
          );
        if (!items?.length) return;
        const current = Array.from(items).indexOf(
          document.activeElement as HTMLButtonElement,
        );
        const step = event.key === "ArrowDown" ? 1 : -1;
        const next =
          current < 0
            ? step === 1
              ? 0
              : items.length - 1
            : (current + step + items.length) % items.length;
        items[next].focus();
      }
    };
    const closeOnResize = () => setOpen(false);
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", handleKey);
    window.addEventListener("resize", closeOnResize);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", handleKey);
      window.removeEventListener("resize", closeOnResize);
    };
  }, [open]);

  function select(nextValue: string) {
    onChange(nextValue);
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <div
      className={
        fullWidth ? "w-full min-w-0" : "w-full min-w-0 shrink-0 sm:w-44"
      }
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={`${label}: ${selectedName}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        disabled={!includeEmpty && options.length === 0}
        onClick={() => (open ? setOpen(false) : showMenu())}
        onKeyDown={(event) => {
          if (!open && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
            event.preventDefault();
            showMenu();
          }
        }}
        className="flex w-full min-w-0 cursor-pointer items-center justify-between gap-2 rounded-xl border border-[#f3e9db] bg-white px-4 py-2 text-left text-sm font-normal text-[#1E1917] transition-colors hover:border-[#d1a25b] hover:bg-[#FAF8F5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d1a25b]/50 disabled:cursor-not-allowed disabled:opacity-50 sm:py-2.5"
      >
        <span className="min-w-0 truncate">{selectedName}</span>
        <ChevronDown className="h-4 w-4 shrink-0" />
      </button>
      {open &&
        createPortal(
          <div
            ref={menuRef}
            id={listId}
            role="listbox"
            aria-label={label}
            className="z-[100] overflow-y-auto rounded-xl border border-[#f3e9db] bg-white py-1 shadow-xl"
            style={{ position: "fixed", ...position }}
          >
            {[
              ...(includeEmpty ? [{ id: 0, name: emptyLabel }] : []),
              ...options,
            ].map((option) => {
              const optionValue = option.id === 0 ? "" : String(option.id);
              const selected = optionValue === value;
              return (
                <button
                  key={optionValue || "all"}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => select(optionValue)}
                  className="flex w-full min-w-0 cursor-pointer items-start justify-between gap-2 px-4 py-2 text-left text-sm text-[#1E1917] transition-colors hover:bg-[#FAF1EC] hover:text-[#a21f1f] focus:bg-[#FAF1EC] focus:text-[#a21f1f] focus:outline-none"
                >
                  <span className="min-w-0 break-words">{option.name}</span>
                  {selected && (
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#a21f1f]" />
                  )}
                </button>
              );
            })}
          </div>,
          document.body,
        )}
    </div>
  );
}
