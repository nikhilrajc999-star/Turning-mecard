import React from 'react';
import { Mecardimal } from '../types';
import { soundFx } from '../utils/audio';

interface TelemetryModalProps {
  mecardimal: Mecardimal | null;
  onClose: () => void;
}

export const TelemetryModal: React.FC<TelemetryModalProps> = ({
  mecardimal,
  onClose,
}) => {
  if (!mecardimal) return null;

  return (
    <div
      id="telemetry-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-[#0d071a] border border-[#a855f7]/50 shadow-[0_0_50px_rgba(168,85,247,0.4)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#1f1926] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2dd4bf] animate-ping" />
            <span className="font-mono text-xs text-[#38bdf8] uppercase tracking-widest font-bold">
              BIO-MECHANICAL TELEMETRY DIAGNOSTIC
            </span>
          </div>
          <button
            onClick={() => {
              soundFx.playBeep(600, 0.05);
              onClose();
            }}
            className="w-8 h-8 rounded-lg bg-[#231d2a] hover:bg-[#3d3744] text-[#cfc2d6] hover:text-[#f8fafc] flex items-center justify-center font-mono text-sm border border-white/10 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Main Visual & Key Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
            <div className="sm:col-span-5 aspect-video sm:aspect-square rounded-xl overflow-hidden bg-[#140c26] border border-[#38bdf8]/30 shadow-lg relative">
              <img
                src={mecardimal.imageUrl}
                alt={mecardimal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase bg-[#a855f7] text-[#06030c]">
                {mecardimal.rank}
              </div>
            </div>

            <div className="sm:col-span-7 space-y-2">
              <span className="font-mono text-xs text-[#7bd0ff] font-semibold">
                CODE: {mecardimal.code} // {mecardimal.type}
              </span>
              <h3 className="font-headline text-2xl md:text-3xl font-bold text-[#f8fafc]">
                {mecardimal.name}
              </h3>
              <p className="font-body text-xs text-[#cfc2d6] leading-relaxed">
                {mecardimal.description}
              </p>

              <div className="pt-2 grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="bg-[#06030c] p-2 rounded border border-white/10">
                  <span className="text-[#94a3b8] block text-[10px]">VEHICLE CHASSIS:</span>
                  <span className="text-[#38bdf8] font-semibold">{mecardimal.vehicleModel || 'Mini Racer'}</span>
                </div>
                <div className="bg-[#06030c] p-2 rounded border border-white/10">
                  <span className="text-[#94a3b8] block text-[10px]">ELEMENT TYPE:</span>
                  <span className="text-[#a855f7] font-semibold">{mecardimal.element || 'Kinetic'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Combat Matrix Metrics */}
          <div className="p-4 rounded-xl bg-[#140c26] border border-white/10 space-y-3 font-mono text-xs">
            <span className="text-[#38bdf8] block font-bold tracking-wider uppercase">
              // COMBAT OUTPUT RATINGS
            </span>

            <div>
              <div className="flex justify-between text-[#94a3b8]">
                <span>OVERDRIVE POWER</span>
                <span className="text-[#f8fafc] font-bold">{mecardimal.power} DP</span>
              </div>
              <div className="w-full bg-[#06030c] rounded-full h-2 mt-1">
                <div
                  className="bg-[#a855f7] h-2 rounded-full"
                  style={{ width: `${mecardimal.power / 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#94a3b8]">
                <span>KINETIC SPEED</span>
                <span className="text-[#f8fafc] font-bold">{mecardimal.speed} SP</span>
              </div>
              <div className="w-full bg-[#06030c] rounded-full h-2 mt-1">
                <div
                  className="bg-[#38bdf8] h-2 rounded-full"
                  style={{ width: `${mecardimal.speed / 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#94a3b8]">
                <span>SHIELD DEFENSE</span>
                <span className="text-[#f8fafc] font-bold">{mecardimal.defense} DF</span>
              </div>
              <div className="w-full bg-[#06030c] rounded-full h-2 mt-1">
                <div
                  className="bg-[#2dd4bf] h-2 rounded-full"
                  style={{ width: `${mecardimal.defense / 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Special Attack Lore */}
          <div className="p-4 rounded-xl bg-[#1f1926] border border-[#a855f7]/30 flex items-center justify-between">
            <div>
              <span className="font-mono text-[10px] text-[#94a3b8] uppercase block">
                SPECIAL OVERDRIVE MANEUVER
              </span>
              <span className="font-headline text-base text-[#f8fafc] font-bold">
                {mecardimal.specialAttack}
              </span>
            </div>
            <button
              type="button"
              onClick={() => soundFx.playOverdrive()}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#a855f7] to-[#38bdf8] text-[#06030c] font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:scale-105 transition-all cursor-pointer"
            >
              TEST AUDIO FX
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
