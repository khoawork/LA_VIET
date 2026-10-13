import { EXPERIENCE_SPACES } from "../services/contact.services";

export function ContactExperience() {
  const [space1, space2] = EXPERIENCE_SPACES;

  return (
    <article className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE2D5]/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-[#EAE2D5]/60 pb-3">
        <div>
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#9A1C1F] uppercase block mb-1">
            KHÔNG GIAN TRẢI NGHIỆM
          </span>
          <h2 className=" font-bold text-lg sm:text-xl text-[#1E1917] uppercase tracking-tight leading-snug">
            SẢNH TRƯNG BÀY &amp; THƯ VIỆN MẪU VÓC
          </h2>
        </div>

        <span className="text-xs text-[#695D56] font-medium shrink-0 pt-1">
          2 Không gian mở
        </span>
      </div>

      {/* 2 Spaces Showcase Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Space 1: Showroom Gò Vấp */}
        <div className="group">
          <div className="relative aspect-[16/11] rounded-xl overflow-hidden bg-[#EAE2D5]">
            <img
              src={space1.imageUrl}
              alt={space1.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute bottom-2.5 left-2.5">
              <span className="text-[10px] font-bold text-white bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded">
                {space1.tag}
              </span>
            </div>
          </div>

          <h3 className="font-bold text-xs sm:text-sm text-[#1E1917] mt-3 group-hover:text-[#9A1C1F] transition-colors leading-snug">
            {space1.title}
          </h3>
          <p className="text-[11px] text-[#5C544E] mt-1 leading-snug">
            {space1.description}
          </p>
        </div>

        {/* Space 2: Atelier Bình Dương */}
        <div className="group">
          <div className="relative aspect-[16/11] rounded-xl overflow-hidden bg-[#EAE2D5]">
            <img
              src={space2.imageUrl}
              alt={space2.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute bottom-2.5 left-2.5">
              <span className="text-[10px] font-bold text-white bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded">
                {space2.tag}
              </span>
            </div>
          </div>

          <h3 className="font-bold text-xs sm:text-sm text-[#1E1917] mt-3 group-hover:text-[#9A1C1F] transition-colors leading-snug">
            {space2.title}
          </h3>
          <p className="text-[11px] text-[#5C544E] mt-1 leading-snug">
            {space2.description}
          </p>
        </div>
      </div>

      {/* Bottom Highlight Notice */}
      <div className="bg-[#FAF3E8] p-3.5 sm:p-4 rounded-xl border border-[#EFE2D0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs">
        <div className="flex items-center gap-2 font-bold text-[#1E1917]">
          <span className="w-5 h-5 rounded-full bg-[#FAF1EC] text-[#9A1C1F] flex items-center justify-center shrink-0">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </span>
          <span className="text-[11px] sm:text-xs">
            Đón tiếp riêng từng đoàn chuyên gia &amp; KTS
          </span>
        </div>

        <span className="font-bold text-xs text-[#9A1C1F] shrink-0">
          Đặt hẹn trước 24h
        </span>
      </div>
    </article>
  );
}

