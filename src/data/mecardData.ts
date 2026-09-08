import { Character, Mecardimal, RealmNode, Faction, StoryChapter, Episode, GalleryItem } from '../types';

export const LOGO_URL = "https://lh3.googleusercontent.com/aida/AEtjO1UhVJTWTyu2COtTSrK_-Ily25SLzlxOBGNg9IJQQ61bVpO_ZJN4-85DURc_5Li3cyhDPlf7L8-yxEwpq-JyKCNN8PhPpZfL5xalvtt2tFlQpIrrSkwHcLxN6yVYMXd-45BEVEjhrEpxG8qfmg_HoKZvNjQZ9BqjP1PgFdXnSvFt40EHQqwj16PG-IiUMMeRbfsExxrmMMw3Vnq0W734arQxiYgOySiZWKggbPxrVYRPUlegHrVXLkbmmwaZ";

export const HERO_EVAN_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuASCxo6vhs_UKluooIgBukItHa_5_BSUt6wXZDS5FpqyXb33F_-j5FqsYeFdLqOpxJv5K3q9xrWUCFIB2aaRwSkc7qj9f5ksB0tmi-LNWJ14gm-oe3HiZ7rgknWU1L_0lYXeSEeMPTyARsfwCOMSevkrPyRQlTSUzF0UoM8uvWKSR_wm5ijY7FW1IinY1a7sRBg9rI0SiFyU28mi5YxlaKwWkmFGS0yV3VFY4EtuuLtkAAtNy_OKkz8yA";

