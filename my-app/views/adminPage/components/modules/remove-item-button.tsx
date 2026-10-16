import { Trash2 } from "lucide-react";

interface Props {
  label: string;
  onClick: () => void;
}

export function RemoveItemButton({ label, onClick }: Props) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-lg text-red-700 transition-colors hover:bg-red-100 hover:text-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
