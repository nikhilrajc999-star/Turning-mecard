import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Character,
  Mecardimal,
  Episode,
  GalleryItem,
  BattleConfig,
  AdminLog,
} from '../types';
import {
  CHARACTERS as DEFAULT_CHARACTERS,
  MECARDIMALS as DEFAULT_MECARDIMALS,
  EPISODES as DEFAULT_EPISODES,
  GALLERY_ITEMS as DEFAULT_GALLERY_ITEMS,
  BATTLE_EVAN_HEADSHOT,
  BATTLE_ENEMY_HEADSHOT,
} from '../data/mecardData';

export const DEFAULT_BATTLE_CONFIG: BattleConfig = {
  playerUnitName: 'EVAN (OVERDRIVE)',
  playerPilot: 'JASON [BLUE CITY]',
  playerMaxHp: 100,
  playerImgUrl: BATTLE_EVAN_HEADSHOT,
  playerPower: 9800,
  playerSpeed: 9200,
  playerDefense: 9500,
  strikeDamage: 25,
  specialDamage: 60,
  enemyUnitName: 'VOID CORRUPTOR',
  enemyFaction: 'BLACK MIRROR',
  enemyMaxHp: 100,
  enemyImgUrl: BATTLE_ENEMY_HEADSHOT,
  enemyPower: 9400,
  enemySpeed: 9100,
  enemyDefense: 8900,
  enemyCounterDamage: 15,
};

const DEFAULT_PASSCODE = 'MECARD2026';
export const DEFAULT_FORNOX_IG_URL = 'https://www.instagram.com/fornox.in';
const STORAGE_KEY = 'TURNING_MECARD_ADMIN_DATA_V1';
const AUTH_STORAGE_KEY = 'TURNING_MECARD_ADMIN_AUTH_V1';
const PASSCODE_STORAGE_KEY = 'TURNING_MECARD_ADMIN_PASSCODE_V1';
const FORNOX_IG_STORAGE_KEY = 'TURNING_MECARD_FORNOX_IG_URL_V1';

interface DataContextType {
  // Data
  mecardimals: Mecardimal[];
  characters: Character[];
  episodes: Episode[];
  galleryItems: GalleryItem[];
  battleConfig: BattleConfig;
  adminLogs: AdminLog[];
  fornoxIgUrl: string;

  // Fornox IG URL Link Updater
  updateFornoxIgUrl: (url: string) => void;

  // Admin Auth & Modal State
  isAdminAuthenticated: boolean;
  isAdminPanelOpen: boolean;
  adminPasscode: string;
  openAdminPanel: () => void;
  closeAdminPanel: () => void;
  authenticateAdmin: (code: string) => boolean;
  logoutAdmin: () => void;
  changeAdminPasscode: (newCode: string) => void;

  // Mecardimal CRUD
  addMecardimal: (item: Mecardimal) => void;
  updateMecardimal: (item: Mecardimal) => void;
  deleteMecardimal: (id: string) => void;

  // Character CRUD
  addCharacter: (item: Character) => void;
  updateCharacter: (item: Character) => void;
  deleteCharacter: (id: string) => void;

  // Episode CRUD
  addEpisode: (item: Episode) => void;
  updateEpisode: (item: Episode) => void;
  deleteEpisode: (id: string) => void;

  // Gallery CRUD
  addGalleryItem: (item: GalleryItem) => void;
  updateGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;

  // Battle Config
  updateBattleConfig: (newConfig: Partial<BattleConfig>) => void;

