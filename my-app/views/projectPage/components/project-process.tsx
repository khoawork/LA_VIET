import { PROCESS_STEPS } from "../services/project.services";

export function ProjectProcess() {
  const getStepIcon = (step: string) => {
    switch (step) {
      case "01":
        return (
          // Compa / Architect Measure Icon
          <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path d="M12 3v4M6 21l6-14 6 14M7.5 17.5h9" />
          </svg>
        );
      case "02":
        return (
          // Pen & Ruler / Drafting Icon
          <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path d="M12 19l7-7 3 3-7 7-3-3z" />
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
            <path d="M2 2l7.586 7.586" />
          </svg>
        );
      case "03":
        return (
          // Craft / Lacquer palette flower Icon
          <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3a9 9 0 0 1 9 9" />
            <circle cx="8" cy="10" r="1" fill="currentColor" />
            <circle cx="14" cy="9" r="1" fill="currentColor" />
            <circle cx="15" cy="15" r="1" fill="currentColor" />
            <circle cx="10" cy="15" r="1" fill="currentColor" />
          </svg>
        );
      case "04":
        return (
          // Shield check / Warranty Icon
          <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="mb-20 sm:mb-24">
      {/* Header Heading */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
        <span className="text-xs font-bold tracking-[0.25em] text-[#9A1C1F] uppercase block mb-3">
          QUY TRÌNH HỢP TÁC CHUẨN MỰC
        </span>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#1E1917] tracking-tight uppercase leading-snug">
          ĐỒNG HÀNH TỪ Ý TƯỞNG TỚI HIỆN THỰC KIẾN TRÚC
        </h2>
        <p className="text-xs sm:text-sm text-[#5C544E] leading-relaxed mt-3 max-w-xl mx-auto">
          Đảm bảo tính đồng nhất giữa tinh thần giám tuyển nghệ thuật và tiêu chuẩn kỹ thuật xây dựng khắt khe nhất.
        </p>
      </div>

      {/* 4 Process Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PROCESS_STEPS.map((step) => (
          <div
            key={step.step}
            className="bg-white rounded-2xl p-6 sm:p-7 border border-[#EAE2D5]/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Step number & Icon header */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif font-black text-4xl sm:text-5xl text-[#F2C2BB] select-none leading-none">
                  {step.step}
                </span>
                <span className="w-9 h-9 rounded-full bg-[#FAF1EC] text-[#9A1C1F] flex items-center justify-center shadow-xs">
                  {getStepIcon(step.step)}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-[#1E1917] leading-snug mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-[#5C544E] leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Time / Warranty Badge */}
            <div className="mt-8 pt-3 border-t border-[#EAE2D5]/50">
              <span className="text-xs font-bold text-[#96671E] block">
                {step.timeOrWarranty}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

