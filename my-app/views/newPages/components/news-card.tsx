import Link from "next/link";
import { User, Calendar, ArrowRight, Clock } from "lucide-react";
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
              <User className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{article.author}</span>
            </div>

            <div className="flex items-center gap-1 shrink-0 text-[11px]">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.publishedDate}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-base sm:text-[17px] text-[#1E1917] leading-snug group-hover:text-[#9A1C1F] transition-colors line-clamp-2">
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
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
          </Link>

          <span className="inline-flex items-center gap-1 text-[11px] text-[#695D56] font-medium">
            <Clock className="w-3 h-3 text-[#695D56]" />
            <span>{article.readTime}</span>
          </span>
        </div>
      </div>
    </article>
  );
}