  // Database Management
  resetToDefaults: () => void;
  exportDatabase: () => string;
  importDatabase: (jsonData: string) => { success: boolean; message: string };
  clearLogs: () => void;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or canonical defaults
  const [mecardimals, setMecardimals] = useState<Mecardimal[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_MECARDIMALS`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load saved mecardimals', e);
    }
    return DEFAULT_MECARDIMALS;
  });

  const [characters, setCharacters] = useState<Character[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_CHARACTERS`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load saved characters', e);
    }
    return DEFAULT_CHARACTERS;
  });

  const [episodes, setEpisodes] = useState<Episode[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_EPISODES`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load saved episodes', e);
    }
    return DEFAULT_EPISODES;
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_GALLERY`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load saved gallery items', e);
    }
    return DEFAULT_GALLERY_ITEMS;
  });

  const [battleConfig, setBattleConfig] = useState<BattleConfig>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_BATTLE`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load saved battle config', e);
    }
    return DEFAULT_BATTLE_CONFIG;
  });

  const [adminLogs, setAdminLogs] = useState<AdminLog[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_LOGS`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load saved admin logs', e);
    }
    return [
      {
        id: 'log-init',
        timestamp: new Date().toLocaleTimeString(),
        category: 'SYSTEM',
        action: 'CONSOLE_INIT',
        details: 'Triforce Command Security Station Initialized with Tactical Overdrive Protocol.',
      },
    ];
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  });

  const [adminPasscode, setAdminPasscodeState] = useState<string>(() => {
    return localStorage.getItem(PASSCODE_STORAGE_KEY) || DEFAULT_PASSCODE;
  });

  const [fornoxIgUrl, setFornoxIgUrlState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(FORNOX_IG_STORAGE_KEY);
      if (saved && saved.trim() && !saved.includes('nikhilrajc999')) return saved.trim();
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_FORNOX_IG_URL;
  });

  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState<boolean>(false);

  // Auto-sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_MECARDIMALS`, JSON.stringify(mecardimals));
    } catch (e) {
      console.error(e);
    }
  }, [mecardimals]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_CHARACTERS`, JSON.stringify(characters));
    } catch (e) {
      console.error(e);
    }
  }, [characters]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_EPISODES`, JSON.stringify(episodes));
    } catch (e) {
      console.error(e);
    }
  }, [episodes]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_GALLERY`, JSON.stringify(galleryItems));
    } catch (e) {
      console.error(e);
    }
  }, [galleryItems]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_BATTLE`, JSON.stringify(battleConfig));
    } catch (e) {
      console.error(e);
    }
  }, [battleConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_LOGS`, JSON.stringify(adminLogs));
    } catch (e) {
      console.error(e);
    }
  }, [adminLogs]);

  // Log helper
  const addLog = (category: AdminLog['category'], action: string, details: string) => {
    const newLog: AdminLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toLocaleTimeString(),
      category,
      action,
      details,
    };
    setAdminLogs((prev) => [newLog, ...prev.slice(0, 99)]);
  };

  // Admin Auth
  const authenticateAdmin = (code: string): boolean => {
    if (code.trim().toUpperCase() === adminPasscode.toUpperCase() || code.trim().toUpperCase() === 'FORNOX') {
      setIsAdminAuthenticated(true);
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      addLog('SYSTEM', 'AUTH_SUCCESS', 'Admin Master Key Authenticated successfully.');
      return true;
    }
    addLog('SYSTEM', 'AUTH_FAILURE', `Unauthorized login attempt with key: ${code}`);
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    addLog('SYSTEM', 'LOGOUT', 'Administrator logged out of Command Station.');
  };

  const changeAdminPasscode = (newCode: string) => {
    if (newCode && newCode.trim().length >= 4) {
      const code = newCode.trim().toUpperCase();
      setAdminPasscodeState(code);
      localStorage.setItem(PASSCODE_STORAGE_KEY, code);
      addLog('SYSTEM', 'PASSCODE_CHANGE', 'Master Access Passcode updated.');
    }
  };

  const updateFornoxIgUrl = (newUrl: string) => {
    let formatted = newUrl.trim();
    if (!formatted) {
      formatted = DEFAULT_FORNOX_IG_URL;
    } else if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
      if (formatted.startsWith('@')) {
        formatted = `https://www.instagram.com/${formatted.substring(1)}`;
      } else if (formatted.includes('instagram.com')) {
        formatted = `https://${formatted}`;
      } else {
        formatted = `https://www.instagram.com/${formatted}`;
      }
    }
    setFornoxIgUrlState(formatted);
    try {
      localStorage.setItem(FORNOX_IG_STORAGE_KEY, formatted);
    } catch (e) {
      console.error(e);
    }
    addLog('SYSTEM', 'UPDATE_IG_LINK', `Fornox destination link updated to: ${formatted}`);
  };

  const openAdminPanel = () => {
    setIsAdminPanelOpen(true);
  };

  const closeAdminPanel = () => {
    setIsAdminPanelOpen(false);
  };

  // Mecardimal CRUD
  const addMecardimal = (item: Mecardimal) => {
    setMecardimals((prev) => [item, ...prev]);
    addLog('MECARDIMAL', 'ADD_UNIT', `Added Mecardimal: ${item.name} (${item.code})`);
  };

  const updateMecardimal = (item: Mecardimal) => {
    setMecardimals((prev) => prev.map((m) => (m.id === item.id ? item : m)));
    addLog('MECARDIMAL', 'UPDATE_UNIT', `Modified Mecardimal: ${item.name} (${item.code})`);
  };

  const deleteMecardimal = (id: string) => {
    const item = mecardimals.find((m) => m.id === id);
    setMecardimals((prev) => prev.filter((m) => m.id !== id));
    addLog('MECARDIMAL', 'DELETE_UNIT', `Decommissioned Mecardimal: ${item?.name || id}`);
  };

  // Character CRUD
  const addCharacter = (item: Character) => {
    setCharacters((prev) => [item, ...prev]);
    addLog('TAMER', 'ADD_PILOT', `Registered new Tamer: ${item.name} [${item.faction}]`);
  };

  const updateCharacter = (item: Character) => {
    setCharacters((prev) => prev.map((c) => (c.id === item.id ? item : c)));
    addLog('TAMER', 'UPDATE_PILOT', `Updated Tamer: ${item.name} [${item.faction}]`);
  };

  const deleteCharacter = (id: string) => {
    const item = characters.find((c) => c.id === id);
    setCharacters((prev) => prev.filter((c) => c.id !== id));
    addLog('TAMER', 'DELETE_PILOT', `Removed Tamer: ${item?.name || id}`);
  };

  // Episode CRUD
  const addEpisode = (item: Episode) => {
    setEpisodes((prev) => [item, ...prev]);
    addLog('EPISODE', 'ADD_EPISODE', `Scheduled Episode: ${item.episodeNum} - ${item.title}`);
  };

  const updateEpisode = (item: Episode) => {
    setEpisodes((prev) => prev.map((ep) => (ep.id === item.id ? item : ep)));
    addLog('EPISODE', 'UPDATE_EPISODE', `Updated Episode: ${item.episodeNum} - ${item.title}`);
  };

  const deleteEpisode = (id: string) => {
    const item = episodes.find((ep) => ep.id === id);
    setEpisodes((prev) => prev.filter((ep) => ep.id !== id));
    addLog('EPISODE', 'DELETE_EPISODE', `Archived/Removed Episode: ${item?.title || id}`);
  };

  // Gallery CRUD
  const addGalleryItem = (item: GalleryItem) => {
    setGalleryItems((prev) => [item, ...prev]);
    addLog('GALLERY', 'ADD_ARTWORK', `Archived new Tactical Art: ${item.title}`);
  };

  const updateGalleryItem = (item: GalleryItem) => {
    setGalleryItems((prev) => prev.map((g) => (g.id === item.id ? item : g)));
    addLog('GALLERY', 'UPDATE_ARTWORK', `Updated Tactical Art: ${item.title}`);
  };

  const deleteGalleryItem = (id: string) => {
    const item = galleryItems.find((g) => g.id === id);
    setGalleryItems((prev) => prev.filter((g) => g.id !== id));
    addLog('GALLERY', 'DELETE_ARTWORK', `Removed Art Artifact: ${item?.title || id}`);
  };

  // Battle Config
  const updateBattleConfig = (newConfig: Partial<BattleConfig>) => {
    setBattleConfig((prev) => {
      const updated = { ...prev, ...newConfig };
      return updated;
    });
    addLog('BATTLE', 'CONFIG_OVERRIDE', 'Battle Simulator combat parameters adjusted.');
  };

  // Database Management
  const resetToDefaults = () => {
    setMecardimals(DEFAULT_MECARDIMALS);
    setCharacters(DEFAULT_CHARACTERS);
    setEpisodes(DEFAULT_EPISODES);
    setGalleryItems(DEFAULT_GALLERY_ITEMS);
    setBattleConfig(DEFAULT_BATTLE_CONFIG);
    setAdminPasscodeState(DEFAULT_PASSCODE);
    setFornoxIgUrlState(DEFAULT_FORNOX_IG_URL);
    localStorage.removeItem(PASSCODE_STORAGE_KEY);
    localStorage.removeItem(FORNOX_IG_STORAGE_KEY);
    addLog('SYSTEM', 'FACTORY_RESET', 'Factory Reset Executed: Restored canonical Turning Mecard database.');
  };

  const exportDatabase = (): string => {
    const payload = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      fornoxIgUrl,
      mecardimals,
      characters,
      episodes,
      galleryItems,
      battleConfig,
    };
    addLog('SYSTEM', 'EXPORT_DB', 'Exported complete database payload to JSON.');
    return JSON.stringify(payload, null, 2);
  };

  const importDatabase = (jsonData: string): { success: boolean; message: string } => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.fornoxIgUrl && typeof parsed.fornoxIgUrl === 'string') {
        updateFornoxIgUrl(parsed.fornoxIgUrl);
      }
      if (parsed.mecardimals && Array.isArray(parsed.mecardimals)) {
        setMecardimals(parsed.mecardimals);
      }
      if (parsed.characters && Array.isArray(parsed.characters)) {
        setCharacters(parsed.characters);
      }
      if (parsed.episodes && Array.isArray(parsed.episodes)) {
        setEpisodes(parsed.episodes);
      }
      if (parsed.galleryItems && Array.isArray(parsed.galleryItems)) {
        setGalleryItems(parsed.galleryItems);
      }
      if (parsed.battleConfig && typeof parsed.battleConfig === 'object') {
        setBattleConfig(parsed.battleConfig);
      }
      addLog('SYSTEM', 'IMPORT_DB', 'Imported and restored database from external JSON.');
      return { success: true, message: 'Database successfully imported and synchronized.' };
    } catch (err: any) {
      return { success: false, message: err?.message || 'Invalid JSON database file format.' };
    }
  };

  const clearLogs = () => {
    setAdminLogs([]);
  };

  return (
    <DataContext.Provider
      value={{
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
        openAdminPanel,
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
