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
      question: "O acesso é digital?",
      answer: "Sim. O 4 Patas é um material 100% digital. Você recebe o link de acesso exclusivo direto no seu e-mail assim que a compra for confirmada."
    },
    {
      question: "Posso acessar pelo celular?",
      answer: "Sim, perfeitamente. Toda a plataforma foi desenhada prioritariamente para celulares e tablets. Você pode consultar as fichas de receitas com facilidade direto na bancada da sua cozinha."
    },
    {
      question: "Preciso baixar algum aplicativo pesado?",
      answer: "Não. O acesso funciona direto pelo navegador de qualquer dispositivo com internet (celular, computador ou tablet). Você também pode salvar o atalho na tela inicial do seu celular como se fosse um app leve."
    },
    {
      question: "Como recebo o acesso?",
      answer: "Imediatamente após a aprovação do pagamento, você receberá um e-mail com os seus dados de acesso e as instruções para começar a explorar a biblioteca."
    },
    {
      question: "Posso consultar as receitas quando quiser?",
      answer: "Sim. O acesso ao acervo é permanente (vitalício). Não há mensalidades nem cobranças recorrentes."
    },
    {
      question: "O conteúdo é indicado para qualquer cachorro?",
      answer: "As receitas e petiscos foram elaborados com ingredientes seguros para cães saudáveis de diferentes portes e fases. Caso o seu cachorro possua alergias específicas diagnosticadas, problemas renais ou siga uma dieta clínica sob prescrição, recomendamos apresentar as receitas ao seu médico veterinário antes de introduzir novos alimentos."
    }
  ];

  const toggle = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <section className="w-full py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-semibold text-[#3F6448] tracking-wider uppercase">
            Dúvidas Comuns
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#292724] mt-2">
            Perguntas Frequentes
          </h2>
          <p className="text-sm text-[#292724]/75 mt-2">
            Respostas diretas e transparentes sobre o funcionamento do 4 Patas.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#292724]/8 overflow-hidden transition-all duration-200 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3F6448]"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-[#292724]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#3F6448] transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#292724]/80 leading-relaxed border-t border-[#292724]/5 pt-3">
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
