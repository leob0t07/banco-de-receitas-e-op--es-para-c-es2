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
  const percentage = isAwareness
    ? Math.round(((currentStep - 0.5) / totalSteps) * 100)
    : Math.min(Math.round((currentStep / totalSteps) * 100), 100);

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-2 sm:py-3">
      <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-[#292724]/70 mb-2">
        <span className="font-sans">
          {isAwareness ? (
            <span className="text-[#3F6448] font-semibold">
              {customLabel || "Momento de Reflexão"}
            </span>
          ) : (
            <>
              Pergunta <span className="text-[#3F6448] font-bold">{currentStep}</span> de {totalSteps}
            </>
          )}
        </span>
        <span className="text-xs font-mono text-[#292724]/60">{percentage}%</span>
      </div>

      <div className="w-full h-2 bg-[#E7EEE7] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#3F6448] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
