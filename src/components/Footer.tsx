import React from "react";
import { ShieldCheck } from "lucide-react";
import { PawLogo } from "./PawLogo";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#FAF8F4] border-t border-[#292724]/8 py-10 sm:py-12 mt-16 sm:mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        {/* Marca 4 Patas */}
        <div className="flex justify-center">
          <PawLogo size="sm" showText={true} />
        </div>

        {/* Aviso de responsabilidade veterinária */}
        <div className="py-2.5 px-3.5 rounded-lg bg-[#F3EDE3]/60 border border-[#292724]/6 max-w-lg mx-auto text-left sm:text-center">
          <div className="flex items-start sm:items-center justify-start sm:justify-center gap-1.5 text-[11px] font-semibold text-[#292724]/75 mb-0.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#3F6448] shrink-0 mt-0.5 sm:mt-0" />
            <span>Aviso sobre alimentação e orientação veterinária</span>
          </div>
          <p className="text-[10.5px] text-[#292724]/60 leading-normal">
            O 4 Patas é um material educativo e informativo voltado para enriquecimento de rotina, ideias de preparos caseiros e petiscos seguros. Este material não constitui prescrição nutricional clínica, diagnóstico veterinário nem substitui o acompanhamento regular de um médico veterinário de sua confiança.
          </p>
        </div>

        {/* Links editoriais e direitos */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#292724]/60">
          <span>4 Patas © {currentYear}</span>
          <span aria-hidden="true">·</span>
          <span>Acesso Digital Imediato</span>
          <span aria-hidden="true">·</span>
          <span>Pagamento Seguro</span>
        </div>

        <p className="text-[11px] text-[#292724]/50 max-w-xl mx-auto leading-normal">
          Todos os direitos reservados. O acesso aos conteúdos digitais é liberado diretamente no e-mail cadastrado logo após a confirmação do pagamento.
        </p>
      </div>
    </footer>
  );
};
