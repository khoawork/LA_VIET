import { IonIcon } from "@/shared/icons/ion-icon";
import type { PageContactProps } from "../types/contact.type";

export function ContactExperience({ data }: { data: PageContactProps["experience"] }) {
  return (
    <article className="flex flex-col justify-between space-y-6 rounded-2xl border border-[#EAE2D5]/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] sm:p-8">
      <div className="flex items-start justify-between gap-4 border-b border-[#EAE2D5]/60 pb-3">
        <div>
          <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.25em] text-[#9A1C1F]">{data.eyebrow}</span>
          <h2 className="text-lg font-bold uppercase leading-snug tracking-tight text-[#1E1917] sm:text-xl">{data.title}</h2>
        </div>
        <span className="shrink-0 pt-1 text-xs font-medium text-[#695D56]">{data.suffix}</span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.spaces.map((space, index) => (
          <div key={index} className="group">
            <div className="relative aspect-[16/11] overflow-hidden rounded-xl bg-[#EAE2D5]">
              <img src={space.imageUrl} alt={space.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute bottom-2.5 left-2.5"><span className="rounded bg-black/70 px-2.5 py-1 text-[10px] font-bold text-white">{space.tag}</span></div>
            </div>
            <h3 className="mt-3 text-xs font-bold leading-snug text-[#1E1917] transition-colors group-hover:text-[#9A1C1F] sm:text-sm">{space.title}</h3>
            <p className="mt-1 text-[11px] leading-snug text-[#5C544E]">{space.description}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-start justify-between gap-2.5 rounded-xl border border-[#EFE2D0] bg-[#FAF3E8] p-3.5 text-xs sm:flex-row sm:items-center sm:p-4">
        <div className="flex items-center gap-2 font-bold text-[#1E1917]"><IonIcon name="checkmark-circle-outline" className="h-5 w-5 text-[#9A1C1F]" /><span>{data.visitNote}</span></div>
        <span className="shrink-0 font-bold text-[#9A1C1F]">{data.bookingNote}</span>
      </div>
    </article>
  );
}
