import Link from "next/link";
import { FEATURED_NEWS } from "../services/news.services";

export function NewsFeatured() {
  const item = FEATURED_NEWS;

  return (
    <section className="mb-14 sm:mb-16">
      <article className="bg-white rounded-2xl overflow-hidden border border-[#EAE2D5]/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-12 transition-all hover:shadow-lg group">
        {/* Left Column: Image Area */}
        <div className="lg:col-span-7 relative aspect-[16/11] lg:aspect-auto min-h-[300px] sm:min-h-[380px] overflow-hidden bg-[#EAE2D5]">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />

          {/* Top-Left Badges */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#9A1C1F] text-white shadow-sm">
              {item.specialBadge}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-black/70 text-white backdrop-blur-sm shadow-sm">
              {item.issueNumber}
            </span>
          </div>

          {/* Bottom-Right Verified Badge */}
          {item.verifiedBadge && (
            <div className="absolute bottom-4 right-4 z-10">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#9A1C1F] bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-md border border-[#EAE2D5]/60">
                <svg
                  className="w-3.5 h-3.5 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span>{item.verifiedBadge}</span>
              </span>
            </div>
          )}
        </div>

        {/* Right Column: Article Details */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-9 flex flex-col justify-between">
          <div>
            {/* Author and Date Meta */}
            <div className="flex flex-wrap items-center gap-2 text-xs mb-3">
              <span className="inline-flex items-center gap-1.5 font-bold text-[#9A1C1F]">
                <svg
                  className="w-3.5 h-3.5 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
                </svg>
                <span>{item.author}</span>
              </span>
              <span className="text-[#A89F95]">•</span>
              <span className="inline-flex items-center gap-1 text-[#695D56] font-medium">
                <svg
                  className="w-3.5 h-3.5 fill-none stroke-current stroke-2"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>{item.publishedDate}</span>
              </span>
            </div>

            {/* Article Heading */}
            <h2 className="font-bold text-xl sm:text-2xl text-[#1E1917] leading-snug group-hover:text-[#9A1C1F] transition-colors">
              <Link href={`#${item.slug}`}>{item.title}</Link>
            </h2>

            {/* Summary */}
            <p className="text-xs sm:text-[13px] text-[#5C544E] leading-relaxed mt-3">
              {item.description}
            </p>

            {/* 2 Stat Boxes */}
            {item.highlightStats && item.highlightStats.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                {item.highlightStats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-[#FAF3E8] p-3.5 rounded-xl border border-[#EFE2D0]/60"
                  >
                    <span className="text-[10px] font-bold text-[#695D56] uppercase tracking-wider block">
                      {stat.label}
                    </span>
                    <span
                      className={`text-sm sm:text-[15px] font-bold mt-1 block ${stat.accentColor || "text-[#9A1C1F]"}`}
                    >
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="mt-8 pt-4 border-t border-[#EAE2D5]/70 flex items-center justify-between text-xs">
            <Link
              href={`#${item.slug}`}
              className="font-bold text-[#9A1C1F] hover:underline uppercase tracking-wider inline-flex items-center gap-1.5 transition-transform group/link"
            >
              <span>ĐỌC TOÀN VĂN NGHIÊN CỨU</span>
              <span className="group-hover/link:translate-x-1 transition-transform">
                →
              </span>
            </Link>

            <span className="text-xs text-[#695D56] font-medium">
              Thời gian đọc: {item.readTime}
            </span>
          </div>
        </div>
      </article>
    </section>
  );
}

