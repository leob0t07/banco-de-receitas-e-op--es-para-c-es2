import React, { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";
import { PRODUCT_CONFIG } from "../config/funnel.config";
import { ProductMockup } from "../components/ProductMockup";
import { GuaranteeSection } from "../components/GuaranteeSection";
import { FAQSection } from "../components/FAQSection";
import { trackEvent } from "../utils/tracking";
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Lock,
  HeartHandshake,
  CheckCircle2,
  Gift,
  FileText,
  Scale,
  ShoppingCart,
  Printer,
  AlertTriangle,
  Flame
} from "lucide-react";

interface OfferViewProps {
  onGoToCheckout: () => void;
}

export const OfferView: React.FC<OfferViewProps> = ({ onGoToCheckout }) => {
  const { answers, grammar, dogSummary } = useQuiz();

  useEffect(() => {
    trackEvent("ViewOffer", {
      dogName: answers.dogName,
      dogGender: answers.dogGender,
      dogSize: answers.dogSize,
      dogAge: answers.lifeStage,
      feedingType: answers.feedingType,
      costOfInaction: answers.costOfInaction,
      availableTime: answers.availableTime,
      mainPriority: answers.mainPriority
    });
  }, [answers]);

  const nome = grammar.nome;
  const artigo = grammar.artigo;
  const deArtigo = grammar.deArtigo;
  const deArtigoCap = grammar.deArtigoCap;
  const porte = dogSummary.sizeLabel;

  const handleCtaClick = () => {
    trackEvent("ClickCTA", {
      ctaLocation: "offer_main_box",
      dogName: answers.dogName
    });

    if (PRODUCT_CONFIG.checkoutUrl && PRODUCT_CONFIG.checkoutUrl.trim().length > 0) {
      window.location.href = PRODUCT_CONFIG.checkoutUrl;
    } else {
      onGoToCheckout();
    }
  };

  return (
    <div className="w-full bg-[#FAF8F5] py-8 sm:py-14 selection:bg-[#1B4332] selection:text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* ========================================================
            1. HERO SECTION (Passo 15)
            ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          {/* Badge Superior */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F0F7F2] text-[#1B4332] text-xs font-bold uppercase tracking-wider mb-4 border border-[#1B4332]/15 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#1B4332]" />
            <span>Kit 100% Personalizado • Acesso Imediato para {artigo} {nome}</span>
          </div>

          {/* Headline H1 (Verde #1B4332) */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#1B4332] tracking-tight leading-tight text-balance mb-4">
            Acesse o Plano de Alimentação Personalizada d{artigo} {nome}
          </h1>

          {/* Sub-headline */}
          <p className="text-sm sm:text-lg text-[#666666] leading-relaxed max-w-2xl mx-auto text-balance">
            Tudo o que você precisa para transformar a refeição d{artigo} {nome} em um momento de saúde e alegria — em fichas visuais de 3 a 5 minutos.
          </p>
        </div>

        {/* Mockup Visual do Kit Completo em Celular e Fichas Impressas */}
        <div className="mb-12 sm:mb-16">
          <ProductMockup />
        </div>

        {/* ========================================================
            2. SEÇÃO DE ENTREGÁVEIS PALPÁVEIS (O QUE VOCÊ VAI RECEBER)
            ======================================================== */}
        <div className="bg-white rounded-3xl border border-[#1B4332]/10 p-6 sm:p-10 shadow-[0_4px_24px_rgba(27,67,50,0.04)] mb-12 sm:mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332]">
              Kit de Cozinha Prático
            </span>
            <h2 className="text-xl sm:text-3xl font-serif font-bold text-[#1E293B] mt-1.5">
              O que você vai receber na ponta dos dedos
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] mt-2.5">
              Desenvolvido para você bater o olho e aplicar em segundos, sem complicações:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Entregável 1 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border-2 border-[#1B4332]/15 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#1B4332] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B4332] bg-white px-2 py-0.5 rounded-md border border-[#1B4332]/15">
                  📦 Entregável #1
                </span>
                <h3 className="text-base font-bold text-[#1E293B] mt-1.5 mb-1">
                  Biblioteca Digital de Acesso Rápido no Celular
                </h3>
                <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                  Abra direto na cozinha e escolha por objetivo do dia: abrir o apetite em segundos, proteger as articulações ou regular a digestão.
                </p>
              </div>
            </div>

            {/* Entregável 2 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border-2 border-[#1B4332]/15 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#FF6B35] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6B35] bg-white px-2 py-0.5 rounded-md border border-[#FF6B35]/20">
                  📄 Entregável #2
                </span>
                <h3 className="text-base font-bold text-[#1E293B] mt-1.5 mb-1">
                  Fichas de Cozinha de 1 Página (3 a 5 min)
                </h3>
                <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                  Medidas fáceis em colheres, ingredientes baratos e modo de preparo em 3 passos simples. Sem bagunça e sem perda de tempo.
                </p>
              </div>
            </div>

            {/* Entregável 3 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border-2 border-[#1B4332]/15 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#1B4332] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B4332] bg-white px-2 py-0.5 rounded-md border border-[#1B4332]/15">
                  ⚖️ Entregável #3
                </span>
                <h3 className="text-base font-bold text-[#1E293B] mt-1.5 mb-1">
                  Guia Visual de Porções para Porte {porte}
                </h3>
                <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                  Proporções exatas calibradas para o peso e rotina d{artigo} {nome}. Saiba quanto servir sem precisar de balança de cozinha.
                </p>
              </div>
            </div>

            {/* Entregável 4 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border-2 border-[#1B4332]/15 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#1B4332] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B4332] bg-white px-2 py-0.5 rounded-md border border-[#1B4332]/15">
                  🛒 Entregável #4
                </span>
                <h3 className="text-base font-bold text-[#1E293B] mt-1.5 mb-1">
                  Lista de Supermercado Rápida de 1 Página
                </h3>
                <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                  O que comprar em qualquer feira ou mercado sem gastar quase nada. Alimentos acessíveis com alto poder nutritivo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            3. SEÇÃO DE BÔNUS EXCLUSIVOS (AUMENTO BRUTAL DE VALOR)
            ======================================================== */}
        <div className="rounded-3xl border-2 border-[#E63946] bg-linear-to-b from-rose-50/70 via-white to-[#FAF8F5] p-6 sm:p-10 shadow-[0_8px_30px_rgba(230,57,70,0.08)] mb-12 sm:mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E63946] text-white text-xs font-extrabold uppercase tracking-wider mb-3 shadow-xs">
              <Gift className="w-3.5 h-3.5 text-white" />
              <span>BÔNUS GRATUITOS LIBERADOS HOJE</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-serif font-extrabold text-[#1E293B]">
              Presentes Especiais Incluídos Sem Custo Extra
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] mt-2">
              Se você garantir o seu plano nesta página, leva imediatamente estes 2 guias complementares:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* BÔNUS #1 */}
            <div className="bg-white rounded-2xl p-6 border-2 border-[#E63946]/30 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 bg-[#E63946] text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-bl-xl">
                100% GRÁTIS
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#E63946] mb-2">
                  <Printer className="w-4 h-4 text-[#E63946]" />
                  <span>BÔNUS #1 • PDF PARA IMPRIMIR</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#1E293B] mb-2 leading-snug">
                  Cartão de Geladeira: Tabela de Alimentos Permitidos & Proibidos
                </h3>

                <p className="text-xs sm:text-sm text-[#666666] leading-relaxed mb-4">
                  Cole na porta da geladeira para evitar que qualquer pessoa da casa ou visitas dê algo perigoso para {artigo} {nome} por engano. O semáforo definitivo de segurança alimentar.
                </p>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                <span className="text-xs text-[#94A3B8] line-through font-poppins">
                  Valor normal: R$ 47,00
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-[#1B4332] bg-[#F0F7F2] px-2.5 py-1 rounded-md border border-[#1B4332]/15 font-poppins">
                  HOJE: R$ 0,00
                </span>
              </div>
            </div>

            {/* BÔNUS #2 */}
            <div className="bg-white rounded-2xl p-6 border-2 border-[#D4A373]/50 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 bg-[#1B4332] text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-bl-xl">
                100% GRÁTIS
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#1B4332] mb-2">
                  <ShieldCheck className="w-4 h-4 text-[#1B4332]" />
                  <span>BÔNUS #2 • PROTOCOLO EMERGENCIAL</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#1E293B] mb-2 leading-snug">
                  Guia de Pronta Resposta: Protocolo para Diarreias Leves e Desintoxicação
                </h3>

                <p className="text-xs sm:text-sm text-[#666666] leading-relaxed mb-4">
                  A receita caseira exata do caldo calmante e purê restaurador de flora para salvar {artigo} {nome} de mal-estares e fezes moles, sem idas desnecessárias à emergência veterinária.
                </p>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                <span className="text-xs text-[#94A3B8] line-through font-poppins">
                  Valor normal: R$ 67,00
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-[#1B4332] bg-[#F0F7F2] px-2.5 py-1 rounded-md border border-[#1B4332]/15 font-poppins">
                  HOJE: R$ 0,00
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            4. CHECKOUT BOX COM EMPILHAMENTO DE VALOR & ÂNCORA (Passo 15)
            ======================================================== */}
        <div id="checkout-box" className="bg-white rounded-3xl border-3 border-[#1B4332] p-6 sm:p-10 shadow-[0_12px_40px_rgba(27,67,50,0.14)] mb-12 sm:mb-16 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-extrabold uppercase tracking-wider mb-4 border border-[#FF6B35]/20">
            <Flame className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span>Condição Especial Destravada no Quiz</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-serif font-extrabold text-[#1E293B] mb-2 text-balance">
            Destrave o Plano de Alimentação Personalizada + Bônus d{artigo} {nome}
          </h2>

          <p className="text-xs sm:text-sm text-[#666666] max-w-md mx-auto mb-6">
            O pacote completo com fichas de cozinha, proporções exatas para {porte} e todos os bônus inclusos.
          </p>

          {/* Caixa de Resumo do Pedido com Empilhamento Solicitado */}
          <div className="bg-[#FAF8F5] rounded-2xl p-5 sm:p-6 max-w-lg mx-auto border border-[#1B4332]/15 mb-6 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#666666] block mb-3 pb-2 border-b border-[#E2E8F0]">
              Tudo o que está incluído no seu pedido:
            </span>

            <div className="space-y-2.5 text-xs sm:text-sm text-[#1E293B]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1B4332] shrink-0" />
                  Plano Personalizado d{artigo} {nome}
                </span>
                <span className="font-poppins text-[#666666]">R$ 97,00</span>
              </div>

              <div className="flex items-center justify-between text-[#1B4332]">
                <span className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#E63946] shrink-0" />
                  Bônus #1: Cartão de Geladeira (PDF Imprimir)
                </span>
                <span className="font-poppins text-[#666666]">R$ 47,00</span>
              </div>

              <div className="flex items-center justify-between text-[#1B4332]">
                <span className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#E63946] shrink-0" />
                  Bônus #2: Protocolo Diarreias & Desintoxicação
                </span>
                <span className="font-poppins text-[#666666]">R$ 67,00</span>
              </div>

              {/* Total Acumulado */}
              <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between font-semibold text-xs text-[#666666]">
                <span>Valor Total dos Materiais:</span>
                <span className="line-through font-poppins text-[#94A3B8]">
                  R$ 211,00
                </span>
              </div>
            </div>

            {/* Destaque do Preço Promocional do Quiz em Poppins */}
            <div className="mt-4 pt-4 border-t-2 border-dashed border-[#1B4332]/20 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E63946] bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                Desconto de Quiz Aplicado (-95%)
              </span>

              <div className="mt-3 flex items-baseline justify-center gap-1.5">
                <span className="text-xs sm:text-sm font-bold text-[#666666]">Por apenas</span>
                <span className="text-4xl sm:text-5xl font-extrabold text-[#1B4332] font-poppins tracking-tight">
                  {PRODUCT_CONFIG.price}
                </span>
              </div>

              <span className="text-xs font-bold text-[#1E293B] block mt-2">
                Pagamento único • Sem mensalidades • Acesso vitalício
              </span>
            </div>
          </div>

          {/* Botão de Ação CTA Grande em Laranja Coral (#FF6B35) com efeito de pulso leve */}
          <div className="max-w-md mx-auto">
            <button
              type="button"
              onClick={handleCtaClick}
              className="w-full py-5 px-6 sm:px-8 rounded-2xl bg-[#FF6B35] hover:bg-[#E85D04] active:scale-[0.98] text-white font-extrabold text-base sm:text-lg shadow-xl shadow-[#FF6B35]/35 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer animate-pulse hover:animate-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF6B35]/40"
            >
              <span>DESTRAVAR O PLANO + BÔNUS {deArtigoCap.toUpperCase()} {nome.toUpperCase()} AGORA</span>
              <ArrowRight className="w-5 h-5 shrink-0" />
            </button>

            {/* Badges de Segurança Obrigatórias */}
            <div className="grid grid-cols-3 gap-2 mt-5 text-[11px] text-[#666666]">
              <div className="flex flex-col items-center gap-1 text-center">
                <Lock className="w-4 h-4 text-[#1B4332]" />
                <span className="font-semibold">Pagamento 100% Seguro</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <CheckCircle2 className="w-4 h-4 text-[#1B4332]" />
                <span className="font-semibold">Liberação Imediata</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <HeartHandshake className="w-4 h-4 text-[#1B4332]" />
                <span className="font-semibold">Suporte Garantido</span>
              </div>
            </div>
          </div>
        </div>

        {/* Garantia Incondicional de 7 Dias */}
        <div className="mb-12">
          <GuaranteeSection />
        </div>

        {/* Perguntas Frequentes (FAQ) */}
        <div>
          <FAQSection />
        </div>

      </div>
    </div>
  );
};
