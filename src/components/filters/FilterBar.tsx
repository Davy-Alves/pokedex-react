import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import { typeData } from "../../utils/typeIcons";
import { pillBase } from "./filterStyles";

import CustomTypeDropdown from "./dropdowns/CustomTypeDropdown";
import CustomRarityDropdown from "./dropdowns/CustomRarityDropdown";
import CustomTextDropdown from "./dropdowns/CustomTextDropdown";

interface FilterBarProps {
  filters: any;
  suggestions: string[];
  children?: ReactNode;
}

export default function FilterBar({ filters, suggestions, children }: FilterBarProps) {
  const { 
    inputText, setInputText, 
    setSearchTerm,
    selectedType1, setSelectedType1,
    selectedType2, setSelectedType2,
    selectedRegion, setSelectedRegion,
    selectedRarity, setSelectedRarity,
    selectedForm, setSelectedForm
  } = filters;

  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (name: string) => {
    setInputText(name); 
    setSearchTerm(name);
    setShowSuggestions(false); 
  };

  const submitSearch = () => {
    setSearchTerm(inputText);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submitSearch();
    }
  };

  const typesList = Object.keys(typeData);

  const regionOptions = ["kanto", "johto", "hoenn", "sinnoh", "unova", "kalos", "alola", "galar", "paldea"].map(reg => ({
    value: reg,
    label: reg.charAt(0).toUpperCase() + reg.slice(1)
  }));

  const formOptions = [
    { value: "mega", label: "Mega Evolutions" },
    { value: "gmax", label: "Gigantamax" },
    { value: "eternamax", label: "Eternamax" },
    { value: "primal", label: "Primal" },
    { value: "origin", label: "Origin Form" },
    { value: "therian", label: "Therian Form" },
    { value: "crowned", label: "Crowned Form" },
    { value: "alola", label: "Alolan Form" },
    { value: "galar", label: "Galarian Form" },
    { value: "hisui", label: "Hisuian Form" },
    { value: "paldea", label: "Paldean Form" }
  ];

  return (
    <div className="relative z-50 w-full max-w-5xl mx-auto -mt-12 mb-8 flex flex-col items-center gap-4 px-2">
      
      <div className="relative w-full max-w-xl flex gap-2" ref={wrapperRef}>
        <div className="relative flex-1 min-w-0">
          <input 
            type="text"
            placeholder="Search by Name or Number"
            value={inputText}
            onChange={(e) => {
              const val = e.target.value;
              setInputText(val);
              setShowSuggestions(true);
              if (val === '') setSearchTerm(''); 
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            className={`${pillBase} w-full px-5 py-2.5 placeholder-[#2c2c2a]/40 font-medium outline-none focus:translate-y-0.5 focus:shadow-none`}
          />

          {showSuggestions && inputText && suggestions.length > 0 && (
            <ul className="absolute z-50 w-full bg-white border-2 border-[#2c2c2a] rounded-2xl mt-3 max-h-60 overflow-y-auto shadow-[0_2px_0_#2c2c2a] p-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
              {suggestions.map((name) => (
                <li
                  key={name}
                  onClick={() => handleSuggestionClick(name)}
                  className="px-4 py-2.5 text-[#2c2c2a] font-medium hover:bg-[#f5f5f5] rounded-xl cursor-pointer capitalize transition-colors"
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="button"
          onClick={submitSearch}
          title="Buscar"
          aria-label="Buscar"
          className={`${pillBase} shrink-0 w-12 py-2.5 flex items-center justify-center`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-2 w-full sm:flex sm:flex-wrap sm:justify-center sm:items-center sm:gap-3 sm:w-auto">
        <CustomTypeDropdown 
          value={selectedType1} 
          onChange={setSelectedType1} 
          placeholder="Type 1 (All)" 
          options={typesList} 
        />

        <CustomTypeDropdown 
          value={selectedType2} 
          onChange={setSelectedType2} 
          placeholder="Type 2 (Optional)" 
          options={typesList} 
        />

        <CustomTextDropdown 
          value={selectedRegion} 
          onChange={setSelectedRegion} 
          placeholder="All Regions" 
          options={regionOptions} 
        />

        <CustomRarityDropdown 
          value={selectedRarity} 
          onChange={setSelectedRarity} 
          placeholder="Any Rarity" 
        />

        <CustomTextDropdown 
          value={selectedForm} 
          onChange={setSelectedForm} 
          placeholder="Base Form (Hide Forms)" 
          options={formOptions} 
        />

        <div className="flex items-center justify-center sm:contents">
          {children}
        </div>
      </div>
    </div>
  );
}