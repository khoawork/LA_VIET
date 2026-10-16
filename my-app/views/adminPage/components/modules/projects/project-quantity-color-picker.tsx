import { RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

const HEX_COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/;
const RGB_CHANNELS = ["red", "green", "blue"] as const;
type RgbChannel = (typeof RGB_CHANNELS)[number];
type RgbDraft = Record<RgbChannel, string>;

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function hexToRgb(hex: string) {
  return {
    red: parseInt(hex.slice(1, 3), 16),
    green: parseInt(hex.slice(3, 5), 16),
    blue: parseInt(hex.slice(5, 7), 16),
  };
}

function rgbToHex(red: number, green: number, blue: number) {
  return `#${[red, green, blue]
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("")}`.toUpperCase();
}

function isValidRgbChannel(value: string) {
  return /^\d{1,3}$/.test(value) && Number(value) <= 255;
}

function hexToHsv(hex: string) {
  const rgb = hexToRgb(hex);
  const red = rgb.red / 255;
  const green = rgb.green / 255;
  const blue = rgb.blue / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const difference = max - min;
  let hue = 0;

  if (difference !== 0) {
    if (max === red) hue = ((green - blue) / difference) % 6;
    else if (max === green) hue = (blue - red) / difference + 2;
    else hue = (red - green) / difference + 4;
    hue = (hue * 60 + 360) % 360;
  }

  return {
    hue,
    saturation: max === 0 ? 0 : difference / max,
    brightness: max,
  };
}

function hsvToHex(hue: number, saturation: number, brightness: number) {
  const chroma = brightness * saturation;
  const secondary = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
  const offset = brightness - chroma;
  const segment = Math.floor(hue / 60) % 6;
  const channels = [
    [chroma, secondary, 0],
    [secondary, chroma, 0],
    [0, chroma, secondary],
    [0, secondary, chroma],
    [secondary, 0, chroma],
    [chroma, 0, secondary],
  ][segment];

  return `#${channels
    .map((channel) =>
      Math.round((channel + offset) * 255)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`.toUpperCase();
}

interface Props {
  value?: string;
  onChange: (value?: string) => void;
  index: number;
  label?: string;
}

export function ProjectQuantityColorPicker({
  value,
  onChange,
  index,
  label = "Màu số lượng",
}: Props) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"hex" | "rgb">("hex");
  const [hexDraft, setHexDraft] = useState<string | null>(null);
  const [rgbDraft, setRgbDraft] = useState<RgbDraft | null>(null);
  const [hue, setHue] = useState(() => hexToHsv(value ?? "#000000").hue);
  const rootRef = useRef<HTMLDivElement>(null);
  const hexInputRef = useRef<HTMLInputElement>(null);
  const redInputRef = useRef<HTMLInputElement>(null);
  const color = value && HEX_COLOR_PATTERN.test(value) ? value : "#000000";
  const rgb = hexToRgb(color);
  const hsv = hexToHsv(color);
  const currentHue = hsv.saturation > 0 ? hsv.hue : hue;

  useEffect(() => {
    if (!open) return;

    function handleOutsideClick(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setHexDraft(null);
        setRgbDraft(null);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        setHexDraft(null);
        setRgbDraft(null);
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const input = mode === "hex" ? hexInputRef.current : redInputRef.current;
    input?.focus({ preventScroll: true });
  }, [open, mode]);

  function selectFromArea(event: ReactPointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const saturation = clamp((event.clientX - bounds.left) / bounds.width);
    const brightness = 1 - clamp((event.clientY - bounds.top) / bounds.height);
    setHexDraft(null);
    setRgbDraft(null);
    onChange(hsvToHex(currentHue, saturation, brightness));
  }

  function updateHex(input: string) {
    const raw = input.trim();
    const normalized = /^[0-9a-fA-F]{6}$/.test(raw) ? `#${raw}` : raw;
    setHexDraft(raw);

    if (!raw) {
      onChange(undefined);
    } else if (HEX_COLOR_PATTERN.test(normalized)) {
      setHexDraft(null);
      setHue(hexToHsv(normalized).hue);
      onChange(normalized.toUpperCase());
    }
  }

  function updateRgb(channel: RgbChannel, input: string) {
    if (!/^\d{0,3}$/.test(input)) return;

    const current = rgbDraft ?? {
      red: String(rgb.red),
      green: String(rgb.green),
      blue: String(rgb.blue),
    };
    const next = { ...current, [channel]: input };
    setRgbDraft(next);

    if (RGB_CHANNELS.every((key) => isValidRgbChannel(next[key]))) {
      const hex = rgbToHex(
        Number(next.red),
        Number(next.green),
        Number(next.blue),
      );
      setRgbDraft(null);
      setHue(hexToHsv(hex).hue);
      onChange(hex);
    }
  }

  return (
    <div
      ref={rootRef}
      className="relative text-xs font-semibold text-[#1E1917]"
    >
      <span className="block">{label}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`Chọn ${label.toLowerCase()} cho chỉ số ${index + 1}`}
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => {
            setHexDraft(null);
            setRgbDraft(null);
            setMode("hex");
            setOpen(!open);
          }}
          className="flex h-10 w-12 items-center justify-center rounded-lg border border-[#EAE2D5] bg-white p-1"
        >
          <span
            className="h-full w-full rounded-sm"
            style={{ backgroundColor: color }}
          />
        </button>
        {value && (
          <button
            type="button"
            onClick={() => {
              setHexDraft(null);
              setRgbDraft(null);
              onChange(undefined);
            }}
            aria-label={`Đặt lại ${label.toLowerCase()}`}
            title={`Đặt lại ${label.toLowerCase()}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-black transition-colors hover:bg-[#EAE2D5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && (
        <div
          role="dialog"
          aria-label={`Chọn ${label.toLowerCase()} cho chỉ số ${index + 1}`}
          className="absolute -bottom-12 left-[80px] z-30 w-72 max-w-[calc(100vw-6rem)] rounded-xl border border-[#EAE2D5] bg-white p-3 shadow-xl"
        >
          <div
            role="slider"
            tabIndex={0}
            aria-label="Độ bão hòa và độ sáng"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(hsv.saturation * 100)}
            aria-valuetext={`Độ bão hòa ${Math.round(hsv.saturation * 100)}%, độ sáng ${Math.round(hsv.brightness * 100)}%`}
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              selectFromArea(event);
            }}
            onPointerMove={(event) => {
              if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                selectFromArea(event);
              }
            }}
            onKeyDown={(event) => {
              const saturation = clamp(
                hsv.saturation +
                  (event.key === "ArrowRight"
                    ? 0.01
                    : event.key === "ArrowLeft"
                      ? -0.01
                      : 0),
              );
              const brightness = clamp(
                hsv.brightness +
                  (event.key === "ArrowUp"
                    ? 0.01
                    : event.key === "ArrowDown"
                      ? -0.01
                      : 0),
              );
              if (event.key.startsWith("Arrow")) {
                event.preventDefault();
                setHexDraft(null);
                setRgbDraft(null);
                onChange(hsvToHex(currentHue, saturation, brightness));
              }
            }}
            className="relative h-40 w-full cursor-crosshair rounded-md outline-none ring-[#9A1C1F] focus-visible:ring-2"
            style={{
              backgroundColor: `hsl(${currentHue} 100% 50%)`,
              backgroundImage:
                "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)",
              touchAction: "none",
            }}
          >
            <span
              className="pointer-events-none absolute h-4 w-4 rounded-full border-2 border-white shadow-[0_0_2px_1px_#000]"
              style={{
                left: `${hsv.saturation * 100}%`,
                top: `${(1 - hsv.brightness) * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
          <div className="mt-3 flex items-center gap-3">
            <span
              className="h-7 w-7 shrink-0 rounded-full border border-[#EAE2D5]"
              style={{ backgroundColor: color }}
            />
            <input
              type="range"
              min="0"
              max="359"
              value={Math.min(359, Math.round(currentHue))}
              aria-label="Sắc độ màu"
              onChange={(event) => {
                const nextHue = Number(event.target.value);
                setHue(nextHue);
                setHexDraft(null);
                setRgbDraft(null);
                onChange(hsvToHex(nextHue, hsv.saturation, hsv.brightness));
              }}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[linear-gradient(to_right,red,yellow,lime,cyan,blue,magenta,red)] [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-md"
            />
          </div>
          <div
            role="group"
            aria-label="Chế độ nhập màu"
            className="mt-3 flex gap-1 rounded-lg bg-[#FAF8F5] p-1"
          >
            {(["hex", "rgb"] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={mode === option}
                onClick={() => {
                  setMode(option);
                  setHexDraft(null);
                  setRgbDraft(null);
                }}
                className={`flex-1 rounded-md py-1.5 text-xs font-bold ${mode === option ? "bg-white text-[#9A1C1F] shadow-sm" : "text-[#695D56]"}`}
              >
                {option.toUpperCase()}
              </button>
            ))}
          </div>
          {mode === "hex" ? (
            <>
              <label className="mt-3 block space-y-1.5">
                <span>HEX</span>
                <input
                  ref={hexInputRef}
                  type="text"
                  value={hexDraft ?? color.toUpperCase()}
                  onChange={(event) => updateHex(event.target.value)}
                  maxLength={7}
                  spellCheck={false}
                  aria-invalid={
                    hexDraft !== null &&
                    hexDraft.length > 0 &&
                    !HEX_COLOR_PATTERN.test(hexDraft)
                  }
                  className="w-full rounded-lg border border-[#EAE2D5] px-3 py-2 text-center font-medium uppercase text-[#1E1917] focus:border-[#9A1C1F] focus:outline-none"
                />
              </label>
              {hexDraft && !HEX_COLOR_PATTERN.test(hexDraft) && (
                <p className="mt-1 font-normal text-red-700">
                  Nhập mã dạng #RRGGBB.
                </p>
              )}
            </>
          ) : (
            <>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {RGB_CHANNELS.map((channel) => {
                  const channelValue =
                    rgbDraft?.[channel] ?? String(rgb[channel]);
                  return (
                    <label key={channel} className="space-y-1.5 text-center">
                      <span>{channel[0].toUpperCase()}</span>
                      <input
                        ref={channel === "red" ? redInputRef : undefined}
                        type="text"
                        inputMode="numeric"
                        value={channelValue}
                        onChange={(event) =>
                          updateRgb(channel, event.target.value)
                        }
                        maxLength={3}
                        aria-invalid={!isValidRgbChannel(channelValue)}
                        className="w-full rounded-lg border border-[#EAE2D5] px-2 py-2 text-center font-medium text-[#1E1917] focus:border-[#9A1C1F] focus:outline-none"
                      />
                    </label>
                  );
                })}
              </div>
              {rgbDraft &&
                RGB_CHANNELS.some(
                  (channel) => !isValidRgbChannel(rgbDraft[channel]),
                ) && (
                  <p className="mt-1 font-normal text-red-700">
                    Nhập mỗi giá trị RGB từ 0 đến 255.
                  </p>
                )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
