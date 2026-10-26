import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { NewsHeaderSectionType } from "../types/pagenew.type";

interface NewsBreadcrumbProps {
  data: NewsHeaderSectionType["breadcrumb"];
}

export function NewsBreadcrumb({ data }: NewsBreadcrumbProps) {
  if (!data.homeText && !data.currentPageText) return null;
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#695D56]">
        {data.homeText && data.homeLink && <li>
          <Link
            href={data.homeLink}
            className="hover:text-[#a21f1f] transition-colors"
          >
            {data.homeText}
          </Link>
        </li>}
        {data.homeText && data.homeLink && data.currentPageText && <li>
          <ChevronRight className="w-3.5 h-3.5 text-[#A89F95]" />
        </li>}
        {data.currentPageText && <li className="text-[#a21f1f] font-semibold">
          {data.currentPageText}
        </li>}
      </ol>
    </nav>
  );
}
