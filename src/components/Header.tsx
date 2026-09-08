import React, { useState, useEffect } from 'react';
import { LOGO_URL } from '../data/mecardData';
import { soundFx } from '../utils/audio';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenDossier?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  isMuted,
  onToggleMute,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'world', label: 'WORLD' },
    { id: 'characters', label: 'CHARACTERS' },
    { id: 'mecardimals', label: 'MECARDIMALS' },
    { id: 'transformation', label: 'TRANSFORMATION' },
    { id: 'factions', label: 'FACTIONS' },
    { id: 'battle', label: 'BATTLE' },
    { id: 'episodes', label: 'EPISODES' },
    { id: 'fornox', label: 'FORNOX' },
  ];

  const handleNavClick = (id: string) => {
    soundFx.playBeep(980, 0.05);
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#06030c]/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(6,3,12,0.9)] border-b border-[#a855f7]/20'
          : 'bg-[#06030c]/75 backdrop-blur-xl shadow-[0_4px_30px_rgba(6,3,12,0.7)]'
      }`}
    >
      <div className="h-20 max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2 transition-transform hover:scale-105 text-left focus:outline-none"
          >
            <img
              src={LOGO_URL}
              alt="TURNING MECARD Logo"
              className="h-8 md:h-9 w-auto object-contain drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]"
            />
            <span className="font-headline font-bold text-lg md:text-xl tracking-wider uppercase text-[#f8fafc] hidden sm:inline-block">
              TURNING MECARD
            </span>
          </button>

          {/* FORNOX Verification Chip */}
          <a
            id="fornox-badge-chip"
            href="https://fornox.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:flex items-center gap-2 px-3 py-1 bg-[#0d071a]/90 rounded-full border border-[#a855f7]/30 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:border-[#38bdf8] transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-[#2dd4bf] animate-ping" />
            <span className="font-mono text-[10px] text-[#7bd0ff] tracking-widest uppercase font-semibold">
              CREATED BY FORNOX
            </span>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          id="desktop-nav"
          className="hidden lg:flex items-center gap-1 xl:gap-2"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded text-xs xl:text-sm font-mono tracking-wider uppercase transition-all duration-200 ${
                  isActive
                    ? 'bg-[#b76dff] text-[#400071] font-bold shadow-[0_0_15px_rgba(183,109,255,0.6)]'
                    : 'text-[#cfc2d6] hover:text-[#f8fafc] hover:bg-[#1f1926]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions & Utilities */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Audio Synthesizer Toggle */}
          <button
            id="audio-synth-toggle"
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute Audio HUD' : 'Mute Audio HUD'}
            title={isMuted ? 'Sound FX: Muted (Click to enable)' : 'Sound FX: Active (Click to mute)'}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              isMuted
                ? 'bg-[#1f1926] text-[#94a3b8] border border-white/10'
                : 'bg-[#0d071a] text-[#7bd0ff] border border-[#38bdf8]/40 shadow-[0_0_15px_rgba(56,189,248,0.4)]'
            } hover:scale-105`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isMuted ? 'volume_off' : 'volume_up'}
            </span>
          </button>

          {/* User / Terminal Status Indicator */}
          <div
            id="user-status-indicator"
            className="w-9 h-9 rounded-full bg-gradient-to-br from-[#a855f7] to-[#38bdf8] p-[1.5px] flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]"
            title="Pilot Protocol: Authorized"
          >
            <div className="w-full h-full rounded-full bg-[#0d071a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[#ddb7ff] text-[18px]">
                person
              </span>
            </div>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={() => {
              soundFx.playBeep(700, 0.05);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden w-9 h-9 rounded-lg bg-[#1f1926] border border-[#a855f7]/30 flex items-center justify-center text-[#f8fafc]"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden bg-[#0d071a]/95 backdrop-blur-2xl border-b border-[#a855f7]/30 px-6 py-5 flex flex-col gap-2 shadow-2xl"
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-1">
            <span className="font-mono text-xs text-[#38bdf8] uppercase tracking-widest font-semibold">
              // TELEMETRY NAVIGATION
            </span>
            <span className="font-mono text-[10px] text-[#94a3b8]">FORNOX TAC-SYS</span>
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`text-left px-3 py-2 rounded font-mono text-sm uppercase tracking-wider transition-colors ${
                activeSection === item.id
                  ? 'bg-[#b76dff] text-[#400071] font-bold'
                  : 'text-[#eadff0] hover:bg-[#1f1926]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 mt-2 border-t border-white/10 flex justify-between items-center text-[11px] font-mono text-[#94a3b8]">
            <a
              href="https://fornox.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7bd0ff] hover:underline"
            >
              FORNOX.IN ↗
            </a>
            <span className="text-[#2dd4bf]">GRID: STABLE</span>
          </div>
        </div>
      )}
    </header>
  );
};
