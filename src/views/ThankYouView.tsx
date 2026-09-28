import React from "react";
import { CheckCircle2, Mail, ArrowRight, BookOpen, Smartphone } from "lucide-react";
import { useQuiz } from "../context/QuizContext";

interface ThankYouViewProps {
  onBackToHome: () => void;
}

export const ThankYouView: React.FC<ThankYouViewProps> = ({ onBackToHome }) => {
  const { dogSummary } = useQuiz();
  const name = dogSummary.name;

  return (
    <div className="w-full py-12 sm:py-16 min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-[#E7EEE7] text-[#3F6448] flex items-center justify-center mx-auto mb-6 shadow-xs">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-[#3F6448]">
          Pedido Confirmado com Sucesso!
        </span>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#292724] mt-2 mb-3">
          Seja bem-vindo ao 4 Patas!
        </h1>

        <p className="text-sm sm:text-base text-[#292724]/75 mb-8 leading-relaxed">
          Enviamos os seus dados de acesso diretamente para o e-mail cadastrado. Agora você já pode consultar as opções e começar a variar a rotina {dogSummary.preposition} {name}.
        </p>

        {/* Bloco de Instruções */}
        <div className="bg-white rounded-2xl border border-[#292724]/10 p-6 text-left shadow-xs space-y-4 mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#292724] pb-2 border-b border-[#292724]/8">
            Próximos Passos:
          </h2>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E7EEE7] text-[#3F6448] flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-semibold text-[#292724] block">
                1. Verifique sua caixa de entrada
              </span>
              <p className="text-xs text-[#292724]/70">
                Procure pelo e-mail com o assunto "Seu acesso ao 4 Patas". Lembre-se de checar também a pasta de spam ou promoções.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E7EEE7] text-[#3F6448] flex items-center justify-center shrink-0">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-semibold text-[#292724] block">
                2. Acesse pelo celular
              </span>
              <p className="text-xs text-[#292724]/70">
                Clique no link recebido e adicione o atalho à tela inicial do seu celular para ter uma consulta rápida sempre que for para a cozinha.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#3F6448] text-white text-sm font-semibold hover:bg-[#294333] transition-colors cursor-pointer"
        >
          <span>Retornar ao início</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
