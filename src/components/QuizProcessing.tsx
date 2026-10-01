import React, { useState, useEffect } from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface QuizProcessingProps {
  dogName: string;
  dogGender?: string;
  dogSize?: string;
  lifeStage?: string;
  onComplete: () => void;
}

export const QuizProcessing: React.FC<QuizProcessingProps> = ({
  dogName,
  dogGender = "macho",
  dogSize = "medio",
  lifeStage = "adulto",
  onComplete
}) => {
  const isFemea = dogGender === "femea";
  const name = dogName.trim() || (isFemea ? "sua parceira" : "seu parceiro");
  const deArtigo = isFemea ? "da" : "do";

  const stageLabels: Record<string, string> = {
    filhote: "Filhote",
    adulto: isFemea ? "Adulta" : "Adulto",
    senior: "Sênior",
    indefinido: "Fase de vida"
  };

  const sizeLabels: Record<string, string> = {
    pequeno: "Porte Pequeno",
    medio: "Porte Médio",
    grande: "Porte Grande"
  };

  const faseVidaLabel = stageLabels[lifeStage] || "Adulto";
  const porteLabel = sizeLabels[dogSize] || "Porte Médio";

  // 4 mensagens sequenciais solicitadas no Passo 13
  const messages = [
    `Analisando a idade (${faseVidaLabel}) e o porte (${porteLabel}) ${deArtigo} ${name}...`,
    `Mapeando as carências de nutrientes e sinais de inflamação...`,
    `Calculando as porções e combinações ideais para o seu tempo de preparo...`,
    `Gerando o Plano de Alimentação Personalizada ${deArtigo} ${name}...`
  ];

  const totalDuration = 2500; // ~2.5 segundos
  const [progress, setProgress] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(pct);

      // Troca mensagem a cada 600ms
      const msgIndex = Math.min(Math.floor(elapsed / 600), messages.length - 1);
      setCurrentMessageIndex(msgIndex);

      if (elapsed < totalDuration) {
        requestAnimationFrame(frame);
      } else {
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    };

    const animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [totalDuration, onComplete, messages.length]);

  // Cálculo SVG circular
  const circleRadius = 48;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center px-4 py-8 text-center selection:bg-[#1B4332] selection:text-white">
      {/* Card Branco Centralizado com Sombra Leve CRO */}
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#1B4332]/10 p-8 sm:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col items-center text-center">
        {/* Badge Discreta */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F0F7F2] text-[#1B4332] text-xs font-bold uppercase tracking-wider mb-6 border border-[#1B4332]/15">
          <Sparkles className="w-3.5 h-3.5 text-[#1B4332]" />
          <span>Calibrando Parâmetros Biológicos</span>
        </div>

        {/* Loader Circular Animado em Verde #1B4332 com Porcentagem no Centro */}
        <div className="relative w-36 h-36 flex items-center justify-center mb-6">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
            {/* Trilha do círculo */}
            <circle
              cx="60"
              cy="60"
              r={circleRadius}
              className="text-[#E2E8F0]"
              strokeWidth="9"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Barra circular animada em Verde Nutrição Botânica (#1B4332) */}
            <circle
              cx="60"
              cy="60"
              r={circleRadius}
              className="text-[#1B4332] transition-all duration-75 ease-linear"
              strokeWidth="9"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          {/* Porcentagem Centralizada */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-[#1E293B]">
            <span className="text-3xl font-extrabold tracking-tight text-[#1B4332] font-mono">
              {Math.round(progress)}%
            </span>
            <span className="text-[11px] font-bold text-[#666666] uppercase tracking-wider mt-0.5">
              Processando
            </span>
          </div>
        </div>

        {/* Mensagem Ativa (troca a cada 600ms) */}
        <div className="min-h-[64px] flex items-center justify-center mb-4">
          <p className="text-base sm:text-lg font-bold text-[#1E293B] transition-all duration-200 text-balance leading-snug">
            {messages[currentMessageIndex]}
          </p>
        </div>

        {/* Indicadores Sequenciais de Validação */}
        <div className="w-full space-y-2.5 pt-4 border-t border-[#E2E8F0] text-left">
          {messages.map((msg, idx) => {
            const isCompleted = idx < currentMessageIndex;
            const isCurrent = idx === currentMessageIndex;

            return (
              <div
                key={idx}
                className={`flex items-center gap-2.5 text-xs transition-colors duration-200 ${
                  isCompleted
                    ? "text-[#1B4332] font-semibold"
                    : isCurrent
                    ? "text-[#1E293B] font-bold"
                    : "text-[#94A3B8]"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                ) : (
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isCurrent
                        ? "border-[#1B4332] bg-[#F0F7F2]"
                        : "border-[#CBD5E1] bg-white"
                    }`}
                  >
                    {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-[#1B4332]"></span>}
                  </div>
                )}
                <span className="truncate">{msg}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
