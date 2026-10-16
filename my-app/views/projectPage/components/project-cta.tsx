import { IonIcon } from "@/shared/icons/ion-icon";
import type { ProjectCtaData } from "../types/project.type";

function getContactLink(icon: string, value: string) {
  const name = icon.replace(/^Fa(?=[A-Z])/, "").toLowerCase();
  if (["phone", "call", "calloutline"].includes(name)) return `tel:${value.replace(/[^\d+]/g, "")}`;
  if (["mail", "mailoutline", "envelope"].includes(name)) return `mailto:${value}`;
  return null;
}

export function ProjectCta({ cta }: { cta?: ProjectCtaData }) {
  if (!cta) return null;

  return (
    <section className="mb-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#690E12] via-[#851619] to-[#600C10] p-8 text-white shadow-2xl sm:p-10 lg:p-12">
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-rose-500/10 blur-3xl" />
        <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-200/90">
              <IonIcon name={cta.eyebrow_icon} fallback="sparklesOutline" className="h-4 w-4 text-rose-300" />
              <span>{cta.eyebrow}</span>
            </div>
            <h2 className="text-2xl font-bold uppercase leading-snug tracking-tight text-white sm:text-3xl md:text-4xl">
              {cta.title}
            </h2>
            <p className="max-w-xl text-xs leading-relaxed text-rose-100/80 sm:text-sm">
              {cta.description}
            </p>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-3.5 sm:flex-row lg:w-auto lg:flex-col">
            {(cta.contacts ?? []).map((contact, index) => {
              const href = getContactLink(contact.icon, contact.value);
              const content = (
                <>
                  <IonIcon name={contact.icon} fallback="globeOutline" />
                  <span>
                    {contact.label}: {contact.value}
                  </span>
                </>
              );
              return href ? (
                <a
                  key={index}
                  href={href}
                  className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#851619] shadow-lg hover:bg-rose-50"
                >
                  {content}
                </a>
              ) : (
                <span
                  key={index}
                  className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-white/10 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white"
                >
                  {content}
                </span>
              );
            })}
            {(cta.actions ?? []).map((action, index) =>
              action.link ? (
                <a
                  key={index}
                  href={action.link}
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/20"
                >
                  {action.label}
                </a>
              ) : (
                <span
                  key={index}
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white"
                >
                  {action.label}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
