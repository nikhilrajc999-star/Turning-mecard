import React, { useState, useEffect } from 'react';
import { soundFx } from '../utils/audio';
import { useData } from '../context/DataContext';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { fornoxIgUrl } = useData();
  const [latency, setLatency] = useState<number>(12);
  const displayLabel = fornoxIgUrl.replace(/^https?:\/\/(www\.)?/, '');

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate minor network jitter
      setLatency(Math.floor(10 + Math.random() * 6));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleLinkClick = (id: string) => {
    soundFx.playBeep(880, 0.04);
    onNavigate(id);
  };

  return (
    <footer id="footer" className="w-full bg-[#0d071a] border-t border-[#a855f7]/20">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 pt-16 pb-12">
        {/* Upper 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Col 1: Brand & Status */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-headline text-lg text-[#f8fafc] font-bold tracking-widest uppercase">
                TURNING MECARD
              </span>
            </div>
            <p className="font-body text-xs text-[#94a3b8] leading-relaxed">
              Created with imagination by FORNOX. Synthesizing high-octane mecha anime lore into cutting-edge interactive web destinations.
            </p>
            <div className="flex items-center gap-2 pt-1 font-mono text-xs text-[#7bd0ff]">
              <span className="w-2 h-2 rounded-full bg-[#2dd4bf] animate-ping" />
              <span>SYSTEM: ONLINE // LATENCY: {latency}ms</span>
            </div>
          </div>

          {/* Col 2: Archive Index */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs text-[#38bdf8] uppercase tracking-widest font-bold">
              // ARCHIVE INDEX
            </h4>
            <ul className="space-y-2 font-mono text-xs text-[#94a3b8]">
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('world')}
                  className="hover:text-[#f8fafc] transition-colors cursor-pointer"
                >
                  World Atlas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('characters')}
                  className="hover:text-[#f8fafc] transition-colors cursor-pointer"
                >
                  Tamers & Pilots
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('mecardimals')}
                  className="hover:text-[#f8fafc] transition-colors cursor-pointer"
                >
                  Mecardimal Codex
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('transformation')}
                  className="hover:text-[#f8fafc] transition-colors cursor-pointer"
                >
                  Transformation Lab
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Transmissions */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs text-[#a855f7] uppercase tracking-widest font-bold">
              // TRANSMISSIONS
            </h4>
            <ul className="space-y-2 font-mono text-xs text-[#94a3b8]">
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('factions')}
                  className="hover:text-[#f8fafc] transition-colors cursor-pointer"
                >
                  The Three Factions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('battle')}
                  className="hover:text-[#f8fafc] transition-colors cursor-pointer"
                >
                  Battle Simulator
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('episodes')}
                  className="hover:text-[#f8fafc] transition-colors cursor-pointer"
                >
                  Episode Broadcasts
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('gallery')}
                  className="hover:text-[#f8fafc] transition-colors cursor-pointer"
                >
                  Art Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Studio Fornox */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs text-[#2dd4bf] uppercase tracking-widest font-bold">
              // STUDIO FORNOX
            </h4>
            <p className="font-body text-xs text-[#94a3b8]">Official creator Instagram profile:</p>
            <a
              href={fornoxIgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-sm text-[#38bdf8] hover:underline font-bold"
            >
              <span>{displayLabel}</span>
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </a>
            <p className="font-mono text-[10px] text-[#94a3b8] mt-2">
              DESIGNED & DEVELOPED BY FORNOX STUDIO
            </p>
          </div>
        </div>

        {/* Mid-Row Social & Protocol Terminals */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-headline text-sm text-[#f8fafc] font-bold tracking-widest uppercase">
                FORNOX
              </span>
              <span className="font-mono text-[11px] text-[#94a3b8]">// TAC-SYSTEMS</span>
            </div>
            <p className="font-mono text-xs text-[#94a3b8]">
              OFFICIAL TURNING MECARD PORTAL •{' '}
              <a
                href={fornoxIgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7bd0ff] hover:text-[#ddb7ff] transition-colors inline-flex items-center gap-1"
              >
                <span>{displayLabel}</span>
                <span className="material-symbols-outlined text-[12px]">open_in_new</span>
              </a>
            </p>
          </div>

          {/* Terminal Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => soundFx.playBeep(700, 0.05)}
              aria-label="Global Network Feed"
              title="Global Network Feed"
              className="w-10 h-10 rounded-full bg-[#140c26] border border-white/10 flex items-center justify-center text-[#cfc2d6] hover:bg-[#2d2734] hover:text-[#f8fafc] hover:border-[#38bdf8] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">hub</span>
            </button>
            <button
              type="button"
              onClick={() => soundFx.playBeep(800, 0.05)}
              aria-label="Broadcast Telemetry"
              title="Broadcast Telemetry"
              className="w-10 h-10 rounded-full bg-[#140c26] border border-white/10 flex items-center justify-center text-[#cfc2d6] hover:bg-[#2d2734] hover:text-[#f8fafc] hover:border-[#a855f7] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">podcasts</span>
            </button>
            <button
              type="button"
              onClick={() => soundFx.playBeep(900, 0.05)}
              aria-label="Encrypted Communications"
              title="Encrypted Communications"
              className="w-10 h-10 rounded-full bg-[#140c26] border border-white/10 flex items-center justify-center text-[#cfc2d6] hover:bg-[#2d2734] hover:text-[#f8fafc] hover:border-[#2dd4bf] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">forum</span>
            </button>
            <button
              type="button"
              onClick={() => soundFx.playBeep(1000, 0.05)}
              aria-label="Security Terminal"
              title="Security Terminal"
              className="w-10 h-10 rounded-full bg-[#140c26] border border-white/10 flex items-center justify-center text-[#cfc2d6] hover:bg-[#2d2734] hover:text-[#f8fafc] hover:border-[#f59e0b] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">terminal</span>
            </button>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-[11px] text-[#94a3b8]">
          <p>© 2026 FORNOX. All rights reserved. Creator Profile: <a href={fornoxIgUrl} target="_blank" rel="noopener noreferrer" className="text-[#7bd0ff] hover:underline">{displayLabel}</a></p>
          <div className="flex flex-wrap items-center gap-4 uppercase">
            <span className="text-[#94a3b8]">NEURAL DIRECTIVE</span>
            <span className="text-[#94a3b8]">•</span>
            <span className="text-[#94a3b8]">TERMS OF DEPLOYMENT</span>
            <span className="text-[#94a3b8]">•</span>
            <span className="text-[#94a3b8]">SECURITY PROTOCOL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
