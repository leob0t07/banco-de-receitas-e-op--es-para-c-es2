import React, { useState, useEffect } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

interface QuizProcessingProps {
  dogName: string;
  onComplete: () => void;
}

export const QuizProcessing: React.FC<QuizProcessingProps> = ({ dogName, onComplete }) => {
  const name = dogName.trim() || "seu cachorro";

  const steps = [
    "Analisando as respostas...",
    `Identificando o perfil do ${name}...`,
    "Selecionando as opções mais relevantes...",
    "Preparando seu resultado..."
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    // Duração total calibrada para ~4 segundos
    const stepDuration = 950;
    const interval = setInterval(() => {
      setCurrentStepIndex(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 1150);
          return prev;
        }
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [steps.length, onComplete]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12 text-center">
      <div className="w-full max-w-md mx-auto p-8 rounded-2xl bg-white/70 border border-[#292724]/8 shadow-xs">
        {/* Animação de Carregamento Limpa */}
        <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-3 border-[#E7EEE7]"></div>
          <div className="absolute inset-0 rounded-full border-3 border-[#3F6448] border-t-transparent animate-spin"></div>
          <Loader2 className="w-6 h-6 text-[#3F6448] animate-pulse" />
        </div>

        {/* Texto Dinâmico de Etapas */}
        <h2 className="text-xl sm:text-2xl font-serif font-semibold text-[#292724] mb-3 transition-all duration-200">
          {steps[currentStepIndex]}
        </h2>

        <p className="text-xs sm:text-sm text-[#292724]/70 mb-6">
          Organizando as categorias e receitas que mais combinam com a rotina de vocês.
        </p>

        {/* Indicador de Etapas */}
        <div className="space-y-2 text-left pt-2 border-t border-[#292724]/6">
          {steps.map((stepText, idx) => {
            const isFinished = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={idx}
                className={`flex items-center gap-2.5 text-xs transition-opacity duration-200 ${
                  isFinished
                    ? "text-[#3F6448] font-medium"
                    : isCurrent
                    ? "text-[#292724] font-semibold"
                    : "text-[#292724]/30"
                }`}
              >
                {isFinished ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3F6448] shrink-0" />
                ) : (
                  <div
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                      isCurrent
                        ? "border-[#3F6448] bg-[#E7EEE7]"
                        : "border-[#292724]/20"
                    }`}
                  >
                    {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-[#3F6448]"></span>}
                  </div>
                )}
                <span>{stepText}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
