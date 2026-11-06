import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface AppBreadcrumbProps {
  currentLabel?: string;
  homeLabel?: string;
  homeHref?: string;
  className?: string;
  items?: BreadcrumbItem[];
}

export function AppBreadcrumb({
  currentLabel,
  homeLabel = "TRANG CHỦ",
  homeHref = "/",
  className = "",
  items,
}: AppBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`select-none ${className}`}>
      <ol className="flex items-center flex-wrap gap-2 text-xs font-semibold uppercase tracking-wider text-[#695D56]">
        <li>
          <Link href={homeHref} className="hover:text-[#9A1C1F] transition-colors">
            {homeLabel.toUpperCase()}
          </Link>
        </li>

        {items && items.length > 0 ? (
          items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={idx} className="flex items-center gap-2">
                <span className="text-[#A89F95]">/</span>
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-[#9A1C1F] transition-colors"
                  >
                    {item.label.toUpperCase()}
                  </Link>
                ) : (
                  <span className="text-[#9A1C1F] font-bold">{item.label.toUpperCase()}</span>
                )}
              </li>
            );
          })
        ) : currentLabel ? (
          <>
            <li className="text-[#A89F95]">/</li>
            <li className="text-[#9A1C1F] font-bold truncate">
              {currentLabel.toUpperCase()}
            </li>
          </>
        ) : null}
      </ol>
    </nav>
  );
}

