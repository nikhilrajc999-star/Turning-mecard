import React from 'react';
import { HERO_EVAN_IMG } from '../data/mecardData';
import { CosmicShader } from './CosmicShader';
import { HoloCard } from './HoloCard';
import { soundFx } from '../utils/audio';

interface HeroProps {
  onExploreMecardimals: () => void;
  onExploreWorld: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMecardimals,
  onExploreWorld,
}) => {
  return (
    <section
      id="hero"
      className="relative w-full pt-28 md:pt-36 pb-16 md:pb-24 flex items-center justify-center overflow-hidden bg-[#06030c]"
    >
      {/* Background Cosmic Shader Animation Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-gradient-to-b from-[#a855f7]/20 via-[#38bdf8]/10 to-transparent blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:36px_36px] opacity-15" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#06030c] via-[#06030c]/80 to-transparent z-10" />
        <CosmicShader className="opacity-85 mix-blend-screen" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-5 md:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Typography & CTAs */}
        <div className="lg:col-span-6 flex flex-col items-start gap-4 md:gap-6 order-2 lg:order-1">
          {/* Live Status Chips */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d071a]/90 border border-[#a855f7]/40 shadow-[0_0_20px_rgba(168,85,247,0.35)]">
              <span className="w-2 h-2 rounded-full bg-[#2dd4bf] animate-ping" />
              <span className="font-mono text-[11px] text-[#7bd0ff] tracking-widest uppercase font-semibold">
                CREATED BY FORNOX
              </span>
            </div>
            <a
              id="hero-fornox-link"
              href="https://fornox.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-full bg-[#1f1926]/80 text-[#cfc2d6] font-mono text-[11px] tracking-widest hover:text-[#38bdf8] hover:bg-[#231d2a] border border-white/10 transition-all"
            >
              FORNOX.IN // V-2026.04
            </a>
          </div>

          {/* Headlines */}
          <div className="space-y-1">
            <p className="font-mono text-xs md:text-sm text-[#38bdf8] tracking-[0.25em] uppercase font-semibold">
              ENTER THE WORLD OF MECARDIMALS
            </p>
            <h1 className="font-headline font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight uppercase text-[#f8fafc] drop-shadow-[0_0_35px_rgba(168,85,247,0.5)]">
              TURNING{' '}
              <span className="bg-gradient-to-r from-[#a855f7] via-[#38bdf8] to-[#f0dbff] bg-clip-text text-transparent">
                MECARD
              </span>
            </h1>
          </div>

          {/* Subtext */}
          <p className="font-body text-base md:text-lg text-[#cfc2d6] max-w-xl leading-relaxed">
            TURN THE BATTLE. UNLEASH THE MECARDIMAL. Command legendary bio-mechanical titans infused with dimensional cosmic energy and rewrite the fate of the three realms.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              id="cta-explore-mecardimals"
              type="button"
              onClick={() => {
                soundFx.playOverdrive();
                onExploreMecardimals();
              }}
              className="group relative px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#a855f7] to-[#38bdf8] text-[#06030c] font-headline font-bold text-sm md:text-base uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_40px_rgba(56,189,248,0.7)] hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>EXPLORE MECARDIMALS</span>
              <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                bolt
              </span>
            </button>

            <button
              id="cta-explore-world"
              type="button"
              onClick={() => {
                soundFx.playLaser();
                onExploreWorld();
              }}
              className="px-6 py-3.5 rounded-lg bg-[#231d2a]/80 text-[#f8fafc] font-headline font-semibold text-sm md:text-base uppercase tracking-wider backdrop-blur-xl border border-white/15 hover:bg-[#3d3744] hover:text-[#7bd0ff] transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] flex items-center gap-2 cursor-pointer"
            >
              <span>WORLD ATLAS</span>
              <span className="material-symbols-outlined text-[20px]">
                explore
              </span>
            </button>
          </div>

          {/* Telemetry HUD Grid */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-md pt-4">
            <div className="p-3 rounded-lg bg-[#0d071a]/80 backdrop-blur-md border border-[#2dd4bf]/25 shadow-[0_0_15px_rgba(45,212,191,0.1)]">
              <span className="font-mono text-[10px] text-[#94a3b8] block uppercase tracking-wider">
                SYNC RATE
              </span>
              <span className="font-headline text-lg md:text-xl text-[#2dd4bf] font-bold tracking-wide">
                99.8%
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#0d071a]/80 backdrop-blur-md border border-[#a855f7]/25 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
              <span className="font-mono text-[10px] text-[#94a3b8] block uppercase tracking-wider">
                CARDS BOUND
              </span>
              <span className="font-headline text-lg md:text-xl text-[#a855f7] font-bold tracking-wide">
                30 / 30
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#0d071a]/80 backdrop-blur-md border border-[#38bdf8]/25 shadow-[0_0_15px_rgba(56,189,248,0.1)]">
              <span className="font-mono text-[10px] text-[#94a3b8] block uppercase tracking-wider">
                ACTIVE SECTOR
              </span>
              <span className="font-headline text-lg md:text-xl text-[#38bdf8] font-bold tracking-wide">
                TRIFORCE
              </span>
            </div>
          </div>
        </div>

        {/* Hero Visual: Evan Mecha Dragon Beast */}
        <div className="lg:col-span-6 relative flex justify-center items-center order-1 lg:order-2 perspective-card-wrapper">
          {/* Radiant Concentric Halo */}
          <div className="absolute w-[320px] h-[320px] md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-tr from-[#a855f7]/30 to-[#38bdf8]/20 blur-3xl animate-pulse pointer-events-none" />

          {/* Floating Card HUD Accents */}
          <div className="absolute -top-3 -left-2 md:left-4 z-20 px-3.5 py-2 rounded-lg bg-[#0d071a]/90 backdrop-blur-xl border border-[#a855f7]/50 shadow-[0_0_20px_rgba(168,85,247,0.4)] hidden sm:block animate-bounce [animation-duration:3s]">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#38bdf8] text-[18px]">
                verified
              </span>
              <span className="font-mono text-xs text-[#f8fafc] font-semibold">
                TITAN: EVAN [MYTHIC]
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#a855f7] font-bold">
              OVERDRIVE 9800 DP
            </span>
          </div>

          <div className="absolute -bottom-4 -right-2 md:right-4 z-20 px-3.5 py-2 rounded-lg bg-[#0d071a]/90 backdrop-blur-xl border border-[#38bdf8]/50 shadow-[0_0_25px_rgba(56,189,248,0.4)] hidden sm:block">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-ping" />
              <span className="font-mono text-xs text-[#f8fafc] font-semibold">
                SYSTEM: BATTLE READY
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#7bd0ff]">
              NEURAL SYNC 100%
            </span>
          </div>

          {/* Central Master Artwork HoloCard */}
          <HoloCard
            shockwaveOnClick={true}
            onClick={() => soundFx.playLaser()}
            className="w-full max-w-[560px] rounded-2xl overflow-hidden bg-[#140c26] border border-[#a855f7]/40 shadow-[0_10px_50px_rgba(168,85,247,0.35)] group cursor-pointer"
          >
            <div className="aspect-[16/10] w-full overflow-hidden relative">
              <img
                src={HERO_EVAN_IMG}
                alt="Evan the mecha dragon beast with lion head and glowing lightning cards"
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06030c] via-transparent to-transparent opacity-80" />
            </div>

            <div className="p-4 flex items-center justify-between bg-[#1f1926]/90 backdrop-blur-md border-t border-white/10">
              <div>
                <span className="font-mono text-[10px] text-[#94a3b8] tracking-widest block">
                  // UNIT: MECARD-01
                </span>
                <p className="font-headline text-base md:text-lg text-[#f8fafc] font-bold">
                  EVAN THE WARRIOR
                </p>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#ddb7ff]/20 text-[#ddb7ff] border border-[#ddb7ff]/40 font-mono text-xs font-bold tracking-wider">
                RANK S+
              </span>
            </div>
          </HoloCard>
        </div>
      </div>
    </section>
  );
};
