import React, { useState } from 'react';
import { BATTLE_EVAN_HEADSHOT, BATTLE_ENEMY_HEADSHOT } from '../data/mecardData';
import { soundFx } from '../utils/audio';

export const BattleConsole: React.FC = () => {
  const [playerHp, setPlayerHp] = useState<number>(100);
  const [enemyHp, setEnemyHp] = useState<number>(100);
  const [battleLog, setBattleLog] = useState<string>(
    '> READY: SELECT TACTICAL COMMAND TO COMMENCE STRIKE'
  );
  const [isAttacking, setIsAttacking] = useState<boolean>(false);
  const [clashEffect, setClashEffect] = useState<string | null>(null);

  const handleStandardStrike = () => {
    if (enemyHp <= 0 || playerHp <= 0 || isAttacking) return;
    setIsAttacking(true);
    soundFx.playLaser();
    setClashEffect('laser');

    const damage = 25;
    const newEnemyHp = Math.max(0, enemyHp - damage);
    setEnemyHp(newEnemyHp);

    setBattleLog('> STRIKE DEPLOYED: EVAN INFLICTED 2450 DAMAGE WITH LIGHTNING TALON!');

    setTimeout(() => {
      setClashEffect(null);
      if (newEnemyHp <= 0) {
        setBattleLog(
          '> VICTORY: VOID CORRUPTOR RETRACTED INTO MINI-CHASSIS! BLUE CITY DOMINANCE CONFIRMED.'
        );
        setIsAttacking(false);
      } else {
        // Enemy retaliates with minor damage
        const counterDmg = 12;
        const newPlayerHp = Math.max(0, playerHp - counterDmg);
        setPlayerHp(newPlayerHp);
        setBattleLog(
          '> ENEMY RETALIATION: VOID PULSE GRAVITY INFLICTS 1150 DAMAGE TO EVAN HULL!'
        );
        setIsAttacking(false);
      }
    }, 450);
  };

  const handleBlizzardSlash = () => {
    if (enemyHp <= 0 || playerHp <= 0 || isAttacking) return;
    setIsAttacking(true);
    soundFx.playOverdrive();
    setClashEffect('overdrive');

    const damage = 60;
    const newEnemyHp = Math.max(0, enemyHp - damage);
    setEnemyHp(newEnemyHp);

    setBattleLog('> CRITICAL OVERDRIVE: BLIZZARD SLASH DEPLOYED! 5880 DAMAGE!');

    setTimeout(() => {
      setClashEffect(null);
      if (newEnemyHp <= 0) {
        setBattleLog(
          '> TOTAL DOMINANCE: ENEMY SHIELD CORE SHATTERED! DIMENSIONAL OVERLOAD DEFEATED.'
        );
        setIsAttacking(false);
      } else {
        const counterDmg = 18;
        const newPlayerHp = Math.max(0, playerHp - counterDmg);
        setPlayerHp(newPlayerHp);
        setBattleLog(
          '> SHADOW DESPERATION: VOID CORRUPTOR DISCHARGES UNSTABLE ANTIMATTER BURST!'
        );
        setIsAttacking(false);
      }
    }, 600);
  };

  const handleReset = () => {
    soundFx.playReset();
    setEnemyHp(100);
    setPlayerHp(100);
    setBattleLog('> ARENA RESET: COMBAT ENGINES SYNCHRONIZED AT 100%');
    setClashEffect(null);
    setIsAttacking(false);
  };

  return (
    <section id="battle" className="w-full py-20 md:py-28 relative bg-[#06030c]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-mono text-xs md:text-sm text-[#38bdf8] tracking-[0.2em] uppercase font-semibold">
              06 / SIMULATION ARENA // COMBAT DECK
            </span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold uppercase text-[#f8fafc] mt-1">
              MECARD BATTLE CONSOLE
            </h2>
          </div>
          <p className="font-body text-sm md:text-base text-[#94a3b8] max-w-md">
            Execute live combat algorithms, deploy tactical card boosters, and unleash final overdrive attacks.
          </p>
        </div>

        {/* High Tech Arena Simulator Deck */}
        <div className="rounded-2xl bg-[#0d071a] border border-[#a855f7]/30 p-6 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Visual Energy Flash during attacks */}
          {clashEffect && (
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-300 z-20 ${
                clashEffect === 'overdrive'
                  ? 'bg-[#a855f7]/20 animate-pulse'
                  : 'bg-[#38bdf8]/20 animate-pulse'
              }`}
            />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Combatant: Evan (Ally Unit) */}
            <div className="lg:col-span-5 p-5 md:p-6 rounded-xl bg-[#1f1926]/90 border border-white/10 flex flex-col gap-4 shadow-lg">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#38bdf8] uppercase font-bold">
                  // ALLY UNIT
                </span>
                <span className="px-2.5 py-0.5 rounded bg-[#2dd4bf]/20 text-[#2dd4bf] font-bold">
                  {playerHp > 0 ? 'ACTIVE' : 'OFFLINE'} {playerHp}%
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-[#231d2a] border border-[#38bdf8]/40 overflow-hidden shrink-0 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                  <img
                    src={BATTLE_EVAN_HEADSHOT}
                    alt="Evan"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-headline text-lg md:text-xl text-[#f8fafc] font-bold">
                    EVAN (OVERDRIVE)
                  </h3>
                  <span className="font-mono text-xs text-[#7bd0ff]">
                    PILOT: JASON [BLUE CITY]
                  </span>
                </div>
              </div>

              {/* Health & DP */}
              <div className="space-y-1 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[#94a3b8]">HULL INTEGRITY</span>
                  <span
                    id="player-hp-text"
                    className="text-[#2dd4bf] font-bold"
                  >
                    {playerHp}% / 100%
                  </span>
                </div>
                <div className="w-full bg-[#06030c] rounded-full h-2.5 overflow-hidden p-0.5 border border-white/10">
                  <div
                    id="player-hp-bar"
                    className="bg-[#2dd4bf] h-full rounded-full transition-all duration-300"
                    style={{ width: `${playerHp}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-1 font-mono">
                <div className="bg-[#06030c] p-2 rounded border border-white/5">
                  <span className="text-[10px] text-[#94a3b8] block">PWR</span>
                  <span className="text-xs md:text-sm font-bold text-[#38bdf8]">
                    9800
                  </span>
                </div>
                <div className="bg-[#06030c] p-2 rounded border border-white/5">
                  <span className="text-[10px] text-[#94a3b8] block">SPD</span>
                  <span className="text-xs md:text-sm font-bold text-[#a855f7]">
                    9200
                  </span>
                </div>
                <div className="bg-[#06030c] p-2 rounded border border-white/5">
                  <span className="text-[10px] text-[#94a3b8] block">DEF</span>
                  <span className="text-xs md:text-sm font-bold text-[#2dd4bf]">
                    9500
                  </span>
                </div>
              </div>
            </div>

            {/* Center Clash VS Arena */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center text-center py-2">
              <span className="material-symbols-outlined text-[48px] text-[#a855f7] animate-pulse">
                flash_on
              </span>
              <span className="font-headline text-2xl md:text-3xl text-[#f8fafc] font-black tracking-widest my-1">
                VS
              </span>
              <span className="font-mono text-[10px] text-[#94a3b8] uppercase tracking-widest">
                REAL-TIME OVERDRIVE
              </span>
            </div>

            {/* Right Combatant: Void Corruptor (Enemy Unit) */}
            <div className="lg:col-span-5 p-5 md:p-6 rounded-xl bg-[#1f1926]/90 border border-white/10 flex flex-col gap-4 shadow-lg">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#ffb4ab] uppercase font-bold">
                  // OPPONENT UNIT
                </span>
                <span className="px-2.5 py-0.5 rounded bg-[#ffb4ab]/20 text-[#ffb4ab] font-bold">
                  {enemyHp > 0 ? 'ACTIVE' : 'DESTROYED'} {enemyHp}%
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-[#231d2a] border border-[#ffb4ab]/40 overflow-hidden shrink-0 shadow-[0_0_15px_rgba(255,180,171,0.3)]">
                  <img
                    src={BATTLE_ENEMY_HEADSHOT}
                    alt="Void Corruptor"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-headline text-lg md:text-xl text-[#f8fafc] font-bold">
                    VOID CORRUPTOR
                  </h3>
                  <span className="font-mono text-xs text-[#ddb7ff]">
                    FACTION: BLACK MIRROR
                  </span>
                </div>
              </div>

              {/* Health & DP */}
              <div className="space-y-1 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[#94a3b8]">HULL INTEGRITY</span>
                  <span
                    id="enemy-hp-text"
                    className="text-[#ffb4ab] font-bold"
                  >
                    {enemyHp}% / 100%
                  </span>
                </div>
                <div className="w-full bg-[#06030c] rounded-full h-2.5 overflow-hidden p-0.5 border border-white/10">
                  <div
                    id="enemy-hp-bar"
                    className="bg-[#ffb4ab] h-full rounded-full transition-all duration-300"
                    style={{ width: `${enemyHp}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-1 font-mono">
                <div className="bg-[#06030c] p-2 rounded border border-white/5">
                  <span className="text-[10px] text-[#94a3b8] block">PWR</span>
                  <span className="text-xs md:text-sm font-bold text-[#ffb4ab]">
                    9400
                  </span>
                </div>
                <div className="bg-[#06030c] p-2 rounded border border-white/5">
                  <span className="text-[10px] text-[#94a3b8] block">SPD</span>
                  <span className="text-xs md:text-sm font-bold text-[#f59e0b]">
                    9100
                  </span>
                </div>
                <div className="bg-[#06030c] p-2 rounded border border-white/5">
                  <span className="text-[10px] text-[#94a3b8] block">DEF</span>
                  <span className="text-xs md:text-sm font-bold text-[#ddb7ff]">
                    8900
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Telemetry Console Output */}
          <div className="mt-6 p-4 rounded-xl bg-[#06030c] border border-white/10 font-mono text-xs text-[#94a3b8] flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2dd4bf] animate-ping" />
              <span id="battle-log" className="text-[#f8fafc] font-semibold">
                {battleLog}
              </span>
            </div>
            <span className="text-[#38bdf8] shrink-0">GRID: ARENA-07 [STABLE]</span>
          </div>

          {/* Arena Action Controls */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              id="btn-strike"
              type="button"
              disabled={enemyHp <= 0 || playerHp <= 0 || isAttacking}
              onClick={handleStandardStrike}
              className="py-3.5 px-4 rounded-lg bg-[#38bdf8] text-[#06030c] font-headline text-sm uppercase font-bold tracking-wider hover:bg-[#7bd0ff] transition-all duration-200 shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">bolt</span>
              <span>STANDARD STRIKE</span>
            </button>

            <button
              id="btn-special"
              type="button"
              disabled={enemyHp <= 0 || playerHp <= 0 || isAttacking}
              onClick={handleBlizzardSlash}
              className="py-3.5 px-4 rounded-lg bg-gradient-to-r from-[#a855f7] to-[#b175ec] text-[#06030c] font-headline text-sm uppercase font-bold tracking-wider hover:opacity-95 transition-all duration-200 shadow-[0_0_25px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">
                auto_awesome
              </span>
              <span>BLIZZARD SLASH</span>
            </button>

            <button
              id="btn-reset"
              type="button"
              onClick={handleReset}
              className="py-3.5 px-4 rounded-lg bg-[#231d2a] text-[#f8fafc] font-headline text-sm uppercase tracking-wider hover:bg-[#3d3744] transition-all duration-200 border border-white/15 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">
                restart_alt
              </span>
              <span>RESET SIMULATOR</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
