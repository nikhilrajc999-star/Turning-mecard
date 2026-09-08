import React from 'react';
import { EPISODES } from '../data/mecardData';
import { Episode } from '../types';
import { HoloCard } from './HoloCard';
import { soundFx } from '../utils/audio';

interface EpisodesHubProps {
  onPlayEpisode: (episode: Episode) => void;
}

export const EpisodesHub: React.FC<EpisodesHubProps> = ({ onPlayEpisode }) => {
  const handlePlay = (ep: Episode) => {
    soundFx.playBeep(1100, 0.08);
    onPlayEpisode(ep);
  };

  return (
    <section id="episodes" className="w-full py-20 md:py-28 relative bg-[#06030c]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-mono text-xs md:text-sm text-[#38bdf8] tracking-[0.2em] uppercase font-semibold">
              08 / BROADCAST FEED // SEASON ARCHIVE
            </span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold uppercase text-[#f8fafc] mt-1">
              STREAMING TRANSMISSIONS
            </h2>
          </div>
          <p className="font-body text-sm md:text-base text-[#94a3b8] max-w-md">
            High-definition tactical anime episodes. Relive the defining confrontations and character awakenings.
          </p>
        </div>

        {/* Episode Cards Grid (3 Episodes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EPISODES.map((ep) => (
            <HoloCard
              key={ep.id}
              onClick={() => handlePlay(ep)}
              className="rounded-2xl bg-[#0d071a] border border-white/10 overflow-hidden shadow-xl group hover:shadow-[0_0_30px_rgba(56,189,248,0.3)] transition-all flex flex-col cursor-pointer"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden bg-[#140c26]">
                <img
                  src={ep.thumbnailUrl}
                  alt={ep.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06030c]/85 via-transparent to-transparent" />

                {/* Badge Overlay */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#a855f7] text-[#06030c] font-mono text-[10px] font-bold">
                    {ep.episodeNum}
                  </span>
                  <span className="text-[#f8fafc] font-mono text-xs font-semibold">
                    {ep.duration}
                  </span>
                </div>

                {/* Play Icon Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[1px]">
                  <div className="w-14 h-14 rounded-full bg-[#38bdf8] text-[#06030c] flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.7)] transform scale-90 group-hover:scale-100 transition-transform">
                    <span className="material-symbols-outlined text-[32px]">
                      play_arrow
                    </span>
                  </div>
                </div>
              </div>

              {/* Text Information */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-headline text-lg md:text-xl text-[#f8fafc] font-bold group-hover:text-[#38bdf8] transition-colors">
                    {ep.title}
                  </h3>
                  <p className="font-body text-xs md:text-sm text-[#94a3b8] mt-2 leading-relaxed">
                    {ep.synopsis}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex justify-between items-center text-xs font-mono">
                  <span className="text-[#38bdf8] font-semibold">
                    STATUS: {ep.status}
                  </span>
                  <span className="text-[#7bd0ff] font-bold uppercase group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>WATCH NOW</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            </HoloCard>
          ))}
        </div>
      </div>
    </section>
  );
};
