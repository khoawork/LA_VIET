import { ChevronDown, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IonIcon } from "@/shared/icons/ion-icon";
import { ionIconNames, resolveIonIconName } from "@/shared/icons/ion-icons";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function IconSelect({ label, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const selectedName = resolveIonIconName(value);
  const normalizedQuery = query.trim().toLowerCase();
  const matches = ionIconNames
    .filter((name) => name.toLowerCase().includes(normalizedQuery))
    .slice(0, 80);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) searchRef.current?.focus({ preventScroll: true });
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative min-w-0 text-xs font-semibold text-[#1E1917]"
    >
      <span className="block">{label}</span>
      <button
        type="button"
        aria-label={`${label}: ${value || "Chưa chọn"}`}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((current) => !current)}
        className="mt-1.5 flex h-10 w-full items-center gap-2 rounded-xl border border-[#EAE2D5] bg-white px-3.5 text-left focus:border-[#9A1C1F] focus:outline-none"
      >
        {value && <IonIcon name={value} />}
        <span className="min-w-0 flex-1 truncate">
          {selectedName || value || "Chọn icon"}
        </span>
        <ChevronDown className="h-4 w-4 shrink-0" aria-hidden="true" />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-40 mt-2 w-full min-w-56 rounded-xl border border-[#EAE2D5] bg-white p-2 shadow-xl">
          <label className="flex items-center gap-2 rounded-lg border border-[#EAE2D5] px-2.5 py-2">
            <Search className="h-4 w-4 text-[#695D56]" aria-hidden="true" />
            <input
              ref={searchRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm Ionicon..."
              aria-label={`Tìm ${label.toLowerCase()}`}
              className="min-w-0 flex-1 bg-transparent font-normal outline-none"
            />
          </label>
          <div
            role="listbox"
            aria-label={label}
            className="mt-2 max-h-56 overflow-y-auto"
          >
            {matches.map((name) => {
              return (
                <button
                  key={name}
                  type="button"
                  role="option"
                  aria-selected={name === selectedName}
                  onClick={() => {
                    onChange(name);
                    setQuery("");
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left font-normal hover:bg-[#FAF8F5]"
                >
                  <IonIcon name={name} />
                  <span className="truncate">{name}</span>
                </button>
              );
            })}
            {matches.length === 0 && (
              <p className="px-2.5 py-2 text-[#695D56]">Không tìm thấy icon.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
