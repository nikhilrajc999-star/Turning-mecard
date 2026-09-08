import React, { useState } from 'react';
import { CHARACTERS } from '../data/mecardData';
import { Character } from '../types';
import { HoloCard } from './HoloCard';
import { soundFx } from '../utils/audio';

interface CharactersProps {
  onSelectCharacter?: (char: Character) => void;
}

export const Characters: React.FC<CharactersProps> = ({ onSelectCharacter }) => {
  const [activePilot, setActivePilot] = useState<Character | null>(null);

  const handleCardClick = (char: Character) => {
    soundFx.playBeep(840, 0.08);
    setActivePilot(char);
    if (onSelectCharacter) onSelectCharacter(char);
  };

  const getFactionBadgeClass = (factionColor: Character['factionColor']) => {
    switch (factionColor) {
      case 'cyan':
        return 'bg-[#38bdf8] text-[#06030c]';
      case 'purple':
        return 'bg-[#a855f7] text-[#06030c]';
      case 'amber':
        return 'bg-[#f59e0b] text-[#06030c]';
      case 'teal':
        return 'bg-[#2dd4bf] text-[#06030c]';
      case 'primary':
      default:
        return 'bg-[#ddb7ff] text-[#06030c]';
    }
  };

  const getProgressBarClass = (factionColor: Character['factionColor']) => {
    switch (factionColor) {
      case 'cyan':
        return 'bg-[#38bdf8]';
      case 'purple':
        return 'bg-[#a855f7]';
      case 'amber':
        return 'bg-[#f59e0b]';
      case 'teal':
        return 'bg-[#2dd4bf]';
      case 'primary':
      default:
        return 'bg-[#ddb7ff]';
    }
  };

  return (
    <section id="characters" className="w-full py-20 md:py-28 relative bg-[#06030c]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-mono text-xs md:text-sm text-[#a855f7] tracking-[0.2em] uppercase font-semibold">
              02 / TAMERS & COMMANDERS // DOSSIER
            </span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold uppercase text-[#f8fafc] mt-1">
              THE TAMER ELITE
            </h2>
          </div>
          <p className="font-body text-sm md:text-base text-[#94a3b8] max-w-md">
            Synchronized pilot operators wielding bio-mechanical resonance to activate dormant war machines.
          </p>
        </div>

        {/* Character Showcase Grid (5 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 perspective-card-wrapper">
          {CHARACTERS.map((char) => (
            <HoloCard
              key={char.id}
              onClick={() => handleCardClick(char)}
              shockwaveOnClick={true}
              className="group rounded-2xl bg-[#1f1926] border border-white/10 overflow-hidden transition-all duration-300 hover:border-[#a855f7]/50 shadow-xl flex flex-col cursor-pointer"
            >
              {/* Image Frame */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#140c26]">
                <img
                  src={char.imageUrl}
                  alt={char.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f1926] via-transparent to-transparent" />

                {/* Top Faction Badge */}
                <div
                  className={`absolute top-3 left-3 px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase tracking-wider ${getFactionBadgeClass(
                    char.factionColor
                  )}`}
                >
                  {char.faction}
                </div>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="font-mono text-[10px] text-[#7bd0ff] block font-semibold">
                    {char.title}
                  </span>
                  <h3 className="font-headline text-xl md:text-2xl font-bold text-[#f8fafc]">
                    {char.name}
                  </h3>
                </div>
              </div>

              {/* Information Body */}
              <div className="p-4 flex-1 flex flex-col justify-between gap-3 bg-[#1f1926]">
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-[#94a3b8]">
                    <span>PARTNER:</span>
                    <span className="text-[#f8fafc] font-bold">{char.partner}</span>
                  </div>
                  <div className="flex justify-between text-[#94a3b8]">
                    <span>AFFINITY:</span>
                    <span className="text-[#38bdf8] font-bold">{char.affinity}</span>
                  </div>
                  <div className="w-full bg-[#06030c] rounded-full h-1.5 mt-2">
                    <div
                      className={`h-1.5 rounded-full ${getProgressBarClass(
                        char.factionColor
                      )}`}
                      style={{ width: `${char.syncRate}%` }}
                    />
                  </div>
                </div>

                <p className="font-body text-xs text-[#94a3b8] line-clamp-3 leading-relaxed">
                  {char.description}
                </p>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#7bd0ff] group-hover:text-[#f8fafc]">
                  <span>INSPECT DOSSIER</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </div>
              </div>
            </HoloCard>
          ))}
        </div>

        {/* Selected Pilot Quick Dossier Drawer / Highlight */}
        {activePilot && (
          <div className="mt-8 p-5 md:p-6 rounded-2xl bg-[#140c26] border border-[#a855f7]/40 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shrink-0 border border-[#38bdf8]/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]">
              <img
                src={activePilot.imageUrl}
                alt={activePilot.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="font-headline text-2xl font-bold text-[#f8fafc]">
                  {activePilot.name}
                </span>
                <span className={`px-2 py-0.5 rounded font-mono text-xs font-bold ${getFactionBadgeClass(activePilot.factionColor)}`}>
                  {activePilot.faction}
                </span>
                <span className="font-mono text-xs text-[#2dd4bf]">
                  SYNC: {activePilot.syncRate}%
                </span>
              </div>
              <p className="text-sm font-body text-[#cfc2d6] italic">
                "{activePilot.quote}"
              </p>
              <div className="grid grid-cols-3 gap-3 max-w-md pt-2 font-mono text-xs">
                <div className="bg-[#06030c] p-2 rounded border border-white/10 text-center">
                  <span className="text-[#94a3b8] text-[10px] block">TACTICS</span>
                  <span className="text-[#38bdf8] font-bold">{activePilot.stats?.tactics} / 100</span>
                </div>
                <div className="bg-[#06030c] p-2 rounded border border-white/10 text-center">
                  <span className="text-[#94a3b8] text-[10px] block">RESONANCE</span>
                  <span className="text-[#a855f7] font-bold">{activePilot.stats?.resonance} / 100</span>
                </div>
                <div className="bg-[#06030c] p-2 rounded border border-white/10 text-center">
                  <span className="text-[#94a3b8] text-[10px] block">WILLPOWER</span>
                  <span className="text-[#2dd4bf] font-bold">{activePilot.stats?.willpower} / 100</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setActivePilot(null)}
              className="px-3 py-1.5 rounded bg-[#1f1926] text-[#cfc2d6] hover:text-[#f8fafc] font-mono text-xs border border-white/10 self-start md:self-center"
            >
              CLOSE
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