export const CHARACTERS: Character[] = [
  {
    id: 'jason',
    name: 'JASON',
    title: '// LEAD PROTAGONIST',
    faction: 'BLUE CITY',
    factionColor: 'cyan',
    partner: 'EVAN (MYTHIC)',
    affinity: 'DIMENSIONAL HARMONY',
    syncRate: 95,
    description: "Unshakable courage and an unprecedented psychic bond with Evan make him Earth's decisive guardian against cross-dimensional invaders.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCK-7rdKDmnLSndofCsh6rHvt23Mep45jvZw0Rb48FDVSVFw3GHvUWXyo_1dMt3sXo-6B-g2osgiH9aT4pJc99vUh9D5lKmqiaEyvA3cXHs5BDUmGH89nLySqo88khxJnZJLvvXhpXGnBgM0XBuEMoopsRdkdWRKCasxCKHDI1AfexTvBEX8CDR9WJMG8G0_llywP7xwlxkzbKxM90Ti1XbiDyzfx5lvM7a1tgUyuG2jbHYJBc55Cnj3Q",
    quote: "Together with Evan, we won't let any world fall into darkness!",
    stats: { tactics: 88, resonance: 99, willpower: 96 }
  },
  {
    id: 'isobel',
    name: 'ISOBEL',
    title: '// CHIEF STRATEGIST',
    faction: 'TRIFORCE',
    factionColor: 'purple',
    partner: 'MIRINAE (SWAN)',
    affinity: 'TACTICAL INTELLECT',
    syncRate: 92,
    description: "A cool, calculated emissary from Triforce whose analytical prowess, royal lineage, and swift strategic calculations turn the tides of hopeless battles.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDU07RJR50-0AAewqaDRYAO-FkIkOfgUubDYpG-jYk3fWkWt8MazA0FujlilNHCXXzB6Vg8taCSOTuyjfJqTNSIqwEHGzXtNrJlQzNQXZkEncn85uoII1Nv23jt8UqT6hVXJ-zh9jf4d87r3Hq5OXR3lxFxerAm40OOpnWJ5ZrqPaNr_X1ajaMzjZkBqb-U10Hj3tjzKIp900HCDd6xRhpILjGZGdsNs6wFo1MdhbnNOF4bpy7mXLaZ2g",
    quote: "Every battle is determined before the first card is drawn.",
    stats: { tactics: 98, resonance: 91, willpower: 89 }
  },
  {
    id: 'ryan',
    name: 'RYAN',
    title: '// APEX RIVAL',
    faction: 'RED HALL',
    factionColor: 'amber',
    partner: 'PHOENIX (FLAME)',
    affinity: 'PYRO BURST',
    syncRate: 88,
    description: "Relentless warrior who believes sheer offensive velocity and unyielding battle spirit define the true master of any planetary arena.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUA_uxucQ5X9pwYDcWRFj8xFSMRVRn2vizgmoRZ6jQ7aTOmIx3RbOdbeoB8x9SQDHymeGcRcCb8f07khKBP2qJ2AcdDkOD_up2h9DTKV1FkPXg-KLYIZChpZozUjmwwbo5c0FHddBOr-4DM8Ti6yFpSE5JMcwXiI9fMfI6aeeQrTla-8kkw1PagzOHWdjSXDiZxOjDDLWqEDpWOtMjDZ6DjKAUY76RsGgtH3UkWXMRnoDkgmSCoT8I_Q",
    quote: "Hold nothing back! Burn through their defenses with pure fire!",
    stats: { tactics: 82, resonance: 87, willpower: 97 }
  },
  {
    id: 'dabby-dana',
    name: 'DABBY & DANA',
    title: '// DYNAMIC DUO',
    faction: 'GOBLIN CORPS',
    factionColor: 'teal',
    partner: 'MUGAN & KANGSHI',
    affinity: 'CHAOS TRICKS',
    syncRate: 82,
    description: "Unpredictable siblings known for surprising high-tier opponents with unorthodox traps, agile decoys, and lightning-quick double maneuvers.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAFrKUTDEOGtF8x-CPDpytOHZPUJPwWt7Z6lSi8TTeu-Fe-d-lZ6UJM8G4p3IGSTBhXunTNkdyHWHrnkUkNefbseDlAZ1Do5fKVHIQjXYJRmYkYQzUvHgtiEXfxYfU78X0zxrsbNm4WuhebfLs4IZDZaVHiePq0-jtKlCMMZsit2k_SIx98rHXMKyKyQ3LAfgQZSfEV3pLYaU0MO5xRM5NqRaPBPjNc9C54o-wHHgsoRVVkzCgmhTXJw",
    quote: "You fell right into our dual cross-grid ambush!",
    stats: { tactics: 86, resonance: 79, willpower: 85 }
  },
  {
    id: 'vandyne',
    name: 'VANDYNE',
    title: '// SHADOW GENERAL',
    faction: 'BLACK MIRROR',
    factionColor: 'primary',
    partner: 'CORRUPTED TITANS',
    affinity: 'VOID GRAVITY',
    syncRate: 96,
    description: "Clandestine mastermind seeking the ultimate Card of Origin to reshape all three realities under monolithic shadow rule.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1LciuTOORKK8uAkTVJurkkLJxWNN4ykZH8pE_QWIa6fQ0T-fMZGQfZprczKOkC3E-1It8FQ3qQ9YL6bpMEX3NQ0w-5FdOfQiXSnPvAaMJWOIBJN48anrknJy5O4bmFx6opj2t6OLBbrXTksEaoHAhtd9ysQNP4IZMoKPfsc3Ks_QGVQzZWAyhmY9dq6rM_CRgpPNdl9IXa35x67VP7NhsBgYpMAEOvw-Vnw2-SLEMXjX3yRTp-RWRDQ",
    quote: "Order is born from submission to the Black Mirror.",
    stats: { tactics: 95, resonance: 97, willpower: 94 }
  }
];

