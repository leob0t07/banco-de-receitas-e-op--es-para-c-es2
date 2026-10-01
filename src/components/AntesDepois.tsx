import React from "react";
import { Check, X } from "lucide-react";

interface AntesDepoisProps {
  dogName?: string;
}

export const AntesDepois: React.FC<AntesDepoisProps> = ({ dogName }) => {
  const name = dogName || "seu cão";

  const antesSteps = [
    "Pesquisar dicas soltas no Google sem saber o que é tóxico ou seguro",
    "Comprar sachês e petiscos caros que o cão recusa depois de 2 dias",
    "Gastos recorrentes com consultas para coceiras, lambeduras ou fezes moles",
    "Sensação de culpa ao ver o prato intocado e o cão sem energia",
    "Horas perdidas na cozinha tentando receitas que não funcionam"
  ];

  const depoisSteps = [
    `Seguir um Plano Personalizado no celular com prescrição exata para ${name}`,
    `Aplicar toppers anti-inflamatórios em menos de 5 minutos direto no pote`,
    `${name} devora o prato inteiro em segundos, com alegria e apetite voraz`,
    "Intestino regulado com fezes firmes e pelo com brilho espelhado",
    "Economia real evitando remédios desnecessários e petiscos ultraprocessados"
  ];

  return (
    <section className="w-full py-6">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-bold text-[#1B4332] tracking-wider uppercase">
          A Diferença na Prática
        </span>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1E293B] mt-1.5">
          O impacto de uma alimentação com propósito
        </h2>
        <p className="text-xs sm:text-sm text-[#666666] mt-2">
          Veja a transformação diária entre a improvisação e um plano estruturado:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* Card Antes */}
        <div className="bg-white border-2 border-[#E2E8F0] rounded-2xl p-6 relative shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between pb-3.5 border-b border-[#E2E8F0] mb-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">
              Sem o Plano Personalizado
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
              <X className="w-3.5 h-3.5" />
              Improvisação & Gastos
            </span>
          </div>

          <ol className="space-y-3.5">
            {antesSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ✕
                </div>
                <span className="text-xs sm:text-sm text-[#1E293B] leading-snug">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Card Depois */}
        <div className="bg-[#F0F7F2] border-2 border-[#1B4332] rounded-2xl p-6 relative shadow-[0_4px_20px_rgba(27,67,50,0.1)]">
          <div className="flex items-center justify-between pb-3.5 border-b border-[#1B4332]/15 mb-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332]">
              Com o Plano Personalizado
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1B4332] bg-white px-2.5 py-1 rounded-full border border-[#1B4332]/20">
              <Check className="w-3.5 h-3.5" />
              Vitalidade & Longevidade
            </span>
          </div>

          <ol className="space-y-3.5">
            {depoisSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#1B4332] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ✓
                </div>
                <span className="text-xs sm:text-sm text-[#1E293B] font-semibold leading-snug">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
