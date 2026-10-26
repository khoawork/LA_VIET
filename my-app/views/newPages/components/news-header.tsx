import type { NewsHeaderSectionType } from "../types/pagenew.type";

interface NewsHeaderProps {
  data: NewsHeaderSectionType;
}

export function NewsHeader({ data }: NewsHeaderProps) {
  return (
    <header className="mb-8">
      {/* Accent line */}
      <div
        className="w-10 h-0.5 mb-4"
        style={data.accentColor ? { backgroundColor: data.accentColor } : undefined}
      />

      {/* Main Title */}
      <h1 className="font-black text-3xl sm:text-4xl md:text-5xl text-[#1E1917] tracking-tight uppercase leading-[1.15] max-w-4xl">
        {data.title}
      </h1>

      {/* Subtitle / Description */}
      <p className="text-xs sm:text-sm text-[#5C544E] leading-relaxed max-w-3xl mt-4">
        {data.description}
      </p>
    </header>
  );
}

