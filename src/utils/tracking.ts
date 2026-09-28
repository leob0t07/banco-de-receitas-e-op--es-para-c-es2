// Camada de Tracking e Telemetria de Conversão
// Pronta para integração com Meta Pixel, Google Tag Manager, GA4 e plataformas de afiliados.

export type FunnelEvent =
  | "ViewQuiz"
  | "QuizStart"
  | "QuizQuestionAnswered"
  | "QuizComplete"
  | "ViewResult"
  | "ViewOffer"
  | "ClickCTA"
  | "BeginCheckout"
  | "BumpSelected"
  | "CheckoutSubmit";

export interface EventData {
  profile?: string;
  dogName?: string;
  dogGender?: string;
  dogSize?: string;
  dogAge?: string;
  feedingType?: string;
  mainGoal?: string;
  step?: number;
  questionKey?: string;
  answer?: string | string[];
  ctaLocation?: string;
  bumpId?: string;
  bumpSelected?: boolean;
  totalPrice?: number;
  [key: string]: unknown;
}

export function trackEvent(eventName: FunnelEvent, data?: EventData) {
  const timestamp = new Date().toISOString();
  const payload = {
    event: eventName,
    timestamp,
    ...data
  };

  // 1. Log local para inspeção e auditoria em desenvolvimento
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log(`[Funnel Tracker] 🎯 ${eventName}`, payload);
  }

  try {
    // 2. Integração com Google Tag Manager (dataLayer)
    // Se você usa GTM, basta adicionar o snippet do GTM no <head> de index.html
    const win = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
    if (Array.isArray(win.dataLayer)) {
      win.dataLayer.push(payload);
    }

    // 3. Integração com Meta Pixel (Facebook Pixel - fbq)
    // Para ativar, inclua o pixel no index.html e descomente ou mapeie os eventos padrão
    const fbWin = window as unknown as { fbq?: (...args: unknown[]) => void };
    if (typeof fbWin.fbq === "function") {
      switch (eventName) {
        case "QuizStart":
          fbWin.fbq("trackCustom", "QuizStart", payload);
          break;
        case "QuizComplete":
          fbWin.fbq("trackCustom", "QuizComplete", payload);
          break;
        case "ViewResult":
          fbWin.fbq("trackCustom", "ViewResult", payload);
          break;
        case "BeginCheckout":
          fbWin.fbq("track", "InitiateCheckout", {
            content_name: "4 Patas - Receitas e Opções para Cães",
            value: data?.totalPrice || 9.99,
            currency: "BRL"
          });
          break;
        case "CheckoutSubmit":
          fbWin.fbq("track", "Purchase", {
            content_name: "4 Patas - Receitas e Opções para Cães",
            value: data?.totalPrice || 9.99,
            currency: "BRL"
          });
          break;
        default:
          fbWin.fbq("trackCustom", eventName, payload);
          break;
      }
    }
  } catch (err) {
    // Previne que falhas de tracking quebrem a UX do usuário
    // eslint-disable-next-line no-console
    console.warn("[Funnel Tracker Error]", err);
  }
}