export const MECARDIMALS: Mecardimal[] = [
  {
    id: 'evan',
    name: 'EVAN',
    code: 'MECARD-01',
    type: 'DRAGONIC-BEAST',
    rank: 'RANK S+',
    rankColor: 'bg-neon-purple text-void-base',
    tamer: 'Jason',
    faction: 'Blue City',
    specialAttack: 'Blizzard Slash & Thunder Roar',
    description: 'The legendary bio-mechanical warrior. Combines the ferocity of a mythical lion-dragon with impenetrable cyber chassis plating and cryogenic shockwaves.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmVvcPOTz7nORaWKNgMjiCpETVM6SJ7FawLp5i8-DXu6Iub-Sf2yBXBNeZ3CEAvuY7ogTrTNIpktfH9A8U7vNWiyqh2oEQkhNpfeQFfVcSA8t3ykLX1L0U9QKTTPDaWhM41QpD3HhqJB3wSAdw11rl1w-ai43aUnJ7tr6lxQ9JAOz3-T9hu0G1Xh0IFj9u3jTibjtJf8pc9arAnnZrkQHeqjJyYAqUnMJMJFmASgk48kI5hQ3DdM7cow',
    power: 9800,
    speed: 9200,
    defense: 9500,
    vehicleModel: 'Azure Hypercar GT',
    element: 'Glacial Ice / Lightning'
  },
  {
    id: 'phoenix',
    name: 'PHOENIX',
    code: 'MECARD-02',
    type: 'PYRO-AVIAN',
    rank: 'RANK A+',
    rankColor: 'bg-warning-amber text-void-base',
    tamer: 'Ryan',
    faction: 'Red Hall',
    specialAttack: 'Crimson Flare Dive',
    description: 'A hypersonic mechanical avian forged in magma vents. Its razor feathers unleash thermobaric firestorms upon magnetic card activation.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8-PmMs0DJo6xCeJ6gFuj9uh_KP4xdhCJ_AZIFHwIaWECzCjkVCWH1RPwKcTx83cTbbAxvVO-1E-_pWRhvc4bisd373V7_Wlm5GAo8XXsy3W5dlNBGWQ1XPswi9FKs7afwwDz5jQxKJuWXo8FprqENQ5TGAWbSK1GQq4GCmT-XKHhNuadjKw-xnm4WDgWVoK07H6Ny1mK9E5nXkbVhoT-g622QSOJBw3wxZEBNslR65I67_YfdJYKurA',
    power: 8900,
    speed: 9600,
    defense: 8400,
    vehicleModel: 'Inferno Supercharged Coupe',
    element: 'Thermobaric Fire'
  },
  {
    id: 'mirinae',
    name: 'MIRINAE',
    code: 'MECARD-03',
    type: 'AERIAL-MYTH',
    rank: 'RANK A+',
    rankColor: 'bg-energy-cyan text-void-base',
    tamer: 'Isobel',
    faction: 'Triforce',
    specialAttack: 'Prismatic Feather Beam',
    description: 'An ethereal cyber swan-pegasus soaring above dimensional turbulence. Emits blinding prismatic laser salvos that disrupt enemy targeting radar.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiiuts04TNA80ZtqRiY6JXkbMTiV2jVU0DtqWpgaaHzYNEveU0-tMikPhjZILKFvY89xAraTObc4mrLJJeg24FaeUOg6yAUroHk2DvaFRStcsEf8aXo3LXB4WDgUc7vMYmRfPWuAPt8TQC09RWDWa-DhlEpJhows2pZKE--2FyQnSUalJZkWM4HsESnjcdJ4LyDs0njq-pgr6nmtPo0OOluFfZRBEEwZEi6_Zox9gv_2J2rwj7vgKg-w',
    power: 8700,
    speed: 9800,
    defense: 8600,
    vehicleModel: 'Silver Aerofoil Concept',
    element: 'Prismatic Light'
  },
  {
    id: 'tero',
    name: 'TERO',
    code: 'MECARD-04',
    type: 'DEFENSIVE-TITAN',
    rank: 'RANK A',
    rankColor: 'bg-holo-teal text-void-base',
    tamer: 'Blue City Guard',
    faction: 'Blue City',
    specialAttack: 'Emerald Barrier Blast',
    description: 'A heavy bipedal dragon equipped with twin kinetic bulwarks. Absorbs incoming particle barrages and redirects the energy into seismic concussive blasts.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCLceCyvp-RgYZ3HyVWsCU_ghJnUgmBl7OC1U7ZOFVFnWr-W08y3KooxoSvkxBBDjEkxXe32V_rJwEBEsfmZhws-hZiRMiC3nezOF-TRjaDvmy-k-SONbx9t9CXAIF1yUTv0Oa2Ut79pfmFYaNcaEobSvWKEkXb9YXRvCwMWh5r_ceMurdlEBqsA8u-Iifmj4iqfcXQmsxjXlP3rC4rHX2PZdG9m2a9OppEzhX7LJniXQdTrzja_ZkKg',
    power: 9100,
    speed: 8100,
    defense: 9900,
    vehicleModel: 'Emerald Armored SUV',
    element: 'Kinetic Earth / Forcefield'
  }
];

