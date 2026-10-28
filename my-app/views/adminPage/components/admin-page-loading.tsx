import { Loader2 } from "lucide-react";

interface AdminPageLoadingProps {
  label: string;
}

export function AdminPageLoading({ label }: AdminPageLoadingProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-center gap-2 rounded-2xl border border-[#d9c7ae] bg-white p-12 text-sm text-[#695D56]"
    >
      <Loader2 className="h-5 w-5 shrink-0 animate-spin" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
