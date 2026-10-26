import React from 'react';
import { ArrowRight, MessageSquare, PhoneCall } from 'lucide-react';

export const CustomerSupportCTA: React.FC = () => {
  return (
    <div className="mt-8 sm:mt-10 p-4.5 sm:p-6 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#E2E8F0] shadow-[0_4px_20px_rgba(10,46,115,0.03)] relative overflow-hidden group max-w-full">
      {/* Subtle gold accent corner line */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#E3262E]/15 via-transparent to-transparent pointer-events-none" />

      <div className="flex items-start gap-3.5 sm:gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E3DDD1] flex items-center justify-center text-[#0A2E73] shrink-0 group-hover:border-[#E3262E] transition-colors">
          <MessageSquare className="w-5 h-5 stroke-[1.8]" />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-serif text-[17px] font-semibold text-[#0A2E73] tracking-tight">
            Still have questions?
          </h4>
          <p className="text-[13px] text-[#5A6861] mt-1 leading-relaxed">
            Talk to our team for help choosing your mattress.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-[#0A2E73] hover:bg-[#071F52] text-[#F8FAFC] text-[12.5px] font-medium tracking-wide transition-all shadow-xs hover:shadow-md cursor-pointer"
            >
              <span>Contact Mindfree</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
            </a>

            <a
              href="tel:+918000123456"
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#6E7B74] hover:text-[#0A2E73] transition-colors py-2 px-3 rounded-lg hover:bg-[#F8FAFC]"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Concierge</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
