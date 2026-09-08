import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Mecardimal } from '../types';
import { HoloCard } from './HoloCard';
import { soundFx } from '../utils/audio';

interface MecardimalsCodexProps {
  onOpenTelemetry: (mecardimal: Mecardimal) => void;
}

export const MecardimalsCodex: React.FC<MecardimalsCodexProps> = ({
  onOpenTelemetry,
}) => {
  const { mecardimals, openAdminPanel, isAdminAuthenticated } = useData();
  const [filterRank, setFilterRank] = useState<string>('ALL');

  const filteredMecardimals =
    filterRank === 'ALL'
      ? mecardimals
      : mecardimals.filter((m) => m.rank.includes(filterRank));

  return (
    <section id="mecardimals" className="w-full py-20 md:py-28 relative bg-[#140c26]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="font-mono text-xs md:text-sm text-[#38bdf8] tracking-[0.2em] uppercase font-semibold">
              03 / BIO-MECHANICAL ARSENAL // CARDS
            </span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold uppercase text-[#f8fafc] mt-1">
              THE MECARDIMAL CODEX
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <p className="font-body text-sm md:text-base text-[#94a3b8] max-w-md">
              Tactical vehicle units capable of instantaneous kinetic expansion upon contacting magnetic battle cards.
            </p>
            <button
              type="button"
              onClick={() => {
                soundFx.playBeep(920, 0.05);
                openAdminPanel();
              }}
              title="Open Admin Panel to add or modify Mecardimals"
              className="px-3 py-1.5 rounded-lg bg-[#0d071a] hover:bg-[#1f1926] text-[#38bdf8] border border-[#38bdf8]/40 font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">tune</span>
              <span>{isAdminAuthenticated ? 'MANAGE CODEX' : 'ADMIN EDIT'}</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="font-mono text-xs text-[#94a3b8] mr-2">// FILTER:</span>
          {['ALL', 'S+', 'A+', 'A'].map((rank) => (
            <button
              key={rank}
              type="button"
              onClick={() => {
                soundFx.playBeep(900, 0.04);
                setFilterRank(rank);
              }}
              className={`px-3 py-1 rounded font-mono text-xs uppercase tracking-wider transition-all ${
                filterRank === rank
                  ? 'bg-[#38bdf8] text-[#06030c] font-bold shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                  : 'bg-[#1f1926] text-[#cfc2d6] hover:bg-[#231d2a] border border-white/10'
              }`}
            >
              {rank === 'ALL' ? 'ALL UNITS' : `RANK ${rank}`}
            </button>
          ))}
        </div>

        {/* Holographic Card Showcase Grid (4 Units) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-card-wrapper">
          {filteredMecardimals.map((mec) => (
            <HoloCard
              key={mec.id}
              className="rounded-2xl bg-[#0d071a] border border-white/10 p-4 hover:scale-[1.02] transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Visual Frame */}
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-[#140c26]">
                  <img
                    src={mec.imageUrl}
                    alt={mec.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div
                    className={`absolute top-2 right-2 px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase ${mec.rankColor}`}
                  >
                    {mec.rank}
                  </div>
                </div>

                {/* Subtitle & Status */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#7bd0ff] font-semibold">// TYPE: {mec.type}</span>
                  <span className="text-[#2dd4bf]">HP: 100%</span>
                </div>

                <h3 className="font-headline text-xl md:text-2xl text-[#f8fafc] font-bold mt-1">
                  {mec.name}
                </h3>

                <p className="font-body text-xs text-[#94a3b8] mt-1">
                  Special:{' '}
                  <span className="text-[#ddb7ff] font-semibold">
                    {mec.specialAttack}
                  </span>
                </p>

                {/* Stat Bars (Power, Speed, Defense) */}
                <div className="space-y-2 mt-4 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-[#94a3b8] text-[11px]">
                      <span>POWER</span>
                      <span className="text-[#f8fafc] font-bold">{mec.power} DP</span>
                    </div>
                    <div className="w-full bg-[#06030c] rounded-full h-1 mt-0.5">
                      <div
                        className="bg-[#a855f7] h-1 rounded-full transition-all duration-500"
                        style={{ width: `${mec.power / 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[#94a3b8] text-[11px]">
                      <span>SPEED</span>
                      <span className="text-[#f8fafc] font-bold">{mec.speed} SP</span>
                    </div>
                    <div className="w-full bg-[#06030c] rounded-full h-1 mt-0.5">
                      <div
                        className="bg-[#38bdf8] h-1 rounded-full transition-all duration-500"
                        style={{ width: `${mec.speed / 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[#94a3b8] text-[11px]">
                      <span>DEFENSE</span>
                      <span className="text-[#f8fafc] font-bold">{mec.defense} DF</span>
                    </div>
                    <div className="w-full bg-[#06030c] rounded-full h-1 mt-0.5">
                      <div
                        className="bg-[#2dd4bf] h-1 rounded-full transition-all duration-500"
                        style={{ width: `${mec.defense / 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* View Telemetry Button */}
              <button
                id={`btn-telemetry-${mec.id}`}
                type="button"
                onClick={() => {
                  soundFx.playBeep(1200, 0.08);
                  onOpenTelemetry(mec);
                }}
                className="mt-6 w-full py-2.5 rounded-lg bg-[#1f1926] hover:bg-[#a855f7] hover:text-[#06030c] border border-white/10 hover:border-[#a855f7] font-mono text-xs text-[#f8fafc] tracking-widest uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>VIEW TELEMETRY</span>
                <span className="material-symbols-outlined text-[16px]">tune</span>
              </button>
            </HoloCard>
          ))}
        </div>
      </div>
    </section>
  );
};
