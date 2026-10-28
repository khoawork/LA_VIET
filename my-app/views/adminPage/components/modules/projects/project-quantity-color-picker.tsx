import { RotateCcw } from "lucide-react";
import { useState } from "react";

const HEX_COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/;

interface Props {
  value?: string;
  onChange: (value?: string) => void;
  index?: number;
  label?: string;
  inline?: boolean;
  clearable?: boolean;
}

export function ProjectQuantityColorPicker({
  value,
  onChange,
  index,
  label = "Màu số lượng",
  inline = false,
  clearable = true,
}: Props) {
  const [hexDraft, setHexDraft] = useState<string | null>(null);
  const color = value && HEX_COLOR_PATTERN.test(value) ? value : "#000000";
  const inputLabel = `${label}${index === undefined ? "" : ` cho chỉ số ${index + 1}`}`;

  function updateHex(input: string) {
    if (input && !/^#?[0-9a-fA-F]{0,6}$/.test(input)) return;

    setHexDraft(input);
    const normalized = input.startsWith("#") ? input : `#${input}`;
    if (HEX_COLOR_PATTERN.test(normalized)) onChange(normalized.toUpperCase());
  }

  function finishHex() {
    if (hexDraft === "" && clearable) onChange(undefined);
    setHexDraft(null);
  }

  return (
    <div className={`min-w-0 font-semibold text-[#1E1917] ${inline ? "text-sm" : "text-xs"}`}>
      <span className="admin-field-label block">{label} (Mã Hex)</span>
      <div className="mt-1.5 flex min-w-0 items-center gap-2">
        <input
          type="color"
          aria-label={`Chọn ${inputLabel.toLowerCase()}`}
          value={color}
          onChange={(event) => {
            setHexDraft(null);
            onChange(event.target.value.toUpperCase());
          }}
          className={`${inline ? "h-[42px]" : "h-10"} w-11 shrink-0 cursor-pointer rounded-lg border border-[#d9c7ae] bg-white p-0.5 transition-colors hover:border-[#9A1C1F]/60 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-md [&::-moz-color-swatch]:rounded-md`}
        />
        <input
          type="text"
          aria-label={`Mã Hex ${inputLabel.toLowerCase()}`}
          value={hexDraft ?? (value || "")}
          onChange={(event) => updateHex(event.target.value)}
          onBlur={finishHex}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              event.currentTarget.blur();
            }
            if (event.key === "Escape") {
              setHexDraft(null);
              event.currentTarget.blur();
            }
          }}
          placeholder="#RRGGBB"
          maxLength={7}
          spellCheck={false}
          aria-invalid={hexDraft !== null && hexDraft !== "" && !HEX_COLOR_PATTERN.test(hexDraft.startsWith("#") ? hexDraft : `#${hexDraft}`)}
          className={`${inline ? "h-[42px]" : "h-10"} min-w-0 flex-1 rounded-xl border border-[#d9c7ae] bg-white px-3.5 text-sm font-normal uppercase text-[#1E1917] focus:border-[#9A1C1F] focus:outline-none`}
        />
        {clearable && (
          <button
            type="button"
            disabled={!value}
            onClick={() => {
              setHexDraft(null);
              onChange(undefined);
            }}
            aria-label={`Đặt lại ${inputLabel.toLowerCase()}`}
            title={`Đặt lại ${inputLabel.toLowerCase()}`}
            className={`inline-flex ${inline ? "h-[42px]" : "h-10"} w-10 shrink-0 items-center justify-center rounded-lg text-stone-600 transition-colors hover:bg-[#EAE2D5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A1C1F] ${value ? "" : "invisible"}`}
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
