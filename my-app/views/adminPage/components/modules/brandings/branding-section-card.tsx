import type { ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  children: ReactNode;
}

export function BrandingSectionCard({ title, description, children }: Props) {
  return (
    <section className="space-y-5 rounded-2xl border border-[#d9c7ae] bg-white p-6 shadow-xs">
      <div className="border-b border-[#d9c7ae] pb-4">
        <h2 className="text-sm font-bold uppercase text-[#9A1C1F]">{title}</h2>
        <p className="mt-1 text-xs text-[#695D56]">{description}</p>
      </div>
      {children}
    </section>
  );
}
