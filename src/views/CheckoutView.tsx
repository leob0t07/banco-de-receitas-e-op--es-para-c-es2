import React, { useState, useEffect } from "react";
import { useQuiz } from "../context/QuizContext";
import { PRODUCT_CONFIG, BUMP_CONFIG, GUARANTEE_CONFIG } from "../config/funnel.config";
import { OrderBumpCard } from "../components/OrderBumpCard";
import { trackEvent } from "../utils/tracking";
import {
  Lock,
  ShieldCheck,
  Check,
  ArrowRight,
  Sparkles,
  CreditCard,
  QrCode,
  AlertCircle
} from "lucide-react";

interface CheckoutViewProps {
  onOrderSuccess: () => void;
  onGoToUpsell: () => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({ onOrderSuccess, onGoToUpsell }) => {
  const { answers, dogSummary, grammar } = useQuiz();

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [selectedBumpIds, setSelectedBumpIds] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "cartao">("pix");
  const [errors, setErrors] = useState<{ name?: boolean; email?: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    trackEvent("BeginCheckout", {
      totalPrice: PRODUCT_CONFIG.priceNumeric,
      dogName: answers.dogName,
      dogGender: answers.dogGender
    });
  }, [answers.dogName, answers.dogGender]);

  const toggleBump = (bumpId: string) => {
    const isAdding = !selectedBumpIds.includes(bumpId);
    setSelectedBumpIds(prev =>
      isAdding ? [...prev, bumpId] : prev.filter(id => id !== bumpId)
    );

    trackEvent("BumpSelected", {
      bumpId,
      bumpSelected: isAdding
    });
  };

  // Cálculo dinâmico do total
  const bumpsTotal = selectedBumpIds.reduce((acc, id) => {
    const bump = BUMP_CONFIG.find(b => b.id === id);
    return acc + (bump ? bump.priceNumeric : 0);
  }, 0);

