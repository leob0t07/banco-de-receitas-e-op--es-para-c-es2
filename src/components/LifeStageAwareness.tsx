import React from "react";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import dogSeniorImg from "../assets/images/dog_eating_bowl_golden_1790367958528.jpg";
import dogAdultImg from "../assets/images/dog_happy_mealtime_1790367061254.jpg";
import dogPuppyImg from "../assets/images/dog_eating_bowl_small_1790367947145.jpg";
import dogGenericImg from "../assets/images/dog_portrait_home_1790367038151.jpg";

interface LifeStageAwarenessProps {
  dogName: string;
  dogGender?: string;
  dogBreed?: string;
  dogSize?: string;
  lifeStage: string;
  onContinue: () => void;
}

export const LifeStageAwareness: React.FC<LifeStageAwarenessProps> = ({
  dogName,
  dogGender = "macho",
  lifeStage,
  onContinue
}) => {
  const isFemea = dogGender === "femea";
  const name = dogName.trim() || (isFemea ? "sua parceira" : "seu parceiro");
  const artigo = isFemea ? "a" : "o";
  const artigoCap = isFemea ? "A" : "O";
  const pronome = isFemea ? "ela" : "ele";

  // Conteúdo dinâmico solicitado no Passo 6
  const getContent = () => {
    switch (lifeStage) {
      case "filhote":
        return {
          badge: "Fase Filhote · Primeiros Hábitos & Imunidade",
          image: dogPuppyImg,
          imageAlt: `Filhote comendo refeição saudável`,
          headline: `${artigoCap} ${name} está no começo da vida.`,
          leadText: `Essa é a fase em que o paladar e o sistema imunológico d${pronome} estão sendo construídos. Tudo o que você oferece agora define a microbiota, as articulações e a longevidade d${pronome} para as próximas décadas.`,
          highlightText: `Evitar o consumo exclusivo de ultraprocessados nessa janela é o fator mais decisivo para prevenir alergias, dermatites e recusa alimentar no futuro.`,
          bodyText: `Apresentar nutrientes vivos, texturas naturais e combinações nutritivas com segurança vai garantir que ${pronome} cresça com vitalidade e sem carências.`,
          closingText: `Agora vamos refinar os hábitos e a rotina para calibrar o Plano Personalizado d${artigo} ${name}.`
        };

      case "adulto":
        return {
          badge: "Fase Adulta · Manutenção & Vitalidade",
          image: dogAdultImg,
          imageAlt: `Cão adulto saudável e comendo com apetite`,
          headline: `${artigoCap} ${name} está na fase adulta.`,
          leadText: `Esse é o momento crítico para evitar o tédio alimentar e a inflamação silenciosa. Cães adultos que recebem apenas a mesma ração seca todos os dias frequentemente perdem o apetite ou desenvolvem sensibilidades digestivas com o passar do tempo.`,
          highlightText: `Variar com complementos naturais e ingredientes antioxidantes devolve a alegria de comer e renova o brilho da pelagem d${pronome}.`,
          bodyText: `Pequenos ajustes na rotina d${pronome} promovem saciedade real, fezes mais firmes e protegem o fígado e os rins contra sobrecargas desnecessárias.`,
          closingText: `Vamos mapear a rotina d${pronome} para gerar o Plano de Nutrição Sob Medida.`
        };

      case "senior":
        return {
          badge: "Fase Dourada · Longevidade & Conforto",
          image: dogSeniorImg,
          imageAlt: `Cão sênior tranquilo e bem nutrido`,
          headline: `${artigoCap} ${name} já entrou na fase dourada.`,
          leadText: `O corpo d${pronome} exige nutrientes vivos de fácil assimilação. Conforme o metabolismo desacelera, o trato digestivo fica mais sensível e as articulações pedem suporte anti-inflamatório redobrado.`,
          highlightText: `Nessa fase, preparos macios, hidratados e ricos em antioxidantes naturais são essenciais para manter ${artigo} ${name} com energia, disposição e livre de dores.`,
          bodyText: `Você não precisa aceitar o desânimo ou o apetite caprichoso como algo 'inevitável da idade'. Comida real e palatável transforma a vitalidade de um cão sênior.`,
          closingText: `Vamos em frente para estruturar as opções ideais para o momento atual d${pronome}.`
        };

      case "indefinido":
      default:
        return {
          badge: "Perfil Personalizado · Saúde & Vitalidade",
          image: dogGenericImg,
          imageAlt: `Cachorro companheiro em casa`,
          headline: `Cada cão possui necessidades biológicas singulares.`,
          leadText: `Mesmo com a idade exata em aberto, sabemos que ${artigo} ${name} merece uma alimentação limpa, nutritiva e atrativa que respeite a fisiologia canina.`,
          highlightText: `Nutrientes frescos e preparações sob medida elevam a imunidade d${pronome} e transformam o momento da refeição em pura alegria.`,
          bodyText: `Compreender a rotina d${pronome} nos permite entregar uma recomendação precisa e 100% segura.`,
          closingText: `Vamos continuar para finalizar o diagnóstico d${pronome}.`
        };
    }
  };

  const content = getContent();

  return (
    <div className="w-full bg-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[#1B4332]/10 my-2">
      {/* Badge Superior */}
      <div className="flex items-center gap-1.5 text-xs text-[#1B4332] font-bold uppercase tracking-wider mb-4">
        <Sparkles className="w-4 h-4 text-[#1B4332] shrink-0" />
        <span>{content.badge}</span>
      </div>

      {/* Título Principal em Verde Nutrição Botânica #1B4332 */}
      <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1B4332] tracking-tight leading-snug mb-4">
        {content.headline}
      </h2>

      {/* Grid: Imagem Editorial + Texto Principal */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
        <div className="md:col-span-5 aspect-4/3 rounded-xl overflow-hidden border border-[#1B4332]/10 bg-[#FAF8F5] shadow-xs">
          <img
            src={content.image}
            alt={content.imageAlt}
            className="w-full h-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="md:col-span-7 space-y-3">
          <p className="text-xs sm:text-sm text-[#1E293B] leading-relaxed">
            {content.leadText}
          </p>

          <div className="p-3.5 rounded-xl bg-[#F0F7F2] border border-[#1B4332]/15">
            <p className="text-xs sm:text-sm font-semibold text-[#1B4332] leading-snug">
              {content.highlightText}
            </p>
          </div>
        </div>
      </div>

      {/* Bloco de Fechamento */}
      <div className="pt-4 border-t border-[#1B4332]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-[#666666]">
          <ShieldCheck className="w-4 h-4 text-[#1B4332] shrink-0" />
          <span>{content.closingText}</span>
        </div>

        {/* CTA Button em Laranja Coral #FF6B35 */}
        <button
          type="button"
          onClick={onContinue}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#FF6B35] hover:bg-[#E85D04] active:scale-[0.99] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#FF6B35]/25 transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF6B35]/30 shrink-0"
        >
          <span>Continuar diagnóstico →</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
