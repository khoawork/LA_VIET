import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { NewsHeaderSectionType } from "../types/pagenew.type";
import { DEFAULT_PAGE_NEW_PROPS } from "../types/pagenew.type";

interface NewsBreadcrumbProps {
  data?: NewsHeaderSectionType["breadcrumb"];
}

export function NewsBreadcrumb({ data }: NewsBreadcrumbProps = {}) {
  const breadcrumb = data || DEFAULT_PAGE_NEW_PROPS.header.breadcrumb;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#695D56]">
        <li>
          <Link
            href={breadcrumb.homeLink || "/"}
            className="hover:text-[#a21f1f] transition-colors"
          >
            {breadcrumb.homeText || "Trang chủ"}
          </Link>
        </li>
        <li>
          <ChevronRight className="w-3.5 h-3.5 text-[#A89F95]" />
        </li>
        <li className="text-[#a21f1f] font-semibold">
          {breadcrumb.currentPageText || "Tin tức & Nghiên cứu"}
        </li>
      </ol>
    </nav>
  );
}