export const REALM_NODES: RealmNode[] = [
  {
    id: 'earth',
    nodeCode: 'NODE 01',
    name: 'EARTH',
    alias: 'TERRA PRIME',
    status: 'BALANCED',
    accentColor: 'text-energy-cyan',
    frequency: '7.83 HZ (SCHUMANN)',
    description: 'Human sanctuary realm where dormant Mecardimals first landed disguised as everyday miniature automobiles.',
    lore: 'Terra Prime serves as the unexpected sanctuary and crossroad of the dimension war. Its dense electromagnetic spectrum allowed dormant Mecardimals to hide safely among toy stores and suburban streets until the resonance of pure-hearted human tamers activated their sleeping sparks.',
    icon: 'public'
  },
  {
    id: 'triforce',
    nodeCode: 'NODE 02',
    name: 'TRIFORCE',
    alias: 'ORIGIN CORE',
    status: 'ONLINE',
    accentColor: 'text-neon-purple',
    frequency: '108.0 MHZ (HARMONIC)',
    description: 'Hyper-technological home dimension of the Mecardimal species, powered by central harmonic energy generators.',
    lore: 'The mother realm of all Mecardimal architecture. Vast crystal citadels rise toward neon nebulas, engineered by ancient builders who synthesized sentience, magnetic polarity, and kinetic robotics into compact physical forms.',
    icon: 'change_history'
  },
  {
    id: 'blue-city',
    nodeCode: 'NODE 03',
    name: 'BLUE CITY',
    alias: 'GUARDIAN REALM',
    status: 'FREQ: 432 MHZ',
    accentColor: 'text-energy-blue',
    frequency: '432 MHZ (SANCTUARY)',
    description: 'Sanctuary of peace, tactical innovation, and mutual bond between tamers and mechanical companions.',
    lore: 'Blue City upholds the fundamental axiom that Mecardimals possess sovereign consciousness and emotions. Their research institutes pioneer mutual resonance matrices, granting tamers synchronized tactical reaction times without draining their partners.',
    icon: 'apartment'
  },
  {
    id: 'red-hall',
    nodeCode: 'NODE 04',
    name: 'RED HALL',
    alias: 'WARRIOR BASTION',
    status: 'THERMAL: HIGH',
    accentColor: 'text-warning-amber',
    frequency: '920 MHZ (OVERCLOCK)',
    description: 'Volcanic citadels where tamers hone hyper-offensive battle instincts and ruthless competitive dominance.',
    lore: 'Carved inside subterranean magma caverns, Red Hall tests warrior limits through extreme thermal duels. They view battle not merely as conflict, but as the sacred crucible in which a Mecardimal reaches its ultimate evolution.',
    icon: 'local_fire_department'
  },
  {
    id: 'black-mirror',
    nodeCode: 'NODE 05',
    name: 'BLACK MIRROR',
    alias: 'VOID ANOMALY',
    status: 'ALERT: SECTOR CRIT',
    accentColor: 'text-primary',
    frequency: '0.00 MHZ (GRAVITON)',
    description: 'A shadowy splinter syndicate extracting stolen Mecardimals to siphon primordial dark power.',
    lore: 'Operating in an antimatter fold between dimensions, Black Mirror injects neural-shackles into captured units, forcing their energy output beyond safe thermal thresholds to command devastating void gravity assaults.',
    icon: 'dark_mode'
  }
];

