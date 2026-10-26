import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import type { AboutCtaSectionType } from "@/shared/schema/pages/about-product.schema";
import { FormattedColorText } from "@/shared/components/formatted-color-text";

interface AboutCtaProps {
  data: AboutCtaSectionType;
}

export function AboutCta({ data }: AboutCtaProps) {
  const badge = data.badge;
  const heading = data.heading ?? "";
  const description = data.description ?? "";
  const primaryLabel = data.primaryButton?.label;
  const primaryLink = data.primaryButton?.link;
  const secondaryLabel = data.secondaryButton?.label;
  const secondaryLink = data.secondaryButton?.link;

  if (!badge && !heading && !description && !primaryLabel && !secondaryLabel) return null;

  return (
    <section className="mb-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#690E12] via-[#851619] to-[#600C10] text-white p-8 sm:p-10 lg:p-12 shadow-2xl">
        {/* Subtle decorative glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Left info column */}
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-200/90">
              <svg className="w-4 h-4 fill-current text-rose-300" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span>{badge}</span>
            </div>

            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight uppercase leading-snug">
              <FormattedColorText text={heading} as="span" />
            </h2>

            <div className="text-xs sm:text-sm text-rose-100/80 leading-relaxed max-w-xl">
              <FormattedColorText text={description} as="p" />
            </div>
          </div>

          {/* Right action buttons column */}
          {((primaryLabel && primaryLink) || (secondaryLabel && secondaryLink)) && <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3.5 shrink-0">
            {primaryLabel && primaryLink && <Link
              href={primaryLink}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-white hover:bg-rose-50 text-[#851619] font-bold text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-[0.98]"
            >
              <span>{primaryLabel}</span>
              <ArrowRight className="w-4 h-4 text-[#851619]" />
            </Link>}

            {secondaryLabel && secondaryLink && <Link
              href={secondaryLink}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-colors active:scale-[0.98]"
            >
              <BookOpen className="w-4 h-4 text-white" />
              <span>{secondaryLabel}</span>
            </Link>}
          </div>}
        </div>
      </div>
    </section>
  );
}
