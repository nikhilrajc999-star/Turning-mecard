import React from 'react';

export const CreativeProcess: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'CONCEPT',
      desc: 'Deconstructing mecha dynamics, dimensional physics, and lore architecture.',
      phase: 'PHASE 1',
      color: 'text-[#a855f7]'
    },
    {
      num: '02',
      title: 'CHARACTER',
      desc: 'High-fidelity anime portraits, cyber suits, and pilot emotional anchors.',
      phase: 'PHASE 2',
      color: 'text-[#38bdf8]'
    },
    {
      num: '03',
      title: 'WORLD',
      desc: 'Interactive map topography, dimensional nodes, and faction aesthetics.',
      phase: 'PHASE 3',
      color: 'text-[#2dd4bf]'
    },
    {
      num: '04',
      title: 'UI DESIGN',
      desc: 'Cybernetic HUD glassmorphism, 3D holographic tilt, and precision tokens.',
      phase: 'PHASE 4',
      color: 'text-[#f59e0b]'
    },
    {
      num: '05',
      title: 'ANIMATION',
      desc: 'Kinetic transformation states, WebGL cosmic shader, and synthesized audio.',
      phase: 'PHASE 5',
      color: 'text-[#ddb7ff]'
    },
    {
      num: '06',
      title: 'EXPERIENCE',
      desc: 'Live digital web simulator deployed globally across all devices.',
      phase: 'FINAL STAGE',
      color: 'text-[#f8fafc]'
    }
  ];

  return (
    <section id="fornox-process" className="w-full py-20 md:py-28 relative bg-[#06030c]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs md:text-sm text-[#2dd4bf] tracking-[0.25em] uppercase font-semibold">
            10 / FORNOX ENGINEERING PIPELINE
          </span>
          <h2 className="font-headline text-3xl md:text-5xl font-bold uppercase text-[#f8fafc] mt-1">
            THE CREATIVE PROCESS
          </h2>
          <p className="font-body text-sm md:text-base text-[#94a3b8] mt-2 leading-relaxed">
            From imagination to digital experience. How FORNOX synthesizes anime lore into next-generation interactive systems.
          </p>
        </div>

        {/* Studio Timeline Steps (6 Grid Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {steps.map((st) => (
            <div
              key={st.num}
              className="p-5 rounded-xl bg-[#140c26] border border-white/10 flex flex-col justify-between shadow-lg hover:border-[#a855f7]/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <span className={`font-headline text-3xl md:text-4xl font-extrabold ${st.color}`}>
                  {st.num}
                </span>
                <h3 className="font-headline text-base font-bold text-[#f8fafc] mt-2">
                  {st.title}
                </h3>
                <p className="font-body text-xs text-[#94a3b8] mt-1.5 leading-relaxed">
                  {st.desc}
                </p>
              </div>
              <span className="font-mono text-[10px] text-[#94a3b8] mt-6 tracking-widest uppercase">
                {st.phase}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
