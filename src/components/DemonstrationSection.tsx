import React from "react";
import { FolderKanban, Search, CheckSquare, ChefHat, Smartphone } from "lucide-react";

export const DemonstrationSection: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Escolha uma categoria",
      desc: "Navegue de acordo com o que você quer fazer hoje: petiscos para treino, preparos rápidos para enriquecer a tigela ou receitas caseiras cozidas.",
      icon: FolderKanban
    },
    {
      num: "02",
      title: "Encontre uma opção",
      desc: "Veja sugestões práticas com indicação de tempo de preparo, rendimento e nível de facilidade.",
      icon: Search
    },
    {
      num: "03",
      title: "Confira os ingredientes",
      desc: "Lista clara de itens comuns e acessíveis que você já tem em casa ou encontra facilmente na feira e no mercado.",
      icon: CheckSquare
    },
    {
      num: "04",
      title: "Veja o preparo",
      desc: "Instruções curtas, diretas e organizadas em passos numerados, sem termos complicados ou etapas desnecessárias.",
      icon: ChefHat
    },
    {
      num: "05",
      title: "Consulte quando precisar",
      desc: "Acesse em qualquer momento pelo celular direto da cozinha, sem precisar imprimir nem guardar papéis.",
      icon: Smartphone
    }
  ];

  return (
    <section className="w-full py-12 sm:py-16 bg-[#FAF8F4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-semibold text-[#3F6448] tracking-wider uppercase">
            Como Funciona
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#292724] mt-2">
            Veja como é simples encontrar uma opção
          </h2>
          <p className="text-sm sm:text-base text-[#292724]/75 mt-3">
            O 4 Patas foi desenhado para você abrir, encontrar o que precisa em segundos e preparar sem complicação.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl p-6 border border-[#292724]/8 shadow-xs flex flex-col justify-between ${
                  idx === 4 ? "sm:col-span-2 md:col-span-1" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-[#3F6448] bg-[#E7EEE7] px-2 py-0.5 rounded-md">
                      Passo {step.num}
                    </span>
                    <Icon className="w-5 h-5 text-[#3F6448]" />
                  </div>
                  <h3 className="text-base font-serif font-semibold text-[#292724] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#292724]/70 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
