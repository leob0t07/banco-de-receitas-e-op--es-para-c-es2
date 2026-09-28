import React from "react";
import { ShieldCheck } from "lucide-react";
import { GUARANTEE_CONFIG } from "../config/funnel.config";

export const GuaranteeSection: React.FC = () => {
  if (!GUARANTEE_CONFIG.enabled) return null;

  return (
    <section className="w-full py-8 sm:py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="bg-white border-2 border-[#3F6448]/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-[#E7EEE7] text-[#3F6448] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3F6448] uppercase tracking-wider">
              <span>{GUARANTEE_CONFIG.days} Dias de Teste</span>
            </div>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-[#292724]">
              {GUARANTEE_CONFIG.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#292724]/75 leading-relaxed">
              {GUARANTEE_CONFIG.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
