import React from 'react';
import { soundFx } from '../utils/audio';
import { useData } from '../context/DataContext';

interface PortalClimaxProps {
  onEnterWorld: () => void;
}

export const PortalClimax: React.FC<PortalClimaxProps> = ({ onEnterWorld }) => {
  const { fornoxIgUrl } = useData();

  return (
    <section className="w-full py-24 md:py-32 relative bg-[#06030c] flex items-center justify-center overflow-hidden border-t border-b border-white/5">
      {/* Deep Cosmic Vortex Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full bg-gradient-to-r from-[#a855f7]/30 via-[#38bdf8]/20 to-[#f0dbff]/25 blur-[140px] animate-pulse" />
        <div className="absolute w-[280px] h-[280px] rounded-full bg-[#a855f7]/40 blur-[90px]" />
      </div>

      <div className="relative z-10 max-w-[1000px] mx-auto px-5 text-center flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0d071a]/90 border border-[#a855f7]/40 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
          <span className="w-2 h-2 rounded-full bg-[#2dd4bf] animate-ping" />
          <span className="font-mono text-xs text-[#f8fafc] uppercase tracking-widest font-semibold">
            SYSTEM OVERDRIVE // ACTIVATED
          </span>
        </div>

        <h2 className="font-headline text-4xl sm:text-5xl md:text-7xl font-black uppercase text-[#f8fafc] tracking-tight drop-shadow-[0_0_40px_rgba(168,85,247,0.6)] leading-[1.1]">
          THE BATTLE IS <br />
          <span className="bg-gradient-to-r from-[#38bdf8] via-[#f0dbff] to-[#a855f7] bg-clip-text text-transparent">
            JUST BEGINNING
          </span>
        </h2>

        <p className="font-body text-base md:text-xl text-[#cfc2d6] max-w-xl leading-relaxed">
          Choose your Mecardimal. Enter the world. Start your journey. Forge your destiny across the three realms.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            id="climax-enter-world-btn"
            type="button"
            onClick={() => {
              soundFx.playOverdrive();
              onEnterWorld();
            }}
            className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#a855f7] to-[#38bdf8] text-[#06030c] font-headline text-sm md:text-base uppercase font-bold tracking-wider shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            ENTER THE WORLD
          </button>

          <a
            id="climax-fornox-link"
            href={fornoxIgUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open FORNOX Instagram profile"
            className="px-8 py-3.5 rounded-lg bg-[#231d2a]/90 text-[#f8fafc] font-headline text-sm md:text-base uppercase tracking-wider backdrop-blur-xl hover:bg-[#3d3744] hover:text-[#7bd0ff] transition-all border border-white/15 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>CONNECT ON INSTAGRAM</span>
            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
          </a>
        </div>
      </div>
    </section>
  );
};
