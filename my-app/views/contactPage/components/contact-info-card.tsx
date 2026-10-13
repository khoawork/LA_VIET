import { OFFICE_LOCATIONS, CONTACT_CHANNELS } from "../services/contact.services";

export function ContactInfoCard() {
  const [loc1, loc2] = OFFICE_LOCATIONS;

  return (
    <article className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE2D5]/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between space-y-6">
      {/* Company Name Header with vertical red line */}
      <div className="flex items-start gap-3">
        <div className="w-1.5 h-6 bg-[#9A1C1F] rounded-full shrink-0 mt-0.5" />
        <h2 className="font-bold text-sm sm:text-base text-[#1E1917] uppercase tracking-wide leading-snug">
          CÔNG TY TNHH ỨNG DỤNG LIÊN NGÀNH SƠN MÀI HỘI HOẠ LÀ VIỆT
        </h2>
      </div>

      {/* 2 Office Location Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* VPGD 1 */}
        <div className="bg-[#FAF3E8] p-4 sm:p-5 rounded-xl border border-[#EFE2D0]/70 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-1.5 font-bold text-xs text-[#9A1C1F] uppercase mb-1.5">
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
              </svg>
              <span>{loc1.name}</span>
            </div>
            <p className="text-xs text-[#5C544E] leading-relaxed">
              {loc1.address}
            </p>
          </div>

          <div className="pt-2 border-t border-[#EAE0D0]/60 flex items-center gap-1.5 text-[11px] text-[#695D56]">
            <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{loc1.hours}</span>
          </div>
        </div>

        {/* VPGD 2 */}
        <div className="bg-[#FAF3E8] p-4 sm:p-5 rounded-xl border border-[#EFE2D0]/70 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-1.5 font-bold text-xs text-[#9A1C1F] uppercase mb-1.5">
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path d="M12 3v4M6 21l6-14 6 14M7.5 17.5h9" />
              </svg>
              <span>{loc2.name}</span>
            </div>
            <p className="text-xs text-[#5C544E] leading-relaxed">
              {loc2.address}
            </p>
          </div>

          <div className="pt-2 border-t border-[#EAE0D0]/60 space-y-1.5">
            {loc2.tag && (
              <span className="inline-block bg-[#F5EAD6] text-[#96671E] font-medium text-[10px] px-2 py-0.5 rounded">
                {loc2.tag}
              </span>
            )}
            <div className="flex items-center gap-1.5 text-[11px] text-[#695D56]">
              <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              <span>{loc2.note}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Contact Hotline Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {CONTACT_CHANNELS.map((ch, idx) => (
          <div
            key={idx}
            className="bg-[#FAF3E8] p-4 rounded-xl border border-[#EFE2D0]/60 flex flex-col justify-between"
          >
            <span className="text-[10px] font-bold text-[#695D56] uppercase tracking-wider block">
              {ch.title}
            </span>
            <span
              className={`text-sm sm:text-[15px] font-bold my-1 truncate ${ch.isRed ? "text-[#9A1C1F]" : "text-[#1E1917]"}`}
            >
              {ch.primaryText}
            </span>
            <span className="text-[11px] text-[#695D56] truncate">
              {ch.secondaryText}
            </span>
          </div>
        ))}
      </div>

      {/* Social Network Links */}
      <div className="pt-4 border-t border-[#EAE2D5]/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-bold text-[#1E1917] tracking-wider uppercase text-[11px]">
          <svg className="w-4 h-4 fill-current text-[#9A1C1F]" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
          </svg>
          <span>KẾT NỐI VỚI CHÚNG TÔI</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Globe */}
          <a href="#" aria-label="Website" className="w-8 h-8 rounded bg-[#EFE8DC] text-[#423A35] hover:bg-[#9A1C1F] hover:text-white flex items-center justify-center transition-colors">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
          </a>
          {/* Like */}
          <a href="#" aria-label="Facebook" className="w-8 h-8 rounded bg-[#EFE8DC] text-[#423A35] hover:bg-[#9A1C1F] hover:text-white flex items-center justify-center transition-colors">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>
          </a>
          {/* Instagram */}
          <a href="#" aria-label="Instagram" className="w-8 h-8 rounded bg-[#EFE8DC] text-[#423A35] hover:bg-[#9A1C1F] hover:text-white flex items-center justify-center transition-colors">
            <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          {/* Youtube */}
          <a href="#" aria-label="Youtube" className="w-8 h-8 rounded bg-[#EFE8DC] text-[#423A35] hover:bg-[#9A1C1F] hover:text-white flex items-center justify-center transition-colors">
            <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="3" ry="3"/><polygon points="10 9 15 12 10 15 10 9" fill="currentColor" stroke="none"/></svg>
          </a>
          {/* Bag */}
          <a href="#" aria-label="Cửa hàng" className="w-8 h-8 rounded bg-[#EFE8DC] text-[#423A35] hover:bg-[#9A1C1F] hover:text-white flex items-center justify-center transition-colors">
            <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </a>
        </div>
      </div>
    </article>
  );
}

