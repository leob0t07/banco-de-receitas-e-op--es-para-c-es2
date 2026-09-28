import React, { useState, useEffect } from "react";
import { QuizProvider, useQuiz } from "./context/QuizContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomeView } from "./views/HomeView";
import { QuizView } from "./views/QuizView";
import { ResultView } from "./views/ResultView";
import { OfferView } from "./views/OfferView";
import { CheckoutView } from "./views/CheckoutView";
import { UpsellView } from "./views/UpsellView";
import { ThankYouView } from "./views/ThankYouView";

type FunnelRoute = "/" | "/quiz" | "/resultado" | "/oferta" | "/checkout" | "/upsell" | "/obrigado";

const FunnelApp: React.FC = () => {
  const { answers, resetQuiz } = useQuiz();

  // Inicializa a rota a partir da URL atual ou default para '/'
  const [currentRoute, setCurrentRoute] = useState<FunnelRoute>(() => {
    const path = window.location.pathname as FunnelRoute;
    const validRoutes: FunnelRoute[] = [
      "/",
      "/quiz",
      "/resultado",
      "/oferta",
      "/checkout",
      "/upsell",
      "/obrigado"
    ];
    return validRoutes.includes(path) ? path : "/";
  });

  // Sincroniza com histórico do navegador (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname as FunnelRoute;
      const validRoutes: FunnelRoute[] = [
        "/",
        "/quiz",
        "/resultado",
        "/oferta",
        "/checkout",
        "/upsell",
        "/obrigado"
      ];
      if (validRoutes.includes(path)) {
        setCurrentRoute(path);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (route: FunnelRoute) => {
    setCurrentRoute(route);
    try {
      window.history.pushState({}, "", route);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      // ignore
    }
  };

  const handleHeaderBack = () => {
    if (currentRoute === "/quiz") {
      navigateTo("/");
    } else if (currentRoute === "/resultado") {
      navigateTo("/quiz");
    } else if (currentRoute === "/oferta") {
      navigateTo("/resultado");
    } else if (currentRoute === "/checkout") {
      navigateTo("/oferta");
    } else if (currentRoute === "/upsell") {
      navigateTo("/checkout");
    } else if (currentRoute === "/obrigado") {
      navigateTo("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#292724]">
      {/* Top Bar seguindo rigorosamente o Top Bar Contract */}
      <Header
        currentRoute={currentRoute}
        showBack={currentRoute !== "/"}
        onBack={handleHeaderBack}
        onNavigate={route => navigateTo(route as FunnelRoute)}
      />

      {/* Conteúdo Dinâmico da Rota */}
      <main className="flex-1 flex flex-col">
        {currentRoute === "/" && (
          <HomeView onStartQuiz={() => navigateTo("/quiz")} />
        )}

        {currentRoute === "/quiz" && (
          <QuizView
            onFinishQuiz={() => navigateTo("/resultado")}
            onBackToHome={() => navigateTo("/")}
          />
        )}

        {currentRoute === "/resultado" && (
          <ResultView onGoToOffer={() => navigateTo("/oferta")} />
        )}

        {currentRoute === "/oferta" && (
          <OfferView onGoToCheckout={() => navigateTo("/checkout")} />
        )}

        {currentRoute === "/checkout" && (
          <CheckoutView
            onOrderSuccess={() => navigateTo("/obrigado")}
            onGoToUpsell={() => navigateTo("/upsell")}
          />
        )}

        {currentRoute === "/upsell" && (
          <UpsellView
            onAcceptUpsell={() => navigateTo("/obrigado")}
            onDeclineUpsell={() => navigateTo("/obrigado")}
          />
        )}

        {currentRoute === "/obrigado" && (
          <ThankYouView
            onBackToHome={() => {
              resetQuiz();
              navigateTo("/");
            }}
          />
        )}
      </main>

      {/* Rodapé Comercial Limpo com Isenção de Responsabilidade */}
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <QuizProvider>
      <FunnelApp />
    </QuizProvider>
  );
}

export default App;
