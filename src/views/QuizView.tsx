import React, { useState } from "react";
import { QUIZ_CONFIG, QuizQuestionOption } from "../config/funnel.config";
import { useQuiz } from "../context/QuizContext";
import { QuizProgress } from "../components/QuizProgress";
import { QuizProcessing } from "../components/QuizProcessing";
import { BreedAutocomplete } from "../components/BreedAutocomplete";
import { LifeStageAwareness } from "../components/LifeStageAwareness";
import { trackEvent } from "../utils/tracking";
import { ArrowRight, Check, Sparkles } from "lucide-react";

interface QuizViewProps {
  onFinishQuiz: () => void;
  onBackToHome: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onFinishQuiz, onBackToHome }) => {
  const { answers, setAnswer, currentStep, setCurrentStep, formatQuizText, grammar } = useQuiz();
  const [isProcessing, setIsProcessing] = useState(false);
  const [nameError, setNameError] = useState(false);

  // Total de etapas no questionário: 12 etapas
  // (1 a 5: Identificação, 6: Conscientização, 7 a 9: Rotina e Sintomas, 10 a 12: Empilhamento de Valor)
  const totalSteps = 12;

  // A etapa 6 é a tela de conscientização dinâmica solicitada
  const isAwarenessStep = currentStep === 6;

  // Pega a configuração da pergunta quando não for a etapa de conscientização
  const currentQuestion = QUIZ_CONFIG.find(q => q.id === currentStep);

  const dogName = answers.dogName.trim();

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Inicia Passo 13: Tela de Processamento Animada
      trackEvent("QuizComplete", {
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
      setIsProcessing(true);
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dogName) {
      setNameError(true);
      return;
    }
    setNameError(false);
    trackEvent("QuizQuestionAnswered", {
      step: 2,
      questionKey: "dogName",
      answer: dogName
    });
    handleNextStep();
  };

  const handleSingleSelect = (optionValue: string) => {
    if (!currentQuestion) return;

    setAnswer(currentQuestion.key as keyof typeof answers, optionValue as never);
    trackEvent("QuizQuestionAnswered", {
      step: currentStep,
      questionKey: currentQuestion.key,
      answer: optionValue
    });

    // Feedback visual suave de 200ms antes do avanço para conforto visual
    setTimeout(() => {
      handleNextStep();
    }, 200);
  };

  const handleMultipleToggle = (optionValue: string) => {
    const key = (currentQuestion?.key || "symptoms") as "symptoms" | "painPoints";
    const currentList = Array.isArray(answers[key]) ? [...((answers[key] as string[]) || [])] : [];

    if (optionValue === "nenhum_prevencao") {
      // Opção exclusiva: desmarca as outras e marca apenas essa
      const nextList = currentList.includes("nenhum_prevencao") ? [] : ["nenhum_prevencao"];
      setAnswer(key, nextList as never);
      return;
    }

    // Se selecionar qualquer outra opção, remove "nenhum_prevencao"
    const filteredList = currentList.filter(item => item !== "nenhum_prevencao");
    const index = filteredList.indexOf(optionValue);
    if (index > -1) {
      filteredList.splice(index, 1);
    } else {
      filteredList.push(optionValue);
    }
    setAnswer(key, filteredList as never);
  };

  const handleMultipleSubmit = () => {
    const key = (currentQuestion?.key || "symptoms") as "symptoms" | "painPoints";
    const currentList = Array.isArray(answers[key]) ? answers[key] : [];
    if (currentList.length === 0) return;

    trackEvent("QuizQuestionAnswered", {
      step: currentStep,
      questionKey: key,
      answer: currentList
    });
    handleNextStep();
  };

  const handleGoBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onBackToHome();
    }
  };

  // PASSO 13: TELA DE PROCESSAMENTO ANIMADA
  if (isProcessing) {
    return (
      <QuizProcessing
        dogName={answers.dogName}
        dogGender={answers.dogGender}
        dogSize={answers.dogSize}
        lifeStage={answers.lifeStage}
        onComplete={onFinishQuiz}
      />
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#FAF8F5] flex flex-col justify-between py-4 sm:py-8 selection:bg-[#1B4332] selection:text-white">
      {/* 1. Barra de Progresso no Topo em Verde Nutrição Botânica (#1B4332) */}
      <QuizProgress
        currentStep={currentStep}
        totalSteps={totalSteps}
        isAwareness={isAwarenessStep}
        customLabel={`Diagnóstico Nutricional · ${grammar.artigoCap} ${grammar.nome}`}
      />

      {/* 2. Container Central com Card Branco Puro e Sombra CRO */}
      <div className="flex-1 max-w-xl w-full mx-auto px-4 flex flex-col justify-center my-4 sm:my-6 transition-all duration-300 ease-out">
        {/* PASSO 6: TELA DE CONSCIENTIZAÇÃO DINÂMICA */}
        {isAwarenessStep ? (
          <LifeStageAwareness
            dogName={answers.dogName}
            dogGender={answers.dogGender}
            dogBreed={answers.dogBreed}
            dogSize={answers.dogSize}
            lifeStage={answers.lifeStage}
            onContinue={handleNextStep}
          />
        ) : currentQuestion ? (
          <div className="w-full bg-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[rgba(27,67,50,0.08)]">
            {/* Microcopy de Reforço Positivo / Continuidade */}
            {currentQuestion.microcopy && (
              <div className="flex items-center gap-1.5 text-xs text-[#1B4332] font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>{formatQuizText(currentQuestion.microcopy)}</span>
              </div>
            )}

            {/* Título da Pergunta em Verde Nutrição Botânica (#1B4332) */}
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1B4332] tracking-tight leading-snug mb-2 text-balance">
              {formatQuizText(currentQuestion.title)}
            </h2>

            {/* Subtexto opcional em Cinza Neutro (#666666) */}
            {currentQuestion.subtext && (
              <p className="text-xs sm:text-sm text-[#666666] mb-6 leading-relaxed">
                {formatQuizText(currentQuestion.subtext)}
              </p>
            )}

            {/* ========================================================
                PASSO 1: SEXO DO CÃO (Cards Grandes: Macho / Fêmea)
                ======================================================== */}
            {currentQuestion.key === "dogGender" && currentQuestion.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {currentQuestion.options.map(option => {
                  const isSelected = answers.dogGender === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSingleSelect(option.value)}
                      className={`p-6 rounded-2xl border-2 text-center flex flex-col items-center justify-center gap-3 transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-[#F0F7F2] border-[#1B4332] text-[#1E293B] shadow-[0_4px_20px_rgba(27,67,50,0.12)] scale-[1.02]"
                          : "bg-white border-[#E2E8F0] hover:border-[#1B4332]/50 hover:bg-[#FAF8F5] text-[#1E293B] shadow-[0_4px_16px_rgba(0,0,0,0.03)]"
                      }`}
                    >
                      <span className="text-4xl sm:text-5xl select-none" role="img" aria-label={option.label}>
                        {option.icon}
                      </span>
                      <div>
                        <span className="text-lg sm:text-xl font-bold block text-[#1E293B]">
                          {option.label}
                        </span>
                        {option.description && (
                          <span className="text-xs text-[#666666] mt-1 block">
                            {option.description}
                          </span>
                        )}
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 transition-colors ${
                          isSelected
                            ? "border-[#1B4332] bg-[#1B4332] text-white"
                            : "border-[#E2E8F0] bg-white"
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* ========================================================
                PASSO 2: NOME DO CÃO (Input Texto + Botão Laranja Coral)
                ======================================================== */}
            {currentQuestion.type === "text" && (
              <form onSubmit={handleTextSubmit} className="space-y-4 mt-2">
                <div>
                  <label
                    htmlFor="dogNameInput"
                    className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-2"
                  >
                    Nome do seu cão
                  </label>
                  <input
                    id="dogNameInput"
                    type="text"
                    autoFocus
                    placeholder={currentQuestion.placeholder || "Ex: Thor, Mel, Bob..."}
                    value={answers.dogName}
                    onChange={e => {
                      setAnswer("dogName", e.target.value);
                      if (nameError && e.target.value.trim()) {
                        setNameError(false);
                      }
                    }}
                    className={`w-full p-4 rounded-2xl border-2 text-base sm:text-lg font-medium text-[#1E293B] bg-white placeholder:text-[#94A3B8] transition-all duration-200 outline-none ${
                      nameError
                        ? "border-rose-400 ring-2 ring-rose-100 bg-rose-50/20"
                        : "border-[#E2E8F0] focus:border-[#1B4332] focus:ring-4 focus:ring-[#1B4332]/10"
                    }`}
                  />
                  {nameError && (
                    <p className="text-xs text-rose-600 font-semibold mt-1.5 flex items-center gap-1">
                      Por favor, digite o nome do seu cachorro para prosseguir.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-8 rounded-2xl bg-[#FF6B35] hover:bg-[#E85D04] active:scale-[0.99] text-white font-bold text-base sm:text-lg shadow-lg shadow-[#FF6B35]/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF6B35]/30"
                >
                  <span>Avançar →</span>
                </button>
              </form>
            )}

            {/* ========================================================
                PASSO 5: RAÇA (Input Autocomplete Flexível + Cards Rápidos)
                ======================================================== */}
            {currentQuestion.type === "breed" && (
              <div className="space-y-4 mt-2">
                <BreedAutocomplete
                  initialValue={answers.dogBreed}
                  dogName={answers.dogName}
                  onSelectBreed={(breed: string) => {
                    setAnswer("dogBreed", breed);
                  }}
                  onContinue={handleNextStep}
                />
              </div>
            )}

            {/* ========================================================
                PASSOS SINGLE-CHOICE: 3, 4, 7, 8, 10, 11, 12
                ======================================================== */}
            {currentQuestion.type === "single" && currentQuestion.key !== "dogGender" && currentQuestion.options && (
              <div className="space-y-3 mt-2">
                {currentQuestion.options.map(option => {
                  const currentValue = answers[currentQuestion.key as keyof typeof answers];
                  const isSelected = currentValue === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSingleSelect(option.value)}
                      className={`w-full p-4 rounded-2xl text-left border-2 transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${
                        isSelected
                          ? "bg-[#F0F7F2] border-[#1B4332] text-[#1E293B] shadow-[0_4px_20px_rgba(27,67,50,0.12)] scale-[1.01]"
                          : "bg-white border-[#E2E8F0] hover:border-[#1B4332]/50 hover:bg-[#FAF8F5] text-[#1E293B] shadow-[0_4px_16px_rgba(0,0,0,0.03)]"
                      }`}
                    >
                      <div className="flex-1">
                        <span className="text-sm sm:text-base font-bold block text-[#1E293B] leading-snug">
                          {formatQuizText(option.label)}
                        </span>
                        {option.description && (
                          <span className="text-xs sm:text-sm text-[#666666] mt-0.5 block leading-normal">
                            {formatQuizText(option.description)}
                          </span>
                        )}
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? "border-[#1B4332] bg-[#1B4332] text-white"
                            : "border-[#E2E8F0] bg-white"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* ========================================================
                PASSO 9: MÚLTIPLA ESCOLHA (Sinais no corpo e comportamento)
                ======================================================== */}
            {currentQuestion.type === "multiple" && currentQuestion.options && (
              <div className="space-y-4 mt-2">
                <div className="space-y-2.5">
                  {currentQuestion.options.map(option => {
                    const key = (currentQuestion.key || "symptoms") as "symptoms" | "painPoints";
                    const currentValues = (answers[key] as string[]) || [];
                    const isSelected = currentValues.includes(option.value);
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleMultipleToggle(option.value)}
                        className={`w-full p-4 rounded-2xl text-left border-2 transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${
                          isSelected
                            ? "bg-[#F0F7F2] border-[#1B4332] text-[#1E293B] shadow-[0_4px_20px_rgba(27,67,50,0.12)]"
                            : "bg-white border-[#E2E8F0] hover:border-[#1B4332]/40 hover:bg-[#FAF8F5] text-[#1E293B] shadow-[0_4px_16px_rgba(0,0,0,0.03)]"
                        }`}
                      >
                        <div className="flex-1">
                          <span className="text-xs sm:text-sm font-bold block leading-snug text-[#1E293B]">
                            {formatQuizText(option.label)}
                          </span>
                          {option.description && (
                            <span className="text-xs text-[#666666] mt-0.5 block leading-normal">
                              {formatQuizText(option.description)}
                            </span>
                          )}
                        </div>

                        <div
                          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? "border-[#1B4332] bg-[#1B4332] text-white"
                              : "border-[#E2E8F0] bg-white"
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {(() => {
                  const key = (currentQuestion.key || "symptoms") as "symptoms" | "painPoints";
                  const currentValues = (answers[key] as string[]) || [];
                  const hasSelection = currentValues.length > 0;

                  return (
                    <div className="pt-2">
                      <button
                        type="button"
                        disabled={!hasSelection}
                        onClick={handleMultipleSubmit}
                        className={`w-full py-4 px-8 rounded-2xl font-bold text-base sm:text-lg transition-all duration-200 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-4 ${
                          hasSelection
                            ? "bg-[#FF6B35] hover:bg-[#E85D04] active:scale-[0.99] text-white shadow-lg shadow-[#FF6B35]/25 cursor-pointer focus-visible:ring-[#FF6B35]/30"
                            : "bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed shadow-none"
                        }`}
                      >
                        <span>{currentQuestion.buttonText || "CONTINUAR →"}</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                      {!hasSelection && (
                        <p className="text-xs text-center text-[#666666] mt-2">
                          Selecione pelo menos 1 opção para continuar
                        </p>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* 3. Rodapé do Quiz com Botão Voltar */}
      <div className="max-w-xl w-full mx-auto px-4 pt-4 pb-2 flex justify-between items-center text-xs text-[#666666]">
        <button
          type="button"
          onClick={handleGoBack}
          className="hover:text-[#1E293B] underline underline-offset-4 py-1 cursor-pointer font-medium"
        >
          ← Voltar para etapa anterior
        </button>
        <span>Privacidade e dados protegidos</span>
      </div>
    </div>
  );
};
