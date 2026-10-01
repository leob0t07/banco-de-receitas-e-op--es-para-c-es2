import React from "react";
import { ArrowLeft } from "lucide-react";
import { PawLogo } from "./PawLogo";

interface HeaderProps {
  onBack?: () => void;
  showBack?: boolean;
  currentRoute?: string;
  onNavigate?: (route: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onBack,
  showBack = false,
  currentRoute = "/",
  onNavigate
}) => {
  return (
    <header className="w-full bg-[#FAF8F5]/90 backdrop-blur-sm border-b border-[#1B4332]/10 sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Lado Esquerdo: Voltar ou Espaço */}
        <div className="w-24 flex items-center">
          {showBack && onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#666666] hover:text-[#1E293B] transition-colors py-1.5 pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4332]"
              aria-label="Voltar para a etapa anterior"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-[#1B4332] font-bold tracking-tight">
              <span className="w-2 h-2 rounded-full bg-[#1B4332]"></span>
              <span>Nutrição Pet</span>
            </div>
          )}
        </div>

        {/* Zona Central: Marca / Wordmark Editorial */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => onNavigate && onNavigate("/")}
            className="group cursor-pointer focus-visible:outline-none"
            aria-label="Ir para página inicial do 4 Patas"
          >
            <PawLogo size="sm" showText={true} />
          </button>
        </div>

        {/* Lado Direito: Ação discreta ou Indicador */}
        <div className="w-24 flex justify-end items-center">
          {currentRoute === "/resultado" && onNavigate && (
            <button
              onClick={() => onNavigate("/oferta")}
              className="text-xs font-bold text-[#FF6B35] hover:text-[#E85D04] transition-colors py-1"
            >
              Ver plano →
            </button>
          )}
          {currentRoute === "/oferta" && onNavigate && (
            <button
              onClick={() => onNavigate("/checkout")}
              className="text-xs font-bold text-[#FF6B35] hover:text-[#E85D04] transition-colors py-1"
            >
              Liberar
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
