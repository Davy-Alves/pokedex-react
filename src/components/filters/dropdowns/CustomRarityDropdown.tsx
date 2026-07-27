import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import { selectStyles } from "../filterStyles";

interface CustomRarityDropdownProps {
  value: string | null;
  onChange: (val: string | null) => void;
  placeholder: string;
}

export default function CustomRarityDropdown({ value, onChange, placeholder }: CustomRarityDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const rarityConfig: Record<string, { label: string; colorClass: string; icon: ReactNode }> = {
    baby: {
      label: "Baby",
      colorClass: "bg-sky-400",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-white">
          <path d="M10 2h4v2.5a2.5 2.5 0 0 1 2 2.45V18a4 4 0 0 1-4 4h-0a4 4 0 0 1-4-4V6.95a2.5 2.5 0 0 1 2-2.45V2z" />
        </svg>
      )
    },
    legendary: {
      label: "Legendary",
      colorClass: "bg-amber-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-white">
          <path d="M3 6l4 3.5L12 4l5 5.5L21 6l-2 12H5L3 6z" />
        </svg>
      )
    },
    mythical: {
      label: "Mythical",
      colorClass: "bg-fuchsia-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-white">
          <path d="M12 2 14.5 9.5 22 12 14.5 14.5 12 22 9.5 14.5 2 12 9.5 9.5Z" />
        </svg>
      )
    }
  };

  return (
    <div className="relative w-full sm:w-auto" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={selectStyles}
      >
        <div className="flex items-center gap-2 min-w-0">
          {value && rarityConfig[value] ? (
            <div className={`flex items-center gap-1.5 pl-1 pr-2.5 py-1 rounded-full text-white font-bold text-[10px] uppercase tracking-wider shadow-sm ${rarityConfig[value].colorClass}`}>
              <span className="w-4 h-4 rounded-full bg-white/25 flex items-center justify-center shrink-0">
                {rarityConfig[value].icon}
              </span>
              <span className="truncate">{rarityConfig[value].label}</span>
            </div>
          ) : (
            <span className="truncate">{placeholder}</span>
          )}
        </div>
        <span className="text-xs ml-2 shrink-0">▼</span>
      </button>

      {isOpen && (
        <ul className="absolute z-50 w-full min-w-45 sm:min-w-45 bg-white border-2 border-[#2c2c2a] rounded-2xl mt-2 max-h-60 overflow-y-auto shadow-[0_2px_0_#2c2c2a] p-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full left-0">
          <li
            onClick={() => { onChange(null); setIsOpen(false); }}
            className="px-4 py-2.5 text-[#2c2c2a] font-medium hover:bg-[#f5f5f5] rounded-xl cursor-pointer transition-colors"
          >
            {placeholder}
          </li>
          {Object.entries(rarityConfig).map(([key, config]) => (
            <li
              key={key}
              onClick={() => { onChange(key); setIsOpen(false); }}
              className="px-3 py-2 text-[#2c2c2a] hover:bg-[#f5f5f5] rounded-xl cursor-pointer transition-colors flex items-center"
            >
              <div className={`flex items-center gap-2 pl-1 pr-3 py-1 rounded-full text-white font-bold text-[11px] uppercase tracking-wider shadow-sm ${config.colorClass}`}>
                <span className="w-5 h-5 rounded-full bg-white/25 flex items-center justify-center shrink-0">
                  {config.icon}
                </span>
                {config.label}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}