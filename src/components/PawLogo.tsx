import React from "react";
import { PawPrint } from "lucide-react";

interface PawLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  showText?: boolean;
}

export const PawLogo: React.FC<PawLogoProps> = ({
  size = "md",
  className = "",
  showText = false
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

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div
        className={`${sizeClasses[size]} bg-[#3F6448] text-white flex items-center justify-center shadow-xs shrink-0 transition-all duration-200 group-hover:bg-[#294333] group-hover:scale-105`}
        aria-hidden="true"
      >
        <PawPrint className={`${iconSizes[size]} fill-white text-white`} />
      </div>
      {showText && (
        <span className="text-base sm:text-lg font-serif font-bold text-[#292724] tracking-tight group-hover:text-[#3F6448] transition-colors">
          4 Patas
        </span>
      )}
    </div>
  );
};