export const FACTIONS: Faction[] = [
  {
    id: 'blue-city',
    name: 'BLUE CITY',
    subtitle: 'Harmony, Justice, and Symbiosis',
    sector: '// GUARDIAN SECTOR',
    description: 'Dedicated to treating Mecardimals as autonomous conscious comrades. Champions tactical harmony, energy conservation, and shield projection to defend both human and digital worlds.',
    tamers: ['Jason', 'Isobel (Ambassador)'],
    flagships: ['Evan', 'Mirinae', 'Tero'],
    doctrine: 'Adaptive Defense & Mutual Resonance',
    icon: 'shield',
    accentColor: '#38bdf8',
    themeColorClass: 'text-energy-cyan',
    borderHoverClass: 'hover:shadow-[0_0_35px_rgba(56,189,248,0.35)]'
  },
  {
    id: 'red-hall',
    name: 'RED HALL',
    subtitle: 'Strength, Glory, and Combat Supremacy',
    sector: '// VOLCANIC CRADLE',
    description: 'An unyielding warrior citadel emphasizing extreme aggression and fiery battle focus. Believes victory in the arena resolves all dimensional boundary disputes without diplomacy.',
    tamers: ['Ryan', 'Chunhee'],
    flagships: ['Phoenix', 'Alta', 'Ursa'],
    doctrine: 'Blitz Overwhelm & Pure Kinetic Drive',
    icon: 'swords',
    accentColor: '#f59e0b',
    themeColorClass: 'text-warning-amber',
    borderHoverClass: 'hover:shadow-[0_0_35px_rgba(245,158,11,0.35)]'
  },
  {
    id: 'black-mirror',
    name: 'BLACK MIRROR',
    subtitle: 'Void Subjugation and Total Dominion',
    sector: '// SHADOW DOMINION',
    description: 'A clandestine shadow syndicate extracting dormant Mecardimals through neural brainwashing to drain their dimensional essence and enforce monolithic galactic rule.',
    tamers: ['Vandyne', 'Dark Operatives'],
    flagships: ['Corrupted Venoma', 'Tanatos (Captive)'],
    doctrine: 'Void Distortion & Neural Shackle',
    icon: 'visibility_off',
    accentColor: '#a855f7',
    themeColorClass: 'text-neon-purple',
    borderHoverClass: 'hover:shadow-[0_0_35px_rgba(168,85,247,0.35)]'
  }
];

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    chapter: 'CHAPTER 01',
    title: 'THE MYSTERIOUS ENCOUNTER',
    synopsis: 'Jason stumbles upon Evan, a tiny living car with sharp mechanical eyes. What begins as a playground secret spirals into discovery of an interplanetary diaspora.',
    location: 'EARTH SANCTUARY',
    details: 'While exploring an abandoned lot after school, Jason finds an extraordinary blue toy car that can speak and think. Evan explains that he is a Mecardimal from the war-torn Triforce realm, searching for his lost younger brother.'
  },
  {
    chapter: 'CHAPTER 02',
    title: 'AWAKENING OF THE MECARD',
    synopsis: 'Isobel arrives through a dimensional rift. As rival Mecardimals surface across the globe, the mechanics of magnetic battle cards are unveiled to the new tamers.',
    location: 'DIMENSIONAL FAULT',
    details: 'Isobel tracks Evan to Earth to secure him for Triforce. During their encounter, an unexpected Black Mirror probe attacks. Jason and Evan perform their first battle synchronization, unlocking the magnetic card overdrive system.'
  },
  {
    chapter: 'CHAPTER 03',
    title: 'THE CLASH OF THREE REALMS',
    synopsis: 'Red Hall emissaries under Ryan challenge Blue City for control of high-tier battle cards. The battles ignite regional tournaments with cosmic stakes.',
    location: 'CRIMSON CANYON',
    details: 'Ryan emerges with Phoenix, demanding a duel to prove Red Hall supremacy. The fiery clash pushes Jason and Evan to the edge, forcing them to learn how to harmonize their minds under extreme combat pressure.'
  },
  {
    chapter: 'CHAPTER 04',
    title: 'SHADOWS OF BLACK MIRROR',
    synopsis: 'Commander Vandyne strikes from the dark dimension. Captured Mecardimals are altered through dark energy, turning once-peaceful companions into violent warmachines.',
    location: 'VOID CORRIDOR',
    details: 'Black Mirror launches coordinated strikes, capturing wandering Mecardimals and brainwashing them with dark corruptor chips. Jason, Isobel, and Ryan realize that unless they cooperate, all three dimensions will collapse.'
  },
  {
    chapter: 'CHAPTER 05',
    title: "THE SEARCH FOR EVAN'S BROTHER",
    synopsis: 'Evan reveals his long-lost brother, Tanatos. Under the sinister trance of Black Mirror, Tanatos becomes their deadliest adversary, forcing brother to fight brother.',
    location: 'ABYSS PEAK',
    details: 'A devastating confrontation takes place at the summit of Abyss Peak. Tanatos wields the dark death matrix, failing to recognize Evan. Evan refuses to deliver a finishing strike, risking his own chassis to break the mind control.'
  },
  {
    chapter: 'CHAPTER 06',
    title: 'THE FINAL CONVERGENCE',
    synopsis: 'The tamers unite across ideological lines. A grand synchronized overdrive unlocks the ultimate Card of Origin, shattering Black Mirror and sealing cosmic harmony.',
    location: 'TRIFORCE CITADEL',
    details: 'With all five realm nodes resonating in unison, the Card of Origin manifests. A combined ultimate strike from Evan, Phoenix, and Mirinae disintegrates the Void Core, freeing all enslaved Mecardimals and opening an era of peaceful interdimensional travel.'
  }
];

