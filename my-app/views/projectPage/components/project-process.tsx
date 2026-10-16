import { IonIcon } from "@/shared/icons/ion-icon";
import type { ProjectProcedureData } from "../types/project.type";

export function ProjectProcess({
  procedure,
}: {
  procedure?: ProjectProcedureData;
}) {
  if (!procedure) return null;

  return (
    <section className="mb-20 sm:mb-24">
      <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">
        <span className="mb-3 block text-xs font-bold uppercase tracking-[0.25em] text-[#9A1C1F]">
          {procedure.eyebrow}
        </span>
        <h2 className="text-2xl font-bold uppercase leading-snug tracking-tight text-[#1E1917] sm:text-3xl md:text-4xl">
          {procedure.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {(procedure.steps ?? []).map((step, index) => {
          return (
            <div
              key={index}
              className="flex flex-col justify-between rounded-2xl border border-[#EAE2D5]/80 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-xl sm:p-7"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="select-none text-4xl font-black leading-none text-[#F2C2BB] sm:text-5xl">
                    {step.order}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FAF1EC] text-[#9A1C1F]">
                    <IonIcon name={step.icon} fallback="clipboardOutline" />
                  </span>
                </div>
                <h3 className="mb-2 text-base font-bold leading-snug text-[#1E1917]">
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed text-[#5C544E]">
                  {step.description}
                </p>
              </div>
              <div className="mt-8 border-t border-[#EAE2D5]/50 pt-3">
                <span className="block text-xs font-bold text-[#96671E]">
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
