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
  FileText,
  AlertCircle
} from "lucide-react";

interface CheckoutViewProps {
  onOrderSuccess: () => void;
  onGoToUpsell: () => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({ onOrderSuccess, onGoToUpsell }) => {
  const { answers, dogSummary } = useQuiz();

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [selectedBumpIds, setSelectedBumpIds] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "cartao">("pix");
  const [errors, setErrors] = useState<{ name?: boolean; email?: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfigNotice, setShowConfigNotice] = useState(false);

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
  const formattedTotal = grandTotalNumeric.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: !customerName.trim(),
      email: !customerEmail.trim() || !customerEmail.includes("@")
    };

    setErrors(newErrors);

    if (newErrors.name || newErrors.email) {
      return;
    }

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
      // Avança para a estrutura de upsell ou obrigado
      onGoToUpsell();
    }, 800);
  };

  return (
    <div className="w-full py-8 sm:py-12 bg-[#FAF8F4] min-h-[calc(100vh-4rem)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Aviso de ambiente com checkout simulado */}
        {!PRODUCT_CONFIG.checkoutUrl && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs sm:text-sm flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Ambiente de Demonstração / Checkout Ativo:</span>
              <p className="text-amber-800 text-xs mt-0.5">
                Para conectar sua plataforma de pagamentos real (Hotmart, Kiwify, Eduzz, Stripe, etc.), basta preencher o campo <code className="font-mono bg-amber-100 px-1 rounded">checkoutUrl</code> no arquivo <code className="font-mono bg-amber-100 px-1 rounded">PRODUCT_CONFIG</code>. Ao clicar em finalizar compra abaixo, você navegará para a próxima etapa do funil.
              </p>
            </div>
          </div>
        )}

        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3F6448] mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>Ambiente Seguro com Criptografia 256-bit</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#292724]">
            Concluir meu acesso à biblioteca
          </h1>
          <p className="text-xs sm:text-sm text-[#292724]/70 mt-1">
            Você receberá o login e senha de acesso direto no seu e-mail logo após a confirmação.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Coluna Esquerda: Formulário de Identificação + Bumps (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-7 border border-[#292724]/10 shadow-xs space-y-5">
              <h2 className="text-base font-serif font-bold text-[#292724] pb-3 border-b border-[#292724]/8">
                1. Dados de Acesso
              </h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="customerName" className="block text-xs font-semibold uppercase tracking-wider text-[#292724]/70 mb-1.5">
                    Seu nome completo
                  </label>
                  <input
                    id="customerName"
                    type="text"
                    required
                    placeholder="Ex.: Maria Silva"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-[#292724] bg-white transition-all focus-visible:outline-none focus-visible:ring-2 ${
                      errors.name
                        ? "border-rose-500 focus-visible:ring-rose-400 bg-rose-50/20"
                        : "border-[#292724]/15 focus-visible:ring-[#3F6448]"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-600 mt-1">Informe seu nome completo.</p>
                  )}
                </div>

                <div>
                  <label htmlFor="customerEmail" className="block text-xs font-semibold uppercase tracking-wider text-[#292724]/70 mb-1.5">
                    Seu melhor e-mail (para envio do acesso)
                  </label>
                  <input
                    id="customerEmail"
                    type="email"
                    required
                    placeholder="Ex.: maria@email.com"
                    value={customerEmail}
                    onChange={e => setCustomerEmail(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-[#292724] bg-white transition-all focus-visible:outline-none focus-visible:ring-2 ${
                      errors.email
                        ? "border-rose-500 focus-visible:ring-rose-400 bg-rose-50/20"
                        : "border-[#292724]/15 focus-visible:ring-[#3F6448]"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-600 mt-1">Informe um e-mail válido para receber o acesso.</p>
                  )}
                  <p className="text-[11px] text-[#292724]/60 mt-1">
                    Certifique-se de digitar o e-mail corretamente para receber o material.
                  </p>
                </div>
              </div>

              {/* Método de Pagamento Simulado */}
              <div className="pt-4 border-t border-[#292724]/8">
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#292724]/70 mb-3">
                  2. Forma de Pagamento
                </span>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("pix")}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      paymentMethod === "pix"
                        ? "bg-[#E7EEE7] border-[#3F6448] text-[#3F6448] font-bold"
                        : "bg-white border-[#292724]/15 text-[#292724]"
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span className="text-xs sm:text-sm">PIX (Acesso Imediato)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cartao")}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      paymentMethod === "cartao"
                        ? "bg-[#E7EEE7] border-[#3F6448] text-[#3F6448] font-bold"
                        : "bg-white border-[#292724]/15 text-[#292724]"
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span className="text-xs sm:text-sm">Cartão de Crédito</span>
                  </button>
                </div>
              </div>

              {/* Botão de Finalização no Mobile */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-[#3F6448] hover:bg-[#294333] active:scale-[0.99] text-white font-bold text-base sm:text-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#3F6448]/40 disabled:opacity-75"
              >
                {isSubmitting ? (
                  <span>Processando pedido...</span>
                ) : (
                  <>
                    <span>Finalizar compra ({formattedTotal})</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Ofertas Complementares (Order Bumps) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#292724]/70">
                  Ofertas Complementares Recomendadas
                </span>
                <span className="text-[11px] text-[#3F6448] font-semibold">
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
            <div className="bg-white rounded-2xl p-6 border border-[#292724]/10 shadow-xs">
              <h3 className="text-sm font-serif font-bold text-[#292724] pb-3 border-b border-[#292724]/8">
                Resumo do Pedido
              </h3>

              <div className="py-4 space-y-3">
                <div className="flex items-start justify-between gap-3 text-xs sm:text-sm">
                  <div>
                    <span className="font-semibold text-[#292724] block">
                      {PRODUCT_CONFIG.name}
                    </span>
                    <span className="text-[11px] text-[#292724]/60 block">
                      Acesso vitalício · Perfil {dogSummary.preposition} {dogSummary.name}
                    </span>
                  </div>
                  <span className="font-bold text-[#292724] shrink-0 font-mono">
                    {PRODUCT_CONFIG.price}
                  </span>
                </div>

                {/* Exibição dos Bumps selecionados */}
                {selectedBumpIds.map(id => {
                  const bump = BUMP_CONFIG.find(b => b.id === id);
                  if (!bump) return null;
                  return (
                    <div key={id} className="flex items-start justify-between gap-3 text-xs text-[#3F6448] pt-2 border-t border-dashed border-[#292724]/8">
                      <div>
                        <span className="font-medium block">{bump.name}</span>
                        <span className="text-[10px] text-[#292724]/50">Order bump adicional</span>
                      </div>
                      <span className="font-bold shrink-0 font-mono">
                        +{bump.price}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Total Final */}
              <div className="pt-4 border-t border-[#292724]/10 flex items-baseline justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-[#292724]/60 block">
                    Valor Total
                  </span>
                  <span className="text-[11px] text-[#3F6448] font-medium">
                    Pagamento único sem recorrência
                  </span>
                </div>
                <div className="text-2xl font-serif font-bold text-[#3F6448] font-mono">
                  {formattedTotal}
                </div>
              </div>
            </div>

            {/* Garantia Condensada */}
            {GUARANTEE_CONFIG.enabled && (
              <div className="bg-[#E7EEE7]/40 border border-[#3F6448]/20 rounded-2xl p-5 flex items-start gap-3.5">
                <ShieldCheck className="w-6 h-6 text-[#3F6448] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-[#292724] block mb-0.5">
                    Garantia Blindada de {GUARANTEE_CONFIG.days} Dias
                  </span>
                  <p className="text-[#292724]/70 leading-relaxed">
                    Você tem 7 dias para testar todo o material. Se não ficar satisfeito, devolvemos 100% do seu dinheiro.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
