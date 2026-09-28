import React from "react";
import { ArrowRight, Check, X } from "lucide-react";

export const AntesDepois: React.FC = () => {
  const antesSteps = [
    "Pesquisar no Google a cada refeição",
    "Navegar em dezenas de sites cheios de anúncios",
    "Receitas soltas sem saber se são realmente seguras",
    "Salvar prints e links que depois se perdem",
    "Começar a pesquisa toda do zero na próxima vez"
  ];

  const depoisSteps = [
    "Acessar o 4 Patas direto no seu celular",
    "Escolher uma categoria organizada por ocasião",
    "Encontrar opções testadas com ingredientes simples",
    "Consultar medidas claras e modo de preparo rápido",
    "Economizar tempo e variar a rotina sem estresse"
  ];

  return (
    <section className="w-full py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-semibold text-[#3F6448] tracking-wider uppercase">
            A Diferença na Prática
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#292724] mt-2">
            Em vez de procurar uma receita nova toda vez...
          </h2>
          <p className="text-sm sm:text-base text-[#292724]/75 mt-3">
            Veja como a sua rotina muda quando você tem um acervo centralizado e confiável à mão.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Card Antes */}
          <div className="bg-[#FAF8F4] border border-[#292724]/10 rounded-2xl p-6 sm:p-7 relative shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#292724]/8 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#292724]/60">
                Como a maioria faz hoje
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md">
                <X className="w-3.5 h-3.5" />
                Desorganizado
              </span>
            </div>

            <ol className="space-y-4">
              {antesSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="text-xs sm:text-sm text-[#292724]/80 leading-snug">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Card Depois */}
          <div className="bg-[#E7EEE7]/40 border-2 border-[#3F6448]/30 rounded-2xl p-6 sm:p-7 relative shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#3F6448]/15 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3F6448]">
                Com o 4 Patas
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#3F6448] bg-white px-2.5 py-1 rounded-md shadow-xs">
                <Check className="w-3.5 h-3.5" />
                Prático e direto
              </span>
            </div>

            <ol className="space-y-4">
              {depoisSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#3F6448] text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="text-xs sm:text-sm text-[#292724] font-medium leading-snug">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};
