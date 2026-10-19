import { IonIcon } from "@/shared/icons/ion-icon";
import type { ProjectProcedureData } from "../types/project.type";

export function ProjectProcess({
  procedure,
}: {
  procedure?: ProjectProcedureData;
}) {
  if (!procedure) return null;

  return (
    <section className="mb-20 bg-[#fcf2e3] px-4 py-12 sm:mb-24 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">
        <span className="mb-3 block text-xs font-bold uppercase tracking-[0.25em] text-[#9A1C1F]">
          {procedure.eyebrow}
        </span>
        <h2 className="text-2xl font-bold uppercase leading-snug tracking-tight text-[#1E1917] sm:text-3xl md:text-4xl">
          {procedure.title}
        </h2>
        {procedure.description && (
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#5C544E] sm:text-base">
            {procedure.description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {(procedure.steps ?? []).map((step, index) => {
          return (
            <div
              key={index}
              className="flex min-w-0 flex-col justify-between overflow-hidden rounded-lg border border-[#EAE2D5]/80 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-xl sm:p-7"
            >
              <div className="min-w-0">
                <div className="mb-4 flex items-center justify-between">
                  <span className="min-w-0 flex-1 select-none text-5xl font-medium leading-none text-[#F2C2BB] [overflow-wrap:anywhere] sm:text-6xl">
                    {step.order}
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f7eddd] text-[#9A1C1F]">
                    <IonIcon name={step.icon} fallback="clipboardOutline" />
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold leading-snug text-[#1E1917] [overflow-wrap:anywhere]">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#5C544E] [overflow-wrap:anywhere]">
                  {step.description}
                </p>
              </div>
              <div className="mt-8 border-t border-[#EAE2D5]/50 pt-3">
                <span className="block text-sm font-bold text-[#96671E] [overflow-wrap:anywhere]">
                  {step.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
