import React from "react";
import { ArrowRight, Clock, Heart, Sparkles } from "lucide-react";
import dogSeniorImg from "../assets/images/dog_eating_bowl_golden_1790367958528.jpg";
import dogAdultImg from "../assets/images/dog_happy_mealtime_1790367061254.jpg";
import dogPuppyImg from "../assets/images/dog_eating_bowl_small_1790367947145.jpg";
import dogGenericImg from "../assets/images/dog_portrait_home_1790367038151.jpg";

interface LifeStageAwarenessProps {
  dogName: string;
  dogBreed?: string;
  dogSize?: string;
  lifeStage: string;
  onContinue: () => void;
}

export const LifeStageAwareness: React.FC<LifeStageAwarenessProps> = ({
  dogName,
  dogBreed,
  dogSize,
  lifeStage,
  onContinue
}) => {
  const name = dogName.trim() || "seu cachorro";

  const sizeLabels: Record<string, string> = {
    pequeno: "Porte pequeno",
    medio: "Porte médio",
    grande: "Porte grande"
  };

  const formattedSize = dogSize ? sizeLabels[dogSize] : null;
  const hasBreed = dogBreed && dogBreed !== "Não sei a raça";

  // Conteúdo dinâmico por estágio de vida conforme seções 6, 7, 8 e 9
  const getContent = () => {
    switch (lifeStage) {
      case "senior":
        return {
          badge: "Fase Sênior · Cuidados & Atenção",
          image: dogSeniorImg,
          imageAlt: `Cachorro sênior se alimentando tranquilamente`,
          headline: `O ${name} já entrou em uma fase diferente da vida.`,
          leadText: `Na fase sênior, o ${name} já não está na mesma fase de quando era mais jovem. E, conforme os cães envelhecem, os cuidados com a rotina podem ganhar ainda mais importância.`,
          highlightText: "O que funcionava quando ele era mais novo continua sendo a melhor opção para essa fase?",
          bodyText: "Ter mais atenção à alimentação, à variedade de opções e às necessidades do cachorro pode fazer parte de uma rotina de cuidados ao longo dos anos.",
          emotionalText: "O tempo passa rápido demais. Aquele cachorro que um dia era filhote vai envelhecer — e cuidar melhor da rotina dele não deveria começar somente quando aparece algum problema.",
          closingText: `É por isso que queremos entender um pouco mais sobre o ${name} antes de mostrar as opções mais relevantes para ele.`
        };

      case "adulto":
        return {
          badge: "Fase Adulta · Momento de Construção",
          image: dogAdultImg,
          imageAlt: `Cachorro adulto saudável e ativo`,
          headline: `O ${name} ainda é adulto. E esse é justamente o momento de cuidar da rotina.`,
          leadText: "Muita gente só começa a prestar mais atenção na alimentação quando o cachorro envelhece ou quando alguma mudança aparece.",
          highlightText: "Mas você não precisa esperar isso acontecer para começar a cuidar melhor.",
          bodyText: "A fase adulta representa uma grande parte da vida do cachorro. Ter mais opções para variar a alimentação e construir uma rotina de cuidados pode fazer parte desse período.",
          emotionalText: "Quanto antes você presta atenção à rotina, mais tempo tem para construir bons hábitos ao longo dos anos.",
          closingText: `Agora vamos entender um pouco mais sobre o ${name} para encontrar opções que façam sentido para o perfil dele.`
        };

      case "filhote":
        return {
          badge: "Fase Filhote · Primeiros Hábitos",
          image: dogPuppyImg,
          imageAlt: `Filhote saudável aprendendo a se alimentar bem`,
          headline: `O ${name} ainda está no começo da vida.`,
          leadText: "E justamente por isso, essa é uma fase em que os cuidados e os hábitos que você cria fazem parte da rotina dele.",
          highlightText: "Um filhote não está na mesma fase de um cachorro adulto ou sênior.",
          bodyText: "Por isso, antes de simplesmente escolher qualquer receita ou opção encontrada na internet, vale entender melhor o perfil do cachorro e o que você está procurando para a rotina dele.",
          emotionalText: null,
          closingText: `Vamos continuar para entender melhor o ${name}?`
        };

      case "indefinido":
      default:
        return {
          badge: "Perfil Individual · Rotina Própria",
          image: dogGenericImg,
          imageAlt: `Cachorro companheiro em casa`,
          headline: "Cada cachorro tem uma rotina diferente.",
          leadText: `Mesmo quando você não sabe exatamente em qual fase da vida o ${name} está, algumas informações sobre ele podem ajudar a encontrar opções mais relevantes para a rotina.`,
          highlightText: null,
          bodyText: null,
          emotionalText: null,
          closingText: "Vamos fazer mais algumas perguntas para entender melhor o perfil dele."
        };
    }
  };

  const content = getContent();

  return (
    <div className="w-full max-w-xl mx-auto px-4 flex flex-col justify-center my-2 sm:my-4">
      {/* Badge de Contexto */}
      <div className="flex items-center gap-1.5 text-xs text-[#3F6448] font-semibold mb-3">
        <Sparkles className="w-3.5 h-3.5 shrink-0" />
        <span>{content.badge}</span>
      </div>

      {/* Tags de Identificação Sutil */}
      {(hasBreed || formattedSize) && (
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#FAF8F4] border border-[#292724]/10 text-[#292724]/80 font-medium">
            🐶 {name}
          </span>
          {hasBreed && (
            <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#FAF8F4] border border-[#292724]/10 text-[#292724]/80 font-medium">
              {dogBreed}
            </span>
          )}
          {formattedSize && (
            <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#FAF8F4] border border-[#292724]/10 text-[#292724]/80 font-medium">
              {formattedSize}
            </span>
          )}
        </div>
      )}

      {/* Headline */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#292724] tracking-tight leading-snug mb-4 text-balance">
        {content.headline}
      </h2>

      {/* Imagem do Cão Compatível */}
      <div className="w-full aspect-16/9 sm:aspect-21/9 rounded-2xl overflow-hidden border border-[#292724]/8 mb-5 bg-[#FAF8F4] shadow-xs">
        <img
          src={content.image}
          alt={content.imageAlt}
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* Corpo de Texto */}
      <div className="space-y-3.5 text-sm sm:text-base text-[#292724]/85 leading-relaxed">
        <p>{content.leadText}</p>

        {/* Destaque Visual */}
        {content.highlightText && (
          <div className="my-4 p-4 rounded-xl bg-[#F3EDE3]/80 border-l-4 border-[#3F6448] text-[#292724] font-serif font-semibold text-base sm:text-lg leading-snug shadow-xs">
            “{content.highlightText}”
          </div>
        )}

        {content.bodyText && <p>{content.bodyText}</p>}

        {/* Texto Emocional */}
        {content.emotionalText && (
          <div className="p-3.5 rounded-xl bg-white border border-[#292724]/8 text-xs sm:text-sm text-[#292724]/80 italic">
            {content.emotionalText}
          </div>
        )}

        <p className="font-medium text-[#292724] pt-1">
          {content.closingText}
        </p>
      </div>

      {/* CTA Continuar */}
      <div className="pt-6">
        <button
          type="button"
          onClick={onContinue}
          className="w-full py-4 px-6 rounded-xl bg-[#3F6448] hover:bg-[#294333] active:scale-[0.99] text-white font-semibold text-base shadow-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3F6448]"
        >
          <span>Continuar</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
