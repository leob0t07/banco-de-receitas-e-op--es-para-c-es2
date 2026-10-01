import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "Como funciona a entrega do Plano Personalizado?",
      answer: "O acesso é 100% digital e imediato. Logo após a confirmação do pagamento, você recebe um e-mail exclusivo com o link de acesso ao seu portal, podendo começar a aplicar no mesmo instante."
    },
    {
      question: "Posso acessar pelo celular direto na cozinha?",
      answer: "Sim, perfeitamente. O programa foi desenvolvido com foco prioritário em smartphones e tablets. As fichas de porções e preparos são diretas, práticas e fáceis de consultar enquanto você serve o prato."
    },
    {
      question: "Preciso cozinhar por horas ou ter ingredientes caros?",
      answer: "Não! O maior foco do Plano de Nutrição Sob Medida é a praticidade real. Os toppers e misturas levam entre 3 e 5 minutos para serem preparados, utilizando ingredientes comuns e acessíveis que você já tem em casa."
    },
    {
      question: "O plano é adaptado para o porte e idade do meu cão?",
      answer: "Sim. Todas as orientações, tabelas de porções e densidades nutricionais consideram o porte físico, a fase da vida e os sinais biológicos informados durante o questionário."
    },
    {
      question: "O pagamento é único ou tem mensalidade?",
      answer: "O pagamento é único, no valor promocional de R$ 9,90. Não existem assinaturas, mensalidades nem cobranças ocultas posteriores. O seu acesso ao material é vitalício."
    },
    {
      question: "E se o meu cão não se adaptar?",
      answer: "Você conta com a nossa Garantia Incondicional de 7 dias. Se dentro desse período você achar que o plano não facilitou a sua rotina ou que seu cão não amou as opções, basta solicitar o reembolso para receber 100% do valor de volta."
    }
  ];

  const toggle = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <section className="w-full py-10 sm:py-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold text-[#1B4332] tracking-wider uppercase">
            Dúvidas Comuns
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E293B] mt-1.5">
            Perguntas Frequentes
          </h2>
          <p className="text-sm text-[#666666] mt-2">
            Tudo o que você precisa saber sobre o Plano de Alimentação Personalizada.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border-2 overflow-hidden transition-all duration-200 ${
                  isOpen
                    ? "border-[#1B4332] shadow-[0_4px_16px_rgba(27,67,50,0.08)]"
                    : "border-[#E2E8F0] hover:border-[#1B4332]/40 shadow-xs"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4332]"
                  aria-expanded={isOpen}
                >
                  <span className={`text-sm sm:text-base font-bold transition-colors ${
                    isOpen ? "text-[#1B4332]" : "text-[#1E293B]"
                  }`}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#1B4332] transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-[#666666] leading-relaxed border-t border-[#E2E8F0]/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
