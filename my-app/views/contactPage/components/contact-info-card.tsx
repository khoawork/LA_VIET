import { IonIcon } from "@/shared/icons/ion-icon";
import type { PageContactProps } from "../types/contact.type";

export function ContactInfoCard({ data }: { data: PageContactProps["contactInfo"] }) {
  return (
    <article className="flex flex-col justify-between space-y-6 rounded-2xl border border-[#EAE2D5]/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] sm:p-8">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 h-6 w-1.5 shrink-0 rounded-full bg-[#9A1C1F]" />
        <h2 className="text-sm font-bold uppercase leading-snug tracking-wide text-[#1E1917] sm:text-base">{data.companyName}</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {data.offices.map((office, index) => (
          <div key={index} className="flex flex-col justify-between space-y-3 rounded-xl border border-[#EFE2D0]/70 bg-[#FAF3E8] p-4 sm:p-5">
            <div>
              <div className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase text-[#9A1C1F]">
                <IonIcon name={office.icon} /> <span>{office.name}</span>
              </div>
              <p className="text-xs leading-relaxed text-[#5C544E]">{office.address}</p>
            </div>
            <div className="space-y-1.5 border-t border-[#EAE0D0]/60 pt-2">
              {office.tag && <span className="inline-block rounded bg-[#F5EAD6] px-2 py-0.5 text-[10px] font-medium text-[#96671E]">{office.tag}</span>}
              <div className="flex items-center gap-1.5 text-[11px] text-[#695D56]">
                <IonIcon name={office.detail.icon} className="h-3.5 w-3.5" /> <span>{office.detail.text}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {data.channels.map((channel, index) => (
          <div key={index} className="flex flex-col justify-between rounded-xl border border-[#EFE2D0]/60 bg-[#FAF3E8] p-4">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#695D56]">{channel.title}</span>
            {channel.contacts.map((contact, contactIndex) => (
              <div key={contactIndex}>
                <span className={`my-1 block break-all text-sm font-bold ${index === 0 || index === 2 ? "text-[#9A1C1F]" : "text-[#1E1917]"}`}>{contact.value}</span>
                {contact.description && <span className="block text-[11px] text-[#695D56]">{contact.description}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-col items-start justify-between gap-3 border-t border-[#EAE2D5]/70 pt-4 text-xs sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#1E1917]">
          <IonIcon name="share-social-outline" className="h-4 w-4 text-[#9A1C1F]" /> {data.social.title}
        </div>
        <div className="flex items-center gap-2">
          {data.social.links.map((link, index) => (
            <a key={index} href={link.href} aria-label={link.icon} className="flex h-8 w-8 items-center justify-center rounded bg-[#EFE8DC] text-[#423A35] transition-colors hover:bg-[#9A1C1F] hover:text-white">
              <IonIcon name={link.icon} />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
