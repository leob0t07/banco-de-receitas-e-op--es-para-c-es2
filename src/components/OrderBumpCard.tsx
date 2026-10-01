import React from "react";
import { Check, Plus } from "lucide-react";
import { BumpItem } from "../config/funnel.config";

interface OrderBumpCardProps {
  bump: BumpItem;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export const OrderBumpCard: React.FC<OrderBumpCardProps> = ({ bump, isSelected, onToggle }) => {
  return (
    <div
      onClick={() => onToggle(bump.id)}
      className={`p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
        isSelected
          ? "bg-[#F0F7F2] border-[#1B4332] shadow-[0_4px_16px_rgba(27,67,50,0.08)]"
          : "bg-white border-[#E2E8F0] hover:border-[#1B4332]/40"
      }`}
    >
      <div className="flex items-start gap-3.5">
        {/* Checkbox customizado */}
        <div
          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
            isSelected
              ? "bg-[#1B4332] text-white"
              : "border-2 border-[#E2E8F0] bg-white"
          }`}
        >
          {isSelected ? <Check className="w-3.5 h-3.5" /> : null}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6B35] bg-[#FF6B35]/10 px-2 py-0.5 rounded-full border border-[#FF6B35]/25">
              {bump.tag}
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#1B4332] font-poppins">
              + {bump.price}
            </span>
          </div>

          <h4 className="text-xs sm:text-sm font-bold text-[#1E293B] leading-snug">
            {bump.name}
          </h4>

          <p className="text-[11px] sm:text-xs text-[#666666] mt-1 leading-normal">
            {bump.description}
          </p>

          <div className="mt-2.5 flex items-center gap-1 text-[11px] font-bold text-[#1B4332]">
            {isSelected ? (
              <span>✓ Adicionado ao plano</span>
            ) : (
              <span className="inline-flex items-center gap-1 hover:underline text-[#FF6B35]">
                <Plus className="w-3 h-3" /> Adicionar ao meu plano
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
