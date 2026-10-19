import Link from "next/link";
import Image from "next/image";
import type { HomeNewsSectionType } from "../types/pagehome.type";
import { DEFAULT_PAGE_HOME_PROPS } from "../types/pagehome.type";

interface HomeNewsProps {
  data?: HomeNewsSectionType;
}

export function HomeNews({ data = DEFAULT_PAGE_HOME_PROPS.newsSection }: HomeNewsProps) {
  const articlesList = data.articles && data.articles.length > 0
    ? data.articles
    : DEFAULT_PAGE_HOME_PROPS.newsSection.articles;

  return (
    <section id="tin-tuc" className="w-full py-20 lg:py-28 bg-white border-y border-[#E8E2D5] px-6 sm:px-10 lg:px-16 xl:px-24">
      <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <span className="text-xs  font-bold tracking-[0.22em] text-[#9A221A] uppercase">
            {data.tagline}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#231F20] tracking-tight">
            {data.title}
          </h2>
        </div>
        <Link
          href={data.link?.href || "/news"}
          className="text-xs font-bold uppercase tracking-[0.16em] text-[#9A221A] hover:underline flex items-center gap-1.5"
        >
          {data.link?.text || "Xem tất cả tin tức"} <span>→</span>
        </Link>
      </div>

      {/* 3 Articles Grid */}
      <div className="w-full grid md:grid-cols-3 gap-8">
        {articlesList.map((art) => (
          <article
            key={art.id}
            className="group flex flex-col bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#E8E2D5] hover:border-[#9A221A]/40 transition-all shadow-sm hover:shadow-md"
          >
            <div className="relative aspect-[16/10] overflow-hidden w-full">
              <Image
                src={art.img}
                alt={art.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span
                className={`absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${art.tagColor}`}
              >
                {art.tag}
              </span>
            </div>

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-[#78716C]">
                  {art.date}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#231F20] group-hover:text-[#9A221A] transition-colors leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#68625B] leading-relaxed line-clamp-3">
                  {art.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8E2D5]/70 flex items-center justify-between text-xs font-bold text-[#9A221A]">
                <Link href="/news" className="hover:underline">Đọc tiếp →</Link>
                <span className="text-[#A8A29E] font-normal cursor-pointer">➦ Chia sẻ</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
