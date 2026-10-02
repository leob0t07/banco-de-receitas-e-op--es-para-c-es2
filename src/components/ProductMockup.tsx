import React from "react";
import {
  Smartphone,
  FileText,
  Printer,
  Sparkles,
  CheckCircle2,
  Clock,
  Gift,
  ShieldCheck,
  Zap
} from "lucide-react";

export const ProductMockup: React.FC = () => {
  return (
    <div className="w-full my-4">
      {/* Container Visual do Mockup (Representação Gráfica do Bundle Celular + Fichas) */}
      <div className="bg-linear-to-b from-[#F0F7F2] via-white to-[#FAF8F5] rounded-3xl border border-[#1B4332]/15 p-5 sm:p-8 shadow-[0_8px_30px_rgba(27,67,50,0.06)] max-w-3xl mx-auto relative overflow-hidden">
        {/* Badges de Topo do Mockup */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-5 border-b border-[#1B4332]/10 mb-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B4332] text-white text-[11px] font-bold uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              Kit Completo Sob Medida
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1B4332]">
            <Printer className="w-3.5 h-3.5" />
            <span>Formato Digital + PDF Imprimível</span>
          </div>
        </div>

        {/* Vitrine Visual do Produto: Celular + Ficha Impressa + Bônus */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
          {/* Mockup do Celular (7 cols em desktop) */}
          <div className="sm:col-span-7 bg-[#1E293B] rounded-[2.5rem] p-3 shadow-xl border-4 border-slate-700/60 max-w-[290px] mx-auto w-full">
            <div className="bg-[#FAF8F5] rounded-[2rem] overflow-hidden border border-slate-200">
              {/* Notificação/Barra superior do celular */}
              <div className="bg-[#1B4332] text-white px-4 py-3 flex items-center justify-between text-xs">
                <span className="font-bold flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5" /> 4 Patas App
                </span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-medium">
                  Acesso Vitalício
                </span>
              </div>

              {/* Conteúdo na tela do celular simulado */}
              <div className="p-3.5 space-y-2.5 text-left">
                <div className="bg-white rounded-xl p-3 border border-[#1B4332]/10 shadow-xs">
                  <div className="flex items-center justify-between gap-1 text-[10px] font-bold text-[#FF6B35] uppercase mb-1">
                    <span>Ficha #01 • 3 Minutos</span>
                    <span className="flex items-center gap-1 text-[#1B4332]">
                      <Clock className="w-2.5 h-2.5" /> Rápido
                    </span>
                  </div>
                  <p className="text-xs font-bold text-[#1E293B] leading-tight">
                    Caldo Dourado & Frango Desfiado Anti-Coceira
                  </p>
                  <p className="text-[10px] text-[#666666] mt-1">
                    Medidas: 2 colheres de sopa sobre a refeição
                  </p>
                </div>

                <div className="bg-white rounded-xl p-3 border border-[#1B4332]/10 shadow-xs">
                  <div className="flex items-center justify-between gap-1 text-[10px] font-bold text-[#1B4332] uppercase mb-1">
                    <span>Ficha #02 • Intestino Firme</span>
                    <span className="text-[#1B4332]">Proporção Exata</span>
                  </div>
                  <p className="text-xs font-bold text-[#1E293B] leading-tight">
                    Purê Restaurador de Abóbora & Cúrcuma
                  </p>
                  <p className="text-[10px] text-[#666666] mt-1">
                    Efeito prebiótico em menos de 5 min
                  </p>
                </div>

                <div className="bg-[#F0F7F2] rounded-xl p-2.5 border border-[#1B4332]/15 text-center">
                  <span className="text-[10px] font-bold text-[#1B4332] block">
                    ✓ Proporções personalizadas para o seu cão
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Cartões Representativos dos Materiais Impressos e Bônus (5 cols) */}
          <div className="sm:col-span-5 space-y-3 text-left">
            <div className="bg-white rounded-2xl p-4 border border-[#1B4332]/15 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1B4332] mb-1">
                <FileText className="w-4 h-4 text-[#1B4332]" />
                <span>Fichas de Cozinha A4</span>
              </div>
              <p className="text-xs text-[#666666] leading-snug">
                Cartões de 1 página com preparos de 3 a 5 min em medidas caseiras.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 border-2 border-[#E63946]/30 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-bold text-[#E63946] mb-1">
                <Gift className="w-4 h-4 text-[#E63946]" />
                <span>Bônus: Tabela de Geladeira</span>
              </div>
              <p className="text-xs text-[#666666] leading-snug">
                Cartão colorido de alimentos permitidos & proibidos para imprimir e colar.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 border-2 border-[#D4A373]/50 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1B4332] mb-1">
                <ShieldCheck className="w-4 h-4 text-[#1B4332]" />
                <span>Bônus: Protocolo Diarreias</span>
              </div>
              <p className="text-xs text-[#666666] leading-snug">
                Guia emergencial caseiro para salvar o estômago do cão de mal-estares.
              </p>
            </div>
          </div>
        </div>

        {/* Rodapé do Mockup */}
        <div className="mt-5 pt-3 border-t border-[#1B4332]/10 flex items-center justify-center gap-2 text-xs font-semibold text-[#1B4332]">
          <CheckCircle2 className="w-4 h-4 text-[#1B4332]" />
          <span>Acesse de qualquer celular, tablet, computador ou imprima quando quiser</span>
        </div>
      </div>
    </div>
  );
};