  const grandTotalNumeric = PRODUCT_CONFIG.priceNumeric + bumpsTotal;
  const formattedTotal = `R$ ${grandTotalNumeric.toFixed(2).replace(".", ",")}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { name?: boolean; email?: boolean } = {};
    if (!customerName.trim()) newErrors.name = true;
    if (!customerEmail.trim() || !customerEmail.includes("@")) newErrors.email = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    trackEvent("CheckoutSubmit", {
      customerName,
      customerEmail,
      dogName: answers.dogName,
      dogGender: answers.dogGender,
      selectedBumps: selectedBumpIds,
      totalPrice: grandTotalNumeric,
      paymentMethod
    });

    // Se houver uma URL externa de checkout configurada
    if (PRODUCT_CONFIG.checkoutUrl && PRODUCT_CONFIG.checkoutUrl.trim().length > 0) {
      const url = new URL(PRODUCT_CONFIG.checkoutUrl);
      url.searchParams.set("name", customerName);
      url.searchParams.set("email", customerEmail);
      if (selectedBumpIds.length > 0) {
        url.searchParams.set("bumps", selectedBumpIds.join(","));
      }
      window.location.href = url.toString();
      return;
    }

    // Simulação no ambiente de demonstração
    setTimeout(() => {
      setIsSubmitting(false);
      onGoToUpsell();
    }, 800);
  };

  return (
    <div className="w-full py-8 sm:py-12 bg-[#FAF8F5] min-h-[calc(100vh-4rem)] selection:bg-[#1B4332] selection:text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-2 bg-[#F0F7F2] px-3 py-1 rounded-full border border-[#1B4332]/15">
            <Lock className="w-3.5 h-3.5 text-[#1B4332]" />
            <span>Ambiente Seguro com Criptografia 256-bit</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E293B]">
            Liberar o Plano Personalizado {grammar.deArtigo} {grammar.nome}
          </h1>
          <p className="text-xs sm:text-sm text-[#666666] mt-1">
            Você receberá o acesso exclusivo e vitalício direto no seu e-mail logo após a confirmação.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Coluna Esquerda: Formulário de Identificação + Bumps (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-7 border border-[#1B4332]/10 shadow-[0_4px_20px_rgba(27,67,50,0.04)] space-y-5">
              <h2 className="text-base font-serif font-bold text-[#1E293B] pb-3 border-b border-[#E2E8F0]">
                1. Dados de Envio do Acesso
              </h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="customerName" className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
                    Seu nome completo
                  </label>
                  <input
                    id="customerName"
                    type="text"
                    required
                    placeholder="Ex.: Maria Silva"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#1E293B] bg-white transition-all focus-visible:outline-none focus-visible:ring-2 ${
                      errors.name
                        ? "border-rose-500 focus-visible:ring-rose-400 bg-rose-50/20"
                        : "border-[#E2E8F0] focus-visible:ring-[#1B4332]"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-600 mt-1">Informe seu nome completo.</p>
                  )}
                </div>

                <div>
                  <label htmlFor="customerEmail" className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
                    Seu melhor e-mail (onde receberá o plano)
                  </label>
                  <input
                    id="customerEmail"
                    type="email"
                    required
                    placeholder="Ex.: maria@email.com"
                    value={customerEmail}
                    onChange={e => setCustomerEmail(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#1E293B] bg-white transition-all focus-visible:outline-none focus-visible:ring-2 ${
                      errors.email
                        ? "border-rose-500 focus-visible:ring-rose-400 bg-rose-50/20"
                        : "border-[#E2E8F0] focus-visible:ring-[#1B4332]"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-600 mt-1">Informe um e-mail válido para receber o plano.</p>
                  )}
                </div>
              </div>

              {/* Forma de Pagamento */}
              <div className="pt-2">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-3">
                  2. Forma de Pagamento
                </span>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("pix")}
                    className={`p-3.5 rounded-2xl border-2 flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      paymentMethod === "pix"
                        ? "bg-[#F0F7F2] border-[#1B4332] text-[#1B4332] font-bold shadow-xs"
                        : "bg-white border-[#E2E8F0] text-[#1E293B]"
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span className="text-xs sm:text-sm">PIX (Acesso Imediato)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cartao")}
                    className={`p-3.5 rounded-2xl border-2 flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      paymentMethod === "cartao"
                        ? "bg-[#F0F7F2] border-[#1B4332] text-[#1B4332] font-bold shadow-xs"
                        : "bg-white border-[#E2E8F0] text-[#1E293B]"
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span className="text-xs sm:text-sm">Cartão de Crédito</span>
                  </button>
                </div>
              </div>

              {/* Botão de Finalização no Mobile em Laranja Coral */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4.5 px-6 rounded-2xl bg-[#FF6B35] hover:bg-[#E85D04] active:scale-[0.99] text-white font-extrabold text-base sm:text-lg shadow-lg shadow-[#FF6B35]/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF6B35]/30 disabled:opacity-75"
              >
                {isSubmitting ? (
                  <span>Processando liberação...</span>
                ) : (
                  <>
                    <span>Liberar o plano agora ({formattedTotal})</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Ofertas Complementares (Order Bumps) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">
                  Acelere os Resultados d{grammar.artigo} {grammar.nome}
                </span>
                <span className="text-[11px] text-[#1B4332] font-bold">
                  Adicione com 1 clique
                </span>
              </div>

              {BUMP_CONFIG.filter(b => b.enabled).map(bump => (
                <OrderBumpCard
                  key={bump.id}
                  bump={bump}
                  isSelected={selectedBumpIds.includes(bump.id)}
                  onToggle={toggleBump}
                />
              ))}
            </div>
          </div>

          {/* Coluna Direita: Resumo do Pedido & Garantia (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-2xl p-6 border border-[#1B4332]/10 shadow-[0_4px_20px_rgba(27,67,50,0.04)]">
              <h3 className="text-sm font-serif font-bold text-[#1E293B] pb-3 border-b border-[#E2E8F0]">
                Resumo do Pedido
              </h3>

              <div className="py-4 space-y-3">
                <div className="flex items-start justify-between gap-3 text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-[#1E293B] block">
                      {PRODUCT_CONFIG.name}
                    </span>
                    <span className="text-[11px] text-[#666666] block">
                      Acesso vitalício · Perfil {dogSummary.preposition} {dogSummary.name}
                    </span>
                  </div>
                  <span className="font-bold text-[#1B4332] shrink-0 font-poppins">
                    {PRODUCT_CONFIG.price}
                  </span>
                </div>

                {/* Exibição dos 2 Bônus Grátis */}
                <div className="flex items-start justify-between gap-3 text-xs text-[#1B4332] pt-2 border-t border-dashed border-[#E2E8F0]">
                  <div>
                    <span className="font-medium block">🎁 Bônus #1: Tabela de Geladeira (PDF Imprimir)</span>
                    <span className="text-[10px] text-[#666666]">Incluso gratuitamente hoje</span>
                  </div>
                  <span className="font-bold shrink-0 font-poppins text-[#1B4332]">
                    R$ 0,00
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3 text-xs text-[#1B4332] pt-2 border-t border-dashed border-[#E2E8F0]">
                  <div>
                    <span className="font-medium block">🎁 Bônus #2: Protocolo Diarreias & Desintoxicação</span>
                    <span className="text-[10px] text-[#666666]">Incluso gratuitamente hoje</span>
                  </div>
                  <span className="font-bold shrink-0 font-poppins text-[#1B4332]">
                    R$ 0,00
                  </span>
                </div>

                {/* Exibição dos Bumps selecionados */}
                {selectedBumpIds.map(id => {
                  const bump = BUMP_CONFIG.find(b => b.id === id);
                  if (!bump) return null;
                  return (
                    <div key={id} className="flex items-start justify-between gap-3 text-xs text-[#1B4332] pt-2 border-t border-dashed border-[#E2E8F0]">
                      <div>
                        <span className="font-medium block">{bump.name}</span>
                        <span className="text-[10px] text-[#666666]">Item complementar</span>
                      </div>
                      <span className="font-bold shrink-0 font-poppins">
                        +{bump.price}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Total Final */}
              <div className="pt-4 border-t border-[#E2E8F0] flex items-baseline justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-[#666666] block">
                    Valor Total
                  </span>
                  <span className="text-[11px] text-[#1B4332] font-semibold">
                    Pagamento único sem recorrência
                  </span>
                </div>
                <span className="text-2xl sm:text-3xl font-bold text-[#1B4332] font-poppins">
                  {formattedTotal}
                </span>
              </div>
            </div>

            {/* Selo de Garantia 7 Dias */}
            <div className="bg-[#F0F7F2] rounded-2xl p-5 border border-[#1B4332]/15 flex items-start gap-3.5">
              <ShieldCheck className="w-6 h-6 text-[#1B4332] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#1B4332] uppercase tracking-wider block">
                  Garantia Incondicional de {GUARANTEE_CONFIG.days} Dias
                </span>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Aplique o plano no seu ritmo. Se não perceber melhora no apetite, digestão e vitalidade d{grammar.artigo} {grammar.nome}, devolvemos 100% do seu dinheiro.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
