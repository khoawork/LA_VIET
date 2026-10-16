"use client";

import { useState } from "react";
import { IonIcon } from "@/shared/icons/ion-icon";
import type { PageContactProps } from "../types/contact.type";

type MapData = PageContactProps["map"];

function mapEmbedHref(embedUrl: string) {
  try {
    const url = new URL(embedUrl);
    if (url.hostname === "maps.google.com" && url.pathname === "/maps") {
      url.searchParams.set("iwloc", "near");
    }
    return url.toString();
  } catch {
    return embedUrl;
  }
}

function directionsHref(embedUrl: string) {
  try {
    const query = new URL(embedUrl).searchParams.get("q");
    return query ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}` : embedUrl;
  } catch {
    return "#";
  }
}

export function ContactMapCard({ data }: { data: MapData }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = data.locations[selectedIndex] ?? data.locations[0];

  if (!selected) return null;
  return (
    <article className="flex flex-col justify-between space-y-4 rounded-2xl border border-[#EAE2D5]/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex items-center gap-2">
        {data.locations.map((location, index) => (
          <button key={index} type="button" onClick={() => setSelectedIndex(index)} className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${index === selectedIndex ? "bg-[#9A1C1F] text-white shadow-sm" : "bg-[#FAF3E8] text-[#423A35] hover:bg-[#EFE2D0]"}`}>
            <IonIcon name="location-outline" className="h-3.5 w-3.5" /><span className="truncate">{location.tabLabel}</span>
          </button>
        ))}
      </div>
      <div className="group relative aspect-[16/11] min-h-[260px] overflow-hidden rounded-xl border border-[#EAE0D0] bg-[#FAF6F0] shadow-inner">
        <iframe key={selected.embedUrl} src={mapEmbedHref(selected.embedUrl)} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={`Bản đồ định vị ${selected.name}`} className="h-full w-full" />
        <div className="pointer-events-none absolute left-2.5 top-2.5 z-10 flex items-center gap-1.5 rounded-md border border-[#EAE2D5] bg-white/95 px-2.5 py-1 text-[10px] font-bold text-[#1E1917] shadow-md">
          <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#9A1C1F]" />{selected.name}
        </div>
      </div>
      <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-[#EFE2D0] bg-[#FAF3E8] p-4 sm:flex-row sm:items-center">
        <div className="space-y-0.5">
          <h4 className="text-xs font-bold text-[#1E1917]">{selected.title}</h4>
          <p className="flex items-center gap-1.5 text-[11px] text-[#695D56]">
            <IonIcon name={data.distanceNoteIcon} className="h-3.5 w-3.5 text-[#9A1C1F]" /> <span>{selected.distanceNote}</span>
          </p>
        </div>
        <a href={directionsHref(selected.embedUrl)} target="_blank" rel="noopener noreferrer" className="w-full shrink-0 rounded-lg bg-[#9A1C1F] px-5 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#851619] sm:w-auto">{data.directionsLabel}</a>
      </div>
    </article>
  );
}
