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
    const finalValue = searchTerm.trim() || "Não sei a raça";
    onSelectBreed(finalValue);
    setIsOpen(false);
    onContinue();
  };

  const isSrdSelected = searchTerm === "É SRD / vira-lata";
  const isUnknownSelected = searchTerm === "Não sei a raça";

  return (
    <div className="w-full space-y-4 mt-2" ref={containerRef}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo com Autocomplete */}
        <div className="relative">
          <label
            htmlFor="breedSearchInput"
            className="block text-xs font-semibold uppercase tracking-wider text-[#292724]/60 mb-2"
          >
            Raça {dogName ? `do ${dogName}` : "do cachorro"}
          </label>

          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[#292724]/40 absolute left-3.5 pointer-events-none" />
            <input
              ref={inputRef}
              id="breedSearchInput"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="🔎 Digite a raça..."
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
              className="w-full pl-10 pr-10 py-3.5 rounded-xl border border-[#292724]/15 text-base text-[#292724] bg-white transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3F6448] focus-visible:border-transparent placeholder:text-[#292724]/40"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 p-1 rounded-full text-[#292724]/40 hover:text-[#292724] hover:bg-[#FAF8F4] transition-colors"
                aria-label="Limpar campo de raça"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Lista de Sugestões de Autocomplete */}
          {isOpen && suggestions.length > 0 && (
            <div className="absolute z-30 left-0 right-0 mt-1.5 bg-white rounded-xl border border-[#292724]/12 shadow-lg overflow-hidden max-h-60 overflow-y-auto">
              <div className="p-1.5">
                <span className="block px-3 py-1 text-[11px] font-semibold text-[#292724]/50 uppercase tracking-wider">
                  Sugestões de raça
                </span>
                {suggestions.map(breed => {
                  const isCurrent = searchTerm.toLowerCase() === breed.toLowerCase();
                  return (
                    <button
                      key={breed}
                      type="button"
                      onClick={() => handleSelectOption(breed, true)}
                      className={`w-full px-3 py-2.5 text-left rounded-lg text-sm flex items-center justify-between transition-colors ${
                        isCurrent
                          ? "bg-[#E7EEE7] text-[#3F6448] font-semibold"
                          : "text-[#292724] hover:bg-[#FAF8F4]"
                      }`}
                    >
                      <span>{breed}</span>
                      {isCurrent && <Check className="w-4 h-4 text-[#3F6448]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Opções Especiais Claras (SRD e Não sei a raça) */}
        <div>
          <span className="block text-xs font-semibold text-[#292724]/60 mb-2">
            Ou escolha uma opção direta:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleSelectOption("É SRD / vira-lata", true)}
              className={`p-3 rounded-xl border text-left flex items-center justify-between gap-2.5 transition-all duration-150 cursor-pointer ${
                isSrdSelected
                  ? "bg-[#E7EEE7] border-[#3F6448] text-[#292724] shadow-xs"
                  : "bg-white border-[#292724]/12 hover:border-[#3F6448]/40 hover:bg-[#FAF8F4]/80 text-[#292724]"
              }`}
            >
              <div className="flex items-center gap-2">
                <Heart className={`w-4 h-4 shrink-0 ${isSrdSelected ? "text-[#3F6448]" : "text-[#292724]/50"}`} />
                <span className="text-xs sm:text-sm font-semibold">É SRD / vira-lata</span>
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                  isSrdSelected ? "border-[#3F6448] bg-[#3F6448] text-white" : "border-[#292724]/20 bg-white"
                }`}
              >
                {isSrdSelected && <Check className="w-3 h-3" />}
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleSelectOption("Não sei a raça", true)}
              className={`p-3 rounded-xl border text-left flex items-center justify-between gap-2.5 transition-all duration-150 cursor-pointer ${
                isUnknownSelected
                  ? "bg-[#E7EEE7] border-[#3F6448] text-[#292724] shadow-xs"
                  : "bg-white border-[#292724]/12 hover:border-[#3F6448]/40 hover:bg-[#FAF8F4]/80 text-[#292724]"
              }`}
            >
              <div className="flex items-center gap-2">
                <HelpCircle className={`w-4 h-4 shrink-0 ${isUnknownSelected ? "text-[#3F6448]" : "text-[#292724]/50"}`} />
                <span className="text-xs sm:text-sm font-semibold">Não sei a raça</span>
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                  isUnknownSelected ? "border-[#3F6448] bg-[#3F6448] text-white" : "border-[#292724]/20 bg-white"
                }`}
              >
                {isUnknownSelected && <Check className="w-3 h-3" />}
              </div>
            </button>
          </div>
        </div>

        {/* Botão de Avanço */}
        <button
          type="submit"
          className="w-full py-3.5 px-6 rounded-xl bg-[#3F6448] hover:bg-[#294333] active:scale-[0.99] text-white font-semibold text-base shadow-xs transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3F6448] mt-2"
        >
          <span>Continuar</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
