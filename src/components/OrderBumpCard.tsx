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
      className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
        isSelected
          ? "bg-[#E7EEE7]/40 border-[#3F6448] shadow-xs"
          : "bg-white border-[#292724]/12 hover:border-[#292724]/25"
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox customizado */}
        <div
          className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
            isSelected
              ? "bg-[#3F6448] text-white"
              : "border-2 border-[#292724]/30 bg-white"
          }`}
        >
          {isSelected ? <Check className="w-3.5 h-3.5" /> : null}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C98258] bg-[#FAF8F4] px-1.5 py-0.5 rounded border border-[#C98258]/30">
              {bump.tag}
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#3F6448] font-mono">
              + {bump.price}
            </span>
          </div>

          <h4 className="text-xs sm:text-sm font-semibold text-[#292724] leading-snug">
            {bump.name}
          </h4>

          <p className="text-[11px] sm:text-xs text-[#292724]/70 mt-1 leading-normal">
            {bump.description}
          </p>

          <div className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-[#3F6448]">
            {isSelected ? (
              <span>Adicionado ao pedido</span>
            ) : (
              <span className="inline-flex items-center gap-1 hover:underline">
                <Plus className="w-3 h-3" /> Adicionar ao meu pedido
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
