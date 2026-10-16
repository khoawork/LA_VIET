import Link from "next/link";
import type { ProjectHeaderData } from "../types/project.type";

export function ProjectBreadcrumb({
  breadcrumb,
}: {
  breadcrumb: ProjectHeaderData["breadcrumb"];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
      <ol className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#695D56]">
        <li>
          <Link href="/" className="hover:text-[#9A1C1F] transition-colors">
            {breadcrumb.homeLabel}
          </Link>
        </li>
        <li className="text-[#A89F95]">/</li>
        <li className="text-[#9A1C1F] font-bold">{breadcrumb.currentLabel}</li>
      </ol>
    </nav>
  );
}
