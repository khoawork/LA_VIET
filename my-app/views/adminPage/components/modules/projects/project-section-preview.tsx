import type {
  PageProjectProps,
  PageProjectSection,
} from "../../../types/projects/page-project.type";

interface Props {
  activeTab: PageProjectSection;
  data: PageProjectProps;
}

export function ProjectSectionPreview({ activeTab, data }: Props) {
  let content;

  if (activeTab === "header") {
    content = (
      <div className="space-y-3">
        <p className="text-xs text-[#695D56]">
          {data.header.breadcrumb.homeLabel} /{" "}
          {data.header.breadcrumb.currentLabel}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {(data.header.stats ?? []).map((stat, index) => (
            <div key={index} className="rounded-xl bg-white p-3">
              <div className="flex flex-wrap items-baseline gap-x-1">
                <span
                  className="text-lg font-bold"
                  style={{ color: stat.quantityColor ?? "#000000" }}
                >
                  {stat.quantity}
                </span>
                {stat.suffix && (
                  <span
                    className="text-xs font-semibold"
                    style={{ color: stat.suffixColor ?? "#000000" }}
                  >
                    {stat.suffix}
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold">{stat.title}</p>
              <p className="mt-1 text-[11px] text-[#695D56]">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (activeTab === "filter") {
    content = (
      <div className="flex flex-wrap gap-2">
        {(data.filter?.key ?? []).map((item, index) => (
          <span
            key={index}
            className="rounded-lg bg-white px-3 py-2 text-xs font-semibold"
          >
            {item.name || "Nhóm chưa đặt tên"}
          </span>
        ))}
      </div>
    );
  } else if (activeTab === "procedure") {
    content = (
      <div className="space-y-3">
        <p className="text-xs uppercase text-[#9A1C1F]">
          {data.procedure?.eyebrow}
        </p>
        <h4 className="font-bold">{data.procedure?.title}</h4>
        {data.procedure?.description && (
          <p className="text-xs leading-relaxed text-[#695D56]">
            {data.procedure.description}
          </p>
        )}
        {(data.procedure?.steps ?? []).map((step, index) => (
          <div key={index} className="rounded-xl bg-white p-3 text-xs">
            <strong>
              {step.order} — {step.title}
            </strong>
            <p className="mt-1 text-[#695D56]">{step.description}</p>
          </div>
        ))}
      </div>
    );
  } else {
    content = (
      <div className="space-y-3">
        <p className="text-xs uppercase text-[#9A1C1F]">{data.cta?.eyebrow}</p>
        <h4 className="font-bold">{data.cta?.title}</h4>
        <p className="text-xs text-[#695D56]">{data.cta?.description}</p>
        {(data.cta?.actions ?? []).map((action, index) => (
          <span
            key={index}
            className="mr-2 inline-block rounded-lg bg-[#9A1C1F] px-3 py-2 text-xs font-semibold text-white"
          >
            {action.label}
          </span>
        ))}
      </div>
    );
  }

  return (
    <aside className="sticky top-4 rounded-2xl border border-[#EAE2D5] bg-[#FAF8F5] p-5 shadow-xs">
      <h3 className="mb-4 border-b border-[#EAE2D5] pb-3 text-sm font-bold text-[#1E1917]">
        Xem trước nội dung
      </h3>
      {content}
    </aside>
  );
}
