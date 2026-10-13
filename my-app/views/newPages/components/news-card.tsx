import Link from "next/link";
import { NewsItem } from "../types/news.type";

interface NewsCardProps {
  article: NewsItem;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-[#EAE2D5]/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Thumbnail with Tag Badge */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EAE2D5]">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top-Left Category Tag */}
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-black/75 text-white backdrop-blur-sm shadow-sm">
            {article.tagBadge}
          </span>
        </div>
      </div>

      {/* Body Area */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Author and Date Meta */}
          <div className="flex items-center justify-between text-xs mb-3 text-[#695D56]">
            <div className="flex items-center gap-1.5 font-bold text-[#9A1C1F] truncate mr-2">
              <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
              <span className="truncate">{article.author}</span>
            </div>

            <div className="flex items-center gap-1 shrink-0 text-[11px]">
              <svg
                className="w-3.5 h-3.5 fill-none stroke-current stroke-2"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>{article.publishedDate}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className=" font-bold text-base sm:text-[17px] text-[#1E1917] leading-snug group-hover:text-[#9A1C1F] transition-colors line-clamp-2">
            <Link href={`#${article.slug}`}>{article.title}</Link>
          </h3>

          {/* Description */}
          <p className="text-xs text-[#5C544E] leading-relaxed line-clamp-3 mt-2.5">
            {article.description}
          </p>
        </div>

        {/* Footer info */}
        <div className="mt-5 pt-3.5 border-t border-[#EAE2D5]/70 flex items-center justify-between text-xs">
          <Link
            href={`#${article.slug}`}
            className="font-bold text-[#9A1C1F] hover:underline inline-flex items-center gap-1 transition-all group/link"
          >
            <span>Chi tiết bài viết</span>
            <span className="group-hover/link:translate-x-0.5 transition-transform">
              →
            </span>
          </Link>

          <span className="text-[11px] text-[#695D56] font-medium">
            {article.readTime}
          </span>
        </div>
      </div>
    </article>
  );
}

