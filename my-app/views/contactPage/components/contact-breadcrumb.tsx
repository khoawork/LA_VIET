import Link from "next/link";

export function ContactBreadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#695D56]">
        <li>
          <Link href="/" className="hover:text-[#a21f1f] transition-colors">
            Trang chủ
          </Link>
        </li>
        <li className="text-[#A89F95]">&gt;</li>
        <li className="text-[#a21f1f] font-semibold">
          Liên hệ hợp tác
        </li>
      </ol>
    </nav>
  );
}

