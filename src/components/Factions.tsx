import React, { useState } from 'react';
import { FACTIONS } from '../data/mecardData';
import { Faction } from '../types';
import { HoloCard } from './HoloCard';
import { soundFx } from '../utils/audio';

export const Factions: React.FC = () => {
  const [selectedFaction, setSelectedFaction] = useState<Faction | null>(null);

  const handleExplore = (f: Faction) => {
    soundFx.playBeep(920, 0.08);
    setSelectedFaction(f);
  };

  return (
    <section id="factions" className="w-full py-20 md:py-28 relative bg-[#140c26]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-mono text-xs md:text-sm text-[#2dd4bf] tracking-[0.2em] uppercase font-semibold">
              05 / REALM FACTIONS // ALLIANCES
            </span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold uppercase text-[#f8fafc] mt-1">
              THE THREE GREAT POWERS
            </h2>
          </div>
          <p className="font-body text-sm md:text-base text-[#94a3b8] max-w-md">
            Three competing ideologies shaping the cosmic balance and commanding specialized battle doctrine.
          </p>
        </div>

        {/* Faction Cards Bento (3 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {FACTIONS.map((f) => (
            <HoloCard
              key={f.id}
              className={`rounded-2xl bg-[#0d071a] border border-white/10 p-6 md:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group transition-all duration-500 ${f.borderHoverClass}`}
            >
              <div
                className="absolute top-0 right-0 w-36 h-36 rounded-full blur-3xl pointer-events-none opacity-25"
                style={{ backgroundColor: f.accentColor }}
              />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <span
                    className={`font-mono text-xs font-bold uppercase tracking-widest ${f.themeColorClass}`}
                  >
                    {f.sector}
                  </span>
                  <span
                    className={`material-symbols-outlined text-[32px] ${f.themeColorClass}`}
                  >
                    {f.icon}
                  </span>
                </div>

                <h3 className="font-headline text-2xl md:text-3xl font-bold text-[#f8fafc]">
                  {f.name}
                </h3>

                <p className={`font-body text-sm font-medium mt-1 ${f.themeColorClass}`}>
                  {f.subtitle}
                </p>

                <p className="font-body text-xs md:text-sm text-[#94a3b8] mt-4 leading-relaxed">
                  {f.description}
                </p>

                {/* Specs List */}
                <div className="mt-6 space-y-2 font-mono text-xs bg-[#06030c]/60 p-4 rounded-xl border border-white/5">
                  <div className="flex justify-between text-[#94a3b8]">
                    <span>TAMERS:</span>
                    <span className="text-[#f8fafc] font-semibold">
                      {f.tamers.join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#94a3b8]">
                    <span>FLAGSHIP:</span>
                    <span
                      className={`font-bold ${f.themeColorClass}`}
                    >
                      {f.flagships.join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#94a3b8]">
                    <span>DOCTRINE:</span>
                    <span className="text-[#f8fafc] font-semibold">{f.doctrine}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-2">
                <button
                  type="button"
                  onClick={() => handleExplore(f)}
                  className="w-full py-3 rounded-lg font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300 border border-current cursor-pointer shadow-md"
                  style={{
                    backgroundColor: `${f.accentColor}15`,
                    color: f.accentColor,
                    borderColor: `${f.accentColor}40`
                  }}
                >
                  EXPLORE {f.name}
                </button>
              </div>
            </HoloCard>
          ))}
        </div>

        {/* Selected Faction Expanded Details Modal / Drawer */}
        {selectedFaction && (
          <div className="mt-8 p-6 rounded-2xl bg-[#0d071a] border border-[#38bdf8]/40 shadow-2xl relative">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-xs text-[#38bdf8] uppercase tracking-widest font-bold">
                  FACTION ARCHIVE // {selectedFaction.sector}
                </span>
                <h4 className="font-headline text-2xl font-bold text-[#f8fafc] mt-1">
                  {selectedFaction.name} — Operational Directives
                </h4>
              </div>
              <button
                onClick={() => setSelectedFaction(null)}
                className="px-3 py-1 rounded bg-[#1f1926] text-[#cfc2d6] font-mono text-xs border border-white/10 hover:text-[#f8fafc]"
              >
                CLOSE
              </button>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-3 bg-[#06030c] rounded-lg border border-white/10">
                <span className="text-[#94a3b8] block">// PRIMARY FLAGSHIP ALLIANCE</span>
                <span className="text-[#f8fafc] font-bold text-sm">
                  {selectedFaction.flagships.join(' & ')}
                </span>
              </div>
              <div className="p-3 bg-[#06030c] rounded-lg border border-white/10">
                <span className="text-[#94a3b8] block">// FIELD COMMANDERS</span>
                <span className="text-[#38bdf8] font-bold text-sm">
                  {selectedFaction.tamers.join(', ')}
                </span>
              </div>
              <div className="p-3 bg-[#06030c] rounded-lg border border-white/10">
                <span className="text-[#94a3b8] block">// TACTICAL STRENGTH</span>
                <span className="text-[#2dd4bf] font-bold text-sm">
                  RESONANCE LEVEL 9.9
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
