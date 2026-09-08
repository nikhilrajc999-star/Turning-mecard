export interface Character {
  id: string;
  name: string;
  title: string;
  faction: string;
  factionColor: 'cyan' | 'purple' | 'amber' | 'teal' | 'primary';
  partner: string;
  affinity: string;
  syncRate: number;
  description: string;
  imageUrl: string;
  quote?: string;
  stats?: {
    tactics: number;
    resonance: number;
    willpower: number;
  };
}

export interface Mecardimal {
  id: string;
  name: string;
  code: string;
  type: string;
  rank: string;
  rankColor: string;
  tamer: string;
  faction: string;
  specialAttack: string;
  description: string;
  imageUrl: string;
  power: number;
  speed: number;
  defense: number;
  vehicleModel?: string;
  element?: string;
}

export interface RealmNode {
  id: string;
  nodeCode: string;
  name: string;
  alias: string;
  status: string;
  accentColor: string;
  frequency?: string;
  description: string;
  lore: string;
  icon: string;
}

export interface Faction {
  id: string;
  name: string;
  subtitle: string;
  sector: string;
  description: string;
  tamers: string[];
  flagships: string[];
  doctrine: string;
  icon: string;
  accentColor: string;
  themeColorClass: string;
  borderHoverClass: string;
}

export interface StoryChapter {
  chapter: string;
  title: string;
  synopsis: string;
  location: string;
  details: string;
}

export interface Episode {
  id: string;
  episodeNum: string;
  title: string;
  duration: string;
  synopsis: string;
  thumbnailUrl: string;
  status: string;
  airDate: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  imageUrl: string;
  description: string;
  spanCol?: string;
}

export interface BattleConfig {
  playerUnitName: string;
  playerPilot: string;
  playerMaxHp: number;
  playerImgUrl: string;
  playerPower: number;
  playerSpeed: number;
  playerDefense: number;
  strikeDamage: number;
  specialDamage: number;
  enemyUnitName: string;
  enemyFaction: string;
  enemyMaxHp: number;
  enemyImgUrl: string;
  enemyPower: number;
  enemySpeed: number;
  enemyDefense: number;
  enemyCounterDamage: number;
}

export interface AdminLog {
  id: string;
  timestamp: string;
  action: string;
  category: 'MECARDIMAL' | 'TAMER' | 'EPISODE' | 'GALLERY' | 'BATTLE' | 'SYSTEM';
  details: string;
}
