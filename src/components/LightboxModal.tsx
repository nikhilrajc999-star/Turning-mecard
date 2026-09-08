import React from 'react';
import { GalleryItem } from '../types';
import { soundFx } from '../utils/audio';

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div
      id="lightbox-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl rounded-2xl bg-[#0d071a] border border-[#a855f7]/40 shadow-[0_0_60px_rgba(168,85,247,0.4)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#140c26] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`font-mono text-xs font-semibold ${item.categoryColor}`}>
              {item.category}
            </span>
            <h3 className="font-headline text-lg font-bold text-[#f8fafc]">
              {item.title}
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

        {/* Big Artwork Stage */}
        <div className="relative aspect-video max-h-[70vh] w-full bg-black flex items-center justify-center overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Footer Lore & Download info */}
        <div className="p-6 bg-[#0d071a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="font-headline text-base font-bold text-[#f8fafc] block">
              {item.title}
            </span>
            <p className="font-body text-xs text-[#cfc2d6] max-w-2xl mt-1 leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={item.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-[#231d2a] hover:bg-[#3d3744] text-[#7bd0ff] font-mono text-xs font-semibold border border-white/10 flex items-center gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              <span>ORIGINAL ASSET</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
