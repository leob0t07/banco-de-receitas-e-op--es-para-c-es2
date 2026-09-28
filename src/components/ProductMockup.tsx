import React from "react";
import { Utensils, Sparkles, BookOpen, ChevronRight, Apple, Heart } from "lucide-react";

export const ProductMockup: React.FC = () => {
  return (
    <div className="w-full my-8">
      {/* Container de Apresentação */}
      <div className="bg-white rounded-3xl border border-[#292724]/10 shadow-sm p-4 sm:p-8 max-w-4xl mx-auto overflow-hidden">
        {/* Cabeçalho do Mockup */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#292724]/8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#3F6448]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Acesso Imediato no Celular, Tablet e Computador</span>
            </div>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-[#292724] mt-0.5">
              Biblioteca Digital Organizada
            </h3>
          </div>
          <div className="text-xs text-[#292724]/60 bg-[#FAF8F4] px-3 py-1.5 rounded-lg border border-[#292724]/6 self-start sm:self-auto">
            Mais de 60 receitas e petiscos categorizados
          </div>
        </div>

        {/* Categorias Principais do Acervo */}
        <div className="mt-6">
          <span className="text-[11px] font-bold text-[#292724]/50 uppercase tracking-wider block mb-3 text-left">
            Categorias Principais
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-[#E7EEE7] border border-[#3F6448]/20 flex items-center justify-between text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#3F6448] text-white flex items-center justify-center shrink-0">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#292724]">
                    Petiscos & Biscoitos Assados
                  </h4>
                  <p className="text-[11px] text-[#292724]/70">
                    18 opções crocantes e seguras
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#3F6448]" />
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F4] border border-[#292724]/8 flex items-center justify-between text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#C98258] text-white flex items-center justify-center shrink-0">
                  <Apple className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#292724]">
                    Opções Práticas para Variar
                  </h4>
                  <p className="text-[11px] text-[#292724]/70">
                    Vegetais e caldos enriquecedores
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#292724]/40" />
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F4] border border-[#292724]/8 flex items-center justify-between text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#294333] text-white flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#292724]">
                    Receitas Caseiras Cozidas
                  </h4>
                  <p className="text-[11px] text-[#292724]/70">
                    Pratos com medidas e cozimento
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#292724]/40" />
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F4] border border-[#292724]/8 flex items-center justify-between text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#3F6448]/80 text-white flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#292724]">
                    Picolés & Agrados Refrescantes
                  </h4>
                  <p className="text-[11px] text-[#292724]/70">
                    Ideais para dias de calor e passeios
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#292724]/40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
