import Link from "next/link";
import type { HomeCtaSectionType } from "../types/pagehome.type";

interface HomeCtaProps {
  data: HomeCtaSectionType;
}

function CtaAction({
  button,
  className,
}: {
  button: HomeCtaSectionType["primaryButton"];
  className: string;
}) {
  if (!button.text) return null;

  if (!button.href.trim()) {
    return (
      <button type="button" disabled className={`${className} disabled:opacity-100 disabled:cursor-default`}>
        {button.text}
      </button>
    );
  }

  return <Link href={button.href} className={className}>{button.text}</Link>;
}

export function HomeCta({ data }: HomeCtaProps) {
  return (
    <section id="tu-van" className="w-full pt-4 pb-6 lg:pt-5 lg:pb-8 px-4 sm:px-6 lg:px-10 xl:px-12">
      <div className="w-full bg-white border border-[#E8E2D5] border-l-[5px] border-l-[#B91C1C] p-6 sm:p-8 lg:p-9 shadow-sm">
        <div className="grid lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-bold tracking-[0.22em] text-[#9A221A] uppercase">
              {data.tagline}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#231F20] tracking-tight">
              {data.title}
            </h2>
            <p className="text-sm sm:text-base text-[#68625B] leading-relaxed max-w-3xl">
              {data.description}
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row gap-2 justify-end">
            <CtaAction
              button={data.primaryButton}
              className="flex-1 min-h-14 flex items-center justify-center px-4 py-3 bg-[#B91C1C] hover:bg-[#9A221A] text-white text-xs font-bold uppercase tracking-[0.1em] text-center transition-colors"
            />
            <CtaAction
              button={data.secondaryButton}
              className="flex-1 min-h-14 flex items-center justify-center px-4 py-3 bg-[#f3e9da] hover:bg-[#EFE1CE] text-[#231F20] border border-[#DCD5C7] text-xs font-bold uppercase tracking-[0.1em] text-center transition-colors"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
