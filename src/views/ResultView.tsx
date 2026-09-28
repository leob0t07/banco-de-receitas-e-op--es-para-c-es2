import React, { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";
import { AntesDepois } from "../components/AntesDepois";
import { trackEvent } from "../utils/tracking";
import dogHappyImg from "../assets/images/dog_happy_mealtime_1790367061254.jpg";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Carrot,
  Utensils,
  Bone,
  Zap,
  Clock,
  Award,
  Smile,
  Sun,
  ShieldCheck
} from "lucide-react";

interface ResultViewProps {
  onGoToOffer: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ onGoToOffer }) => {
  const { answers, computedProfile, formattedNarrative, dogSummary } = useQuiz();

  useEffect(() => {
    trackEvent("ViewResult", {
      profile: computedProfile.id,
      dogName: answers.dogName,
      dogBreed: answers.dogBreed,
      dogGender: answers.dogGender,
      dogSize: answers.dogSize,
      dogAge: answers.lifeStage,
      feedingType: answers.feedingType,
      mainGoal: answers.mainGoal
    });
  }, [computedProfile.id, answers]);

  const name = dogSummary.name;
  const breedIntro =
    answers.dogBreed && answers.dogBreed !== "Não sei a raça"
      ? `, ${answers.dogBreed},`
      : "";

  // Mapeamento dinâmico de ícones para as categorias
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Carrot":
        return Carrot;
      case "Utensils":
        return Utensils;
      case "Bone":
        return Bone;
      case "Zap":
        return Zap;
      case "Clock":
        return Clock;
      case "Award":
        return Award;
      case "Smile":
        return Smile;
      case "Sun":
        return Sun;
      default:
        return BookOpen;
    }
  };

  const handleCta = () => {
    trackEvent("ClickCTA", {
      ctaLocation: "result_primary",
      profile: computedProfile.id
    });
    onGoToOffer();
  };

  return (
    <div className="w-full py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Cabeçalho do Resultado */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7EEE7] text-[#3F6448] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Perfil Personalizado Concluído</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#292724] tracking-tight leading-tight">
            Resultado {dogSummary.preposition} {name}
          </h1>

          <p className="text-sm sm:text-base text-[#292724]/75 mt-3 leading-relaxed">
            Analisamos as respostas sobre o {name}{breedIntro} e encontramos um perfil de alimentação que combina com o que você está procurando para a rotina {dogSummary.possessive}.
          </p>
        </div>

        {/* Ficha Editorial do Cão */}
        <div className="bg-[#F3EDE3]/70 border border-[#292724]/10 rounded-2xl p-6 sm:p-8 mb-10 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-[#292724]/8 mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#3F6448]">
                Ficha de Rotina
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#292724] mt-0.5">
                🐶 {name}
              </h2>
            </div>
            <div className="text-xs font-semibold text-[#3F6448] bg-white px-3 py-1.5 rounded-lg border border-[#3F6448]/20">
              Foco: {computedProfile.title}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            <div>
              <span className="text-[11px] font-medium text-[#292724]/60 uppercase tracking-wider block">
                Raça
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#292724] mt-0.5 block truncate" title={dogSummary.breedLabel}>
                {dogSummary.breedLabel}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-medium text-[#292724]/60 uppercase tracking-wider block">
                Sexo
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#292724] mt-0.5 block">
                {dogSummary.genderLabel}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-medium text-[#292724]/60 uppercase tracking-wider block">
                Porte
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#292724] mt-0.5 block">
                {dogSummary.sizeLabel}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-medium text-[#292724]/60 uppercase tracking-wider block">
                Fase da Vida
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#292724] mt-0.5 block">
                {dogSummary.stageLabel}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-medium text-[#292724]/60 uppercase tracking-wider block">
                Rotina
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#292724] mt-0.5 block">
                {dogSummary.routineLabel}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-medium text-[#292724]/60 uppercase tracking-wider block">
                Alimentação Atual
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#292724] mt-0.5 block">
                {dogSummary.dietLabel}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-medium text-[#292724]/60 uppercase tracking-wider block">
                Objetivo Central
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#3F6448] mt-0.5 block">
                {dogSummary.goalLabel}
              </span>
            </div>
          </div>

          {/* Botão de acesso direto às receitas do pet */}
          <div className="mt-6 pt-5 border-t border-[#292724]/8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left w-full sm:w-auto">
              <span className="text-xs sm:text-sm font-semibold text-[#292724] block">
                Receitas selecionadas para {name}
              </span>
              <span className="text-[11px] sm:text-xs text-[#292724]/65 block mt-0.5">
                Opções práticas com foco em {computedProfile.title.toLowerCase()}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCta}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#3F6448] hover:bg-[#294333] active:scale-[0.98] text-white font-bold text-sm sm:text-base shadow-sm transition-all duration-150 inline-flex items-center justify-center gap-2 cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3F6448]"
            >
              <span>Acessar as receitas {dogSummary.preposition} {name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bloco de Análise Narrativa Personalizada */}
        <div className="bg-white rounded-2xl border border-[#292724]/8 p-6 sm:p-8 mb-10 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C98258]">
                <span>Diagnóstico de Rotina</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#292724]">
                Seu foco principal é ter {computedProfile.title.toLowerCase()} na rotina {dogSummary.preposition} {name}.
              </h3>

              <p className="text-xs sm:text-sm text-[#292724]/80 leading-relaxed">
                {formattedNarrative}
              </p>

              <p className="text-xs sm:text-sm text-[#292724]/80 leading-relaxed">
                {computedProfile.summary}
              </p>
            </div>

            <div className="md:col-span-5 aspect-4/3 rounded-xl overflow-hidden border border-[#292724]/8 bg-[#FAF8F4]">
              <img
                src={dogHappyImg}
                alt="Cachorro saudável se alimentando de forma feliz"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* O que pode ficar mais fácil para você */}
          <div className="mt-8 pt-6 border-t border-[#292724]/8">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#292724] mb-4">
              O que pode ficar mais fácil para você a partir de agora:
            </h4>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#292724]/85">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#3F6448] shrink-0 mt-0.5" />
                <span>Ter mais opções seguras para variar o cardápio sem medo;</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#3F6448] shrink-0 mt-0.5" />
                <span>Evitar ficar repetindo sempre as mesmas ideias ou petiscos;</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#3F6448] shrink-0 mt-0.5" />
                <span>Reduzir o tempo perdido procurando receitas soltas na internet;</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#3F6448] shrink-0 mt-0.5" />
                <span>Consultar opções de forma organizada em poucos cliques;</span>
              </li>
              <li className="flex items-start gap-2.5 sm:col-span-2">
                <CheckCircle2 className="w-4 h-4 text-[#3F6448] shrink-0 mt-0.5" />
                <span>Escolher facilmente o que preparar de acordo com os ingredientes que tem em casa.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Categorias Recomendadas para o Perfil */}
        <div className="mb-12">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-semibold text-[#3F6448] tracking-wider uppercase">
              Seleção Recomendada
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#292724] mt-1">
              Por onde você pode começar com {dogSummary.article} {name}
            </h3>
            <p className="text-xs sm:text-sm text-[#292724]/70 mt-1">
              Categorias prioritárias sugeridas a partir das respostas do seu quiz:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {computedProfile.categories.map((cat, idx) => {
              const IconComp = getCategoryIcon(cat.iconName);
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-[#292724]/8 shadow-xs flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E7EEE7] text-[#3F6448] flex items-center justify-center shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-serif font-bold text-[#292724]">
                      {cat.title}
                    </h4>
                    <p className="text-xs text-[#292724]/75 mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transição para o Produto + Comparativo Antes/Depois */}
        <AntesDepois />

        {/* Chamada para Ação para a Oferta do Acervo */}
        <div className="bg-[#294333] text-white rounded-3xl p-6 sm:p-10 text-center max-w-3xl mx-auto shadow-sm my-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-4">
            <BookOpen className="w-3.5 h-3.5 text-[#E7EEE7]" />
            Biblioteca Completa
          </span>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-3 text-balance">
            Agora imagine ter todas essas opções organizadas em um só lugar
          </h3>

          <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto mb-8 leading-relaxed text-balance">
            Você não precisa inventar preparos do zero nem perder tempo em pesquisas repetidas. O 4 Patas reúne tudo o que você precisa em uma plataforma prática de consultar no dia a dia.
          </p>

          <button
            type="button"
            onClick={handleCta}
            className="w-full sm:w-auto min-w-[280px] py-4 px-8 rounded-xl bg-white hover:bg-[#FAF8F4] active:scale-[0.99] text-[#294333] font-bold text-base sm:text-lg shadow-sm transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white/50"
          >
            <span>Ver como ter acesso ao 4 Patas</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-xs text-white/60 mt-3">
            Acesso digital imediato no celular · Consulta permanente
          </p>
        </div>
      </div>
    </div>
  );
};
