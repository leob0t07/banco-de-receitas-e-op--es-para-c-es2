import React from "react";
import { Sparkles, Clock, Layers, Zap } from "lucide-react";

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      title: "Mais variedade",
      desc: "Deixe de oferecer sempre os mesmos petiscos industriais e dê ao seu cão novas texturas e sabores seguros.",
      icon: Sparkles
    },
    {
      title: "Mais praticidade",
      desc: "Preparações simples pensadas para quem não tem horas livres para passar na cozinha.",
      icon: Clock
    },
    {
      title: "Tudo organizado",
      desc: "Em vez de dezenas de abas abertas ou receitas salvas em redes sociais, tudo fica em um único ambiente limpo.",
      icon: Layers
    },
    {
      title: "Consulta rápida",
      desc: "Acesse em segundos no celular direto da cozinha enquanto confere o que tem na sua geladeira e despensa.",
      icon: Zap
    }
  ];

  return (
    <section className="w-full py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-semibold text-[#3F6448] tracking-wider uppercase">
            Benefícios Reais
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#292724] mt-2">
            Feito para facilitar a rotina de quem cuida de um cachorro
          </h2>
          <p className="text-sm sm:text-base text-[#292724]/75 mt-3">
            Sem exageros ou promessas mágicas: apenas um acervo prático para o dia a dia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="bg-[#F3EDE3]/40 border border-[#292724]/8 rounded-2xl p-6 sm:p-7 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#292724]/8 text-[#3F6448] flex items-center justify-center shrink-0 shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-[#292724] mb-1.5">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#292724]/75 leading-relaxed">
                    {benefit.desc}
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
