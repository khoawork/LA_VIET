export function ContactHeader() {
  return (
    <header className="mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      {/* Left Title & Description */}
      <div className="max-w-3xl">

        <h1 className="font-black text-3xl sm:text-4xl md:text-5xl text-[#1E1917] tracking-tight uppercase leading-[1.15]">
          LIÊN HỆ &amp; TƯ VẤN
        </h1>

        <p className="text-xs sm:text-sm text-[#5C544E] leading-relaxed mt-3 max-w-2xl">
          Đồng hành cùng kiến trúc sư, chủ đầu tư và nhà sưu tập kiến tạo không gian di sản với tinh hoa sơn ta truyền thống và tư duy thiết kế đương đại.
        </p>
      </div>

      {/* Right Brand Badge: MỘC ĐỎ LÀ VIỆT */}
      <div className="self-start lg:self-auto bg-[#FAF3E8] px-5 py-3.5 rounded-2xl border border-[#EFE2D0] flex items-center gap-3.5 shadow-xs">
        <div className="w-10 h-10 rounded-xl bg-[#9A1C1F] text-white flex items-center justify-center shrink-0 shadow-sm">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.27 19.66 10.59 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-4 7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm4-3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm4 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm1 5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
          </svg>
        </div>
        <div>
          <h3 className="font-bold text-xs sm:text-[13px] text-[#1E1917] tracking-wider uppercase">
            MỘC ĐỎ LÀ VIỆT
          </h3>
          <p className="text-[11px] text-[#695D56] mt-0.5">
            Chuẩn mực xưởng hội họa liên ngành
          </p>
        </div>
      </div>
    </header>
  );
}