export const EPISODES: Episode[] = [
  {
    id: 'ep-01',
    episodeNum: 'EP 01',
    title: 'A Mysterious New Kid',
    duration: '23m',
    synopsis: 'Jason encounters a peculiar talking car named Evan, unaware that interdimensional hunters from parallel dimensions are tailing them.',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhJU_s-CVLODR2c-pOTkAb_3BXAVdaAA6esXaY2FNymD0XOVCn8X4y76DltDr3LDqztWLkOlKERPpN60Kee0cJC9pG06E_QIZrLUNf02i6wQI2HG8LEAfH7xyMXr5wyUOgKbBsaciHWvA-zTqfWvJqTWvLjFn4XoMt25luQhiE9KOwb9t-p_v5GWxc8d8ODWCeZXy-dWyjFln1jORDGf2lC70MynzumvKcA9Z5J18lcpdOBcxa-vt1ng',
    status: 'AVAILABLE',
    airDate: 'SEASON 01 // PREMIERE'
  },
  {
    id: 'ep-02',
    episodeNum: 'EP 02',
    title: 'A Guest From Another World',
    duration: '24m',
    synopsis: 'Isobel challenges Jason to verify his bond with Evan. The first true Mecard card match takes place in the suburban park.',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSDFM13h2ISkWJMY__27EtrprKLowEWKfF-a5brk0mpMKedv94YQzqy_ZDYtWrz_CufP5VAe-s9B1fdT9RNdR96zDcZwdLgAH_XOIEwVnA1JEO14YL_GgMkfgHzsfDt0_vsBt9imHYhAzngBMiMePv_ut9tvW8Z9KPXzw7y2j0ZM44YDVQge5J9ZccJUo_mn8YM978iiIXR260olr4hIdQvlYHg_jWrYzaxRJk-XrrIztOgX5Y8IjwEw',
    status: 'AVAILABLE',
    airDate: 'SEASON 01 // TRANSMISSION 02'
  },
  {
    id: 'ep-03',
    episodeNum: 'EP 03',
    title: 'Blue Land vs Red Hall',
    duration: '22m',
    synopsis: 'Ryan unleashes Phoenix with devastating fire bursts. Jason must synchronize his pulse with Evan to survive the blazing inferno.',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8oGGq69dMGVs6ToA4JskBsPFDwYRhP2t3DvwLX37VnQu73yxgL8yVzGVwfwG3bCC5Bo1f4PIkQeeAs3IzX_LQPfIxGlRRePE4VF4zl8FYDYQl2hfL-nM55ZJuwegfpAuTKascPDzOGGk3w2Fox7oki1FoH1nXmjMxfvlQU60830nUaqMRpGZ8P7mmevv8w3Ugk-2QJP-IUHlo_t9PKlHVIrA_68-lxqg1cvRKA5G6jadK_8VUYmMB_A',
    status: 'AVAILABLE',
    airDate: 'SEASON 01 // TRANSMISSION 03'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'art-01',
    title: 'Triforce Prime Megacity',
    category: '// ENVIRONMENT ART',
    categoryColor: 'text-energy-cyan',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3rYbI2TESdBS46Fce7hejh9pgEQS5SnCv_sMQAyw1ZM1FkKl3ne2Ladbxn0Q8iwiGswbo1Zog94DUAe41PbmSSTuQDM8vKQ38m5oJNsE4fS70bCSGcqHCRkQQw_JhtgIstpkxac2mCujClmQEc7Nhq8zS01rAQhbUei_KP7_PZOnCKgPWh2C-ADTORsxIMHfoh6C7bi1iL9iuAS2sgsqoKpNlfK5EUUVMygbRyyNX58_T3N5RRIdr9A',
    description: 'Grand panoramic vista of the futuristic Triforce metropolis with soaring crystal spires, holographic energy rings in purple and cyan, and glowing hovercraft conduits.',
    spanCol: 'md:col-span-2 lg:col-span-2'
  },
  {
    id: 'art-02',
    title: 'Chassis Blueprint',
    category: '// SCHEMATICS',
    categoryColor: 'text-neon-purple',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD32XGHxnsnXL-JOqVCJAFVbt9oZsS95Fq0n6ZmTzCgtwdRtZapk_hJqcoZXi0uKhOjQZogP3nM08aqsCj1jBO3M0uambpy-0PQdrxWW8mMWhiHVJEg9wAeNI2fySzDd_aNi2b6o1UMxAzRnc-VcNEwU280_9zZIMBMdQvRbvOyqKZ57Zw2w9Sv-jLF5-lzSSDDBKyeBvAK9omBWpFfuqs7JOpR3Wo2jpSIfRMXO5-lzo1ngjUNr2RLLQ',
    description: 'Technical wireframe schematic of Evan in vehicle mode displaying internal neodymium latch joints, front optical sensors, and hyper-spring recoil dimensions.',
    spanCol: 'col-span-1'
  },
  {
    id: 'art-03',
    title: 'Wingtok Flight Form',
    category: '// TITAN CODEX',
    categoryColor: 'text-holo-teal',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcB329ycZdx_B1HFgtouKHA1kXs7kRPBvwAnhQtc-KTDQUZguw8KRkRv_d-cAxaoVwek2y4x_fqn9tFrmLqX0_fwDK8S0qHMCrETdJpdJX-Y2KtUjo5qgwbLPZOtJdtbnFkipCGWKaOzFYzyqNOU2R8enw2p7dYY774kAK8bi1_LSiGlxzhT-g2m77Zxdk38vS8XCTcGirlkfHLnGX_WtiFsFl-7cz2btIhdjxg30h65pqR4ztboRbfw',
    description: 'Dynamic aerial view of Wingtok the cyber owl navigating storm currents while charging synchronized twin teal lasers.',
    spanCol: 'col-span-1'
  }
];

