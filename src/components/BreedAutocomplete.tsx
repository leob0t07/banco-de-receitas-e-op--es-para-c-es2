import React, { useState, useEffect, useRef } from "react";
import { searchBreeds } from "../data/dogBreeds";
import { ArrowRight, Search, X, Check, HelpCircle, Heart } from "lucide-react";

interface BreedAutocompleteProps {
  initialValue: string;
  dogName: string;
  onSelectBreed: (breed: string) => void;
  onContinue: () => void;
}

export const BreedAutocomplete: React.FC<BreedAutocompleteProps> = ({
  initialValue,
  dogName,
  onSelectBreed,
  onContinue
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue || "");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchTerm.trim().length >= 1) {
      const results = searchBreeds(searchTerm, 6);
      setSuggestions(results);
      setIsOpen(results.length > 0);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [searchTerm]);

  // Fecha dropdown se clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectOption = (breed: string, autoSubmit = false) => {
    setSearchTerm(breed);
    onSelectBreed(breed);
    setIsOpen(false);
    if (autoSubmit) {
      setTimeout(() => {
        onContinue();
      }, 150);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    onSelectBreed("");
    setSuggestions([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalValue = searchTerm.trim() || "Não sei a raça exatamente";
    onSelectBreed(finalValue);
    setIsOpen(false);
    onContinue();
  };

  const isSrdSelected = searchTerm === "SRD / Vira-lata" || searchTerm === "É SRD / vira-lata";
  const isUnknownSelected = searchTerm === "Não sei a raça exatamente" || searchTerm === "Não sei a raça";

  return (
    <div className="w-full space-y-4" ref={containerRef}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo com Autocomplete Flexível */}
        <div className="relative">
          <label
            htmlFor="breedSearchInput"
            className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-2"
          >
            Digite a raça ou busque pelo nome
          </label>

          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-[#2E5A36]/60 absolute left-4 pointer-events-none" />
            <input
              ref={inputRef}
              id="breedSearchInput"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Ex: Golden Retriever, Shih-tzu, Poodle..."
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                onSelectBreed(e.target.value);
              }}
              onFocus={() => {
                if (searchTerm.trim().length >= 1) {
                  const results = searchBreeds(searchTerm, 6);
                  setSuggestions(results);
                  setIsOpen(results.length > 0);
                }
              }}
              className="w-full pl-12 pr-11 py-4 rounded-2xl border-2 border-[#E5E7EB] text-base sm:text-lg text-[#222222] bg-white transition-all duration-150 focus:border-[#2E5A36] focus:ring-4 focus:ring-[#2E5A36]/15 outline-none placeholder:text-[#999999] shadow-xs"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3.5 p-1.5 rounded-full text-[#666666] hover:text-[#222222] hover:bg-[#FAF8F5] transition-colors"
                aria-label="Limpar campo de raça"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Dropdown de Sugestões de Raça */}
          {isOpen && suggestions.length > 0 && (
            <div className="absolute z-30 left-0 right-0 mt-2 bg-white rounded-2xl border-2 border-[#E5E7EB] shadow-xl overflow-hidden max-h-64 overflow-y-auto">
              <div className="p-2">
                <span className="block px-3 py-1.5 text-[11px] font-bold text-[#666666] uppercase tracking-wider">
                  Raças Encontradas
                </span>
                {suggestions.map(breed => {
                  const isCurrent = searchTerm.toLowerCase() === breed.toLowerCase();
                  return (
                    <button
                      key={breed}
                      type="button"
                      onClick={() => handleSelectOption(breed, true)}
                      className={`w-full px-3.5 py-3 text-left rounded-xl text-sm sm:text-base flex items-center justify-between transition-colors cursor-pointer ${
                        isCurrent
                          ? "bg-[#F0F7F2] text-[#1B4332] font-bold"
                          : "text-[#1E293B] hover:bg-[#FAF8F5]"
                      }`}
                    >
                      <span>{breed}</span>
                      {isCurrent && <Check className="w-4 h-4 text-[#1B4332]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Opções Fixas Solicitadas: SRD / Vira-lata e Não sei a raça exatamente */}
        <div>
          <span className="block text-xs font-bold text-[#666666] uppercase tracking-wider mb-2.5">
            Ou selecione uma opção direta:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSelectOption("SRD / Vira-lata", true)}
              className={`p-4 rounded-2xl border-2 text-left flex items-center justify-between gap-3 transition-all duration-200 cursor-pointer ${
                isSrdSelected
                  ? "bg-[#F0F7F2] border-[#1B4332] text-[#1E293B] shadow-[0_4px_20px_rgba(27,67,50,0.12)]"
                  : "bg-white border-[#E2E8F0] hover:border-[#1B4332]/40 hover:bg-[#FAF8F5] text-[#1E293B] shadow-[0_4px_16px_rgba(0,0,0,0.03)]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🐕</span>
                <div>
                  <span className="text-sm sm:text-base font-bold block">SRD / Vira-lata</span>
                  <span className="text-xs text-[#666666]">Sem raça definida</span>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  isSrdSelected
                    ? "border-[#1B4332] bg-[#1B4332] text-white"
                    : "border-[#E2E8F0] bg-white"
                }`}
              >
                {isSrdSelected && <Check className="w-3.5 h-3.5" />}
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleSelectOption("Não sei a raça exatamente", true)}
              className={`p-4 rounded-2xl border-2 text-left flex items-center justify-between gap-3 transition-all duration-200 cursor-pointer ${
                isUnknownSelected
                  ? "bg-[#F0F7F2] border-[#1B4332] text-[#1E293B] shadow-[0_4px_20px_rgba(27,67,50,0.12)]"
                  : "bg-white border-[#E2E8F0] hover:border-[#1B4332]/40 hover:bg-[#FAF8F5] text-[#1E293B] shadow-[0_4px_16px_rgba(0,0,0,0.03)]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">❓</span>
                <div>
                  <span className="text-sm sm:text-base font-bold block">Não sei a raça</span>
                  <span className="text-xs text-[#666666]">Não tenho certeza</span>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  isUnknownSelected
                    ? "border-[#1B4332] bg-[#1B4332] text-white"
                    : "border-[#E2E8F0] bg-white"
                }`}
              >
                {isUnknownSelected && <Check className="w-3.5 h-3.5" />}
              </div>
            </button>
          </div>
        </div>

        {/* Botão de Avanço com Coral Orange (#FF6B35) */}
        <button
          type="submit"
          className="w-full py-4 px-6 rounded-2xl bg-[#FF6B35] hover:bg-[#E85D04] active:scale-[0.99] text-white font-bold text-base sm:text-lg shadow-lg shadow-[#FF6B35]/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF6B35]/30 mt-4"
        >
          <span>Continuar →</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
