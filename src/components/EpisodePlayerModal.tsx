import React, { useState, useEffect } from 'react';
import { Episode } from '../types';
import { soundFx } from '../utils/audio';

interface EpisodePlayerModalProps {
  episode: Episode | null;
  onClose: () => void;
}

export const EpisodePlayerModal: React.FC<EpisodePlayerModalProps> = ({
  episode,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(18);
  const [resolution, setResolution] = useState<string>('1080P HD');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!episode) return null;

  return (
    <div
      id="episode-player-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-2xl bg-[#0d071a] border border-[#38bdf8]/40 shadow-[0_0_60px_rgba(56,189,248,0.3)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#140c26] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-[#a855f7] text-[#06030c] font-mono text-xs font-bold">
              {episode.episodeNum}
            </span>
            <h3 className="font-headline text-base md:text-lg font-bold text-[#f8fafc]">
              {episode.title}
            </h3>
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

        {/* Video Player Stage */}
        <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center group">
          <img
            src={episode.thumbnailUrl}
            alt={episode.title}
            className={`w-full h-full object-cover transition-transform duration-1000 ${
              isPlaying ? 'scale-105 filter brightness-105' : 'filter brightness-75'
            }`}
          />

          {/* Holographic Watermark */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-[#06030c]/70 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#2dd4bf] animate-ping" />
            <span className="font-mono text-[10px] text-[#7bd0ff] tracking-wider uppercase font-semibold">
              FORNOX ANIME NETWORK // {resolution}
            </span>
          </div>

          {/* Playing Simulation HUD Indicator */}
          {isPlaying && (
            <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded bg-[#a855f7]/80 text-[#06030c] font-mono text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
              STREAMING LIVE
            </div>
          )}

          {/* Play/Pause Central Tap Control */}
          <button
            type="button"
            onClick={() => {
              soundFx.playBeep(880, 0.05);
              setIsPlaying(!isPlaying);
            }}
            className="absolute z-20 w-16 h-16 rounded-full bg-[#38bdf8]/90 text-[#06030c] flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.7)] hover:scale-110 active:scale-95 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-[36px]">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          {/* Bottom Player Scrub Bar */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-2 z-20">
            {/* Scrubber track */}
            <div
              className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer relative"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newProgress = Math.round((clickX / rect.width) * 100);
                setProgress(newProgress);
              }}
            >
              <div
                className="bg-gradient-to-r from-[#a855f7] to-[#38bdf8] h-full rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Controls Bar */}
            <div className="flex items-center justify-between text-xs font-mono text-[#f8fafc]">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-[#38bdf8] flex items-center"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>
                <span>
                  {Math.floor((progress * 24) / 100)}:
                  {String(Math.floor(((progress * 24 * 60) / 100) % 60)).padStart(2, '0')} / {episode.duration}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playBeep(980, 0.04);
                    setResolution(resolution === '1080P HD' ? '4K UHD' : '1080P HD');
                  }}
                  className="px-2 py-0.5 rounded bg-white/10 hover:bg-[#38bdf8] hover:text-[#06030c] transition-colors"
                >
                  {resolution}
                </button>
                <span className="material-symbols-outlined text-[18px] cursor-pointer hover:text-[#38bdf8]">
                  subtitles
                </span>
                <span className="material-symbols-outlined text-[18px] cursor-pointer hover:text-[#38bdf8]">
                  volume_up
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Episode Info Details */}
        <div className="p-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#94a3b8]">
            <span className="text-[#38bdf8] font-bold">{episode.airDate}</span>
            <span>DURATION: {episode.duration}</span>
          </div>
          <h4 className="font-headline text-xl font-bold text-[#f8fafc]">
            {episode.title}
          </h4>
          <p className="font-body text-sm text-[#cfc2d6] leading-relaxed">
            {episode.synopsis}
          </p>
        </div>
      </div>
    </div>
  );
};
