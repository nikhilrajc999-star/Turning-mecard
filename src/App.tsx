import React, { useState, useEffect } from 'react';
import { DataProvider } from './context/DataContext';
import { AdminPanel } from './components/AdminPanel';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WorldAtlas } from './components/WorldAtlas';
import { Characters } from './components/Characters';
import { MecardimalsCodex } from './components/MecardimalsCodex';
import { TransformationMatrix } from './components/TransformationMatrix';
import { Factions } from './components/Factions';
import { BattleConsole } from './components/BattleConsole';
import { StoryChronicles } from './components/StoryChronicles';
import { EpisodesHub } from './components/EpisodesHub';
import { Gallery } from './components/Gallery';
import { CreativeProcess } from './components/CreativeProcess';
import { FornoxShowcase } from './components/FornoxShowcase';
import { PortalClimax } from './components/PortalClimax';
import { Footer } from './components/Footer';
import { TelemetryModal } from './components/TelemetryModal';
import { EpisodePlayerModal } from './components/EpisodePlayerModal';
import { LightboxModal } from './components/LightboxModal';
import { Mecardimal, Episode, GalleryItem } from './types';
import { soundFx } from './utils/audio';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [telemetryMecardimal, setTelemetryMecardimal] = useState<Mecardimal | null>(null);
  const [playingEpisode, setPlayingEpisode] = useState<Episode | null>(null);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  // Toggle Sound FX
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundFx.setMuted(nextMuted);
    if (!nextMuted) {
      soundFx.playBeep(920, 0.08);
    }
  };

  // Scroll section tracker
  useEffect(() => {
    const sections = [
      'hero',
      'world',
      'characters',
      'mecardimals',
      'transformation',
      'factions',
      'battle',
      'story',
      'episodes',
      'gallery',
      'fornox-process',
      'fornox',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const targetY = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });
      setActiveSection(id);
    } else if (id === 'hero') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setActiveSection('hero');
    }
  };

  return (
    <DataProvider>
      <div className="min-h-screen w-full bg-[#06030c] text-[#eadff0] font-body selection:bg-[#a855f7] selection:text-[#06030c] relative">
        {/* Top Header Nav */}
        <Header
          activeSection={activeSection}
          onNavigate={scrollToSection}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />

        {/* Main Sections */}
        <main className="w-full">
          {/* Section 00: Hero */}
          <Hero
            onExploreMecardimals={() => scrollToSection('mecardimals')}
            onExploreWorld={() => scrollToSection('world')}
          />

          {/* Section 01: World Atlas */}
          <WorldAtlas />

          {/* Section 02: Characters */}
          <Characters />

          {/* Section 03: Mecardimals Codex */}
          <MecardimalsCodex onOpenTelemetry={(mec) => setTelemetryMecardimal(mec)} />

          {/* Section 04: Transformation Matrix */}
          <TransformationMatrix />

          {/* Section 05: Factions */}
          <Factions />

          {/* Section 06: Battle Console */}
          <BattleConsole />

          {/* Section 07: Story Chronicles */}
          <StoryChronicles />

          {/* Section 08: Episodes Streaming Hub */}
          <EpisodesHub onPlayEpisode={(ep) => setPlayingEpisode(ep)} />

          {/* Section 09: Tactical Art Gallery */}
          <Gallery onOpenLightbox={(art) => setLightboxItem(art)} />

          {/* Section 10: Creative Process */}
          <CreativeProcess />

          {/* Section 11: Created by FORNOX Studio Showcase */}
          <FornoxShowcase />

          {/* Section 12: Final Portal Overdrive CTA */}
          <PortalClimax onEnterWorld={() => scrollToSection('mecardimals')} />
        </main>

        {/* Section 13: Live Status Footer */}
        <Footer onNavigate={scrollToSection} />

        {/* Telemetry Modal */}
        <TelemetryModal
          mecardimal={telemetryMecardimal}
          onClose={() => setTelemetryMecardimal(null)}
        />

        {/* Video Player Modal */}
        <EpisodePlayerModal
          episode={playingEpisode}
          onClose={() => setPlayingEpisode(null)}
        />

        {/* Gallery Lightbox Modal */}
        <LightboxModal
          item={lightboxItem}
          onClose={() => setLightboxItem(null)}
        />

        {/* Admin Command Console Modal */}
        <AdminPanel />
      </div>
    </DataProvider>
  );
}
