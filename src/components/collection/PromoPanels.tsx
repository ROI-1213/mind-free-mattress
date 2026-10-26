import React from 'react';
import { ArrowRight, Layers, Sparkles, HelpCircle, CheckCircle2 } from 'lucide-react';

export const PromoPanels: React.FC = () => {
  return (
    <div className="w-full mt-14 sm:mt-18 select-none">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {/* PANEL 1: BY CORE MATERIAL (Forest Green Theme) */}
        <div className="group relative rounded-[28px] overflow-hidden bg-gradient-to-br from-[#0A2E73] to-[#0E231B] text-white p-7 sm:p-8 flex flex-col justify-between border border-[#1244A8]/40 shadow-[0_16px_40px_rgba(10,46,115,0.15)] transition-all duration-300 hover:-translate-y-1">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-[#E3262E]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-[#E3262E]" />
              <span className="text-[10.5px] uppercase font-bold tracking-[0.2em] text-[#E3262E]">
                BY CORE MATERIAL
              </span>
            </div>

            <h4 className="font-serif text-2xl lg:text-[26px] font-normal text-white leading-tight mb-2">
              Engineered for <br />
              <span className="text-[#E3262E] italic font-serif">Better Sleep</span>
            </h4>

            <p className="text-xs text-[#D1DDD3] leading-relaxed mb-5 max-w-[280px]">
              Explore the master materials behind your comfort — from certified organic latex to tempered steel coils.
            </p>

            {/* Feature tags */}
            <div className="space-y-1.5 mb-6">
              {['Aerated Pin-Core Latex', 'High-Resilience EP Foam', 'Pocketed Spring Coils'].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[11px] text-[#DBEAFE]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E3262E] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA & Floating Visual */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
            <a
              href="#mattress-materials"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E3262E] hover:bg-[#A88242] active:scale-95 text-white text-xs font-medium tracking-wide shadow-md transition-all group-hover:shadow-lg"
            >
              <span>Explore Materials</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="w-28 h-20 sm:w-32 sm:h-22 rounded-2xl overflow-hidden border border-white/20 bg-black/20 shadow-lg shrink-0">
              <img
                src="/images/mindfree/mindfree-exploded-layers.webp"
                alt="Exploded mattress materials preview"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* PANEL 2: BY TOP DESIGN (Warm Ivory Theme) */}
        <div className="group relative rounded-[28px] overflow-hidden bg-[#F8FAFC] text-[#0A2540] p-7 sm:p-8 flex flex-col justify-between border border-[#E7E1D6] shadow-[0_16px_40px_rgba(10,46,115,0.06)] transition-all duration-300 hover:-translate-y-1">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#0A2E73]" />
              <span className="text-[10.5px] uppercase font-bold tracking-[0.2em] text-[#0A2E73]">
                BY TOP DESIGN
              </span>
            </div>

            <h4 className="font-serif text-2xl lg:text-[26px] font-normal text-[#0A2540] leading-tight mb-2">
              Choose Your <br />
              <span className="text-[#E3262E] italic font-serif">Comfort Style</span>
            </h4>

            <p className="text-xs text-[#64748B] leading-relaxed mb-5 max-w-[280px]">
              Three distinctive quilted silhouettes engineered for your exact contouring preference.
            </p>

            {/* 3 Top Designs Mini Selector */}
            <div className="space-y-1.5 mb-6">
              {[
                { name: 'Normal Bed', desc: 'Classic Everyday Comfort' },
                { name: 'Pillow Top', desc: 'Extra Cushioning Layer' },
                { name: 'Euro Top', desc: 'Premium Plush Comfort' },
              ].map((des, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#E2E8F0]">
                  <span className="text-[11.5px] font-semibold text-[#0A2540]">{des.name}</span>
                  <span className="text-[10px] text-[#64748B]">{des.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="relative z-10 pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
            <a
              href="#bed-varieties"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A2E73] hover:bg-[#071F52] active:scale-95 text-white text-xs font-medium tracking-wide shadow-md transition-all group-hover:shadow-lg"
            >
              <span>Explore Designs</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="w-28 h-20 sm:w-32 sm:h-22 rounded-2xl overflow-hidden border border-[#E0DCD3] bg-white shadow-lg shrink-0">
              <img
                src="/images/mindfree/mindfree-top-designs.webp"
                alt="Top design comparison preview"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* PANEL 3: MATTRESS FINDER (Muted Sage Theme) */}
        <div className="group relative rounded-[28px] overflow-hidden bg-gradient-to-br from-[#DBEAFE] to-[#DCE5DA] text-[#0A2540] p-7 sm:p-8 flex flex-col justify-between border border-[#D5DFD3] shadow-[0_16px_40px_rgba(10,46,115,0.06)] transition-all duration-300 hover:-translate-y-1">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="w-4 h-4 text-[#0A2E73]" />
              <span className="text-[10.5px] uppercase font-bold tracking-[0.2em] text-[#0A2E73]">
                SLEEP QUIZ
              </span>
            </div>

            <h4 className="font-serif text-2xl lg:text-[26px] font-normal text-[#0A2540] leading-tight mb-2">
              Find Your <br />
              <span className="text-[#E3262E] italic font-serif">Perfect Match</span>
            </h4>

            <p className="text-xs text-[#525E57] leading-relaxed mb-5 max-w-[280px]">
              Answer a few questions about your sleep posture and uncover your tailored mattress recommendation in 60 seconds.
            </p>

            {/* Diagnostic highlights */}
            <div className="space-y-1.5 mb-6">
              {['Posture & Spine Analysis', 'Personalized Firmness Grade', '100-Night Trial Guarantee'].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[11px] text-[#2D3F35]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0A2E73] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="relative z-10 pt-4 border-t border-[#CFDCD0] flex items-center justify-between">
            <a
              href="/mattress-finder"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A2E73] hover:bg-[#071F52] active:scale-95 text-white text-xs font-medium tracking-wide shadow-md transition-all group-hover:shadow-lg"
            >
              <span>Take the Quiz</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="w-28 h-20 sm:w-32 sm:h-22 rounded-2xl overflow-hidden border border-[#BDCDBD] bg-white shadow-lg shrink-0">
              <img
                src="/images/mindfree/mindfree-quiz-finder.webp"
                alt="Mattress quiz sanctuary"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