export const TRANSFORMATION_DIAGRAM_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuChhuW9NH_9r6ZOAyNYW4dne563EfPmAEpKqT3CoCp00Yl68zmYGreORDj6_5VbMCc_3fCCAwd5719lEMqsjcmFqcq2tZ4m00v5A8GCq1S_xoj4S_LqEgMdE0DAD2QuAl76_x5t-2XrBE1m65RWHGACei2BA4i4_VZraRKPZQ7Fy3nvSY2-jZUmTE6mpiHwStedE0iQoda5xuv3XZAm7Ce-PTfPK5b6odZjbvRblyy1h26KABuSzaC3Ww";

export const BATTLE_EVAN_HEADSHOT = "https://lh3.googleusercontent.com/aida-public/AB6AXuBqK2m40AGGCNLHIo1c0G7PVruA5WBorqyD0A0-QeZux7zDw7Majm0k72r8R5QQlrAberpqqMDjiMREq__myfNIXkx_v2g2Io_WH2Ymgp1jMSZe0VBIh4oJC6DpZ2l5mfbzqS_8HpZq1RgZWeqpn5xohP44RjOlq8r6zs7-Nm1DEODvqKmuXFzbhMcyYRi_pMp1s6gw1VC8ilPezgFj1i9t5UnvHmIpoE5NYpm8RT8LK8l848DGVivBKQ";

export const BATTLE_ENEMY_HEADSHOT = "https://lh3.googleusercontent.com/aida-public/AB6AXuCjfsidDP4JsXrX9jvJ5ct8c5U6WArrEyTFCIXpX2TNzcu648HBJ_bRWV0YYyvqwhVqqIJXSyqrV6Wghw5I6-1EFFxhqQv0QL0-aXs_zhcEF2At-gDIFLwoWBti1MQXiGgkCgf40QOHclmPl0snMbGFe2kLnfYUUh_Vb7a___fnzqnZhLc6VeMwgFayyFJOk10tpEKK-_lxcDYvhmijO3lCY6GZt_q92M1QrVjHyUtjH5xQqcUz1Cio6g";
