import React, { useState } from 'react';
import { STORY_CHAPTERS } from '../data/mecardData';
import { StoryChapter } from '../types';
import { HoloCard } from './HoloCard';
import { soundFx } from '../utils/audio';

export const StoryChronicles: React.FC = () => {
  const [selectedChapter, setSelectedChapter] = useState<StoryChapter | null>(null);

  const handleChapterClick = (ch: StoryChapter) => {
    soundFx.playBeep(940, 0.05);
    setSelectedChapter(selectedChapter?.chapter === ch.chapter ? null : ch);
  };

  return (
    <section id="story" className="w-full py-20 md:py-28 relative bg-[#140c26]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-mono text-xs md:text-sm text-[#a855f7] tracking-[0.2em] uppercase font-semibold">
              07 / CHRONICLE TIMELINE // ARCHIVES
            </span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold uppercase text-[#f8fafc] mt-1">
              THE EPIC SAGAS
            </h2>
          </div>
          <p className="font-body text-sm md:text-base text-[#94a3b8] max-w-md">
            A sprawling cross-dimensional conflict spanning from the peaceful streets of Earth to the heart of the Triforce dimension.
          </p>
        </div>

        {/* Story Narrative Grid (6 Chapters) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STORY_CHAPTERS.map((ch, idx) => {
            const isExpanded = selectedChapter?.chapter === ch.chapter;
            return (
              <HoloCard
                key={ch.chapter}
                onClick={() => handleChapterClick(ch)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between shadow-lg ${
                  isExpanded
                    ? 'bg-[#1f1926] border-[#a855f7] shadow-[0_0_25px_rgba(168,85,247,0.3)] ring-1 ring-[#a855f7]'
                    : 'bg-[#0d071a] border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <span className="font-mono text-xs text-[#38bdf8] block font-bold mb-1">
                    {ch.chapter}
                  </span>
                  <h3 className="font-headline text-lg md:text-xl font-bold text-[#f8fafc]">
                    {ch.title}
                  </h3>
                  <p className="font-body text-xs md:text-sm text-[#94a3b8] mt-2.5 leading-relaxed">
                    {ch.synopsis}
                  </p>

                  {isExpanded && (
                    <div className="mt-4 pt-3 border-t border-white/10 font-body text-xs text-[#cfc2d6] bg-[#06030c]/70 p-3 rounded-lg leading-relaxed">
                      {ch.details}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#94a3b8]">
                  <span>LOCATION: {ch.location}</span>
                  <span className="text-[#a855f7] font-bold">
                    {isExpanded ? 'LESS ▲' : `CH.0${idx + 1} ▼`}
                  </span>
                </div>
              </HoloCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
