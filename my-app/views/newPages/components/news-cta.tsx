import Link from "next/link";
import { ArrowRight, BookOpenCheck, Mail } from "lucide-react";
import type { NewsCtaSectionType } from "../types/pagenew.type";
import { DEFAULT_PAGE_NEW_PROPS } from "../types/pagenew.type";

interface NewsCtaProps {
  data?: NewsCtaSectionType;
}

export function NewsCta({ data }: NewsCtaProps = {}) {
  const cta = data || DEFAULT_PAGE_NEW_PROPS.cta;

  if (!cta.title && !cta.description && !cta.badge) {
    return null;
  }

  return (
    <section className="mb-10">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#690E12] via-[#851619] to-[#600C10] text-white p-8 sm:p-10 lg:p-12 shadow-2xl">
        {/* Subtle decorative glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Left info column */}
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-200/90">
              <BookOpenCheck className="w-4 h-4 text-rose-300" />
              <span>{cta.badge}</span>
            </div>

            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight uppercase leading-snug">
              {cta.title}
            </h2>

            <p className="text-xs sm:text-sm text-rose-100/80 leading-relaxed max-w-xl">
              {cta.description}
            </p>
          </div>

          {/* Right action buttons column */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3.5 shrink-0">
            <Link
              href={cta.primaryButton.link || "/contact"}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-white hover:bg-rose-50 text-[#851619] font-bold text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-[0.98]"
            >
              <span>{cta.primaryButton.text}</span>
              <ArrowRight className="w-4 h-4 text-[#851619]" />
            </Link>

            <Link
              href={cta.secondaryButton.link || "#newsletter"}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-colors active:scale-[0.98]"
            >
              <Mail className="w-4 h-4 text-white" />
              <span>{cta.secondaryButton.text}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

