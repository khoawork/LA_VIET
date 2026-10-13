export function NewsHeader() {
  return (
    <header className="mb-8">
      {/* Red accent line */}
      <div className="w-10 h-0.5 bg-[#9A1C1F] mb-4" />

      {/* Main Title */}
      <h1 className="font-black text-3xl sm:text-4xl md:text-5xl text-[#1E1917] tracking-tight uppercase leading-[1.15] max-w-4xl">
        TIN TỨC, NGHIÊN CỨU &amp; HOẠT ĐỘNG LIÊN NGÀNH
      </h1>

      {/* Subtitle / Description */}
      <p className="text-xs sm:text-sm text-[#5C544E] leading-relaxed max-w-3xl mt-4">
        Không gian tổng hợp các công trình khảo cứu kỹ nghệ chất liệu, chuyên luận bảo tồn di sản hội họa và nhật ký thực thi kiến trúc sơn mài quy mô lớn từ Là Việt cùng các đối tác chuyên môn.
      </p>
    </header>
  );
}

