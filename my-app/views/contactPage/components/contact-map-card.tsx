"use client";

import { useState } from "react";
import { OFFICE_LOCATIONS } from "../services/contact.services";

export function ContactMapCard() {
  const [selectedId, setSelectedId] = useState<string>("govap");
  const selectedOffice =
    OFFICE_LOCATIONS.find((loc) => loc.id === selectedId) ||
    OFFICE_LOCATIONS[0];

  return (
    <article className="bg-white rounded-2xl p-6 border border-[#EAE2D5]/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between space-y-4">
      {/* 2 Tabs Header */}
      <div className="flex items-center gap-2">
        {OFFICE_LOCATIONS.map((loc) => {
          const isActive = selectedId === loc.id;
          return (
            <button
              key={loc.id}
              type="button"
              onClick={() => setSelectedId(loc.id)}
              className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                isActive
                  ? "bg-[#9A1C1F] text-white shadow-sm"
                  : "bg-[#FAF3E8] text-[#423A35] hover:bg-[#EFE2D0]"
              }`}
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span className="truncate">{loc.tabLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Map Interactive Embed Box (Kéo thả, phóng to, thu nhỏ) */}
      <div className="relative w-full aspect-[16/11] min-h-[260px] rounded-xl overflow-hidden border border-[#EAE0D0] bg-[#FAF6F0] shadow-inner group">
        {/* Google Maps Interactive Iframe */}
        {selectedOffice.mapEmbedUrl && (
          <iframe
            key={selectedOffice.id}
            src={selectedOffice.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Bản đồ định vị ${selectedOffice.name}`}
            className="w-full h-full object-cover"
          />
        )}

        {/* Small floating badge */}
        <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
          <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md shadow-md border border-[#EAE2D5] flex items-center gap-1.5 text-[10px] font-bold text-[#1E1917]">
            <span className="w-2 h-2 rounded-full bg-[#9A1C1F] animate-pulse" />
            <span className="truncate">{selectedOffice.name}</span>
          </div>
        </div>

        {/* Drag tooltip hint */}
        <div className="absolute bottom-2.5 left-2.5 z-10 pointer-events-none">
          <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded shadow">
            ✥ Có thể kéo thả &amp; phóng to
          </span>
        </div>
      </div>

      {/* Bottom Info & Directions Button */}
      <div className="bg-[#FAF3E8] p-4 rounded-xl border border-[#EFE2D0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <h4 className="font-bold text-xs text-[#1E1917]">
            {selectedOffice.id === "govap"
              ? "Vị trí trục đại lộ Phạm Văn Đồng"
              : "Vị trí trục đường An Phú 18"}
          </h4>
          <p className="text-[11px] text-[#695D56] flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 fill-current text-[#9A1C1F] shrink-0"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
            </svg>
            <span>{selectedOffice.mapDistanceNote}</span>
          </p>
        </div>

        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(selectedOffice.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#9A1C1F] hover:bg-[#851619] text-white text-xs font-bold uppercase tracking-wider transition-all text-center shrink-0 shadow-sm"
        >
          CHỈ ĐƯỜNG
        </a>
      </div>
    </article>
  );
}
