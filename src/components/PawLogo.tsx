import React from "react";
import { PawPrint } from "lucide-react";

interface PawLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  showText?: boolean;
  variant?: "green" | "purple";
}

export const PawLogo: React.FC<PawLogoProps> = ({
  size = "md",
  className = "",
  showText = false,
  variant = "green"
}) => {
  const sizeClasses = {
    sm: "w-7 h-7 rounded-lg",
    md: "w-8 h-8 rounded-xl",
    lg: "w-10 h-10 rounded-2xl"
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-4.5 h-4.5",
    lg: "w-5.5 h-5.5"
  };

  const bgClass =
    variant === "purple"
      ? "bg-[#A855F7] group-hover:bg-[#9333EA] shadow-purple-500/20"
      : "bg-[#1B4332] group-hover:bg-[#143225] shadow-sm";

  const textHoverClass =
    variant === "purple"
      ? "group-hover:text-[#A855F7]"
      : "group-hover:text-[#1B4332]";

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div
        className={`${sizeClasses[size]} ${bgClass} text-white flex items-center justify-center shadow-xs shrink-0 transition-all duration-200 group-hover:scale-105`}
        aria-hidden="true"
      >
        <PawPrint className={`${iconSizes[size]} fill-white text-white`} />
      </div>
      {showText && (
        <span className={`text-base sm:text-lg font-serif font-bold text-[#1E293B] tracking-tight ${textHoverClass} transition-colors`}>
          4 Patas
        </span>
      )}
    </div>
  );
};
