import React, { useState, useEffect, useRef } from "react";
import { PawPrint, ArrowRight } from "lucide-react";
import { PawLogo } from "../components/PawLogo";

// Import das 5 imagens enviadas para o carrossel de onboarding
import img1 from "../assets/images/Acabe com a Coceira do Cachorro.png";
import img2 from "../assets/images/Elimine a Pele Vermelha em 7 Dias.png";
import img3 from "../assets/images/Faça seu cão comer com vontade.png";
import img4 from "../assets/images/Firme o Intestino do Seu Cão.png";
import img5 from "../assets/images/Pare a Queda de Pelo Excessiva.png";

interface OnboardingViewProps {
  onContinue: () => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({ onContinue }) => {
  // Array com as 5 imagens locais
  const images = [
    { src: img1, alt: "Acabe com a coceira do cachorro" },
    { src: img2, alt: "Elimine a pele vermelha em 7 dias" },
    { src: img3, alt: "Faça seu cão comer com vontade" },
    { src: img4, alt: "Firme o intestino do seu cão" },
    { src: img5, alt: "Pare a queda de pelo excessiva" }
  ];

  const totalImages = images.length;
  // Tempo confortável de ~2.4 segundos por slide para o lead conseguir ler os títulos com calma
  const timePerImage = 2400;
  // Carregamento de ~3.2 segundos para liberar o botão CONTINUAR sem travar o lead
  const totalDuration = 3200;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const manualSelectionRef = useRef<{ index: number; timestamp: number } | null>(null);

  useEffect(() => {
    startTimeRef.current = performance.now();

    const updateLoop = (currentTime: number) => {
      if (!startTimeRef.current) return;
      const elapsed = currentTime - startTimeRef.current;

      // 1. O carregamento da barra acompanha o tempo até 100%
      const rawProgress = (elapsed / totalDuration) * 100;
      const currentProgress = Math.min(rawProgress, 100);
      setProgress(currentProgress);

      if (elapsed >= totalDuration && !isCompleted) {
        setIsCompleted(true);
      }

      // 2. Os slides passam a cada ~2.4s (respeitando clique manual temporário se houver)
      if (manualSelectionRef.current && currentTime - manualSelectionRef.current.timestamp < 3500) {
        setCurrentImageIndex(manualSelectionRef.current.index);
      } else {
        const calculatedIndex = Math.floor(elapsed / timePerImage) % totalImages;
        setCurrentImageIndex(calculatedIndex);
      }

      // Mantém o loop ativo para que as imagens continuem alternando indefinidamente
      animationFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animationFrameRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [totalDuration, timePerImage, totalImages, isCompleted]);

  const handleDotClick = (idx: number) => {
    manualSelectionRef.current = {
      index: idx,
      timestamp: performance.now()
    };
    setCurrentImageIndex(idx);
  };

  const iniciarQuiz = () => {
    onContinue();
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between items-center py-6 sm:py-8 px-4 selection:bg-[#2E5A36] selection:text-white">
      {/* Topo: Nossa Logo Oficial (4 Patas) */}
      <header className="w-full max-w-sm flex items-center justify-center pt-2 pb-2">
        <PawLogo size="md" showText={true} />
      </header>

      {/* CENTRO: Container Fixo 1:1 com Transição Suave Fade In / Out */}
      <main className="w-full max-w-sm flex-1 flex flex-col items-center justify-center my-auto">
        <div className="w-full aspect-square relative rounded-3xl overflow-hidden shadow-sm border border-[#2E5A36]/10 bg-white">
          {images.map((img, index) => {
            const isActive = currentImageIndex === index;
            return (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-500 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-contain p-2"
                  loading="eager"
                />
              </div>
            );
          })}
        </div>

        {/* Indicadores de slides (dots) interativos que acompanham a imagem atual */}
        <div className="flex items-center justify-center gap-2 mt-4" role="tablist" aria-label="Slides do carrossel">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleDotClick(idx)}
              aria-label={`Ver slide ${idx + 1}: ${img.alt}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E5A36] ${
                currentImageIndex === idx
                  ? "w-7 bg-[#2E5A36]"
                  : "w-2 bg-[#2E5A36]/25 hover:bg-[#2E5A36]/50"
              }`}
            />
          ))}
        </div>
      </main>

      {/* RODAPÉ: Barra de Carregamento e Botão CONTINUAR */}
      <footer className="w-full max-w-sm flex flex-col items-center justify-end pb-4 pt-4 min-h-[140px]">
        {/* ESTADO INICIAL: Enquanto a barra de progresso estiver carregando */}
        <div
          className={`w-full flex flex-col items-center text-center transition-opacity duration-500 ${
            isCompleted
              ? "opacity-0 pointer-events-none hidden"
              : "opacity-100 flex"
          }`}
        >
          {/* Texto 1: Negrito e cor escura */}
          <p className="font-bold text-sm sm:text-base text-[#222222] mb-3">
            Por favor não feche esta página
          </p>

          {/* Barra de progresso sincronizada 1:1 com a contagem (sem delay de transição CSS) */}
          <div className="w-full relative py-3">
            <div className="w-full h-2.5 bg-[#E5E7EB] rounded-full relative">
              <div
                className="h-full bg-[#2E5A36] rounded-full"
                style={{ width: `${progress}%` }}
              />

              {/* Ícone de patinha na ponta exata da barra de progresso, perfeitamente alinhada */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
                style={{ left: `${progress}%` }}
              >
                <div className="w-6 h-6 rounded-full bg-white shadow-sm border border-[#2E5A36]/40 flex items-center justify-center text-[#2E5A36]">
                  <PawPrint className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
            </div>
          </div>

          {/* Texto 2: Subtexto cinza com porcentagem perfeitamente síncrona */}
          <p className="text-xs sm:text-sm text-[#666666] mt-2 font-medium">
            Carregando o questionário... {Math.round(progress)}%
          </p>
        </div>

        {/* ESTADO FINAL: Botão CONTINUAR em Laranja Coral (#FF6B35) de Alta Conversão */}
        <div
          className={`w-full flex flex-col items-center transition-all duration-500 ${
            isCompleted
              ? "opacity-100 scale-100 flex"
              : "opacity-0 scale-95 pointer-events-none hidden"
          }`}
        >
          <button
            type="button"
            onClick={iniciarQuiz}
            className="w-full py-4 px-8 rounded-2xl bg-[#FF6B35] hover:bg-[#E85D04] active:scale-95 text-white font-bold text-base sm:text-lg shadow-lg shadow-[#FF6B35]/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF6B35]/30"
          >
            <span>CONTINUAR</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <span className="text-xs text-[#666666] mt-2">
            Clique para iniciar o diagnóstico
          </span>
        </div>
      </footer>
    </div>
  );
};
