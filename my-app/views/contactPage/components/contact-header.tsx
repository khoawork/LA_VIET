import { IonIcon } from "@/shared/icons/ion-icon";
import type { PageContactProps } from "../types/contact.type";

export function ContactHeader({ data }: { data: PageContactProps["header"] }) {
  return (
    <header className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-black uppercase leading-[1.15] tracking-tight text-[#1E1917] sm:text-4xl md:text-5xl">{data.title}</h1>
        <p className="mt-3 max-w-2xl text-xs leading-relaxed text-[#5C544E] sm:text-sm">{data.description}</p>
      </div>
      <div className="flex items-center gap-3.5 self-start rounded-2xl border border-[#EFE2D0] bg-[#FAF3E8] px-5 py-3.5 shadow-xs lg:self-auto">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#9A1C1F] text-white shadow-sm">
          <IonIcon name={data.brandBadge.icon} className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E1917] sm:text-[13px]">{data.brandBadge.title}</h3>
          <p className="mt-0.5 text-[11px] text-[#695D56]">{data.brandBadge.description}</p>
        </div>
      </div>
    </header>
  );
}
