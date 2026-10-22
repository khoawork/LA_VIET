import { Plus } from "lucide-react";
import { IconSelect } from "../icon-select";
import { RemoveItemButton } from "../remove-item-button";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  icon?: boolean;
}

export function ContactField({
  label,
  value,
  onChange,
  multiline,
  icon,
}: Props) {
  if (icon)
    return <IconSelect label={label} value={value} onChange={onChange} />;
  const className =
    "mt-1.5 w-full rounded-xl border border-[#EAE2D5] bg-white px-3.5 py-2.5 text-xs text-[#1E1917] focus:border-[#9A1C1F] focus:outline-none";
  return (
    <label className="block text-xs font-semibold text-[#1E1917]">
      <span>{label}</span>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={className}
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={className}
        />
      )}
    </label>
  );
}

export function ContactPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-5 rounded-2xl border border-[#EAE2D5] bg-white p-6 shadow-xs">
      <h2 className="border-b border-[#EAE2D5] pb-4 text-sm font-bold uppercase text-[#9A1C1F]">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function ContactListHeader({
  title,
  addLabel,
  onAdd,
}: {
  title: string;
  addLabel: string;
  onAdd: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-xs font-bold uppercase">{title}</h3>
      <button
        type="button"
        onClick={onAdd}
        className="inline-flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-[#9A1C1F] transition-colors hover:bg-[#FAF1EC] hover:text-[#7A1518]"
      >
        <Plus className="h-4 w-4" /> {addLabel}
      </button>
    </div>
  );
}

export function ContactListItem({
  label,
  onRemove,
  children,
}: {
  label: string;
  onRemove: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative rounded-xl border border-[#EAE2D5] bg-[#FAF8F5] p-4 pt-12">
      <RemoveItemButton label={`Xóa ${label}`} onClick={onRemove} />
      <div className="grid gap-3 sm:grid-cols-2">{children}</div>
    </div>
  );
}
