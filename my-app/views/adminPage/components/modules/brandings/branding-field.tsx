interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "url";
  multiline?: boolean;
  placeholder?: string;
}

export function BrandingField({
  label,
  value,
  onChange,
  type = "text",
  multiline,
  placeholder,
}: Props) {
  const className =
    "w-full rounded-xl border border-[#d9c7ae] bg-white px-3.5 py-2.5 text-xs text-[#1E1917] focus:border-[#9A1C1F] focus:outline-none";

  return (
    <label className="block text-xs font-semibold text-[#1E1917]">
      <span className="block">{label}</span>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={`${className} mt-1.5 block`}
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={`${className} mt-1.5 block h-10`}
        />
      )}
    </label>
  );
}
