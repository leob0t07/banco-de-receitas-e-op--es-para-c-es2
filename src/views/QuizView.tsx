import React, { useState } from "react";
import { QUIZ_CONFIG, QuizQuestionOption } from "../config/funnel.config";
import { useQuiz } from "../context/QuizContext";
import { QuizProgress } from "../components/QuizProgress";
import { QuizProcessing } from "../components/QuizProcessing";
import { BreedAutocomplete } from "../components/BreedAutocomplete";
import { LifeStageAwareness } from "../components/LifeStageAwareness";
import { trackEvent } from "../utils/tracking";
import { ArrowRight, Check, Sparkles, Dog, Heart, Flame, ShieldAlert } from "lucide-react";

interface QuizViewProps {
  onFinishQuiz: () => void;
  onBackToHome: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onFinishQuiz, onBackToHome }) => {
  const { answers, setAnswer, currentStep, setCurrentStep } = useQuiz();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAwareness, setShowAwareness] = useState(false);
  const [nameError, setNameError] = useState(false);

  const totalSteps = QUIZ_CONFIG.length;
  const currentQuestion = QUIZ_CONFIG[currentStep - 1];

  const dogName = answers.dogName.trim();

  // Substitui [NOME] e pronomes dinamicamente no título e microcopy
  const formatText = (text: string) => {
    const isFemea = answers.dogGender === "femea";
    return text
      .replace(/\[NOME\]/g, dogName || (isFemea ? "sua cachorrinha" : "seu cachorro"))
      .replace(/\[ELE_ELA\]/g, isFemea ? "ela" : "ele")
      .replace(/\[DELE_DELA\]/g, isFemea ? "dela" : "dele")
      .replace(/\[O_A\]/g, isFemea ? "a" : "o")
      .replace(/\[DO_DA\]/g, isFemea ? "da" : "do");
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Inicia tela de processamento realista
      trackEvent("QuizComplete", {
        dogName: answers.dogName,
        dogBreed: answers.dogBreed,
        dogGender: answers.dogGender,
        dogSize: answers.dogSize,
        dogAge: answers.lifeStage,
        feedingType: answers.feedingType,
        mainGoal: answers.mainGoal
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
      step: 1,
      questionKey: "dogName",
      answer: dogName
    });
    handleNextStep();
  };

  const handleSingleSelect = (optionValue: string) => {
    setAnswer(currentQuestion.key as keyof typeof answers, optionValue as never);
    trackEvent("QuizQuestionAnswered", {
      step: currentStep,
      questionKey: currentQuestion.key,
      answer: optionValue
    });

    if (currentQuestion.key === "lifeStage") {
      // Pequeno feedback visual e exibe a tela de conscientização dinâmica
      setTimeout(() => {
        setShowAwareness(true);
      }, 180);
    } else {
      // Pequeno feedback visual antes de avançar para fluidez agradável
      setTimeout(() => {
        handleNextStep();
      }, 180);
    }
  };

  const handleMultipleToggle = (optionValue: string) => {
    const currentList = Array.isArray(answers.painPoints) ? [...answers.painPoints] : [];
    const index = currentList.indexOf(optionValue);
    if (index > -1) {
      currentList.splice(index, 1);
    } else {
      currentList.push(optionValue);
    }
    setAnswer("painPoints", currentList);
  };

  const handleMultipleSubmit = () => {
    // Permite avançar mesmo se selecionou 0 ou mais
    trackEvent("QuizQuestionAnswered", {
      step: currentStep,
      questionKey: "painPoints",
      answer: answers.painPoints
    });
    handleNextStep();
  };

  const handleGoBack = () => {
    if (showAwareness) {
      setShowAwareness(false);
      return;
    }
    if (currentStep === 5) {
      // Se estiver na pergunta 5 (sexo) e voltar, retorna à tela de conscientização
      setShowAwareness(true);
      setCurrentStep(4);
      return;
    }
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBackToHome();
    }
  };

  if (isProcessing) {
    return (
      <QuizProcessing
        dogName={answers.dogName}
        onComplete={onFinishQuiz}
      />
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col justify-between py-4 sm:py-8">
      {/* Barra de Progresso no Topo */}
      <QuizProgress
        currentStep={currentStep}
        totalSteps={totalSteps}
        isAwareness={showAwareness}
        customLabel={`Momento Importante · ${dogName || "Seu cachorro"}`}
      />

      {/* Conteúdo Central: Tela de Conscientização ou Pergunta do Quiz */}
      {showAwareness ? (
        <div className="flex-1 max-w-xl w-full mx-auto px-4 flex flex-col justify-center my-4 sm:my-6">
          <LifeStageAwareness
            dogName={answers.dogName}
            dogBreed={answers.dogBreed}
            dogSize={answers.dogSize}
            lifeStage={answers.lifeStage}
            onContinue={() => {
              setShowAwareness(false);
              setCurrentStep(5);
            }}
          />
        </div>
      ) : (
        <div className="flex-1 max-w-xl w-full mx-auto px-4 flex flex-col justify-center my-4 sm:my-8">
          {/* Microcopy de Reforço Positivo / Continuidade */}
          {currentQuestion.microcopy && (
            <div className="flex items-center gap-1.5 text-xs text-[#3F6448] font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>{formatText(currentQuestion.microcopy)}</span>
            </div>
          )}

          {/* Título da Pergunta */}
          <h2 className="text-xl sm:text-3xl font-serif font-bold text-[#292724] tracking-tight leading-snug mb-2 text-balance">
            {formatText(currentQuestion.title)}
          </h2>

          {/* Subtexto opcional */}
          {currentQuestion.subtext && (
            <p className="text-xs sm:text-sm text-[#292724]/70 mb-6">
              {formatText(currentQuestion.subtext)}
            </p>
          )}

          {/* Pergunta 1: Entrada de Texto (Nome do Cachorro) */}
          {currentQuestion.type === "text" && (
            <form onSubmit={handleTextSubmit} className="space-y-4 mt-2">
              <div>
                <label htmlFor="dogNameInput" className="block text-xs font-semibold uppercase tracking-wider text-[#292724]/60 mb-2">
                  Digite o nome do seu cachorro
                </label>
                <input
                  id="dogNameInput"
                  type="text"
                  autoFocus
                  placeholder={currentQuestion.placeholder || "Ex.: Thor"}
                  value={answers.dogName}
                  onChange={e => {
                    setAnswer("dogName", e.target.value);
                    if (nameError && e.target.value.trim()) {
                      setNameError(false);
                    }
                  }}
                  className={`w-full px-4 py-3.5 rounded-xl border text-base text-[#292724] bg-white transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 ${
                    nameError
                      ? "border-rose-500 focus-visible:ring-rose-400 bg-rose-50/20"
                      : "border-[#292724]/15 focus-visible:ring-[#3F6448] focus-visible:border-transparent"
                  }`}
                />
                {nameError && (
                  <p className="text-xs text-rose-600 mt-1.5 font-medium">
                    Por favor, digite o nome do seu cachorro para prosseguir.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#3F6448] hover:bg-[#294333] active:scale-[0.99] text-white font-semibold text-base shadow-xs transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3F6448]"
              >
                <span>{currentQuestion.buttonText || "Continuar"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Pergunta 2: Autocomplete de Raça */}
          {currentQuestion.type === "breed" && (
            <BreedAutocomplete
              initialValue={answers.dogBreed}
              dogName={dogName}
              onSelectBreed={breed => setAnswer("dogBreed", breed)}
              onContinue={() => {
                trackEvent("QuizQuestionAnswered", {
                  step: currentStep,
                  questionKey: "dogBreed",
                  answer: answers.dogBreed || "Não especificada"
                });
                handleNextStep();
              }}
            />
          )}

          {/* Perguntas de Escolha Única (Touch Rápido) */}
          {currentQuestion.type === "single" && currentQuestion.options && (
            <div className="space-y-2.5 mt-2">
              {currentQuestion.options.map(option => {
                const isSelected = answers[currentQuestion.key as keyof typeof answers] === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSingleSelect(option.value)}
                    className={`w-full p-4 rounded-xl text-left border transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3F6448] ${
                      isSelected
                        ? "bg-[#E7EEE7] border-[#3F6448] text-[#292724] shadow-xs"
                        : "bg-white border-[#292724]/12 hover:border-[#3F6448]/40 hover:bg-[#FAF8F4]/80 text-[#292724]"
                    }`}
                  >
                    <div>
                      <span className="text-sm sm:text-base font-semibold block leading-snug">
                        {option.label}
                      </span>
                      {option.description && (
                        <span className="text-xs text-[#292724]/65 mt-0.5 block">
                          {option.description}
                        </span>
                      )}
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "border-[#3F6448] bg-[#3F6448] text-white"
                          : "border-[#292724]/20 bg-white"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Pergunta de Múltipla Escolha com Confirmação */}
          {currentQuestion.type === "multiple" && currentQuestion.options && (
            <div className="space-y-3 mt-2">
              <div className="space-y-2">
                {currentQuestion.options.map(option => {
                  const isSelected = answers.painPoints.includes(option.value);
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleMultipleToggle(option.value)}
                      className={`w-full p-3.5 rounded-xl text-left border transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3F6448] ${
                        isSelected
                          ? "bg-[#E7EEE7] border-[#3F6448] text-[#292724]"
                          : "bg-white border-[#292724]/12 hover:border-[#292724]/25 text-[#292724]"
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-medium leading-snug">
                        {option.label}
                      </span>

                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "border-[#3F6448] bg-[#3F6448] text-white"
                            : "border-[#292724]/30 bg-white"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleMultipleSubmit}
                className="w-full mt-4 py-4 px-6 rounded-xl bg-[#3F6448] hover:bg-[#294333] active:scale-[0.99] text-white font-semibold text-base shadow-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3F6448]"
              >
                <span>{currentQuestion.buttonText || "Ver meu resultado"}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Rodapé do Quiz: Botão Voltar */}
      <div className="max-w-xl w-full mx-auto px-4 pt-4 flex justify-between items-center text-xs text-[#292724]/50">
        <button
          type="button"
          onClick={handleGoBack}
          className="hover:text-[#292724] underline underline-offset-2 py-1 cursor-pointer"
        >
          Voltar para pergunta anterior
        </button>
        <span>Respostas salvas localmente</span>
      </div>
    </div>
  );
};
