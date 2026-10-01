import React, { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";
import { AntesDepois } from "../components/AntesDepois";
import { trackEvent } from "../utils/tracking";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Check,
  Smartphone,
  ShieldCheck,
  Gift,
  FileText,
  Scale,
  Utensils
} from "lucide-react";

interface ResultViewProps {
  onGoToOffer: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ onGoToOffer }) => {
  const { answers, computedProfile, dogSummary, grammar } = useQuiz();

  useEffect(() => {
    trackEvent("ViewResult", {
      profile: computedProfile.id,
      dogName: answers.dogName,
      dogBreed: answers.dogBreed,
      dogGender: answers.dogGender,
      dogSize: answers.dogSize,
      dogAge: answers.lifeStage,
      feedingType: answers.feedingType,
      costOfInaction: answers.costOfInaction,
      availableTime: answers.availableTime,
      mainPriority: answers.mainPriority
    });
  }, [computedProfile.id, answers]);

  const nome = grammar.nome;
  const artigo = grammar.artigo;
  const artigoCap = grammar.artigoCap;
  const deArtigo = grammar.deArtigo;
  const deArtigoCap = grammar.deArtigoCap;
  const pronome = grammar.pronome;
  const porte = dogSummary.sizeLabel;
  const faseVida = dogSummary.stageLabel;

  const handleCta = () => {
    trackEvent("ClickCTA", {
      ctaLocation: "result_primary",
      profile: computedProfile.id
    });
    onGoToOffer();
  };

  return (
    <div className="w-full bg-[#FAF8F5] py-8 sm:py-12 selection:bg-[#1B4332] selection:text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* ========================================================
            PASSO 14: TELA DE DIAGNÓSTICO E RESULTADO PALPÁVEL
            ======================================================== */}

        {/* Header Superior em Caixa Alta */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F0F7F2] text-[#1B4332] text-xs font-bold uppercase tracking-wider mb-3 border border-[#1B4332]/15 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#1B4332]" />
            <span>Diagnóstico Concluído com Sucesso</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif font-extrabold text-[#1B4332] tracking-tight leading-tight uppercase">
            DIAGNÓSTICO E PLANO NUTRICIONAL {deArtigoCap.toUpperCase()} {nome.toUpperCase()}
          </h1>

          <p className="text-sm sm:text-base text-[#666666] mt-3 leading-relaxed">
            Parâmetros metabólicos calculados com base no porte, fase da vida e necessidades biológicas {grammar.dPronome}.
          </p>
        </div>

        {/* Card Principal com Borda Verde #1B4332 */}
        <div className="bg-white rounded-2xl border-2 border-[#1B4332] p-6 sm:p-9 mb-8 shadow-[0_4px_24px_rgba(27,67,50,0.08)]">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1B4332] mb-3">
            <CheckCircle2 className="w-4 h-4 text-[#1B4332]" />
            <span>Kit de Entregáveis Pronto para Aplicação</span>
          </div>

          {/* Diagnóstico Especificado */}
          <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B] leading-snug mb-4">
            Com base no porte {porte} e na fase {faseVida}, geramos o{" "}
            <span className="text-[#1B4332] font-extrabold underline decoration-[#1B4332]/30 underline-offset-4">
              Kit de Alimentação Personalizada d{artigo} {nome}
            </span>.
          </h2>

          <p className="text-sm sm:text-base text-[#666666] leading-relaxed mb-6">
            O que {artigo} {nome} precisa não é de um livro teórico nem de complicações. Você vai receber ferramentas práticas de cozinha prontas para consultar, com medidas em colheres e xícaras para aplicar em menos de 5 minutos.
          </p>

          {/* Lista de Entregáveis Visuais Liberados Solicitada */}
          <div className="bg-[#F0F7F2] rounded-2xl p-5 sm:p-6 border border-[#1B4332]/15 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#1B4332]/10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332]">
                Entregáveis Físicos & Digitais Liberados:
              </span>
              <span className="text-[11px] font-bold text-[#FF6B35] bg-[#FF6B35]/10 px-2 py-0.5 rounded-full border border-[#FF6B35]/20">
                100% Prático
              </span>
            </div>

            {/* Entregável 1: Fichas de Cozinha de 3 Minutos */}
            <div className="flex items-start gap-3.5 text-sm text-[#1E293B]">
              <div className="w-6 h-6 rounded-lg bg-[#1B4332] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <Utensils className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-[#1E293B] font-bold block">
                  Fichas de Cozinha de 3 Minutos:
                </strong>
                <span className="text-xs sm:text-sm text-[#666666]">
                  Preparos de alta palatabilidade para {pronome} comer com alegria, utilizando o que você já tem em casa.
                </span>
              </div>
            </div>

            {/* Entregável 2: Guia Anti-Inflamatório */}
            <div className="flex items-start gap-3.5 text-sm text-[#1E293B]">
              <div className="w-6 h-6 rounded-lg bg-[#1B4332] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-[#1E293B] font-bold block">
                  Guia Anti-Inflamatório:
                </strong>
                <span className="text-xs sm:text-sm text-[#666666]">
                  Ingredientes funcionais selecionados para zerar coceira na pele, lambedura constante nas patas e fezes moles.
                </span>
              </div>
            </div>

            {/* Entregável 3: Tabela de Proporções para Porte */}
            <div className="flex items-start gap-3.5 text-sm text-[#1E293B]">
              <div className="w-6 h-6 rounded-lg bg-[#1B4332] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <Scale className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-[#1E293B] font-bold block">
                  Tabela de Proporções para Porte {porte}:
                </strong>
                <span className="text-xs sm:text-sm text-[#666666]">
                  Quantidade exata por refeição ajustada em colheres e xícaras sem precisar pesar nada na balança.
                </span>
              </div>
            </div>

            {/* Entregável 4: 2 Bônus Exclusivos de Imprimir */}
            <div className="flex items-start gap-3.5 text-sm text-[#1E293B] pt-2 border-t border-[#1B4332]/10">
              <div className="w-6 h-6 rounded-lg bg-[#E63946] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <Gift className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <strong className="text-[#1E293B] font-bold">
                    2 Bônus Exclusivos de Imprimir Liberados:
                  </strong>
                  <span className="text-[10px] font-bold text-[#E63946] uppercase bg-rose-100 px-2 py-0.5 rounded-full">
                    Grátis Hoje
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-[#666666]">
                  Tabela de Geladeira (Alimentos Permitidos & Proibidos) + Guia de Pronta Resposta para Socorros Digestivos.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ficha Resumo do Cão */}
        <div className="bg-white border border-[#1B4332]/10 rounded-2xl p-6 sm:p-8 mb-10 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0] mb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332]">
                Parâmetros Biológicos
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#1E293B] mt-0.5">
                🐶 {nome}
              </h3>
            </div>
            <div className="text-xs font-bold text-[#1B4332] bg-[#F0F7F2] px-3.5 py-1.5 rounded-full border border-[#1B4332]/15">
              Status: Kit de Cozinha Liberado
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div>
              <span className="text-xs text-[#666666] font-medium block">Raça</span>
              <span className="font-bold text-[#1E293B] mt-0.5 block truncate">{dogSummary.breedLabel}</span>
            </div>
            <div>
              <span className="text-xs text-[#666666] font-medium block">Fase da Vida</span>
              <span className="font-bold text-[#1E293B] mt-0.5 block">{dogSummary.stageLabel}</span>
            </div>
            <div>
              <span className="text-xs text-[#666666] font-medium block">Porte Físico</span>
              <span className="font-bold text-[#1E293B] mt-0.5 block">{dogSummary.sizeLabel}</span>
            </div>
            <div>
              <span className="text-xs text-[#666666] font-medium block">Formato</span>
              <span className="font-bold text-[#1E293B] mt-0.5 block">Fichas de 1 Página</span>
            </div>
          </div>
        </div>

        {/* Comparativo Visual: Antes vs Depois */}
        <div className="mb-10">
          <AntesDepois dogName={nome} />
        </div>

        {/* Bloco de Transição para o Produto (Passo 14 CTA) */}
        <div className="bg-white rounded-2xl border-2 border-[#1B4332] p-6 sm:p-10 shadow-[0_8px_30px_rgba(27,67,50,0.1)] text-center my-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-bold uppercase tracking-wider mb-4 border border-[#FF6B35]/20">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Kit Sob Medida Pronto</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-serif font-bold text-[#1B4332] tracking-tight leading-snug mb-4 max-w-2xl mx-auto">
            O Kit de Alimentação Personalizada {deArtigo} {nome} está pronto para ser liberado.
          </h2>

          <p className="text-sm sm:text-base text-[#1E293B] max-w-2xl mx-auto leading-relaxed mb-8">
            Em vez de gastar com sachês cheios de conservantes ou remédios caros na clínica veterinária, tenha na ponta dos dedos ferramentas visuais simples de cozinha para {artigo} {nome} comer com vontade e viver com longevidade.
          </p>

          <div className="max-w-md mx-auto">
            <button
              type="button"
              onClick={handleCta}
              className="w-full py-4.5 px-8 rounded-2xl bg-[#FF6B35] hover:bg-[#E85D04] active:scale-[0.99] text-white font-extrabold text-base sm:text-lg shadow-xl shadow-[#FF6B35]/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF6B35]/30"
            >
              <span>LIBERAR MEU KIT PERSONALIZADO AGORA →</span>
            </button>
            <span className="text-xs text-[#666666] block mt-2.5">
              Acesso digital instantâneo + Fichas e Bônus de Imprimir
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
