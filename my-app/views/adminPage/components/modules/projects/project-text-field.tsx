interface ProjectTextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
}

export function ProjectTextField({
  label,
  value,
  onChange,
  multiline,
  placeholder,
}: ProjectTextFieldProps) {
  const className =
    "w-full rounded-xl border border-[#EAE2D5] bg-white px-3.5 py-2.5 text-xs font-normal text-[#1E1917] focus:border-[#9A1C1F] focus:outline-none";

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
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={`${className} mt-1.5 block h-10`}
        />
      )}
    </label>
  );
}
