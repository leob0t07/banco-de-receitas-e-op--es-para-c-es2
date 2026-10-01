import React from "react";

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
  isAwareness?: boolean;
  customLabel?: string;
}

export const QuizProgress: React.FC<QuizProgressProps> = ({
  currentStep,
  totalSteps,
  isAwareness = false,
  customLabel
}) => {
  const percentage = Math.min(Math.round((currentStep / totalSteps) * 100), 100);

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-2 sm:py-3">
      <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-[#666666] mb-2">
        <span className="font-sans">
          {isAwareness ? (
            <span className="text-[#1B4332] font-bold">
              {customLabel || "Diagnóstico Personalizado"}
            </span>
          ) : (
            <>
              Etapa <span className="text-[#1B4332] font-bold">{currentStep}</span> de {totalSteps}
            </>
          )}
        </span>
        <span className="text-xs sm:text-sm font-mono font-bold text-[#1B4332]">
          {percentage}% concluído
        </span>
      </div>

      <div className="w-full h-2.5 bg-[#E2E8F0] rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-[#1B4332] rounded-full transition-all duration-300 ease-out shadow-xs"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
