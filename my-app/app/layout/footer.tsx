import Link from "next/link";
import { connection } from "next/server";
import { MapPin } from "lucide-react";
import { IonIcon } from "@/shared/icons/ion-icon";
import { SiteSettingsResponseSchema } from "@/shared/schema/site-settings.schema";

function safeHref(value: string | null | undefined) {
  if (!value) return null;
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  if (value.startsWith("data:image/")) return value;
  try {
    const url = new URL(value);
    return ["http:", "https:", "data:"].includes(url.protocol) ? url.toString() : null;
  } catch {
    return null;
  }
}

function contactHref(
  icon: string | null | undefined,
  value: string | null | undefined,
) {
  if (!value) return null;
  const kind = icon?.replace(/^Fa(?=[A-Z])/, "").toLowerCase() ?? "";
  if (["phone", "telephone", "hotline", "call", "calloutline"].includes(kind)) {
    const number = value.replace(/\(0\)/g, "").replace(/[^\d+]/g, "");
    return number ? `tel:${number}` : null;
  }
  if (
    ["email", "mail", "mailoutline", "envelope"].includes(kind) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  ) {
    return `mailto:${value}`;
  }
  return null;
}

function taglineLines(tagline: string) {
  const words = tagline.trim().split(/\s+/);
  if (words.length < 6) return [tagline];
  return [
    words.slice(0, 2).join(" "),
    words.slice(2, 4).join(" "),
    words[4],
    words.slice(5).join(" "),
  ];
}

export default async function Footer() {
  await connection();
  const { siteSettingsService } = await import(
    "@/modules/site-settings/site-settings.service"
  );
  const record = await siteSettingsService.findSiteSettings();
  if (!record) return null;

  const { logo, company, tagline, footer } =
    SiteSettingsResponseSchema.parse(record);
  const logoHref = safeHref(logo);
  const policies = footer.policies
    .map((item) => ({ label: item.label, href: safeHref(item.href) }))
    .filter((item): item is { label: string; href: string | null } =>
      Boolean(item.label?.trim()),
    );

  return (
    <footer className="w-full border-t border-[#EAE2D5] bg-[#fcf2e3] pb-8 pt-14 text-[#2A2421]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 lg:gap-14">
          <div className="space-y-4 md:col-span-12 lg:col-span-4">
            <Link href="/" className="group flex items-center gap-3 select-none">
              {logoHref && (
                <span className="flex shrink-0 items-center border-r border-[#E5D7C4] pr-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logoHref}
                    alt={`Logo ${company}`}
                    className="h-14 w-14 object-contain sm:h-16 sm:w-16"
                  />
                </span>
              )}
              <span className="min-w-0">
                <strong className="block text-2xl font-bold uppercase leading-none tracking-wide text-[#B91F1F] transition-colors group-hover:text-[#981919] sm:text-[28px]">
                  {company}
                </strong>
                <span className="mt-1 block text-sm font-semibold uppercase leading-none tracking-wide text-[#6D6058] sm:text-[15px]">
                  {taglineLines(tagline).map((line, index) => (
                    <span key={index} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-[#5C544E] sm:text-base">
              {footer.description}
            </p>
            <div className="pt-2">
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#1E1917] sm:text-base">
                {footer.social.title}
              </h4>
              <div className="flex flex-wrap items-center gap-2.5">
                {footer.social.links.map((item, index) => {
                  const href = safeHref(item.href);
                  if (!item.icon?.trim() && !href) return null;
                  const icon = <IonIcon name={item.icon} fallback="linkOutline" />;
                  const className = "flex h-8 w-8 items-center justify-center rounded bg-[#EFE8DC] text-[#423A35]";
                  return href ? (
                    <a key={index} href={href} aria-label={item.icon || "Mạng xã hội"} target="_blank" rel="noopener noreferrer" className={`${className} transition-colors hover:bg-[#9A1C1F] hover:text-white`}>
                      {icon}
                    </a>
                  ) : (
                    <span key={index} role="img" aria-label={item.icon || "Mạng xã hội"} className={className}>
                      {icon}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-4 md:col-span-6 lg:col-span-5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#1E1917] sm:text-base">
              {footer.office.title}
            </h4>
            <div className="space-y-4">
              {footer.office.locations.map((item, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#9A1C1F]"
                    aria-hidden="true"
                  />
                  <div>
                    <h5 className="text-sm font-bold uppercase tracking-wide text-[#1E1917] sm:text-base">
                      {item.name}
                    </h5>
                    <p className="mt-0.5 text-sm leading-snug text-[#5C544E] sm:text-base">
                      {item.address}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 md:col-span-6 lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#1E1917] sm:text-base">
              {footer.contact.title}
            </h4>
            <div className="space-y-2.5 text-sm text-[#5C544E] sm:text-base">
              {footer.contact.methods.map((item, index) => {
                const href = contactHref(item.icon, item.value);
                return (
                  <div key={index} className="flex items-center gap-2.5">
                    <IonIcon name={item.icon} fallback="linkOutline" className="h-4 w-4 text-[#9A1C1F]" />
                    {href ? (
                      <a
                        href={href}
                        className="transition-colors hover:text-[#9A1C1F]"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span>{item.value}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#EAE2D5] pt-6 text-sm text-[#695D56] md:flex-row sm:text-[15px]">
          <p>{footer.copyright}</p>
          <nav
            aria-label="Chính sách"
            className="flex flex-wrap items-center gap-6"
          >
            {policies.map((item, index) => item.href ? (
              <a key={index} href={item.href} className="transition-colors hover:text-[#9A1C1F]">
                {item.label}
              </a>
            ) : (
              <span key={index}>{item.label}</span>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
