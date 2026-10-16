import Link from "next/link";
import type { PageContactProps } from "../types/contact.type";

export function ContactBreadcrumb({ data }: { data: PageContactProps["header"]["breadcrumb"] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#695D56]">
        <li><Link href="/" className="transition-colors hover:text-[#a21f1f]">{data.homeLabel}</Link></li>
        <li className="text-[#A89F95]">&gt;</li>
        <li className="font-semibold text-[#a21f1f]">{data.currentLabel}</li>
      </ol>
    </nav>
  );
}
