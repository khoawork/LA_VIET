import React from "react";

interface FormattedColorTextProps {
  text?: string;
  className?: string;
  as?: "span" | "div" | "p" | "h1" | "h2" | "h3";
}

/**
 * Component hiển thị văn bản có hỗ trợ màu chữ tùy chỉnh từ CMS.
 * Tự động nhận diện chuỗi có chứa thẻ HTML (như span style color)
 * để render chính xác màu sắc mà quản trị viên đã chọn khi bôi đen.
 */
export function FormattedColorText({
  text = "",
  className = "",
  as: Tag = "span",
}: FormattedColorTextProps) {
  if (!text) return null;

  // Kiểm tra nếu text có chứa thẻ HTML format (span, font, b, i...)
  const hasHtml = /<[a-z][\s\S]*>/i.test(text);

  if (hasHtml) {
    return (
      <Tag
        className={className}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  }

  return <Tag className={className}>{text}</Tag>;
}

export default FormattedColorText;

