import React from "react";
import { Check, ArrowRight, ShieldCheck, Sparkles, X } from "lucide-react";
import { useQuiz } from "../context/QuizContext";

interface UpsellViewProps {
  onAcceptUpsell: () => void;
  onDeclineUpsell: () => void;
}

export const UpsellView: React.FC<UpsellViewProps> = ({ onAcceptUpsell, onDeclineUpsell }) => {
  const { dogSummary } = useQuiz();
  const name = dogSummary.name;

  return (
    <div className="w-full py-8 sm:py-12 min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        {/* Aviso de Não Fechar a Página */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Aguarde: Seu pedido principal já foi confirmado!</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#292724] tracking-tight leading-snug">
          Quer adicionar a Masterclass em Vídeo sobre Enriquecimento Alimentar para {dogSummary.article} {name}?
        </h1>

        <p className="text-sm sm:text-base text-[#292724]/75 mt-3 max-w-lg mx-auto leading-relaxed">
          Esta é uma oportunidade exclusiva de única vez para levar o treinamento prático em vídeo ensinando técnicas para desacelerar a mastigação e entreter o cão na hora das refeições.
        </p>

        {/* Card da Oferta Upsell */}
        <div className="my-8 bg-white border-2 border-[#3F6448]/30 rounded-2xl p-6 sm:p-8 text-left shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#292724]/8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#3F6448]">
                Treinamento Complementar em Vídeo
              </span>
              <h3 className="text-lg font-serif font-bold text-[#292724]">
                Masterclass Prática: Enriquecimento Alimentar & Potes Interativos
              </h3>
            </div>
            <div className="text-right sm:text-right">
              <span className="text-xs text-[#292724]/50 line-through">R$ 97,00</span>
              <div className="text-2xl font-serif font-bold text-[#3F6448]">R$ 29,90</div>
            </div>
          </div>

          <ul className="py-4 space-y-2.5 text-xs sm:text-sm text-[#292724]/85">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#3F6448] shrink-0 mt-0.5" />
              <span>Como transformar refeições normais em desafios mentais relaxantes</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#3F6448] shrink-0 mt-0.5" />
              <span>Técnicas para cães que comem rápido demais (anti-engasgo)</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#3F6448] shrink-0 mt-0.5" />
              <span>Brinquedos recheáveis com caldos e pastas naturais caseiras</span>
            </li>
          </ul>

          <div className="pt-4 border-t border-[#292724]/8 space-y-3">
            <button
              type="button"
              onClick={onAcceptUpsell}
              className="w-full py-4 px-6 rounded-xl bg-[#3F6448] hover:bg-[#294333] active:scale-[0.99] text-white font-bold text-base sm:text-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#3F6448]/40"
            >
              <span>Sim, adicionar ao meu pedido por apenas R$ 29,90</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={onDeclineUpsell}
              className="w-full py-2.5 text-xs text-[#292724]/50 hover:text-[#292724] transition-colors cursor-pointer block text-center"
            >
              Não, obrigado. Quero apenas o 4 Patas principal.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
