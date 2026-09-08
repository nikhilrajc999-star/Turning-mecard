import React from 'react';
import { GALLERY_ITEMS } from '../data/mecardData';
import { GalleryItem } from '../types';
import { HoloCard } from './HoloCard';
import { soundFx } from '../utils/audio';

interface GalleryProps {
  onOpenLightbox: (item: GalleryItem) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onOpenLightbox }) => {
  const handleClick = (item: GalleryItem) => {
    soundFx.playBeep(980, 0.06);
    onOpenLightbox(item);
  };

  return (
    <section id="gallery" className="w-full py-20 md:py-28 relative bg-[#140c26]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-mono text-xs md:text-sm text-[#a855f7] tracking-[0.2em] uppercase font-semibold">
              09 / ARCHIVAL GALLERY // VISUAL MATRIX
            </span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold uppercase text-[#f8fafc] mt-1">
              TACTICAL ARTWORKS
            </h2>
          </div>
          <p className="font-body text-sm md:text-base text-[#94a3b8] max-w-md">
            Curated visual collection of mecha blueprints, battle arenas, card illustrations, and concept production art.
          </p>
        </div>

        {/* Bento Art Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {GALLERY_ITEMS.map((item) => (
            <HoloCard
              key={item.id}
              onClick={() => handleClick(item)}
              className={`${item.spanCol || 'col-span-1'} rounded-2xl overflow-hidden bg-[#0d071a] border border-white/10 relative group shadow-xl cursor-pointer`}
            >
              <div className="w-full h-full aspect-[16/10] md:aspect-auto min-h-[260px] relative overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06030c] via-transparent to-transparent opacity-85" />

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <span className={`font-mono text-[11px] font-semibold ${item.categoryColor}`}>
                      {item.category}
                    </span>
                    <h3 className="font-headline text-lg md:text-xl font-bold text-[#f8fafc]">
                      {item.title}
                    </h3>
                  </div>

                  <div className="w-8 h-8 rounded-lg bg-[#06030c]/80 border border-white/20 flex items-center justify-center text-[#f8fafc] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-[18px]">
                      fullscreen
                    </span>
                  </div>
                </div>
              </div>
            </HoloCard>
          ))}
        </div>
      </div>
    </section>
  );
};
