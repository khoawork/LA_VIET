"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Palette,
  X,
  RotateCcw,
  Sparkles,
  Bold,
  Italic,
  Underline,
} from "lucide-react";

interface ColorHighlightInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  className?: string;
}

// Bảng màu chuẩn thương hiệu Là Việt & mỹ thuật sơn mài
const PRESET_COLORS = [
  { name: "Đỏ Là Việt", value: "#9A1C1F" },
  { name: "Đỏ Chu Sa", value: "#D9381E" },
  { name: "Vàng Hoàng Kim", value: "#96671E" },
  { name: "Vàng Nhũ Kim", value: "#D4AF37" },
  { name: "Đen Sơn Then", value: "#1E1917" },
  { name: "Nâu Gỗ Trầm", value: "#5C544E" },
  { name: "Xanh Cổ Phong", value: "#1B4931" },
  { name: "Xanh Lam Thủy", value: "#0284C7" },
];

export function ColorHighlightInput({
  value,
  onChange,
  label,
  placeholder = "Nhập văn bản... (bôi đen chữ để chọn màu, in nghiêng, gạch chân)",
  multiline = false,
  rows = 3,
  className = "",
}: ColorHighlightInputProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [popupPos, setPopupPos] = useState<{ x: number; y: number } | null>(null);
  const [selectedText, setSelectedText] = useState("");
  const [customColor, setCustomColor] = useState("#9A1C1F");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const isUpdatingRef = useRef(false);

  // Đồng bộ giá trị bên ngoài vào editor khi khởi tạo hoặc khi value thay đổi từ ngoài
  useEffect(() => {
    if (editorRef.current && !isUpdatingRef.current) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || "";
      }
    }
  }, [value]);

  // Kiểm tra selection khi người dùng bôi đen chữ
  const checkSelection = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !editorRef.current) {
      setPopupPos(null);
      setSelectedText("");
      return;
    }

    // Đảm bảo selection nằm trong editor hiện tại
    const anchorNode = sel.anchorNode;
    const focusNode = sel.focusNode;
    if (
      !editorRef.current.contains(anchorNode) ||
      !editorRef.current.contains(focusNode)
    ) {
      setPopupPos(null);
      setSelectedText("");
      return;
    }

    const text = sel.toString().trim();
    if (!text) {
      setPopupPos(null);
      setSelectedText("");
      return;
    }

    setSelectedText(text);

    // Kiểm tra trạng thái định dạng của đoạn text hiện tại
    try {
      setIsBold(document.queryCommandState("bold"));
      setIsItalic(document.queryCommandState("italic"));
      setIsUnderline(document.queryCommandState("underline"));
    } catch {
      // Bỏ qua lỗi queryCommandState nếu có
    }

    // Tính toán tọa độ hiển thị popup phía trên đoạn chữ được bôi đen
    try {
      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      const popupWidth = 340;
      let x = rect.left + rect.width / 2;
      let y = rect.top - 12;

      // Giới hạn để popup không tràn ra ngoài màn hình
      if (x - popupWidth / 2 < 16) {
        x = popupWidth / 2 + 16;
      } else if (x + popupWidth / 2 > window.innerWidth - 16) {
        x = window.innerWidth - popupWidth / 2 - 16;
      }

      // Nếu sát mép trên màn hình quá thì hiển thị bên dưới đoạn bôi đen
      if (y < 95) {
        y = rect.bottom + 65;
      }

      setPopupPos({ x, y });
    } catch {
      setPopupPos(null);
    }
  }, []);

  // Lắng nghe sự kiện thả chuột hoặc bấm phím bôi đen
  const handleMouseUp = () => {
    setTimeout(checkSelection, 20);
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.shiftKey || ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
      setTimeout(checkSelection, 20);
    }
  };

  const triggerChange = () => {
    if (!editorRef.current) return;
    isUpdatingRef.current = true;
    const newHtml = editorRef.current.innerHTML;
    onChange(newHtml);
    setTimeout(() => {
      isUpdatingRef.current = false;
    }, 50);
  };

  // Toggle in đậm (Bold)
  const toggleBold = () => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand("bold", false);
    setIsBold(document.queryCommandState("bold"));
    triggerChange();
  };

  // Toggle in nghiêng (Italic)
  const toggleItalic = () => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand("italic", false);
    setIsItalic(document.queryCommandState("italic"));
    triggerChange();
  };

  // Toggle gạch chân (Underline)
  const toggleUnderline = () => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand("underline", false);
    setIsUnderline(document.queryCommandState("underline"));
    triggerChange();
  };

  // Áp dụng màu cho đoạn text đang được bôi đen
  const applyColor = (color: string) => {
    if (!editorRef.current) return;

    editorRef.current.focus();

    // Sử dụng styleWithCSS và foreColor để bao bọc text bằng span style color
    document.execCommand("styleWithCSS", false, "true");
    document.execCommand("foreColor", false, color);

    triggerChange();

    // Tự động đóng popup sau khi chọn màu
    setTimeout(() => {
      setPopupPos(null);
    }, 200);
  };

  // Xóa toàn bộ định dạng của đoạn chữ đang chọn
  const clearFormatting = () => {
    if (!editorRef.current) return;
    editorRef.current.focus();

    document.execCommand("removeFormat", false);
    setIsBold(false);
    setIsItalic(false);
    setIsUnderline(false);

    triggerChange();
    setPopupPos(null);
  };

  // Cập nhật khi gõ phím vào contenteditable
  const handleInput = () => {
    triggerChange();
  };

  // Xử lý phím Enter cho single-line
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!multiline && e.key === "Enter") {
      e.preventDefault();
    }
  };

  // Ẩn popup khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target as Node) &&
        editorRef.current &&
        !editorRef.current.contains(e.target as Node)
      ) {
        setPopupPos(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative space-y-1.5">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#1E1917] uppercase tracking-wider flex items-center gap-1.5">
            <span>{label}</span>
          </label>
          <span className="text-[11px] text-stone-500 font-medium italic">
            * Bôi đen đoạn chữ để chọn màu, in nghiêng, gạch chân
          </span>
        </div>
      )}

      {/* Vùng soạn thảo Rich Contenteditable */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onMouseUp={handleMouseUp}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        data-placeholder={placeholder}
        style={{
          minHeight: multiline ? `${rows * 26}px` : "42px",
        }}
        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#f7f5f1]/40 border border-[#f3e9db] text-xs leading-relaxed font-bold text-[#1E1917] focus:outline-none focus:border-[#a21f1f] focus:bg-white transition-all overflow-y-auto empty:before:content-[attr(data-placeholder)] empty:before:text-stone-400 empty:before:font-normal ${className}`}
      />

      {/* Popup Định Dạng & Chọn Màu Nổi Bật khi Bôi Đen Chữ */}
      {popupPos && (
        <div
          ref={popupRef}
          style={{
            position: "fixed",
            left: `${popupPos.x}px`,
            top: `${popupPos.y}px`,
            transform: "translate(-50%, -100%)",
            zIndex: 9999,
          }}
          className="bg-white rounded-2xl shadow-2xl border border-[#EAE2D5] p-2.5 flex flex-col gap-2 min-w-[320px] max-w-[360px] animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header & Quick Formatting Bar */}
          <div className="flex items-center justify-between pb-1.5 border-b border-[#f3e9db] gap-2">
            {/* Bộ công cụ định dạng chữ: In đậm, In nghiêng, Gạch chân */}
            <div className="flex items-center gap-0.5 bg-[#FAF8F5] p-0.5 rounded-lg border border-[#f3e9db]">
              <button
                type="button"
                title="In đậm (Bold)"
                onMouseDown={(e) => e.preventDefault()}
                onClick={toggleBold}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  isBold
                    ? "bg-[#9A1C1F] text-white shadow-xs font-bold"
                    : "text-stone-600 hover:bg-stone-200/70"
                }`}
              >
                <Bold className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                title="In nghiêng (Italic)"
                onMouseDown={(e) => e.preventDefault()}
                onClick={toggleItalic}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  isItalic
                    ? "bg-[#9A1C1F] text-white shadow-xs"
                    : "text-stone-600 hover:bg-stone-200/70"
                }`}
              >
                <Italic className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                title="Gạch chân (Underline)"
                onMouseDown={(e) => e.preventDefault()}
                onClick={toggleUnderline}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  isUnderline
                    ? "bg-[#9A1C1F] text-white shadow-xs"
                    : "text-stone-600 hover:bg-stone-200/70"
                }`}
              >
                <Underline className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Đoạn text preview */}
            <div className="flex items-center gap-1 min-w-0 flex-1 justify-center">
              <span className="text-[10px] text-stone-400 uppercase font-bold">Chữ:</span>
              <span className="text-[11px] text-[#a21f1f] truncate font-medium max-w-[110px]">
                &ldquo;{selectedText}&rdquo;
              </span>
            </div>

            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setPopupPos(null)}
              className="text-stone-400 hover:text-stone-700 p-0.5 rounded cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Dải Màu Mẫu (Preset Colors) */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-bold text-stone-500 uppercase flex items-center gap-1 mr-1">
              <Palette className="w-3 h-3 text-[#a21f1f]" />
              Màu:
            </span>

            {PRESET_COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                title={c.name}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => applyColor(c.value)}
                style={{ backgroundColor: c.value }}
                className="w-5.5 h-5.5 rounded-full border border-black/10 hover:scale-125 transition-transform shadow-xs cursor-pointer relative group flex items-center justify-center"
              >
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-black/85 text-white text-[9px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                  {c.name}
                </span>
              </button>
            ))}

            {/* Custom Color Picker input */}
            <label
              title="Chọn màu tự do"
              onMouseDown={(e) => e.preventDefault()}
              className="w-5.5 h-5.5 rounded-full border border-dashed border-[#a21f1f] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform relative group bg-[#a21f1f]/5"
            >
              <Sparkles className="w-3 h-3 text-[#a21f1f]" />
              <input
                type="color"
                value={customColor}
                onChange={(e) => {
                  setCustomColor(e.target.value);
                  applyColor(e.target.value);
                }}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              />
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-black/85 text-white text-[9px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                Màu tự do
              </span>
            </label>
          </div>

          {/* Nút Xóa Định Dạng Về Mặc Định */}
          <div className="flex items-center justify-between pt-1 border-t border-[#f3e9db] text-[11px]">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={clearFormatting}
              className="inline-flex items-center gap-1 text-stone-500 hover:text-stone-800 font-semibold cursor-pointer py-0.5"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Xóa định dạng (Mặc định)</span>
            </button>

            <span className="text-[10px] text-stone-400">
              Bấm để áp dụng ngay
            </span>
          </div>

          {/* Mũi tên trỏ xuống dưới popup */}
          <div
            className="w-2.5 h-2.5 bg-white border-r border-b border-[#EAE2D5] absolute -bottom-1.5 left-1/2 -translate-x-1/2 rotate-45"
          />
        </div>
      )}
    </div>
  );
}

export default ColorHighlightInput;
