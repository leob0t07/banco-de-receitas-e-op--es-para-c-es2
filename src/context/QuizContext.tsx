import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react";
import { RESULT_PROFILES, ResultProfileDetails } from "../config/funnel.config";
import { trackEvent } from "../utils/tracking";

export interface QuizAnswers {
  dogName: string;
  dogBreed: string;
  dogGender: string;
  dogSize: string;
  lifeStage: string;
  activityLevel: string;
  feedingType: string;
  mainGoal: string;
  painPoints: string[];
}

const DEFAULT_ANSWERS: QuizAnswers = {
  dogName: "",
  dogBreed: "",
  dogGender: "macho",
  dogSize: "",
  lifeStage: "",
  activityLevel: "",
  feedingType: "",
  mainGoal: "",
  painPoints: []
};

const STORAGE_KEY = "banco_caes_funnel_state_v1";

interface QuizContextType {
  answers: QuizAnswers;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  setAnswer: <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => void;
  resetQuiz: () => void;
  isComplete: boolean;
  computedProfile: ResultProfileDetails;
  formattedNarrative: string;
  dogSummary: {
    name: string;
    breedLabel: string;
    genderLabel: string;
    pronoun: string;
    possessive: string;
    article: string;
    preposition: string;
    sizeLabel: string;
    stageLabel: string;
    routineLabel: string;
    dietLabel: string;
    goalLabel: string;
  };
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [answers, setAnswers] = useState<QuizAnswers>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_ANSWERS, ...parsed };
      }
    } catch {
      // LocalStorage access fallback
    }
    return DEFAULT_ANSWERS;
  });

  const [currentStep, setCurrentStep] = useState<number>(1);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      // ignore
    }
  }, [answers]);

  const setAnswer = <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => {
    setAnswers(prev => {
      const next = { ...prev, [key]: value };
      return next;
    });
  };

  const resetQuiz = () => {
    setAnswers(DEFAULT_ANSWERS);
    setCurrentStep(1);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const isComplete = Boolean(
    answers.dogName.trim() &&
    answers.dogGender &&
    answers.dogSize &&
    answers.lifeStage &&
    answers.activityLevel &&
    answers.feedingType &&
    answers.mainGoal
  );

  // Mapeamento dinâmico de perfil conforme Seção 17 & 44
  const profileKey = useMemo(() => {
    switch (answers.mainGoal) {
      case "variedade":
        return "variedade";
      case "receitas":
        return "receitas";
      case "petiscos":
        return "petiscos";
      case "organizar":
      case "praticidade":
        return "praticidade";
      default:
        return "variedade";
    }
  }, [answers.mainGoal]);

  const computedProfile = RESULT_PROFILES[profileKey] || RESULT_PROFILES.variedade;

  // Rótulos amigáveis para exibição na ficha do cão
  const dogSummary = useMemo(() => {
    const dogName = answers.dogName.trim() || "Seu cachorro";
    const isFemea = answers.dogGender === "femea";

    const sizeLabels: Record<string, string> = {
      pequeno: "Pequeno (até 10 kg)",
      medio: "Médio (10 a 25 kg)",
      grande: "Grande (acima de 25 kg)"
    };

    const stageLabels: Record<string, string> = {
      filhote: "Filhote",
      adulto: isFemea ? "Adulta" : "Adulto",
      senior: "Sênior",
      indefinido: "Não informado"
    };

    const routineLabels: Record<string, string> = {
      tranquilo: isFemea ? "Mais tranquila" : "Mais tranquilo",
      ativo: isFemea ? "Ativa" : "Ativo",
      muito_ativo: isFemea ? "Muito ativa" : "Muito ativo",
      varia: "Rotina variada"
    };

    const dietLabels: Record<string, string> = {
      racao: "Ração",
      mista: "Ração + comida caseira",
      caseira: "Principalmente caseira",
      natural: "Alimentação natural",
      outra: "Outro formato"
    };

    const goalLabels: Record<string, string> = {
      variedade: "Mais variedade na rotina",
      receitas: "Aprender receitas caseiras",
      petiscos: "Petiscos e agrados seguros",
      organizar: "Organizar melhor a rotina",
      praticidade: "Praticidade e rapidez"
    };

    const breedLabel = answers.dogBreed?.trim() || "Não especificada";

    return {
      name: dogName,
      breedLabel,
      genderLabel: isFemea ? "Fêmea" : "Macho",
      pronoun: isFemea ? "ela" : "ele",
      possessive: isFemea ? "dela" : "dele",
      article: isFemea ? "a" : "o",
      preposition: isFemea ? "da" : "do",
      sizeLabel: sizeLabels[answers.dogSize] || "Médio",
      stageLabel: stageLabels[answers.lifeStage] || (isFemea ? "Adulta" : "Adulto"),
      routineLabel: routineLabels[answers.activityLevel] || (isFemea ? "Ativa" : "Ativo"),
      dietLabel: dietLabels[answers.feedingType] || "Ração e complementos",
      goalLabel: goalLabels[answers.mainGoal] || "Mais opções para o dia a dia"
    };
  }, [answers]);

  // Construção do parágrafo dinâmico narrativo conforme Seção 44
  const formattedNarrative = useMemo(() => {
    const name = answers.dogName.trim() || "seu cachorro";
    const isFemea = answers.dogGender === "femea";
    const article = isFemea ? "a" : "o";
    const stage = answers.lifeStage === "filhote"
      ? "filhote"
      : answers.lifeStage === "senior"
      ? "sênior"
      : isFemea ? "adulta" : "adulto";
    const breedText =
      answers.dogBreed && answers.dogBreed !== "Não sei a raça"
        ? ` (${answers.dogBreed})`
        : "";
    const routine = answers.activityLevel === "tranquilo"
      ? (isFemea ? "mais calma" : "mais calmo")
      : answers.activityLevel === "muito_ativo"
      ? (isFemea ? "muito ativa" : "muito ativo")
      : (isFemea ? "ativa" : "ativo");
    const diet = answers.feedingType === "racao"
      ? "ração"
      : answers.feedingType === "mista"
      ? "ração + comida caseira"
      : answers.feedingType === "natural"
      ? "alimentação natural"
      : "comida caseira";

    const noun = isFemea ? "uma cachorrinha" : "um cachorro";

    return `Como você contou que ${article} ${name}${breedText} é ${noun} ${stage}, com ritmo ${routine} e que atualmente consome ${diet}, o caminho mais inteligente para a sua rotina é começar pelas opções que trazem mais organização e praticidade, sem precisar inventar do zero toda semana.`;
  }, [answers]);

  return (
    <QuizContext.Provider
      value={{
        answers,
        currentStep,
        setCurrentStep,
        setAnswer,
        resetQuiz,
        isComplete,
        computedProfile,
        formattedNarrative,
        dogSummary
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz deve ser utilizado dentro de um QuizProvider");
  }
  return context;
};
