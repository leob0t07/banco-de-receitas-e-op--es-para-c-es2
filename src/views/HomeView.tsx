import React, { useEffect } from "react";
import { ArrowRight, ShieldCheck, Clock } from "lucide-react";
import dogSmallImg from "../assets/images/dog_eating_bowl_small_1790367947145.jpg";
import dogGoldenImg from "../assets/images/dog_eating_bowl_golden_1790367958528.jpg";
import dogHappyImg from "../assets/images/dog_happy_mealtime_1790367061254.jpg";
import dogPugImg from "../assets/images/dog_eating_bowl_pug_1790367969784.jpg";
import { trackEvent } from "../utils/tracking";

interface HomeViewProps {
  onStartQuiz: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onStartQuiz }) => {
  useEffect(() => {
    trackEvent("ViewQuiz");
  }, []);

  const handleStart = () => {
    trackEvent("QuizStart");
    onStartQuiz();
  };

  const petsGallery = [
    {
      img: dogSmallImg,
      alt: "Cão de pequeno porte comendo alimento caseiro nutritivo",
      label: "Pequeno porte",
      food: "Preparo leve & cenouras"
    },
    {
      img: dogGoldenImg,
      alt: "Golden retriever saboreando refeição saudável balanceada",
      label: "Médio a grande",
      food: "Receitas caseiras cozidas"
    },
    {
      img: dogPugImg,
      alt: "Bulldog/Pug aproveitando refeição fresca na tigela",
      label: "Fácil mastigação",
      food: "Opções macias & abóbora"
    },
    {
      img: dogHappyImg,
      alt: "Cão doméstico feliz saboreando sua tigela diária",
      label: "Rotina ativa",
      food: "Variedade do dia a dia"
    }
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8 sm:py-12">
      <div className="max-w-xl mx-auto text-center flex flex-col items-center">
        {/* Headline */}
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#292724] tracking-tight leading-[28px] mb-3 text-balance">
          Você realmente sabe o que deveria oferecer ao seu cachorro além da ração?
        </h1>

        {/* Subheadline */}
        <p className="text-[13px] leading-[16.75px] text-[#292724]/80 mb-6 max-w-lg text-balance">
          Responda algumas perguntas sobre ele e descubra quais receitas, petiscos e opções podem fazer mais sentido para a rotina dele.
        </p>

        {/* Galeria em Quadrados: Vários pets de diferentes portes comendo saudável */}
        <div className="w-full max-w-md grid grid-cols-2 gap-2.5 sm:gap-3 mb-8">
          {petsGallery.map((pet, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-2xl overflow-hidden border border-[#292724]/10 bg-white shadow-xs"
            >
              <img
                src={pet.img}
                alt={pet.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading={idx < 2 ? "eager" : "lazy"}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#292724]/75 via-[#292724]/10 to-transparent flex flex-col justify-end p-2.5 sm:p-3 text-left">
                <span className="text-[10px] sm:text-[11px] font-bold text-white tracking-wide uppercase">
                  {pet.label}
                </span>
                <span className="text-[11px] sm:text-xs text-white/85 line-clamp-1 font-medium">
                  {pet.food}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Principal */}
        <div className="w-full max-w-md flex flex-col items-center gap-2.5">
          <button
            type="button"
            onClick={handleStart}
            className="w-full py-4 px-6 rounded-xl bg-[#3F6448] hover:bg-[#294333] active:scale-[0.99] text-white font-semibold text-base sm:text-lg shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#3F6448]/40"
          >
            <span>Começar agora</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Micro-indicadores abaixo do CTA */}
          <div className="flex items-center justify-center gap-4 text-xs text-[#292724]/65 pt-1">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#3F6448]" />
              Leva menos de 2 minutos
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3F6448]" />
              Sem cadastro prévio
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
