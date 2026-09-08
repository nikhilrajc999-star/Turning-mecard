import React, { useState } from 'react';
import { REALM_NODES } from '../data/mecardData';
import { RealmNode } from '../types';
import { HoloCard } from './HoloCard';
import { soundFx } from '../utils/audio';

export const WorldAtlas: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<RealmNode>(REALM_NODES[0]);

  const handleSelectNode = (node: RealmNode) => {
    soundFx.playBeep(1100, 0.06);
    setSelectedNode(node);
  };

  return (
    <section id="world" className="w-full py-20 md:py-28 relative bg-[#140c26]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-mono text-xs md:text-sm text-[#38bdf8] tracking-[0.2em] uppercase font-semibold">
              01 / WORLD ATLAS // DIMENSIONAL SYSTEM
            </span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold uppercase text-[#f8fafc] mt-1">
              WELCOME TO THE MECARD WORLD
            </h2>
          </div>
          <p className="font-body text-sm md:text-base text-[#94a3b8] max-w-md">
            A tri-dimensional nexus where sentient vehicle warriors harness cosmic Card Matrix nodes across parallel realities.
          </p>
        </div>

        {/* Holographic Atlas Map Simulation Container */}
        <div className="relative w-full rounded-2xl bg-[#0d071a] border border-[#a855f7]/25 p-5 md:p-8 overflow-hidden shadow-2xl">
          {/* Ambient Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />

          {/* Interactive Node Grid (5 Nodes) */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {REALM_NODES.map((node) => {
              const isSelected = selectedNode.id === node.id;
              return (
                <HoloCard
                  key={node.id}
                  onClick={() => handleSelectNode(node)}
                  className={`p-5 rounded-xl transition-all group cursor-pointer shadow-lg border ${
                    isSelected
                      ? 'bg-[#231d2a] border-[#38bdf8] shadow-[0_0_30px_rgba(56,189,248,0.35)] ring-1 ring-[#38bdf8]'
                      : 'bg-[#1f1926]/90 hover:bg-[#231d2a] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${
                      node.id === 'earth'
                        ? 'bg-[#38bdf8]/20 text-[#38bdf8]'
                        : node.id === 'triforce'
                        ? 'bg-[#a855f7]/20 text-[#a855f7]'
                        : node.id === 'blue-city'
                        ? 'bg-[#60a5fa]/20 text-[#60a5fa]'
                        : node.id === 'red-hall'
                        ? 'bg-[#f59e0b]/20 text-[#f59e0b]'
                        : 'bg-[#ddb7ff]/20 text-[#ddb7ff]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      {node.icon}
                    </span>
                  </div>

                  <span className={`font-mono text-[11px] uppercase font-semibold ${node.accentColor}`}>
                    {node.alias}
                  </span>

                  <h3 className="font-headline text-lg md:text-xl text-[#f8fafc] font-bold my-1">
                    {node.name}
                  </h3>

                  <p className="font-body text-xs text-[#94a3b8] line-clamp-3 leading-relaxed">
                    {node.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#94a3b8]">
                    <span className="truncate">{node.status}</span>
                    <span className={`font-bold shrink-0 ${node.accentColor}`}>
                      {node.nodeCode}
                    </span>
                  </div>
                </HoloCard>
              );
            })}
          </div>

          {/* Active Node Detailed Telemetry Display */}
          {selectedNode && (
            <div className="mt-6 p-5 rounded-xl bg-[#140c26]/90 border border-[#a855f7]/30 backdrop-blur-md relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              <div className="lg:col-span-8 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2dd4bf] animate-ping" />
                  <span className="font-mono text-xs text-[#38bdf8] uppercase tracking-widest font-bold">
                    DIMENSIONAL TELEMETRY // {selectedNode.nodeCode}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/10 font-mono text-[10px] text-[#eadff0]">
                    FREQ: {selectedNode.frequency}
                  </span>
                </div>
                <h4 className="font-headline text-xl text-[#f8fafc] font-bold">
                  {selectedNode.name} — {selectedNode.alias}
                </h4>
                <p className="font-body text-sm text-[#cfc2d6] leading-relaxed">
                  {selectedNode.lore}
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-2 font-mono text-xs bg-[#06030c]/70 p-4 rounded-lg border border-white/10">
                <div className="flex justify-between text-[#94a3b8]">
                  <span>RESONANCE FLUX:</span>
                  <span className="text-[#2dd4bf] font-bold">0.998 T/s</span>
                </div>
                <div className="flex justify-between text-[#94a3b8]">
                  <span>SPATIAL STABILITY:</span>
                  <span className="text-[#38bdf8] font-bold">OPTIMAL</span>
                </div>
                <div className="flex justify-between text-[#94a3b8]">
                  <span>DEFENSE GRID:</span>
                  <span className="text-[#ddb7ff] font-bold">ACTIVE (LEVEL 9)</span>
                </div>
                <div className="w-full bg-[#140c26] rounded-full h-1.5 mt-1">
                  <div className="bg-gradient-to-r from-[#38bdf8] to-[#a855f7] h-1.5 rounded-full" style={{ width: '94%' }} />
                </div>
              </div>
            </div>
          )}

          {/* Global Dimensional Pulse Infobar */}
          <div className="mt-5 pt-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono text-[#94a3b8]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2dd4bf] animate-ping" />
              <span>DATA-STREAM: SYNCHRONIZING REALMS THROUGH FORNOX TAC-MATRIX</span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span>CHANNELS: 108/108</span>
              <span>TRANSLATION: LATENCY 0.04ms</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
