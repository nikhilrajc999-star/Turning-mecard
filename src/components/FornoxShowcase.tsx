import React from 'react';

export const FornoxShowcase: React.FC = () => {
  return (
    <section id="fornox" className="w-full py-20 md:py-28 relative bg-[#140c26]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="rounded-3xl bg-[#0d071a] border border-[#a855f7]/30 p-6 sm:p-10 md:p-14 relative overflow-hidden shadow-2xl">
          {/* Ambient Backlight */}
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#a855f7]/20 blur-[100px] pointer-events-none" />
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#38bdf8]/20 blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Description & CTAs */}
            <div className="lg:col-span-8 space-y-5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded bg-[#7bd0ff]/20 text-[#7bd0ff] font-mono text-xs uppercase font-bold tracking-widest border border-[#7bd0ff]/30">
                  DIGITAL ARCHITECTS
                </span>
                <span className="font-mono text-xs text-[#94a3b8]">
                  // fornox.in
                </span>
              </div>

              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase text-[#f8fafc] tracking-tight">
                CREATED BY <span className="text-[#38bdf8]">FORNOX</span>
              </h2>

              <p className="font-body text-base md:text-lg text-[#f8fafc] font-medium max-w-2xl leading-relaxed">
                FORNOX is a digital creative brand focused on futuristic web experiences, interactive interfaces, anime-inspired visuals and next-generation digital experiences.
              </p>

              <p className="font-body text-xs md:text-sm text-[#94a3b8] max-w-2xl leading-relaxed">
                Through rigorous typography systems, cybernetic glassmorphism, and cinematic storytelling, FORNOX redefines how anime worlds are explored on the open web.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  id="fornox-visit-btn"
                  href="https://fornox.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-lg bg-[#38bdf8] text-[#06030c] font-headline text-sm uppercase font-bold tracking-wider hover:bg-[#7bd0ff] transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.5)] flex items-center gap-2"
                >
                  <span>VISIT FORNOX</span>
                  <span className="material-symbols-outlined text-[18px]">
                    open_in_new
                  </span>
                </a>

                <a
                  id="fornox-portfolio-btn"
                  href="https://fornox.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-lg bg-[#231d2a] text-[#f8fafc] font-headline text-sm uppercase tracking-wider hover:bg-[#3d3744] hover:text-[#7bd0ff] transition-all border border-white/10"
                >
                  EXPLORE STUDIO PORTFOLIO
                </a>
              </div>
            </div>

            {/* Right Information Cards */}
            <div className="lg:col-span-4 flex flex-col gap-3 font-mono">
              <div className="p-4 rounded-xl bg-[#06030c]/80 backdrop-blur-md border border-white/10">
                <span className="text-[10px] text-[#94a3b8] block uppercase tracking-wider">
                  STUDIO LOCATION
                </span>
                <span className="font-headline text-base md:text-lg text-[#f8fafc] font-bold">
                  DIGITAL / GLOBAL
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#06030c]/80 backdrop-blur-md border border-white/10">
                <span className="text-[10px] text-[#94a3b8] block uppercase tracking-wider">
                  SPECIALIZATION
                </span>
                <span className="font-headline text-base md:text-lg text-[#a855f7] font-bold">
                  NEXT-GEN INTERACTIVE
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#06030c]/80 backdrop-blur-md border border-white/10">
                <span className="text-[10px] text-[#94a3b8] block uppercase tracking-wider">
                  OFFICIAL PORTAL
                </span>
                <a
                  href="https://fornox.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-headline text-base md:text-lg text-[#2dd4bf] font-bold hover:underline flex items-center gap-1.5"
                >
                  <span>fornox.in</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
