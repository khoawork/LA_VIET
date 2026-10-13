import Link from "next/link";

export function AboutBreadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
      <ol className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#695D56]">
        <li>
          <Link href="/" className="hover:text-[#9A1C1F] transition-colors">
            TRANG CHỦ
          </Link>
        </li>
        <li className="text-[#A89F95]">/</li>
        <li className="text-[#9A1C1F] font-bold">
          VỀ CHÚNG TÔI
        </li>
      </ol>
    </nav>
  );
}

