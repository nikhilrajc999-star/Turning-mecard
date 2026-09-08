import React, { useState } from 'react';
import { TRANSFORMATION_DIAGRAM_IMG } from '../data/mecardData';
import { soundFx } from '../utils/audio';

export const TransformationMatrix: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'vehicle' | 'warrior'>('warrior');
  const [activeStage, setActiveStage] = useState<number>(4);

  const stages = [
    {
      num: '01',
      stage: '// STAGE ONE',
      title: 'VEHICLE MODE',
      desc: 'High-speed miniature race car navigating the physical circuit with magnetic latch dormant.',
      color: 'text-[#38bdf8]',
      time: '0.00s'
    },
    {
      num: '02',
      stage: '// STAGE TWO',
      title: 'CARD CONTACT',
      desc: 'Front neodymium magnetic bumper locks onto the deployed Mecard card matrix.',
      color: 'text-[#a855f7]',
      time: '0.02s'
    },
    {
      num: '03',
      stage: '// STAGE THREE',
      title: 'SPRING EXPANSION',
      desc: 'Internal hyper-torsion springs violently unfurl chassis armor and limbs in 0.08s.',
      color: 'text-[#7bd0ff]',
      time: '0.08s'
    },
    {
      num: '04',
      stage: '// STAGE FOUR',
      title: 'WARRIOR STAND',
      desc: 'Full-scale robotic beast unleashes maximum combat aura and tactical offensive systems.',
      color: 'text-[#2dd4bf]',
      time: '0.12s'
    }
  ];

  const handleModeToggle = (mode: 'vehicle' | 'warrior') => {
    soundFx.playTransform();
    setActiveMode(mode);
    setActiveStage(mode === 'vehicle' ? 1 : 4);
  };

  const handleStageClick = (idx: number) => {
    soundFx.playTransform();
    setActiveStage(idx + 1);
    if (idx === 0) setActiveMode('vehicle');
    else if (idx === 3) setActiveMode('warrior');
  };

  return (
    <section id="transformation" className="w-full py-20 md:py-28 relative bg-[#06030c]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs md:text-sm text-[#a855f7] tracking-[0.25em] uppercase font-semibold">
            04 / KINETIC DEPLOYMENT PROTOCOL
          </span>
          <h2 className="font-headline text-3xl md:text-5xl font-bold uppercase text-[#f8fafc] mt-1">
            THE TRANSFORMATION MATRIX
          </h2>
          <p className="font-body text-sm md:text-base text-[#94a3b8] mt-2 leading-relaxed">
            Mini-car meets holographic card. Magnetic trigger initiates an explosive structural realignment into apex warrior form.
          </p>
        </div>

        {/* 4-Stage Flow Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {stages.map((stg, idx) => {
            const isCurrent = activeStage === idx + 1;
            return (
              <div
                key={stg.num}
                onClick={() => handleStageClick(idx)}
                className={`p-6 rounded-xl border transition-all cursor-pointer flex flex-col items-center text-center shadow-lg relative ${
                  isCurrent
                    ? 'bg-[#1f1926] border-[#38bdf8] shadow-[0_0_25px_rgba(56,189,248,0.3)] ring-1 ring-[#38bdf8]'
                    : 'bg-[#140c26] border-white/10 hover:border-white/20'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full bg-[#231d2a] border border-white/15 flex items-center justify-center font-headline font-bold text-lg mb-3 ${stg.color}`}
                >
                  {stg.num}
                </div>
                <span className="font-mono text-[10px] text-[#94a3b8] uppercase tracking-wider">
                  {stg.stage}
                </span>
                <h3 className="font-headline text-base md:text-lg text-[#f8fafc] font-bold mt-0.5">
                  {stg.title}
                </h3>
                <p className="font-body text-xs text-[#94a3b8] mt-1 leading-relaxed">
                  {stg.desc}
                </p>
                <div className="mt-3 text-[10px] font-mono text-[#2dd4bf]">
                  T + {stg.time}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Mode Demonstration Unit */}
        <div className="rounded-2xl bg-[#0d071a] border border-[#a855f7]/25 p-6 md:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Telemetry & Controls */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#38bdf8]/15 border border-[#38bdf8]/30 text-[#38bdf8] font-mono text-xs uppercase font-bold">
                <span className="material-symbols-outlined text-[16px] animate-spin">
                  sync
                </span>
                KINETIC RECONFIGURATION PROTOCOL
              </div>

              <h3 className="font-headline text-2xl md:text-3xl font-bold text-[#f8fafc]">
                EVAN // SHIFT PROFILE
              </h3>

              <p className="font-body text-sm md:text-base text-[#94a3b8] leading-relaxed">
                Equipped with a dual-compression neodymium core, Evan shifts between aerodynamic cruiser mode and cybernetic draconic humanoid warrior with zero energy lag.
              </p>

              {/* Real-time State Monitor */}
              <div className="p-4 rounded-xl bg-[#06030c] border border-white/10 space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[#94a3b8]">CURRENT CONFIGURATION:</span>
                  <span className="text-[#38bdf8] font-bold uppercase">
                    {activeMode === 'vehicle' ? 'STAGE 01 (CRUISER)' : 'STAGE 04 (APEX WARRIOR)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94a3b8]">NEODYMIUM LATCH:</span>
                  <span className={activeMode === 'warrior' ? 'text-[#2dd4bf] font-bold' : 'text-[#f59e0b]'}>
                    {activeMode === 'warrior' ? 'CARD LOCKED (ACTIVE)' : 'STANDBY (OPEN)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94a3b8]">KINETIC OVERDRIVE:</span>
                  <span className={activeMode === 'warrior' ? 'text-[#a855f7] font-bold' : 'text-[#94a3b8]'}>
                    {activeMode === 'warrior' ? '9800 DP READY' : 'ECO-CRUISE 420 DP'}
                  </span>
                </div>
              </div>

              {/* Mode Switching Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="btn-mode-vehicle"
                  type="button"
                  onClick={() => handleModeToggle('vehicle')}
                  className={`px-5 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    activeMode === 'vehicle'
                      ? 'bg-[#38bdf8] text-[#06030c] font-bold shadow-[0_0_15px_rgba(56,189,248,0.5)]'
                      : 'bg-[#1f1926] text-[#cfc2d6] hover:bg-[#231d2a] border border-white/10'
                  }`}
                >
                  VEHICLE TELEMETRY
                </button>

                <button
                  id="btn-mode-warrior"
                  type="button"
                  onClick={() => handleModeToggle('warrior')}
                  className={`px-5 py-2.5 rounded-lg font-mono text-xs uppercase font-bold tracking-wider transition-all cursor-pointer ${
                    activeMode === 'warrior'
                      ? 'bg-gradient-to-r from-[#a855f7] to-[#b76dff] text-[#06030c] shadow-[0_0_20px_rgba(168,85,247,0.6)]'
                      : 'bg-[#1f1926] text-[#cfc2d6] hover:bg-[#231d2a] border border-white/10'
                  }`}
                >
                  WARRIOR OVERDRIVE
                </button>
              </div>
            </div>

            {/* Right Interactive Schematic Visual */}
            <div className="lg:col-span-7 relative">
              <div className="aspect-video rounded-xl overflow-hidden bg-[#140c26] border border-[#38bdf8]/30 relative group shadow-[0_0_35px_rgba(56,189,248,0.2)]">
                <img
                  src={TRANSFORMATION_DIAGRAM_IMG}
                  alt="Transformation schematic showing Evan sports car mode turning into mecha dragon warrior"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#06030c]/70 via-transparent to-[#06030c]/40" />

                {/* Status Overlays */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded bg-[#0d071a]/85 border border-[#a855f7]/40 backdrop-blur-md font-mono text-xs text-[#ddb7ff]">
                  ACTIVE MODE: {activeMode.toUpperCase()}
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[11px] font-mono text-[#f8fafc] bg-[#0d071a]/90 border border-white/10 px-4 py-2.5 rounded-lg backdrop-blur-md">
                  <span>SCHEMATIC: EVAN-REV-4</span>
                  <span className="text-[#2dd4bf]">TRANSFORMATION TIME: 0.12 SEC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
