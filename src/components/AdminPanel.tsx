import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Mecardimal, Character, Episode, GalleryItem, BattleConfig } from '../types';
import { soundFx } from '../utils/audio';

export const AdminPanel: React.FC = () => {
  const {
    mecardimals,
    characters,
    episodes,
    galleryItems,
    battleConfig,
    adminLogs,
    fornoxIgUrl,
    updateFornoxIgUrl,
    isAdminAuthenticated,
    isAdminPanelOpen,
    adminPasscode,
    closeAdminPanel,
    authenticateAdmin,
    logoutAdmin,
    changeAdminPasscode,
    addMecardimal,
    updateMecardimal,
    deleteMecardimal,
    addCharacter,
    updateCharacter,
    deleteCharacter,
    addEpisode,
    updateEpisode,
    deleteEpisode,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    updateBattleConfig,
    resetToDefaults,
    exportDatabase,
    importDatabase,
    clearLogs,
  } = useData();

  // Authentication form state
  const [passcodeInput, setPasscodeInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Gate key change & reset state
  const [showGateKeyChange, setShowGateKeyChange] = useState<boolean>(false);
  const [gateCurrentKey, setGateCurrentKey] = useState<string>('');
  const [gateNewKey, setGateNewKey] = useState<string>('');
  const [gateChangeError, setGateChangeError] = useState<string>('');
  const [gateChangeSuccess, setGateChangeSuccess] = useState<string>('');

  // Active Tab
  type AdminTab = 'mecardimals' | 'characters' | 'episodes' | 'gallery' | 'battle' | 'system';
  const [activeTab, setActiveTab] = useState<AdminTab>('mecardimals');

  // Modal forms for creation / editing
  const [editingMecardimal, setEditingMecardimal] = useState<Mecardimal | null>(null);
  const [isAddingMecardimal, setIsAddingMecardimal] = useState<boolean>(false);

  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
  const [isAddingCharacter, setIsAddingCharacter] = useState<boolean>(false);

  const [editingEpisode, setEditingEpisode] = useState<Episode | null>(null);
  const [isAddingEpisode, setIsAddingEpisode] = useState<boolean>(false);

  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);
  const [isAddingGallery, setIsAddingGallery] = useState<boolean>(false);

  // Passcode change modal
  const [newPasscode, setNewPasscode] = useState<string>('');
  const [passcodeSuccess, setPasscodeSuccess] = useState<string>('');
  const [showActivePasscode, setShowActivePasscode] = useState<boolean>(false);

  // Fornox Instagram link configuration
  const [igInput, setIgInput] = useState<string>('');
  const [igSuccess, setIgSuccess] = useState<string>('');

  // Battle config local form
  const [localBattle, setLocalBattle] = useState<BattleConfig>(battleConfig);

  // Confirmation modal for factory reset
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [importStatus, setImportStatus] = useState<string>('');

  if (!isAdminPanelOpen) return null;

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = authenticateAdmin(passcodeInput);
    if (ok) {
      soundFx.playOverdrive();
      setAuthError('');
      setPasscodeInput('');
    } else {
      soundFx.playBeep(400, 0.2);
      setAuthError('INVALID ACCESS KEY. Access Denied by Triforce Security Protocol.');
    }
  };

  const handleQuickDemoBypass = () => {
    authenticateAdmin('MECARD2026');
    soundFx.playOverdrive();
    setAuthError('');
  };

  // Download DB
  const handleExport = () => {
    soundFx.playBeep(920, 0.05);
    const json = exportDatabase();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `turning-mecard-db-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import DB
  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const res = importDatabase(content);
        if (res.success) {
          soundFx.playOverdrive();
          setImportStatus('✓ ' + res.message);
          setTimeout(() => setImportStatus(''), 4000);
        } else {
          soundFx.playBeep(400, 0.2);
          setImportStatus('⚠ ' + res.message);
        }
      }
    };
    reader.readAsText(file);
  };

  // 1. UN-AUTHENTICATED GATE MODAL
  if (!isAdminAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
        <div className="w-full max-w-md rounded-2xl bg-[#0d071a] border border-[#a855f7]/50 shadow-[0_0_50px_rgba(168,85,247,0.4)] overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 bg-[#140c26] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#a855f7] animate-ping" />
              <span className="font-mono text-xs text-[#f8fafc] uppercase tracking-widest font-bold">
                COMMAND TERMINAL // SECURITY GATE
              </span>
            </div>
            <button
              onClick={closeAdminPanel}
              className="w-8 h-8 rounded-lg bg-[#231d2a] hover:bg-[#3d3744] text-[#cfc2d6] hover:text-[#f8fafc] flex items-center justify-center font-mono text-sm border border-white/10 cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="p-6 space-y-5">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#1f1926] border border-[#38bdf8]/40 flex items-center justify-center text-[#38bdf8] shadow-[0_0_20px_rgba(56,189,248,0.3)]">
                <span className="material-symbols-outlined text-[28px]">lock</span>
              </div>
              <h3 className="font-headline text-xl font-bold uppercase text-[#f8fafc]">
                ADMINISTRATIVE OVERRIDE
              </h3>
              <p className="font-body text-xs text-[#94a3b8] leading-relaxed">
                Enter Master Security Passcode to access full database controls, Mecardimal codex manipulation, and battle telemetry.
              </p>
            </div>

            {!showGateKeyChange ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-mono text-xs text-[#7bd0ff] uppercase tracking-wider font-semibold">
                      MASTER ACCESS KEY
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[11px] font-mono text-[#94a3b8] hover:text-[#38bdf8] flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                      <span>{showPassword ? 'HIDE' : 'SHOW'}</span>
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passcodeInput}
                      onChange={(e) => setPasscodeInput(e.target.value)}
                      placeholder="ENTER MASTER ACCESS KEY"
                      className="w-full px-4 py-3 rounded-xl bg-[#06030c] border border-white/15 text-[#f8fafc] font-mono text-sm placeholder-[#94a3b8]/50 focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-all"
                      autoFocus
                    />
                    <span className="absolute right-3 top-3 text-[#94a3b8] material-symbols-outlined text-[20px]">
                      key
                    </span>
                  </div>
                </div>

                {authError && (
                  <div className="p-2.5 rounded-lg bg-[#ffb4ab]/15 border border-[#ffb4ab]/30 text-[#ffb4ab] font-mono text-xs">
                    {authError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#a855f7] to-[#38bdf8] text-[#06030c] font-headline text-sm uppercase font-bold tracking-wider hover:opacity-95 shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all cursor-pointer"
                >
                  AUTHORIZE ACCESS
                </button>
              </form>
            ) : (
              /* Inline Key Change Form on Gate */
              <div className="p-4 rounded-xl bg-[#06030c] border border-[#a855f7]/40 space-y-3 font-mono">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs text-[#a855f7] font-bold uppercase tracking-wider">
                    // CHANGE ACCESS KEY
                  </span>
                  <span className="text-[10px] text-[#2dd4bf] uppercase">Direct Update</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-[11px] text-[#94a3b8] block mb-1">
                      CURRENT KEY (or master override: FORNOX)
                    </label>
                    <input
                      type="password"
                      value={gateCurrentKey}
                      onChange={(e) => setGateCurrentKey(e.target.value)}
                      placeholder="Enter current key or FORNOX"
                      className="w-full px-3 py-2 rounded-lg bg-[#0d071a] border border-white/15 text-[#f8fafc] text-xs focus:border-[#38bdf8] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#7bd0ff] block mb-1 font-semibold">
                      NEW DESIRED KEY (MIN 4 CHARS)
                    </label>
                    <input
                      type="password"
                      value={gateNewKey}
                      onChange={(e) => setGateNewKey(e.target.value)}
                      placeholder="ENTER NEW PASSCODE"
                      className="w-full px-3 py-2 rounded-lg bg-[#0d071a] border border-white/15 text-[#f8fafc] text-xs focus:border-[#2dd4bf] outline-none font-bold"
                    />
                  </div>
                </div>

                {gateChangeError && (
                  <p className="text-[11px] text-[#ffb4ab]">{gateChangeError}</p>
                )}
                {gateChangeSuccess && (
                  <p className="text-[11px] text-[#2dd4bf] font-bold">{gateChangeSuccess}</p>
                )}

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      const curr = gateCurrentKey.trim().toUpperCase();
                      const nxt = gateNewKey.trim().toUpperCase();
                      if (!curr) {
                        setGateChangeError('Enter current key or FORNOX to authorize update');
                        return;
                      }
                      if (curr !== adminPasscode.toUpperCase() && curr !== 'FORNOX') {
                        setGateChangeError('Current key incorrect. Use FORNOX as fallback override.');
                        return;
                      }
                      if (nxt.length < 4) {
                        setGateChangeError('New key must be at least 4 characters long');
                        return;
                      }
                      changeAdminPasscode(nxt);
                      soundFx.playOverdrive();
                      setGateChangeError('');
                      setGateChangeSuccess('✓ Access key updated. Unlocking...');
                      setPasscodeInput(nxt);
                      // Auto-authenticate immediately
                      setTimeout(() => {
                        authenticateAdmin(nxt);
                        setShowGateKeyChange(false);
                      }, 1200);
                    }}
                    className="flex-1 py-2.5 rounded-lg bg-[#2dd4bf] text-[#06030c] font-headline text-xs font-bold uppercase tracking-wider hover:bg-[#5eead4] transition-all cursor-pointer"
                  >
                    SAVE & UNLOCK
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowGateKeyChange(false);
                      setGateChangeError('');
                      setGateChangeSuccess('');
                    }}
                    className="px-3 py-2.5 rounded-lg bg-[#1f1926] text-[#cfc2d6] text-xs hover:bg-[#2d2438] cursor-pointer"
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2 font-mono text-xs">
              <div className="flex items-center justify-between text-[#94a3b8]">
                <span>SECURITY PROTOCOL:</span>
                <span className="text-[#2dd4bf] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf] animate-pulse" />
                  KEY ENCRYPTED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowGateKeyChange(!showGateKeyChange);
                    setGateChangeError('');
                    setGateChangeSuccess('');
                  }}
                  className="py-2 px-3 rounded-lg bg-[#140c26] hover:bg-[#23173a] text-[#a855f7] border border-[#a855f7]/30 text-center font-bold tracking-wide transition-colors cursor-pointer flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">lock_reset</span>
                  <span>{showGateKeyChange ? 'BACK TO LOGIN' : 'CHANGE KEY'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleQuickDemoBypass}
                  className="py-2 px-3 rounded-lg bg-[#1f1926] hover:bg-[#2d2438] text-[#38bdf8] text-center border border-[#38bdf8]/30 transition-colors cursor-pointer flex items-center justify-center gap-1 font-bold"
                >
                  <span className="material-symbols-outlined text-[14px]">bolt</span>
                  <span>1-CLICK UNLOCK</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED COMMAND STATION MAIN VIEW
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#06030c] text-[#eadff0] overflow-hidden">
      {/* Top Admin Station Navigation Header */}
      <header className="h-16 px-4 md:px-8 bg-[#0d071a] border-b border-[#a855f7]/30 flex items-center justify-between gap-4 shrink-0 shadow-lg">
        {/* Title & Live Status */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#a855f7]/20 border border-[#a855f7]/50 flex items-center justify-center text-[#a855f7]">
            <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-sm md:text-base tracking-wider uppercase text-[#f8fafc]">
                TRIFORCE CENTRAL COMMAND
              </span>
              <span className="px-2 py-0.5 rounded bg-[#2dd4bf]/20 text-[#2dd4bf] border border-[#2dd4bf]/30 font-mono text-[10px] font-bold uppercase hidden sm:inline-block">
                OVERRIDE ACTIVE
              </span>
            </div>
            <p className="font-mono text-[10px] text-[#94a3b8] hidden md:block">
              LIVE LOCAL DATABASE // AUTO-PERSISTED STORAGE
            </p>
          </div>
        </div>

        {/* Global Action Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Export JSON */}
          <button
            type="button"
            onClick={handleExport}
            title="Download database as JSON"
            className="px-3 py-1.5 rounded-lg bg-[#1f1926] hover:bg-[#2d2438] text-[#7bd0ff] font-mono text-xs border border-white/10 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span className="hidden sm:inline">EXPORT JSON</span>
          </button>

          {/* Import JSON */}
          <label
            title="Import database JSON"
            className="px-3 py-1.5 rounded-lg bg-[#1f1926] hover:bg-[#2d2438] text-[#a855f7] font-mono text-xs border border-white/10 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">upload</span>
            <span className="hidden sm:inline">IMPORT JSON</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileImport}
              className="hidden"
            />
          </label>

          {/* Factory Reset */}
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            title="Reset to Factory Canonical Defaults"
            className="px-3 py-1.5 rounded-lg bg-[#ffb4ab]/15 hover:bg-[#ffb4ab]/25 text-[#ffb4ab] font-mono text-xs border border-[#ffb4ab]/30 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">restart_alt</span>
            <span className="hidden md:inline">RESET</span>
          </button>

          {/* Quick Key Status Button */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('system');
              soundFx.playBeep(880, 0.05);
            }}
            title="Manage Master Access Key"
            className="px-2.5 py-1.5 rounded-lg bg-[#06030c] hover:bg-[#140c26] text-[#2dd4bf] font-mono text-xs border border-[#2dd4bf]/40 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">key</span>
            <span className="hidden md:inline font-bold">SECURITY KEY</span>
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={() => {
              logoutAdmin();
              soundFx.playBeep(600, 0.05);
            }}
            title="Logout of Admin"
            className="w-8 h-8 rounded-lg bg-[#1f1926] hover:bg-[#ffb4ab]/20 text-[#cfc2d6] hover:text-[#ffb4ab] flex items-center justify-center border border-white/10 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
          </button>

          {/* Close Panel Button */}
          <button
            type="button"
            onClick={() => {
              soundFx.playBeep(700, 0.05);
              closeAdminPanel();
            }}
            className="px-3.5 py-1.5 rounded-lg bg-[#38bdf8] hover:bg-[#7bd0ff] text-[#06030c] font-headline text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(56,189,248,0.4)] flex items-center gap-1 cursor-pointer"
          >
            <span>LIVE SITE</span>
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      </header>

      {/* Import feedback banner */}
      {importStatus && (
        <div className="px-6 py-2 bg-[#1f1926] border-b border-[#38bdf8]/40 text-center font-mono text-xs text-[#38bdf8] animate-pulse">
          {importStatus}
        </div>
      )}

      {/* Main Content Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Vertical Tab Bar */}
        <aside className="w-full md:w-64 bg-[#0d071a] border-b md:border-b-0 md:border-r border-white/10 p-3 md:p-4 shrink-0 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto">
          <span className="font-mono text-[10px] text-[#94a3b8] uppercase tracking-widest px-3 py-1 hidden md:block">
            // COMMAND MODULES
          </span>

          <button
            type="button"
            onClick={() => setActiveTab('mecardimals')}
            className={`px-3 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider text-left flex items-center justify-between shrink-0 transition-all cursor-pointer ${
              activeTab === 'mecardimals'
                ? 'bg-[#38bdf8] text-[#06030c] font-bold shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                : 'text-[#cfc2d6] hover:bg-[#1f1926]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">smart_toy</span>
              <span>MECARDIMALS</span>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              activeTab === 'mecardimals' ? 'bg-[#06030c]/20 text-[#06030c]' : 'bg-[#1f1926] text-[#7bd0ff]'
            }`}>
              {mecardimals.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('characters')}
            className={`px-3 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider text-left flex items-center justify-between shrink-0 transition-all cursor-pointer ${
              activeTab === 'characters'
                ? 'bg-[#a855f7] text-[#06030c] font-bold shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'text-[#cfc2d6] hover:bg-[#1f1926]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">groups</span>
              <span>TAMERS</span>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              activeTab === 'characters' ? 'bg-[#06030c]/20 text-[#06030c]' : 'bg-[#1f1926] text-[#ddb7ff]'
            }`}>
              {characters.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('episodes')}
            className={`px-3 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider text-left flex items-center justify-between shrink-0 transition-all cursor-pointer ${
              activeTab === 'episodes'
                ? 'bg-[#2dd4bf] text-[#06030c] font-bold shadow-[0_0_15px_rgba(45,212,191,0.4)]'
                : 'text-[#cfc2d6] hover:bg-[#1f1926]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">video_library</span>
              <span>EPISODES</span>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              activeTab === 'episodes' ? 'bg-[#06030c]/20 text-[#06030c]' : 'bg-[#1f1926] text-[#2dd4bf]'
            }`}>
              {episodes.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`px-3 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider text-left flex items-center justify-between shrink-0 transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-[#f59e0b] text-[#06030c] font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                : 'text-[#cfc2d6] hover:bg-[#1f1926]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">photo_library</span>
              <span>GALLERY</span>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              activeTab === 'gallery' ? 'bg-[#06030c]/20 text-[#06030c]' : 'bg-[#1f1926] text-[#f59e0b]'
            }`}>
              {galleryItems.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('battle')}
            className={`px-3 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider text-left flex items-center justify-between shrink-0 transition-all cursor-pointer ${
              activeTab === 'battle'
                ? 'bg-[#ffb4ab] text-[#06030c] font-bold shadow-[0_0_15px_rgba(255,180,171,0.4)]'
                : 'text-[#cfc2d6] hover:bg-[#1f1926]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">swords</span>
              <span>BATTLE ARENA</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#ffb4ab]/20 text-[#ffb4ab] text-[10px] font-bold">
              CONFIG
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('system')}
            className={`px-3 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider text-left flex items-center justify-between shrink-0 transition-all cursor-pointer ${
              activeTab === 'system'
                ? 'bg-[#ddb7ff] text-[#06030c] font-bold shadow-[0_0_15px_rgba(221,183,255,0.4)]'
                : 'text-[#cfc2d6] hover:bg-[#1f1926]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">terminal</span>
              <span>LOGS & SECURITY</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-white/10 text-xs font-bold">
              {adminLogs.length}
            </span>
          </button>
        </aside>

        {/* Right Tab Content Stage */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-[#06030c]">
          {/* TAB 1: MECARDIMALS MANAGEMENT */}
          {activeTab === 'mecardimals' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-headline text-2xl font-bold uppercase text-[#f8fafc]">
                    MECARDIMAL CODEX MANAGEMENT
                  </h3>
                  <p className="font-body text-xs md:text-sm text-[#94a3b8]">
                    Register new bio-mechanical units, edit combat ratings, and configure overdrive transformations.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playBeep(920, 0.05);
                    setIsAddingMecardimal(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#38bdf8] text-[#06030c] font-headline text-xs font-bold uppercase tracking-wider hover:bg-[#7bd0ff] shadow-[0_0_15px_rgba(56,189,248,0.4)] flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  <span>REGISTER NEW MECARDIMAL</span>
                </button>
              </div>

              {/* Grid of registered Mecardimals */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mecardimals.map((m) => (
                  <div
                    key={m.id}
                    className="p-5 rounded-2xl bg-[#0d071a] border border-white/10 flex flex-col justify-between shadow-lg relative group hover:border-[#38bdf8]/40 transition-all"
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#140c26] border border-white/10 shrink-0">
                        <img
                          src={m.imageUrl}
                          alt={m.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] text-[#38bdf8] font-bold">
                            {m.code}
                          </span>
                          <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase bg-[#a855f7]/20 text-[#a855f7] border border-[#a855f7]/30">
                            {m.rank}
                          </span>
                        </div>
                        <h4 className="font-headline text-lg font-bold text-[#f8fafc] truncate">
                          {m.name}
                        </h4>
                        <span className="font-mono text-xs text-[#94a3b8] block truncate">
                          TAMER: {m.tamer} [{m.faction}]
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-3 gap-2 font-mono text-center text-xs">
                      <div className="bg-[#140c26] p-1.5 rounded">
                        <span className="text-[10px] text-[#94a3b8] block">PWR</span>
                        <span className="text-[#a855f7] font-bold">{m.power}</span>
                      </div>
                      <div className="bg-[#140c26] p-1.5 rounded">
                        <span className="text-[10px] text-[#94a3b8] block">SPD</span>
                        <span className="text-[#38bdf8] font-bold">{m.speed}</span>
                      </div>
                      <div className="bg-[#140c26] p-1.5 rounded">
                        <span className="text-[10px] text-[#94a3b8] block">DEF</span>
                        <span className="text-[#2dd4bf] font-bold">{m.defense}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          soundFx.playBeep(880, 0.05);
                          setEditingMecardimal(m);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#1f1926] hover:bg-[#38bdf8] hover:text-[#06030c] text-[#cfc2d6] font-mono text-xs border border-white/10 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                        <span>EDIT</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Decommission ${m.name} from active roster?`)) {
                            soundFx.playBeep(500, 0.1);
                            deleteMecardimal(m.id);
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#ffb4ab]/10 hover:bg-[#ffb4ab] hover:text-[#06030c] text-[#ffb4ab] font-mono text-xs border border-[#ffb4ab]/30 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                        <span>DELETE</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: TAMERS & PILOTS */}
          {activeTab === 'characters' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-headline text-2xl font-bold uppercase text-[#f8fafc]">
                    TAMERS & PILOT DOSSIERS
                  </h3>
                  <p className="font-body text-xs md:text-sm text-[#94a3b8]">
                    Configure pilots, resonance sync ratings, faction allegiances, and tactical stats.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playBeep(920, 0.05);
                    setIsAddingCharacter(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#a855f7] text-[#06030c] font-headline text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px]">person_add</span>
                  <span>REGISTER NEW TAMER</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {characters.map((c) => (
                  <div
                    key={c.id}
                    className="p-5 rounded-2xl bg-[#0d071a] border border-white/10 flex flex-col justify-between shadow-lg hover:border-[#a855f7]/40 transition-all"
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#140c26] border border-white/10 shrink-0">
                        <img
                          src={c.imageUrl}
                          alt={c.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-mono text-[10px] text-[#a855f7] font-bold">
                          {c.title}
                        </span>
                        <h4 className="font-headline text-xl font-bold text-[#f8fafc] truncate">
                          {c.name}
                        </h4>
                        <span className="font-mono text-xs text-[#38bdf8] block truncate">
                          FACTION: {c.faction}
                        </span>
                        <span className="font-mono text-xs text-[#2dd4bf] block truncate">
                          PARTNER: {c.partner}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                      <span className="text-[#94a3b8]">SYNC RATE:</span>
                      <span className="text-[#f8fafc] font-bold">{c.syncRate}%</span>
                    </div>

                    <div className="mt-4 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          soundFx.playBeep(880, 0.05);
                          setEditingCharacter(c);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#1f1926] hover:bg-[#a855f7] hover:text-[#06030c] text-[#cfc2d6] font-mono text-xs border border-white/10 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                        <span>EDIT</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Remove ${c.name} from tamer registry?`)) {
                            soundFx.playBeep(500, 0.1);
                            deleteCharacter(c.id);
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#ffb4ab]/10 hover:bg-[#ffb4ab] hover:text-[#06030c] text-[#ffb4ab] font-mono text-xs border border-[#ffb4ab]/30 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                        <span>DELETE</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: EPISODES STREAMING HUB */}
          {activeTab === 'episodes' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-headline text-2xl font-bold uppercase text-[#f8fafc]">
                    EPISODE BROADCAST TRANSMISSIONS
                  </h3>
                  <p className="font-body text-xs md:text-sm text-[#94a3b8]">
                    Schedule new episodes, change transmission status, and update synopsis archives.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playBeep(920, 0.05);
                    setIsAddingEpisode(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#2dd4bf] text-[#06030c] font-headline text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-[0_0_15px_rgba(45,212,191,0.4)] flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px]">playlist_add</span>
                  <span>DISPATCH NEW EPISODE</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {episodes.map((ep) => (
                  <div
                    key={ep.id}
                    className="rounded-2xl bg-[#0d071a] border border-white/10 overflow-hidden shadow-lg flex flex-col justify-between"
                  >
                    <div className="aspect-video relative bg-[#140c26]">
                      <img
                        src={ep.thumbnailUrl}
                        alt={ep.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#a855f7] text-[#06030c] font-mono text-[10px] font-bold">
                        {ep.episodeNum}
                      </div>
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#06030c]/80 text-[#f8fafc] font-mono text-[10px]">
                        {ep.duration}
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <h4 className="font-headline text-base font-bold text-[#f8fafc]">
                        {ep.title}
                      </h4>
                      <p className="font-body text-xs text-[#94a3b8] line-clamp-2">
                        {ep.synopsis}
                      </p>
                      <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-[#38bdf8]">
                        <span>STATUS: {ep.status}</span>
                        <span>{ep.airDate}</span>
                      </div>
                    </div>

                    <div className="p-4 pt-0 flex items-center justify-end gap-2 border-t border-white/5 mt-auto">
                      <button
                        type="button"
                        onClick={() => {
                          soundFx.playBeep(880, 0.05);
                          setEditingEpisode(ep);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#1f1926] hover:bg-[#2dd4bf] hover:text-[#06030c] text-[#cfc2d6] font-mono text-xs border border-white/10 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                        <span>EDIT</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Remove ${ep.title}?`)) {
                            soundFx.playBeep(500, 0.1);
                            deleteEpisode(ep.id);
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#ffb4ab]/10 hover:bg-[#ffb4ab] hover:text-[#06030c] text-[#ffb4ab] font-mono text-xs border border-[#ffb4ab]/30 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                        <span>DELETE</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: GALLERY MANAGEMENT */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-headline text-2xl font-bold uppercase text-[#f8fafc]">
                    TACTICAL GALLERY ARCHIVE
                  </h3>
                  <p className="font-body text-xs md:text-sm text-[#94a3b8]">
                    Manage visual artifacts, environment blueprints, and production art assets.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playBeep(920, 0.05);
                    setIsAddingGallery(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#f59e0b] text-[#06030c] font-headline text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-[0_0_15px_rgba(245,158,11,0.4)] flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
                  <span>ADD ARTWORK ARTIFACT</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {galleryItems.map((g) => (
                  <div
                    key={g.id}
                    className="rounded-2xl bg-[#0d071a] border border-white/10 overflow-hidden shadow-lg flex flex-col justify-between"
                  >
                    <div className="aspect-[16/10] relative bg-[#140c26]">
                      <img
                        src={g.imageUrl}
                        alt={g.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#06030c]/80 text-[#38bdf8] font-mono text-[10px] font-bold">
                        {g.category}
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <h4 className="font-headline text-base font-bold text-[#f8fafc]">
                        {g.title}
                      </h4>
                      <p className="font-body text-xs text-[#94a3b8] line-clamp-2">
                        {g.description}
                      </p>
                    </div>

                    <div className="p-4 pt-0 flex items-center justify-end gap-2 border-t border-white/5 mt-auto">
                      <button
                        type="button"
                        onClick={() => {
                          soundFx.playBeep(880, 0.05);
                          setEditingGallery(g);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#1f1926] hover:bg-[#f59e0b] hover:text-[#06030c] text-[#cfc2d6] font-mono text-xs border border-white/10 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                        <span>EDIT</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Remove ${g.title}?`)) {
                            soundFx.playBeep(500, 0.1);
                            deleteGalleryItem(g.id);
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#ffb4ab]/10 hover:bg-[#ffb4ab] hover:text-[#06030c] text-[#ffb4ab] font-mono text-xs border border-[#ffb4ab]/30 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                        <span>DELETE</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: BATTLE ARENA CONFIG */}
          {activeTab === 'battle' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h3 className="font-headline text-2xl font-bold uppercase text-[#f8fafc]">
                  BATTLE ARENA OVERRIDE MATRIX
                </h3>
                <p className="font-body text-xs md:text-sm text-[#94a3b8]">
                  Adjust live strike algorithms, enemy hull stats, and overdrive damage calculations in real time.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0d071a] border border-[#ffb4ab]/30 space-y-6 shadow-xl">
                {/* Ally Unit Settings */}
                <div className="space-y-4">
                  <span className="font-mono text-xs text-[#38bdf8] uppercase tracking-widest font-bold block border-b border-white/10 pb-2">
                    // ALLY COMBATANT PARAMETERS (EVAN)
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                    <div>
                      <label className="text-[#94a3b8] block mb-1">UNIT CALLSIGN</label>
                      <input
                        type="text"
                        value={localBattle.playerUnitName}
                        onChange={(e) => setLocalBattle({ ...localBattle, playerUnitName: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
                      />
                    </div>
                    <div>
                      <label className="text-[#94a3b8] block mb-1">PILOT / ORIGIN</label>
                      <input
                        type="text"
                        value={localBattle.playerPilot}
                        onChange={(e) => setLocalBattle({ ...localBattle, playerPilot: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                    <div>
                      <label className="text-[#94a3b8] block mb-1">STANDARD STRIKE DAMAGE (%)</label>
                      <input
                        type="number"
                        min={5}
                        max={100}
                        value={localBattle.strikeDamage}
                        onChange={(e) => setLocalBattle({ ...localBattle, strikeDamage: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#38bdf8]"
                      />
                    </div>
                    <div>
                      <label className="text-[#94a3b8] block mb-1">CRITICAL BLIZZARD SLASH DAMAGE (%)</label>
                      <input
                        type="number"
                        min={10}
                        max={100}
                        value={localBattle.specialDamage}
                        onChange={(e) => setLocalBattle({ ...localBattle, specialDamage: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#a855f7]"
                      />
                    </div>
                  </div>
                </div>

                {/* Opponent Unit Settings */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <span className="font-mono text-xs text-[#ffb4ab] uppercase tracking-widest font-bold block border-b border-white/10 pb-2">
                    // ENEMY BOSS PARAMETERS
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                    <div>
                      <label className="text-[#94a3b8] block mb-1">ENEMY DESIGNATION</label>
                      <input
                        type="text"
                        value={localBattle.enemyUnitName}
                        onChange={(e) => setLocalBattle({ ...localBattle, enemyUnitName: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
                      />
                    </div>
                    <div>
                      <label className="text-[#94a3b8] block mb-1">FACTION</label>
                      <input
                        type="text"
                        value={localBattle.enemyFaction}
                        onChange={(e) => setLocalBattle({ ...localBattle, enemyFaction: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
                      />
                    </div>
                  </div>

                  <div className="font-mono text-xs">
                    <label className="text-[#94a3b8] block mb-1">ENEMY RETALIATION DAMAGE (%)</label>
                    <input
                      type="number"
                      min={5}
                      max={50}
                      value={localBattle.enemyCounterDamage}
                      onChange={(e) => setLocalBattle({ ...localBattle, enemyCounterDamage: Number(e.target.value) })}
                      className="w-full sm:w-1/2 px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#ffb4ab]"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      updateBattleConfig(localBattle);
                      soundFx.playOverdrive();
                      alert('Battle Arena parameters updated and synchronized to Live Site.');
                    }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#a855f7] to-[#38bdf8] text-[#06030c] font-headline text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer"
                  >
                    SAVE BATTLE OVERRIDES
                  </button>
                  <button
                    type="button"
                    onClick={() => setLocalBattle(battleConfig)}
                    className="px-4 py-3 rounded-xl bg-[#1f1926] text-[#cfc2d6] font-mono text-xs border border-white/10 hover:text-[#f8fafc] cursor-pointer"
                  >
                    REVERT UNSAVED
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: AUDIT LOGS & SYSTEM CONTROLS */}
          {activeTab === 'system' && (
            <div className="space-y-6 max-w-4xl mx-auto font-mono">
              <div>
                <h3 className="font-headline text-2xl font-bold uppercase text-[#f8fafc]">
                  SYSTEM SECURITY & AUDIT TRAIL
                </h3>
                <p className="font-body text-xs md:text-sm text-[#94a3b8]">
                  Manage master security access keys, review telemetry events, and perform database migrations.
                </p>
              </div>

              {/* Fornox Instagram & Studio Web Link Configuration */}
              <div className="p-6 rounded-2xl bg-[#0d071a] border border-[#a855f7]/30 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#2dd4bf] font-bold uppercase tracking-wider block">
                    // FORNOX INSTAGRAM & CREATOR LINK
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#2dd4bf]/20 text-[#2dd4bf] text-[10px] font-bold uppercase">
                    ACTIVE
                  </span>
                </div>
                <p className="font-body text-xs text-[#cfc2d6]">
                  Every &ldquo;FORNOX&rdquo; button, badge, and portal link on the site opens this Instagram address when clicked by visitors.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={igInput}
                    onChange={(e) => setIgInput(e.target.value)}
                    placeholder={`e.g. fornox.in or @fornox.in or ${fornoxIgUrl}`}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#06030c] border border-white/15 text-[#f8fafc] text-xs focus:border-[#2dd4bf] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const target = igInput.trim() || fornoxIgUrl;
                      updateFornoxIgUrl(target);
                      soundFx.playOverdrive();
                      setIgSuccess(`✓ Instagram destination updated to: ${target}`);
                      setIgInput('');
                      setTimeout(() => setIgSuccess(''), 4500);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#2dd4bf] text-[#06030c] font-headline text-xs font-bold uppercase tracking-wider hover:bg-[#5eead4] transition-all cursor-pointer"
                  >
                    SAVE IG LINK
                  </button>

                  <a
                    href={fornoxIgUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playBeep(880, 0.05)}
                    className="px-4 py-2.5 rounded-xl bg-[#1f1926] hover:bg-[#3d3744] text-[#7bd0ff] font-headline text-xs font-bold uppercase tracking-wider border border-white/10 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>OPEN IG</span>
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  </a>
                </div>

                {igSuccess && (
                  <p className="text-xs text-[#2dd4bf] font-bold">{igSuccess}</p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-white/5 text-[11px] text-[#94a3b8]">
                  <div className="flex items-center gap-1.5 truncate">
                    <span>Current Destination:</span>
                    <a
                      href={fornoxIgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#38bdf8] font-bold hover:underline truncate"
                    >
                      {fornoxIgUrl}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      updateFornoxIgUrl('https://www.instagram.com/fornox.in');
                      soundFx.playBeep(800, 0.05);
                      setIgSuccess('✓ Reset to default: https://www.instagram.com/fornox.in');
                      setTimeout(() => setIgSuccess(''), 3000);
                    }}
                    className="text-[10px] text-[#cfc2d6] hover:text-[#7bd0ff] underline cursor-pointer"
                  >
                    Reset to @fornox.in
                  </button>
                </div>
              </div>

              {/* Passcode update box */}
              <div className="p-6 rounded-2xl bg-[#0d071a] border border-[#38bdf8]/30 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#38bdf8] font-bold uppercase tracking-wider block">
                    // MASTER ACCESS KEY CONFIGURATION (അഡ്മിൻ മാസ്റ്റർ കീ)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#38bdf8]/20 text-[#38bdf8] text-[10px] font-bold uppercase">
                    SECURITY
                  </span>
                </div>
                <p className="font-body text-xs text-[#cfc2d6]">
                  Change the security key required to enter this Admin Control Center. Any code with at least 4 characters can be used.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={newPasscode}
                    onChange={(e) => setNewPasscode(e.target.value)}
                    placeholder="TYPE NEW PASSCODE (e.g. FORNOX2026, MECARD999)"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#06030c] border border-white/15 text-[#f8fafc] text-xs focus:border-[#38bdf8] outline-none uppercase font-bold"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newPasscode.trim().length >= 4) {
                        const code = newPasscode.trim().toUpperCase();
                        changeAdminPasscode(code);
                        soundFx.playOverdrive();
                        setPasscodeSuccess(`✓ Master access key changed to: ${code}`);
                        setNewPasscode('');
                        setTimeout(() => setPasscodeSuccess(''), 4500);
                      } else {
                        alert('Passcode must be at least 4 characters long');
                      }
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#38bdf8] text-[#06030c] font-headline text-xs font-bold uppercase tracking-wider hover:bg-[#7bd0ff] transition-all cursor-pointer"
                  >
                    UPDATE KEY
                  </button>
                </div>

                {passcodeSuccess && (
                  <p className="text-xs text-[#2dd4bf] font-bold">{passcodeSuccess}</p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5 text-[11px] text-[#94a3b8]">
                  <div className="flex items-center gap-2">
                    <span>Active Key:</span>
                    <span className="px-2.5 py-1 rounded bg-black/50 border border-white/10 text-[#f8fafc] font-mono font-bold text-xs tracking-widest">
                      {showActivePasscode ? adminPasscode : '••••••••••••'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowActivePasscode(!showActivePasscode)}
                      className="text-[#7bd0ff] hover:text-[#f8fafc] flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {showActivePasscode ? 'visibility_off' : 'visibility'}
                      </span>
                      <span>{showActivePasscode ? 'Hide' : 'Reveal'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(adminPasscode);
                        soundFx.playBeep(900, 0.05);
                        setPasscodeSuccess('✓ Access key copied to clipboard');
                        setTimeout(() => setPasscodeSuccess(''), 2500);
                      }}
                      title="Copy Key"
                      className="text-[#7bd0ff] hover:text-[#f8fafc] flex items-center gap-0.5 underline cursor-pointer ml-1"
                    >
                      <span className="material-symbols-outlined text-[13px]">content_copy</span>
                      <span>Copy</span>
                    </button>
                  </div>

                  {/* Reset to Canonical Default */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        changeAdminPasscode('MECARD2026');
                        soundFx.playOverdrive();
                        setPasscodeSuccess('✓ Reset to standard default key');
                        setTimeout(() => setPasscodeSuccess(''), 3000);
                      }}
                      className="px-2.5 py-1 rounded bg-[#1f1926] hover:bg-[#2d2438] text-[#cfc2d6] hover:text-[#f8fafc] text-[11px] border border-white/10 cursor-pointer flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[13px]">history</span>
                      <span>Reset to Default</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Event Logs Stream */}
              <div className="p-6 rounded-2xl bg-[#0d071a] border border-white/10 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#a855f7] font-bold uppercase tracking-wider">
                    // REAL-TIME AUDIT LOGS ({adminLogs.length})
                  </span>
                  <button
                    type="button"
                    onClick={clearLogs}
                    className="px-2.5 py-1 rounded bg-[#1f1926] hover:bg-[#ffb4ab]/20 text-[#ffb4ab] text-[10px] border border-white/10"
                  >
                    CLEAR LOGS
                  </button>
                </div>

                <div className="max-h-64 overflow-y-auto space-y-2 pr-2 text-xs">
                  {adminLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-2.5 rounded-lg bg-[#06030c] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#94a3b8]">[{log.timestamp}]</span>
                        <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-bold text-[#7bd0ff]">
                          {log.category}
                        </span>
                        <span className="text-[#f8fafc]">{log.details}</span>
                      </div>
                      <span className="text-[10px] text-[#2dd4bf] shrink-0 font-semibold">
                        {log.action}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: ADD / EDIT MECARDIMAL */}
      {(isAddingMecardimal || editingMecardimal) && (
        <MecardimalFormModal
          initialData={editingMecardimal}
          onSave={(item) => {
            if (editingMecardimal) {
              updateMecardimal(item);
            } else {
              addMecardimal(item);
            }
            soundFx.playOverdrive();
            setIsAddingMecardimal(false);
            setEditingMecardimal(null);
          }}
          onClose={() => {
            setIsAddingMecardimal(false);
            setEditingMecardimal(null);
          }}
        />
      )}

      {/* MODAL: ADD / EDIT CHARACTER */}
      {(isAddingCharacter || editingCharacter) && (
        <CharacterFormModal
          initialData={editingCharacter}
          onSave={(item) => {
            if (editingCharacter) {
              updateCharacter(item);
            } else {
              addCharacter(item);
            }
            soundFx.playOverdrive();
            setIsAddingCharacter(false);
            setEditingCharacter(null);
          }}
          onClose={() => {
            setIsAddingCharacter(false);
            setEditingCharacter(null);
          }}
        />
      )}

      {/* MODAL: ADD / EDIT EPISODE */}
      {(isAddingEpisode || editingEpisode) && (
        <EpisodeFormModal
          initialData={editingEpisode}
          onSave={(item) => {
            if (editingEpisode) {
              updateEpisode(item);
            } else {
              addEpisode(item);
            }
            soundFx.playOverdrive();
            setIsAddingEpisode(false);
            setEditingEpisode(null);
          }}
          onClose={() => {
            setIsAddingEpisode(false);
            setEditingEpisode(null);
          }}
        />
      )}

      {/* MODAL: ADD / EDIT GALLERY */}
      {(isAddingGallery || editingGallery) && (
        <GalleryFormModal
          initialData={editingGallery}
          onSave={(item) => {
            if (editingGallery) {
              updateGalleryItem(item);
            } else {
              addGalleryItem(item);
            }
            soundFx.playOverdrive();
            setIsAddingGallery(false);
            setEditingGallery(null);
          }}
          onClose={() => {
            setIsAddingGallery(false);
            setEditingGallery(null);
          }}
        />
      )}

      {/* MODAL: FACTORY RESET CONFIRMATION */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="max-w-md w-full p-6 rounded-2xl bg-[#0d071a] border border-[#ffb4ab]/50 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-[#ffb4ab]">
              <span className="material-symbols-outlined text-[24px]">warning</span>
              <h4 className="font-headline text-lg font-bold uppercase">
                RESTORE FACTORY DEFAULTS?
              </h4>
            </div>
            <p className="font-body text-xs text-[#cfc2d6] leading-relaxed">
              This will restore all original Mecardimals, Tamers, Episodes, and Gallery items back to their default canon. Any custom entries will be reverted.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl bg-[#1f1926] text-[#cfc2d6] font-mono text-xs border border-white/10"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={() => {
                  resetToDefaults();
                  soundFx.playReset();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#ffb4ab] text-[#06030c] font-headline text-xs font-bold uppercase"
              >
                CONFIRM FACTORY RESET
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ----------------------------------------------------
// SUB-COMPONENT MODALS: CRUD FORMS
// ----------------------------------------------------

interface MecardimalFormProps {
  initialData: Mecardimal | null;
  onSave: (item: Mecardimal) => void;
  onClose: () => void;
}

const MecardimalFormModal: React.FC<MecardimalFormProps> = ({ initialData, onSave, onClose }) => {
  const [formData, setFormData] = useState<Mecardimal>(
    initialData || {
      id: `mecard-${Date.now()}`,
      name: '',
      code: 'MECARD-05',
      type: 'DRAGONIC-BEAST',
      rank: 'RANK S+',
      rankColor: 'bg-[#a855f7] text-[#06030c]',
      tamer: 'Jason',
      faction: 'Blue City',
      specialAttack: 'Cosmic Nova Burst',
      description: 'Advanced dimensional battle unit with hyper-compression shock plating.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmVvcPOTz7nORaWKNgMjiCpETVM6SJ7FawLp5i8-DXu6Iub-Sf2yBXBNeZ3CEAvuY7ogTrTNIpktfH9A8U7vNWiyqh2oEQkhNpfeQFfVcSA8t3ykLX1L0U9QKTTPDaWhM41QpD3HhqJB3wSAdw11rl1w-ai43aUnJ7tr6lxQ9JAOz3-T9hu0G1Xh0IFj9u3jTibjtJf8pc9arAnnZrkQHeqjJyYAqUnMJMJFmASgk48kI5hQ3DdM7cow',
      power: 9000,
      speed: 8500,
      defense: 8800,
      vehicleModel: 'Hyper GT Cruiser',
      element: 'Plasma Fire',
    }
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-2xl rounded-2xl bg-[#0d071a] border border-[#38bdf8]/40 shadow-2xl overflow-hidden my-8">
        <div className="px-6 py-4 bg-[#140c26] border-b border-white/10 flex items-center justify-between">
          <span className="font-mono text-xs text-[#38bdf8] uppercase font-bold">
            {initialData ? 'EDIT MECARDIMAL UNIT' : 'REGISTER NEW MECARDIMAL'}
          </span>
          <button onClick={onClose} className="text-[#94a3b8] hover:text-[#f8fafc]">✕</button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!formData.name) return alert('Name is required');
            onSave(formData);
          }}
          className="p-6 space-y-4 font-mono text-xs max-h-[75vh] overflow-y-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[#94a3b8] block mb-1">MECARDIMAL NAME</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. DEATHWING"
                className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
              />
            </div>
            <div>
              <label className="text-[#94a3b8] block mb-1">DESIGNATION CODE</label>
              <input
                type="text"
                required
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="e.g. MECARD-05"
                className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-[#94a3b8] block mb-1">TIER / RANK</label>
              <select
                value={formData.rank}
                onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
              >
                <option value="RANK S+">RANK S+</option>
                <option value="RANK A+">RANK A+</option>
                <option value="RANK A">RANK A</option>
                <option value="MYTHIC">MYTHIC</option>
              </select>
            </div>
            <div>
              <label className="text-[#94a3b8] block mb-1">TAMER</label>
              <input
                type="text"
                value={formData.tamer}
                onChange={(e) => setFormData({ ...formData, tamer: e.target.value })}
                placeholder="Pilot Name"
                className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
              />
            </div>
            <div>
              <label className="text-[#94a3b8] block mb-1">FACTION</label>
              <select
                value={formData.faction}
                onChange={(e) => setFormData({ ...formData, faction: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
              >
                <option value="Blue City">Blue City</option>
                <option value="Triforce">Triforce</option>
                <option value="Red Hall">Red Hall</option>
                <option value="Black Mirror">Black Mirror</option>
                <option value="Goblin Corps">Goblin Corps</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[#94a3b8] block mb-1">IMAGE ASSET URL</label>
            <input
              type="url"
              required
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[#94a3b8] block mb-1">VEHICLE CHASSIS</label>
              <input
                type="text"
                value={formData.vehicleModel || ''}
                onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                placeholder="e.g. Azure Hypercar GT"
                className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
              />
            </div>
            <div>
              <label className="text-[#94a3b8] block mb-1">ELEMENT TYPE</label>
              <input
                type="text"
                value={formData.element || ''}
                onChange={(e) => setFormData({ ...formData, element: e.target.value })}
                placeholder="e.g. Cryo / Lightning"
                className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
              />
            </div>
          </div>

          <div>
            <label className="text-[#94a3b8] block mb-1">SPECIAL OVERDRIVE ATTACK</label>
            <input
              type="text"
              value={formData.specialAttack}
              onChange={(e) => setFormData({ ...formData, specialAttack: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
            />
          </div>

          {/* Stat Sliders */}
          <div className="p-4 rounded-xl bg-[#06030c] border border-white/10 space-y-3">
            <div>
              <div className="flex justify-between text-[#94a3b8] mb-1">
                <span>POWER RATING (DP): {formData.power}</span>
              </div>
              <input
                type="range"
                min={5000}
                max={12000}
                step={100}
                value={formData.power}
                onChange={(e) => setFormData({ ...formData, power: Number(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between text-[#94a3b8] mb-1">
                <span>SPEED RATING (SP): {formData.speed}</span>
              </div>
              <input
                type="range"
                min={5000}
                max={12000}
                step={100}
                value={formData.speed}
                onChange={(e) => setFormData({ ...formData, speed: Number(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between text-[#94a3b8] mb-1">
                <span>DEFENSE RATING (DF): {formData.defense}</span>
              </div>
              <input
                type="range"
                min={5000}
                max={12000}
                step={100}
                value={formData.defense}
                onChange={(e) => setFormData({ ...formData, defense: Number(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label className="text-[#94a3b8] block mb-1">BIO-MECHANICAL DESCRIPTION</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#1f1926] text-[#cfc2d6]"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#38bdf8] text-[#06030c] font-bold uppercase"
            >
              SAVE UNIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface CharacterFormProps {
  initialData: Character | null;
  onSave: (item: Character) => void;
  onClose: () => void;
}

const CharacterFormModal: React.FC<CharacterFormProps> = ({ initialData, onSave, onClose }) => {
  const [formData, setFormData] = useState<Character>(
    initialData || {
      id: `char-${Date.now()}`,
      name: '',
      title: '// TACTICAL COMMANDER',
      faction: 'BLUE CITY',
      factionColor: 'cyan',
      partner: 'EVAN',
      affinity: 'RESONANCE PULSE',
      syncRate: 90,
      description: 'Expert tamer capable of high-frequency cognitive synchronization with allied mecardimals.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCK-7rdKDmnLSndofCsh6rHvt23Mep45jvZw0Rb48FDVSVFw3GHvUWXyo_1dMt3sXo-6B-g2osgiH9aT4pJc99vUh9D5lKmqiaEyvA3cXHs5BDUmGH89nLySqo88khxJnZJLvvXhpXGnBgM0XBuEMoopsRdkdWRKCasxCKHDI1AfexTvBEX8CDR9WJMG8G0_llywP7xwlxkzbKxM90Ti1XbiDyzfx5lvM7a1tgUyuG2jbHYJBc55Cnj3Q',
      quote: "Let's turn the tide together!",
      stats: { tactics: 88, resonance: 92, willpower: 90 },
    }
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-xl rounded-2xl bg-[#0d071a] border border-[#a855f7]/40 shadow-2xl overflow-hidden my-8">
        <div className="px-6 py-4 bg-[#140c26] border-b border-white/10 flex items-center justify-between">
          <span className="font-mono text-xs text-[#a855f7] uppercase font-bold">
            {initialData ? 'EDIT TAMER DOSSIER' : 'REGISTER NEW TAMER'}
          </span>
          <button onClick={onClose} className="text-[#94a3b8] hover:text-[#f8fafc]">✕</button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!formData.name) return alert('Name is required');
            onSave(formData);
          }}
          className="p-6 space-y-4 font-mono text-xs max-h-[75vh] overflow-y-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[#94a3b8] block mb-1">PILOT NAME</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
              />
            </div>
            <div>
              <label className="text-[#94a3b8] block mb-1">TITLE</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[#94a3b8] block mb-1">FACTION</label>
              <input
                type="text"
                value={formData.faction}
                onChange={(e) => setFormData({ ...formData, faction: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
              />
            </div>
            <div>
              <label className="text-[#94a3b8] block mb-1">PARTNER MECARDIMAL</label>
              <input
                type="text"
                value={formData.partner}
                onChange={(e) => setFormData({ ...formData, partner: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
              />
            </div>
          </div>

          <div>
            <label className="text-[#94a3b8] block mb-1">IMAGE URL</label>
            <input
              type="url"
              required
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[#94a3b8] block mb-1">AFFINITY DOCTRINE</label>
              <input
                type="text"
                value={formData.affinity}
                onChange={(e) => setFormData({ ...formData, affinity: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
              />
            </div>
            <div>
              <label className="text-[#94a3b8] block mb-1">SYNC RATE ({formData.syncRate}%)</label>
              <input
                type="range"
                min={50}
                max={100}
                value={formData.syncRate}
                onChange={(e) => setFormData({ ...formData, syncRate: Number(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label className="text-[#94a3b8] block mb-1">PILOT QUOTE</label>
            <input
              type="text"
              value={formData.quote || ''}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
            />
          </div>

          <div>
            <label className="text-[#94a3b8] block mb-1">DESCRIPTION</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#1f1926] text-[#cfc2d6]"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#a855f7] text-[#06030c] font-bold uppercase"
            >
              SAVE TAMER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface EpisodeFormProps {
  initialData: Episode | null;
  onSave: (item: Episode) => void;
  onClose: () => void;
}

const EpisodeFormModal: React.FC<EpisodeFormProps> = ({ initialData, onSave, onClose }) => {
  const [formData, setFormData] = useState<Episode>(
    initialData || {
      id: `ep-${Date.now()}`,
      episodeNum: 'EP 04',
      title: 'Clash of the Titans',
      duration: '24m',
      synopsis: 'A high stakes tournament round pits Jason and Evan against Ryan and Phoenix.',
      thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhJU_s-CVLODR2c-pOTkAb_3BXAVdaAA6esXaY2FNymD0XOVCn8X4y76DltDr3LDqztWLkOlKERPpN60Kee0cJC9pG06E_QIZrLUNf02i6wQI2HG8LEAfH7xyMXr5wyUOgKbBsaciHWvA-zTqfWvJqTWvLjFn4XoMt25luQhiE9KOwb9t-p_v5GWxc8d8ODWCeZXy-dWyjFln1jORDGf2lC70MynzumvKcA9Z5J18lcpdOBcxa-vt1ng',
      status: 'AVAILABLE',
      airDate: 'SEASON 01 // TRANSMISSION 04',
    }
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-2xl bg-[#0d071a] border border-[#2dd4bf]/40 shadow-2xl overflow-hidden">
        <div className="px-6 py-4 bg-[#140c26] border-b border-white/10 flex items-center justify-between">
          <span className="font-mono text-xs text-[#2dd4bf] uppercase font-bold">
            {initialData ? 'EDIT EPISODE' : 'DISPATCH NEW EPISODE'}
          </span>
          <button onClick={onClose} className="text-[#94a3b8] hover:text-[#f8fafc]">✕</button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!formData.title) return alert('Title is required');
            onSave(formData);
          }}
          className="p-6 space-y-4 font-mono text-xs"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[#94a3b8] block mb-1">EPISODE NUMBER</label>
              <input
                type="text"
                value={formData.episodeNum}
                onChange={(e) => setFormData({ ...formData, episodeNum: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
              />
            </div>
            <div>
              <label className="text-[#94a3b8] block mb-1">DURATION</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
              />
            </div>
          </div>

          <div>
            <label className="text-[#94a3b8] block mb-1">EPISODE TITLE</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
            />
          </div>

          <div>
            <label className="text-[#94a3b8] block mb-1">THUMBNAIL URL</label>
            <input
              type="url"
              required
              value={formData.thumbnailUrl}
              onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
            />
          </div>

          <div>
            <label className="text-[#94a3b8] block mb-1">SYNOPSIS</label>
            <textarea
              rows={3}
              value={formData.synopsis}
              onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#1f1926] text-[#cfc2d6]"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#2dd4bf] text-[#06030c] font-bold uppercase"
            >
              SAVE EPISODE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface GalleryFormProps {
  initialData: GalleryItem | null;
  onSave: (item: GalleryItem) => void;
  onClose: () => void;
}

const GalleryFormModal: React.FC<GalleryFormProps> = ({ initialData, onSave, onClose }) => {
  const [formData, setFormData] = useState<GalleryItem>(
    initialData || {
      id: `art-${Date.now()}`,
      title: 'Cosmic Nebula Arena',
      category: '// ENVIRONMENT ART',
      categoryColor: 'text-[#38bdf8]',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3rYbI2TESdBS46Fce7hejh9pgEQS5SnCv_sMQAyw1ZM1FkKl3ne2Ladbxn0Q8iwiGswbo1Zog94DUAe41PbmSSTuQDM8vKQ38m5oJNsE4fS70bCSGcqHCRkQQw_JhtgIstpkxac2mCujClmQEc7Nhq8zS01rAQhbUei_KP7_PZOnCKgPWh2C-ADTORsxIMHfoh6C7bi1iL9iuAS2sgsqoKpNlfK5EUUVMygbRyyNX58_T3N5RRIdr9A',
      description: 'Holographic simulation grid showing interdimensional flux and crystal energy pylons.',
    }
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-2xl bg-[#0d071a] border border-[#f59e0b]/40 shadow-2xl overflow-hidden">
        <div className="px-6 py-4 bg-[#140c26] border-b border-white/10 flex items-center justify-between">
          <span className="font-mono text-xs text-[#f59e0b] uppercase font-bold">
            {initialData ? 'EDIT ARTWORK ARTIFACT' : 'ADD ARTWORK ARTIFACT'}
          </span>
          <button onClick={onClose} className="text-[#94a3b8] hover:text-[#f8fafc]">✕</button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!formData.title) return alert('Title is required');
            onSave(formData);
          }}
          className="p-6 space-y-4 font-mono text-xs"
        >
          <div>
            <label className="text-[#94a3b8] block mb-1">ARTWORK TITLE</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[#94a3b8] block mb-1">CATEGORY</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
              />
            </div>
            <div>
              <label className="text-[#94a3b8] block mb-1">GRID SPAN</label>
              <select
                value={formData.spanCol || 'col-span-1'}
                onChange={(e) => setFormData({ ...formData, spanCol: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
              >
                <option value="col-span-1">Standard (1 Column)</option>
                <option value="md:col-span-2 lg:col-span-2">Wide (2 Columns)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[#94a3b8] block mb-1">IMAGE URL</label>
            <input
              type="url"
              required
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
            />
          </div>

          <div>
            <label className="text-[#94a3b8] block mb-1">DESCRIPTION</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#06030c] border border-white/15 text-[#f8fafc]"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#1f1926] text-[#cfc2d6]"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#f59e0b] text-[#06030c] font-bold uppercase"
            >
              SAVE ARTWORK
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
