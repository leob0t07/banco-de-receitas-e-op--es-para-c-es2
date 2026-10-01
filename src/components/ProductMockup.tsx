import React from "react";
import {
  Smartphone,
  FileText,
  Scale,
  ShoppingCart,
  Sparkles,
  CheckCircle2,
  Printer,
  Clock
} from "lucide-react";

export const ProductMockup: React.FC = () => {
  return (
    <div className="w-full my-6">
      {/* Container de Apresentação dos Entregáveis Palpáveis */}
      <div className="bg-white rounded-3xl border border-[#1B4332]/10 shadow-[0_4px_24px_rgba(27,67,50,0.06)] p-5 sm:p-8 max-w-4xl mx-auto overflow-hidden">
        {/* Cabeçalho do Kit */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#1B4332] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#1B4332]" />
              <span>Kit Visual de Cozinha • Pronto para Usar</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-serif font-bold text-[#1E293B] mt-1">
              O Que Você Recebe na Prática
            </h3>
          </div>
          <div className="text-xs text-[#1B4332] font-semibold bg-[#F0F7F2] px-3.5 py-1.5 rounded-full border border-[#1B4332]/15 self-start sm:self-auto flex items-center gap-1.5">
            <Printer className="w-3.5 h-3.5" />
            <span>Digital + Pronto para Imprimir</span>
          </div>
        </div>

        {/* Grade Visual dos 4 Entregáveis Tangíveis */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {/* Entregável 1: App & Biblioteca no Celular */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F0F7F2] border-2 border-[#1B4332]/20 flex items-start gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#1B4332] text-white flex items-center justify-center shrink-0 shadow-md">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B4332] bg-white px-2 py-0.5 rounded-md border border-[#1B4332]/15">
                  Entregável #1
                </span>
                <span className="text-[11px] text-[#666666] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#1B4332]" /> No seu bolso
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-[#1E293B] mt-1">
                Biblioteca Digital de Acesso Rápido
              </h4>
              <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                Abra no celular direto na cozinha e escolha por objetivo (abrir apetite, acalmar pele ou firmar intestino).
              </p>
            </div>
          </div>

          {/* Entregável 2: Fichas de Cozinha de 1 Página */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border-2 border-[#1B4332]/10 flex items-start gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#FF6B35] text-white flex items-center justify-center shrink-0 shadow-md">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6B35] bg-white px-2 py-0.5 rounded-md border border-[#FF6B35]/20">
                  Entregável #2
                </span>
                <span className="text-[11px] text-[#666666]">
                  3 a 5 min
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-[#1E293B] mt-1">
                Fichas de Cozinha em 1 Página
              </h4>
              <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                Cartões objetivos com modo de preparo em 3 passos, sem textos longos ou receitas que sujam a cozinha toda.
              </p>
            </div>
          </div>

          {/* Entregável 3: Tabela de Porções para o Porte */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border-2 border-[#1B4332]/10 flex items-start gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#1B4332] text-white flex items-center justify-center shrink-0 shadow-md">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B4332] bg-white px-2 py-0.5 rounded-md border border-[#1B4332]/15">
                  Entregável #3
                </span>
                <span className="text-[11px] text-[#666666]">
                  Sem balança
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-[#1E293B] mt-1">
                Tabela de Medidas Caseiras por Porte
              </h4>
              <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                Proporções exatas descritas em colheres de sopa e xícaras para servir com precisão e segurança.
              </p>
            </div>
          </div>

          {/* Entregável 4: Lista de Supermercado Rápida */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border-2 border-[#1B4332]/10 flex items-start gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#1B4332] text-white flex items-center justify-center shrink-0 shadow-md">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B4332] bg-white px-2 py-0.5 rounded-md border border-[#1B4332]/15">
                  Entregável #4
                </span>
                <span className="text-[11px] text-[#666666]">
                  Econômica
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-[#1E293B] mt-1">
                Lista de Supermercado de 1 Página
              </h4>
              <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                Ingredientes baratos e fáceis de encontrar em qualquer hortifrúti ou mercado de bairro.
              </p>
            </div>
          </div>
        </div>

        {/* Rodapé Informativo */}
        <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 text-xs text-[#666666]">
          <span className="flex items-center gap-1.5 font-medium text-[#1E293B]">
            <CheckCircle2 className="w-4 h-4 text-[#1B4332]" />
            Materiais diagramados para leitura limpa no celular ou impressão
          </span>
          <span className="font-bold text-[#1B4332]">Preparos rápidos sem balança</span>
        </div>
      </div>
    </div>
  );
};
