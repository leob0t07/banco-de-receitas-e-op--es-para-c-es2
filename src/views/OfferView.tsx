import React, { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";
import { PRODUCT_CONFIG, TESTIMONIALS_CONFIG } from "../config/funnel.config";
import { ProductMockup } from "../components/ProductMockup";
import { DemonstrationSection } from "../components/DemonstrationSection";
import { BenefitsSection } from "../components/BenefitsSection";
import { GuaranteeSection } from "../components/GuaranteeSection";
import { FAQSection } from "../components/FAQSection";
import { trackEvent } from "../utils/tracking";
import treatsPhotoImg from "../assets/images/dog_natural_treats_1790367049564.jpg";
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
  Lock,
  Smartphone,
  BookOpen
} from "lucide-react";

interface OfferViewProps {
  onGoToCheckout: () => void;
}

export const OfferView: React.FC<OfferViewProps> = ({ onGoToCheckout }) => {
  const { answers, dogSummary } = useQuiz();

  useEffect(() => {
    trackEvent("ViewOffer", {
      dogName: answers.dogName,
      dogGender: answers.dogGender,
      dogSize: answers.dogSize,
      dogAge: answers.lifeStage,
      feedingType: answers.feedingType,
      mainGoal: answers.mainGoal
    });
  }, [answers]);

  const name = dogSummary.name;

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

  const inclusions = [
    "Acesso completo ao acervo de receitas nutritivas para cães",
    "Coleção de petiscos caseiros, crocantes e para adestramento",
    "Opções práticas para variar e enriquecer a tigela diária",
    "Lista clara de ingredientes simples e acessíveis",
    "Modo de preparo rápido e testado passo a passo",
    "Conteúdo organizado por categorias intuitivas",
    "Plataforma responsiva para consulta pelo celular ou computador",
    "Acesso digital imediato e vitalício após a confirmação"
  ];

  return (
    <div className="w-full py-8 sm:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Topo da Apresentação */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7EEE7] text-[#3F6448] text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Biblioteca Digital para o Dia a Dia</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#292724] tracking-tight leading-tight text-balance">
            Mais opções para a rotina {dogSummary.preposition} {name}, sem precisar procurar tudo do zero
          </h1>

          <p className="text-sm sm:text-base text-[#292724]/75 mt-3 leading-relaxed text-balance">
            Uma biblioteca organizada de receitas, petiscos e opções de alimentação para quem quer ter mais variedade e praticidade na rotina do cachorro.
          </p>
        </div>

        {/* Mockup Realista do Produto */}
        <ProductMockup />

        {/* Bloco de Ingredientes Reais & Fotografia Comercial */}
        <div className="my-12 sm:my-16 bg-white rounded-3xl border border-[#292724]/8 p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6 aspect-4/3 rounded-2xl overflow-hidden border border-[#292724]/8 bg-[#FAF8F4]">
              <img
                src={treatsPhotoImg}
                alt="Ingredientes naturais saudáveis e petiscos preparados para cães"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="md:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C98258]">
                Ingredientes do Cotidiano
              </span>

              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#292724] leading-snug">
                Receitas pensadas para quem não quer complicação
              </h2>

              <p className="text-xs sm:text-sm text-[#292724]/75 leading-relaxed">
                Você não precisa comprar ingredientes exóticos nem suplementos inacessíveis. Todas as opções foram selecionadas pensando em itens simples como abóbora, cenoura, aveia, ovos, maçã e proteínas magras.
              </p>

              <div className="pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#3F6448]">
                  <Check className="w-4 h-4 text-[#3F6448]" />
                  <span>Sem corantes artificiais ou conservantes industriais</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#3F6448] mt-1.5">
                  <Check className="w-4 h-4 text-[#3F6448]" />
                  <span>Muito mais econômico do que comprar petiscos prontos</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* O que a pessoa recebe */}
        <div className="my-12 sm:my-16 bg-[#F3EDE3]/50 rounded-3xl border border-[#292724]/8 p-6 sm:p-10">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-semibold text-[#3F6448] tracking-wider uppercase">
              Tudo o que está incluso
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#292724] mt-1">
              Acesso completo à biblioteca
            </h2>
            <p className="text-xs sm:text-sm text-[#292724]/70 mt-1">
              Veja tudo o que você terá disponível assim que confirmar seu acesso:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-3xl mx-auto">
            {inclusions.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-3.5 sm:p-4 border border-[#292724]/6 flex items-start gap-3 shadow-xs"
              >
                <div className="w-5 h-5 rounded-full bg-[#E7EEE7] text-[#3F6448] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm text-[#292724] font-medium leading-snug">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Passo a Passo de Demonstração */}
        <DemonstrationSection />

        {/* Benefícios */}
        <BenefitsSection />

        {/* Seção de Oferta em Destaque */}
        <div id="oferta-box" className="my-12 sm:my-16 max-w-2xl mx-auto">
          <div className="bg-white border-2 border-[#3F6448] rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
            {/* Faixa Superior de Destaque */}
            <div className="text-center pb-6 border-b border-[#292724]/8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7EEE7] text-[#3F6448] text-xs font-bold uppercase tracking-wider mb-3">
                Acesso Digital Imediato
              </span>

              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#292724] text-balance">
                Tenha acesso ao 4 Patas
              </h2>

              <p className="text-xs sm:text-sm text-[#292724]/70 mt-2">
                Acesso vitalício para consultar no celular sempre que quiser variar a rotina {dogSummary.preposition} {name}.
              </p>
            </div>

            {/* Resumo do Produto */}
            <div className="py-6 space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm text-[#292724]/80">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#3F6448]" />
                  Acervo completo de receitas e petiscos
                </span>
                <span className="font-semibold text-[#3F6448]">Incluso</span>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm text-[#292724]/80">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#3F6448]" />
                  Categorias organizadas por ocasião e objetivo
                </span>
                <span className="font-semibold text-[#3F6448]">Incluso</span>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm text-[#292724]/80">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#3F6448]" />
                  Acesso para sempre no celular e computador
                </span>
                <span className="font-semibold text-[#3F6448]">Vitalício</span>
              </div>
            </div>

            {/* Bloco de Preço */}
            <div className="py-6 border-y border-[#292724]/8 text-center bg-[#FAF8F4] -mx-6 sm:-mx-10 px-6 sm:px-10">
              <div className="text-xs text-[#292724]/60">
                De <span className="line-through">{PRODUCT_CONFIG.oldPrice}</span> por apenas:
              </div>
              <div className="text-4xl sm:text-5xl font-serif font-bold text-[#3F6448] mt-1 tracking-tight">
                {PRODUCT_CONFIG.price}
              </div>
              <div className="text-xs text-[#292724]/65 mt-1 font-medium">
                Pagamento único · Sem mensalidades
              </div>
            </div>

            {/* Botão de Conversão Principal */}
            <div className="pt-6 space-y-3">
              <button
                type="button"
                onClick={handleCtaClick}
                className="w-full py-4 px-6 rounded-xl bg-[#3F6448] hover:bg-[#294333] active:scale-[0.99] text-white font-bold text-base sm:text-lg shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#3F6448]/40"
              >
                <span>{PRODUCT_CONFIG.cta}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-[#292724]/60 pt-1">
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-[#3F6448]" />
                  Pagamento 100% seguro
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-[#3F6448]" />
                  Liberação imediata
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Garantia */}
        <GuaranteeSection />

        {/* Seção de Depoimentos (Renderizada apenas se configurada com depoimentos reais) */}
        {TESTIMONIALS_CONFIG && TESTIMONIALS_CONFIG.length > 0 && (
          <div className="my-12">
            <div className="text-center mb-8">
              <h3 className="text-xl font-serif font-bold text-[#292724]">
                Relatos de quem já utiliza o 4 Patas
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TESTIMONIALS_CONFIG.map((t, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-[#292724]/8">
                  <p className="text-xs sm:text-sm text-[#292724]/80 italic">"{t.text}"</p>
                  <div className="mt-3 text-xs font-semibold text-[#292724]">
                    {t.name} · Tutor do {t.dogName}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Perguntas Frequentes */}
        <FAQSection />
      </div>
    </div>
  );
};
